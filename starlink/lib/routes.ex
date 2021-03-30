defmodule Starlink.Routes do
  use Plug.Router
  use Plug.ErrorHandler

  alias Users.Routes.Auth
  alias Users.Routes.User

  plug Plug.Static, at: "/", from: :starlink
  plug :match
  plug Plug.Parsers, parsers: [:json], pass: ["application/json"], json_decoder: Jason
  plug :dispatch

  forward("/session", to: Auth)
  forward("/users", to: User)

  get "/" do
    send_resp(conn, 200, Jason.encode!(%{success: true, message: "Servidor online!"}))
  end

  def handle_errors(conn, %{kind: _kind, reason: _reason, stack: stack}) do
    IO.inspect(stack)
    send_resp(conn, conn.status, Jason.encode!(%{message: "Erro inesperado. Contate o administrador!"}))
  end

  match _ do
    send_resp(conn, 404, Jason.encode!(%{success: false, message: "Invalid!"}))
  end

end
