import type { QRData } from "@/types";
import QRCode from "qrcode";
import { computed, ref } from "vue";

// Shared state
const qrData = ref<QRData>({
  actionType: "phone",
});

export function useQRCode() {
  const qrContent = computed(() => {
    const { actionType, phoneNumber, message, email, subject, emailBody, url } =
      qrData.value;

    switch (actionType) {
      case "phone":
        return phoneNumber ? `tel:${phoneNumber}` : "";
      case "sms":
        return phoneNumber
          ? `sms:${phoneNumber}${message ? `?body=${encodeURIComponent(message)}` : ""}`
          : "";
      case "email":
        if (!email) return "";
        const params = [];
        if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
        if (emailBody) params.push(`body=${encodeURIComponent(emailBody)}`);
        return `mailto:${email}${params.length ? `?${params.join("&")}` : ""}`;
      case "url":
        return url || "";
      default:
        return "";
    }
  });

  const generateQRCode = async (canvas: HTMLCanvasElement) => {
    const content = qrContent.value || "https://resqr.app";

    await QRCode.toCanvas(canvas, content, {
      width: 300,
      errorCorrectionLevel: "M",
      margin: 1,
    });
  };

  const downloadPNG = async () => {
    if (!qrContent.value) return;

    const url = await QRCode.toDataURL(qrContent.value, {
      width: 300,
      errorCorrectionLevel: "M",
    });

    const link = document.createElement("a");
    link.download = "resqr.png";
    link.href = url;
    link.click();
  };

  const downloadSVG = async () => {
    if (!qrContent.value) return;

    const svg = await QRCode.toString(qrContent.value, {
      type: "svg",
      errorCorrectionLevel: "M",
    });

    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "resqr.svg";
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  return {
    qrData,
    qrContent,
    generateQRCode,
    downloadPNG,
    downloadSVG,
  };
}
