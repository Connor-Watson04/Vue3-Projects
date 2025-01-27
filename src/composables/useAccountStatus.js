import { ref, provide, inject } from 'vue'

const accountStatusKey = Symbol('accountStatus')

export function provideAccountStatus() {
  const accountStatus = ref(decodeURIComponent(localStorage.getItem('accountStatus') || 'Sign-In'))
  const setAccountStatus = (status) => {
    accountStatus.value = status
    localStorage.setItem('accountStatus', encodeURIComponent(status))
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
