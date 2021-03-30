defmodule Users.Services.InitUserSession do
  require Logger

  alias Users.Repo.User, as: UserRepo
  alias Users.GenClient

  @type user :: UserRepo
  @spec call(user, pid()) :: boolean
  def call(user, pid) do
    %{id: user_id, name: name, phoneNumber: phoneNumber} = user

    GenClient.start_link(%{user_id: user_id, name: name, phoneNumber: phoneNumber, pid: pid})
    {:ok, true}
  end

  def call(_) do
    IO.puts("have no match")
    {:error, nil}
  end
end
