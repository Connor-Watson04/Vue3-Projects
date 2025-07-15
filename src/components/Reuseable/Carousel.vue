<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';
import { ref, onMounted, onUnmounted } from 'vue';

const config = ref({
  itemsToShow: 1,
  gap: 0,
  autoplay: 6000,
  wrapAround: true,
  pauseAutoplayOnHover: true,
});

const breakpoints = [
  {
    width: 600,
    itemsToShow: 1,
  },
  {
    width: 640,
    itemsToShow: 2,
  },
  {
    width: 1024,
    itemsToShow: 2,
  },
  {
    width: 1440,
    itemsToShow: 3,
  },
  {
    width: 2560,
    itemsToShow: 4,
  },
  {
    width: Infinity,
    itemsToShow: 7,
  },
]

function updateItemsToShow() {
  const breakpoint = breakpoints.find(b => window.innerWidth < b.width);
  config.value.itemsToShow = breakpoint ? breakpoint.itemsToShow : 7;
}

onMounted(() => {
  updateItemsToShow();
  window.addEventListener('resize', updateItemsToShow);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsToShow);
});
defineProps<{
    items: any[]
}>();

</script>

<template>
  <Carousel v-bind="config">
      <Slide v-for="(item, index) in items" :key="index" >
      <slot :item="item" :index="index" />
    </Slide>

    <template #addons>
      <Navigation id="navigation" />
      <Pagination id="pagination" class="!mt-5" />
    </template>
  </Carousel>
</template>


