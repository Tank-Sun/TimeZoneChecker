<template>
  <div className="mt-3 mb-4 w-[80%] flex justify-around">
    <button @click="prevPage" :disabled="currentPage === 1"><font-awesome-icon :icon="['fas', 'chevron-left']" /> Prev</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Next <font-awesome-icon :icon="['fas', 'chevron-right']" /></button>
  </div>
</template>

<script setup>
  import { ref, computed, defineProps, defineEmits } from 'vue';

  const props = defineProps({
    perPage: Number,
    totalItems: Number,
  });

  const currentPage = ref(1);
  const totalPages = computed(() => Math.ceil(props.totalItems / props.perPage));

  // Emit the updated page number to the parent component
  const prevPage = () => {
    if (currentPage.value > 1) {
      currentPage.value--;
      emit('update:page', currentPage.value);
    }
  };

  const nextPage = () => {
    if (currentPage.value < totalPages.value) {
      currentPage.value++;
      emit('update:page', currentPage.value);
    }
  };

  const emit = defineEmits(['update:page']);
</script>
