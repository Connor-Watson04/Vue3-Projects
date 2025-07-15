<template>
    <div class="absolute bg-black/50 top-25 h-full w-full right-0 flex flex-col justify-end">
        <div class="bg-white absolute top-0 right-0 flex flex-col w-[300px] outline shadow-2xl">
            <div class="flex flex-row justify-between items-center border-b-1 shadow-lg border-black p-2">
                <h1 class="text-lg !font-bold text-black">
                    Specifications
                </h1>
                <Button class="bg-none text-black cursor-pointer" button-type="button" @click="closeSpecifications">
                    <closeIcon />
                </Button>
            </div>
            <div class="flex flex-col space-y-2 h-[100vh] w-full text-black py-4 px-2 text-base">
                <div 
                    v-for="(value, key) in Specifications"
                    class="flex flex-row items-center w-full text-black py-2 border-b-1 border-gray-400 justify-between"
                    :key="key"
                >
                    <span>{{ key }}:</span>
                    <div v-if="Array.isArray(value)" class="flex flex-col">
                        <span v-for="(item, index) in value" :key="index" class="text-wrap !font-semibold text-end">{{ item }}</span>
                    </div>
                    <span v-else class="!font-semibold">{{ value }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import closeIcon from './icons/closeIcon.vue';
import Button from './Button.vue';

const props = defineProps({
    Specifications: Object
})

const emit = defineEmits(['close'])

console.log(props.Specifications.Material)

const closeSpecifications = () => {
 emit('close')
}

</script>
