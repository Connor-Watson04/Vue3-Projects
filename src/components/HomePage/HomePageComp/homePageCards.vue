<script setup>
defineProps({
  Products: Object
})

import ProductData from '@/components/Products/ProductData.vue'
</script>
<template>
  <div class="Home-ProductContainer">
    <!-- eslint-disable vue/valid-v-for -->
    <ProductData
      class="homePage-ProductCard"
      v-for="(Product, index) in Products.Product.slice(0, 4)"
      :key="index"
      :Price="Product.Price"
      :name="Product.name"
      :image="Product.image"
      :URL="Product.URL"
      :OGP="Product.OGP"
    >
    </ProductData>
  </div>
</template>

<style>
.Home-ProductContainer {
  padding: 2rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 30px;
}

.homePage-ProductCard:hover {
  box-shadow: 6px 10px 15px 5px rgba(0, 0, 0, 0.344);
  transform: translateY(-10px);
  transition: all 0.4s;
}
</style>
