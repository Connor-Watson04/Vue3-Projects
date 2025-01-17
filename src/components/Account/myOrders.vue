<script setup>
import { ref } from 'vue'
import OrderTable from './orderTable.vue'
import Spinner from '../Reuseable/Spinner.vue'

defineProps({
  orderHistory: Object
})

const isLoading = ref(true)

setTimeout(() => {
  isLoading.value = false
}, 3000)
</script>

<template>
  <div v-if="isLoading" class="loadingSpinner">
    <Spinner />
  </div>

  <div v-else class="order-table">
    <OrderTable
      v-for="order in orderHistory.order"
      :Price="order.Price"
      :name="order.name"
      :URL="order.URL"
      :date="order.date"
      :items="order.items"
    />
  </div>
</template>

<style scoped>
.order-table {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</style>
