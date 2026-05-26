# Colour System

**Project:** Assistant Dashboard  
**Last updated:** 2026-05-22  
**Theme:** Dark / Near-black with purple accent

---

## The Rule Before the Colours

Colour has one job: **communicate state and hierarchy**. Not decorate. Every colour used must answer "what does this tell the user?" If it doesn't answer that question, it shouldn't be there.

---

## Base Palette (CSS Variables)

```css
:root {
  /* === BACKGROUNDS === */
  --bg-base:       #0F0F0F;   /* Page background — the deepest layer */
  --bg-surface:    #1A1A1A;   /* Cards, panels, sidebar */
  --bg-elevated:   #222222;   /* Modals, dropdowns, hover states */
  --bg-subtle:     #2A2A2A;   /* Input fields, table rows on hover */

  /* === BORDERS === */
  --border-default: #2E2E2E;  /* Dividers, card edges */
  --border-muted:   #1F1F1F;  /* Subtle separators, barely visible */
  --border-focus:   #6B5CE7;  /* Input focus ring — uses accent */

  /* === TEXT === */
  --text-primary:   #F2F2F2;  /* Headlines, labels, main content */
  --text-secondary: #A0A0A0;  /* Timestamps, subtext, metadata */
  --text-muted:     #5A5A5A;  /* Placeholders, disabled states */
  --text-inverse:   #0F0F0F;  /* Text on light/accent backgrounds */

  /* === ACCENT — Purple === */
  --accent:         #6B5CE7;  /* Primary brand colour */
  --accent-hover:   #7D6FF0;  /* Hover state — slightly lighter */
  --accent-muted:   #6B5CE720; /* 12% opacity — chart fills, highlights */
  --accent-subtle:  #6B5CE710; /* 6% opacity — active nav background */

  /* === STATUS COLOURS === */
  --status-green:       #22C55E;  /* Active, done, success */
  --status-green-muted: #22C55E20;
  --status-yellow:      #EAB308;  /* Pending, warning, in-progress */
  --status-yellow-muted:#EAB30820;
  --status-red:         #EF4444;  /* Urgent, error, failed */
  --status-red-muted:   #EF444420;

  /* === MISC === */
  --shadow-card: 0 2px 12px rgba(0, 0, 0, 0.4);
  --radius-sm:   6px;
  --radius-md:   10px;
  --radius-lg:   16px;
}
```

---

## Layer System — How Backgrounds Stack

This is critical. The eye reads depth through lightness. Stick to this stack and the UI will feel dimensional without any explicit shadows.

```
--bg-base       #0F0F0F  ← Page canvas. Nothing sits here directly.
  └── --bg-surface    #1A1A1A  ← Sidebar, main panels, cards
        └── --bg-elevated  #222222  ← Dropdowns, modals, popovers
              └── --bg-subtle   #2A2A2A  ← Inputs, row hovers
```

**Rule:** Never skip a layer. A modal on a base background feels floating and disconnected. A modal on a surface feels intentional.

---

## Accent Colour Usage Rules

| Use | Variable | Notes |
|---|---|---|
| Active nav item background | `--accent-subtle` | Barely visible tint — not a full fill |
| Active nav item text/icon | `--accent` | Full colour on the label |
| Primary action button | `--accent` background | White text on top |
| Button hover | `--accent-hover` | Slightly lighter, no other change |
| Chart area fill | `--accent-muted` | 12% opacity fill below the line |
| Chart line | `--accent` | Full colour on the stroke |
| Bar chart fill | `--accent` | Full colour |
| Focus ring on inputs | `--border-focus` | 2px ring, no glow effect |
| Links / clickable text | `--accent` | On hover, `--accent-hover` |
| Selected state on tabs | `--accent` underline or background | Depends on tab style |

**Never use accent for:** body text, backgrounds larger than a button, non-interactive decoration.

---

## Status Colour Usage Rules

| Colour | Variable | When to use |
|---|---|---|
| 🟢 Green | `--status-green` | Task complete, email read, live/active indicator |
| 🟡 Yellow | `--status-yellow` | Pending reply, in-progress task, approaching deadline |
| 🔴 Red | `--status-red` | Urgent email, overdue task, failed action |

**Always pair the dot/icon with text.** Never rely on colour alone to convey state — use a label too ("Urgent", "Done", "Pending"). Colour reinforces; text communicates.

**Badge pattern:**
```html
<span class="badge badge--green">
  <span class="badge__dot"></span>
  Active
</span>
```
```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 2px 8px;
  border-radius: 999px;   /* Full pill */
  font-size: 11px;
  font-weight: 500;
}
.badge--green  { background: var(--status-green-muted);  color: var(--status-green); }
.badge--yellow { background: var(--status-yellow-muted); color: var(--status-yellow); }
.badge--red    { background: var(--status-red-muted);    color: var(--status-red); }

.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}
```

---

## Text Hierarchy

| Role | Variable | Size | Weight | Used for |
|---|---|---|---|---|
| Page title | `--text-primary` | 20px | 600 | "Emails", "Tasks", module names |
| Section heading | `--text-primary` | 14px | 600 | Card headers, group labels |
| Body / primary | `--text-primary` | 14px | 400 | Main content, link names |
| Secondary | `--text-secondary` | 12px | 400 | Timestamps, subdomains, metadata |
| Muted / placeholder | `--text-muted` | 12px | 400 | Input hints, empty states |

**Rule:** Never use more than 3 text colours in a single component. Primary + secondary + muted is the max.

---

## What to Never Do

- ❌ Don't use pure white (`#FFFFFF`) — use `--text-primary` (`#F2F2F2`). Pure white is too harsh on near-black.
- ❌ Don't add a second accent colour. One accent. Purple handles everything.
- ❌ Don't use opacity hacks on text (e.g. `rgba(255,255,255,0.5)`) — use the named text variables instead.
- ❌ Don't stack two surface-level backgrounds next to each other — they'll look identical. Always step up or down a layer.
- ❌ Don't use status colours on large areas. Small dots, badges, and icons only.

---

## Quick Reference Card

```
BACKGROUNDS          ACCENT              STATUS
#0F0F0F  base        #6B5CE7  full       #22C55E  green
#1A1A1A  surface     #7D6FF0  hover      #EAB308  yellow
#222222  elevated    #6B5CE720 muted      #EF4444  red
#2A2A2A  subtle

TEXT
#F2F2F2  primary
#A0A0A0  secondary
#5A5A5A  muted

BORDERS
#2E2E2E  default
#1F1F1F  muted
```
