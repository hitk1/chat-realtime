defmodule Users.Repo.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias Messages.Repo.Message, as: MessagesModel
  alias Contacts.Repo.Contact, as: ContactModel

  @primary_key {:id, :binary_id, autogenerate: true}
  @required_params [:name, :phoneNumber]

  schema "users" do
    field(:name, :string)
    field(:phoneNumber, :string)
    field(:avatar_url, :string)
    has_many(:from_messages, MessagesModel, foreign_key: :from)
    has_many(:to_messages, MessagesModel, foreign_key: :to)

    has_many(:contacts, ContactModel, foreign_key: :me)
    timestamps()
  end

  def changeset(params) do
    %__MODULE__{}
    |> cast(params, @required_params)
    |> validate_required(@required_params)
    |> validate_length(:phoneNumber, is: 11)
    |> unique_constraint([:phoneNumber])
  end
end
