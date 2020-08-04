Rails.application.routes.draw do
  post "/graphql", to: "graphql#execute"
  resources :companies
  resources :green_ads
  resources :users do
    post :signin, on: :collection
  end
  resources :ambassadors do
    post :signin, on: :collection
  end
end
