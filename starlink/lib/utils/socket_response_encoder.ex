defmodule Utils.SocketEncoder do

  def call(operation, data) do
    Jason.encode!(
      %{
        operation: operation,
        data: data
      }
    )
  end
end
