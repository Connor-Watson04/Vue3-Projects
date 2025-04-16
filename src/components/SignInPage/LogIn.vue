<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useAccountStatus } from '@/composables/useAccountStatus'

import Input from '../Reuseable/Input.vue'
import Button from '../Reuseable/Button.vue'

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
    <form class="flex flex-col items-center gap-2" @submit.prevent="handleLogin">
      <div>
        <lable for="email"> Email </lable>
        <Input
          v-model="emailInput"
          name="email"
          class="flex bg-white"
          input-type="email"
          required
          input-placeholder="Email"
        />
      </div>
      <div>
        <label>Password</label>
        <Input
          v-model="passwordInput"
          name="password"
          class="flex bg-white"
          input-type="password"
          input-placeholder="Password"
          required
        />
      </div>
      <Button class="bg-gradient-to-r from-cyan-400 to-pink-300 py-1 px-2 w-full !font-semibold" button-type="submit">Sign in</Button>
    </form>
  </section>
</template>
