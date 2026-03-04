# 🐣 DuduAI

> An AI tutor for kids that makes learning feel like playing.

## Meet Dudu

Dudu is a friendly baby bird who guides children through fun, interactive lessons. With a warm voice and playful personality, Dudu turns every learning moment into an adventure.

## Features

- 🎙️ **Voice-first** — Kids talk to Dudu naturally, no typing required
- 🎮 **Gamified learning** — Points, badges, and mini-games keep kids engaged
- 👶 **Ages 5–7** — Curriculum designed for early learners
- 🧠 **Adaptive** — Lessons adjust to each child's pace and progress
- 🔒 **Kid-safe** — Strict content filtering, parental controls, zero ads

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router, TypeScript, Tailwind CSS) |
| Backend / DB | Supabase (PostgreSQL + Auth + Storage + Realtime) |
| AI Tutor | Claude API (Anthropic) |
| Speech-to-Text | OpenAI Whisper |
| Text-to-Speech | TTS (ElevenLabs / OpenAI) |
| Deployment | Cloudflare Pages |

## Getting Started

\`\`\`bash
npm install
cp .env.example .env.local
# Fill in your API keys
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to see Dudu in action.

## Environment Variables

\`\`\`env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ANTHROPIC_API_KEY=
OPENAI_API_KEY=
\`\`\`

## License

MIT
