class UsersController < ApplicationController

  def index
    @users = User.all
    render json: @users, include: [:comments]
  end

  def show
    @user = User.find(params[:id])
    render json: @user, include: [:comments]
  end

end
