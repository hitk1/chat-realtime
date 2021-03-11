defmodule Startlink.User.Create do
    alias Startlink.User.UserModel, as: User
    alias Startlink.Repo

    def call(params) do
        params
        |> User.changeset()
        |> insertUser()
        |> IO.inspect()
    end

    defp insertUser(user) do
        case Repo.insert(user) do
            {:ok, %User{id: id, name: name, phoneNumber: phoneNumber}} -> {:ok, %{id: id, name: name, phoneNumber: phoneNumber}}
            {:error, userChangeset} -> {:error, userChangeset}
        end
    end

end
