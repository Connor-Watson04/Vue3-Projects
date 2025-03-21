<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAccountStatus } from '@/composables/useAccountStatus'
import BasketTray from '../Basket/basketTray.vue'

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
}

function closeBasket() {
  isAnimating.value = true
  isBasketVisible.value = false // triggers slide-out animation
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

        <form class="form" @submit.prevent="handleSearch">
          <div v-if="windowWidth > 769">
            <input
              class="search bg-gray-300 placeholder-black/100"
              type="search"
              name="search"
              placeholder="Search"
              v-model="searchQuery"
            />
          </div>
        </form>    

      <div v-if="windowWidth <= 481 && windowWidth > 375" class="mobile-search">
        <form @submit.prevent="handleSearch">
          <div class="mobileSearchBar-Container">
            <input
              type="search"
              class="mobileSearchBar bg-gray-300 placeholder-black/100"
              placeholder="Search"
              v-model="searchQuery"
            />
          </div>
        </form>
      </div>

      <div v-if="windowWidth <= 375" class="mobile-search">
        <form @submit.prevent="handleSearch">
          <Button @click="displaySearchBar" v-if="!isSearch" type="button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="10"
              height="10"
              viewBox="0 0 50 50"
            >
              <path
                d="M 21 3 C 11.601563 3 4 10.601563 4 20 C 4 29.398438 11.601563 37 21 37 C 24.355469 37 27.460938 36.015625 30.09375 34.34375 L 42.375 46.625 L 46.625 42.375 L 34.5 30.28125 C 36.679688 27.421875 38 23.878906 38 20 C 38 10.601563 30.398438 3 21 3 Z M 21 7 C 28.199219 7 34 12.800781 34 20 C 34 27.199219 28.199219 33 21 33 C 13.800781 33 8 27.199219 8 20 C 8 12.800781 13.800781 7 21 7 Z"
              ></path>
            </svg>
          </Button>
          <div v-if="isSearch" class="mobileSearchBar-Container">
            <input type="search" class="mobileSearchBar" v-model="searchQuery" />
            <div class="closeMobileSearch" @click="closeSearchBar" type="button">
              <svg
                class="closeIcon"
                xmlns="http://www.w3.org/2000/svg"
                x="0px"
                y="0px"
                width="10"
                height="10"
                viewBox="0 0 30 30"
              >
                <path
                  d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"
                ></path>
              </svg>
            </div>
          </div>
        </form>
      </div>
      <nav class="navigation">
        <RouterLink id="nav-links" to="/product">Products</RouterLink>
        <button id="nav-links" @click="toggleBasket" class="basket-btn nav-links">Basket</button>
        <RouterLink id="nav-links" :to="`/${accountStatus}`">{{
          decodeURIComponent(accountStatus)
        }}</RouterLink>
      </nav>
    </header>
    <div 
    v-show="isBasketVisible || isAnimating" 
    class="basket-tray" 
    >
    <div
      v-show="isBasketVisible || isAnimating" 
      class="basket-cover" 
      @click="closeBasket"
      :class="{'fade-in': isBasketVisible, 'fade-out': !isBasketVisible}" 
      />
      <BasketTray
         v-if="isAnimating || isBasketVisible"
          @closeBasket="closeBasket"
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
  justify-content: space-evenly;
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

.mobileSearchBar-Container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: end;
}

.mobileSearchBar {
  width: 100%;
  /* padding-right: 30px; Add padding to ensure text doesn't overlap with icon */
  box-sizing: border-box;
}

.closeMobileSearch {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
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

.basket-cover {
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 0;
  background-color: rgba(0, 0, 0, 0.4);
}

.basket-tray {
  position: absolute;
  right: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: right;
  z-index: 100;
}

/* Slide-in animation */
@keyframes slideIn {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

/* Slide-out animation */
@keyframes slideOut {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Apply animations when classes are toggled */
.basketContainer.slide-in
{
  animation: slideIn 0.8s forwards;
}

.basketContainer.slide-out
{
  animation: slideOut 0.4s forwards;
}

/* fade in */

@keyframes fadeIn {
  0% {
    opacity: 0;
    background-color: rgba(0,0,0,0);
  } 
  100%{
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
/* fade out */

@keyframes fadeOut {
  0%{
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.4);
  }
  100% {
    opacity: 1;
    background-color: rgba(0,0,0,0);
  } 
}

.basket-tray.fade-in {
  animation: fadeIn 0.8s forwards;
  background-color: rgba(0,0,0,0.5);
}


.basket-tray.fade-out {
  animation: fadeOut 8s forwards;
  background-color: rgba(0,0,0,0);

}

</style>
