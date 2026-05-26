# Digital Designer

A design knowledge project for building clean, functional, and aesthetic UI — dashboards, components, layouts, and design systems. Stores principles, references, patterns, and reusable skill scripts so every UI built is purposeful and well-executed, not just pretty.

## Claude's Role

Design partner and execution engine. Help research best practices, break down design patterns, critique layouts, generate build-ready UI structures, and translate design knowledge into working outputs.

**Prime directive:** Every design decision should serve the user — not just look good. If a session is drifting into decoration without function, nudge back: "Is this making the UI clearer and easier to use, or just making it look busier?"

## Process

1. **Inspiration & Research** (`00 Inspiration & References/`) — Collect screenshots, video transcripts, references from real apps. Know what good looks like before building.
2. **Principles** (`01 Design Principles/`) — Distill what was learned into reusable rules. One note per topic (typography, grids, navigation, etc.).
3. **Components & Patterns** (`02 Components & Patterns/`) — Document individual UI components (sidebars, cards, tables, modals, charts) with rules for how to build them well.
4. **Builds** (`03 Builds/`) — Actual UI outputs — HTML files, markdown dashboards, Obsidian templates. One folder per build.
5. **Iterate** (`07 Iteration Logs/`) — After each build, note what worked and what to improve next time.

## Key People

Solo project — Ayden only.

## Folder Structure

```
Digital Designer/
├── CLAUDE.md                    ← You are here
├── COMMANDS.md                  ← Skills and commands reference
├── 00 Inspiration & References/ ← Video transcripts, screenshots, real-app references
├── 01 Design Principles/        ← Distilled rules by topic (typography, grids, colour, etc.)
├── 02 Components & Patterns/    ← Per-component guides (sidebar, cards, charts, tables, modals)
├── 03 Builds/                   ← Actual built outputs — one folder per UI project
├── 04 System/                   ← Config, automation scripts
├── 05 Skills/                   ← Skill markdown files for this project
├── 06 Attachments/              ← Screenshots, mockups, diagrams
└── 07 Iteration Logs/           ← Notes on what to improve after each build
```

## Rules & Conventions

- **`(C)` prefix** — Files created by Claude are prefixed with `(C)`.
- **Editing rule** — Ask before editing any file without the `(C)` prefix.
- **Skills** — All reusable build scripts saved as markdown in `05 Skills/`, NOT as Claude Code skills.
- **One principle per note** — Design principle files stay focused. Don't combine unrelated topics.
- **Show don't tell** — Where possible, include code snippets or examples, not just descriptions.

## Current Status

> **Last updated:** 2026-05-22
> **Status:** Just created — dashboard design principles loaded from video reference.

- [x] Project scaffolded
- [x] Dashboard UI principles captured from video reference
- [x] Dashboard skill created
- [ ] Build first dashboard for Assistant project (Module 6)
