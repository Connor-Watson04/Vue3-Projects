import { computed, unref } from 'vue'
import { useRoute } from 'vue-router'

export function useActiveRoute(targetPath, exact = true) {
  const route = useRoute()

  const isActive = computed(() => {
    const path = unref(targetPath) 
    return exact
      ? route.path === path
      : route.path.startsWith(path)
  })

  return { isActive }
}
