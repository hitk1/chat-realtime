defmodule StartlinkWeb.FriendController do
  use StartlinkWeb, :controller

  action_fallback StartlinkWeb.FallbackController

  @type create_relationship_params :: %{userId: String.t(), friendPhones: []}

  @doc """
    Rota de criação das amizades por numeros de celulares
  """
  @spec create(%Plug.Conn{}, create_relationship_params) :: %{}
  def create(conn, params) do
    with {:ok, message} <- Startlink.create_friend_relationship(params) do
      conn
      |> put_status(:created)
      |> render("relatioship_created.json", message: message)
    end
  end
end
