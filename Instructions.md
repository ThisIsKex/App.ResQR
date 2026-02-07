# ⛑️ ResQR - Notfall-QR-Generator

## 🎯 Ziel

Ein rein clientseitiges Web-Tool, mit dem Nutzer einen Notfall-QR-Code erzeugen, anpassen und ausdrucken können.

**Unterstützte Aktionen:**
- 📞 Telefon
- 💬 SMS
- ✉️ E-Mail
- 🌐 URL

**Prinzipien:**
- Keine Server, keine Speicherung, keine Benutzerkonten
- 100% Privacy-First
- Offline-fähig nach erstem Laden

---

## 🧱 Funktionsumfang

### 1. Frontend Stack

- **Framework:** Vue 3 + TypeScript
- **Build Tool:** Vite
- **UI Library:** Vuetify 3
- **QR-Code:** `qrcode` oder `qrcode.vue`
- **i18n:** Vue I18n (Deutsch + Englisch)

### 2. UI - Eingabemaske

#### Aktionstyp (Radio Buttons)
- 📞 Telefon
- 💬 SMS
- ✉️ E-Mail
- 🌐 URL

#### Dynamische Felder

| Typ     | Felder                                            |
| ------- | ------------------------------------------------- |
| Telefon | Telefonnummer (Pflichtfeld)                       |
| SMS     | Telefonnummer (Pflichtfeld), Nachricht (optional) |
| E-Mail  | E-Mail (Pflichtfeld), Betreff (optional)          |
| URL     | URL (Pflichtfeld)                                 |

#### Zusätzliche Felder (für alle Typen)
- **Titel/Label** (optional) - Wird im Drucklayout angezeigt
- **Hinweistext** (optional, max. 80 Zeichen) - Wird im Drucklayout angezeigt

#### QR-Code Einstellungen
- **Größe:** Klein / Mittel / Groß (S/M/L)
- **Error Correction:** Medium (Standard)

### 3. QR-Code Vorschau

- Live-Vorschau des generierten QR-Codes
- Aktualisiert sich bei jeder Eingabe
- Zeigt Größe entsprechend der Auswahl

### 4. QR-Code Datenformat

| Typ     | QR-Inhalt                                 |
| ------- | ----------------------------------------- |
| Telefon | `tel:+491701234567`                       |
| SMS     | `sms:+491701234567?body=Notfallnachricht` |
| E-Mail  | `mailto:max@example.de?subject=Notfall`   |
| URL     | `https://example.com`                     |

**Hinweis:** Titel und Hinweistext erscheinen nur im Drucklayout, nicht im QR-Code selbst.

### 5. Export-Optionen

#### Download
- **PNG** - Für digitale Verwendung
- **SVG** - Für Vektorgrafik/Druck

#### Drucken
- Button "Drucken"
- Eigene Print-Styles (@media print)
- **Anzahl pro Seite:** 1 / 2 / 4 / 6 QR-Codes
- Optimiert für A4
- QR-Code Größe: 3-5 cm (abhängig von Einstellung)
- Schwarz-Weiß optimiert
- Zeigt Titel und Hinweistext unter jedem Code

### 6. QR-Code Generierung

- Vollständig im Browser
- Keine API-Calls
- Library: `qrcode` oder `qrcode.vue`
- Error Correction Level: M (Medium, 15% Wiederherstellung)

### 7. Offlinefähigkeit

- App funktioniert vollständig nach erstem Laden offline
- Service Worker (optional, für PWA)

---

## ☁️ Deployment

### Infrastruktur

- **Hosting:** AWS S3 (Static Website)
- **CDN:** AWS CloudFront
- **IaC:** Terraform
- **SSL:** ACM-Zertifikat (HTTPS)
- **DNS:** Route53 (optional)

### Architektur

```
User → CloudFront → S3 (statische Vue-App)
```

### Terraform-Komponenten

- S3 Bucket (private, kein public access)
- CloudFront Distribution
  - Origin Access Control (OAC)
  - Cache-Behavior für SPA
  - HTTPS-only
- ACM-Zertifikat
- Route53 DNS Record (optional)

### CI/CD (optional)

1. `npm run build`
2. Upload `dist/` nach S3
3. CloudFront Cache Invalidation
4. `terraform apply`

---

## 🛡️ Datenschutz & Sicherheit

- ✅ 100% clientseitig - keine Daten verlassen den Browser
- ✅ Keine personenbezogenen Daten werden gespeichert
- ✅ Keine Cookies notwendig
- ✅ Keine Analytics/Tracking
- ✅ Open Source

---

## 🧪 Akzeptanzkriterien

### Funktional
- ✅ QR-Code wird korrekt generiert für alle 4 Aktionstypen
- ✅ Scan öffnet sofort die passende Aktion (Telefon-App, SMS, E-Mail, Browser)
- ✅ QR-Code bleibt bei 3×3 cm scannbar
- ✅ Download als PNG/SVG funktioniert
- ✅ Drucklayout zeigt 1-6 Codes pro Seite korrekt an

### Technisch
- ✅ Funktioniert auf iOS & Android
- ✅ Tool läuft komplett ohne Internet nach erstem Laden
- ✅ Responsive Design (Mobile + Desktop)
- ✅ Vuetify 3 Komponenten korrekt eingebunden

### UX
- ✅ Eingabevalidierung (Telefonnummer, E-Mail, URL)
- ✅ Live-Vorschau aktualisiert sich sofort
- ✅ Intuitive Bedienung
- ✅ i18n: Deutsch + Englisch

---

## 📦 Projektstruktur (Vorschlag)

```
App.ResQR/
├── src/
│   ├── components/
│   │   ├── QRGenerator.vue      # Hauptkomponente
│   │   ├── ActionTypeSelector.vue
│   │   ├── DynamicForm.vue
│   │   ├── QRPreview.vue
│   │   └── PrintLayout.vue
│   ├── composables/
│   │   └── useQRCode.ts         # QR-Code Logik
│   ├── locales/
│   │   ├── de.json
│   │   └── en.json
│   ├── types/
│   │   └── index.ts             # TypeScript Interfaces
│   ├── App.vue
│   └── main.ts
├── terraform/
│   ├── main.tf
│   ├── s3.tf
│   ├── cloudfront.tf
│   └── variables.tf
├── package.json
├── vite.config.ts
└── tsconfig.json
```
