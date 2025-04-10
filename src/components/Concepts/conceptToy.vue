<script setup>
import { onMounted } from 'vue';
import { useSliderNav } from '@/composables/useSliderNav';
import Slider from "../Reuseable/Slider.vue";
import toyView from "./Toys/toyView.vue";
import SliderNav from "../Reuseable/sliderNav.vue";
import concepts from "@/concepts.json";

// Extract the Toys array from the JSON
const Toys = concepts.Concepts.Toys;

const {
  sliderRef,
  activeIndex,
  scrollToSlide,
  observeSlides
} = useSliderNav();

onMounted(() => {
  observeSlides(Toys.length);
});
</script>

<template>
  <div class="w-full !mt-5">
    <h1 class="text-center text-[var(--color-dubby)] text-2xl font-bold drop-shadow-lg">
      Our Concepts
    </h1> 
    <div class="w-full">
      <Slider ref="sliderRef">
        <div
          v-for="(toy, index) in Toys"
          :key="toy.name + index"
          :id="'slide-' + index"
          class="snap-center flex flex-row justify-center items-center min-w-[99%]"
        >
          <toyView :conceptToy="toy" />
        </div>
      </Slider>     
    </div>
  </div>
    <SliderNav 
      class="flex justify-center items-center"
      :count="Toys.length"
      :active="activeIndex"
      @navigate="scrollToSlide"
    />
</template>
