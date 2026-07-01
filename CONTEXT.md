# BAT-SA Website — Context Complet pentru Claude Code

Dă acest fișier lui Claude Code la începutul oricărei conversații noi despre acest proiect.

---

## Ce este proiectul

Site de prezentare pentru **BAT (Building Automation Transmission) — Btg SA**, o companie din Luxembourg specializată în sisteme de automatizare a clădirilor.

**Site original (vechi):** https://bat-sa.com  
**Date contact:** Esplanade Street 50 L - 9227 Diekirch 20, Luxembourg | info@bat-sa.com | +32 476 424 372

---

## Stack tehnic

- **React + Vite** (nu Next.js)
- **Tailwind CSS** cu culori custom definite în `tailwind.config.js`
- **Framer Motion** pentru animații scroll
- **React Router v6** pentru routing
- **Fișiere traduceri JSON** în `src/locales/en.json`, `fr.json`, `ro.json`

---

## Structura proiectului

```
src/
├── pages/
│   ├── Home.jsx           ← Hero, Pillars, Industries, Ecosystem, FreeDOM teaser, CTA
│   ├── About.jsx
│   ├── Products.jsx       ← grid cu filtru categorie + search
│   ├── ProductDetail.jsx  ← tabs: Description / Characteristics / Wiring
│   ├── Freedom.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── components/
│   ├── Navbar.jsx         ← sticky, transparent pe dark hero, alb la scroll
│   ├── Footer.jsx         ← dark bat-navy background
│   ├── ProductCard.jsx
│   ├── AnimatedSection.jsx
│   └── PhoneMockup.jsx    ← suportă variant="iphone" și variant="samsung"
├── context/
│   └── LanguageContext.jsx  ← useLanguage() hook, t('cheie') pentru traduceri
├── locales/
│   ├── en.json            ← TOATE cheile de traducere în engleză
│   ├── fr.json
│   └── ro.json
└── data/
    └── products.js        ← 33 produse COMPLET populate (description, characteristics, wiring)

public/
└── images/
    ├── products/          ← {product_key}.webp pentru fiecare produs (34 fișiere)
    └── home/              ← home_app_1_en.webp ... home_app_5_en.webp
```

---

## Culori Tailwind (din tailwind.config.js)

```js
bat: {
  navy:      '#1a2744',   // fundal dark principal, text pe alb
  navyLight: '#23355c',
  teal:      '#0f3460',
  tealLight: '#185296',
  gold:      '#f59e0b',   // accent warm, CTA secundar
  goldLight: '#fbbf24',
  blue:      '#3b82f6',   // accent principal, kicker-uri, CTA primar
}
```

**Regulă de design:** Fondul paginilor este alb (`bg-white`) sau very light gray (`bg-[#f8fafc]`). `bat-navy` pentru secțiuni dark, `bat-blue` pentru accent/CTA, `bat-gold` pentru highlights secundare.

---

## Clase CSS custom (din src/index.css)

```css
.kicker          /* text-xs font-bold tracking-[0.2em] uppercase text-bat-blue mb-4 */
.kicker-light    /* același dar text-bat-gold — pentru secțiuni dark */
.section-title   /* text-4xl md:text-5xl font-black text-bat-navy tracking-tight */
.section-title-light  /* același dar text-white */
.card            /* bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg */
.bg-grid-pattern /* subtle grid background pentru secțiunile dark */
.bg-dot-pattern  /* subtle dot pattern pentru secțiuni light */
```

---

## Pattern traduceri

Traducerile se adaugă în `src/locales/en.json` (+ fr.json + ro.json) și se folosesc cu:
```jsx
const { t } = useLanguage();
// în JSX:
<span>{t('cheie.traducere')}</span>
```

Dacă adaugi o cheie nouă în en.json, adaug-o și în fr.json și ro.json (chiar dacă e același text deocamdată).

---

## Imagini

- **Produse:** `/images/products/{product_key}.webp`
- **Home:** `/images/home/home_app_1_en.webp` ... `/images/home/home_app_5_en.webp`
- Toate imaginile sunt descărcate local în `public/images/`

---

## Date produse (src/data/products.js)

