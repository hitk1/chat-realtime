defmodule Shared.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table :messages do
      add :from, references(:users, type: :binary_id)
      add :to, references(:users, type: :binary_id)
      add :message, :string
      add :delivered, :boolean
      add :readed, :boolean

      timestamps()
    end

    create index(:messages, [:from])
    create index(:messages, [:to])
    create index(:messages, [:from, :to])
  end
end
