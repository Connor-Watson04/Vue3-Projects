<template>
    <section
      v-if="visible"
      :class="['flex justify-center items-center', mode === 'inline' ? 'h-full w-full absolute block' : 'bg-black/50 w-full h-full z-999 top-0 absolute']"
      @click.self="emitClose"
    >
      <div :class="['bg-white text-black border-[1px] p-[20px] flex flex-col justify-center items-center shadow-lg', mode === 'inline' ? 'h-full w-full absolute z-1000 rounded-none' : 'w-[30%] h-[20%] min-w-[250px] relative bottom-[100px]']">
        <p>{{ message }}</p>
        <div class="!mt-[10px] flex gap-[15px]">
          <button class="rounded-[10px] py-[5px] px-[25px]" @click="emitClose">No</button>
          <button class="rounded-[10px] py-[5px] px-[25px] bg-red-600" @click="emitConfirm">Yes</button>
        </div>
      </div>
    </section>
</template>
    
<script setup>
  import { watch } from 'vue'
  
  const props = defineProps({
    visible: Boolean,
    mode: {
      type: String,
      default: 'fullscreen' // or 'inline'
    },
    message: {
      type: String,
      default: 'Are you sure?'
    }
  })
  
  const emit = defineEmits(['close', 'confirm'])
  
  const emitClose = () => {
    emit('close')
    document.body.style.overflow = ''
  }
  
  const emitConfirm = () => {
    emit('confirm')
    document.body.style.overflow = ''
  }
  
  watch(() => props.visible, (val) => {
    if (props.mode === 'fullscreen') {
      document.body.style.overflow = val ? 'hidden' : ''
    }
  })
</script>