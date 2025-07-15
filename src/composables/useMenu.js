// composables/useBasket.js
import { ref } from 'vue'

const isMenuVisible = ref(false)
const isAnimating = ref(false)

export function useMenu() {
  function toggleMenu() {
    isMenuVisible.value = !isMenuVisible.value
    isAnimating.value = true
  }

  function closeMenu() {
    isAnimating.value = true
    isMenuVisible.value = false
  }

  return {
    isMenuVisible,
    isAnimating,
    toggleMenu,
    closeMenu,
  }
}
