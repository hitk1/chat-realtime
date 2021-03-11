defmodule Startlink.Repo.Migrations.CreateFriends do
  use Ecto.Migration

  def change do
    create table :friends do
      add :userId, references(:users, type: :binary_id)
      add :friend, references(:users, type: :binary_id)

      timestamps()
    end

    create index(:friends, [:userId])
  end
end
