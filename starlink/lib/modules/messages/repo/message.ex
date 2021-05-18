defmodule Messages.Repo.Message do
  use Ecto.Schema
  import Ecto.Changeset

  alias Users.Repo.User, as: UserModel

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @required_params [:from, :to, :message]

  schema "messages" do
    field(:message, :string)
    field(:status, :integer, default: 1)
    belongs_to(:from_user, UserModel, foreign_key: :from)
    belongs_to(:to_user, UserModel, foreign_key: :to)

    timestamps()
  end

  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> foreign_key_constraint(:from)
    |> foreign_key_constraint(:to)
    |> validate_required(@required_params)
  end
end
