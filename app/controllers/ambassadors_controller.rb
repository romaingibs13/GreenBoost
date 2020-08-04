class AmbassadorsController < ApplicationController
  skip_before_action :authenticate, only: [:signin, :create_ambassador]

  def self.create_ambassador(ambassador_params)
    ambassador = Ambassador.create(ambassador_params)
  end

  def signin
    initialize_params
    company = GCompany.find_by(name: @company_name.downcase)
    ambassador = Ambassador.find_by(email: @email)

    if ambassador && company
      password = ambassador.attributes["password"]
      password_hash = decrypt_password(password)
      
      if ambassador && company && password_hash == @ambassador_password && company.characteristics["ambassadors"].include?(@email)
        render json: {
          status: 200,
          message: "Success",
          token: JwtParser.encode(payload)
        }
      end
    end
    render json: {
      status: 400,
      message: "Bad request"
    } if !performed?
  end

  private
  def decrypt_password(password)
    SCrypt::Password.new(password)
  end

  def initialize_params
    if params[:ambassador]
      @email = params[:ambassador][:email]
      @ambassador_password = params[:ambassador][:password]
      @company_name = params[:ambassador][:company_name] 
    end

    if params[:customer]
      @email = params[:customer][:email]
      @ambassador_password = params[:customer][:password]
      @company_name = params[:customer][:company_name] 
    end
  end
  
  def payload
    payload_jwt = {}
    payload_jwt[@email] = @company_name
    payload_jwt 
  end 
end
