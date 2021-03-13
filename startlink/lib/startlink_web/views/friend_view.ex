defmodule StartlinkWeb.FriendView do
  alias Startlink.Friends.FriendsModel, as: Relationship

  def render("relatioship_created.json", %{message: message}) do
    %{ message: message }
  end

end
