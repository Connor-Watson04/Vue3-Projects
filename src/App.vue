<script setup>
import Header from './components/Reuseable/Header.vue'
import { RouterView } from 'vue-router'
import Footer from './components/Reuseable/Footer.vue'
import { provideAccountStatus } from './composables/useAccountStatus'

provideAccountStatus()
</script>

<template>
  <Header></Header>
  <RouterView />
  <Footer></Footer>
</template>
