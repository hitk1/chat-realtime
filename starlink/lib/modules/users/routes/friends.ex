defmodule Users.Routes.Friends do
  import Plug.Conn
  use Plug.Router

  alias Users.Controllers.Friends, as: FriendsController
  alias Starlink.ErrorView
  alias Users.Views.Friends, as: FriendsView

  plug(:match)
  plug(:dispatch)

  #Get List of Friends by phones
  post "/" do
    FriendsController.get_friends(conn)
    |> handle_cast(conn)
  end


  defp handle_cast({:friends, friends}, conn) do
    conn
    |> send_resp(200, FriendsView.render("friends_list", friends))
  end

  defp handle_cast({:has_no_friends, message}, conn) do
    conn
    |> send_resp(400, ErrorView.render("message", message))
  end
end
