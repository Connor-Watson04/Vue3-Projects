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
    <img :src="`${props.URL}`" />
    <div>
      <p>Ordered: {{ props.date }}</p>
      <span>
        <p>{{ props.name }}</p>
        <p>{{ props.Price }}</p>
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
