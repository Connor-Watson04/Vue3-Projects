<script setup>
import { RouterLink } from 'vue-router';

import Image from '../Reuseable/Image.vue';
import Text from '../Reuseable/Text.vue';
import AddMobileBasket from '../Basket/addMobileBasket.vue';

defineProps({
  Products: Object
})
</script>

<template>
    <section class="px-2 tab:items-center">
        <div v-for="Product in Products.Product" :key="Product.name" class="tab:w-2/3">
            <div class="bg-white flex flex-row shadow-lg w-full tab:items-center tab:justify-center h-auto py-2 tab:py-0 rounded-2xl overflow-hidden text-black">
                <router-link
                class="w-1/2 flex items-center justify-center"
                :to="{ name: 'Product details', params: { URL: Product.URL } }"
                >
                    <Image :image-src="Product.image" :imageAlt="Product.name" class="w-full h-auto" />
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
                <span class="flex flex-row gap-2 items-center">
                    <Text class="line-through decoration-red-500 text-sm decoration-[2px]">£{{ Product.OGP }}</Text>
                    <Text class="!text-black !font-semibold !text-start">£{{ Product.Price }}</Text>
                </span>
                <AddMobileBasket :image="Product.image" :name="Product.name" :price="Product.Price" />
            </div>
            </div>
        </div>
    </section>
</template>



