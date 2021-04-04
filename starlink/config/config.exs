import Config

config :starlink, ecto_repos: [Shared.Repo]
config :starlink, Shared.Repo,
  database: "chat",
  username: "postgres",
  password: "postgres",
  hostname: "localhost"

config :starlink, Shared.Repo,
  migration_primary_key: [type: :binary_id],
  migration_foreign_key: [type: :binary_id]

config :jwt_starlink,
  jwt_issuer: "Websocket Starlink",
  jwt_expiration_time_minutes: 30,
  jwt_secret_hs256_signature: "5553e9a88496967a0af92b9ea8a36bf89daa53d3ca7cf76b370d1a914a3da6db"
