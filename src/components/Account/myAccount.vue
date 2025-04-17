<script setup>
import { ref, onMounted } from 'vue'
import EditIcon from '../Reuseable/icons/editIcon.vue'
import ChangeEmailTray from './changeEmailTray.vue'
import ChangePasswordTray from './changePasswordTray.vue'

let accountName = ref('')
let accountEmail = ref('')
let userName = ref('')
let password = ref('')

defineProps({
  orderHistory: Object
})



const activeTray = ref(null)

function handleOpenTray(type) {
  activeTray.value = type
}


onMounted(() => {
  const storedUser = localStorage.getItem('user')

  if (storedUser) {
    const user = JSON.parse(storedUser)
    accountName.value = user.accountName
    accountEmail.value = user.email
    userName.value = user.name
    password.value = user.password
  }
})
</script>

<template>
  <div class="accountOverview">
    <h2 class="accountName">Welcome Back {{ accountName }}!</h2>

    <H1>Account Overview</H1>
    <h2>
      Your name: {{ userName }}
    </h2>

    <div class="bg-gray-200 text-black p-2 h-full">
      <form class="flex flex-col gap-2">
        <div>
          <h2>Primary Email:</h2>
          <div class="flex flex-row justify-between">
            <input :value="accountEmail"  disabled/>
            <EditIcon type="email" @openTray="handleOpenTray" />

          </div>
        </div>
        <div>
          <h2>Your password:</h2>
          <div class="flex flex-row justify-between">
            <input type="password" :value="password" disabled />
            <EditIcon type="password" @openTray="handleOpenTray" />
          </div>
        </div>
      </form>
    </div>
  </div>
  <ChangeEmailTray 
  v-if="activeTray === 'email'" 
  @close="activeTray = null"
  @email-updated="accountEmail = $event" 
/>
  <ChangePasswordTray v-if="activeTray === 'password'" @close="activeTray = null" @password-updated="password = $event"/>
</template>

<style scoped>
.accountOverview {
  color: var(--color-text-alt);
}
</style>
