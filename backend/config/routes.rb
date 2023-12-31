Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    namespace :v1 do
      resources :test, only: [:index]
      resources :likes, only: [:index, :create]
      resources :chat_rooms, only: [:index, :show]
      resources :messages, only: [:create]
      resources :users, only: [:index, :create, :update]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'api/v1/auth/registrations'
      }

      namespace :auth do
        resources :sessions, only: %i[index]
      end
    end
  end
end
