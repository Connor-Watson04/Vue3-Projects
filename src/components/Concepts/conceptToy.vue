<script setup>
import { onMounted } from 'vue';
import { useIsMobile } from '@/composables/useMobile';
import { useSliderNav } from '@/composables/useSliderNav';
import Slider from "../Reuseable/Slider.vue";
import toyView from "./Toys/toyView.vue";
import SliderNav from "../Reuseable/sliderNav.vue";
import concepts from "@/concepts.json";
import ArrowIcon from '../Reuseable/icons/arrowIcon.vue';

// Extract the Toys array from the JSON
const Toys = concepts.Concepts.Toys;

const {windowWidth} = useIsMobile()

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
        class="snap-center sm:snap-none shrink-0 flex flex-row justify-center items-center place-items-center w-full sm:w-[300px] h-[500px]"
        >
        <toyView :conceptToy="toy" />
      </div>
      </Slider>     
    </div>
  </div>
    <SliderNav 
    v-if="windowWidth <= 767"
      class="flex justify-center items-center"
      :count="Toys.length"
      :active="activeIndex"
      @navigate="scrollToSlide"
    />
</template>
