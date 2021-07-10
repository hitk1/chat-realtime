defmodule Starlink.Sockets do
  require Logger
  @behaviour :cowboy_websocket

  alias Users.Services.CheckUserService
  alias Users.Services.InitUserSession
  alias Users.Services.InvokeGetUnreceivedMessages
  alias Messages.Services.DirectMessage
  alias Messages.Services.UpdateStatusMessage
  alias Utils.SocketEncoder
  alias Shared.Jwt

  def init(req, _state) do
    state = %{}
    {:cowboy_websocket, req, state}
  end

  def websocket_init(state) do
    Logger.info("New connection")
    {:ok, state}
  end

  def websocket_handle({:text, "ping"}, state) do
    Logger.info("ping-pong check!")
    {:reply, {:text, "pong"}, state}
  end

  def websocket_handle({:text, frame}, state) do
    with {:ok, json} <- Poison.decode(frame) do
      case json["operation"] do
        "auth" ->
          %{"phoneNumber" => phoneNumber} = json["data"]

          with {:ok, user} <- CheckUserService.call(phoneNumber),
               jwt <- Jwt.create(user) do
            case InitUserSession.call(user, self()) do
              {:ok, _} ->
                %{id: user_id} = user

                InvokeGetUnreceivedMessages.call(user_id)

                {:reply, {:text, SocketEncoder.call("auth", Jason.encode!(%{token: jwt}))}, state}

              {:error, _} ->
                {:reply, {:text, "Erro na autenticao"}, state}
            end
          else
            reason ->
              IO.inspect(reason)
              {:reply, {:text, "Deu ruim"}, state}
          end

        "direct" ->
          %{"data" => %{"to" => to_user, "message" => message, "key" => key}, "auth" => from} =
            json

          with {:ok, message_id} <- DirectMessage.call(from, to_user, message) do
            {:reply,
             {:text,
              SocketEncoder.call("direct", Jason.encode!(%{message_id: message_id, key: key}))},
             state}
          else
            reason ->
              {:reply, {:text, reason}, state}
          end

        "direct_received" ->
          %{"data" => %{"messageId" => message_id}} = json

          with {:ok, message} <- UpdateStatusMessage.call(message_id, 1) do
            {:reply,
             {:text, SocketEncoder.call("direct_received", Jason.encode!(%{message: message}))},
             state}
          else
            _ -> {:reply, {:text, "Error on update status message"}, state}
          end

        "direct_readed" ->
          %{"data" => %{"messageId" => message_id}} = json

          with {:ok, message} <- UpdateStatusMessage.call(message_id, 2) do
            {:reply,
             {:text, SocketEncoder.call("direct_readed", Jason.encode!(%{message: message}))},
             state}
          else
            _ -> {:reply, {:text, "Error on update status message"}, state}
          end

        _ ->
          {:reply, {:text, "invalid!"}, state}
      end
    end
  end

  def websocket_info({:resp_info, message}, state) do
    IO.inspect(message)
    {:reply, {:text, message}, state}
  end

  def websocket_info({:notify_direct_message, message}, state) do
    {:reply, {:text, SocketEncoder.call("notify_direct", Jason.encode!(message))}, state}
  end

  def websocket_info({:notify_unreceived_messages, unreceived_messages}, state) do
    {:reply,
     {:text, SocketEncoder.call("unreceived_messages", Jason.encode!(unreceived_messages))},
     state}
  end

  # Necessário para os casos de assyncronismo
  def websocket_info({:EXIT, _, _}, state) do
    {:ok, state}
  end

  def websocket_info(info, state) do
    {:reply, {:text, "logando: #{info}"}, state}
  end
end
