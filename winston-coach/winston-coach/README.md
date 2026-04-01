# Winston Coach — Presentation Intelligence

> Six Patrick Winston MIT frameworks, powered by Claude AI. Build presentations that open powerfully, eliminate slide crimes, and end with impact.

![Winston Coach](https://img.shields.io/badge/Powered%20by-Claude%20AI-orange?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?style=flat-square)

---

## What Is This?

Winston Coach implements all six frameworks from Patrick Winston's legendary **How to Speak** lecture (MIT OpenCourseWare) as an AI-powered coaching tool. Each module takes your presentation details as input and generates expert guidance using Claude AI.

### The Six Modules

| # | Module | Framework | Output |
|---|--------|-----------|--------|
| 01 | **Start Any Presentation Right** | Empowerment Promise | Opening script + what to cut |
| 02 | **Eliminate Your Slide Crimes** | Slide Crime Audit | Crime-by-crime fixes + contributions slide |
| 03 | **Make Your Ideas Unforgettable** | Winston's Star | Symbol, Slogan, Surprise, Salient, Story |
| 04 | **Structure Any Talk That Persuades** | Vision + Proof + Contributions | Full talk structure + 5-min opening |
| 05 | **Use Props & Stories to Teach Anything** | Physical Teaching | Prop design + verbal script |
| 06 | **End Any Presentation Powerfully** | Audience Salute | Final 60 seconds + contributions slide |

---

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/winston-coach.git
cd winston-coach
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-your-key-here
```

Get your key at [console.anthropic.com](https://console.anthropic.com).

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Deploy to Vercel

### One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/winston-coach)

### Manual deploy

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variable in Vercel dashboard:
# ANTHROPIC_API_KEY = sk-ant-your-key-here
```

**Important:** After deploying, go to your Vercel project → Settings → Environment Variables and add `ANTHROPIC_API_KEY`.

---

## Project Structure

```
winston-coach/
├── app/
│   ├── globals.css          # Design system, typography, animations
│   ├── layout.jsx           # Root layout with Google Fonts
│   ├── page.jsx             # Home — 6 module cards
│   ├── module/
│   │   └── [id]/
│   │       └── page.jsx     # Module interaction + streaming output
│   └── api/
│       └── generate/
│           └── route.js     # Edge API route → Anthropic streaming
├── lib/
│   └── modules.js           # All 6 module definitions + system prompts
├── .env.example             # Environment variable template
├── next.config.mjs
├── tailwind.config.js
└── README.md
```

---

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + custom CSS variables
- **AI**: Anthropic Claude claude-opus-4-5 via streaming API
- **Fonts**: Cormorant Garamond + DM Sans (Google Fonts)
- **Deployment**: Vercel (Edge Runtime for streaming)

---

## Customisation

### Swap the AI model

In `app/api/generate/route.js`, change the model:

```js
model: "claude-sonnet-4-5",  // faster, cheaper
// or
model: "claude-opus-4-5",    // most capable
```

### Add a new module

In `lib/modules.js`, add a new entry to the `MODULES` array following the same structure. The routing is dynamic — it will appear automatically.

### Change the colour scheme

Module accent colours are defined in `app/module/[id]/page.jsx` in the `colorAccent` object.

---

## Credits

Built on Patrick Winston's **How to Speak** — a lecture Winston delivered at MIT for over 40 years before his passing in 2019. Available freely on [MIT OpenCourseWare](https://ocw.mit.edu/courses/res-tll-005-how-to-speak-january-iap-2018/).

---

## License

MIT
