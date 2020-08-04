class AddCityToAmbassador < ActiveRecord::Migration[5.2]
  def change
    add_column :ambassadors, :city, :String
  end
end
