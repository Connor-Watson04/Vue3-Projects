<script setup>
import { computed, ref, defineEmits } from 'vue'
import { useToast } from 'vue-toastification'

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

    console.log(name)

    localStorage.setItem(
      'user',
      JSON.stringify({ name, accountName, email, password: password.value })
    )

    console.log(localStorage.getItem('user'))
    toast.success('Account created successfully')

    emit('switchToLogin')
  }
}
</script>

<template>
  <section>
    <form class="loginForm" @submit.prevent="handleSubmit">
      <div class="createAccount-firstName">
        <label for="firstName">First Name</label>
        <span>
          <input
            v-model="firstName"
            type="text"
            name="firstName"
            id="firstName"
            required
            placeholder="First Name"
          />
        </span>
      </div>
      <div class="createAccount-lastName">
        <label for="lastName">Last Name</label>
        <span>
          <input
            v-model="lastName"
            type="text"
            name="lastName"
            id="lastName"
            required
            placeholder="Last Name"
          />
        </span>
      </div>

      <div class="createAccount-formEmail">
        <lable for="email"> Email </lable>
        <span class="emailInput">
          <input
            v-model="emailInput"
            name="email"
            id="email"
            type="text"
            required
            placeholder="Email"
            @input="validateEmail"
          />
          <input
            v-if="selectedOption === 'custom'"
            v-model="domainInput"
            type="text"
            id="domainInput"
            placeholder="@exampleDomain.com"
          />
          <select v-model="selectedOption">
            <option value="@gmail.com">@gmail.com</option>
            <option value="@hotmail.co.uk">@hotmail.co.uk</option>
            <option value="@yahoo.com">@yahoo.com</option>
            <option value="custom">Custom</option>
          </select>
        </span>
        <p v-if="emailError" class="error">{{ emailError }}</p>
      </div>
      <div>
        <label>Password</label>
        <input
          v-model="password"
          type="password"
          id="createPassword"
          class="password"
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
          class="password"
          required
          placeholder="Password"
          @input="validatePasswords"
        />
        <p v-if="passwordError" class="error">{{ passwordError }}</p>
      </div>
      <button :disabled="!isFormValid" type="submit">Create Account</button>
    </form>
  </section>
</template>

<style>
.loginForm {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.createAccount-firstName,
.createAccount-lastName,
.password,
#email {
  display: flex;
  flex-direction: column;
}

input {
  padding: 8px 1rem;
}

.emailInput {
  display: flex;
}

.error {
  color: red;
  font-size: 0.9rem;
}
</style>
