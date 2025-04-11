<script setup>
import { RouterLink } from 'vue-router';

import Text from '../Reuseable/Text.vue';
import AddMobileBasket from '../Basket/addMobileBasket.vue';

defineProps({
  Products: Object
})
</script>

<template>
    <section class="px-2">
        <div v-for="Product in Products.Product" :key="Product.name">
            <div class="bg-white flex flex-row shadow-lg w-full h-[200px] rounded-2xl overflow-hidden text-black">
                <router-link
                class="w-1/2"
                :to="{ name: 'Product details', params: { URL: Product.URL } }"
                >
                <img :src="Product.image" :alt="Product.name" class="w-full h-auto" />
            </router-link>
                <div class="flex flex-col pt-2">
                    <h1 class="text-start text-base !font-semibold">
                        {{ Product.name }}
                    </h1>
                    <Text class="!text-gray-700 text-sm !font-normal">
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



