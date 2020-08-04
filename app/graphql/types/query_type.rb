module Types
  class QueryType < BaseObject
    # queries are just represented as fields
    # `all_links` is automatically camelcased to `allLinks`
    field :all_green_ads, [GreenAdType], null: false

    # this method is invoked, when `all_link` fields is being resolved
    def all_green_ads
      GreenAd.all
    end
  end
end

