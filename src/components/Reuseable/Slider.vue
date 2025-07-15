<template>
    <div
      ref="slider"
      class="overflow-x-auto scroll-smooth no-scrollbar scroll-padding flex items-center gap-3 px-4 py-2 snap-x snap-mandatory cursor-grab active:cursor-grabbing"
      @mousedown="startDrag"
      @mousemove="onDrag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      @touchstart="startDrag"
      @touchmove="onDrag"
      @touchend="stopDrag"
    >
      <slot />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const slider = ref(null);
  let isDown = false;
  let startX;
  let scrollLeft;
  
  const startDrag = (e) => {
    isDown = true;
    startX = e.pageX || e.touches[0].pageX;
    scrollLeft = slider.value.scrollLeft;
  };
  
  const onDrag = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX;
    const walk = (x - startX) * 1.5; // adjust the scroll speed
    slider.value.scrollLeft = scrollLeft - walk;
  };
  
 const stopDrag = () => {
  isDown = false;

  const children = slider.value.children;
  const sliderScrollLeft = slider.value.scrollLeft;
  const containerWidth = slider.value.clientWidth;

  let closest = 0;
  let minDiff = Infinity;

  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    const childOffsetLeft = child.offsetLeft;
    const diff = Math.abs(childOffsetLeft - sliderScrollLeft);
    if (diff < minDiff) {
      minDiff = diff;
      closest = childOffsetLeft;
    }
  }

  // Snap to closest slide
  slider.value.scrollTo({ left: closest, behavior: 'smooth' });
};
  </script>
  
  <style scoped>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  </style>
  