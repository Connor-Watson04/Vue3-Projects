<template>
  <footer class="!mt-[2rem] bg-[var(--color-promo)] py-[2rem] px-[1rem] w-[100vw]">
    <span>
      <div class="flex items-center justify-between gap-[25rem]">
        <img class="h-[100px]" src="/src/assets/Images/Logo/S-I-S Logo.png" alt="footer logo" />
        <span class="flex flex-row w-full gap-[12rem]">
          <h1 class="w-1/2 text-center text-lg underline">Informational Pages</h1>
          <h1 class="w-1/2 text-lg text-center underline">Our Links</h1>
        </span>
      </div>
      <div class="flex gap-[5rem] select-none">
        <div>
          <p class="text-[#ebebeb] w-[40vw]">
            Apologies as we currently do not have a physical location for you to reach out to us.
            However we have our social media and content platforms where we may be reachable.
          </p>
        </div>
        <div class="w-full">
       
          <div class="grid grid-cols-2 text-[#4f8cff] w-full">
            <a class="hover:-translate-y-[2px] hover:text-base active:text-[#3434dd] active:translte-y-[2px] h-[30px]" href="#">About Us</a>
            <a class="hover:-translate-y-[2px] hover:text-base active:text-[#3434dd] active:translte-y-[2px] h-[30px]" href="#">FAQs</a>
            <a class="hover:-translate-y-[2px] hover:text-base active:text-[#3434dd] active:translte-y-[2px] h-[30px]" href="#">Contact Us</a>
            <a class="hover:-translate-y-[2px] hover:text-base active:text-[#3434dd] active:translte-y-[2px] h-[30px]" href="#">Terms & Service</a>
            <a class="hover:-translate-y-[2px] hover:text-base active:text-[#3434dd] active:translte-y-[2px] h-[30px]" href="#">Privacy Policy</a>
          </div>
        </div>
       
          <div class="flex flex-col gap-[1rem] w-1/3 text-[#4f8cff]">
            <a class="hover:-translate-y-[2px] hover:text-base active:text-[#3434dd] active:translte-y-[2px] h-[20px]" href="#">N1ghtW0lf04</a>
            <a class="hover:-translate-y-[2px] hover:text-base active:text-[#3434dd] active:translte-y-[2px] h-[20px]" href="https://beacons.ai/ferralwolf2003">FerralWolf2003</a>
            <a class="hover:-translate-y-[2px] hover:text-base active:text-[#3434dd] active:translte-y-[2px] h-[20px]" href="#">ibedrippinYT</a>
          </div>
        </div>
   
      <div class="text-white flex gap-[10px]">
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
import InstagramIcon from './icons/instagramIcon.vue';
import TwitchIcon from './icons/twitchIcon.vue';
import YoutubeIcon from './icons/youtubeIcon.vue';

</script>
