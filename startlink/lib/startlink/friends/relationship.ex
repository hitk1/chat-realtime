defmodule Startlink.Friends.RelationShip do

  import Ecto.Query
  alias Startlink.Friends.FriendsModel
  alias Startlink.Repo
  alias Startlink.User.UserModel

    def call(%{"userId" => userId, "friendPhones" => friendPhones}) do
      get_users_by_phoneNumbers(userId, friendPhones)
      |> create_relationship(userId)
    end

  defp get_users_by_phoneNumbers(userId, friendPhones) do
    Repo.all(from u in UserModel, where: u.id != ^userId and u.phoneNumber in ^friendPhones, select: u.id)
  end

  defp create_relationship(friendsId, userId) do
      Repo.transaction(fn ->
        Enum.map(friendsId, fn friendId ->
          relationShip = %{userId: userId, friend: friendId}
          |> FriendsModel.changeset()

          case Repo.insert(relationShip) do
            {:ok, %{}} -> {:ok, IO.puts("inserida")}
            {:error, reason} -> Repo.rollback(reason)
          end
        end)
      end)
  end
end
