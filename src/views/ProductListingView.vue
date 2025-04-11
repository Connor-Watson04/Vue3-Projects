<!-- eslint-disable vue/valid-v-for -->
<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Products from '@/products.json'
import DesktopProducts from '@/components/Products/desktopProducts.vue'
import MobileProduct from '@/components/Products/mobileProduct.vue'
import { useIsMobile } from '@/composables/useMobile'
import Text from '@/components/Reuseable/Text.vue'
const isMobile = useIsMobile()

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
    <DesktopProducts v-if="!isMobile" :Products="filterProducts" />
    <MobileProduct v-if="isMobile" :Products="filterProducts" class="flex flex-col gap-2" />
  </div>

  <div v-else-if="searchQuery && filterProducts.Product.length == 0">
    <h1 class="!ml-[2rem] text-[var(--color-text)]">
      No results found for:
      <span>{{ searchQuery }}</span>
    </h1>
    <Text>Here is what we stock</Text>
    <DesktopProducts v-if="!isMobile" :Products="Products" />
    <MobileProduct v-if="isMobile" :Products="Products" class="flex flex-col gap-2" />
  </div>
  <div v-else>
    <Text class="!text-3xl !mb-2">
      All Stock
    </Text>
    <DesktopProducts v-if="!isMobile" :Products="Products" />
    <MobileProduct v-if="isMobile" :Products="Products" class="flex flex-col gap-2"/>
  </div>
</template>
