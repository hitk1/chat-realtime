defmodule Notifications.Services.DirectNotifications do
  require Logger
  alias Users.GenClient, as: UserGenClient

  def call(from_user, to_user, message_id, message, date) do
    UserGenClient.direct_notification(from_user, to_user, message_id, message, date)
  end
end
