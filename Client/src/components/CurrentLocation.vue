<template>
  <div className="flex flex-col items-center my-10 md:my-20 mx-4">
    <div>
      <h1 className="font-bold text-3xl md:text-6xl">
        <font-awesome-icon :icon="['fas', 'clock-rotate-left']" /> Time Zone Checker
      </h1>
    </div>
    <div className="my-8">
      <button className='py-3 px-4 rounded-xl uppercase bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl dark:focus:ring-green-800 text-gray-800 font-semibold md:text-lg mt-2 md:mt-4' @click="getCurrentLocation">
        <font-awesome-icon :icon="['fas', 'location-crosshairs']" /> Current Location
      </button>
    </div>
    <p className="text-md md:text-2xl text-center" v-if="address">{{address}}</p>
    <p className="text-sm text-red-600" v-else-if="error">{{ error }}</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import axios from 'axios';

  const address = ref('');
  const error = ref('');

  // Get the coordinates of the current location using HTML geolocation API, pass them to the geocodePosition function
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        geocodePosition,
        handleLocationError
      );
    } else {
      error.value = "Geolocation is not supported by this browser.";
    }
  };

  // Send the coordinates back to the server, get the address back using the Google Map API
  const geocodePosition = async (position) => {
    try {
      const response = await axios.post(
        `api/geocode`,
        {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      );
      address.value = `${response.data.results[0].address_components[3].short_name}, ${response.data.results[0].address_components[4].short_name}, ${response.data.results[0].address_components[5].short_name} `;
    } catch (error) {
      error.value = "Unable to retrieve your address";
    }
  };

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        error.value = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        error.value = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        error.value = "The request to get user location timed out.";
        break;
      default:
        error.value = "An unknown error occurred.";
        break;
    }
  };

</script>
