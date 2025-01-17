<script setup>
import { ref } from 'vue'
import Spinner from '../Reuseable/Spinner.vue'

defineProps({
  orderHistory: Object
})

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)
</script>

<template>
  <div v-if="isLoading" class="loadingSpinner">
    <Spinner />
  </div>

  <div v-else class="accountOverview">
    <H1>Account Overview</H1>
  </div>
</template>

<style scoped>
.accountOverview {
  color: var(--color-text-alt);
}
</style>
