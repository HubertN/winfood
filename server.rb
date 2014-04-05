require "sinatra"

set :bind, "0.0.0.0" # this is needed for vagrant

get "/" do
  "Hey, this is a web app"
end

get "/hello" do
  "hello friends!"
end

post "/entries" do
  title = params[:title]
  body = params[:body]
  # do something using title and body here
end





