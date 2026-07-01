# BAT-SA — Ghid de Retuș Website

Acest document este un ghid de lucru pentru a retuşa site-ul secţiune cu secţiune, împreună cu Claude Code. Tot codul este în `/src`, imaginile sunt în `/public/images/`.

---

## Ce s-a făcut deja

- **Stack:** React + Vite + Tailwind CSS + Framer Motion + React Router
- **Traduceri:** EN / FR / RO (în `src/context/LanguageContext.jsx`)
- **Date produse complete:** `src/data/products.js` — 33 produse cu `description`, `characteristics`, `wiring`
- **Imagini descărcate local:** `public/images/products/` (33 fișiere .webp) + `public/images/home/` (5 fișiere .webp)
- **Pagini existente:** Home, About, Products, ProductDetail, Freedom, Contact, NotFound

---

## Structura proiectului

```
src/
├── pages/
│   ├── Home.jsx          ← secțiuni: Hero, Pillars, Ecosystem, FreeDOM teaser
│   ├── About.jsx
│   ├── Products.jsx      ← grid cu filtru categorie + search
│   ├── ProductDetail.jsx ← tabs: Description / Characteristics / Wiring
│   ├── Freedom.jsx
│   ├── Contact.jsx
│   └── NotFound.jsx
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── ProductCard.jsx
│   ├── AnimatedSection.jsx
│   └── PhoneMockup.jsx
├── context/
│   └── LanguageContext.jsx  ← dict cu toate traducerile EN/FR/RO
└── data/
    └── products.js          ← 33 produse complet populate

public/images/
├── products/   ← mrm_80_1900.webp, mdl_24_4101.webp, ... (33 fișiere)
└── home/       ← home_app_1_en.webp ... home_app_5_en.webp
```

---

## Cum folosim imaginile local (nu de pe bat-sa.com)

În loc de:
```jsx
src="https://bat-sa.com/assets/images/products/mrm_80_1900.webp"
```
Folosim:
```jsx
src="/images/products/mrm_80_1900.webp"
```

---

## Prompt pentru Claude Code — Retuș secțiune cu secțiune

Copiază și adaptează promptul de mai jos când lucrezi cu Claude Code:

---

```
Lucrez pe site-ul BAT-SA, un site React + Vite + Tailwind CSS pentru o companie de building automation (Building Automation Transmission — Btg SA).

Stack: React, JavaScript, Tailwind CSS, Framer Motion, React Router v6
Imagini locale în: public/images/products/{key}.webp și public/images/home/home_app_{1-5}_en.webp
Traduceri în: src/context/LanguageContext.jsx (dict cu chei EN/FR/RO)
Date produse (cu description + characteristics + wiring): src/data/products.js

Vreau să retuşăm site-ul secţiune cu secţiune. Începem cu [SECTIUNEA].

Fișierul de modificat: src/[pages sau components]/[Fisier].jsx

Ce vreau să schimb:
[descriere clară a ce trebuie schimbat]
```

---

## Plan de retuș — secțiuni prioritare

Bifează pe rând ce am terminat:

### 1. Navbar (`src/components/Navbar.jsx`)
- [ ] Logo — înlocuiește textul simplu cu logo real (dacă există) sau stilizează mai bine
- [ ] Mobile menu — verifică că funcționează corect pe toate dimensiunile
- [ ] Language switcher — asigură-te că EN/FR comută corect
- [ ] Active link styling — link-ul paginii curente să fie evidențiat

### 2. Home — Hero (`src/pages/Home.jsx` — prima secțiune)
- [ ] Imaginea de fundal sau mockup-ul de telefon — înlocuiește cu `/images/home/home_app_2_en.webp`
- [ ] Textul heroic — verifică că e corect în EN/FR
- [ ] Animațiile blob — pot fi reduse dacă par prea agresive
- [ ] Butoanele CTA — verifică stilul și culorile

### 3. Home — Pillars (secțiunea cu 3 carduri Economic / Comfort / Security)
- [ ] Cardul "Comfort" — deblochează imaginea comentată (`home_app_3_en.webp`)
- [ ] Textele din dict — completează descrierile pentru fiecare pilon
- [ ] Layout bento grid — ajustează dimensiunile dacă e nevoie

