<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAccountStatus } from '@/composables/useAccountStatus'
import BasketTray from '../Basket/basketTray.vue'
import closeIcon from './closeIcon.vue'

const { accountStatus } = useAccountStatus()

const isBasketVisible = ref(false)
const isAnimating = ref(false)
const searchQuery = ref('')
const router = useRouter()

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

const isSearch = ref(false)

function displaySearchBar() {
  isSearch.value = true
}

function closeSearchBar() {
  isSearch.value = false
}

function toggleBasket() {
  isBasketVisible.value = !isBasketVisible.value
  isAnimating.value = true // Start animation
  // Disable scrolling when the basket is visible
  if (isBasketVisible.value) {
    document.body.style.overflowY = 'hidden'
  }
}

function closeBasket() {
  isBasketVisible.value = false
  isAnimating.value = true // Trigger slide-out animation
}

function handleAnimationEnd() {
  isAnimating.value = false // Stop animation after slide-out completes
  // Enable scrolling again only after slide-out animation
  if (!isBasketVisible.value) {
    document.body.style.overflowY = 'auto'
  }
}

function handleSearch() {
  router.push({ name: 'product', query: { search: searchQuery.value } })
  closeSearchBar()
}
</script>

<template>
  <section id="banner" class="banner">
    <header id="header" class="header">
      <RouterLink to="/">
        <img class="logo" src="/src/assets/Images/Logo/S-I-S Logo.png" alt="homepage" />
      </RouterLink>

      <form>
        <form class="form" @submit.prevent="handleSearch">
          <div v-if="windowWidth > 769">
            <input
              class="search"
              type="search"
              name="search"
              placeholder="Search"
              v-model="searchQuery"
            />
          </div>
        </form>
      </form>

      <div v-if="windowWidth <= 481" class="mobile-search">
        <form @submit.prevent="handleSearch">
          <Button
            class="mobileSearchButton"
            @click="displaySearchBar"
            v-if="!isSearch"
            type="button"
          >
            search
          </Button>
          <div v-if="isSearch">
            <input type="search" class="mobileSearchBar" v-model="searchQuery" />
            <button class="closeMobileSearch" @click="closeSearchBar" type="button">close</button>
          </div>
        </form>
      </div>
      <nav class="navigation">
        <RouterLink id="nav-links" to="/product">Products</RouterLink>
        <button id="nav-links" @click="toggleBasket" class="basket-btn nav-links">Basket</button>
        <RouterLink id="nav-links" :to="`/${accountStatus}`">{{ accountStatus }}</RouterLink>
      </nav>
    </header>
    <div v-show="isBasketVisible || isAnimating" class="basket-tray">
      <BasketTray
        @closeBasket="closeBasket"
        class="basketContainer"
        :class="{ 'slide-in': isBasketVisible, 'slide-out': !isBasketVisible }"
        @animationend="handleAnimationEnd"
      />
    </div>
  </section>
</template>

<style>
.banner {
  width: 100vw;
  background-color: var(--color-banner);
  padding-left: 2rem;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.4);
  margin-bottom: 4.6rem;
}

.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
}

.search {
  width: 50vw;
  padding: 1rem 0.8rem 1rem 2rem;
  border-radius: 50px;
  justify-self: center;
  border: none;
  font-size: 16px;
  text-align: start;
}

nav a.router-link-exact-active {
  color: var(--color-link);
}

nav {
  display: inline;
}

nav a {
  border-right: 1px solid var(--color-border);
  padding: 0 1rem;
  text-align: center;
  color: var(--color-text);
}

.logo {
  height: 100px;
  margin: 0px 50px 0px 0px;
}

.basket-btn {
  background: none;
  border: none;
  color: var(--color-text);
  border-right: 1px solid var(--color-border);
  padding: 0 1rem;
  font-size: 16px;
}
.basket-btn:hover {
  background-color: var(--color-link-foreground);
  cursor: pointer;
}

.basket-tray {
  position: absolute;
  right: 0px;
  width: 100%;
  display: flex;
  justify-content: right;
  z-index: 100;
}

/* Slide-in animation */
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

/* Slide-out animation */
@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

/* Apply animations when classes are toggled */
.basketContainer.slide-in {
  animation: slideIn 0.8s forwards;
}

.basketContainer.slide-out {
  animation: slideOut 0.4s forwards;
}
</style>
