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

get "/ajax" do
  erb :ajax
end

get "/address" do
  puts params

  consumer_key = ENV["CONSUMER_KEY"]
  consumer_secret = ENV["CONSUMER_SECRET"]
  token = ENV["TOKEN"]
  token_secret = ENV["TOKEN_SECRET"]
  api_host = "http://api.yelp.com"

  consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => api_host})
  access_token = OAuth::AccessToken.new(consumer, token, token_secret)

  search_term = params[:searchTerm]
  path = "/v2/search?term=#{search_term}&location=Austin,Tx"

  jresp = JSON.parse(access_token.get(path).body)
  rating = jresp["businesses"]

  jresp['businesses'].each do | business |
   if business['is_closed'] == false
     puts  "#{business["name"]}" + " " + "#{business["rating"]}"
     puts business['location']['address']
    end
  end

# jrsep business --> json
  p jresp["businesses"]

  places = jresp["businesses"]

  content_type :json
  # { :key1 => 'value1', :key2 => 'value2' }.to_json
  places.to_json
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
  path = "/v2/search?term=pizza&location=Austin,Tx"
  path2 = "/v2/search?term=pizza&location=Austin,Tx&sort=2"

  @jresp = JSON.parse(access_token.get(path).body)
  jresp2 = JSON.parse(access_token.get(path2).body)
  erb :yelp
end

get "/practice" do
  erb :pratice
end

get "/map" do
  erb :omg
end



post "/test" do

  puts params
  "hi"
end

get "/practice2" do
  erb :practice2
end

post "/practice2" do
    puts params

  consumer_key = ENV["CONSUMER_KEY"]
  consumer_secret = ENV["CONSUMER_SECRET"]
  token = ENV["TOKEN"]
  token_secret = ENV["TOKEN_SECRET"]
  api_host = "http://api.yelp.com"

  consumer = OAuth::Consumer.new(consumer_key, consumer_secret, {:site => api_host})
  access_token = OAuth::AccessToken.new(consumer, token, token_secret)

  search_term = params[:searchTerm]
  path = "/v2/search?term=#{search_term}&location=Austin,Tx"

  jresp = JSON.parse(access_token.get(path).body)
  rating = jresp["businesses"]

  jresp['businesses'].each do | business |
    if business['is_closed'] == false
     puts  "#{business["name"]}" + " " + "#{business["rating"]}"
     puts business['location']['address']
   #    # printf("%-32s  %10s  %3d  %1.1f\n",
   #              # business['name'], business['address'],
   #              # business['review_count'], business['rating']) -->

    end
end
  '{"businesses": "#{rating}"}'
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
