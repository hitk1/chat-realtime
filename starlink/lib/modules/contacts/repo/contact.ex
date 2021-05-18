defmodule Contacts.Repo.Contact do
  use Ecto.Schema
  import Ecto.Changeset

  alias Users.Repo.User, as: UserModel

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @required_params [:me, :alias, :user_id]

  schema "contacts" do
    field(:alias, :string)

    belongs_to(:my_reference, UserModel, foreign_key: :me)
    belongs_to(:my_contacts, UserModel, foreign_key: :user_id)

    timestamps()
  end

  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> foreign_key_constraint(:me)
    |> foreign_key_constraint(:user_id)
    |> unique_constraint([:me, :user_id])
    |> validate_required(@required_params)
  end
end
