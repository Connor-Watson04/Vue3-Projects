import { reactive } from 'vue'

const state = reactive({
  basket: []
})

// Initialize basket from localStorage only if it's empty
function initializeBasket() {
  if (state.basket.length === 0) {
    const savedBasket = JSON.parse(localStorage.getItem('basketItems')) || []
    state.basket.push(...savedBasket) // Populate basket from saved data
  }
}

export function useBasket() {
  initializeBasket() // Call to ensure basket is loaded from localStorage only once

  function addProduct(product) {
    // Check if the product already exists in the basket based on name and size
    const exists = state.basket.some(
      (item) => item.name === product.name && item.size === product.size
    )

    if (!exists) {
      state.basket.push(product)
      localStorage.setItem('basketItems', JSON.stringify(state.basket)) // Sync with localStorage
    }
  }

  return {
    basket: state.basket, // Return the reactive basket
    addProduct
  }
}
