<script setup>
import { ref } from 'vue'
import CreateAccount from './Create-Account.vue'
import LogIn from './LogIn.vue'
import Benefits from './benefits.vue'
import { useIsMobile } from '@/composables/useMobile'

// Define a reactive variable to track which form is visible
const isLogInVisible = ref(true)

const {isMobile} = useIsMobile()

// Function to toggle forms
function toggleForm(showLogIn) {
  isLogInVisible.value = showLogIn
}
</script>

<template>
  <section class="flex flex-col lg:flex-row justify-center items-center !mb-[4rem] w-full px-5 ">
    <div class="w-full min-h-[200px] max-w-[500px] flex flex-col gap-8 items-center justify-center bg-[var(--color-promo)] !py-[2rem] lg:!pb-[4rem] rounded-[15px]"
    :class="{'rounded-b-none': isMobile, 'rounded-r-none': !isMobile}"
    >

      <div class="flex justify-center items-center gap-[1rem] place-self-top">
        <div class="link-container">
          <!-- Call toggleForm with true for Log In and false for Create Account -->
          <a class="text-lg md:text-xl bg-none border-none decoration-none cursor-pointer select-none text-center" :class="{ 'text-yellow-500 underline': isLogInVisible }" @click="toggleForm(true)">
            Log In
          </a>
        </div>
        <div class="link-container">
          <a class="text-lg md:text-xl bg-none border-none decoration-none cursor-pointer select-none text-center" :class="{ 'text-yellow-500 underline': !isLogInVisible }" @click="toggleForm(false)">
            Create Account
          </a>
        </div>
      </div>
      <div class="flex justify-center relative w-full">
      <transition name="fade-form" mode="out-in">
        <component
        :is="isLogInVisible ? LogIn : CreateAccount"
        :key="isLogInVisible ? 'login' : 'create'"
        @switch-to-login="toggleForm(true)"
        />
      </transition>
      </div>
    </div>
    <Benefits v-show="!isLogInVisible" class="rounded-[15px] w-full lg:h-[612px]" :class="{'rounded-t-none': isMobile, 'rounded-l-none': !isMobile}" />
  </section>
</template>

<style scoped>
.transition-wrapper {
  position: relative;
  width: 100%;
}

/* The fade only - no transform, no absolute positioning */
.fade-form-enter-active,
.fade-form-leave-active {
  transition: opacity 0.4s ease;
}

.fade-form-enter-from,
.fade-form-leave-to {
  opacity: 0;
}

.fade-form-enter-to,
.fade-form-leave-from {
  opacity: 1;
}
</style>

