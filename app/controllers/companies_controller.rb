class CompaniesController < ApplicationController
  before_action :initialize_params, only: [:create]
  skip_before_action :authenticate, only: [:create]

  def create
    company = GCompany.find_by(name: @company_name)
    
    if company
      update_ambassadors(company)
    else
      company = GCompany.new(company_params)
      ambassador = AmbassadorsController.create_ambassador(ambassador_params)
    
      if company.save && ambassador
        render json: {
          status: 200,
          message: "Success",
          }.to_json
      end
    end
    render json: {
      status: 400,
      message: "fail to save in database",
    } if !performed?
  end

  def update_ambassadors(company)
    ambassador = Ambassador.find_by(email: @email)

    if !ambassador
      ambassador = Ambassador.create(ambassador_params)

      characteristics_hash = company.attributes["characteristics"]
      characteristics_hash["ambassadors"] << @email
      company.update_attribute(:characteristics, characteristics_hash)

      if company.save && ambassador.save
        render json: {
          status: 200,
          message: "Success",
          }
      end
    end
    render json: {
      status: 400,
      message: "Bad request"
    } if !performed?
  end

  private
  def encrypt_password(password)
    SCrypt::Password.create(password)
  end

  def company_params
    params.require(:company).permit(:website, :name, :green_values, characteristics: [countries: [], activities_areas: [], ambassadors: []])
  end

  def ambassador_params
    params.require(:customer).permit(:last_name, :first_name, :email, :password, :zip_code, :city, :country, :address, :company_name)
  end

  def initialize_params
    if params
      if params[:company]
        @company_name = params[:company][:name] 
      end

      if params[:customer]
        @email = params[:customer][:email]
        @first_name = params[:customer][:first_name]
        @last_name = params[:customer][:last_name]
        params[:customer][:password] = encrypt_password(params[:customer][:password])
        params[:customer][:company_name] = @company_name
      end
    end
  end
end
