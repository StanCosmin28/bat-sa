# BAT-SA Website — Context Complet pentru Claude Code

Dă acest fișier lui Claude Code la începutul oricărei conversații noi despre acest proiect.

---

## Ce este proiectul

Site de prezentare pentru **BAT (Building Automation Transmission) — Btg SA**, o companie din Luxembourg specializată în sisteme de automatizare a clădirilor.

**Site original (vechi):** https://bat-sa.com
**Date contact:** Esplanade Street 50 L - 9227 Diekirch 20, Luxembourg | info@bat-sa.com | +32 476 424 372

**Deploy:** Vercel, conectat la GitHub `StanCosmin28/bat-sa` (branch `main`). Domeniu: `bat-pink.vercel.app`.
⚠️ Există și un proiect Vercel vechi numit doar `bat`, creat automat dintr-un repo gol (template Vite generic) — e nefolosit/mort, nu-l confunda cu proiectul real.

---

## Stack tehnic

- **React 19 + Vite 8** (nu Next.js)
- **Tailwind CSS v3** cu culori custom în `tailwind.config.js`: `bat.navy` (#1a2744), `bat.blue` (#3b82f6), `bat.gold` (#f59e0b), `bat.teal`, `navyLight`, `goldLight`
- **Framer Motion** pentru animații scroll (`AnimatedSection`)
- **React Router v7** — rute lazy-loaded (`React.lazy`) în `App.jsx`, exceptând `Home` (eager, e cea mai vizitată)
- **@splinetool/react-spline** — scenă 3D interactivă în Hero-ul de pe Home, doar pe desktop
- **@react-three/fiber + @react-three/drei + three** — instalate pentru un experiment cu un robot GLB propriu (`LavenderBotScene.jsx`), în prezent **neconectat nicăieri** (cod mort, păstrat pentru mai târziu dacă se renunță la Spline)
- Fișiere traduceri **JSON separate**: `src/locales/en.json`, `fr.json`, `ro.json` (NU sunt inline în `LanguageContext.jsx` — acela doar le importă și expune hook-ul `useLanguage()` / `t('cheie')`)

---

## Structura proiectului

```
src/
├── pages/
│   ├── Home.jsx            ← doar orchestrator: HeroV2 + secțiuni din components/home/
│   ├── About.jsx
│   ├── Products.jsx        ← grid 2 coloane pe mobil, 3-4 pe desktop, filtru categorie + search
│   ├── ProductDetail.jsx   ← tabs Description/Characteristics/Wiring, toggle Front/Detail
│   ├── Freedom.jsx         ← include <DesktopShowcase /> (laptop mockup CSS)
│   ├── Contact.jsx
│   ├── SplinePreview.jsx   ← utilitar, ruta /spline-preview, NU e în navbar (vezi mai jos)
│   └── NotFound.jsx
├── components/
│   ├── Navbar.jsx          ← recunoaște hero light (text dark) pe: "/", "/products", "/contact"
│   ├── Footer.jsx
│   ├── HeroV2.jsx          ← Hero-ul real de pe Home (vezi secțiunea dedicată mai jos)
│   ├── ProductCard.jsx     ← 2 coloane pe mobil, tot cardul e Link, imagine locală
│   ├── PhoneMockup.jsx     ← variant="iphone" | "samsung", frame SVG din /public
│   ├── LaptopMockup.jsx    ← mockup laptop 100% CSS (fără SVG), pentru Freedom
│   ├── LavenderBotScene.jsx← robot GLB (react-three-fiber), NEFOLOSIT momentan
│   ├── MunnRobotScene.jsx  ← robot generat procedural (sfere), NEFOLOSIT, versiune veche
│   ├── AnimatedSection.jsx ← wrapper scroll-reveal, suportă staggerChildren/staggerDelay/itemDuration
│   ├── home/
│   │   ├── Pillars.jsx         ← Economic/Security/Comfort, 3 carduri egale
│   │   ├── Industries.jsx      ← Hotels/Hospitals/Offices/Residential
│   │   ├── IosShowcase.jsx     ← 2 iPhone-uri suprapuse, accent blue
│   │   ├── Ecosystem.jsx       ← dashboard + listă beneficii
│   │   ├── AndroidShowcase.jsx ← 2 Samsung suprapuse, accent gold
│   │   ├── FreedomTeaser.jsx   ← secțiune dark, link spre /freedom
│   │   └── ContactCta.jsx      ← CTA final, bg bat-blue
│   └── freedom/
│       └── DesktopShowcase.jsx ← folosește LaptopMockup, în Freedom.jsx
├── context/
│   └── LanguageContext.jsx  ← useLanguage() hook, citește din src/locales/*.json
├── locales/
│   ├── en.json / fr.json / ro.json  ← TOATE cheile trebuie să existe în toate 3 (altfel fallback pe EN)
└── data/
    └── products.js          ← 33 produse, cu description/characteristics/wiring (HTML), unele cu hasDetail:true

public/
├── images/
│   ├── products/    ← {key}.webp (33, poze față — SINGURELE imagini de produs valide acum)
│   │                  {key}_detail.webp (19 produse cu hasDetail:true — verificate, valide)
│   └── home/        ← home_app_1..5_en.webp
├── videos/
│   ├── hero-robot-mobile.mp4   ← fallback video pentru Hero pe mobil (<768px)
│   └── hero-robot-mobile.webm  ← variantă webm, încercată prima (mai mică)
└── models/
    └── lavender_bot.glb  ← model 3D (13MB), folosit doar de LavenderBotScene.jsx (nefolosit în UI)
```

---

## HeroV2.jsx — Hero-ul de pe Home (IMPORTANT, citește înainte să-l modifici)

Fișierul e considerat **"gata, nu se mai modifică fără cerere explicită"** de către user — a fost iterat mult și e mulțumit de rezultat. Orice schimbare aici trebuie confirmată clar înainte.

**Desktop (≥768px):** canvas Spline live, interactiv (`https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode`), lazy-loaded (`React.lazy`), fade-in doar când `onLoad` chiar se declanșează (nu doar când s-a încărcat libraria JS).

**Mobil (<768px):** `<video>` cu `hero-robot-mobile.webm`/`.mp4`, **fără `poster`** (un poster static urmat de pop la pornirea video-ului arăta "stricat" — s-a scos intenționat), fade-in la `onCanPlay`. Motorul Spline (`@splinetool/react-spline` + runtime + fizică WASM) cântărește **~1.3MB+ gzip doar el**, plus poate bloca thread-ul principal la inițializare pe telefoane slabe — de asta nu se încarcă deloc pe mobil.

**Loop-ul video-ului:** NU folosește atributul HTML `loop` (ar reseta mereu la 0, vizibil). Are `onEnded` custom care sare la `LOOP_RESTART_SECONDS = 4` (nu la 0) — prima redare e completă, reluările sar peste primele 4 secunde ca să nu pară că "resetează" de fiecare dată.

**Cum s-a generat video-ul:** din ruta utilitară `/spline-preview` (`src/pages/SplinePreview.jsx`) — pagină goală, doar canvas Spline pe tot ecranul, cu un `mousemove` sintetic care mișcă scena automat (robotul reacționează la poziția mouse-ului) și `cursor-none` ca să nu apară cursorul în înregistrare. User-ul a înregistrat ecranul (QuickTime, mod mobil în DevTools) și mi-a dat fișierul `.mov`, eu l-am tăiat/comprimat cu `ffmpeg` (scale 1080px, 24fps, CRF 20 mp4 / CRF 26 webm — user a cerut calitate mai mare decât compresia inițială). Ruta rămâne în cod, nefolosită în navigare, sigur de șters dacă nu mai e nevoie.

**Breakpoint 768px = și pragul pentru tablete** — o tabletă (ex: iPad) primește Spline (tratată ca desktop), nu video-ul. Confirmat explicit cu user-ul, e intenționat.

---

## Poze de produs — ATENȚIE, istoric de bug real

User a adus 66 de fișiere `{key}_back.webp` + `{key}_wiring.webp` (pentru toate cele 33 produse) — **toate erau stricate**: fiecare era de fapt o pagină HTML (shell de aplicație, cu `<base href="/">`) salvată din greșeală cu extensia `.webp`. Au fost **șterse complet** din `public/images/products/`. Dacă apar din nou fișiere cu acest pattern de nume, **verifică cu `file nume.webp`** înainte să le folosești în cod — trebuie să zică `Web/P image`, nu `HTML document text`.

În schimb, `{key}_detail.webp` (19 fișiere, pentru produsele cu `hasDetail: true` în `products.js`) **sunt reale și verificate** — acestea alimentează toggle-ul Front/Detail din `ProductDetail.jsx`.

De asemenea, `public/data_sheets/*.pdf` (33 fișiere) a existat la un moment dat dar **a fost șters** (user a scos și butonul de download din `ProductDetail.jsx` în același timp) — nu mai există nicio referință în cod.

---

## Culori Tailwind (din tailwind.config.js)

```js
bat: {
  navy:      '#1a2744',   // fundal dark principal
  navyLight: '#23355c',
  teal:      '#0f3460',
  tealLight: '#185296',
  gold:      '#f59e0b',   // accent warm
  goldLight: '#fbbf24',
  blue:      '#3b82f6',   // accent principal
}
```

**Regulă de design (Loxone-inspired, din discuții anterioare):** whitespace generos, **un singur accent color per secțiune** (nu amesteca blue+gold în aceeași secțiune), `rounded-2xl` (16px) ca radius standard — nu `rounded-[3rem]` sau altele exagerate, kicker labels scurte (nu propoziții) deasupra titlurilor, puține animații dar bine alese, zero blob-uri decorative multiple.

---

## Clase CSS custom (din src/index.css)

```css
.kicker / .kicker-light     /* label mic, uppercase, tracking larg */
.section-title / .section-title-light
.card                        /* bg-white rounded-2xl border shadow-sm hover:shadow-lg */
.product-prose               /* stilizează HTML brut din dangerouslySetInnerHTML (p/ul/li/strong) */
.bg-grid-pattern / .bg-dot-pattern / .bg-noise
scrollbar hidden global (html::-webkit-scrollbar { display:none })
```

---

## Pattern traduceri — sursă frecventă de bug-uri

Cheile se adaugă în `src/locales/en.json` + `fr.json` + `ro.json`. **Dacă lipsește o cheie din vreo limbă, `t()` cade pe EN, apoi pe cheia brută** (ex: a apărut `common.all` literal pe ecran fiindcă acea cheie nu exista — codul trebuia să apeleze `cat.all`, care exista deja).

**Bug real întâlnit:** listele `.map()` NU trebuie să folosească textul tradus ca `key` React — la schimbarea limbii, cheia se schimbă, React remontează elementul, iar `AnimatedSection` (whileInView + viewport once:true) rămâne blocat la opacity:0 pentru totdeauna. Folosește mereu un `id` stabil, independent de limbă.

---

## Note tehnice importante

1. **HTML în produse** — `description`/`characteristics`/`wiring` conțin HTML, afișate cu `dangerouslySetInnerHTML` + clasa `.product-prose` pentru stil.
2. **Imagini locale** — `/images/products/{key}.webp`, `/images/home/home_app_{1-5}_en.webp`. Niciodată linkuri spre `bat-sa.com` (erau fragile, s-au înlocuit peste tot).
3. **App.jsx** — rute lazy (`React.lazy` + `Suspense`), `AppLayout` intern ascunde Navbar/Footer doar pentru `/spline-preview`.
4. **ProductDetail.jsx** — zona de conținut a tab-urilor are înălțime FIXĂ (`h-[420px] overflow-y-auto`), nu `min-h` — altfel descrieri de lungimi diferite schimbă înălțimea rândului și "sar" imaginea sticky din stânga.
5. **Vercel** — `vercel.json` la rădăcină cu `buildCommand`, `outputDirectory: dist`, și rewrite SPA pentru React Router.

---

## Categorii produse (9 total)

| key | Label | Nr. produse |
|-----|-------|-------------|
| power_modules | Power Modules | 4 |
| variation_modules | Variation Modules | 6 |
| acquisition_modules | Acquisition Modules | 3 |
| control_modules | Control Modules | 5 |
| communication_modules | Communication Modules | 6 |
| access_control_modules | Access Control Modules | 2 |
| various | Various | 6 |
| kit_smart_dimmer_led | KIT Smart Dimmer LED | 1 |
| certification | Certification | — |

Etichetele de categorie din filtrul de pe `/products` **rămân în engleză indiferent de limbă** — nu există încă traduceri pentru ele (decizie neluată încă, discutată dar nerezolvată).

---

## Plan de retuș — ce mai rămâne

- [ ] Traduceri pentru etichetele de categorii (`power_modules` → "Power Modules" etc.) în FR/RO
- [ ] `About.jsx` — conținut de finalizat
- [ ] Poze `_back`/`_wiring` corecte pentru produse (cele vechi erau stricate, șterse)
- [ ] `Footer.jsx` are un import `motion` neutilizat (warning oxlint minor)
- [ ] Decizie: renunțăm la Spline în Hero (înlocuit cu `LavenderBotScene.jsx`, deja construit) sau rămânem cu split Spline-desktop/video-mobil (decizie curentă: **rămânem cu Spline**, user a ales explicit)
- [ ] `src/pages/SplinePreview.jsx` — sigur de șters odată ce nu mai e nevoie de reînregistrat animația

---

## Cum să folosești acest fișier

La începutul unei sesiuni noi, spune lui Claude Code:

> "Citește CONTEXT.md din folderul bat-sa și hai să continuăm lucrul pe website."

Claude va ști exact: stack, structura fișierelor, deciziile de design deja luate, bug-urile reale întâlnite (ca să nu le repete), și ce mai e de făcut.
