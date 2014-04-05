require "sinatra"
require "rubygems"
require "pry"

set :bind, "0.0.0.0"

get "/" do
  "Hello, this is Hubert's web app"
end

get "/time" do
  puts params
  @input = params[:input]
  erb :time
end

get "/gather-info" do
  erb :info
end

post "/info-summary" do
 # how to access the values that weere submitted by the hform!, you
 # can render the erb files, but erb files need a way to acces the values
 # that were submitted by the form!
 puts params
 @name = params[:name]
 @mail = params[:mail]
 @bloodtype = params[:bloodtype]
 @vegetarian = params[:vegetarian]
 erb :summary
end
#<%=This will return the value of the ruby code%>
