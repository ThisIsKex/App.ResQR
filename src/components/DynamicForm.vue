<template>
  <div>
    <v-text-field
      v-if="model.actionType === 'phone' || model.actionType === 'sms'"
      v-model="model.phoneNumber"
      :label="t('fields.phoneNumber')"
      :rules="[required]"
      type="tel"
    />

    <v-textarea
      v-if="model.actionType === 'sms'"
      v-model="model.message"
      :label="t('fields.message')"
      rows="3"
    />

    <v-text-field
      v-if="model.actionType === 'email'"
      v-model="model.email"
      :label="t('fields.email')"
      :rules="[required, emailRule]"
      type="email"
    />

    <v-text-field
      v-if="model.actionType === 'email'"
      v-model="model.subject"
      :label="t('fields.subject')"
    />

    <v-textarea
      v-if="model.actionType === 'email'"
      v-model="model.emailBody"
      :label="t('fields.emailBody')"
      rows="3"
    />

    <v-text-field
      v-if="model.actionType === 'url'"
      v-model="model.url"
      :label="t('fields.url')"
      :rules="[required, urlRule]"
      type="url"
    />
  </div>
</template>

<script setup lang="ts">
import type { QRData } from "@/types";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const model = defineModel<QRData>({ required: true });

const required = (v: string) => !!v || t("validation.required");
const emailRule = (v: string) =>
  !v || /.+@.+\..+/.test(v) || t("validation.invalidEmail");
const urlRule = (v: string) =>
  !v || /^https?:\/\/.+/.test(v) || t("validation.invalidUrl");
</script>
