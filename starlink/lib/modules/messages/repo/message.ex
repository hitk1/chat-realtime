defmodule Messages.Repo.Message do
  use Ecto.Schema
  import Ecto.Changeset

  alias Users.Repo.User, as: UserModel

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  @required_params [:from, :to, :message]

  schema "messages" do
    field :message, :string
    field :delivered, :boolean, default: false
    field :readed, :boolean, default: false
    belongs_to :from_user, UserModel, foreign_key: :from
    belongs_to :to_user, UserModel, foreign_key: :to

    timestamps()
  end

  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> validate_required(@required_params)
    |> IO.inspect()
  end
end
