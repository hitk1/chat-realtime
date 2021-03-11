defmodule Startlink.Friends.FriendsModel do
  use Ecto.Schema
  import Ecto.Changeset

  alias Startlink.User.UserModel, as: Users

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @required_params [:userId, :friend]

  schema "friends" do
    field :userId, :binary_id
    field :friend, :binary_id

    belongs_to :users, Users
    timestamps()
  end

  @spec changeset(%{userId: binary, friend: binary}) :: %__MODULE__{}
  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> validate_required(@required_params)
    |> validate_length(:userId, count: :bytes, max: 36)
    |> validate_length(:friend, count: :bytes, max: 36)
  end
end
