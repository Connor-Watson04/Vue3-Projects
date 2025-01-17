import { ref, provide, inject } from 'vue'

const accountStatusKey = Symbol('accountStatus')

export function provideAccountStatus() {
  const accountStatus = ref(localStorage.getItem('accountStatus') || 'Sign-in')
  const setAccountStatus = (status) => {
    accountStatus.value = status
    localStorage.setItem('accountStatus', status)
  }

  provide(accountStatusKey, { accountStatus, setAccountStatus })
}

export function useAccountStatus() {
  const context = inject(accountStatusKey)

  if (!context) {
    throw new error('useAccountStatus must be within provider')
  }

  return context
}
