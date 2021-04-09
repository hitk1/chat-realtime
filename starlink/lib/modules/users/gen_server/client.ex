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
    %{user_id: user_id, pid: pid} = state

    existent_user = GenServer.whereis(Users.Registry.via_tuple(user_id))

    if is_nil(existent_user) do
      GenServer.start_link(Users.GenStore, state, name: Users.Registry.via_tuple(user_id))
    else
      GenServer.cast(UserRegistry.via_tuple(user_id), {:update_pid, pid})
    end

    # cond do
    #   nil -> GenServer.start_link(Users.GenStore, state, name: Users.Registry.via_tuple(user_id))
    #   not -> GenServer.cast(UserRegistry.via_tuple(user_id), {:update_pid, pid})
    # end

    # with nil <- GenServer.whereis(Users.Registry.via_tuple(user_id)) do
    #   GenServer.start_link(Users.GenStore, state, name: Users.Registry.via_tuple(user_id))
    # else
    #   _ -> Logger.info("Usuário já conectado")
    # end
  end

  def direct_notification(from, to, message) do
    GenServer.cast(UserRegistry.via_tuple(to), {:notify_direct_message, %{from: from, message: message}})
  end

end
