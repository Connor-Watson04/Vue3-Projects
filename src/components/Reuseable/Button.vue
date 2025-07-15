<template>
    <button :type="buttonType" :disabled="disableButton" :class="{'opacity-75': disableButton}" class="bg-gradient-to-r from-cyan-400 to-pink-400  px-4 py-2 active:from-cyan-500 active:to-pink-500">
        <slot/>
    </button>
</template>

<script setup>
const props = defineProps({
    buttonType: String,
    disableButton: Boolean
})

</script>
