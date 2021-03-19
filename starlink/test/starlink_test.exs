defmodule StarlinkTest do
  use ExUnit.Case
  doctest Starlink

  test "greets the world" do
    assert Starlink.hello() == :world
  end
end
