defmodule Users.GenStore do
  use GenServer
  require Logger

  alias Users.Services.GetUnreceivedMessages

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
    # Here goes the logic to find user and return him
    {:reply, [state]}
  end

  def handle_cast({:notify_direct_message, %{from: from, message: message}}, state) do
    %{pid: pid} = state
    notification = Poison.encode!(%{from: from, message: message})

    pid
    |> send({:notify_direct_message, notification})

    {:noreply, state}
  end

  def handle_cast({:get_unreceived_messages, user_id}, state) do
    %{pid: pid} = state

    case GetUnreceivedMessages.call(user_id) do
      {:ok, messages} ->
        pid
        |> send({:notify_unreceived_messages, Poison.encode!(messages)})

      {:no_result, _} ->
        Logger.info("Without unreceived messages")

      reason ->
        Logger.info("Error on get unreceived messages")
    end

    {:noreply, state}
  end

  def handle_cast({:update_pid, pid}, state) do
    new_state = Map.put(state, :pid, pid)
    {:noreply, new_state}
  end

  def handle_call(:get_all, _from, state) do
    {:reply, state, state}
  end
end
