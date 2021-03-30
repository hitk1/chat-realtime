defmodule Users.GenClient do
  # use GenServer
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
  def start(state) do
    %{user_id: user_id} = state

    # GenServer.start_link(Users.GenStore, state, name: {:via, Registry, {:user, user_id}})
    IO.puts(user_id)
    GenServer.start_link(Users.GenStore, state, name: Users.Registry.via_tuple(user_id))
  end

end
