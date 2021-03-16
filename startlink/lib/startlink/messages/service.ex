defmodule Startlink.Messages.MessageService do

  def test() do
    Mongo.find(:mongo, "message", %{})
    |> Enum.to_list()
    |> IO.inspect()
  end

  def get_user_messages(%{"user_id" => userId}) do
    result = Mongo.find(:mongo, "message", %{userId: BSON.ObjectId.decode!(userId)})
    |> Enum.to_list()

    case Kernel.length(result) do
      0 ->
        {:error, "Não há mensagens"}
      len when len > 0 ->
        {:ok, result}
      _ ->
        {:error, "Erro ao pesquisar registros"}
    end
  end

end
