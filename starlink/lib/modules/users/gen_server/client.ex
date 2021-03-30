defmodule Users.GenClient do
  require Logger

  defmodule State do
    @type t :: %__MODULE__{
        user_id: String.t(),
        name: String.t(),
        phoneNumber: String.t(),
        pid: pid()
    }

    defstruct user_id: nil, name: "", phoneNumber: "", pid: nil
  end

  @type state :: State
  @spec start_link(state) :: any()
  def start_link(%State{
    user_id: user_id,
    name: name,
    phoneNumber: phoneNumber,
    pid: pid
  } = state) do
    name = get_via_tuple(user_id)
    GenServer.start_link(Users.GenStore, state, name: name)
  end

  defp get_via_tuple(user_id)do
    {:via, Registry, {:users, user_id}}
  end
end
