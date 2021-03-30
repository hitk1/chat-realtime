defmodule Users.Controllers.User do
  alias Users.Services.CreateUser

  def create_user(conn) do
    %Plug.Conn{body_params: %{"name" => name, "phoneNumber" => phoneNumber}} = conn

    CreateUser.call(name, phoneNumber)
  end
end
