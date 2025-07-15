<template>
    <div class="relative inline-block text-left w-full">
        <button @click="toggleDropdown" class="text-black text-lg px-4 py-2 bg-gray-200 border-2 border-black w-full flex justify-between items-center">
                {{ buttonText }}
            <ArrowIcon :class="['transform transition-transform duration-300', isOpen ? 'rotate-180' : 'rotate-0']"/>
        </button>
        <div 
        v-if="isOpen"
        class="absolute w-full text-black right-0 w-full origin-top-right bg-white border-2 border-black text-lg shadow-lg z-50"
        >
            <slot :close="closeDropdown"/>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ArrowIcon from './icons/arrowIcon.vue';

const props = defineProps({
    buttonText: {
        type: String,
        defualt: 'Menu',
    }
})

const isOpen = ref(false)

function toggleDropdown() {
    isOpen.value = !isOpen.value
}

function closeDropdown() {
    isOpen.value = false
}

</script>