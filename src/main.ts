import { createApp } from "vue"
import { createVuetify } from "vuetify"
import { createI18n } from "vue-i18n"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import "@mdi/font/css/materialdesignicons.css"
import "vuetify/styles"
import App from "./App.vue"
import de from "./locales/de.json"
import en from "./locales/en.json"

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        colors: {
          primary: "#E53935",
          secondary: "#FF6F00",
          accent: "#FFC107",
          error: "#D32F2F",
          info: "#1976D2",
          success: "#388E3C",
          warning: "#F57C00"
        }
      }
    }
  }
})

const i18n = createI18n({
  legacy: false,
  locale: "de",
  fallbackLocale: "en",
  messages: { de, en }
})

createApp(App)
  .use(vuetify)
  .use(i18n)
  .mount("#app")

