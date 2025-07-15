<script setup lang="ts">
import { ref } from 'vue'
import closeIcon from '../Reuseable/icons/closeIcon.vue'
import Input from '../Reuseable/Input.vue'
import Text from '../Reuseable/Text.vue'
import { useToast } from 'vue-toastification'

const toast = useToast()    
const emit = defineEmits(['closed', 'password-updated'])

const isVisible = ref(true)
const confirmCurrentPassword = ref('')
const newPassword = ref('')


function handleClose() {
  isVisible.value = false // triggers slide-out
}

// When the animation ends, and we're sliding *out*, tell the parent to unmount
function onAnimationEnd() {
  if (!isVisible.value) {
    emit('closed') // we finished sliding out
  }
}

function updatePassword() {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const storedPassword = user.password

  if (confirmCurrentPassword.value !== storedPassword) {
    toast.error('Current password does not match your account.')
    return
  }
  
  user.password = newPassword.value
  localStorage.setItem('user', JSON.stringify(user))

  emit('password-updated', newPassword.value)
  toast.success('Password updated successfully!')
  handleClose()
}


</script>

<template>
    <section
      class="trayContainer absolute -top-12 right-0 text-black h-[90vh] w-full md:w-[350px] shadow-xl bg-black/50 select-none overflow-y-scroll"
      :class="isVisible ? 'slide-in' : 'slide-out'"
      @animationend="onAnimationEnd"
    >
      <div class="absolute top-0 right-0 text-black h-[90vh] w-9/10 shadow-xl bg-white select-none">
        <span class="bg-white flex w-full items-center border-b sticky top-0 z-10 py-2 px-4">
          <h1 class="text-2xl w-full">Change Password</h1>
          <button @click="handleClose">
            <closeIcon />
          </button>
        </span>
        <div class="flex flex-col gap-4 p-4">
          <div>
            <Text>Current Password:</Text>
            <Input
                v-model="confirmCurrentPassword"
                input-type="password"
                class="border-1 rounded-xs w-full"
            />

          </div>
          <div>
            <Text>New Password:</Text>
            <Input v-model="newPassword" input-type="password" class="border-1 rounded-xs w-full" />
          </div>
          <button @click="updatePassword" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Save
          </button>
        </div>
      </div>
    </section>
  </template>
  

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.trayContainer.slide-in {
  animation: slideIn 0.3s forwards;
}

.trayContainer.slide-out {
  animation: slideOut 0.3s forwards;
}
</style>
