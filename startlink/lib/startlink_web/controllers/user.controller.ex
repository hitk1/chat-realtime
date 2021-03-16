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

  def get_all_messages(conn, params) do
    case Startlink.get_all_messages(params) do
      {:ok, messages} ->
            conn
            |> put_status(:created)
            |> render("user_messages.json", messages: messages)
      {:error, reason} ->
          conn
          |> put_status(:bad_request)
          |> render("user_messages.json", reason: reason)
    end
  end
end
