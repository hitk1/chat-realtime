defmodule Messages.Services.UpdateStatusMessage do
  import Ecto.Query, only: [from: 2]
  require Logger

  alias Shared.Repo
  alias Messages.Repo.Message, as: MessageModel
  alias Notifications.Services.ReceiveDirectNotifications

  def call(message_id, status) do
    from(message in MessageModel,
      where: message.id == ^message_id,
      update: [set: [status: ^status]]
    )
    |> Repo.update_all([])

    message =
      from(m in MessageModel,
        where: m.id == ^message_id
      )
      |> Repo.all()

    %{from: sender} = Enum.at(message, 0)

    Task.start(
      ReceiveDirectNotifications,
      :call,
      [
        sender,
        message_id
      ]
    )

    {:ok, "Message status updated successfully!"}
  end
end
