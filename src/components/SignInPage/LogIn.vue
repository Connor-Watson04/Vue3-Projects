<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useAccountStatus } from '@/composables/useAccountStatus'

const router = useRouter()
const toast = useToast()
const emailInput = ref('')
const passwordInput = ref('')

const { setAccountStatus } = useAccountStatus()

//handle log in
const handleLogin = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'))

  if (!storedUser) {
    toast.error('No account found. Please create an account')
    return
  }

  if (emailInput.value === storedUser.email && passwordInput.value === storedUser.password) {
    toast.success('Logged in Successfully!')
    setAccountStatus('Account')
    router.push({ name: 'Account' })
  } else {
    toast.error('invalid email or password')
  }
}
</script>

<template>
  <section>
    <form class="loginForm" @submit.prevent="handleLogin">
      <div class="Login-formEmail">
        <lable for="email"> Email </lable>
        <input
          v-model="emailInput"
          name="email"
          id="email"
          type="email"
          required
          placeholder="Email"
        />
      </div>
      <div>
        <label>Password</label>
        <input
          v-model="passwordInput"
          type="password"
          id="password"
          class="password"
          required
          placeholder="Password"
        />
      </div>
      <button type="submit">Sign in</button>
    </form>
  </section>
</template>

<style>
.loginForm {
  display: flex;
  flex-direction: column;
  place-items: center;
}

.Login-formEmail {
  margin: 2rem;
}
#password,
#email {
  display: flex;
}

input {
  padding: 8px 1rem;
}
</style>
