defmodule Notifications.Services.ReceiveDirectNotifications do
  alias Users.GenClient, as: UserGenClient

  def call(sender, message_id) do
    UserGenClient.receive_direct_notification(sender, message_id)
  end
end
