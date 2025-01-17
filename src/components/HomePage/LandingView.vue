<template>
  <div class="welcome-container">
    <PartnerView></PartnerView>
  </div>
  <section class="content-view">
    <div>
      <h1 class="productHeader">Our Products!</h1>
    </div>

    <HomePageCards :Products="Products" />
    <div class="allBtn-container">
      <RouterLink class="all-link" @click="scrollTo" to="/product">View All</RouterLink>
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

<style>
.welcome-container {
  margin-bottom: 4rem;
}

.content-view {
  margin-bottom: 3rem;
}

.productHeader {
  text-align: center;
  color: var(--color-dubby);
  text-shadow: 2px 2px 2px black;
}
.allBtn-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.all-link {
  color: black;
  font-size: 16px;
  padding: 1rem 2rem;
  background-color: var(--color-button);
  border: 1px solid black;
  border-radius: 50px;
}

.all-link:active {
  transform: translateY(2px);
}
</style>
