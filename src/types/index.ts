export type ActionType = "phone" | "sms" | "email" | "url";

export interface QRData {
  actionType: ActionType;
  phoneNumber?: string;
  message?: string;
  email?: string;
  subject?: string;
  emailBody?: string;
  url?: string;
  title?: string;
  hint?: string;
}

export type QRSize = "S" | "M" | "L";
export type PrintCount = 1 | 2 | 4 | 6;
