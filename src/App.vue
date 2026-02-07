<template>
  <v-app>
    <v-app-bar color="primary" prominent class="gradient-header">
      <v-app-bar-title class="text-h4">
        ⛑️ {{ t('app.title') }}
      </v-app-bar-title>
      <v-spacer />
      <v-btn icon @click="toggleLocale" variant="text">
        <v-icon>mdi-translate</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main class="bg-pattern">
      <v-container>
        <QRGenerator />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n"
import QRGenerator from "./components/QRGenerator.vue"

const { t, locale } = useI18n()

const toggleLocale = () => {
  locale.value = locale.value === "de" ? "en" : "de"
}
</script>

<style>
.gradient-header {
  background: linear-gradient(135deg, #E53935 0%, #FF6F00 100%) !important;
}

.bg-pattern {
  background: linear-gradient(135deg, #FFF3E0 0%, #FFEBEE 100%);
  min-height: 100vh;
}

@media print {
  .v-app-bar,
  .v-tabs,
  .v-btn,
  .v-text-field,
  .v-textarea,
  .v-select,
  .v-divider,
  .v-card,
  .v-container > *:not(.print-only) {
    display: none !important;
  }
  
  .v-main {
    padding: 0 !important;
  }
  
  .v-container {
    max-width: 100% !important;
    padding: 0 !important;
  }
  
  .bg-pattern {
    background: white !important;
  }
}
</style>
