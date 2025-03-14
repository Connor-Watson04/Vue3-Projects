import { reactive, watchEffect } from 'vue'

const state = reactive({
  basket: []
})

// Initialize basket from localStorage only if it's empty
function initializeBasket() {
  const savedBasket = JSON.parse(localStorage.getItem('basketItems')) || []
  if (state.basket.length === 0) {
    state.basket.push(...savedBasket) // Populate basket from saved data
  }
}

initializeBasket()

// Sync the basket state with localStorage whenever it changes
watchEffect(() => {
  localStorage.setItem('basketItems', JSON.stringify(state.basket))
})

export function useBasket() {

  function addProduct(product) {
    // Check if the product already exists in the basket based on name and size
    const exists = state.basket.some(
      (item) => item.name === product.name && item.size === product.size
    )

    if (!exists) {
      state.basket.push(product)
    }
  }

  function deleteProduct(index) {
    state.basket.splice(index, 1)
  }

  return {
    basket: state.basket, // Return the reactive basket
    addProduct,
    deleteProduct
  }
}
