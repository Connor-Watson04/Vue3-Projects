<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import AddBasket from '../Basket/AddBasket.vue'

 defineProps({
  URL: String,
  image: String,
  image2: String,
  name: String,
  Price: Number,
  OGP: Number
})

const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateWindowWidth)
})
</script>

<template>
  <div class="bg-white shadow-lg w-[285px] rounded-2xl overflow-hidden text-black">
    <div class="relative">
      <img id="productCardImage" class="w-full h-auto" :src="image" :alt="name" />
      <h2 v-if="windowWidth <= 375" class="text-center text-lg font-semibold">{{ name }}</h2>
    </div>
    <div class="p-5">
      <div>
        <h2 v-if="windowWidth > 375" class="text-center text-lg font-semibold">{{ name }}</h2>
        <p class="text-gray-600">Free Shipping</p>
        <div class="flex items-center gap-2">
          <p class="text-red-500 line-through text-sm">£{{ OGP }}</p>
          <p class="text-lg font-semibold">£{{ Price }}</p>
        </div>
        <router-link
          :to="{ name: 'Product details', params: { URL: URL } }"
          class="text-blue-500 hover:underline"
        >
          More Info
        </router-link>
        <AddBasket :image="image" :name="name" :Price="Price" />
      </div>
    </div>
  </div>
</template>
