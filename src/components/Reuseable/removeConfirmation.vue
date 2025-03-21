<template>
    <section
      v-if="visible"
      :class="['logOutConfirm', mode === 'inline' ? 'inlineConfirm' : 'fullscreenConfirm']"
      @click.self="emitClose"
    >
      <div :class="['logOutForm', mode === 'inline' ? 'inlineForm' : 'fullscreenForm']">
        <p>{{ message }}</p>
        <div class="confirmationButtons">
          <button class="logOutFormButton" @click="emitClose">No</button>
          <button class="logOutFormButton yesButton" @click="emitConfirm">Yes</button>
        </div>
      </div>
    </section>
  </template>
  
  
  
  <script setup>
  import { defineProps, defineEmits, watch } from 'vue'
  
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
  

  <style>
.logOutConfirm {
  display: flex;
  justify-content: center;
  align-items: center;
}


.fullscreenConfirm{
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 999;
  top: 0px;
  position: absolute;
}

.inlineConfirm{
    height: 100%;
    width: 100%;
    position: absolute;
    display: block;
}



/* Shared styles for both modes */
.logOutForm {
    background-color: white;
  color: black;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Fullscreen version (Account page) */
.fullscreenForm {  width: 30%;
  min-width: 250px;
  height: 20%;
  position: relative;
  bottom: 100px;
}

/* Inline version (Basket tray) */
.inlineForm {
height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1000;
  border-radius: 0;
}


.confirmationButtons {
  margin-top: 10px;
  display: flex;
  gap: 15px;
}

.logOutFormButton {
  border-radius: 10px;
  padding: 5px 25px;
}

.yesButton {
  background-color: rgba(249, 45, 45, 0.858);
}

</style>