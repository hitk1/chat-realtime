defmodule Users.Controllers.User do

  alias Users.Repo.User
  alias Users.Services.CreateUser

  def create_user(conn) do
    %Plug.Conn{body_params: %{"name" => name, "phoneNumber" => phoneNumber}} = conn

    with {:ok, %User{} = user} <- CreateUser.call(name, phoneNumber) do
      %{id: userId} = user
      {:ok, userId}
    else
      {:error, reason} -> {:error, reason}
    end
  end
end
