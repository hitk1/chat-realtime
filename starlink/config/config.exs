import Config

config :starlink, ecto_repos: [Shared.Repo]
config :starlink, Shared.Repo,
  database: "chat",
  username: "postgres",
  password: "rpi1234",
  hostname: "localhost"

config :starlink, Shared.Repo,
  migration_primary_key: [type: :binary_id],
  migration_foreign_key: [type: :binary_id]
