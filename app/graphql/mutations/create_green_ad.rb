module Mutations
  class CreateGreenAd < BaseMutation
    # arguments passed to the `resolved` method
    argument :description, String, required: true
    argument :product, String, required: true
    argument :price, Float, required: true

    # return type from the mutation
    type Types::GreenAdType

    def resolve(description: nil, product: nil, price: 0)
      GreenAd.create!(
        description: description,
        product: product,
        price: price
      )
    end
  end
end