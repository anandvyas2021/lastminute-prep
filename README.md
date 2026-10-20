# ⚡ LastMinutePrep — High-Yield Interview Revision Vault

A fast, clean, zero-fluff education and revision platform for engineers preparing for technical and behavioral interviews.

Inspired by modern edtech dashboard aesthetics, built without oversaturated gradients, heavy animations, or video distractions. Focused 100% on high-yield mental models, cheat sheets, code blueprints, and interview traps.

---

## ✨ Features

- **📚 Core Revision Categories**:
  - **Data Structures & Algorithms**: Sliding Window, Two Pointers, Binary Search templates, Graph traversals, Complexity matrices.
  - **System Design & Architecture**: CAP theorem & PACELC, Caching patterns (Cache-Aside, Stampede mitigation), Database sharding.
  - **Frontend & Web Internals**: JS Event Loop (Microtasks vs Macrotasks), React Fiber reconciler, Render vs Commit phases.
  - **Backend, DBs & APIs**: B+ Tree indexing, Leftmost Prefix rule, ACID properties, Transaction isolation levels.
  - **Behavioral & STAR Stories**: Senior engineer STAR framework (2-minute rule), handling technical disagreements.

- **⚡ 15-Minute Blitz Cram Mode**:
  - Distraction-free flashcard study tool for quick review right before walking into an interview.

- **📊 Revision Progress Tracking**:
  - Interactive "Mark as Mastered" checkboxes on all notes.
  - Live category completion percentages and global preparation index.
  - Automatic `localStorage` persistence — your progress stays saved on reload.

- **🔍 Global Search & Filtering**:
  - Instant Ctrl+K / Cmd+K search across topics, tags, algorithms, and concepts.
  - Filter by category, difficulty level, or unreviewed status.

- **🌗 Clean Light / Dark Mode (No `dark:` classes)**:
  - Implemented entirely through CSS variables (`globals.css`) mapped to semantic Tailwind design tokens (`bg-card`, `text-main`, `border-line`).
  - Zero FOUT (flash of unstyled theme) via instant pre-paint script.

---

## 🚀 Getting Started

### 1. Navigate to Project
```bash
cd D:\Dev\Projects\lastminute-prep
```

### 2. Start the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to start studying!

### 3. Build for Production
```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx         # Root layout with ThemeProvider, fonts, metadata
│   ├── globals.css        # CSS variable design tokens (:root & [data-theme='dark'])
│   ├── page.tsx           # Dashboard, progress overview, and topic vault
│   ├── topic/[id]/        # Dynamic route for deep-dive revision notes
│   ├── cram/              # 15-Minute Blitz flashcard review
│   ├── bookmarks/         # Pinned revision topics
│   └── progress/          # Domain mastery report & checklist
├── components/
│   ├── layout/            # Sidebar, Header, and AppShell
│   ├── revision/          # NoteCard, CodeSnippet, CalloutBox, ComplexityBadge
│   ├── theme/             # ThemeProvider with localStorage sync
│   └── ui/                # Button, Badge, ProgressBar, SearchModal
├── context/
│   └── RevisionContext.tsx# Central progress and bookmark management
├── data/
│   ├── categories.ts      # Category metadata and icons
│   └── notes.ts           # Curated high-yield interview revision content
└── types/
    └── index.ts           # TypeScript interfaces
```

---

## 📖 Next.js Learning Guide

Are you new to Next.js? Check out the comprehensive **[ARCHITECTURE.md](./ARCHITECTURE.md)** file included in this repository. It breaks down:
- How the Next.js App Router works
- Server Components vs Client Components (`"use client"`)
- How CSS variable theming works without repetitive `dark:` classes
- How to add your own revision notes in seconds
