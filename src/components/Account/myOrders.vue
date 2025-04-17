<script setup>
import { ref, computed } from 'vue'
import OrderTable from './orderTable.vue'
import Spinner from '../Reuseable/Spinner.vue'

const props = defineProps({
  orderHistory: Object
})

const isLoading = ref(true)


const totalItems = computed(()=>{
  return 'total Orders: ' + props.orderHistory?.order.reduce((total, order) => total + order.items, 0)
})


setTimeout(() => {
  isLoading.value = false
}, 3000)
</script>

<template>
  <div v-if="isLoading" class="loadingSpinner">
    <Spinner />
  </div>

  <div v-else class="flex flex-col">
    <div v-if="props.orderHistory.order.length > 0">

      <h1>
        {{ totalItems }}
      </h1>
      <OrderTable
        v-for="order in orderHistory.order"
        :key="order"
        :Price="order.Price"
        :name="order.name"
        :URL="order.URL"
        :date="order.date"
        :items="order.items"
      />
    </div>
    <div v-else>
      <h1>
        Oops!
      </h1>
      <p>Looks like we couldnt find your orders if you were expecting to see an order you placed and cannot find it please contact us</p>
    </div>
  </div>
</template>
