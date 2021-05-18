defmodule Contacts.Services.GetContacts do
  import Ecto.Query, only: [from: 2]

  alias Shared.Repo
  alias Contacts.Repo.Contact, as: ContactsModel
  alias Users.Repo.User, as: UserModel

  def call(me) do
    query =
      from(friends in ContactsModel,
        join: user in UserModel,
        on: friends.user_id == user.id,
        where: friends.me == ^me,
        select: {friends.alias, user.phoneNumber}
      )

    result =
      query
      |> Repo.all()
      |> Enum.map(fn friendship ->
        {alias, phone_number} = friendship

        %{alias: alias, phone_number: phone_number}
      end)

    if length(result) > 0 do
      {:friendship, result}
    else
      {:has_no_friendship, "Seus contatos não foram localizados"}
    end
  end
end
