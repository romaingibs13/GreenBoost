class AddCountryToAmbassador < ActiveRecord::Migration[5.2]
  def change
    add_column :ambassadors, :country, :String
  end
end
