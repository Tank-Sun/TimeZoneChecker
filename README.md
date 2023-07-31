# Time Zone Checker

Demo: https://timezonechecker.up.railway.app/

A simple tool made by Vue 3 that can check the time zone and local current time of any location. The locations are showed and marked on Google Map, and the selected search records can be deleted.

Through building this app, I practiced my skill of building front end by Vue 3, and the usage of Google Map API.


## Features

1. Get current location from browser
!["Get current location from browser"](https://github.com/Tank-Sun/TimeZoneChecker/blob/main/Assets/currentLocation.gif?raw=true)

2. Search a location inside the search bar, show the map with a marker, put it in the table, and also show the time zone and local time
!["Search a location"](https://github.com/Tank-Sun/TimeZoneChecker/blob/main/Assets/searchLocation.gif?raw=true)

3. Delete the searched location and their markers
!["Delete the searched location"](https://github.com/Tank-Sun/TimeZoneChecker/blob/main/Assets/deleteLocation.gif?raw=true)

4. Pagination, display a maximum of 10 records on each page
!["Pagination"](https://github.com/Tank-Sun/TimeZoneChecker/blob/main/Assets/pagination.gif?raw=true)


## Setup

Install dependencies with `npm install`

## Running Backend Development Server

```sh
npm run dev
```
## Running Frontend Development Server

```sh
npm run dev
```



## Dependencies

Frontend:
- vue
- axios
- @googlemaps/js-api-loader
- @fortawesome/vue-fontawesome
- tailwindcss
- vite
- uuid

<br>
<br>
  

Backend:
- axios
- cors
- dotenv
- express
- morgan

