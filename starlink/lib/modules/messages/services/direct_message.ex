defmodule Messages.Services.DirectMessage do

  alias Messages.Services.CreateMessage
  alias Notifications.Services.DirectNotifications

  def call(from_user, to_user, raw_message) do
    with {:ok, message} <- CreateMessage.call(from_user, to_user, raw_message) do
      Task.start(DirectNotifications, :call, [from_user, to_user, raw_message])
      %{id: id} = message
      {:ok, id}
    else
      reason -> {:error, reason}
    end
  end

end
