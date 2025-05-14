<script setup>
import Text from '../Reuseable/Text.vue';
import Image from '../Reuseable/Image.vue';

const props = defineProps({
  URL: String,
  name: String,
  date: String,
  items: Number,
  Price: Number
})
</script>

<template>
  <div class="flex h-[100px]">
    <Image class="h-full" :imageSrc="`${props.URL}`" />
    <div>
      <Text class="text-[var(-color-text)]">Ordered: {{ props.date }}</Text>
      <div class="flex gap-[5px]">
        <Text class="text-[var(-color-text)]">{{ props.name }}</Text>
        <Text class="text-[var(-color-text)]">{{ props.Price }}</Text>
      </div class="flex gap-[5px]">
    </div>
  </div>
</template>