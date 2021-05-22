defmodule Shared.Plug.Auth do
  import Plug.Conn

  alias Shared.Jwt

  def init(opts) do
    Keyword.get(opts, :public_path, "")
  end

  def call(conn, public_path) do
    case skip_verification?(conn, public_path) do
      true -> conn
      _ -> authorize(conn)
    end
  end

  def extract_userId_from_token(token) do
    with {:ok, claims} <- Jwt.verify_signature(token),
         {:ok, claims} <- Jwt.verify_claims(claims) do
      Jwt.get_claim(claims, "sub")
    end
  end

  defp authorize(conn) do
    conn
    |> verify_jwt
    |> case do
      {:error, message} -> unauthorize(conn, message)
      claims -> assign_subject(claims, conn)
    end
  end

  defp skip_verification?(%Plug.Conn{request_path: request_path} = _conn, public_path) do
    # request_path == public_path
    Enum.member?(public_path, request_path)
  end

  defp verify_jwt(conn) do
    with {:ok, token} <- extract_token(conn),
         {:ok, claims} <- Jwt.verify_signature(token),
         {:ok, claims} <- Jwt.verify_claims(claims) do
      claims
    end
  end

  defp assign_subject(claims, conn) do
    assign(conn, :current_user, Jwt.get_claim(claims, "sub"))
  end

  defp extract_token(conn) do
    with ["Bearer " <> token] <- get_req_header(conn, "authorization") do
      {:ok, token}
    else
      _ -> {:error, "No authorization token found."}
    end
  end

  defp unauthorize(conn, msg) do
    send_resp(conn, :unauthorized, msg) |> halt()
  end
end
