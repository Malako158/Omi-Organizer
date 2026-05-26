# Kangaroo Inc Dashboard — Reference

**Type:** Real-app screenshot reference  
**Date captured:** 2026-05-22  
**Use case:** Link management SaaS dashboard (similar structure to what the Assistant dashboard needs)

![[Kangaroo-Dashboard-Reference.png]]

---

## What's Working — Design Breakdown

### Layout & Structure
- **Two-column feel:** Narrow fixed sidebar (~220px) + wide main content area. Clean separation.
- **Content split at the bottom:** Main area splits into a line chart (left ~60%) and a bar/leaderboard panel (right ~40%). This is a strong pattern for "overview + detail" in one view.
- **No wasted whitespace:** Every region has a job. Nothing decorative that doesn't carry information.

### Sidebar
- Dark background (#1a1a1a range), no border — merges with the overall dark theme.
- Small logo/avatar + workspace name at the top. Compact, professional.
- Nav items are minimal: icon + label, left-aligned, generous line height so it breathes without feeling sparse.
- Active state: subtle lighter background on the selected item — not a loud highlight.
- Badge indicators (e.g. "6" on Customers, "New" on Partners) — small, pill-shaped, muted colour. Communicates state without screaming.
- Promo card at the bottom of the sidebar: dark card with a dismiss X, short headline, one-line description, CTA button. Good pattern for surfacing features without breaking the layout.

### Top Bar / Page Header
- Page title ("Links") left-aligned with a sort/filter chevron — simple, scannable.
- Action button ("Create Link") top-right, outlined style with icon. Not a filled primary button — keeps it from dominating the header.
- Secondary controls (Display, Settings) as toggle-style tabs below the title.
- Search bar top-right of the content area — icon + placeholder text, dark input, no heavy border.

### Data Table (Links List)
- Rows are clean: avatar/favicon left, primary text (the link), subdomain + timestamp below it (secondary, muted), description label centre, click count + icon right-aligned.
- No visible row borders — relies on spacing and subtle hover states to separate rows.
- Click count shown as a small pill/badge: green dot + number. Status at a glance without a full column header.
- Consistent row height — scannable rhythm.

### Charts Section
- **Line chart:** Area fill below the line using the brand purple with low opacity. Smooth curves, no sharp data points marked — clean, not cluttered. Time range selector (1d / 1w / 1m / 6m / 1y) as small text tabs top-right of the chart card.
- **Bar/Leaderboard panel:** Tabs at the top (Clicks / Signups / Conversions) to switch metric. Each row is: favicon + link name + horizontal bar (brand purple) + number right-aligned. Simple, immediate ranking view.

### Colour
- Background: Very dark near-black (#111 / #141414).
- Surface cards: Slightly lighter dark (#1c1c1c / #222).
- Brand accent: Purple (#6B5CE7 range) — used on active nav, chart fill, bar chart.
- Text hierarchy: White primary, mid-grey secondary (timestamps, subdomains), dark-grey for disabled/placeholder.
- Status dot: Green (#22c55e range) for active/live links.
- No loud colours. The purple does all the heavy lifting as the single accent.

### Typography
- One font, multiple weights. Headlines/labels slightly heavier, secondary info lighter and smaller.
- Nothing decorative — purely functional type scale.

---

## Patterns to Steal for the Assistant Dashboard

| Pattern | Apply Where |
|---|---|
| Sidebar with icon + label + badge | Navigation between modules |
| Row-based data list with avatar + primary/secondary text | Email triage, task list |
| Split bottom: chart left + leaderboard/list right | Weekly summary + priorities |
| Tab switcher (Clicks / Signups / Conversions) | Switch between modules or time ranges |
| Pill badges with colour dot | Priority tags, status indicators on tasks |
| Time range selector (1d / 1w / 1m) | Calendar or performance views |
| Promo/info card at sidebar bottom | Quick action or today's focus |

---

## What to Improve / Watch Out For

- The bottom section feels slightly disconnected from the top list — needs a clearer visual separator or section header.
- Row-level actions (copy icon, redirect icon) are subtle — good for power users, but worth making slightly more discoverable in the Assistant context.
- No mobile consideration visible — this is a desktop-first layout. Fine for the Assistant dashboard (same use case).
