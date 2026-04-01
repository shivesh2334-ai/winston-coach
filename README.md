# Winston Coach

> A coaching and presentation application powered by AI, built on Patrick Winston's legendary frameworks from his MIT *How to Speak* lecture.

🔗 **Live deployment:** [https://winston-coach.vercel.app](https://winston-coach.vercel.app)

---

## Description

Winston Coach implements six frameworks from Patrick Winston's **How to Speak** lecture as an AI-powered coaching tool. Each module takes your presentation details as input and generates expert guidance using Claude AI.

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

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: JavaScript
- **Styling**: CSS + Tailwind CSS
- **AI**: Anthropic Claude via streaming API
- **Deployment**: Vercel

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/shivesh2334-ai/winston-coach.git
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

## Project Structure

```
winston-coach/
├── .gitignore
├── README.md
├── LICENSE
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.js
├── .env.example
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
└── lib/
    └── modules.js           # All 6 module definitions + system prompts
```

---

## License

MIT — see [LICENSE](LICENSE) for details.
