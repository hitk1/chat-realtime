defmodule Starlink.Sockets do
  require Logger
  @behaviour :cowboy_websocket

  alias Users.Services.CheckUserService
  alias Users.Services.InitUserSession

  def init(req, _state) do
    state = %{}
    {:cowboy_websocket, req, state}
  end

  def websocket_init(state) do
    {:ok, state}
  end

  def websocket_handle({:text, frame}, state) do
    with {:ok, json} <- Poison.decode(frame) do

      case json["operation"] do
        "auth" ->
          %{"phoneNumber" => phoneNumber} = json

          with {:ok, user} <- CheckUserService.call(phoneNumber),
            {:ok, _}  <- InitUserSession.call(user, self()) do
              {:reply, {:text, "Autenticado"}, state}
          else
            reason ->
              IO.inspect(reason)
              {:reply, {:text, "deu ruim"}, state}
          end
      end
    end
  end

  def websocket_info({:resp_info, message}, state) do
    {:reply, {:text, message}, state}
  end

  #Essa função é responsavel por enviar mensagens aos clientes conectados atraves do PID recebido em [websocket_init()] através de -> self()
  def websocket_info(info, state) do
    {:reply, {:text, "logando: #{info}"}, state}
  end

end
