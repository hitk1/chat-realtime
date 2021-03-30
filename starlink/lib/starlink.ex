defmodule Starlink do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      %{
        id: Users.Registry,
        start: {Users.Registry, :start_link, []}
      },
      %{
        id: Chats.Registry,
        start: {Chats.Registry, :start_link, []}
      },
      {Shared.Repo, []},
      Plug.Adapters.Cowboy.child_spec(
        scheme: :http,
        plug: Starlink.Routes,
        options: [
          dispatch: dispatcher(),
          port: 3334,
          protocol_options: [idle_timeout: :infinity]
        ]
        )
      ]

    opts = [strategy: :one_for_one, name: Starlink]
    Supervisor.start_link(children, opts)
  end

  defp dispatcher do
    [
      {:_, [
        {"/ws", Starlink.Sockets, []},
        {:_, Plug.Cowboy.Handler, {Starlink.Routes, []}}
      ]}
    ]
  end
end
