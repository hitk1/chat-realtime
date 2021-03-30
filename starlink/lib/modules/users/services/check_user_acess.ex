defmodule Users.Services.CheckUserService do
  import Ecto.Query, only: [from: 2]

  alias Shared.Repo
  alias Users.Repo.User, as: UserRepo

  def call(phoneNumber) do
    query = from user in UserRepo,
            where: user.phoneNumber == ^phoneNumber

    result =
      Repo.all(query)
      |> Enum.at(0)

    %UserRepo{id: user_id, name: name, phoneNumber: phoneNumber} = result

    if not is_nil(result) do
      {:ok, %{id: user_id, name: name, phoneNumber: phoneNumber}}
    else
      {:error, "Usuario inexistente"}
    end
  end

end
