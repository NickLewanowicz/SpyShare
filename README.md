# SpyShare

The modern web is a shiny and alluring place but we can often forget the power they have and how opaque they can be.


This project aims to demonstrate how a simple user signup can sneak additional information the user was unaware of.


## Chrome Autofill
<img src='https://i.imgur.com/y26h9nL.png' />

A known issue with chrome autofill is that the user may not be aware of all the fields they are providing to the application. In our case we are only showing a first/last name field but actually asking for billing and credit details.


## Video Recording
If you happen to give your camera permisions to a web app for any proper reason, they have the ability to turn it on whenever they want, they can also establish a web socket connection without your consent. These 2 things combined can lead to users providing a direct stream of audio or video without knowing. _For this prototype it simple records to memory._

## Location
A fairly common permission for web apps today is to request location access to provide contextually relevant content or collect required data automatically. This can also be turned on whenever the web app wants and is difficult to know when this is happening.
