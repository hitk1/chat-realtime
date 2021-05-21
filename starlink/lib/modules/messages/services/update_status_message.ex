defmodule Messages.Services.UpdateStatusMessage do
  import Ecto.Query, only: [from: 2]
  require Logger

  alias Shared.Repo
  alias Messages.Repo.Message, as: MessageModel

  def call(message_id, status) do
    from(message in MessageModel,
      where: message.id == ^message_id,
      update: [set: [status: ^status]]
    )
    |> Repo.update_all([])

    Logger.info("Message status updated successfully!")
    {:ok, "Message status updated successfully!"}
  end
end
