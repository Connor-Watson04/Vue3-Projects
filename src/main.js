import './assets/main.css'
import Toast, { POSITION, TYPE } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const options = {
  toastDefaults: {
    [TYPE.ERROR]: {
      timeout: 10000,
      hideProgressBar: true,
      position: POSITION.BOTTOM_RIGHT
    },
    [TYPE.SUCCESS]: {
      timeout: 2000,
      hideProgressBar: false,
      position: POSITION.BOTTOM_RIGHT
    },
    [TYPE.INFO]: {
      timeout: 2000,
      hideProgressBar: false,
      position: POSITION.BOTTOM_RIGHT
    },
    [TYPE.WARNING]: {
      timeout: 3000,
      hideProgressBar: true,
      position: POSITION.BOTTOM_RIGHT
    }
  }
}

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(Toast, options)
app.mount('#app')
