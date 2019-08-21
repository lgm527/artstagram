class PicturesController < ApplicationController

  def index
    @pictures = Picture.all
    render json: @pictures, include: [:likes]
  end

end
