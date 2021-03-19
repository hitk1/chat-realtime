defmodule Starlink do
  use Application

  def start(_type, _args) do
    import Supervisor.Spec, warn: false

    children = [
      Plug.Adapters.Cowboy.child_spec(
        scheme: :http,
        plug: Starlink.Routes,
        options: [
          dispatch: dispatcher(),
          port: 3334
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
