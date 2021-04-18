defmodule Starlink.ErrorView do
  import Ecto.Changeset, only: [traverse_errors: 2]

  def render("400.json", changeset) do
    Jason.encode!(%{
      message: translate_errors(changeset)
    })
  end

  defp translate_errors(changeset) do
    traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end

  def render("message", message) do
    Jason.encode!(%{
      message: message
    })
  end

end
