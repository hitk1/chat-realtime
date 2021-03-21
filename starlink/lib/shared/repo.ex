defmodule Shared.Repo do
  use Ecto.Repo,
    otp_app: :starlink,
    adapter: Ecto.Adapters.Postgres
end
