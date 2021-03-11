defmodule StartlinkWeb.FallbackController do
  use StartlinkWeb, :controller
  alias StartlinkWeb.ErrorView

  def call(conn, {:error, reason}) do
    conn
    |> put_status(:bad_request)
    |> put_view(ErrorView)
    |> render("400.json", error: reason)
  end
end
