defmodule Users.Services.CreateUser do
  alias Shared.Repo
  alias Users.Repo.User

  def call(name, phoneNumber) do
      User.changeset(%{"name" => name, "phoneNumber" => phoneNumber})
      |> Repo.insert()
  end

end
