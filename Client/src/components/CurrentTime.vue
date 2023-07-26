<template>
  <div className="my-4 text-sm md:text-xl" v-if="location">
    <p><span className="font-bold">Searched Location:</span> {{location.locaInfo.place.formatted_address}}</p>
    <p><span className="font-bold">Time Zone:</span> {{location.locaInfo.timeZone.timeZoneName}}</p>
    <p><span className="font-bold">Local Current Time:</span> {{getLocalTime(location.locaInfo.timeZone)}}</p>
  </div>
</template>

<script setup>

  const props = defineProps({
    location: Object
  });

  // Calculate the local time based on the time zone
  const getLocalTime = (timeZone) => {
    const now = new Date();
    const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
    const localTime = new Date(utc + (1000 * timeZone.rawOffset) + (1000 * timeZone.dstOffset));
    return localTime.toLocaleString();
  };
</script>

