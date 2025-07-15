<script setup lang="ts">
import { useMenu } from '@/composables/useMenu';
import CloseIcon from '../Reuseable/icons/closeIcon.vue';
import Button from '../Reuseable/Button.vue';

const { isMenuVisible, closeMenu } = useMenu();

</script>

<template>
   <main 
      class="basketContainer text-black h-[90vh] w-[350px] shadow-xl !bg-white select-none overflow-y-scroll" @animationend="$emit('animationend')"
      :class="{ 'slide-in': isMenuVisible, 'slide-out': !isMenuVisible }">
      <div class="border-b-1 sticky border-black flex justify-end items-center top-0 z-10 py-2 px-4">
        <Button @click="closeMenu" class="bg-none">
         <CloseIcon />
        </Button>
      </div>
  </main>
</template>

<style scoped>
/* Slide-in animation */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Slide-out animation */
@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.slide-in {
  animation: slideIn 0.3s forwards;
}

.slide-out {
  animation: slideOut 0.3s forwards;
}
</style>
