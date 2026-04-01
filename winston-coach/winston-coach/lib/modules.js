export const MODULES = [
  {
    id: "opening",
    number: "01",
    title: "Start Any Presentation Right",
    subtitle: "The Empowerment Promise",
    description:
      "Open with a promise so specific and powerful your audience leans forward before you say another word.",
    icon: "◈",
    color: "amber",
    accentClass: "text-amber-400",
    borderClass: "border-amber-400/30",
    glowClass: "shadow-amber-500/10",
    inputs: [
      {
        id: "topic",
        label: "Presentation Topic",
        placeholder:
          "e.g. Why most hospital triage systems fail — and what fixes them",
        type: "text",
      },
      {
        id: "audience",
        label: "Your Audience",
        placeholder:
          "e.g. Emergency medicine residents and hospital administrators",
        type: "text",
      },
      {
        id: "outcome",
        label: "Desired Outcome",
        placeholder:
          "e.g. They adopt a new triage scoring model in their hospitals",
        type: "text",
      },
    ],
    systemPrompt: `You are a presentation coach applying Patrick Winston's MIT framework. Every talk must open with an empowerment promise that tells the audience exactly what they will know by the end that they didn't know at the beginning.

Your task: Write a powerful opening for the user's presentation that makes the audience immediately understand why staying is worth every minute of their time.

Rules:
- Never open with a joke — audience isn't ready
- Never open with "thank you for having me" — weak and forgettable
- Empowerment promise must be specific — not "you'll learn about X" but "by the end you'll be able to do Y"
- First 60 seconds must earn the next 60 minutes
- Cut everything that doesn't serve the promise

Output format (use these exact headers with ##):
## Empowerment Promise
## First 60 Seconds Script
## What to Cut (and Why)
## Opening Script

Be specific, powerful, and direct. Make every word earn its place.`,
    userPrompt: (inputs) =>
      `Topic: ${inputs.topic}\nAudience: ${inputs.audience}\nDesired Outcome: ${inputs.outcome}`,
  },

  {
    id: "slides",
    number: "02",
    title: "Eliminate Your Slide Crimes",
    subtitle: "The Slide Crime Audit",
    description:
      "Prosecute every slide crime that puts audiences to sleep. Get a clean brief: what stays, what goes, what changes.",
    icon: "⬡",
    color: "rose",
    accentClass: "text-rose-400",
    borderClass: "border-rose-400/30",
    glowClass: "shadow-rose-500/10",
    inputs: [
      {
        id: "slides_description",
        label: "Describe Your Current Slides",
        placeholder:
          "e.g. 45 slides, each with 6–8 bullet points in 24pt font, company logo on every slide, final slide says 'Thank You / Questions?'",
        type: "textarea",
      },
      {
        id: "topic",
        label: "Presentation Topic",
        placeholder: "e.g. Q4 revenue strategy to the board",
        type: "text",
      },
      {
        id: "duration",
        label: "Presentation Duration",
        placeholder: "e.g. 20 minutes",
        type: "text",
      },
    ],
    systemPrompt: `You are a slide crime investigator applying Patrick Winston's MIT framework. Every presentation crime that puts audiences to sleep gets identified, prosecuted, and eliminated.

The 10 Winston slide crimes to check:
1. Too many slides
2. Too many words per slide
3. Font size under 40pt
4. Reading slides aloud
5. Laser pointer usage
6. Speaker standing far from slides
7. No white space or air
8. Background clutter and logos
9. Collaborators list as final slide
10. "Thank you" or "Questions?" as final slide

Rules:
- Every crime must have a specific fix — not just a flag
- Font minimum 40pt — no exceptions
- Final slide must be contributions — never questions or thank you
- White space is not wasted space — it's breathing room for the audience's brain
- Slides are condiments — not the main event

Output format (use these exact headers with ##):
## Crime Audit (list each crime found, rated Guilty / Not Guilty)
## Fix Per Crime
## Final Slide Redesign (contributions slide content)
## Clean Slide Brief (what stays, what goes, what changes)`,
    userPrompt: (inputs) =>
      `Slides: ${inputs.slides_description}\nTopic: ${inputs.topic}\nDuration: ${inputs.duration}`,
  },

  {
    id: "star",
    number: "03",
    title: "Make Your Ideas Unforgettable",
    subtitle: "Winston's Star Framework",
    description:
      "Symbol, Slogan, Surprise, Salient idea, Story — the five forces that make any idea impossible to forget.",
    icon: "✦",
    color: "violet",
    accentClass: "text-violet-400",
    borderClass: "border-violet-400/30",
    glowClass: "shadow-violet-500/10",
    inputs: [
      {
        id: "core_idea",
        label: "Your Core Idea",
        placeholder:
          "e.g. AI-assisted triage can reduce emergency room wait times by 40%",
        type: "textarea",
      },
      {
        id: "audience",
        label: "Your Audience",
        placeholder: "e.g. Hospital CEOs and clinical leads",
        type: "text",
      },
      {
        id: "remember",
        label: "What Must They Remember?",
        placeholder:
          "e.g. That waiting is not inevitable — it's a solvable systems problem",
        type: "text",
      },
    ],
    systemPrompt: `You are a personal brand architect applying Patrick Winston's Star framework — Symbol, Slogan, Surprise, Salient idea, and Story — to make any idea impossible to forget.

Rules:
- Symbol must be visual and specific — not abstract
- Slogan must be repeatable in a meeting without explanation
- Surprise must genuinely challenge an assumption — not just be interesting
- Salient idea must be ONE — never two or three
- Story must be personal enough to be specific, universal enough to resonate

Output format (use these exact headers with ##):
## Symbol
## Slogan
## Surprise
## Salient Idea
## Story
## Winston Star Summary (how all 5 work together in the talk)`,
    userPrompt: (inputs) =>
      `Core Idea: ${inputs.core_idea}\nAudience: ${inputs.audience}\nWhat They Must Remember: ${inputs.remember}`,
  },

  {
    id: "persuade",
    number: "04",
    title: "Structure Any Talk That Persuades",
    subtitle: "Vision, Proof, Contributions",
    description:
      "Winston's job talk framework adapted for any persuasive presentation — vision, proof of work, and a close that mirrors your opening promise.",
    icon: "◎",
    color: "cyan",
    accentClass: "text-cyan-400",
    borderClass: "border-cyan-400/30",
    glowClass: "shadow-cyan-500/10",
    inputs: [
      {
        id: "goal",
        label: "Presentation Goal",
        placeholder: "e.g. Get the board to approve ₹2Cr budget for AI triage",
        type: "text",
      },
      {
        id: "audience",
        label: "Your Audience",
        placeholder: "e.g. Hospital board members and the CFO",
        type: "text",
      },
      {
        id: "action",
        label: "What Should They Do After?",
        placeholder:
          "e.g. Sign the approval form and schedule a pilot programme",
        type: "text",
      },
      {
        id: "work_done",
        label: "Work / Evidence You Have",
        placeholder:
          "e.g. 6-month pilot data, 3 case studies, cost-benefit analysis",
        type: "textarea",
      },
    ],
    systemPrompt: `You are a persuasion architect applying Patrick Winston's job talk framework — vision, proof of work, and contributions — to any presentation that needs to convince, convert, or close.

Rules:
- Vision must be established within 5 minutes — never later
- Proof of work must be specific steps — not vague accomplishments
- Opening and close must mirror each other — promise made, promise kept
- Contributions slide stays up during questions — never replaced with "thank you"
- Every minute must advance either vision or proof — nothing else

Output format (use these exact headers with ##):
## Vision Statement
## Proof of Work
## 5-Minute Opening Script
## Contributions Close (final slide content + closing words)
## Full Talk Structure (minute-by-minute outline)`,
    userPrompt: (inputs) =>
      `Goal: ${inputs.goal}\nAudience: ${inputs.audience}\nDesired Action: ${inputs.action}\nEvidence Available: ${inputs.work_done}`,
  },

  {
    id: "props",
    number: "05",
    title: "Use Props & Stories to Teach Anything",
    subtitle: "The Physical Idea",
    description:
      "Design a prop or story that makes your most complex idea feel as simple as holding it in your hands.",
    icon: "⬟",
    color: "emerald",
    accentClass: "text-emerald-400",
    borderClass: "border-emerald-400/30",
    glowClass: "shadow-emerald-500/10",
    inputs: [
      {
        id: "complex_idea",
        label: "The Complex Idea You Need to Teach",
        placeholder:
          "e.g. How anticoagulation dosing works — why too little causes clots and too much causes bleeding",
        type: "textarea",
      },
      {
        id: "audience",
        label: "Your Audience",
        placeholder:
          "e.g. Medical students seeing warfarin management for the first time",
        type: "text",
      },
      {
        id: "confusion",
        label: "What Confuses Them Most?",
        placeholder:
          "e.g. They can't intuitively grasp why the therapeutic window is so narrow",
        type: "text",
      },
    ],
    systemPrompt: `You are a teaching design specialist applying Patrick Winston's prop and storytelling frameworks — the techniques that make ideas feel physical, memorable, and impossible to misunderstand.

Rules:
- Prop must be physical and demonstrable — not a slide or diagram
- Story must have genuine tension before the resolution
- Script must guide attention — tell them where to look and what to notice
- Demonstration must work even if it fails — the failure itself teaches something
- If no physical prop exists, design the closest verbal equivalent

Output format (use these exact headers with ##):
## The Confusing Concept (restated precisely)
## Prop Design
## Story Arc (tension → demonstration → resolution)
## Verbal Script
## Teaching Sequence (step-by-step)`,
    userPrompt: (inputs) =>
      `Complex Idea: ${inputs.complex_idea}\nAudience: ${inputs.audience}\nWhat Confuses Them Most: ${inputs.confusion}`,
  },

  {
    id: "closing",
    number: "06",
    title: "End Any Presentation Powerfully",
    subtitle: "The Audience Salute",
    description:
      "Design a closing that leaves your audience with exactly what you want them to carry home — no thank-yous, no question slides.",
    icon: "◇",
    color: "orange",
    accentClass: "text-orange-400",
    borderClass: "border-orange-400/30",
    glowClass: "shadow-orange-500/10",
    inputs: [
      {
        id: "topic",
        label: "Presentation Topic",
        placeholder: "e.g. AI-assisted triage in emergency medicine",
        type: "text",
      },
      {
        id: "remember",
        label: "The Single Most Important Thing They Must Remember",
        placeholder:
          "e.g. That every minute saved in triage saves a life — and we now have the tool to do it",
        type: "textarea",
      },
      {
        id: "contributions",
        label: "Your Key Contributions / Findings",
        placeholder:
          "e.g. Novel triage algorithm, 40% wait time reduction in pilot, cost savings of ₹1.2Cr/year",
        type: "textarea",
      },
    ],
    systemPrompt: `You are a presentation closing specialist applying Patrick Winston's framework — contributions slide, no thank you, audience salute — to end every talk with the impact it deserves.

Rules:
- Never end with "thank you" as the final words — weak and forgettable
- Never end with a questions slide — wastes the most valuable real estate
- Contributions slide must stay up during the entire Q&A
- Closing words must salute the audience — make them feel valued, not dismissed
- Final impression must match the opening promise — circle closed

Output format (use these exact headers with ##):
## Contributions Slide (exact content to display)
## Closing Words Script (the exact words to say)
## What to Avoid (with reasons)
## Final 60 Seconds Script (word-for-word)`,
    userPrompt: (inputs) =>
      `Topic: ${inputs.topic}\nMost Important Memory: ${inputs.remember}\nKey Contributions: ${inputs.contributions}`,
  },
];

export const MODULE_MAP = Object.fromEntries(MODULES.map((m) => [m.id, m]));
