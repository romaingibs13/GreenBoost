class AddCharacteristicsToGCompanies < ActiveRecord::Migration[5.2]
  def change
    add_column :g_companies, :characteristics, :text
  end
end
