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

  def render("user_messages.json", %{reason: reason}) do
    %{message: reason}
  end

  def render("user_messages.json", %{messages: messages}) do
    result = Enum.map(messages, fn item ->
      %{"toUser" => toUser, "message" => message} = item

      %{toUser: BSON.ObjectId.encode!(toUser), message: message}
    end)

    %{data: result}
  end

end
