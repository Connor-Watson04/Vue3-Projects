<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { useBasket } from '@/composables/useBasket'
import { useMenu } from '@/composables/useMenu'
import { useIsMobile } from '@/composables/useMobile'


import Input from './Input.vue'
import Button from './Button.vue'
import Text from './Text.vue'
import BasketTray from '../Basket/basketTray.vue'
import SearchIcon from './icons/searchIcon.vue'
import CloseIcon from './icons/closeIcon.vue'
import Navigation from './Navigation.vue'
import Image from './Image.vue'
import MenuIcon from './icons/menuIcon.vue'
import MenuTray from '../Menu/menuTray.vue'

const { isBasketVisible, isAnimating, closeBasket } = useBasket()
const { isMenuVisible, toggleMenu, closeMenu } = useMenu()
const { isMobile } = useIsMobile()

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
  if (!isBasketVisible.value || !isMenuVisible.value) {
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
    <header class="flex flex-col lg:flex-row lg:gap-4 items-center h-full justify-evenly md:px-2 md:max-w-[1240px] lg:justify-center lg:max-w-full">
       <Button v-if="!isMobile" @click="() => { toggleMenu(), closeBasket() }" class="bg-none bg-gray-400 flex flex-row">
      <MenuIcon />
      <Text>Menu</Text>
    </Button>
      <RouterLink to="/" class="lg:w-1/4">
        <Image class="h-[65px] w-auto" imageSrc="/src/assets/Images/Logo/S-I-S Logo.png" imageAlt="homepage" />
      </RouterLink>

        <form @submit.prevent="handleSearch" class="w-full">
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
      <div class="flex flex-row items-center justify-center w-full lg:w-1/2 h-full gap-4">
        <div v-if="isMobile" >
          <form @submit.prevent="handleSearch" class="flex flex-row gap-2 md:gap-4">
            <Button v-if="isMobile" @click="() => { toggleMenu(), closeBasket() }" class="bg-none border-none !py-0 !px-0 md:text-lg active:text-[var(--cyan-default)] visited:text-[var(--pink-default)]" buttonType="button">
              Menu
            </Button>
            <Button @click="displaySearchBar" v-if="!isSearch" class="bg-none border-none !py-0 !px-0 md:text-lg active:text-[var(--cyan-default)] visited:text-[var(--pink-default)]" buttonType="button">
              Search
            </Button>
          </form>
        </div>
        <Navigation />
      </div>
    </header>

    <div v-if="isSearch" class="absolute top-0 z-[100] w-full h-[110vh]">
      <div class="bg-gray-200 w-full h-1/10 flex items-center justify-center ">
        <Input inputType="search" class="border-[1px] border-black bg-gray-300 w-2/3 !h-[50px]" v-model="searchQuery" inputPlaceholder="Search">
          <SearchIcon class="h-[24px] w-[24px] text-black" @click="handleSearch()"/>
        </Input>
        <CloseIcon class="absolute text-black top-2 right-3" @click="closeSearchBar"/>
      </div>
      <div class="top-0 z-[100] w-full h-[110vh] bg-black/75" @click="closeSearchBar"/>
      </div>
  
    <div v-show="isBasketVisible" class="h-[100vh] absolute right-[0px] w-full flex justify-end z-[100]">
      <div
      v-show="isBasketVisible" 
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
    <div v-show="isMenuVisible" class="h-[100vh] absolute left-0 w-full flex justify-start z-[100]">
      <div
      v-show="isMenuVisible" 
      class="h-full w-full absolute z-0 bg-[#00000066]" 
      @click="closeMenu"
      :class="{'fade-in': isMenuVisible, 'fade-out': !isMenuVisible}" 
      />
      <MenuTray
      v-if="isAnimating || isMenuVisible"
      @closeMenu="closeMenu"
      :class="{ 'slide-in': isMenuVisible, 'slide-out': !isMenuVisible }"
      @animationend="handleAnimationEnd"
      />
    </div>
  </section>
</template>
