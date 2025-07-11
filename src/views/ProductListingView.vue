<!-- eslint-disable vue/valid-v-for -->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Products from '@/products.json'
import { useIsMobile } from '@/composables/useMobile'
import Text from '@/components/Reuseable/Text.vue'
import ProductCard from '@/components/Products/ProductCard.vue'
const {isMobile} = useIsMobile()

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
    <h1 class="!ml-[2rem] text-[var(--color-text)]">
      Returned results for:
      <span>
        {{ searchQuery }}
      </span>
    </h1>
    <ProductCard v-if="isMobile" :Products="filterProducts" class="flex flex-col gap-2" />
  </div>

  <div v-else-if="searchQuery && filterProducts.Product.length == 0">
    <h1 class="!ml-[2rem] text-[var(--color-text)]">
      No results found for:
      <span>{{ searchQuery }}</span>
    </h1>
    <Text>Here is what we stock</Text>
    <ProductCard v-if="isMobile" :Products="Products" class="flex flex-col gap-2" />
  </div>
  <div v-else>
    <Text class="!text-3xl text-center !mb-2">
      All Stock
    </Text>
    <ProductCard :Products="Products" class="flex flex-col gap-2 md:grid md:grid-cols-2 md:w-2/3 lg:grid-cols-3 lg:w-3/4 xl:grid-cols-4"/>
  </div>
</template>
