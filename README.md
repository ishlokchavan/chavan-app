# Chavan — You're Just a Man

A minimal, powerful daily self-improvement tracker built with Next.js, TypeScript, and TailwindCSS. Track progress across 4 pillars: Body, Mind, Work, and Relationships.

## Features

✅ **Daily Tracker** — 4 tasks across 4 pillars (Body, Mind, Work, Relationships)  
✅ **Success Rule** — Complete 3 of 4 tasks to mark the day successful  
✅ **Streak Counter** — Track consecutive successful days  
✅ **Weekly View** — Visual 7-day progress grid  
✅ **LocalStorage Only** — No backend, fully client-side  
✅ **PWA Ready** — Install as a native app on mobile/desktop  
✅ **Dark Mode** — Automatic light/dark theme toggle  
✅ **Mobile-First** — Optimized for all devices  

## Tech Stack

- **Next.js 16** — Latest stable
- **TypeScript** — Type-safe code
- **TailwindCSS 4** — Minimal styling
- **LocalStorage** — Persistent client-side storage
- **next-pwa** — Progressive Web App support

## Quick Start

### Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open http://localhost:3000
```

### Build & Deploy

```bash
# Build for production
npm run build
npm start

# Deploy to Vercel
npm i -g vercel
vercel
```

## Project Structure

```
chavan-app/
├── app/
│   ├── components/          # React components
│   ├── hooks/               # Custom hooks (useLocalStorage)
│   ├── lib/                 # Utilities (storage, calculations)
│   ├── types/               # TypeScript interfaces
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout + PWA metadata
│   └── page.tsx             # Main app page
├── public/
│   ├── manifest.json        # PWA manifest
│   └── sw.js                # Service worker
├── next.config.ts           # Next.js + PWA config
└── package.json
```

## Features Explained

### Daily Tracker
Complete 3 of 4 tasks to mark a day successful:
- **Body** 💪 — Workout, steps, physical activity
- **Mind** 🧠 — Reading, learning, studying
- **Work** ⚙️ — Build something, deep work, goals
- **Relationships** 🤝 — Meaningful conversation, networking, family

### Streak System
- **Current Streak** — Consecutive successful days
- **Total Successful Days** — Lifetime count

### Weekly Progress
7-day grid: Green ✓ = success, Red ✗ = failed, Grey — = incomplete

### Reminders
- **Morning:** "Win the day. Build the man."
- **Evening:** "Did you improve today?"

## Data Storage

All data stored in browser LocalStorage (`chavan_data` key):
- Daily records with task completions
- Current streak count
- Total successful days

**Reset Data:** DevTools → Application → LocalStorage → Delete `chavan_data`

## PWA Installation

### iOS (Safari)
1. Share button → Add to Home Screen

### Android (Chrome)
1. Menu (⋮) → Install app

### Desktop (Chrome/Edge)
1. Install icon in address bar

## Deployment to Vercel

### Via Git
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/chavan-app.git
git push -u origin main
```

Then visit [vercel.com](https://vercel.com) → Import repository → Deploy

### Via Vercel CLI
```bash
vercel
```

## Customization

### Change Success Threshold
`app/lib/storage.ts` — `calculateDaySuccess()` function

### Change Pillar Names
`app/types/index.ts` — `PILLARS` array

### Adjust Colors
`app/globals.css` and component files (Tailwind utilities)

## Philosophy

**Chavan — You're just a man.**

You are not perfect. But you can improve every single day.

Improve your body. Improve your mind. Build something. Strengthen relationships. Repeat daily.

This app is a tool. The work is up to you.

---

**Built with** ❤️ **and discipline.**
