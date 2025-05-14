<template>
  <div class="flex items-center gap-2 !mb-2 md:!mt-1">
    <Button 
    type="button" 
    class="!bg-none !bg-gray-300 rounded-lg !p-1" 
    v-model="chosenQuantity"
   @click="() => { chosenQuantity--; emitQuantity(); }"
   >
      <MinusIcon />
    </Button>
    <input
    class="!px-1 h-full w-12 text-center text-xs text-black-700 border border-gray-300 rounded md:py-2"
    type="number"
    placeholder="0"
    v-model="chosenQuantity"
    @change="emitQuantity"
    />
    <Button 
    type="button" 
    class="!bg-none !bg-gray-300 rounded-lg !p-1" 
    v-model="chosenQuantity"
   @click="() => { chosenQuantity++; emitQuantity(); }"
    >
      <PlusIcon />
    </Button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

import Button from '../Reuseable/Button.vue'
import MinusIcon from '../Reuseable/icons/minusIcon.vue'
import PlusIcon from '../Reuseable/icons/plusIcon.vue'

const chosenQuantity = ref(0)


const emit = defineEmits(['update:quantity'])

function emitQuantity() {
  emit('update:quantity', chosenQuantity.value)
}
</script>
