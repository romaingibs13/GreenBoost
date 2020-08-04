class AddAddressToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :address, :String
  end
end
