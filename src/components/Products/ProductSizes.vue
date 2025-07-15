<template>
  <span class="flex flex-row gap-2 text-center !mb-[5px]">
    <p>Size:</p>
    <select
      class="w-10 border border-gray-300 rounded text-center text-xs"
      v-model="selectedSize"
      @change="emitSize"
    >
      <option >--</option>
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL ">XL</option>
    </select>
  </span>
</template>

<script setup>
import { ref } from 'vue'

// A local reactive variable to track the selected size
const selectedSize = ref('--')

// Define emits so that the parent can listen for changes in selected size
const emit = defineEmits(['update:size'])

// Emit the selected size whenever it changes
function emitSize() {
  emit('update:size', selectedSize.value)
}
</script>
