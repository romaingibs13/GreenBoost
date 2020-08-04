class CreateGCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :g_companies do |t|
      t.string :name
      t.text :green_values
      t.text :ambassadors

      t.timestamps
    end
  end
end
