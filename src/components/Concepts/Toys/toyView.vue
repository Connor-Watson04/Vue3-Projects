<template>
    <div class="min-w-[250px] snap-start">
      <img :src="conceptToy.image" :alt="conceptToy.name" class="h-auto w-full object-cover" />
    </div>
  </template>
  
  <script setup>
  defineProps({
    conceptToy: Object
  });
  </script>
  