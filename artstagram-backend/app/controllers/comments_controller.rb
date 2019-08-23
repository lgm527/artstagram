class CommentsController < ApplicationController

  def index
    @comments = Comment.all
    render json: @comments, :include => {:user => {:only => :name}}
  end

  def create
    @comment = Comment.create(comment_params)
  end

  def show
    @comment = Comment.find(params[:id])
    render json: @comment, :include => {:user => {:only => :name}}
  end

  def update

  end

  def destroy

  end

  private

  def comment_params
    params.require(:comment).permit(:content, :picture_id, :user_id)
  end

end
