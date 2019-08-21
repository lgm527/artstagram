class PicturesController < ApplicationController

  def index
    @pictures = Picture.all
    render json: @pictures, include: [:likes, :comments]
  end

end
