defmodule Starlink.MixProject do
  use Mix.Project

  def project do
    [
      app: :starlink,
      version: "0.1.0",
      elixir: "~> 1.11",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  # Run "mix help compile.app" to learn about applications.
  def application do
    [
      extra_applications: [:logger],
      mod: {Starlink, []}
    ]
  end

  # Run "mix help deps" to learn about dependencies.
  defp deps do
    [
      {:plug_cowboy, "~> 2.0"},
      {:jason, "~> 1.1"},
      {:jose, "~> 1.10.1"},
      {:credo, "1.5.5"},
      {:ecto_sql, "~> 3.0"},
      {:postgrex, ">= 0.0.0"},
      {:elixir_uuid, "~> 1.2"},
      {:poison, "~> 4.0"},
      {:gen_registry, "~> 1.0"},
      {:cors_plug, "~> 2.0"}
    ]
  end
end
