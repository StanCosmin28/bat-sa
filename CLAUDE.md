# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**BAT-SA** is a React 19 + Vite single-page application showcasing Building Automation Transmission (Btg SA) products and services. The site features responsive design, performance optimization, 3D interactive elements (Spline), and multi-language support (English, French, Romanian).

**Live at**: `http://localhost:5173` (dev server)

## Commands

```bash
npm run dev      # Start dev server (HMR enabled, http://localhost:5173)
npm run build    # Production build to dist/
npm run lint     # Run oxlint on src/
npm run preview  # Preview production build locally
```

## Tech Stack & Key Dependencies

- **React 19.2** — UI framework
- **Vite 8.1** — Build tool + dev server (HMR)
- **Tailwind CSS 3.4** — Utility CSS with custom `bat.*` color tokens
- **React Router 7.18** — Client-side routing
- **Framer Motion 12.42** — Scroll/entrance animations
- **@splinetool/react-spline 4.1** — Interactive 3D scenes (Spline editor)
- **Lucide React 1.22** — Icon library
- **Three.js 0.185** — WebGL renderer (Spline dependency)

## Architecture

### File Structure

```
src/
├── pages/              # Route-level pages (Home, About, Products, etc.)
├── components/         # Reusable components
│   ├── home/          # Home page sections (Pillars, iOS/Android Showcase, etc.)
│   ├── freedom/       # FreeDOM page sections
│   ├── Navbar.jsx     # Header with language switcher & hamburger menu
│   ├── Footer.jsx     # Site footer
│   ├── AnimatedSection.jsx  # Scroll-triggered animation wrapper
│   ├── HeroV2.jsx     # Hero section with IntersectionObserver pause/play
│   ├── PhoneMockup.jsx      # iPhone/Samsung phone bezel (CSS-based, no SVG)
│   ├── ProductCard.jsx      # Product listing card
│   └── ...3D scenes (MunnRobotScene, LavenderBotScene)
├── context/
│   └── LanguageContext.jsx  # i18n state (useLanguage hook)
├── data/
│   └── products.js     # Product catalog (33 modules, structured data)
├── locales/
│   ├── en.json         # English (190 keys)
│   ├── fr.json         # French (190 keys)
│   └── ro.json         # Romanian (190 keys)
├── App.jsx             # Router setup
├── main.jsx            # React entry point
└── index.css           # Global styles (Tailwind + custom utilities)
```

### Key Architectural Patterns

#### 1. **Performance Optimization (Home page)**
- **Hero section**: `HeroV2.jsx` uses `IntersectionObserver` to pause Spline (WASM physics) and video when scrolled out of view, resuming on return. No flickering — just pause/play.
- **Below-fold code-splitting**: Sections below hero (Industries, iOS/Android Showcase, Ecosystem, etc.) are lazy-loaded with `React.lazy()` + `Suspense`.
- **Idle prefetch**: After initial render, `requestIdleCallback` triggers prefetch of all split chunks so by the time user scrolls, they're cached.

#### 2. **Grid-based Responsive Layout**
Sections like `IosShowcase`, `AndroidShowcase`, `Ecosystem`, `FreedomTeaser` use CSS Grid with explicit mobile/desktop ordering:
- **Mobile**: `grid-cols-1` with `order-*` to reorder children (title → image → description).
- **Desktop**: `lg:grid-cols-2 lg:grid-rows-[auto_auto]` with row/column spanning, no flex tricks.
- Example: iOS phones span both rows on left, text+features on right.

#### 3. **i18n (Internationalization)**
- **Context**: `LanguageContext` provides `useLanguage()` hook returning `{ t, lang, setLang }`.
- **JSON keys**: All UI strings stored in `src/locales/{en,fr,ro,it,de}.json` (190 keys each).
- **Naming**: Keys use dot notation: `"home.iosTitle"`, `"detail.tab.description"`, etc.
- **5-language switcher**: Navbar offers dropdown on desktop (shows language name + checkmark), 5-button selector on mobile (shows codes EN/FR/RO/IT/DE + checkmark).
- **Supported languages**: English (EN), French (FR), Romanian (RO), Italian (IT), German (DE).

