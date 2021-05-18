defmodule Contacts.Routes.Contacts do
  import Plug.Conn
  use Plug.Router

  require Logger

  alias Starlink.ErrorView
  alias Contacts.Controllers.Contacts, as: ContactsController
  alias Contacts.Views.Contacts, as: ContactsView

  plug(:match)
  plug(:dispatch)

  # Lista todos os contatos
  get "/" do
    ContactsController.get_contacts(conn)
    |> handle_cast(conn)
  end

  # Cria a lista de contatos por telefone
  post "/" do
    ContactsController.create_list_contacts(conn)
    |> handle_cast(conn)
  end

  match _ do
    conn
    |> send_resp(404, Jason.encode!(%{success: false, message: "Inválida"}))
  end

  defp handle_cast({:has_no_friendship, message}, conn) do
    conn
    |> send_resp(400, ErrorView.render("message", message))
  end

  defp handle_cast({:friendship, result}, conn) do
    conn
    |> send_resp(200, ContactsView.render("friendships", result))
  end

  defp handle_cast({:created, message}, conn) do
    conn
    |> send_resp(202, ContactsView.render("friendship_created", message))
  end
end
