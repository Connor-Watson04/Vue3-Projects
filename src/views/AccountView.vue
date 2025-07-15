<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStatus } from '@/composables/useAccountStatus'
import { useIsMobile } from '@/composables/useMobile'

import orderHistory from '@/orders.json'
import myOrders from '@/components/Account/myOrders.vue'
import myAccount from '@/components/Account/myAccount.vue'
import removeConfirmation from '@/components/Reuseable/removeConfirmation.vue' 
import menuDropdown from '@/components/Reuseable/menuDropdown.vue'
import skeletonLoader from '@/components/Reuseable/skeletonLoader.vue'
import Spinner from '@/components/Reuseable/Spinner.vue'
import Text from '@/components/Reuseable/Text.vue'


const { isMobile }= useIsMobile()
const { setAccountStatus } = useAccountStatus()
const router = useRouter()

const isLoading = ref(true)
const showMyOrders = ref(false)
const showMyAccount = ref(true)
const logOutPopUp = ref(false)
const currentMenu = ref('My Account')

setTimeout(() => {
  isLoading.value = false
}, 1000)

function setCurrentMenu(menuName) {
  currentMenu.value = menuName
}


const toggleMyOrders = () => {
  showMyOrders.value = true
  showMyAccount.value = false
}

const toggleMyAccount = () => {
  showMyAccount.value = true
  showMyOrders.value = false
}



const displayPopUp = () => {
  logOutPopUp.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const handleLogOut = () => {
  setAccountStatus('Sign-In')
  localStorage.removeItem('accountStatus')
  router.push({ name: 'Sign-In' })
}

const closeLogOut = () => {
  logOutPopUp.value = false
}

</script>

<template>
    <div v-if="isLoading" class="p-2">
    <skeletonLoader>
      <div class="h-40 w-full bg-black/75 rounded-md animate-pulse flex flex-row items-center justify-center gap-2">
      <Spinner  class="!text-gray-200"/>
      <Text class="text-gray-200">Content Loading</Text>
      </div>
    </skeletonLoader>
  </div>
  <main v-else class="flex flex-col md:flex-row gap-2 relative p-2">
    <section v-if="isMobile">
      <menuDropdown :buttonText="currentMenu" class="w-full" v-slot="{close}">
        <RouterLink to="/Account/Dashboard"  @click.prevent="() => { setCurrentMenu('My Account'); toggleMyAccount(); close(); }" class="block px-4 py-2 hover:bg-gray-100">
          My Account
        </RouterLink>
        <RouterLink to="/Account/My-Orders" @click.prevent="() => { setCurrentMenu('My Orders'); toggleMyOrders(); close(); }" class="block px-4 py-2 hover:bg-gray-100">
          My Orders
        </RouterLink>
        <button
          class="block w-full !text-rose-400 !font-semibold text-left px-4 py-2 border-t border-gray-200 hover:bg-rose-100"
          @click="displayPopUp"
        >
          Sign Out
        </button>
      </menuDropdown>
      </section>
      <section v-if="!isMobile" class="flex flex-row items-center md:flex-col gap-3">
        <button class="py-2 px-4" @click="toggleMyAccount">My Account</button>
        <button class="py-2 px-4" @click="toggleMyOrders">My Orders</button>
        <button class="py-2 px-4" @click="displayPopUp">Sign Out</button>
      </section>

    
    <section class="overflow-hidden rounded-md p-[10px] w-full h-auto bg-[var(--color-background-mute)] max-w-[800px]">
      <myAccount v-if="showMyAccount" />
      <myOrders v-if="showMyOrders" :orderHistory="orderHistory" />
    </section>
  </main>
  <removeConfirmation
   message="Are you sure you wish to log out?"
    :visible="logOutPopUp"
    mode="fullscreen"
    @close="closeLogOut"
    @confirm="handleLogOut"
  />
</template>
