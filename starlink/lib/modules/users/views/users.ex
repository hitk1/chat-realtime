defmodule Users.Views.User do

  def render("create_user.json", userId) do
    Jason.encode!(%{
      message: "User created successfully",
      userId: userId
    })
  end
end
