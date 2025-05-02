<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useBasket } from '@/composables/useBasket'

const { isBasketVisible, isAnimating, closeBasket } = useBasket()


import Input from './Input.vue'
import Button from './Button.vue'
import Text from './Text.vue'

import BasketTray from '../Basket/basketTray.vue'
import SearchIcon from './icons/searchIcon.vue'
import CloseIcon from './icons/closeIcon.vue'
import Navigation from './Navigation.vue'

const searchQuery = ref('')
const router = useRouter()

const windowWidth = ref(window.innerWidth)

function updateWindowWidth() {
  windowWidth.value = window.innerWidth
}

const isMobile = window.innerWidth <= 481


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

watch(isSearch, (newVal) => {
  if (newVal) {
    document.body.style.overflowY = 'hidden';
  } else {
    document.body.style.overflowY = '';
  }
});


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
  <section class="relative w-full h-[100px] bg-[var(--color-banner)] shadow-[rgba(0, 0, 0, 0.4)] !mb-[3rem]">
    <header class="flex flex-col items-center h-full justify-evenly tab:flex-row tab:gap-2 tab:justify-content tab:px-2">
      <RouterLink to="/" class="tab:w-1/4">
        <img class="h-[65px] tab:w-full tab:h-auto w-auto" src="/src/assets/Images/Logo/S-I-S Logo.png" alt="homepage" />
      </RouterLink>

        <form @submit.prevent="handleSearch" class="tab:w-1/2">
          <div v-if="!isMobile">
            <Input
              class="w-full rounded-[50px] justify-center py-1 border-none text-base text-start bg-gray-300 active:outline-black"
              inputType="search"
              name="search"
              input-placeholder="Search"
              v-model="searchQuery"
            />
          </div>
        </form>    
        <div v-if="isMobile" class="!h-[3px] w-5/6 bg-gray-600"></div>
  <div class="flex flex-row items-center justify-center tab:justify-normal w-full h-full gap-2 tab:w-1/4">
    <div v-if="isMobile" >
    <form @submit.prevent="handleSearch">
      <Button @click="displaySearchBar" v-if="!isSearch" class="bg-none border-none !py-0 !px-0" buttonType="button">
        <Text>Search</Text>
      </Button>
    </form>
  </div>
    <Navigation/>
  </div>
    </header>

    <div v-if="isSearch" class="absolute top-0 z-[100] w-full h-[110vh]">
      <div class="bg-gray-200 w-full h-1/10 flex items-center justify-center ">
        <Input inputType="search" class="border-[1px] border-black bg-gray-300 !w-[275px] !h-[50px]" v-model="searchQuery" inputPlaceholder="Search">
          <SearchIcon class="h-[24px] w-[24px] text-black" @click="handleSearch()"/>
        </Input>
        <CloseIcon class="absolute text-black top-2 right-3" @click="closeSearchBar"/>
      </div>
      <div class="top-0 z-[100] w-full h-[110vh] bg-black/75" @click="closeSearchBar"/>
      </div>
  
    <div v-show="isBasketVisible || isAnimating" class="h-[100vh] absolute right-[0px] w-full flex justify-end z-[100]">
      <div
      v-show="isBasketVisible || isAnimating" 
      class="h-full w-full absolute z-0 bg-[#00000066]" 
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
