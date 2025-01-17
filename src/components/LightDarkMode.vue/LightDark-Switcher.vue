<template>
  <div class="theme-switch-wrapper">
    <span id="toggle-icon">
      <span class="toggle-text"></span>
      <i class="fas fa-sun"></i>
    </span>
    <label class="theme-switch">
      <input type="checkbox" />
      <div class="slider round"></div>
    </label>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const toggleSwitch = document.querySelector('input[type=checkbox]')
  const nav = document.getElementById('nav')
  const toggleIcon = document.getElementById('toggle-icon')
  const body = document.querySelector('body')

  if (!toggleSwitch || !nav || !toggleIcon || !body) {
    console.error('One or more elements not found in the DOM.')
    return
  }

  function toggleDarkLightMode(isLight) {
    console.log('Toggling Dark/Light Mode:', isLight)
    nav.style.backgroundColor = isLight ? 'rgb(225 225 225 / 50%)' : 'rgb(0 0 0 / 50%)'

    body.style.backgroundColor = isLight ? 'rgb(225 225 225 / 50%)' : '#d3d2d0'
  }

  function switchTheme(event) {
    if (event.target.checked) {
      console.log('Switching to dark theme')
      document.documentElement.setAttribute('data-theme', 'dark')
      localStorage.setItem('theme', 'dark')
      toggleDarkLightMode(false)
    } else {
      console.log('Switching to light theme')
      document.documentElement.setAttribute('data-theme', 'light')
      localStorage.setItem('theme', 'light')
      toggleDarkLightMode(true)
    }
  }

  toggleSwitch.addEventListener('change', switchTheme)

  const currentTheme = localStorage.getItem('theme')
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme)
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true
      toggleDarkLightMode(false)
    } else {
      toggleSwitch.checked = false
      toggleDarkLightMode(true)
    }
  }
})
</script>

<style>
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto';
  scroll-behavior: smooth;
  overflow-x: hidden;
}

.banner {
  height: 120px;
  background-color: var(--primary-color);
  padding-left: 2rem;
  box-shadow: 0 5px 12px rgba(0, 0, 0, 0.4);
  margin-bottom: 4.6rem;
}
.Banner-logo {
  width: 215px;
}

#nav {
  display: flex;
  gap: 2rem;
}

.navigation {
  display: grid;
  grid-template-columns: 250px 450px 550px;
  align-items: center;
  gap: 4rem;
}

.search {
  width: 500px;
  padding: 1rem 0.8rem 1rem 2rem;
  border-radius: 50px;
  justify-self: center;
  border: none;
  font-size: 16px;
}
.Logo {
  height: 100px;
  cursor: pointer;
}
.tabs {
  display: flex;
  gap: 2rem;
  justify-self: center;
}
.Search-bar,
.form {
  width: 615px;
}
.navigation-link {
  text-align: center;
  cursor: pointer;
  text-decoration: none;
  color: rgb(255, 215, 215);
  background-color: var(--nav-Link);
  padding: 0.8rem 1.2rem;
  border: 1.5px solid rgba(0, 0, 0, 0.4);
  border-radius: 50px;
  font-size: 16px;
}

.basket-icon {
  height: 15px;
}

.footer {
  background-color: rgb(57, 56, 57);
  padding: 3rem;
}
.footer-logo {
  height: 100px;
}
.apologies {
  color: #ebebeb;
  width: 400px;
}
.Our-links {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
.footer-grid {
  display: grid;
  grid-template-columns: 450px 400px 300px;
  gap: 7rem;
  user-select: none;
}
.Details {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.social-links,
.Detail-links {
  cursor: pointer;
  color: #4f8cff;
  height: 20px;
  width: 150px;
  text-decoration: none;
}

.social-links:hover,
.Detail-links:hover {
  color: #9595ff;
  transform: translateY(-2px);
  font-size: 17px;
}

.social-links:active,
.Detail-links:active {
  color: #3434dd;
  transform: translateY(2px);
  font-size: 14px;
}

.footer-social-icons {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  color: #fff;
}

.copyright {
  user-select: none;
  font-size: 14px;
}

.footer-icon {
  color: #d8d8d8;
  cursor: pointer;
}
.yt:hover,
.yt:active {
  color: #ff0000;
}
.twitch:hover,
.twitch:active {
  color: #6705d8;
}
.fb:hover,
.fb:active {
  color: #356ee9;
}
.twitter:hover,
.twitter:active {
  color: #00e1ff;
}
.insta:hover,
.insta:active {
  color: #cd06ff;
}

.Account-open {
  visibility: visible;
}

.Account-tab {
  display: flex;
  height: 110px;
  width: 240px;
  position: absolute;
  z-index: 5;
  right: 10px;
  top: 10px;
  background-color: #fff;
  visibility: hidden;
}
.account-buttons {
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 240px;
}
.account-tab-btn {
  background-color: #fff;
  border: none;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
}
.sign-up {
  color: #cf0d0d;
}

.account-tab-btn:nth-child(2) {
  padding: 5px 0 5px 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.37);
}

#close {
  cursor: pointer;
  height: 30px;
  width: 30px;
}
.account-tab-btn:hover,
.account-tab-btn:active {
  background-color: #ececec;
}

/* Dark Mode Toggle */
.theme-switch-wrapper {
  display: flex;
  align-items: center;
  z-index: 4;
  position: absolute;
  right: 25px;
  top: 75px;
}

.theme-switch-wrapper span {
  margin-right: 5px;
  font-size: 12px;
}
.toggle-text {
  position: relative;
  top: -2px;
  right: 5px;
  color: var(--on-background);
}

.theme-switch {
  display: inline-block;
  height: 34px;
  position: relative;
  width: 60px;
}

.theme-switch input {
  display: none;
}

.slider {
  background: var(--nav-Link);
  bottom: 0;
  cursor: pointer;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: 0.4s;
}

.slider::before {
  background: #fff;
  bottom: 4px;
  content: '';
  height: 26px;
  left: 4px;
  position: absolute;
  transition: 0.4s;
  width: 26px;
}

input:checked + .slider {
  background: var(--nav-Link);
}

input:checked + .slider::before {
  transform: translateX(26px);
}

.slider.round {
  border-radius: 34px;
}

.slider.round::before {
  border-radius: 50%;
}

.fas {
  font-size: 20px;
  margin-right: 5px;
  color: var(--on-background-alt);
}
</style>
