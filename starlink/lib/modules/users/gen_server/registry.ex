defmodule Users.Registry do
  require Logger

  def via_tuple(user_id)  do
    {:via, Registry, {__MODULE__, user_id}}
  end

  def whereis_name(key) do
    Registry.whereis_name({__MODULE__, key})
  end

  def start_link() do
    Logger.info("Supervised user")
    Registry.start_link(keys: :unique, name: __MODULE__)
  end

end
