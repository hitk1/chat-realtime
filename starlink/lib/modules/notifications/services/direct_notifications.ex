defmodule Notifications.Services.DirectNotifications do
  require Logger
  alias Users.GenClient, as: UserGenClient

  def call(from_user, to_user, message) do
    UserGenClient.direct_notification(from_user, to_user, message)
  end
end
