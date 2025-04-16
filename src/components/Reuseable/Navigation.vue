<template>
      <nav class="flex flex-row justify-evently gap-2 items-center text-black dark:text-white p-0">
        <RouterLink to="/product" class="p-0"><Text>Products</Text></RouterLink>
        <Button  @click="toggleBasket" class="!py-0 !px-0 bg-none border-none"><Text>Basket</Text></Button>
        <RouterLink  :to="`/${accountStatus}`" class="p-0">
          <Text>
            {{decodeURIComponent(accountStatus)}}
          </Text>
        </RouterLink>
      </nav>
</template>

<script setup>
import { useAccountStatus } from '@/composables/useAccountStatus'
import { useBasket } from '@/composables/useBasket'

import Text from './Text.vue'
import Button from './Button.vue'

const { accountStatus } = useAccountStatus()
const { toggleBasket } = useBasket()

</script>
