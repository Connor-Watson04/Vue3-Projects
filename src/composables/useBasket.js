// composables/useBasket.js
import { ref } from 'vue'

const isBasketVisible = ref(false)
const isAnimating = ref(false)

export function useBasket() {
  function toggleBasket() {
    isBasketVisible.value = !isBasketVisible.value
    isAnimating.value = true
  }

  function closeBasket() {
    isAnimating.value = true
    isBasketVisible.value = false
  }

  return {
    isBasketVisible,
    isAnimating,
    toggleBasket,
    closeBasket,
  }
}
