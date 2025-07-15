<template>
  <footer class="!mt-[2rem] bg-[var(--color-promo)] py-1  w-[100vw] overflow-hidden">
    <span>
      <div class="flex items-center justify-center !mb-4 px-[1rem]">
        <Image class="h-[100px]" imageSrc="/src/assets/Images/Logo/S-I-S Logo.png" imageAlt="footer logo" />
      </div>
      <div class="flex flex-col gap-[2rem] select-none px-[1rem]">
        <div class="!mb-4">
          <Text class="!text-[#ebebeb] !text-sm w-full md:text-center md:px-[10%]">
            Apologies as we currently do not have a physical location for you to reach out to us.
            However we have our social media and content platforms where we may be reachable.
          </Text>
        </div>
      </div>
      <FooterDesktop v-if="!isMobile" />
      <FooterMobile v-if="isMobile"/>
      <div class="text-white flex gap-[10px] !my-[20px] md:!mt-[30px] items-center justify-center">
        <p class="select-none">&copy; 2026 S-I-S SQUAD</p>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <YoutubeIcon class="w-[24px] cursor-pointer"/>
        </a>
        <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer">
          <TwitchIcon class="w-[24px]"/>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <InstagramIcon class="w-[24px]"/>
        </a>
      </div>
    </span>
  </footer>
</template>
<script setup>
import FooterDesktop from './FooterViews/footerDesktop.vue';
import FooterMobile from './FooterViews/footerMobile.vue';
import Text from './Text.vue';
import InstagramIcon from './icons/instagramIcon.vue';
import TwitchIcon from './icons/twitchIcon.vue';
import YoutubeIcon from './icons/youtubeIcon.vue';
import { useIsMobile } from '@/composables/useMobile';
import Image from './Image.vue';

const {isMobile} = useIsMobile()

</script>
