defmodule Users.Routes.Auth do
  import Plug.Conn
  use Plug.Router

  alias Users.Services.CheckUserService
  alias Shared.Jwt

  plug(:match)
  plug(:dispatch)

  post "/" do
    {status, body} =
      case conn.body_params do
        %{"phoneNumber" => phoneNumber} -> prepare_response_with_jwt(phoneNumber)
        _ -> {:bad_request, ''}

      end

    send_resp(conn, status, body)
  end

  defp prepare_response_with_jwt(phoneNumber) do
    with {:ok, user} <- CheckUserService.call(phoneNumber),
         jwt <- Jwt.create(user) do

      {:ok, Jason.encode!(%{data: jwt})}
    else
      {:error, msg} -> {:unauthorized, msg}
    end
  end

  match _ do
    conn
    |> send_resp(:not_found, "")
  end
end
