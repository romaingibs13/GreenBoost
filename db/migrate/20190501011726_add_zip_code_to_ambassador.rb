class AddZipCodeToAmbassador < ActiveRecord::Migration[5.2]
  def change
    add_column :ambassadors, :zip_code, :String
  end
end
