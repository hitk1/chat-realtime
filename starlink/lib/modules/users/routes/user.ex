defmodule Users.Routes.User do
  import Plug.Conn
  use Plug.Router

  alias Users.Routes.Friends
  alias Users.Controllers.User, as: UserController
  alias Users.Views.User, as: UserView
  alias Users.Repo.User
  alias Starlink.ErrorView

  forward("/getFriends", to: Friends)

  plug(:match)
  plug(:dispatch)

  #Create user Route
  post "/" do
    UserController.create_user(conn)
    |> handle_cast(conn)
  end

  match _ do
    conn
    |> send_resp(404, Jason.encode!(%{success: false, message: "Inválida"}))
  end

  defp handle_cast({:ok, %User{} = user}, conn) do
    %{id: userId} = user
    conn
    |> send_resp(200, UserView.render("create_user.json", userId))
  end

  defp handle_cast({:error, changeset}, conn) do
    conn
    |> send_resp(400, ErrorView.render("400.json", changeset))
  end
end
