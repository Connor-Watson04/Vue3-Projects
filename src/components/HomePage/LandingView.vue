<template>
  <div class="mb-16">
    <PartnerView />
  </div>

  <section class="mb-12">
    <div>
      <h1 class="text-center text-[var(--color-dubby)] text-2xl font-bold drop-shadow-lg">
        Our Products!
      </h1>
    </div>

    <HomePageCards :Products="Products" />

    <div class="flex justify-center items-center mt-8">
      <RouterLink
        class="text-black text-lg px-6 py-3 bg-[var(--color-button)] border border-black rounded-full transition active:translate-y-[2px]"
        @click="scrollTo"
        to="/product"
      >
        View All
      </RouterLink>
    </div>
  </section>
</template>

<script setup>
import Products from '@/products.json'
import { RouterLink } from 'vue-router'
import HomePageCards from './HomePageComp/homePageCards.vue'
import PartnerView from './promo/partnerView.vue'

// This function scrolls the window to the top
function scrollTo() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
