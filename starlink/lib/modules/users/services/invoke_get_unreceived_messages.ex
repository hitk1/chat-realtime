defmodule Users.Services.InvokeGetUnreceivedMessages do
  alias Users.GenClient

  def call(user_id) do
    GenClient.get_unreceived_messages(user_id)

    {:ok, true}
  end
end
