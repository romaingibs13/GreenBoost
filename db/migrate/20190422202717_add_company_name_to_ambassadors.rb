class AddCompanyNameToAmbassadors < ActiveRecord::Migration[5.2]
  def change
    add_column :ambassadors, :company_name, :string
  end
end
