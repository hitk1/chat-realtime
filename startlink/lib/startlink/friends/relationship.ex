defmodule Startlink.Friends.RelationShip do
  alias Startlink.Friends.FriendsModel
  alias Startlink.Repo

  def call(%{userId: userId, friendPhones: friendPhones} = params) do

    #A lógica segue em pesquisar todos os ids dos usuarios por numero de telefone informado e criar as amizades com [userId]

    # params
    # |> FriendsModel.changeset()
    # |> create_relationship()
  end

  defp create_relationship(relationship) do
    case Repo.insert(relationship) do
      {:ok, %FriendsModel{} = relation} -> {:ok, relation}
      {:error, relationshipChangeset} -> {:error, relationshipChangeset}
    end
  end
end
