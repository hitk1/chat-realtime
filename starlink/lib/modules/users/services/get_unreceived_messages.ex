defmodule Users.Services.GetUnreceivedMessages do
  import Ecto.Query, only: [from: 2]

  alias Messages.Repo.Message, as: MessageModel
  alias Shared.Repo
  alias Users.Repo.User, as: UserModel

  def call(user_id) do
    query = from(message in MessageModel, join: user in UserModel, on: message.from == user.id)

    query =
      from([message, user] in query,
        where: message.to == ^user_id and message.status == 0,
        select: {
          user.phoneNumber,
          message.message,
          message.inserted_at
        }
      )

    result = Repo.all(query)

    IO.inspect(result)

    if length(result) > 0 do
      {:ok,
       Enum.map(
         result,
         fn item ->
           {phoneNumber, message, inserted_at} = item

           %{
             "phoneNumber" => phoneNumber,
             "message" => message,
             "inserted_at" => inserted_at
           }
         end
       )}
    else
      {:no_result, ""}
    end
  end
end
