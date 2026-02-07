# ⛑️ ResQR - Emergency QR Code Generator

> Emergency contact information accessible via QR code - because every second counts

![Vue.js](https://img.shields.io/badge/Vue.js-3.5-4FC08D?logo=vue.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Vuetify](https://img.shields.io/badge/Vuetify-3.11-1867C0?logo=vuetify&logoColor=white)
![License](https://img.shields.io/badge/license-ISC-blue)

A privacy-first, client-side web application for generating emergency QR codes that can trigger phone calls, SMS messages, emails, or open URLs. Perfect for medical alerts, emergency contacts, or quick access information.

## ✨ Features

- 📞 **Phone Calls** - Direct dial numbers with a single scan
- 💬 **SMS Messages** - Pre-filled text messages
- ✉️ **Emails** - Quick email composition with subject lines
- 🌐 **URLs** - Instant website access
- 🖨️ **Print Layouts** - Print 1, 2, 4, or 6 QR codes per A4 page
- 📥 **Export Options** - Download as PNG or SVG
- 🔒 **100% Privacy** - No server, no data storage, no tracking
- 🌍 **Multilingual** - English and German (Deutsch) support
- 📴 **Offline Ready** - Works completely offline after initial load
- 🎨 **Customizable** - Add titles and hint texts to your QR codes

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/ThisIsKex/App.ResQR.git
cd App.ResQR

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📖 Usage

1. **Select Action Type**: Choose between Phone, SMS, Email, or URL
2. **Fill Required Fields**: Enter the necessary information (phone number, email, etc.)
3. **Add Details (Optional)**: Include a title and hint text for the printed version
4. **Configure QR Code**: Select size (Small, Medium, Large)
5. **Preview**: See your QR code in real-time
6. **Export or Print**: Download as PNG/SVG or print directly

### QR Code Formats

| Type  | Format                             | Example                                 |
| ----- | ---------------------------------- | --------------------------------------- |
| Phone | `tel:+[number]`                    | `tel:+491701234567`                     |
| SMS   | `sms:+[number]?body=[text]`        | `sms:+491701234567?body=Emergency`      |
| Email | `mailto:[email]?subject=[subject]` | `mailto:help@example.com?subject=Alert` |
| URL   | `https://[url]`                    | `https://example.com/emergency`         |

## 🛠️ Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) with Composition API
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **UI Framework**: [Vuetify 3](https://vuetifyjs.com/)
- **QR Code Generation**: [qrcode](https://github.com/soldair/node-qrcode)
- **Internationalization**: [Vue I18n](https://vue-i18n.intlify.dev/)
- **Icons**: [Material Design Icons](https://materialdesignicons.com/)

## 🏗️ Project Structure

```
App.ResQR/
├── src/
│   ├── components/
│   │   ├── ActionTypeSelector.vue   # Action type selection (Phone/SMS/Email/URL)
│   │   ├── DynamicForm.vue          # Form fields based on action type
│   │   ├── QRGenerator.vue          # Main generator component
│   │   ├── QRPreview.vue            # Live QR code preview
│   │   └── PrintLayout.vue          # Print-optimized layout
│   ├── composables/
│   │   └── useQRCode.ts             # QR code generation logic
│   ├── locales/
│   │   ├── en.json                  # English translations
│   │   └── de.json                  # German translations
│   ├── types/
│   │   └── index.ts                 # TypeScript type definitions
│   ├── App.vue                      # Root component
│   └── main.ts                      # Application entry point
├── public/                          # Static assets
└── index.html                       # HTML template
```

## 🔧 Development

### Available Scripts

```bash
# Start development server with hot reload
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

### Building for Production

```bash
npm run build
```

The optimized production files will be generated in the `dist/` directory.

### Deployment

The application is a static site and can be deployed to any static hosting service:

- [GitHub Pages](https://pages.github.com/)
- [Netlify](https://www.netlify.com/)
- [Vercel](https://vercel.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

Simply upload the contents of the `dist/` folder after building.

## 🔐 Privacy & Security

- **No Backend**: All QR code generation happens in your browser
- **No Data Collection**: Zero analytics, tracking, or data storage
- **Offline Capable**: Works without internet after initial load
- **Client-Side Only**: Your data never leaves your device

## 🌍 Internationalization

The app supports multiple languages. To add a new language:

1. Create a new JSON file in `src/locales/` (e.g., `fr.json`)
2. Copy the structure from `en.json` or `de.json`
3. Add the new locale to the i18n configuration in `src/main.ts`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues

Found a bug or have a suggestion? Please create an issue on [GitHub Issues](https://github.com/ThisIsKex/App.ResQR/issues).

## 👤 Author

**ThisIsKex**

- GitHub: [@ThisIsKex](https://github.com/ThisIsKex)

## 🙏 Acknowledgments

- Icons from [Material Design Icons](https://materialdesignicons.com/)
- Built with [Vue.js](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/)
- QR code generation powered by [node-qrcode](https://github.com/soldair/node-qrcode)

---

**Made with ❤️ for emergency preparedness**
