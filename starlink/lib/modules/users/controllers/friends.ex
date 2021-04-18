defmodule Users.Controllers.Friends do
  alias Users.Services.FindFriendsService

  def find_friends(conn) do
    %Plug.Conn{body_params: %{"phones" => phonesList}} = conn

    FindFriendsService.call(phonesList)
  end
end
