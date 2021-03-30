defmodule Users.Routes.User do
  import Plug.Conn
  use Plug.Router

  alias Users.Controllers.User, as: UserController
  alias Users.Views.User, as: UserView

  plug(:match)
  plug(:dispatch)

  #Create user Route
  post "/" do
    with {:ok, user_id} <- UserController.create_user(conn) do
      conn
      |> send_resp(200, UserView.render("create_user.json", user_id))
    else
      {:error, _reason} -> conn |> send_resp(200, Poison.encode!(%{success: false, message: "Erro na criação do usuário"}))
    end
  end

  match _ do
    conn
    |> send_resp(404, Jason.encode!(%{success: false, message: "Invalida"}))
  end
end
