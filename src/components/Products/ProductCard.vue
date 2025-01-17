<script setup>
import ProductData from '@/components/Products/ProductData.vue'

defineProps({
  Products: Object
})
</script>

<template>
  <div class="ProductContainer">
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

<style>
.ProductContainer {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 24%);
  gap: 20px;
  margin-bottom: 5rem;
}
</style>
