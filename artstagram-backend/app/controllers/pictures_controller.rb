class PicturesController < ApplicationController

  def index
    @pictures = Picture.all
    render json: @pictures, include: [:likes, :comments]
  end

  def show
    @picture = Picture.find(params[:id])
    render json: @picture, include: [:comments]
  end

end
