defmodule Users.Controllers.Friends do
  alias Users.Services.GetFriendsService

  def get_friends(conn) do
    %Plug.Conn{body_params: %{"phones" => phonesList}} = conn

    GetFriendsService.call(phonesList)
  end
end
