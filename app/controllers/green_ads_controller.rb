class GreenAdsController < ApplicationController
  before_action :is_logged?, only: [:create]
  def create
    token = is_logged?

    if token && token_valid?(token)
      render json: {
        status: 200,
        message: "Success",
        token: JwtParser.decode(params[:ambassador][:token])
        }.to_json
    else
      render json: {
        status: 400,
        message: "Bad request"
      }.to_json
    end
  end
  private

  def is_logged?
    JwtParser.decode(params[:ambassador][:token])
  end

  def token_valid?(token)
    now = Time.now
    exp = Time.at(token[:exp])
    now < exp
  end

end
