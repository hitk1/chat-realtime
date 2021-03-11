defmodule Startlink.User.UserModel do
  use Ecto.Schema
  import Ecto.Changeset

  alias Startlink.Friends.FriendsModel, as: Friends

  @primary_key {:id, :binary_id, autogenerate: true}
  @required_params [:name, :phoneNumber]

  schema "users" do
    field :name, :string
    field :phoneNumber, :string

    has_many :friends, Friends
    timestamps()
  end

  @spec changeset(%{name: string, phoneNumber: string}) :: %__MODULE__{}
  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> validate_required(@required_params)
    |> validate_length(:phoneNumber, min: 11)
    |> validate_length(:phoneNumber, max: 11)
    |> unique_constraint([:name])
    |> unique_constraint([:phoneNumber])
  end

end
