class CommentsController < ApplicationController

  def index
    @comments = Comment.all
    @likes = Like.all
    render json: @comments
  end

  def create
    @comment = Comment.new
  end

  def show

  end

  def update

  end

  def destroy

  end

end
