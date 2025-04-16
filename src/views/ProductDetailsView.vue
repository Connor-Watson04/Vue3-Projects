<script setup>
import AddBasket from '@/components/Basket/AddBasket.vue'
import Products from '@/products.json'
import { onMounted, ref, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { useIsMobile } from '@/composables/useMobile'

import sliderNav from '@/components/Reuseable/sliderNav.vue'
import Text from '@/components/Reuseable/Text.vue'
import Spinner from '@/components/Reuseable/Spinner.vue'
import skeletonLoader from '@/components/Reuseable/skeletonLoader.vue'
import SpecificationsTray from '@/components/Reuseable/specificationsTray.vue'
import ArrowIcon from '@/components/Reuseable/icons/arrowIcon.vue'

const isLoading = ref(true)

const {isMobile} = useIsMobile

// Get the route parameter (the product name)
const route = useRoute()
const productURL = route.params.URL.trim().toLowerCase() // Trim and make the product name lowercase

// Product state
const product = ref(null)

const openTray = ref(false)

// Image cycling
const images = ref([]) // Store image URLs
const currentImageIndex = ref(0) // Tracks the index of the currently displayed image
const currentImage = ref(null) // Tracks the current image URL
const imageInterval = ref(null)

// Fading state
const isFading = ref(false)

const startImageCycle = (() => {
  clearInterval(imageInterval.value)

  imageInterval.value = setInterval(() => {
  switchImage()
}, 5000)

})


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
    startImageCycle()
  }
  isFading.value = false
}

// Function to move to the next image
function next() {
  if (images.value.length > 1) {
    currentImageIndex.value = (currentImageIndex.value + 1) % images.value.length
    currentImage.value = images.value[currentImageIndex.value]
    startImageCycle()
  }
  isFading.value = false
}

const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

function handleNavClick(index) {
  if (index > currentImageIndex.value) {
    next()
  } else if (index < currentImageIndex.value) {
    prev()
  }
}

const openSpecifications = (() => {
  openTray.value = true
  window.scrollTo(top)
})

onMounted(async () => {
  window.addEventListener('resize', updateWindowWidth)

  isLoading.value = true

  // Simulate delay (optional)
  setTimeout(async () => {
    product.value = Products.Product.find(
      (p) => p.URL.trim().toLowerCase() === productURL
    )

    if (product.value) {
  images.value = [product.value.image]
  if (product.value.image2) images.value.push(product.value.image2)

  const img = new Image()
  img.src = images.value[currentImageIndex.value]

  img.onload = async () => {
    currentImage.value = images.value[currentImageIndex.value]

    if (images.value.length > 1) {
      startImageCycle()
    }

    await nextTick() // Wait for DOM render after setting currentImage
    isLoading.value = false
  }

  img.onerror = () => {
    isLoading.value = false
  }
}
  },500)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <section  v-if="isLoading">
    <skeletonLoader class="h-full flex-col">
      <div class="w-full h-[35px] text-center bg-black/50">
      </div>
      <div class="bg-white/50 rounded-xl h-[400px] w-full flex flex-col items-center justify-center gap-2 p-2">
        <Spinner />
        <Text class="!text-gray-100">Content Loading</Text>
      </div>
      <div class="text-black h-[250px] w-full bg-white/50 rounded-2xl shadow-lg flex flex-col py-4 px-6">

      </div>
      </skeletonLoader>
  </section>
  <SpecificationsTray v-if="openTray" :Specifications="product.Specifications" @close="openTray = false" class="z-999" />
  <section v-if="product && !isLoading">
    <div class="flex flex-col items-center justify-center px-2 gap-2">
      <div class="w-full text-center bg-black/50">
        <h1 class="text-white !font-bold text-2xl">{{ product.name }}</h1>
      </div>
      
      <div class="bg-white rounded-xl h-[400px] w-full flex flex-col items-center justify-center">
          <img
          :src="currentImage"
          class="block product-image max-h-[350px] h-full"
          :class="{ fade: isFading }"
          :alt="product.name"
          />
        <sliderNav 
        v-if="!isMobile && images.length > 1"
        :count="images.length"
        :active="currentImageIndex"
        @navigate="handleNavClick"
        />
      </div>
      <div class="text-black w-full bg-white rounded-2xl shadow-lg flex flex-col py-4 px-2">
        <h1 class="text-center text-stable text-lg text-black !font-semibold !mb-2">{{ product.Title }}</h1>
        <div class="flex flex-col px-4">
          <Text>Free Shipping</Text>
          <div class="flex flex-row gap-2">
            <p class="line-through decoration-red-500 decoration-[2px]">£{{ product.OGP }}</p>
            <p class="text-lg !font-semibold">£{{ product.Price }}</p>
          </div>
          <AddBasket :URL="product.URL" :name="product.name" :Price="product.Price" />
        </div>
      </div>
        <button @click="openSpecifications" class="flex flex-row py-1 px-4 bg-white border-1 border-black w-full text-2xl text-black justify-between">
          Specifications
          <ArrowIcon class="rotate-270"/>
        </button>
      </div>
      <div class="p-4">
        <h1 class="text-3xl text-white text-start !font-bold">
          Description:
        </h1>
        <p class="!mb-2 text-sm !font-semibold">{{ product.Desc }}</p>
      </div>
  </section>
</template>

<style scoped>
.product-image {
  transition: opacity 2s ease; /* Smooth fade transition for image */
}

.product-image.fade {
  opacity: 0; /* Fully fade out */
}
</style>
