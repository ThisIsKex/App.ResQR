<template>
  <v-tabs v-model="model" bg-color="primary" grow>
    <v-tab value="phone">
      <v-icon start>mdi-phone</v-icon>
      {{ t("actionType.phone") }}
    </v-tab>
    <v-tab value="sms">
      <v-icon start>mdi-message-text</v-icon>
      {{ t("actionType.sms") }}
    </v-tab>
    <v-tab value="email">
      <v-icon start>mdi-email</v-icon>
      {{ t("actionType.email") }}
    </v-tab>
    <v-tab value="url">
      <v-icon start>mdi-web</v-icon>
      {{ t("actionType.url") }}
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
import type { ActionType } from "@/types";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const model = defineModel<ActionType>({ required: true });
</script>
