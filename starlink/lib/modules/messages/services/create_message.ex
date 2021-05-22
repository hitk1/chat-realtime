defmodule Messages.Services.CreateMessage do
  import Ecto.Changeset, only: [traverse_errors: 2]
  require Logger

  alias Shared.Repo
  alias Messages.Repo.Message, as: MessagesModel

  def call(from_user, to_user, message) do
    %{from: from_user, to: to_user, message: message}
    |> MessagesModel.changeset()
    |> execute()
  end

  defp execute(message_changeset) do
    case Repo.insert(message_changeset) do
      {:ok, result} ->
        {:ok, result}

      {:error, reason} ->
        reason
        |> get_error()
        |> handle_error()
    end
  end

  defp get_error(changeset) do
    traverse_errors(changeset, fn {msg, opts} ->
      Enum.reduce(opts, msg, fn {key, value}, acc ->
        String.replace(acc, "%{#{key}}", to_string(value))
      end)
    end)
  end

  defp handle_error(%{from: reason}) do
    case reason do
      "does not exist" ->
        {:error, "Rementente inexistente"}

      _ ->
        Logger.info(reason)
        {:error, "Ocorreu um erro inesperado"}
    end
  end

  defp handle_error(%{to: reason}) do
    case reason do
      "does not exist" ->
        {:error, "Destinatário inexistente"}

      _ ->
        Logger.info(reason)
        {:error, "Ocorreu um erro inesperado"}
    end
  end
end
