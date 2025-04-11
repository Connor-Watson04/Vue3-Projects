<template>
  <section class="px-2">
      <div v-for="(Product, index) in Products.Product.slice(0, 4)" :key="index" >
          <div class="bg-white flex flex-row shadow-lg w-full h-[225px] rounded-2xl overflow-hidden text-black">
              <router-link
              class="w-1/2 flex items-center justify-center"
              :to="{ name: 'Product details', params: { URL: Product.URL } }"
              >
              <img :src="Product.image" :alt="Product.name" class="w-full h-auto" />
          </router-link>
              <div class="flex flex-col justify-center">
                  <h1 class="text-start text-base !font-bold">
                      {{ Product.name }}
                  </h1>
                  <Text class="!text-gray-700 text-start text-sm !font-normal">
                      Free shipping 
                  </Text>
                  <router-link
                  class="w-full text-blue-500 hover:underline"
                  :to="{ name: 'Product details', params: { URL: Product.URL } }"
                  >
                  More Info
                  </router-link>
                  <AddMobileBasket :image="image" :name="name" :Price="Price" />
              </div>
          </div>
      </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import AddMobileBasket from '@/components/Basket/addMobileBasket.vue';
import Text from '@/components/Reuseable/Text.vue';


defineProps({
  Products: Object
})

</script>
