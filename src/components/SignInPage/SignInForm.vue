<script setup>
import { ref } from 'vue'
import CreateAccount from './Create-Account.vue'
import LogIn from './LogIn.vue'

// Define a reactive variable to track which form is visible
const isLogInVisible = ref(true)

// Function to toggle forms
function toggleForm(showLogIn) {
  isLogInVisible.value = showLogIn
}
</script>

<template>
  <section class="flex justify-center !mb-[5rem] w-full px-5">
    <div class="w-full h-auto rounded-[15px] bg-[var(--color-promo)] !pb-[2rem]">
      <div class="flex justify-center gap-[1rem] items-center !mb-[1.6rem]">
        <div class="link-container">
          <!-- Call toggleForm with true for Log In and false for Create Account -->
          <a class="text-lg bg-none border-none decoration-none cursor-pointer select-none text-center" :class="{ 'text-yellow-500 underline': isLogInVisible }" @click="toggleForm(true)">
            Log In
          </a>
        </div>
        <div class="link-container">
          <a class="text-lg bg-none border-none decoration-none cursor-pointer select-none text-center" :class="{ 'text-yellow-500 underline': !isLogInVisible }" @click="toggleForm(false)">
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

