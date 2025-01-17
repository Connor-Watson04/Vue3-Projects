<script setup></script>

<template>
  <div class="loader">
    <div class="container">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<style>
/* Full-screen loader container */
.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25vh;
}

/* Inner container holding the dots */
.container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 9999px;
  display: flex;
  gap: 16px;
}

/* Individual dots */
.dot {
  width: 20px;
  height: 20px;
  background-color: #1f2937; /* Gray-800 */
  border-radius: 50%;
  animation: pulse 1s infinite ease-in-out;
}

/* Animating the dots with delays */
.dot:nth-child(1) {
  animation-delay: 0.1s;
}

.dot:nth-child(2) {
  animation-delay: 0.3s;
}

.dot:nth-child(3) {
  animation-delay: 0.6s;
}

/* Pulse animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}
</style>
