<template>
    <div class="min-w-[250px] max-w-[290px] !mb-5 snap-start">
      <Image :imageSrc="conceptToy.image" :imageAlt="conceptToy.name" class="h-[500px] w-full object-cover" />
    </div>
  </template>
  
<script setup>
  import Image from '@/components/Reuseable/Image.vue';


  defineProps({
    conceptToy: Object
  });
</script>
  