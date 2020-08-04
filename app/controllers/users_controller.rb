class UsersController < ApplicationController
  skip_before_action :authenticate, only: [:create, :signin] 
  before_action :initialize_params

  def create
    user = User.where(email: @email).first
    if !user
      params[:customer][:password] = encrypt_password(params[:customer][:password])
      user = User.create(user_params)

      if user.save
        render json: {
          status: 200,
          message: "Success",
        }
      end
    end
    render json: {
      status: 400,
      message: "Bad request",
      params: params[:customer]
    } if !performed?
  end
  
  def signin
    initialize_params
    user = User.where(email: @email).first
    user2 = User.find_by(email: "@email")

    puts "heeeere = " + user.to_s
    puts "heeeere = " + user2.to_s
    puts "heeeere = " + params.to_s
    # password = user.attributes["password"]
    # password_hash = SCrypt::Password.new(password)

    if user && password_hash == @password
      render json: {
        status: 200,
        message: "Success",
        token: JwtParser.encode(payload)
        }.to_json 
    end
    render json: {
      status: 400,
      message: "Bad request",
    }.to_json if !performed?
  end

  private
  def decrypt_password(password)
    SCrypt::Password.new(password)
  end

  def encrypt_password(password)
    SCrypt::Password.create(password)
  end
  def payload
    payload_jwt = {"email" => @email}
  end 

  def user_params
    params.require(:customer).permit(:last_name, :first_name, :email, :password, :zip_code, :city, :country, :address)
  end

  def initialize_params
    if params[:customer]
      @email = params[:customer][:email]
      @password = params[:customer][:password]
    else
      render json: {
        status: 400,
        message: "Customer's information missing",
      }.to_json && return
    end
  end
end
