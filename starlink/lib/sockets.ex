defmodule Starlink.Sockets do
  require Logger
  @behaviour :cowboy_websocket

  def init(req, _state) do
    state = %{}
    {:cowboy_websocket, req, state}
  end

  def websocket_init(state) do
    {:ok, state}
  end

  def websocket_handle({:text, text}, state) do
      case text do
        "ping" -> {:reply, {:text, "pong"}, state}
        _ -> {:reply, {:text, "testando"}, state}
      end
  end

  def websocket_handle({:ping, _}, state) do
    Logger.info("Bateu no ping")
    {:reply, {:text, "pong"}, state}
  end

  def websocket_info(info, state) do
    {:reply, {:text, "logando: #{info}"}, state}
  end

end
