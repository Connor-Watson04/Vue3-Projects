<template>
  <div class="grid-container">
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
  grid-template-columns: 700px 600px;
}
</style>