#### 4. **Product Detail Page**
- **ExpandableContent** component: Description/Characteristics tabs show text clamped to fixed height with "Read more" toggle (no hidden scroll that mobile users miss).
- **Lightbox**: Click image to zoom full-screen (dark overlay, Maximize icon hint, click/X to close, `document.body.overflow: hidden` while open).
- **Wiring panel**: Appears below image only when user views "Detail" tab AND product has actual wiring data (only 1 of 33 products has it currently). Shows as white card with label + HTML content.
- **Sticky left column** on desktop: Image stays fixed while content scrolls on right (fixed `h-[42vh] lg:h-[60vh]` with `overflow-hidden` prevents tall wiring diagrams from overflowing).

### Custom Styling

**Tailwind theme extension** (`tailwind.config.js`):
```javascript
colors: {
  bat: {
    navy: '#1a2744',        // Dark navy (primary)
    navyLight: '#23355c',   // Navy for hover/accents
    teal: '#0f3460',        // Deep teal (inactive state)
    tealLight: '#185296',   // Teal for accents
    gold: '#f59e0b',        // Gold/amber accent
    goldLight: '#fbbf24',   // Lighter gold
    blue: '#3b82f6'         // Bright blue (CTA, hover)
  }
}
```

**Common class patterns**:
- `.kicker` — small uppercase label (text-xs, tracking-widest, text-bat-gold, block)
- `.section-title` — large heading (text-4xl md:text-5xl lg:text-6xl, font-black, text-bat-navy)
- `.product-prose` — semantic typography for HTML content (p, ul, li, strong styling)

## Data Structures

### Product Object
```javascript
{
  key: "mrm_80_1900",           // URL slug + lookup key
  name: "MRM 80-1900",          // Display name
  category: "power_modules",    // Grouping (filters, related products)
  categoryLabel: "Power Modules",
  hasDetail: true,              // Whether _detail.webp exists for front/back toggle
  info: "Control CPU for relay circuits",  // Short subtitle
  description: `<p>...</p><p>...</p>`,     // HTML (rendered with dangerouslySetInnerHTML)
  characteristics: `<ul><li>...</li>...</ul>`, // HTML features/specs
  wiring: "",                   // HTML (empty for most; only MPT 80-1000 has data)
}
```

- **33 products** across 6 categories: Power Modules, Input/Output, Sensors, Communication, Supervision, Specialized.
- **Images**: `public/images/products/{key}.webp` (front view) and `{key}_detail.webp` (back/diagram) if `hasDetail: true`.

## Recent Work & Fixes (from this session)

### Performance Fixes
1. **Hero Spline/video pause**: IntersectionObserver with `app.stop()/app.play()` for Spline (no flicker on return).
2. **Code-splitting Home page**: Below-fold sections lazy-loaded; idle callback prefetches chunks.
3. **Grid row heights**: Changed `lg:grid-rows-2` to `lg:grid-rows-[auto_auto]` in Ecosystem, FreedomTeaser, iOS/Android Showcase to eliminate unnecessary gap when title/image heights differ.

