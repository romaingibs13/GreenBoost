class Ambassador2 < ApplicationRecord
  has_secure_password
  validates :email, presence: true, uniqueness: true
  # validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :first_name, presence: true, uniqueness: true
  validates :last_name, presence: true, uniqueness: true

  # validates :password,
  #           length: { minimum: 6 },
  # if: -> { new_record? || !password.nil? }
end
