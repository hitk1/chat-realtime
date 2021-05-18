defmodule Contacts.Controllers.Contacts do
  alias Contacts.Services.CreateFriendships
  alias Contacts.Services.GetContacts

  def create_list_contacts(conn) do
    %Plug.Conn{assigns: %{current_user: me}, body_params: %{"contactPhones" => phones}} = conn

    CreateFriendships.call(me, phones)
  end

  def get_contacts(conn) do
    %Plug.Conn{assigns: %{current_user: me}} = conn

    GetContacts.call(me)
  end
end
