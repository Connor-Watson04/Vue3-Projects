<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import AddBasket from '../Basket/AddBasket.vue'

const props = defineProps({
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
  window.removeEventListener('resie', updateWindowWidth)
})
</script>

<template>
  <div class="ProductCard">
    <div class="image-container">
      <img id="productCardImage" :src="`${image}`" :alt="name" />
      <h2 v-if="windowWidth < 376" class="ProductHeader">{{ name }}</h2>
    </div>
    <div class="ProductData">
      <div class="ProductInfo">
        <<<<<<< HEAD
        <h2 class="ProductHeader">{{ name }}</h2>
        =======
        <h2 v-if="windowWidth > 376" class="ProductHeader">{{ name }}</h2>
        >>>>>>> improve-responsiveness
        <p>Free Shipping</p>
        <span class="pricing">
          <p class="old-price">£{{ OGP }}</p>
          <p class="actual-price">£{{ Price }}</p>
        </span>
        <!-- Pass only the product name as a route parameter -->
        <router-link :to="{ name: 'Product details', params: { URL: URL } }">More Info</router-link>

        <AddBasket :image="image" :name="name" :Price="Price" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.ProductCard {
  background-color: white;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0, 0.2);
  width: 285px;
  border-radius: 20px;
  overflow: hidden;
  color: black;
}

.ProductHeader {
  text-align: center;
}

#productCardImage {
  max-width: 100%;
  height: auto;
}

.ProductInfo {
  padding: 20px;
}

.pricing {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
}

.old-price {
  text-decoration: line-through red;
  font-size: 14px;
}

.actual-price {
  font-size: 18px;
  font-weight: 600;
}

.product-preferences {
  display: flex;
  flex-direction: column;
}
</style>
