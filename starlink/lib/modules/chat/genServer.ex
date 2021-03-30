defmodule Chats.OnlineChats do
  use GenServer

  defmodule State do
    @type t :: %__MODULE__{
      chat_id: String.t(),
      owner: String.t(),
      users: [String.t()],
      last_message: String.t(),
      messages: [String.t()]
    }

    defstruct chat_id: "",
              owner: "",
              users: [],
              last_message: "",
              messages: []
  end

  def start_link(chat_id) do
    name = get_via_tuple(chat_id)
    GenServer.start(__MODULE__, {}, name: name)
  end

  def getAllState(chat_id) do
    GenServer.call(get_via_tuple(chat_id), :get_status)
    |> IO.inspect
  end

  def setNewValue(%{chat_id: chat_id} = value) do
    IO.inspect(value)
    GenServer.cast(get_via_tuple(chat_id), {:new_value, value})
  end




  def init(initial_state) do
    {:ok, initial_state}
  end

  def handle_call({:get_status, _from, state}) do
    {:reply, state, state}
  end

  def handle_cast({:new_value, value}, state) do
    {:noreply, [value | state]}
  end

  def get_via_tuple(chat_id) do
    {:via, Registry, {:chat, chat_id}}
  end
end
