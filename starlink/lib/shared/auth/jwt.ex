defmodule Shared.Jwt do
  alias Users.Repo.User

  def create(
        %{id: user_id, name: name, phoneNumber: phoneNumber} = _user,
        expired_in \\ Application.fetch_env!(:jwt_starlink, :jwt_expiration_time_minutes)
      ) do
    # JSON Web Keys
    jwk = %{
      "kty" => "oct",
      "k" => encode_secret()
    }

    # JSON Web Signature (JWS)
    jws = %{
      "alg" => "HS256"
    }

    # JSON Web Token (JWT)
    jwt = %{
      "iss" => Application.fetch_env!(:jwt_starlink, :jwt_issuer),
      "sub" => user_id,
      "exp" => DateTime.utc_now() |> DateTime.add(expired_in * 60, :second) |> DateTime.to_unix(),
      "phoneNumber" => phoneNumber,
      "name" => name
    }

    {_, token} = JOSE.JWT.sign(jwk, jws, jwt) |> JOSE.JWS.compact()
    token
  end

  def get_claim(%JOSE.JWT{fields: fields} = _jwt_claims, key) do
    %{^key => value} = fields
    value
  end

  def verify_signature(token) do
    jwk = %{
      "kty" => "oct",
      "k" => encode_secret()
    }

    case JOSE.JWT.verify(jwk, token) do
      {true, claims, _} -> {:ok, claims}
      _ -> {:error, "Token signature verification failed!"}
    end
  end

  def verify_claims(%JOSE.JWT{fields: fields} = claims) do
    with %{"exp" => exp} = fields,
         {:ok, expiration_as_datetime} = DateTime.from_unix(exp),
         :gt <- DateTime.compare(expiration_as_datetime, DateTime.utc_now()) do
      {:ok, claims}
    else
      _ -> {:error, "Token is expired!"}
    end
  end

  defp encode_secret() do
    Application.fetch_env!(:jwt_starlink, :jwt_secret_hs256_signature) |> :jose_base64url.encode()
  end
end
