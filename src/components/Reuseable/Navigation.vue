<template>
      <nav class="navigation">
        <RouterLink to="/product">Products</RouterLink>
        <button  @click="toggleBasket" class="">Basket</button>
        <RouterLink  :to="`/${accountStatus}`">
          {{decodeURIComponent(accountStatus)}}
        </RouterLink>
      </nav>
</template>

<script setup>
import { useAccountStatus } from '@/composables/useAccountStatus'
import { useBasket } from '@/composables/useBasket'

const { accountStatus } = useAccountStatus()
const { toggleBasket } = useBasket()

</script>
