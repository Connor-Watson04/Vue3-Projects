<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductSizes from '@/components/Products/ProductSizes.vue'
import ProductQuantity from '@/components/Products/ProductQuantity.vue'
import { useBasket } from './useBasket'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Get product data
const props = defineProps({
  URL: String,
  name: String,
  Price: Number
})

// Access the basket and addProduct function from shared state
const { addProduct, basket } = useBasket() // Assuming `basket` is an array that stores products

// Create refs to store the selected size and quantity
const selectedSize = ref('')
const chosenQuantity = ref(0)

const quantityPrice = computed(() => {
  const addedPrice = props.Price * chosenQuantity.value
  return addedPrice.toFixed(2)
})

// Prevent form submission and add product to basket
function productData(e) {
  e.preventDefault()

  // If valid data, add it to the basket
  if (chosenQuantity.value > 0 && ['S', 'M', 'L', 'XL'].includes(selectedSize.value)) {
    const product = {
      img: props.URL,
      name: props.name,
      size: selectedSize.value,
      quantity: chosenQuantity.value,
      price: quantityPrice.value
    }

    // Retrieve the current basket from localStorage or initialize an empty array if none exists
    let basketArray = JSON.parse(localStorage.getItem('basketItems')) || []

    // Add the new product to the basket array
    basketArray.push(product)

    // Save the updated basket back to localStorage
    localStorage.setItem('basketItems', JSON.stringify(basketArray))

    toast.success('Successfully added to basket')

    // Add product to the basket in the UI
    addProduct(product)
  } else {
    toast.error('Please fill both fields')
  }
}

// Load saved basket on component mount
onMounted(() => {
  // Retrieve the basket from localStorage if it exists
  const savedBasket = JSON.parse(localStorage.getItem('basketItems'))
  if (savedBasket) {
    // Add each product to the basket
    savedBasket.forEach((product) => addProduct(product))
  }
})
</script>

<template>
  <form class="product-preferences" @submit.prevent="productData">
    <!-- Bind the selected size to the ProductSizes component -->
    <ProductSizes v-model:size="selectedSize" />
    <ProductQuantity v-model:quantity="chosenQuantity" />
    <div class="addToBasket-container">
      <button class="basketSubmit-btn">Add to basket</button>
    </div>
  </form>
</template>

<style>
.addToBasket-container {
  margin-top: 10px;
}

.basketSubmit-btn {
  background-color: lightgreen;
  border: solid black 1px;
  padding: 10px 1rem;
  cursor: pointer;
}
</style>
