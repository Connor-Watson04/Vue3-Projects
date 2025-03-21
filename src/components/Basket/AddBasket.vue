<template>
  <form class="flex flex-col gap-4" @submit.prevent="productData">
    <!-- Bind the selected size to the ProductSizes component -->
    <ProductSizes v-model:size="selectedSize" />
    <ProductQuantity v-model:quantity="chosenQuantity" />
    <div class="mt-2">
      <button class="bg-green-400 border border-black px-4 py-2 cursor-pointer rounded-md hover:bg-green-500 active:translate-y-1 transition">
        Add to basket
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductSizes from '@/components/Products/ProductSizes.vue'
import ProductQuantity from '@/components/Products/ProductQuantity.vue'
import { useBasket } from './useBasket'
import { useToast } from 'vue-toastification'

const toast = useToast()

// Get product data
const props = defineProps({
  name: String,
  Price: Number,
  image: String
})

// Access the basket and addProduct function from shared state
const { addProduct } = useBasket() // Assuming `basket` is an array that stores products

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
      image: props.image,
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