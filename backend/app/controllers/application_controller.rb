class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken

        # tokenによるCSRF対策を放棄
        skip_before_action :verify_authenticity_token

        helper_method :current_user, :user_signed_in?
end
