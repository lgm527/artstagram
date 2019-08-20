class LikesController < ApplicationController

  def index
    @likes = Like.all
    render json: @likes
  end

  def create
    @like = Like.new
  end

  def destroy

  end


end
