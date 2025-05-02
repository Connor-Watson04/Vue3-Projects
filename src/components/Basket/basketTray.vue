<script setup lang="ts">
import { ref, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { basketState } from '../../composables/basketState'
import { useBasket } from '@/composables/useBasket'
import { useToast } from 'vue-toastification'


import removeConfirmation from '@/components/Reuseable/removeConfirmation.vue' // Import the reusable popup
import closeIcon from '../Reuseable/icons/closeIcon.vue'
import Text from '../Reuseable/Text.vue'
import Button from '../Reuseable/Button.vue'
import DeleteIcon from '../Reuseable/icons/deleteIcon.vue'

const toast = useToast()
const { basket } = basketState()
const { isBasketVisible, closeBasket } = useBasket()

const showConfirmPopup = ref(false)
const selectedItemIndex = ref<number | null>(null)

// Compute total price
const totalPrice = computed(() => {
  return basket.reduce((acc, product) => acc + Number(product.price), 0)
})

// Show popup and store item index
const promptDelete = (index: number) => {
  selectedItemIndex.value = index
  showConfirmPopup.value = true
}

// Close popup
const closePopup = () => {
  showConfirmPopup.value = false
  selectedItemIndex.value = null
}

// Confirm delete
const confirmDelete = () => {
  if (selectedItemIndex.value !== null) {
    basket.splice(selectedItemIndex.value, 1)
    localStorage.setItem('basketItems', JSON.stringify(basket))
    toast.success('Item successfully deleted')
  }
  closePopup()
}
</script>

<template>
   <main class="basketContainer text-black h-[90vh] w-[350px] shadow-xl !bg-white select-none overflow-y-scroll" @animationend="$emit('animationend')"
        :class="{ 'slide-in': isBasketVisible, 'slide-out': !isBasketVisible }">
        <span class="bg-white flex w-full items-center !border-b-1 sticky top-[0px] z-10 py-[10px] px-[1rem]">
      <h1 class="text-[40px] w-full">Your Basket</h1>
      <button @click="closeBasket">
        <closeIcon/>
      </button>
    </span>
  <section class="h-[70vh] overflow-y-scroll scroll-smooth">
    <div class="h-full">
      <div v-if="basket.length > 0" class="basketProduct-container">
        <div v-for="(product, index) in basket" :key="index" class="hover:bg-[#d6d6d6] pt-2 flex justify-evenly border-1 border-black h-[20vh] !my-[5px] overflow-hidden relative">
            <img :src="product.image" class="h-[20vh] w-auto" alt="Product Image" />
            <div>
              <p>{{ product.name }}</p>
              <p>Size: {{ product.size }}</p>
              <p>Quantity: {{ product.quantity }}</p>
              <p>Price: £{{ product.price }}</p>
            </div>
          <div>
            <button @click="promptDelete(index)" class="bg-none border-none">
              <DeleteIcon  class="text-red-500 cursor-pointer hover:text-red-600"/>
            </button>
          </div>
          
          <removeConfirmation
          message="Are you sure you want to Delete this item?"
          :visible="showConfirmPopup && selectedItemIndex === index "
          mode="inline"
          @close="closePopup"
          @confirm="confirmDelete"/>
        </div>
      </div>
      <div v-else class="h-full flex flex-col items-center justify-center px-10 gap-2">
        <h1 class="text-2xl text-black/50 !font-semibold">Your Basket is Empty</h1>
        <Text class="!text-black/50 text-sm">
          Continue shopping and add items to your basket to view them here.
        </Text>
        <RouterLink to="/product" class="p-0">
          <Button 
          class="!font-semibold"
          buttonType="button" 
          @click="closeBasket()" 
          >
            Go Shopping
        </Button>
      </RouterLink>
      </div>
    </div>
  </section>
  <div class="sticky !b-0 w-full text-base bg-white py-[1.6rem] px-[1rem] border-t-1 border-[#ddd] flex justify-between items-center inset-shadow-sm inset-shadow-[#0000001a]">
    <p>Total: £{{ totalPrice.toFixed(2) }}</p>
    <Button class="w-1/2">Checkout</Button>
  </div>
</main>
</template>

<style scoped>
/* Slide-in animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Slide-out animation */
@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.basketContainer.slide-in {
  animation: slideIn 0.3s forwards;
}

.basketContainer.slide-out {
  animation: slideOut 0.3s forwards;
}
</style>
