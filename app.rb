require "sinatra"
require "rubygems"
require "pry"
require 'dotenv'
require 'oauth'
require 'json'

Dotenv.load

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

get "/yelp" do

  consumer_key = ENV["CONSUMER_KEY"]
  consumer_secret = ENV["CONSUMER_SECRET"]
  token = ENV["TOKEN"]
  token_secret = ENV["TOKEN_SECRET"]
  api_host = "http://api.yelp.com"

  consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => api_host})
  access_token = OAuth::AccessToken.new(consumer, token, token_secret)
  #v2/search?term=food&ll=37.788022,-122.399797
  path = "/v2/search?term=icecream&location=Austin,Tx&sort=2"
  path2 = "/v2/search?term=icecream&location=Austin,Tx&sort=2"

  @jresp = JSON.parse(access_token.get(path).body)
  jresp2 = JSON.parse(access_token.get(path2).body)
  erb :yelp
end

get "/practice" do
  erb :pratice
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
