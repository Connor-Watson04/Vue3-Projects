<template>
  <section class="flex flex-col gap-3 md:flex-row !my-4 px-2 flex items-center md:justify-center">
      <div v-for="(Product, index) in Products.Product.slice(0, 4)" :key="index" >
          <div class="bg-white flex flex-row shadow-lg w-full md:flex-col h-[225px] max-w-[500px] md:h-full rounded-2xl overflow-hidden text-black">
              <router-link
              class="w-1/2 h-auto flex items-center justify-center md:w-full sm:max-h-[250px] sm:max-w-[250px]"
              :to="{ name: 'Product details', params: { URL: Product.URL } }"
              >
              <Image :imageSrc="Product.image" :imageAlt="Product.name" class="w-full h-full md:h-[200px]" />
          </router-link>
              <div class="flex flex-col justify-center md:p-2">
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
                  <Text class="!text-black !text-start">£{{ Product.Price }}</Text>
                  <AddMobileBasket :image="Product.image" :name="Product.name" :price="Product.Price" />
              </div>
          </div>
      </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import AddMobileBasket from '@/components/Basket/addMobileBasket.vue';
import Text from '@/components/Reuseable/Text.vue';
import Image from '@/components/Reuseable/Image.vue';


defineProps({
  Products: Object
})

</script>
