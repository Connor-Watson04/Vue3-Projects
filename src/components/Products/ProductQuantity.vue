<template>
  <form class="quant">
    <label class="quantity-text">Quantity:</label>
    <input
      class="quant-input"
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
<style>
.quant {
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
}

.quantity-text {
  margin-right: 10px;
}

.quant-input {
  padding: 2px 3px;
  width: 40px;
  text-align: left;
  font-size: 12px;
}
</style>
