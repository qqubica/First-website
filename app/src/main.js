import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import i18n from './i18n'
import cors from 'cors'

loadFonts()

const app = createApp(App)

let userLoginBool = () => { return localStorage.getItem('user') != null}
let userData = () => { return localStorage.getItem('user') }

app.config.globalProperties.$checkLogin = userLoginBool
app.config.globalProperties.$loginData = userData

app.use(router)
    .use(vuetify)
    .use(i18n)
    .use(cors)

app.mount('#app')

export default {userData: userData, userLoginBool: userLoginBool}
