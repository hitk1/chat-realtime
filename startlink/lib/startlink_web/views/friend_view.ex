defmodule StartlinkWeb.FriendView do
  alias Startlink.Friends.FriendsModel, as: Relationship

  def render("relatioship_created.json", %{relationship: %Relationship{} = relation}) do
    %{ id: relation.id }
  end

end
