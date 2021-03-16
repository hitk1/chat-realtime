defmodule Startlink do
  alias Startlink.User.Create, as: CreateUser
  alias Startlink.Friends.RelationShip, as: CreateRelationShip
  alias Startlink.Messages.MessageService

  defdelegate create_user(params), to: CreateUser, as: :call

  @doc """
    Facade para criação do relacionamento de amizades
  """
  @spec create_friend_relationship(%{userId: String.t(), friendPhones: []}) :: Startlink.Friends.FriendsModel
  defdelegate create_friend_relationship(params), to: CreateRelationShip, as: :call

  defdelegate get_all_messages(params), to: MessageService, as: :get_user_messages
end
