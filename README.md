# Freshly

## The Problem:
How often do you walk In the kitchen just to find your food has gone bad because you lost track of time and forgot to eat it? If this sounds like you, you are not alone. In fact, according to the USDA, the average american wastes nearly 218.9 lbs of food per year. Our team built Freshly to make it easier for the everyday person to reduce their waste and keep it fresh.

## Our Soution:
We designed the freshly mobile app to help consumers reduce this waste. Freshly is a mobile app that makes it easy to predict the shelf life of your foods and track your personal wasting habits. As a team we acknowledge food can often go to waste because it is just one more thing to keep track of in the midst of a busy and unpredictable life. Freshly solves this problem by using advanced technology to recognize users inventory and track their shelf life on an auto-generated timer.

## Features:
- Our app allows users to either sign up or login and view their current food inventory
- On the home screen, you can see the foods that are expiring the soonest and also see a data visualization of the your percentage of food you’ve consumed vs wasted
- You can mark food as eaten or thrown away and see your percentage update in real time 
- Our app easily allows users to add a food by taking or uploading a photo or entering a custom item
- We leveraged Google Cloud Vision API to identigy the given food and pull in the shelf life from the USDA to calculate the expected expiration date 
- Once, this item has been added to your inventory, you can view recipes and nutritional information.
- You can click on a recipe to see full recipe details and save recipes to your favorite recipes

## Our Tech Stack:
To build Freshly, we choose to use React Native and Expo for our frontend because we wanted to create a modular mobile app that would run on both IOS and Android. We also used Redux to manage state throughout the app and React-Native Elements for styling.
On our backend, Freshly runs on an Express server, built in a Node environment. We chose Sequelize to interact with our PostgreSQL database so that we could relationally store information about expiration dates, our users, the foods they've added, the recipes they've favorited, and data about the amount of food they've saved vs wasted.
To identify images of food so that users could easily add foods to their account, we chose the Google Cloud Vision API. We also integrated with the Spoonacular API to get recipes for each food and the Nutrionix API to get nutrition information.
