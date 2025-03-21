<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useAccountStatus } from '@/composables/useAccountStatus'
import BasketTray from '../Basket/basketTray.vue'
import SearchIcon from './icons/searchIcon.vue'

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
  window.removeEventListener('resize', updateWindowWidth)
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
  <section class="w-full bg-[var(--color-banner)] shadow-[rgba(0, 0, 0, 0.4)] !mb-[4rem]">
    <header class="flex flex-row items-center justify-evenly gap-[1rem]">
      <RouterLink to="/">
        <img class="h-[100px] mr-[50px]" src="/src/assets/Images/Logo/S-I-S Logo.png" alt="homepage" />
      </RouterLink>

        <form @submit.prevent="handleSearch">
          <div v-if="windowWidth >= 750">
            <input
            class="w-[50vw] !py-[1rem] !pr-[0.8rem] !pl-[2rem] rounded-[50px] justify-center border-none text-base text-start bg-gray-300 placeholder-black/100"
              type="search"
              name="search"
              placeholder="Search"
              v-model="searchQuery"
            />
          </div>
        </form>    

      <div v-if="windowWidth <= 481 && windowWidth >= 375" class="mobile-search">
        <form @submit.prevent="handleSearch">
          <div class="relative align-center flex justify-end">
            <input
              type="search"
              class="w-full box-border bg-gray-300 placeholder-black/100"
              placeholder="Search"
              v-model="searchQuery"
            />
          </div>
        </form>
      </div>

      <div v-if="windowWidth <= 375" class="mobile-search">
        <form @submit.prevent="handleSearch">
          <Button @click="displaySearchBar" v-if="!isSearch" type="button">
            <SearchIcon class="h-[24px] w-[24px]"/>
          </Button>
          <div v-if="isSearch" class="mobileSearchBar-Container bg-gray-300">
            <input type="search" class="mobileSearchBar" v-model="searchQuery" />
            <div class="absolute right-[5px] top-[50%] -translate-y-[50%] cursor-pointer" @click="closeSearchBar" type="button">
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
