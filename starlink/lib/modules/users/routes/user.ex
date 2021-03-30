defmodule Users.Routes.User do
  import Plug.Conn
  use Plug.Router

  alias Users.Controllers.User, as: UserController
  alias Users.Views.User, as: UserView

  plug(:match)
  plug(:dispatch)

  #Create user Route
  post "/" do
    userId = UserController.create_user(conn)

    conn
    |> send_resp(200, UserView.render("create_user.json", userId))
  end

  match _ do
    conn
    |> send_resp(404, Jason.encode!(%{success: false, message: "Invalida"}))
  end
end
