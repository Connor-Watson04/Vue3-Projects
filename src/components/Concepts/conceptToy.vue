<script setup>
import Carousel from "@/components/Reuseable/Carousel.vue";
import toyView from "./Toys/toyView.vue";
import concepts from "@/concepts.json";


// Extract the Toys array from the JSON
const Toys = concepts.Concepts.Toys;

</script>

<template>
  <div class="w-full !mt-5">
    <h1 class="text-center text-[var(--color-dubby)] text-2xl font-bold drop-shadow-lg">
      Our Concepts
    </h1> 
      <Carousel :items="Toys">
        <template #default="{ item }">
          <toyView :conceptToy="item" />
        </template>
      </Carousel>
  </div>
</template>
