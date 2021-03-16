defmodule Startlink.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  def start(_type, _args) do
    # mongodb_path = Application.get_env(:startlink, :mongodb)[:path]
    # IO.inspect(mongodb_path)
    children = [
      # Start the Ecto repository
      Startlink.Repo,
      # Start the Telemetry supervisor
      StartlinkWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: Startlink.PubSub},
      # Start the Endpoint (http/https)
      StartlinkWeb.Endpoint,
      # Start a worker by calling: Startlink.Worker.start_link(arg)
      # {Startlink.Worker, arg}
      {Mongo, [name: :mongo, database: "chat", pool_size: 2]}
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Startlink.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  def config_change(changed, _new, removed) do
    StartlinkWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
