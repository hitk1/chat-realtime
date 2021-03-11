defmodule StartlinkWeb.UserView do

  def render("user_created.json", %{user: %{} = createdUser}) do
    %{
      user: %{
        id: createdUser.id,
        name: createdUser.name,
        phoneNumber: createdUser.phoneNumber
      }
    }
  end

end
