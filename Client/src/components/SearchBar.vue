<template>
  <div>
    <div className="flex flex-col md:flex-row items-center">
      <input className="rounded-lg border-2 border-indigo-200 focus:outline-none focus:border-indigo-500 p-3 w-60 md:w-80 mx-4 mt-4 md:my-4" v-model="searchInput" type="text" placeholder="Enter a location" @keyup.enter="searchLocation">
      <button className="bg-blue-700 text-white py-2 px-3 mx-2 my-2 w-24 rounded-lg text-center font-bold shadow-lg shadow-gray-400 cursor-pointer hover:scale-105 ease-in duration-100" @click="searchLocation">Search</button>
    </div>
    <p className="text-sm text-red-600 self-start ml-6" v-if="invalid">{{ errMsg }}</p>
  </div>
</template>

<script setup>
  import { ref } from 'vue';

  let searchInput = ref('');
  let invalid = ref(false);
  let errMsg = ref('');

  //  emit the search event to the parent component, check if the input is empty
  const searchLocation = () => {
    invalid.value = false;
    if (!searchInput.value) {
      invalid.value = true;
      errMsg.value = 'Please enter a location.';
      return;
    }
    emit('search', searchInput.value);
    searchInput.value = '';
  };

  const emit = defineEmits(["search"]);

</script>
