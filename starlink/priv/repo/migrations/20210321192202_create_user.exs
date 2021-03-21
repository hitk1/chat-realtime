defmodule Shared.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table :users do
      add :name, :string
      add :phoneNumber, :string

      timestamps()
    end

    create unique_index(:users, [:phoneNumber])
  end
end
