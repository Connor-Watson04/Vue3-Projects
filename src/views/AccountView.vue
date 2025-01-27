<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAccountStatus } from '@/composables/useAccountStatus'

import orderHistory from '@/orders.json'
import myOrders from '@/components/Account/myOrders.vue'
import myAccount from '@/components/Account/myAccount.vue'

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

// clear account status on log out
const handleLogOut = () => {
  setAccountStatus('Sign-In')
  localStorage.removeItem('accountStatus')
  router.push({ name: 'Sign-In' })
}

const displayPopUp = () => {
  logOutPopUp.value = true
  document.body.style.overflow = 'hidden'
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const closeLogOut = () => {
  logOutPopUp.value = false
  document.body.style.overflow = ''
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
  <section v-if="logOutPopUp" class="logOutConfirm" @click="closeLogOut">
    <div class="logOutForm">
      <p>Are you sure you would like to log out?</p>
      <div class="confirmationButtons">
        <button class="logOutFormButton" @click="closeLogOut">No</button>
        <button class="logOutFormButton yesButton" @click="handleLogOut">Yes</button>
      </div>
    </div>
  </section>
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

.logOutConfirm {
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logOutForm {
  background-color: white;
  color: black;
  position: relative;
  bottom: 100px;
  height: 20%;
  width: 30%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.accountName {
  color: var(--color-text);
  font-weight: 700;
  font-size: 30px;
}
.confirmationButtons {
  margin-top: 10px;
  display: flex;
  gap: 15px;
}

.logOutFormButton {
  border-radius: 10px;
  padding: 5px 25px;
}

.yesButton {
  background-color: rgba(249, 45, 45, 0.858);
}
</style>