Fiecare produs are:
```js
{
  key: "mrm_80_1900",            // folosit în URL și imagine
  name: "MRM 80-1900",
  category: "power_modules",
  categoryLabel: "Power Modules",
  info: "Control CPU for relay circuits",  // scurt, pe card
  description: `<p>...</p>`,     // HTML complet
  characteristics: `<ul>...</ul>`,  // HTML complet
  wiring: `<ul>...</ul>`,        // HTML (poate fi gol "")
}
```

În ProductDetail.jsx, HTML-ul se afișează cu:
```jsx
<div dangerouslySetInnerHTML={{ __html: product.description }} />
```

---

## Categorii produse (9 total)

| key | Label | Produse |
|-----|-------|---------|
| power_modules | Power Modules | 4 |
| variation_modules | Variation Modules | 6 |
| acquisition_modules | Acquisition Modules | 3 |
| control_modules | Control Modules | 5 |
| communication_modules | Communication Modules | 6 |
| access_control_modules | Access Control Modules | 2 |
| various | Various | 6 |
| kit_smart_dimmer_led | KIT Smart Dimmer LED | 1 |
| certification | Certification | — |

---

## Design inspiration: Loxone.com

Site-ul se inspiră din Loxone.com dar cu culorile BAT:
- **Mult whitespace** — padding-uri generoase (`py-32 md:py-40`)
- **Un singur accent color per secțiune** — nu tot paleta odată
- **Kicker labels** deasupra fiecărui titlu (`<span className="kicker">OUR PHILOSOPHY</span>`)
- **border-radius modest** — `rounded-2xl` (16px), nu `rounded-[3rem]`
- **Zero blob animations** — animații decorative eliminate
- **Secțiuni alternante:** alb → light gray → alb → dark navy → blue CTA
- **Editorial layout** — carduri de mărimi diferite, nu grid uniform 3×3

---

## Sectiunile Home.jsx (în ordine)

1. **Hero** — dark `bat-navy`, grid pattern subtil, un glow static, title + subtitle + 2 CTA + phone mockups
2. **Pillars** — alb, bento grid: Economic (wide), Security (dark card), Comfort (full-width cu imagine)
3. **Industries** — light gray, 4 carduri industrii: Hotels / Hospitals / Offices / Residential
4. **Ecosystem** — alb, split layout: imagine stânga + text + lista beneficii dreapta
5. **FreeDOM Teaser** — dark `bat-navy`, split: text stânga + screenshot software dreapta
6. **Contact CTA** — `bat-blue` solid, centrat

---

## Plan de retuș rămas (bifează pe rând)

### Pagini de finalizat:
- [ ] **Products.jsx** — Verifică filtrul categorii + search + grid carduri
- [ ] **ProductCard.jsx** — Imagine locală, badge categorie, hover
- [ ] **ProductDetail.jsx** — Tabs HTML, imagine mare, related products
- [ ] **Freedom.jsx** — Adaugă `/images/home/home_app_5_en.webp`, completează texte
- [ ] **About.jsx** — Completează cu conținut real
- [ ] **Contact.jsx** — Formular complet, date contact

### Componente:
- [ ] **Navbar** — Active link styling, language switcher
- [ ] **Footer** — Verifică linkuri

### Traduceri:
- [ ] Completează fr.json și ro.json cu cheile noi adăugate în en.json:
  - `home.pillarsKicker`, `home.industriesKicker`, `home.industriesTitle`, `home.industriesSubtitle`
  - `industry.hotels`, `industry.hotelsDesc`, `industry.hospitals`, `industry.hospitalsDesc`
  - `industry.offices`, `industry.officesDesc`, `industry.residential`, `industry.residentialDesc`
  - `home.appsKicker`, `home.freedomKicker`, `home.ctaTitle`, `home.ctaSubtitle`

---

## Cum să folosești acest fișier

La începutul unei sesiuni noi, spune lui Claude Code:

> "Citește CONTEXT.md din folderul bat-sa și hai să continuăm lucrul pe website. Vreau să retuşăm [SECTIUNEA]."

Claude va ști exact: stack, culori, structura fișierelor, pattern-uri, ce e de făcut.
