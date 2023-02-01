import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import i18n from './i18n'
import cors from 'cors'

loadFonts()

createApp(App)
    .use(router)
    .use(vuetify)
    .use(i18n)
    .use(cors)
    .mount('#app')