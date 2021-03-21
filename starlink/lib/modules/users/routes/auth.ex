defmodule Users.Routes.Auth do
  import Plug.Conn
  use Plug.Router

  plug(:match)
  plug(:dispatch)

  post "/" do
    %Plug.Conn{ body_params: %{"user" => _user, "password" => _password} } = conn

    conn
    |> send_resp(200, "ok")
  end

  match _ do
    conn
    |> send_resp(404, Jason.encode!(%{success: false, message: "Invalida"}))
  end
end