### UI/UX Improvements
1. **Product Detail mobil image overflow**: Fixed by using concrete `h-[42vh] lg:h-[60vh]` + `overflow-hidden` instead of `flex-1` (which couldn't resolve without parent height in mobile flow).
2. **ExpandableContent component**: Replaced scrollable tab content with clamped text + "Read more" toggle (220px collapsed height). Prevents users missing content behind internal scroll on mobile.
3. **Wiring panel**: Only shows when user clicks "Detail" view AND product has wiring data. Tied visually to the detail image (appears below it).
4. **Lightbox for product images**: Click to zoom full-screen; X or click overlay to close. Darkens background, prevents body scroll.
5. **Industries cards equal height**: Added `h-full flex flex-col` to card wrapper (affects About page, Home page Industries section).
6. **Contact page badges layout**: On mobile, "Founded" + "Modules" in 2-col row, "Country" spans full width below (prevents "Luxembourg" text wrapping). Desktop remains 3-col.
7. **About page hero text shortened**: Reduced title from "Pioneering the Future of Building Automation" to "Pioneering Building Automation" (3 words, fits mobile better). Subtitle shortened to one punchy sentence. Reduced padding/margins on mobile (`pt-32 pb-20` instead of `pt-40 pb-32`).
8. **Language switcher redesigned**: Dropped cycling (required 3 clicks). Now: dropdown on desktop (shows "English/Français/Română" with checkmark), 3-button selector on mobile ("EN/FR/RO" with checkmark).
9. **Hamburger menu X button visibility**: Fixed by `const isMenuButtonDark = isOpen ? scrolled : isDarkText` — button color depends on scroll state when menu is open (which determines actual header background), not page hero type.

### Translation Updates
- Added `common.readMore`, `common.showLess` keys (EN/FR/RO) for ExpandableContent.
- Shortened About page titles/subtitles for better mobile fit.

## Common Patterns & Utilities

### `AnimatedSection` Component
Wraps content with `useInView` (scroll trigger) + Framer Motion. Props:
- `delay` — stagger timing (default 0)
- `staggerChildren` — enable child stagger (used in text-heavy sections)
- `className` — pass Tailwind classes

### `useLanguage()` Hook
```javascript
const { t, lang, setLang } = useLanguage();
t('home.heroTitle')           // Get translated string
setLang('fr')                 // Switch language
```

### Responsive Utilities
- `useIsDesktop()` — hook that returns `true` if viewport ≥ 768px (md breakpoint).
- `@media (prefers-color-scheme: dark)` — CSS media query for theme preference (used sparingly; site is light-themed).

### Lazy Loading Pattern
```javascript
const Section = React.lazy(() => import('./sections/Section'));

// In parent:
<Suspense fallback={<div className="h-96" />}>
  <Section />
</Suspense>
```

## Known Constraints & Notes

1. **Wiring data**: Only 1 of 33 products (MPT 80-1000) has `wiring` field populated. Others are empty strings. Panel only renders if data exists, else shows fallback message ("Wiring diagram documentation is currently being updated…").

2. **Product images**: Must be WebP format. Stored in `public/images/products/`. If adding a new product with front+detail views, create both `{key}.webp` and `{key}_detail.webp`.

3. **Spline scenes**: Three 3D scenes in project (MunnRobotScene, LavenderBotScene). These load via @splinetool/react-spline; URLs are hardcoded. Pause/play controlled by IntersectionObserver in HeroV2.

4. **CSS Grid gaps**: Use `lg:gap-x-*` and `lg:gap-y-*` separately to control horizontal/vertical spacing — don't use shorthand `gap-*` when values differ between axes.

5. **Mobile-first**: Always define mobile styles first (no `md:` prefix), then override on desktop. Example: `text-base md:text-lg` not `text-lg md:text-base`.

## Testing & Verification

- **Build check**: `npm run build` should complete with no errors (will warn about Spline chunks > 500KB, which is expected).
- **Mobile responsiveness**: Test at 390px width (iPhone SE) and 768px+ (tablet/desktop).
- **Animation smoothness**: Open DevTools → Performance → record scrolling. Look for long frames (>16ms) on Spline hero or large list renders.
- **i18n coverage**: Use DevTools → Console, run `Object.keys(window.__i18n)` to verify all three language JSON files loaded.

## Related Session Notes

This project has been incrementally refined by user feedback. Key UX patterns emerged from testing:
- Users won't scroll hidden content (remove internal overflow-y-auto on mobile).
- Product diagrams are tall on mobile — need height constraints with overflow-hidden.
- Hamburger X button color must match header background, not page hero type.
- Image lightbox expected behavior (zoom to full-screen, close on click/X, no body scroll).

Plan to add more features incrementally per user direction in next session.
