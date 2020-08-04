class CreateGreenAds < ActiveRecord::Migration[5.2]
  def change
    create_table :green_ads do |t|
      t.string :product
      t.float :price
      t.text :description

      t.timestamps
    end
  end
end
