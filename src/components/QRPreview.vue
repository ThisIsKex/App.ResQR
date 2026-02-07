<template>
  <div class="text-center qr-preview">
    <canvas ref="canvasRef" class="qr-canvas" />
    <div v-if="qrData.title" class="qr-title mt-3">{{ qrData.title }}</div>
    <div v-if="qrData.hint" class="qr-hint mt-2">{{ qrData.hint }}</div>
  </div>
</template>

<script setup lang="ts">
import { useQRCode } from "@/composables/useQRCode";
import { onMounted, ref, watch } from "vue";

const { qrData, qrContent, generateQRCode } = useQRCode();
const canvasRef = ref<HTMLCanvasElement>();

const updateQR = async () => {
  if (canvasRef.value) {
    await generateQRCode(canvasRef.value);
  }
};

watch(qrContent, updateQR);
onMounted(updateQR);
</script>

<style scoped>
.qr-preview {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.qr-canvas {
  max-width: 100%;
  height: auto;
  border: 2px solid #e53935;
  border-radius: 12px;
  padding: 16px;
  background: white;
  box-shadow: 0 4px 12px rgba(229, 57, 53, 0.15);
  transition: transform 0.3s ease;
}

.qr-canvas:hover {
  transform: scale(1.02);
}

.qr-title {
  font-size: 18px;
  font-weight: bold;
  color: #e53935;
}

.qr-hint {
  font-size: 14px;
  color: #666;
}

@media print {
  .qr-canvas {
    width: 5cm !important;
    height: 5cm !important;
    border: none;
    box-shadow: none;
  }
}
</style>
