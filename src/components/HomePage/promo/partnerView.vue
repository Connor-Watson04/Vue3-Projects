<template>
  <div class="flex flex-col lg:flex-row w-screen md:px-10 items-center md:justify-center lg:justify-evenly ">
    <welcome class="lg:w-2/4"/>
    <DubbyPromo class="lg:w-1/3 h-full"/>
  </div>
</template>

<script setup>
import welcome from './welcomeView.vue'
import DubbyPromo from './dubbyPromo.vue'
</script>
