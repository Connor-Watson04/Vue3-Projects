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
  <section class="formContainer">
    <div class="formContent">
      <div class="formHeaders">
        <div class="link-container">
          <!-- Call toggleForm with true for Log In and false for Create Account -->
          <a class="formLinks" :class="{ active: isLogInVisible }" @click="toggleForm(true)"
            >Log In</a
          >
        </div>
        <div class="link-container">
          <a class="formLinks" :class="{ active: !isLogInVisible }" @click="toggleForm(false)"
            >Create Account</a
          >
        </div>
      </div>
      <div class="Login-form">
        <!-- Conditional rendering based on isLogInVisible -->
        <LogIn v-if="isLogInVisible" />
        <CreateAccount v-if="!isLogInVisible" @switch-to-login="toggleForm(true)" />
      </div>
    </div>
  </section>
</template>

<style>
.formContainer {
  display: flex;
  margin-bottom: 5rem;
  justify-content: center;
}

.formContent {
  height: auto;
  width: 50%;
  border-radius: 20px;
  background-color: var(--color-promo);
  padding-bottom: 2rem;
}

.formHeaders {
  display: flex;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.6rem;
}

.formLinks {
  font-size: 20px;
  background: none;
  border: none;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  text-align: center;
}

.login-form {
  display: flex;
  justify-content: left;
}

.active {
  color: var(--vt-c-yellow);
}
</style>
