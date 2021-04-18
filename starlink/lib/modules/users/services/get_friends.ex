defmodule Users.Services.GetFriendsService do
  import Ecto.Query, only: [from: 2]

  alias Shared.Repo
  alias Users.Repo.User, as: UserRepo

  def call(phones) do
    query =
      from(friends in UserRepo,
        where: friends.phoneNumber in ^phones
      )

    result = query
    |> Repo.all()
    |> Enum.map(fn user -> %{name: user.name, phoneNumber: user.phoneNumber} end)

    if length(result) > 0 do
      {:friends, result}
    else
      {:has_no_friends, "Não foram encontrados contatos"}
    end
  end
end
