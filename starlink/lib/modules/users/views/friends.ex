defmodule Users.Views.Friends do

  def render("friends_list", friends) do
    Jason.encode!(%{
      data: friends
    })
  end

end
