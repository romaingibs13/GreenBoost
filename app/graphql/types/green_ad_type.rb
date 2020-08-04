module Types
  class GreenAdType < BaseObject
    field :id, ID, null: false
    field :product, String, null: false
    field :price, Float, null: false
    field :description, String, null: false
  end
end