// composables/useSliderNav.js
import { ref, onMounted, onUnmounted } from 'vue';

export function useSliderNav(slidePrefix = 'slide-') {
  const sliderRef = ref(null);
  const activeIndex = ref(0);

  let observer = null;

  const scrollToSlide = (index) => {
    const target = document.getElementById(`${slidePrefix}${index}`);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'start' });
      activeIndex.value = index;
    }
  };

  const observeSlides = (count) => {
    const slider = sliderRef.value?.$el || sliderRef.value;
    if (!slider) return;

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const index = parseInt(id.replace(slidePrefix, ''));
            if (!isNaN(index)) {
              activeIndex.value = index;
            }
            break;
          }
        }
      },
      {
        root: slider,
        threshold: 0.5,
      }
    );

    for (let i = 0; i < count; i++) {
      const el = document.getElementById(`${slidePrefix}${i}`);
      if (el) observer.observe(el);
    }
  };

  onUnmounted(() => {
    if (observer) observer.disconnect();
  });

  return {
    sliderRef,
    activeIndex,
    scrollToSlide,
    observeSlides
  };
}
