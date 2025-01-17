<template>
  <span class="size">
    <p>Size:</p>
    <select class="size-input" v-model="selectedSize" @change="emitSize">
      <option disabled>--</option>
      <option value="S">S</option>
      <option value="M">M</option>
      <option value="L">L</option>
      <option value="XL">XL</option>
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

<style>
.size {
  display: flex;
  flex-direction: row;
  gap: 2.3rem;
  text-align: center;
  margin-bottom: 10px;
}

.size-input {
  width: 40px;
}
</style>
