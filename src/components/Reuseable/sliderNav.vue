<template>
    <div class="flex gap-2 !mt-4">
        <button 
        v-for="index in count" 
        :key="index" 
        :class="[
            'w-4 h-4 p-1 rounded-full outline-2 outline-gray-800 transition border-2 border-blue-400',
            index - 1 === active ? 'bg-pink-500' : 'bg-blue-400'
        ]" 
        @click="$emit('navigate', index - 1)"/>
    </div>
</template>

<script setup>

defineProps({
    count:  Number,
    active: {
        type: Number,
        defualt: 0
    }
})

defineEmits(['navigate'])


</script>
