module Types
  class MutationType < Types::BaseObject
    field :create_green_ad, mutation: Mutations::CreateGreenAd, null: false,
      description: "An example field added by the generator"
  end
end
