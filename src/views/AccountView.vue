<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStatus } from '@/composables/useAccountStatus'

import orderHistory from '@/orders.json'
import myOrders from '@/components/Account/myOrders.vue'
import myAccount from '@/components/Account/myAccount.vue'
import removeConfirmation from '@/components/Reuseable/removeConfirmation.vue' // import

let showMyOrders = ref(false)
let showMyAccount = ref(true)
let logOutPopUp = ref(false)

const { setAccountStatus } = useAccountStatus()
const router = useRouter()

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
  <main class="accountArea">
    <section class="accountSelectors">
      <button class="selectorButton" @click="toggleMyAccount">My Account</button>
      <button class="selectorButton" @click="toggleMyOrders">My Orders</button>
      <button class="selectorButton" @click="displayPopUp">Sign Out</button>
    </section>

    <section class="accountContainer">
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


<style scoped>
.accountArea {
  display: flex;
  position: relative;
}

.accountSelectors {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  width: 10%;
  gap: 5px;
}

.accountContainer {
  overflow: hidden;
  border-radius: 11px;
  padding: 10px;
  margin: 0px 2rem 5rem 0px;
  width: 100%;
  height: 50vh;
  background-color: var(--color-background-mute);
}

.selectorButton {
  width: 85%;
  padding: 10px 5px;
  border-radius: 3rem;
  background-color: var(--color-button);
  font-weight: 600;
  color: var(--color-text);
}

.selectorButton:hover {
  background-color: var(--color-button-hover);
}


.accountName {
  color: var(--color-text);
  font-weight: 700;
  font-size: 30px;
}

</style>
