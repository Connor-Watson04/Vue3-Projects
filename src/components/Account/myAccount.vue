<script setup>
import { ref, onMounted } from 'vue'
import Spinner from '../Reuseable/Spinner.vue'

let accountName = ref('')

defineProps({
  orderHistory: Object
})

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 1000)

onMounted(() => {
  const storedUser = localStorage.getItem('user')

  if (storedUser) {
    const user = JSON.parse(storedUser)
    accountName.value = user.accountName
  }
})
</script>

<template>
  <div v-if="isLoading" class="loadingSpinner">
    <Spinner />
  </div>

  <div v-else class="accountOverview">
    <h2 class="accountName">Welcome Back {{ accountName }}!</h2>

    <H1>Account Overview</H1>
  </div>
</template>

<style scoped>
.accountOverview {
  color: var(--color-text-alt);
}
</style>
