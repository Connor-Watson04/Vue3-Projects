<template>
  <section class="h-full">
    <div class="relative flex flex-col gap-5 justify-center items-center h-full">
      <h1 class="text-center sm:text-2xl text-[var(--color-dubby)] !font-bold text-shadow-md z-10">
        DUBBY Products
      </h1>
      <Image class="mxa-h-[500px] lg:place-self-center" imageSrc="/src/assets/Images/promos/promo.png" image-alt="Promotional Image"/>
      <div class="text-center mt-4">
        <a
          class="relative text-[var(--color-dubby)] bg-[var(--color-promo)] px-6 py-4 rounded-lg inline-block transition-transform duration-150 hover:-translate-y-[1px] hover:bg-gray-700 active:translate-y-[2px] active:bg-gray-900"
          target="_blank"
          href="https://www.dubby.gg/discount/MidN1ght?ref=spB4fv3CyQJAij"
        >
          Shop Now!
        </a>
      </div>
    </div>
  </section>
</template>


<script setup>
import Image from '@/components/Reuseable/Image.vue';
</script>

