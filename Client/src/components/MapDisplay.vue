<template>
  <div className="w-[80%] h-[24rem] md:h-[26rem] lg:w-[30%] lg:h-[30rem] rounded-2xl lg:mr-10" ref="mapContainer"></div>
</template>

<script setup>
  import { ref, onMounted, watch, defineProps } from 'vue';
  import { Loader } from '@googlemaps/js-api-loader';

  const props = defineProps({
    locations: Array,
    latestLocation: Object,
  });

  let map;
  let mapContainer = ref(null);
  let markers = ref({});


  // Load the Google Maps JavaScript API
  onMounted(async () => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      version: "weekly",
    });

    try {
      // Load the Google Maps JavaScript API
      await loader.load();

      // Initialize the map
      map = new google.maps.Map(mapContainer.value, {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 8,
      });

      // // Create markers for existing locations
      // for (let location of props.locations) {
      //   addMarker(location);
      // }

    } catch (error) {
      // Handle the error
      console.error(error);
    }
  });

  // Add or remove markers when the locations array changes
  watch(() => props.locations, (newLocations, oldLocations) => {
    const newIds = newLocations.map(loc => loc.id);
    const oldIds = oldLocations.map(loc => loc.id);

    for (let location of oldLocations) {
      if (!newIds.includes(location.id)) {
        removeMarker(location);
      }
    }

    for (let location of newLocations) {
      if (!oldIds.includes(location.id)) {
        addMarker(location);
      }
    }
  }, {deep: true});

  // Update map center
  watch(() => props.latestLocation, (newLocation) => {
    if(newLocation){
      map.setCenter(newLocation.locaInfo.place.geometry.location);
    }
  }, {deep: true});


  const addMarker = (location) => {
    let marker = new google.maps.Marker({
      position: location.locaInfo.place.geometry.location,
      map,
    });
    markers.value[location.id] = marker;
  }

  const removeMarker = (location) => {
    let marker = markers.value[location.id];

    // Seems like marker.setMap(null) doesn't work correctly
    // marker.setMap(null);
    // marker = null;
    marker.setVisible(false);
    delete markers.value[location.id];
  }

</script>









