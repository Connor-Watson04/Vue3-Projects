<script setup>
import { computed, ref, defineEmits } from 'vue'
import { useToast } from 'vue-toastification'

import Input from '../Reuseable/Input.vue'
import Button from '../Reuseable/Button.vue'

const emit = defineEmits(['switchToLogin'])
const toast = useToast()
const selectedOption = ref('@gmail.com')
const firstName = ref('')
const lastName = ref('')
const emailInput = ref('')
const domainInput = ref('')
const emailError = ref('')
const password = ref('')
const confirmPassword = ref('')
const passwordError = ref('')

//Validate Email
const validateEmail = () => {
  if (emailInput.value.includes('@')) {
    emailError.value = 'Invalid character detected'
  } else {
    emailError.value = ''
  }
}

//Validate Password
const validatePasswords = () => {
  if (password.value && confirmPassword.value) {
    if (password.value !== confirmPassword.value) {
      passwordError.value = 'Passwords do not match'
    } else {
      passwordError.value = ''
    }
  }
}

//check validity
const isFormValid = computed(() => {
  return (
    emailError.value === '' &&
    passwordError.value === '' &&
    emailInput.value.trim() !== '' &&
    password.value.trim() !== '' &&
    confirmPassword.value.trim() !== ''
  )
})

const handleSubmit = () => {
  if (isFormValid) {
    const email =
      selectedOption.value === 'custom'
        ? emailInput.value + domainInput.value
        : emailInput.value + selectedOption.value

    const name = `${firstName.value} ${lastName.value}`

    const accountName = firstName.value

    localStorage.setItem(
      'user',
      JSON.stringify({ name, accountName, email, password: password.value })
    )

    toast.success('Account created successfully')

    emit('switchToLogin')
  }
}
</script>

<template>
  <section>
    <form class="flex flex-col gap-[1.2rem]" @submit.prevent="handleSubmit">
      <div class="flex flex-col">
        <label for="firstName">First Name</label>
        <span>
          <Input
            v-model="firstName"
            input-type="text"
            name="firstName"
            id="firstName"
            class="bg-white"
            required
            input-placeholder="First Name"
          />
        </span>
      </div>
      <div class="flex flex-col">
        <label for="lastName">Last Name</label>
        <span>
          <Input
            v-model="lastName"
            input-type="text"
            name="lastName"
            id="lastName"
            class="bg-white"
            required
            input-placeholder="Last Name"
          />
        </span>
      </div>

      <div class="flex flex-col">
        <lable for="email"> Email </lable>
        <span class="flex flex-col gap-2">
          <Input
            v-model="emailInput"
            name="email"
            class="flex bg-white"
            input-type="text"
            required
            input-placeholder="Email"
            @input="validateEmail"
          />
          <Input
            v-if="selectedOption === 'custom'"
            v-model="domainInput"
            input-type="text"
            id="domainInput"
            input-placeholder="@exampleDomain.com"
            class="bg-white"
          />
          <select v-model="selectedOption" class="bg-white text-black p-1">
            <option value="@gmail.com">@gmail.com</option>
            <option value="@hotmail.co.uk">@hotmail.co.uk</option>
            <option value="@yahoo.com">@yahoo.com</option>
            <option value="custom">Custom</option>
          </select>
        </span>
        <p v-if="emailError" class="text-red-500">{{ emailError }}</p>
      </div>
      <div>
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          id="createPassword"
          class="flex flex-col bg-white p-1"
          required
          placeholder="Password"
          @input="validatePasswords"
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          class="flex flex-col bg-white p-1"
          required
          placeholder="Password"
          @input="validatePasswords"
        />
        <p v-if="passwordError" class="text-red-500">{{ passwordError }}</p>
      </div>
      <Button
  :disabled="!isFormValid"
  button-type="submit"
  :class="[
    'bg-gradient-to-r',
    isFormValid ? 'from-cyan-400 to-pink-300' : 'from-cyan-400/50 to-pink-400/50'
  ]"
>
  Create Account
</Button>

    </form>
  </section>
</template>
