<template>
  <div class="print-layout">
    <div class="qr-item">
      <canvas ref="canvasRef" />
      <div v-if="qrData.title" class="qr-title">{{ qrData.title }}</div>
      <div v-if="qrData.hint" class="qr-hint">{{ qrData.hint }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useQRCode } from "@/composables/useQRCode";
import { onMounted, ref } from "vue";

const { qrData, generateQRCode } = useQRCode();
const canvasRef = ref<HTMLCanvasElement>();

onMounted(async () => {
  if (canvasRef.value) {
    await generateQRCode(canvasRef.value);
  }
});
</script>

<style scoped>
.print-layout {
  display: none;
}

@media print {
  .print-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .qr-item {
    text-align: center;
    page-break-inside: avoid;
  }

  .qr-title {
    font-size: 18px;
    font-weight: bold;
    margin-top: 16px;
  }

  .qr-hint {
    font-size: 14px;
    color: #666;
    margin-top: 8px;
  }

  canvas {
    width: 5cm !important;
    height: 5cm !important;
  }
}
</style>
