![ScreenShot](https://raw.githubusercontent.com/hasmany/winfood/screenshots/Screenshots/hippo.png) Win-Food
===

Hosted at: <http://win-food.herokuapp.com/>

Win-food is a food finder application that visualizes locations in downtown Austin based on rating and price.

Tech
===

Server-side: Ruby with the Sinatra framework.

Client-side: JQuery,JQuery UI

APIs : Google maps, Yelp

Deployment: Heroku

User Interface
===

A user can input a food type they would like to search for in the input box. A input can be completed when they hit enter OR
click the get food button.

![ScreenShot](https://raw.githubusercontent.com/hasmany/winfood/screenshots/Screenshots/buttonBefore.png)

Watch the hippo jump as a food is selected! The hippo will also tell the user what food he just ate.

![ScreenShot](https://raw.githubusercontent.com/hasmany/winfood/screenshots/Screenshots/buttonAfter.png)

A map will render on the screen with several hippos varying in size. The user can click the icon and a popup will display
showing the address, phone number, and picture as well as the rating for the establishment. Larger icons means the place has a higher rating.

![ScreenShot](https://raw.githubusercontent.com/hasmany/winfood/screenshots/Screenshots/win-food-map.png)

Purpose
===

The goal is to use the yelp interface with the UI of a map which more easily shows multiple locations while at the same time providing useful information.

Future goals
===

1. Incorporate HTML5 geolocation, to get the location of a user and display them on the map.
2. With geolocation, a user can input a zipcode so the food find would not limited to austin.
3. Incorporate mapBox or leaflet API in place of google maps because they allow more customization, including zoom size.
4. Research and use a distance algorithm to display directions to locations.
5. Allow more search parameters such as locatios by distance ex. (5 miles, 10 miles), payment type(cash only), hours of business etc.