### 4. Home — Ecosystem Section (secțiunea cu imaginea mare + lista)
- [ ] Imaginea — verifică că `/images/home/home_app_1_en.webp` se afișează corect
- [ ] Lista cu 4 beneficii — completează în LanguageContext cheile `home.offer1-4`
- [ ] Butonul "Explore products" — verifică că navighează corect

### 5. Home — FreeDOM Teaser (secțiunea dark de jos)
- [ ] Titlu și descriere — verifică traducerile
- [ ] Stilul dark section — poate fi ajustat

### 6. Products Page (`src/pages/Products.jsx`)
- [ ] Filtrul de categorii — verifică că toate 9 categorii apar și filtrează corect
- [ ] Search bar — verifică că funcționează
- [ ] Grid de carduri — verifică spacing și dimensiuni

### 7. ProductCard (`src/components/ProductCard.jsx`)
- [ ] Imaginea — asigură-te că folosește `/images/products/${product.key}.webp`
- [ ] Badge categorie — stilizare
- [ ] Hover effect — adaugă dacă lipsește

### 8. Product Detail (`src/pages/ProductDetail.jsx`)
- [ ] Tabs Description / Characteristics / Wiring — verifică că afișează HTML corect cu `dangerouslySetInnerHTML`
- [ ] Imaginea produsului — mare, cu aspect ratio corect
- [ ] "Related products" section — verifică că apare
- [ ] Butonul "Download Data Sheet" — placeholder styling

### 9. Freedom Page (`src/pages/Freedom.jsx`)
- [ ] Imaginea `/images/home/home_app_5_en.webp` — adaug-o în pagină
- [ ] Textele lungi despre FreeDOM Software — verifică că sunt complete
- [ ] Features grid — verifică iconițele și textele

### 10. About Page (`src/pages/About.jsx`)
- [ ] Conținut complet — adaugă textele despre companie din content_en.txt
- [ ] Secțiunea "Industries served" — Hotels, Hospitals, Offices, Residential

### 11. Contact Page (`src/pages/Contact.jsx`)
- [ ] Formularul — verifică că are toate câmpurile (Name, Company, Email, Phone, Message)
- [ ] Date contact — Esplanade Street 50 L - 9227 Diekirch 20, info@bat-sa.com, +32 476 424 372
- [ ] Harta placeholder

### 12. Footer (`src/components/Footer.jsx`)
- [ ] Link-uri complete
- [ ] Date contact
- [ ] Copyright

---

## Informații companie (pentru texte)

**Nume:** Building Automation Transmission — Btg SA
**Tagline:** "Automated energy management and control through home automation"
**3 piloni:** Economic | Comfort | Ease & Security
**Adresă:** Esplanade Street 50 L - 9227 Diekirch 20, Luxembourg
**Email:** info@bat-sa.com | **Tel:** +32 476 424 372
**Limbaje:** EN / FR

**Descriere:**
BAT has developed the intelligent management system for hotels, community buildings, hospitals, etc. Its full range of modules allows data to be obtained and can control any type of devices. It brings all the technologies of a building together.

**BAT oferă:**
- Simple and flexible integration
- Easy and dynamic installation
- Coordination of different suppliers
- A software tool for the management of all building modules (FreeDOM)

---

## Categorii produse

| Key | Label | Nr. produse |
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

---

## Note tehnice importante

1. **HTML în produse** — `description` și `characteristics` conțin HTML. Afișează cu:
   ```jsx
   <div dangerouslySetInnerHTML={{ __html: product.description }} />
   ```

2. **Imagini locale** — toate imaginile sunt în `public/images/`, se accesează cu `/images/...`

3. **Traduceri** — adaugă chei noi în `src/context/LanguageContext.jsx` în format:
   ```js
   "cheia.mea": { EN: "...", FR: "...", RO: "..." }
   ```

4. **Culori Tailwind custom** — definite în `tailwind.config.js`:
   - `bat-navy` — albastru închis principal
   - `bat-blue` — albastru accent
   - `bat-gold` — auriu accent
   - `bat-teal` — teal accent
