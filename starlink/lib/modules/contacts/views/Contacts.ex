defmodule Contacts.Views.Contacts do
  def render("friendship_created", message) do
    Jason.encode!(%{
      message: message
    })
  end

  def render("friendships", friendships) do
    Jason.encode!(%{
      data: friendships
    })
  end
end
