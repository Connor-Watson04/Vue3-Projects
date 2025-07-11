<template>
      <nav class="flex flex-row justify-evently gap-2 md:gap-4 items-center text-black dark:text-white p-0">
        <RouterLink to="/product" class="p-0 active:text-[var(--cyan-default)]" :class="isProductsPage ? 'text-[var(--pink-default)]' : ''" ><Text class="md:text-lg">Products</Text></RouterLink>
        <Button  @click="() => { toggleBasket(), closeMenu() }" class="!py-0 !px-0 bg-none border-none active:text-[var(--cyan-default)]" :class="isBasketActive ? 'text-[var(--pink-default)]' : ''"><Text class="md:text-lg">Basket</Text></Button>
        <RouterLink  :to="`/${accountStatus}`" class="p-0 active:text-[var(--cyan-default)]" :class="isAccountPage ? 'text-[var(--pink-default)]' : ''">
          <Text class="md:text-lg">
            {{decodeURIComponent(accountStatus)}}
          </Text>
        </RouterLink>
      </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useActiveRoute } from '@/composables/useActiveRoute'
import { useAccountStatus } from '@/composables/useAccountStatus'
import { useBasket } from '@/composables/useBasket'
import { useMenu } from '@/composables/useMenu'
import Text from '@/components/Reuseable/Text.vue'
import Button from '@/components/Reuseable/Button.vue'

const { accountStatus } = useAccountStatus()
const { toggleBasket, isBasketVisible } = useBasket()
const { closeMenu } = useMenu()

const accountPath = computed(() => `/${accountStatus.value}`)

const isBasketActive = isBasketVisible
const { isActive: isProductsPage } = useActiveRoute('/product')
const { isActive: isAccountPage } = useActiveRoute(accountPath)
</script>

