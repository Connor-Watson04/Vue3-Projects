<script setup>
import AddBasket from '@/components/Basket/AddBasket.vue'
import Products from '@/products.json'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

// Get the route parameter (the product name)
const route = useRoute()
const productName = route.params.name.trim().toLowerCase() // Trim and make the product name lowercase

// Product state
const product = ref(null)

// Image cycling
const images = ref([]) // Store image URLs
const currentImageIndex = ref(0) // Tracks the index of the currently displayed image
const currentImage = ref(null) // Tracks the current image URL

// Fading state
const isFading = ref(false)

// Switch image with fade effect
function switchImage() {
  if (images.value.length > 1) {
    isFading.value = true

    // Change image after 1 second
    setTimeout(() => {
      next() // Move to the next image
    }, 1500)

    // End the fade effect after 2 seconds
    setTimeout(() => {
      isFading.value = false
    }, 2000)
  }
}

// Function to move to the previous image
function prev() {
  if (images.value.length > 1) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + images.value.length) % images.value.length
    currentImage.value = images.value[currentImageIndex.value]
  }
  isFading.value = false
}

// Function to move to the next image
function next() {
  if (images.value.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length
    currentImage.value = images.value[currentImageIndex.value]
  }
  isFading.value = false
}

// Find the product by name in the "Product" array from your JSON, using case-insensitive and trimmed matching
onMounted(() => {
  product.value = Products.Product.find((p) => p.name.trim().toLowerCase() === productName)

  if (product.value) {
    // Collect all image URLs
    images.value = [product.value.image]
    if (product.value.image2) images.value.push(product.value.image2)

    // Set the initial image
    currentImage.value = images.value[currentImageIndex.value]

    // Start auto-switching images if there are more than one
    if (images.value.length > 1) {
      setInterval(() => {
        switchImage()
      }, 5000) // Change image every 5 seconds
    }
  }
})
</script>

<template>
  <section v-if="product">
    <div class="ProductDetails">
      <div class="PDPImage-container">
        <button v-if="images.length > 1" class="imageControls buttonPrev" @click="prev()"><</button>

        <!-- Use currentImage for smooth transitions -->
        <img
          :src="currentImage"
          class="product-image"
          :class="{ fade: isFading }"
          :alt="product.name"
        />
        <button v-if="images.length > 1" class="imageControls buttonNext" @click="next()">></button>
      </div>
      <div class="PDP-Info">
        <h1 class="PDP-title">{{ product.name }}</h1>
        <div class="PDP-text">
          <p class="product-desc">{{ product.Desc }}</p>
          <span class="pricing">
            <p class="OG-Price">£{{ product.OGP }}</p>
            <p class="New-Price">£{{ product.Price }}</p>
          </span>
          <AddBasket :URL="product.URL" :name="product.name" :Price="product.Price" />
        </div>
      </div>
    </div>
  </section>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<style>
.ProductDetails {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: 10rem;
}

.PDPImage-container {
  background-color: white;
  width: 75%;
  height: 100%;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 6rem;
}

.product-image {
  height: 420px;
  display: block;
  transition: opacity 2s ease; /* Smooth fade transition for image */
}

.product-image.fade {
  opacity: 0; /* Fully fade out */
}

.PDP-Info {
  color: black;
  background-color: white;
  width: 95%;
  height: 100%;
  border-radius: 11px;
  box-shadow: -5px 2px 15px 2px rgba(0, 0, 0, 0.3);
}

.PDP-title {
  text-align: center;
  margin: 2rem 0;
}

.PDP-text {
  padding: 0 3rem;
}

.OG-Price {
  text-decoration: line-through red;
  font-size: 16px;
}

.New-Price {
  font-size: 20px;
  font-weight: 600;
}

.imageControls {
  border: none;
  font-size: 50px;
  position: relative;
  cursor: pointer;
}

.buttonPrev {
  left: 20px;
}

.buttonNext {
  right: 20px;
}
</style>
