<template>
  <v-card elevation="8" class="qr-card">
    <v-row>
      <v-col cols="12" md="6">
        <v-card-text>
          <ActionTypeSelector v-model="qrData.actionType" />
        </v-card-text>

        <v-card-text>
          <DynamicForm v-model="qrData" />
        </v-card-text>
      </v-col>

      <v-col cols="12" md="6">
        <v-card-text>
          <QRPreview />
        </v-card-text>
      </v-col>
    </v-row>

    <v-divider />

    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="qrData.title"
            :label="t('fields.title')"
            :rules="[maxLength(15)]"
            counter="15"
          />
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field
            v-model="qrData.hint"
            :label="t('fields.hint')"
            :rules="[maxLength(30)]"
            counter="30"
          />
        </v-col>

        <v-col cols="12" class="text-right">
          <v-btn @click="downloadPNG" variant="outlined" color="primary">
            <v-icon start>mdi-download</v-icon>
            {{ t("actions.downloadPNG") }}
          </v-btn>
          <v-btn
            @click="downloadSVG"
            variant="outlined"
            color="primary"
            class="ml-2"
          >
            <v-icon start>mdi-download</v-icon>
            {{ t("actions.downloadSVG") }}
          </v-btn>
          <v-btn @click="print" color="primary" class="ml-2">
            <v-icon start>mdi-printer</v-icon>
            {{ t("actions.print") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-dialog v-model="showPrintDialog" max-width="500" class="no-print">
    <v-card>
      <v-card-title>Druckeinstellungen</v-card-title>
      <v-card-text>
        <v-select
          v-model="printCount"
          :label="t('print.countPerPage')"
          :items="[
            { value: 4, title: t('print.qrCodes', { count: 4 }) },
            { value: 6, title: t('print.qrCodes', { count: 6 }) },
            { value: 8, title: t('print.qrCodes', { count: 8 }) },
            { value: 12, title: t('print.qrCodes', { count: 12 }) },
          ]"
          class="mb-4"
        />

        <v-alert type="info" variant="tonal" density="compact" class="mb-3">
          {{ t("print.tipTitle") }}
        </v-alert>

        <div class="text-body-2">
          {{ t("print.tipText") }}
          <ul class="ml-4 mt-2">
            <li>{{ t("print.tipHeaders") }}</li>
            <li>{{ t("print.tipBackgrounds") }}</li>
          </ul>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="showPrintDialog = false" variant="text">{{
          t("actions.cancel")
        }}</v-btn>
        <v-btn @click="confirmPrint" color="primary">{{
          t("actions.print")
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <div class="print-only">
    <div :class="`print-grid print-grid-${printCount}`">
      <div v-for="i in printCount" :key="i" class="print-item">
        <canvas
          :ref="
            (el) => {
              if (el) printCanvases[i - 1] = el as HTMLCanvasElement;
            }
          "
        />
        <div v-if="qrData.title" class="qr-title">{{ qrData.title }}</div>
        <div v-if="qrData.hint" class="qr-hint">{{ qrData.hint }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQRCode } from "@/composables/useQRCode";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import ActionTypeSelector from "./ActionTypeSelector.vue";
import DynamicForm from "./DynamicForm.vue";
import QRPreview from "./QRPreview.vue";

const { t } = useI18n();
const { qrData, generateQRCode, downloadPNG, downloadSVG } = useQRCode();
const showPrintDialog = ref(false);
const printCount = ref(6);
const printCanvases = ref<(HTMLCanvasElement | null)[]>([]);

const maxLength = (max: number) => (v: string) =>
  !v || v.length <= max || t("validation.maxLength", { max });

const print = () => {
  showPrintDialog.value = true;
};

const confirmPrint = async () => {
  showPrintDialog.value = false;

  // Warte kurz und generiere dann QR-Codes für Print
  setTimeout(async () => {
    for (const canvas of printCanvases.value) {
      if (canvas) {
        await generateQRCode(canvas as HTMLCanvasElement);
      }
    }
    setTimeout(() => window.print(), 100);
  }, 100);
};
</script>

<style scoped>
.qr-card {
  border-radius: 16px !important;
  overflow: hidden;
}

.print-only {
  display: none;
}

@media print {
  .no-print {
    display: none !important;
  }

  .print-only {
    display: block !important;
  }

  .print-grid {
    display: grid;
    gap: 0.8cm;
    padding: 0.5cm;
    width: 100%;
  }

  .print-grid-4 {
    grid-template-columns: 1fr 1fr;
  }

  .print-grid-6 {
    grid-template-columns: 1fr 1fr;
  }

  .print-grid-8 {
    grid-template-columns: 1fr 1fr;
  }

  .print-grid-12 {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .print-item {
    text-align: center;
    page-break-inside: avoid;
    padding: 0.3cm;
  }

  .print-item canvas {
    width: 4cm !important;
    height: 4cm !important;
  }

  .print-item .qr-title {
    font-size: 11px;
    font-weight: bold;
    margin-top: 4px;
  }

  .print-item .qr-hint {
    font-size: 9px;
    color: #666;
    margin-top: 2px;
  }
}
</style>
