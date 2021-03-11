defmodule Startlink.Repo do
  use Ecto.Repo,
    otp_app: :startlink,
    adapter: Ecto.Adapters.Postgres
end
