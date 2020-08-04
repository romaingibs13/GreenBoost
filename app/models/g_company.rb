class GCompany < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  serialize :characteristics
  serialize :shop
end
