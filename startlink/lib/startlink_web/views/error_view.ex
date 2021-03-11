defmodule StartlinkWeb.ErrorView do
  use StartlinkWeb, :view

  import Ecto.Changeset, only: [traverse_errors: 2]

  alias Ecto.Changeset

  def template_not_found(template, _assigns) do
    %{errors: %{detail: Phoenix.Controller.status_message_from_template(template)}}
  end


  def render("400.json", %{error: %Changeset{} = changesetError}) do
    %{message: translate_errors(changesetError)}
  end

  def render("400.json", %{error: message}) do
    %{message: "Erro inesperado: #{message}"}
  end

  def render("400.json", reason) do
    %{message: "Houve um problema interno #{reason}"}
  end

  defp translate_errors(changesetError)do
    traverse_errors(changesetError, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end
end
