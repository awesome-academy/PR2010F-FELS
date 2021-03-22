Rails.application.routes.draw do
  resource :courses
  get 'courses/index'
  get 'courses/show'
  root 'static_pages#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
