<template>
  <div className="w-[80%] xl:w-[40%] 2xl:w-[35%] flex flex-col items-center lg:ml-10">
    <button className="bg-red-700 hover:bg-red-800 text-white py-2 px-3 mx-2 mt-8 mb-2 md:mb-3 rounded-lg text-center font-bold cursor-pointer" @click="deleteSelectedLocations">Delete</button>
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full">
      <table className="w-full text-sm text-center">
        <thead className="text-xs text-gray-700 uppercase">
          <tr>
            <th scope="col" className="px-6 py-3"><input type="checkbox" v-model="selectAll" @change="toggleAll" /> Select All</th>
            <th scope="col" className="px-6 py-3 bg-gray-50">Address</th>
            <th scope="col" className="px-6 py-3 bg-gray-50">Time Zone</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-300" v-for="location in displayedLocations" :key="location.id">
            <td className="px-6 py-4"><input type="checkbox" v-model="selectedLocations" :value="location" /></td>
            <td className="px-6 py-4 bg-gray-50">{{ location.locaInfo.place.formatted_address }}</td>
            <td className="px-6 py-4 bg-gray-50">{{ location.locaInfo.timeZone.timeZoneName }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <Pagination :perPage="10" :totalItems="locations.length" @update:page="currentPage = $event" />
  </div>
</template>

<script setup>
  import { ref, computed, watch } from 'vue';
  import Pagination from './Pagination.vue';


  const props = defineProps({
    locations: Array,
    'updateLocations': Function
  });

  const emit = defineEmits(['update:locations']);

  let selectedLocations = ref([]);
  let currentPage = ref(1);
  let selectAll = ref(false);

  // Display 10 locations per page
  const displayedLocations = computed(() => {
    let start = (currentPage.value - 1) * 10;
    return props.locations.slice(start, start + 10);
  });

  // Update the selectedLocations array when the displayedLocations array changes
  watch(displayedLocations, () => {
    selectedLocations.value = selectAll.value ? [...displayedLocations.value] : [];
  });


  // Delete the selected locations from the locations array, emit the updated locations array to the parent component
  const deleteSelectedLocations = () => {
    const newLocations = props.locations.filter(location => !selectedLocations.value.includes(location));
    selectedLocations.value = [];
    selectAll.value = false;
    
    emit('update:locations', newLocations); 
  };

  // Select all locations
  const toggleAll = () => {
    selectedLocations.value = selectAll.value ? [...displayedLocations.value] : [];
  };
</script>

