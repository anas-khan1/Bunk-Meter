<p align="center">
  <img src="Assests/logo.png" alt="Bunk Meter Logo" width="280" />
</p>

<h1 align="center">Bunk Meter</h1>

<p align="center">
  <strong>Track your attendance, plan your bunks, and stay on target.</strong><br/>
  A smart attendance calculator built for students who want to stay on top of their classes.
</p>

<p align="center">
  <a href="https://bunkmeter.netlify.app/">
    <img src="https://img.shields.io/badge/🌐_Live_Demo-Visit_Bunk_Meter-10b981?style=for-the-badge" alt="Live Demo" />
  </a>
</p>

---

## 📌 About

**Bunk Meter** is a free, no-signup attendance tracking tool designed specifically for college and university students. Enter your class data and instantly find out your current attendance percentage, how many classes you can safely skip, and whether you're at risk of falling below the required threshold — all without spreadsheets or manual math.

Your data never leaves your browser. No accounts, no servers, no tracking. Just open and use.

---

## ✨ Features

### Core Calculator
- **Multi-Subject Tracking** — Add unlimited subjects and track attendance for each one independently.
- **Real-Time Calculations** — Results update instantly as you type. No submit buttons needed.
- **Smart Insights** — See current attendance %, max possible %, classes missed, classes remaining, and how many you can still bunk.
- **Desired Attendance Target** — Set your target percentage (e.g., 75%) and get personalized bunk/shortfall calculations.
- **Overall Summary Dashboard** — View combined stats across all subjects at a glance.

### PDF Report
- **Download Attendance Report** — Generate a clean, formatted PDF report with all your subject data using one click.
- **Professional Layout** — Includes overall summary, per-subject breakdown, and a branded footer.

### Drag & Drop Reorder
- **Hold to Drag** — Press and hold anywhere on a subject card (300ms) to enter drag mode, then reorder subjects by dragging.
- **Touch & Mouse Support** — Works on both desktop and mobile devices.

### Collapse / Expand
- **Tap to Collapse** — Click anywhere on a subject card (or the ☰ button) to collapse it into a compact preview showing the subject name and current attendance.
- **Quick Overview** — Collapsed cards show a one-line summary so you can scan all subjects at a glance.

### Theme Toggle
- **Dark & Light Mode** — Switch between a dark (teal accent on charcoal) and light (emerald accent on white) theme.
- **Persistent Preference** — Your theme choice is saved to `localStorage` and applied instantly on every page load — no white flash.

### Multi-Page Website
- **8 Fully Styled Pages** — Home, About, Contact, How It Works, FAQ, Support, Privacy Policy, and Terms of Service.
- **Consistent Design** — All pages share the same header, footer, theme system, and responsive layout.
- **Contact Form** — Reach out directly from the contact page.

### Responsive Design
- **Mobile-First** — Fully responsive with breakpoints at 900px, 680px, 480px, and 400px.
- **Touch Optimized** — Cards, buttons, and inputs are sized for comfortable touch interaction.

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **HTML5** | Semantic structure & multi-page architecture |
| **CSS3** | Custom properties (CSS variables) for theming, grid/flexbox layouts, responsive media queries |
| **Vanilla JavaScript** | All logic — calculations, DOM manipulation, drag-and-drop, theme toggle, PDF generation |
| **jsPDF** | Client-side PDF report generation (CDN v2.5.1) |
| **Google Fonts** | Space Grotesk (body) + Newsreader (logo/serif accents) |

No frameworks. No build tools. No dependencies to install. Just open `index.html` in a browser.

---

## 📁 Project Structure

```
Bunk Meter/
├── index.html            # Main attendance calculator page
├── about.html            # About the project
├── contact.html          # Contact form page
├── how-it-works.html     # Step-by-step usage guide
├── faq.html              # Frequently asked questions
├── support.html          # Support & help page
├── privacy.html          # Privacy policy
├── terms.html            # Terms of service
├── styles.css            # All styles (themes, responsive, components)
├── script.js             # All JavaScript logic
├── Assests/
│   └── logo.png          # Bunk Meter logo
└── README.md
```

---

## 🚀 Getting Started

### Option 1: Live Demo
Visit the live site: **[bunkmeter.netlify.app](https://bunkmeter.netlify.app/)**

### Option 2: Run Locally
```bash
# Clone the repository
git clone https://github.com/anas-khan1/Bunk-Meter.git

# Open the project
cd Bunk-Meter

# Open index.html in your browser
# No build step or server required
start index.html        # Windows
open index.html         # macOS
xdg-open index.html     # Linux
```

---

## 📖 How It Works

1. **Add a Subject** — Click "+ Add Subject" to create a new subject card.
2. **Enter Your Data** — Fill in classes happened, classes attended, total semester classes, and your desired attendance %.
3. **View Results** — The card instantly shows your current %, max possible %, classes missed, classes remaining, and how many you can still bunk.
4. **Track Multiple Subjects** — Add as many subjects as you need. The Overall Summary at the top aggregates all data.
5. **Download Report** — Click "Download Report" to save a PDF with all your attendance data.
6. **Reorder** — Hold a card for 300ms to drag and rearrange the order.
7. **Collapse** — Tap a card to collapse it and see a quick summary.

---

## 🎨 Theming

Bunk Meter supports **Dark** and **Light** themes with a smooth toggle.

| | Dark Theme | Light Theme |
|---|---|---|
| Background | `#0f1117` | `#f5f6f8` |
| Surface | `#181a20` | `#ffffff` |
| Accent | `#34d399` (Teal) | `#10b981` (Emerald) |
| Text | `#e2e4e9` | `#1a1c23` |

Theme is persisted in `localStorage` under the key `bm-theme` and applied before CSS loads to prevent any flash of unstyled content.

---

## 📱 Responsive Breakpoints

| Breakpoint | Target |
|---|---|
| `> 900px` | Desktop — full grid layout |
| `≤ 900px` | Tablet — stacked layout begins |
| `≤ 680px` | Small tablet — compact footer grid |
| `≤ 480px` | Mobile — single column, smaller fonts |
| `≤ 400px` | Small mobile — minimal spacing |

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Bunk Meter:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📬 Contact

- **Email**: [contactanas56@gmail.com](mailto:contactanas56@gmail.com)
- **GitHub**: [Bunk-Meter](https://github.com/anas-khan1/Bunk-Meter)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/anas-khan1">Anas Khan</a>
</p>
