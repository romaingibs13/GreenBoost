class GCompany < ApplicationRecord
    # attr_accessor :name, :description, :green_values

    # validates :name, :description, :green_values
    serialize :ambassadors
    # has_many :ambassadors
end
