class AddCountryToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :country, :String
  end
end
