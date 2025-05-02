<template>
    <img v-if="imageSrc || placeHolderImg" :src="imageSrc || placeHolderImg" :alt="imageAlt || 'sis squad product image'" />
</template>
  

<script setup>
import placeHolderImg from '@/assets/Images/Logo/placeHolder.jpg'

defineProps({
    imageSrc: String,
    imageAlt: String,
})
</script>