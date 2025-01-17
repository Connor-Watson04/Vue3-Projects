<template>
  <div class="grid-container flex-container">
    <welcome></welcome>
    <dubby></dubby>
  </div>
</template>

<script setup>
import welcome from './welcome.vue'
import dubby from './dubby.vue'
</script>

<style>
.grid-container {
  display: grid;
  grid-template-columns: repeat(2, 50vw);
}
</style>
