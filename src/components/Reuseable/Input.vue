<template>
  <div class="relative">
    <input
      :type="inputType"
      :value="modelValue"
      :placeholder="inputPlaceholder"
      @input="$emit('update:modelValue', $event.target.value)"
      class="placeholder:text-gray-500 lg:placeholder:font-semibold lg:placeholder:text-base lg:text-center lg:text-md lg:font-semibold h-full w-full"
    />
    <div class="absolute right-2 top-1/2 transform -translate-y-1/2">
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
    inputType: String,
    modelValue: String,
    inputPlaceholder: String,
});
</script>
