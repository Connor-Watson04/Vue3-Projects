<template>
  <div class="flex justify-center items-center gap-4 p-8">
    <!-- eslint-disable vue/valid-v-for -->
    <ProductData
      class="transition-transform duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2"
      v-for="(Product, index) in Products.Product.slice(0, 5)"
      :key="index"
      :Price="Product.Price"
      :name="Product.name"
      :image="Product.image"
      :URL="Product.URL"
      :OGP="Product.OGP"
    />
  </div>
</template>

<script setup>
defineProps({
  Products: Object
})

import ProductData from '@/components/Products/ProductData.vue'
</script>
