defmodule Users.GenStore do
  use GenServer

  defmodule State do
    @type t :: %__MODULE__{
      user_id: String.t(),
        name: String.t(),
        phoneNumber: String.t(),
        pid: pid()
    }

    defstruct user_id: nil, name: "", phoneNumber: "", pid: nil
  end

  def init(initial_state) do
    {:ok, initial_state}
  end

  def handle_cast({:get_user, user_id}, state) do
    #Here goes the logic to find user and return him
    {:reply, [state]}
  end

  def handle_call(:get_all, _from, state) do
    {:reply, state, state}
  end
end
