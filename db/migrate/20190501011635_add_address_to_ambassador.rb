class AddAddressToAmbassador < ActiveRecord::Migration[5.2]
  def change
    add_column :ambassadors, :address, :String
  end
end
