defmodule Chats.GenStore do
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

  def init(initial_state) do
    {:ok, initial_state}
  end

  def handle_call(:get_status, _from, state) do
    {:reply, state, state}
  end

  def handle_cast({:new_value, value}, state) do
    {:noreply, [value | state]}
  end
end
