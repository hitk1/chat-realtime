defmodule Users.GenClient do
  # use GenServer
  require Logger

  alias Users.Registry, as: UserRegistry

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

    GenServer.start_link(Users.GenStore, state, name: Users.Registry.via_tuple(user_id))
  end

  def direct_notification(from, to, message) do
    GenServer.cast(UserRegistry.via_tuple(to), {:notify_direct_message, %{from: from, message: message}})
  end

end
