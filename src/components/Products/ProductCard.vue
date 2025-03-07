<script setup>
import ProductData from '@/components/Products/ProductData.vue'

defineProps({
  Products: Object
})
</script>

<template>
  <div class="p-4 grid grid-cols-4 gap-5 mb-20">
    <ProductData
      v-for="Product in Products.Product"
      :key="Product.name"
      :Price="Product.Price"
      :name="Product.name"
      :image="Product.image"
      :image2="Product.image2"
      :URL="Product.URL"
      :OGP="Product.OGP"
    />
  </div>
</template>



