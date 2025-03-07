<template>
  <form class="flex flex-row mb-2 gap-2">
    <label class="mr-2">Quantity:</label>
    <input
      class="!px-1 w-12 text-center text-xs text-black-700 border border-gray-300 rounded"
      type="number"
      maxlength="10"
      placeholder="0"
      min="0"
      v-model="chosenQuantity"
      @change="emitQuantity"
    />
  </form>
</template>

<script setup>
import { ref } from 'vue'

const chosenQuantity = ref(0)

const emit = defineEmits(['update:quantity'])

function emitQuantity() {
  emit('update:quantity', chosenQuantity.value)
}
</script>
