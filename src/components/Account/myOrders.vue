<script setup>
import { computed } from 'vue'
import OrderTable from './orderTable.vue'

const props = defineProps({
  orderHistory: Object
})



const totalItems = computed(()=>{
  return 'total Orders: ' + props.orderHistory?.order.reduce((total, order) => total + order.items, 0)
})
</script>

<template>

  <div class="flex flex-col">
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
