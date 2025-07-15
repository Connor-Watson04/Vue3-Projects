// composables/useIsMobile.js
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

export function useIsMobile(breakpoint = 1023) {
  const windowWidth = ref(window.innerWidth)

  function updateWindowWidth() {
    windowWidth.value = window.innerWidth
  }

  const isMobile = computed(() => windowWidth.value <= breakpoint)

  onMounted(() => {
    window.addEventListener('resize', updateWindowWidth)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateWindowWidth)
  })

  return { isMobile, windowWidth }
}