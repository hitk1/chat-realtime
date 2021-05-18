defmodule Contacts.Services.CreateFriendships do
  import Ecto.Query, only: [from: 2]
  require Logger

  alias Shared.Repo
  alias Users.Repo.User, as: UserModel
  alias Contacts.Repo.Contact, as: ContactModel

  def call(me, phones) do
    phones
    |> Enum.reduce([], fn item, acc -> [item["phoneNumber"] | acc] end)
    |> find_users_by_phone()
    |> create_friendships(me, phones)
  end

  defp find_users_by_phone(phones) do
    query =
      from(user in UserModel,
        where: user.phoneNumber in ^phones
      )

    Repo.all(query)
  end

  defp create_friendships(users, me, phones) do
    users
    |> Enum.map(fn user ->
      friend = Enum.find(phones, fn item -> item["phoneNumber"] == user.phoneNumber end)

      ContactModel.changeset(%{
        "me" => me,
        "alias" => friend["alias"],
        "user_id" => user.id
      })
      |> Repo.insert!()
    end)

    {:created, "Created successfully!"}
  end
end
