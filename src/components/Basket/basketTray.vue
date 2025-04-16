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
        <div v-for="(product, index) in basket" :key="index" class="basketProduct">
            <img :src="product.image" class="basketImage" alt="Product Image" />
            <div class="basketText">
              <p class="basketName">{{ product.name }}</p>
              <p class="basketSize">Size: {{ product.size }}</p>
              <p class="basketQuantity">Quantity: {{ product.quantity }}</p>
              <p class="basketPrice">Price: £{{ product.price }}</p>
            </div>
          <div>
            <button @click="promptDelete(index)" class="deleteItem">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                height="14"
                width="12.25"
                viewBox="0 0 448 512"
                class="deleteIcon"
                >
                <path
                d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
                />
              </svg>
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
  <div class="checkout">
    <p>Total: £{{ totalPrice.toFixed(2) }}</p>
    <button class="checkoutBtn">Checkout</button>
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

.emptyBasket {
  height: 60vh;
  text-align: center;
  place-content: center;
}


.basketProduct {
  display: flex !important;
  justify-content: space-between;
  border: 1px solid black;
  height: 20vh;
  margin-bottom: 5px;
  overflow: hidden;
  position: relative;
}

.basketProduct:hover{
  background-color: #d6d6d6;
}

.basketText {
  margin-top: 2px;
}

.basketImage {
  height: 20vh;
}

.deleteItem {
  background: none;
  border: none;
  position: relative;
  top: 5px;
}

.deleteIcon path {
  fill: rgb(255, 0, 0);
  cursor: pointer;
}

.deleteIcon path:hover {
  fill: rgb(198, 0, 0);
  cursor: pointer;
}

.checkout {
  position: sticky; /* Anchored to the bottom */
  bottom: 0;
  width: 100%;
  font-size: 16px;
  background-color: #fff;
  padding: 1.6rem 1rem;
  border-top: 1px solid #ddd; /* Top border for separation */
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkoutBtn {
  background-color: lightgreen;
  padding: 0.4rem 2rem;
}
</style>
