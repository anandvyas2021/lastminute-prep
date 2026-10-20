# 📘 LastMinutePrep — Architecture & TypeScript Guide

Welcome! This document provides an in-depth, beginner-friendly explanation of how this project is structured, how Next.js App Router works, and why specific design decisions (like CSS variable theming without `dark:` classes) were made.

---

## 1. 100% Strict TypeScript Architecture

Every component, revision note, resource track, and state interaction in this project is strictly typed.
- **Interfaces defined in [`src/types/index.ts`](file:///D:/Dev/Projects/lastminute-prep/src/types/index.ts)**:
  - `RevisionNote`: Core model for all cheat sheets, code blueprints, interview traps, and self-quizzes.
  - `ResourcePhase` & `ResourceTrack`: Models for external video tracks, official labs, and certifications.
  - `CostGuardrail`: Cloud billing warnings and safeguards.
  - `CategoryId`: Union type `'dsa' | 'system-design' | 'frontend' | 'backend' | 'behavioral' | 'cloud-aws'`.

Because TypeScript enforces these shapes, if you add a new note or resource missing a required property, your editor and the build compiler (`npm run build`) will catch it immediately before it reaches production!

---

## 2. Two Core Sections

The platform is cleanly split into two distinct learning modes:

1. **Section 1: Revision Notes & Library (`/` and `/topic/[id]`)**:
   - Condensations, mental models, 30-second TL;DRs, and interview traps.
   - For fast reading and pre-interview cramming.
2. **Section 2: Curated Resources & Videos (`/resources`)**:
   - Synthesizes external deep-dives (Adrian Cantrill, Anton Putra, Official AWS Workshops, EKS Workshop, Serverless Land, DynamoDB Book).
   - Designed for learners who want to watch comprehensive video courses or execute multi-hour hands-on production labs on their own.

---

## 3. Modular Content Folder Structure

To make maintaining and uploading your own notes effortless, all content is modularized inside `src/data/`:

```
src/data/
├── categories.ts         # Category metadata, colors, and icons
├── notes/                # Modular Revision Notes (Section 1)
│   ├── index.ts          # Aggregates and exports REVISION_NOTES
│   ├── dsa.ts            # Data Structures & Algorithms
│   ├── systemDesign.ts   # System Design & Scalability
│   ├── frontend.ts       # Frontend & Web Internals
│   ├── backend.ts        # Backend, DBs & APIs
│   ├── behavioral.ts     # Behavioral & STAR Stories
│   └── aws.ts            # Cloud & AWS Architecture (Ready for your incoming notes!)
└── resources/            # Curated External Resources (Section 2)
    ├── index.ts          # Exports all tracks, categories & search helpers
    └── aws.ts            # 6-Phase AWS Production Mastery roadmap & tracks
```

### How to upload your new TypeScript notes:
1. Open the relevant file in `src/data/notes/` (e.g. `dsa.ts` or `aws.ts`), or create a new file like `security.ts`.
2. Add your note object matching the `RevisionNote` type.
3. It will automatically populate across the Vault, Search Index, Blitz Cram mode, and Progress Report!

---

## 4. Next.js 14 App Router Fundamentals

In modern Next.js, folders inside `src/app` define your application's URLs:

| File / Folder Path | What It Does | Corresponding URL |
| :--- | :--- | :--- |
| `src/app/layout.tsx` | **Root Layout**: Wraps every page. Holds fonts, HTML tag, and providers. | All routes |
| `src/app/page.tsx` | **Revision Notes Vault**: Dashboard overview and notes library. | `/` |
| `src/app/resources/page.tsx` | **Curated Resources**: 6-phase video roadmap, matrix & cost guardrails. | `/resources` |
| `src/app/topic/[id]/page.tsx` | **Dynamic Route**: Matches any topic ID dynamically (e.g. `dsa-01`). | `/topic/dsa-01` |
| `src/app/cram/page.tsx` | **Blitz Cram Mode**: 15-minute flashcard review mode. | `/cram` |
| `src/app/progress/page.tsx` | **Progress Report**: Detailed domain completion analytics. | `/progress` |
| `src/app/bookmarks/page.tsx` | **Saved Topics**: Quick access to starred notes. | `/bookmarks` |

---

## 5. Server Components vs. Client Components (`"use client"`)

- **Server Components (Default)**:
  - Run **only on the server** during rendering or build time.
  - Zero JavaScript bundle sent to the client browser.
  - Used for static layouts, SEO metadata, and server-side templates.
- **Client Components (`"use client"`)**:
  - Declared by adding `"use client";` at the top of the file.
  - Hydrate in the browser and enable interactive features (click handlers, search inputs, modal toggles, Framer Motion animations, `localStorage`).

---

## 6. Light & Dark Theming Without `dark:` Classes

### Our Solution: CSS Variables + Semantic Tailwind Tokens
Instead of writing repetitive `dark:bg-slate-900 dark:text-slate-100` everywhere, we defined semantic CSS custom properties in `src/app/globals.css`:
```css
:root {
  --bg-page: #f8fafc;
  --bg-card: #ffffff;
  --text-main: #0f172a;
  --border-line: #e2e8f0;
  --accent-main: #2563eb;
}

[data-theme='dark'] {
  --bg-page: #0b0f17;
  --bg-card: #151d2f;
  --text-main: #f8fafc;
  --border-line: #1e293b;
  --accent-main: #3b82f6;
}
```

In your components, you write:
```jsx
<div className="bg-card text-main border border-line hover:bg-card-hover">
```
When you click the theme switch, `ThemeProvider.tsx` simply swaps `<html data-theme="dark">` to `<html data-theme="light">`, updating every color instantaneously with zero flash (FOUT).

---

## 7. Subtle Framer Motion Animations

We integrated `framer-motion` for tactile micro-interactions without over-saturating or slowing down the UI:
- **Card Hover Lift**: Cards subtly elevate (`whileHover={{ y: -3 }}`) on hover.
- **Progress Animation**: Smooth animated fill bars (`duration: 0.5s`).
- **Tab Transitions**: Fast, responsive tab switches on the Resources page without jarring reflows.

---

## 8. Sidebar Selected Item Highlighting

The sidebar now detects both route paths (`usePathname`) and query parameters (`useSearchParams`):
- When you are in the **Resources** section, `/resources` is highlighted with an active pill and accent border.
- When you click a category pill (e.g. `/?category=dsa`), the corresponding category in the sidebar immediately receives active styling:
  - High-contrast accent background (`bg-accent-subtle`)
  - Accent text and icon color
  - Highlighted completion badge
