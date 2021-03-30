defmodule Chats.GenClient do

  def start_link(initial_state) do
    %{chat_id: chat_id} = initial_state

    name = get_via_tuple(chat_id)
    GenServer.start(Chats.GenStore, initial_state, name: name)
  end

  def get_state(chat_id) do
    GenServer.call(get_via_tuple(chat_id), :get_status)
  end

  def set_value(%{chat_id: chat_id} = value) do
    GenServer.cast(get_via_tuple(chat_id), {:new_value, value})
  end

  defp get_via_tuple(chat_id) do
    {:via, Registry, {:chats, chat_id}}
  end
end
