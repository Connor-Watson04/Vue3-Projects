<template>
  <div class="flex flex-col lg:flex-row w-screen md:px-10 lg:gap-5 items-center lg:items-start md:justify-center">
    <welcome class="lg:w-2/4"/>
    <DubbyPromo class="lg:w-1/3"/>
  </div>
</template>

<script setup>
import welcome from './welcomeView.vue'
import DubbyPromo from './dubbyPromo.vue'
</script>
