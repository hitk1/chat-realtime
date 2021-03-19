defmodule Starlink.Routes do
  use Plug.Router

  plug Plug.Static, at: "/", from: :starlink
  plug :match
  plug Plug.Parsers, parsers: [:json], pass: ["application/json"], json_decoder: Jason
  plug :dispatch

  get "/" do
    send_resp(conn, 200, Jason.encode!(%{success: true, message: "Servidor online!"}))
  end

  match _ do
    send_resp(conn, 404, Jason.encode!(%{success: false, message: "Invalid!"}))
  end
end
