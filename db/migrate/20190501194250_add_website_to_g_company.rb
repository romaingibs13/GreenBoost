class AddWebsiteToGCompany < ActiveRecord::Migration[5.2]
  def change
    add_column :g_companies, :website, :String
  end
end
