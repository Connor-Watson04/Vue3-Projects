<!-- eslint-disable vue/valid-v-for -->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '@/components/Products/ProductCard.vue'
import Products from '@/products.json'

const route = useRoute()

const filterProducts = computed(() => {
  const searchQuery = route.query.search?.toLowerCase() || ''

  if (!searchQuery) {
    return { Product: Products.Product }
  }

  return {
    Product: Products.Product.filter((product) => product.name.toLowerCase().includes(searchQuery))
  }
})

const searchQuery = computed(() => route.query.search || '')
</script>

<template>
  <div v-if="searchQuery && filterProducts.Product.length > 0">
    <h1 class="results">
      Returned results for:
      <span>
        {{ searchQuery }}
      </span>
    </h1>
    <ProductCard :Products="filterProducts" />
  </div>

  <div v-else>
    <ProductCard :Products="Products" />
  </div>
</template>

<style>
.results {
  margin-left: 2rem;
  color: var(--color-text);
}
</style>
