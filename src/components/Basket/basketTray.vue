<script setup lang="ts">
import { computed } from 'vue'
import { useBasket } from './useBasket' // Import the composable to use the shared state
import { useToast } from 'vue-toastification'

const toast = useToast()

// Access the basket state
const { basket } = useBasket()

// Compute the total price of products in the basket
const totalPrice = computed(() => {
  // Convert price to number in case it's a string and sum up the total price
  return basket.reduce((acc, product) => {
    const price = Number(product.price) // Ensure price is a number
    return acc + price // Add to total (if price is already multiplied by quantity)
  }, 0)
})

// Function to delete an item
const deleteItem = (index) => {
  basket.splice(index, 1)

  localStorage.setItem('basketItems', JSON.stringify(basket))

  toast.success('Item successfully deleted')
}
</script>

<template>
  <section class="basketContainer">
    <span class="basketHeading">
      <h1 class="basketTitle">Your Basket</h1>
      <button class="closeBasket" @click="$emit('closeBasket')">Close</button>
    </span>
    <div>
      <div v-if="basket.length > 0" class="basketProduct-container">
        <div v-for="(product, index) in basket" :key="index" class="basketProduct">
          <img :src="product.img" class="basketImage" alt="Product Image" />
          <div class="basketText">
            <p class="basketName">{{ product.name }}</p>
            <p class="basketSize">Size: {{ product.size }}</p>
            <p class="basketQuantity">Quantity: {{ product.quantity }}</p>
            <p class="basketPrice">Price: £{{ product.price }}</p>
          </div>
          <div>
            <button @click="deleteItem(index)" class="deleteItem">
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
        </div>
      </div>
      <div v-else>
        <h2 class="emptyBasket">Empty Basket</h2>
      </div>
    </div>

    <div class="checkout">
      <p>Total: £{{ totalPrice.toFixed(2) }}</p>
      <button class="checkoutBtn">Checkout</button>
    </div>
  </section>
</template>

<style scoped>
.basketContainer {
  color: black;
  height: 85vh;
  width: 350px;
  box-shadow: 20px 20px 20px 20px rgba(0, 0, 0, 100);
  background-color: white;
  user-select: none;
  overflow-y: scroll;
  scroll-behavior: smooth;
}

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

.basketHeading {
  background-color: white;
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid black;
  position: sticky;
  top: 0px; /* Stick the heading at the top */
  z-index: 10; /* Ensure it stays on top of other content */
  padding: 10px 1rem; /* Add some padding for better appearance */
}

.basketTitle {
  font-size: 40px;
  width: 100%;
}

.closeBasket {
  border: 1.5px solid black;
  background-color: rgba(255, 63, 63, 0.653);
  font-size: 16px;
  height: 30px;
}

.closeBasket:active {
  transform: translateY(3px);
}

.emptyBasket {
  height: 60vh;
  text-align: center;
  place-content: center;
}
.basketProduct-container {
  padding: 0 10px;
}

.basketProduct {
  display: grid;
  grid-template-columns: 150px 140px 10px;
  border: 1px solid black;
  height: 20vh;
  margin-bottom: 5px;
  overflow: hidden;
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
  width: 22rem;
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
