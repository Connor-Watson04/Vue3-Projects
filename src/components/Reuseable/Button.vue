<template>
    <button :type="buttonType">
        <slot/>
    </button>
</template>

<script setup>
const props = defineProps({
    buttonType: String,
})

</script>
