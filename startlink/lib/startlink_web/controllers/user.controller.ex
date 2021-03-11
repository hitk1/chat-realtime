defmodule StartlinkWeb.UserController do
  use StartlinkWeb, :controller

  action_fallback StartlinkWeb.FallbackController

  def create(conn, params) do
    with {:ok, %{} = user} <- Startlink.create_user(params) do
        conn
        |> put_status(:created)
        |> render("user_created.json", user: user)
    end
  end
end
