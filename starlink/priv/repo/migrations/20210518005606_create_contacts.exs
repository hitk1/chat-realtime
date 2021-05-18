defmodule Shared.Repo.Migrations.CreateContacts do
  use Ecto.Migration

  def change do
    create table :contacts do
      add :me, references(:users, type: :binary_id)
      add :alias, :string
      add :user_id, references(:users, type: :binary_id)

      timestamps()
    end

    create index(:contacts , [:me])
  end
end
