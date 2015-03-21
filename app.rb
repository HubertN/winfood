require "sinatra"
require "rubygems"
require "pry"
require 'dotenv'
require 'oauth'
require 'json'

Dotenv.load

set :bind, "0.0.0.0"

get "/" do

  redirect "/home"
end

get "/home" do
  erb :ajax
end

get "/places" do
  puts params

  consumer_key = ENV["CONSUMER_KEY"]
  consumer_secret = ENV["CONSUMER_SECRET"]
  token = ENV["TOKEN"]
  token_secret = ENV["TOKEN_SECRET"]
  api_host = "http://api.yelp.com"

  consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => api_host})
  access_token = OAuth::AccessToken.new(consumer, token, token_secret)

  search_term = params[:searchTerm]

  path = "/v2/search?term=#{search_term}&location=Austin,Tx&limit=11"


  jresp = JSON.parse(access_token.get(path).body)
  rating = jresp["businesses"]

  jresp['businesses'].each do | business |
  if business['is_closed'] == false
     puts  "#{business["name"]}" + " " + "#{business["rating"]}"
     puts business['location']['address']
    end
  end


  p jresp["businesses"]

  places = jresp["businesses"]

  content_type :json

  places.to_json
end



