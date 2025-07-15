<template>
    <div class="flex gap-3 !mt-4">
        <button 
        v-for="index in count" 
        :key="index" 
        :class="[
            'w-5 h-5 p-1 rounded-full outline-2 outline-black transition',
            index - 1 === active ? 'bg-black' : 'bg-black/50'
        ]" 
        @click="$emit('navigate', index - 1)"/>
    </div>
</template>

<script setup>

defineProps({
    count:  Number,
    active: {
        type: Number,
        default: 0
    }
})

defineEmits(['navigate'])


</script>
