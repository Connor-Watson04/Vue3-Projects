<script setup>
const props = defineProps({
  URL: String,
  name: String,
  date: String,
  items: Number,
  Price: Number
})
</script>

<template>
  <div class="orderTable">
    <img :src="`${URL}`" />
    <div>
      <p>Ordered: {{ date }}</p>
      <span>
        <p>{{ name }}</p>
        <p>{{ Price }}</p>
      </span>
    </div>
  </div>
</template>

<style scoped>
p {
  color: var(--color-text);
}

.orderTable {
  display: flex;
}

img {
  height: 100px;
}

span {
  display: flex;
  gap: 5px;
}
</style>
