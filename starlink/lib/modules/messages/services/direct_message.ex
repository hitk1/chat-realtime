defmodule Messages.Services.DirectMessage do
  import Ecto.Query, only: [from: 2]

  alias Shared.Plug.Auth
  alias Shared.Repo
  alias Messages.Services.CreateMessage
  alias Notifications.Services.DirectNotifications
  alias Users.Repo.User, as: UserModel

  def call(from_user, to_user, raw_message) do
    to_user_id = get_userid_by_phone(to_user)
    from_user_id = Auth.extract_userId_from_token(from_user)

    with {:ok, message} <- CreateMessage.call(from_user_id, to_user_id, raw_message) do
      %{id: message_id, inserted_at: inserted_at} = message
      from_user_phoneNumber = get_phone_by_id(from_user_id)

      Task.start(DirectNotifications, :call, [
        from_user_phoneNumber,
        to_user_id,
        message_id,
        raw_message,
        inserted_at
      ])

      {:ok, message_id}
    else
      reason -> {:error, reason}
    end
  end

  defp get_phone_by_id(user_id) do
    result =
      from(user in UserModel,
        where: user.id == ^user_id,
        select: {
          user.phoneNumber
        }
      )
      |> Repo.all()

    {phoneNumber} = Enum.at(result, 0)
    phoneNumber
  end

  defp get_userid_by_phone(phone) do
    result =
      from(user in UserModel,
        where: user.phoneNumber == ^phone,
        select: {
          user.id
        }
      )
      |> Repo.all()

    {user_id} = Enum.at(result, 0)
    user_id
  end
end
