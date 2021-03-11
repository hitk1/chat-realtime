# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :startlink,
  ecto_repos: [Startlink.Repo]

# Configures the endpoint
config :startlink, StartlinkWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "9a62YLUJwhgjS7FE9h4GBozcQH1LxNUuQyVb/GgetD9vcPUbVJwd52jtYnfc5Haw",
  render_errors: [view: StartlinkWeb.ErrorView, accepts: ~w(json), layout: false],
  pubsub_server: Startlink.PubSub,
  live_view: [signing_salt: "LQ3hML01"]

config :startlink, Startlink.Repo,
  migration_primary_key: [type: :binary_id],
  migration_foreign_key: [type: :binary_id]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
