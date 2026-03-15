# Hashim — Portfolio Website

A dark, minimal, typographic portfolio inspired by jonasreymondin.com, built with Next.js 14, GSAP, Lenis, and SplitType.

## ✨ Features & Animations

- **Custom Cursor** — Magnetic dot + ring cursor with blend mode
- **Loader** — Progress bar loading screen with GSAP reveal
- **Lenis Smooth Scroll** — Buttery inertia scrolling
- **Hero** — SplitType character-by-character reveal + slot-machine digit roller
- **Marquee** — CSS auto-scrolling tech stack ticker
- **Projects** — GSAP ScrollTrigger stagger reveals + cursor-following image preview
- **About** — SplitType line-by-line bio reveal + skill stagger
- **Noise Overlay** — Subtle grain texture via SVG filter
- **Footer** — Scroll-triggered fade + back-to-top

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📝 Customizing

### Update personal info
- `components/Nav.tsx` — your name & email
- `components/Hero.tsx` — title, subtitle, availability, email
- `components/About.tsx` — bio text, GitHub/LinkedIn links
- `components/Footer.tsx` — social links

### Add/edit projects
Edit the `projects` array in `components/Projects.tsx`:
```ts
{
  num: "01",
  name: "Dental EMR",
  type: "Full Stack · Healthcare",
  tags: ["Django", "React", "TypeScript", "PostgreSQL"],
  year: "2024",
  url: "https://your-project-url.com",
  color: "#1a2a1a",   // background color for hover card
  desc: "Short description shown on hover",
}
```

### Add real project images
Replace the colored placeholder in `Projects.tsx` follower div with:
```tsx
<img src="/images/dental-emr.jpg" alt="Dental EMR" />
```
And add images to `/public/images/`

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `gsap` | Core animations (ScrollTrigger, timelines) |
| `@gsap/react` | React hooks for GSAP |
| `lenis` | Smooth inertia scroll |
| `split-type` | Text splitting for char/line animations |

## 🗂 Project Structure

```
├── app/
│   ├── globals.css     ← All styles
│   ├── layout.tsx      ← Root layout + metadata
│   └── page.tsx        ← Main page
├── components/
│   ├── Cursor.tsx      ← Custom cursor
│   ├── SmoothScroll.tsx← Lenis wrapper
│   ├── Loader.tsx      ← Loading screen
│   ├── Nav.tsx         ← Navigation
│   ├── Hero.tsx        ← Hero section
│   ├── Marquee.tsx     ← Tech stack ticker
│   ├── Projects.tsx    ← Work section
│   ├── About.tsx       ← About + skills
│   └── Footer.tsx      ← Footer
├── public/             ← Static assets
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.mjs
```

## 🎨 Design Tokens

Edit in `app/globals.css`:
```css
:root {
  --bg: #080808;        /* Background */
  --cream: #ede8df;     /* Primary text */
  --dim: #444340;       /* Secondary text */
  --lime: #c8ff00;      /* Accent / hover */
  --border: rgba(237, 232, 223, 0.1);
}
```
