<template>
    <button :type="buttonType" class="bg-gradient-to-r from-cyan-400 to-pink-300 px-4 py-2 active:from-cyan-500 active:to-pink-400">
        <slot/>
    </button>
</template>

<script setup>
const props = defineProps({
    buttonType: String,
})

</script>
