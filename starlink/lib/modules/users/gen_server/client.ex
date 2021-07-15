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
  end

  def direct_notification(from, to, message_id, message, date) do
    GenServer.cast(
      UserRegistry.via_tuple(to),
      {:notify_direct_message,
       %{from: from, message_id: message_id, message: message, date: date}}
    )
  end

  def receive_direct_notification(sender, message_id) do
    GenServer.cast(
      UserRegistry.via_tuple(sender),
      {:notify_received_direct, %{message_id: message_id}}
    )
  end

  def get_unreceived_messages(user_id) do
    GenServer.cast(
      UserRegistry.via_tuple(user_id),
      {:get_unreceived_messages, user_id}
    )
  end
end
