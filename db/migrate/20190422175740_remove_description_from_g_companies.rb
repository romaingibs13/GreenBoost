class RemoveDescriptionFromGCompanies < ActiveRecord::Migration[5.2]
  def change
    remove_column :g_companies, :description, :text
  end
end
