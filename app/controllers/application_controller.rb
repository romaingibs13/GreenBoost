class ApplicationController < ActionController::API
  before_action :authenticate

  def authenticate
    token = params[:token]
    if token
      decoded = JwtParser.decode(token)
      params[:logged] = true if decoded
    else
      render json: {
        status: 400,
        message: "This action needs the user to be logged",
      }.to_json
    end
  end
end
