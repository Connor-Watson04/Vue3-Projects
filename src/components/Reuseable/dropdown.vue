<script setup>
import { ref } from 'vue';

import arrowIcon from './icons/arrowIcon.vue';
import Text from './Text.vue';


defineProps({
    message: String,
})

const isOpen = ref(false)
const emit = defineEmits(['toggleMenu'])


const toggleMenu = () => {
    isOpen.value = !isOpen.value
    emit('toggleMenu', isOpen.value)
}


</script>

<template>
    <div class="w-full" v-bind="$attrs">
      <div @click="toggleMenu" class="p-2 justify-between flex flex-row items-center cursor-pointer">
        <Text class="!text-start">
          {{ message }}
        </Text>
        <button class="transition-transform duration-300 ease-in-out">
          <arrowIcon :class="['transform transition-transform duration-300', isOpen ? 'rotate-180' : 'rotate-0']" />
        </button>
      </div>
  
      <Transition name="dropdown">
        <div v-if="isOpen" class="p-4 origin-top border-t">
          <slot />
        </div>
      </Transition>
    </div>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
  transform-origin: top;
}

.dropdown-enter-from {
  transform: scaleY(0);
  opacity: 0;
}

.dropdown-enter-to {
  transform: scaleY(1);
  opacity: 1;
}

.dropdown-leave-from {
  transform: scaleY(1);
  opacity: 1;
}

.dropdown-leave-to {
  transform: scaleY(0);
  opacity: 0;
}
</style>

