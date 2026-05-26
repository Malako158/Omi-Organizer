# Dashboard UI — Video Reference

**Source:** [How to Design a Dashboard UI From Scratch](https://youtu.be/B7k5rOgmOGY?si=gCbogmDAQBvcQY7P)
**Captured:** 2026-05-22

---

## Core Philosophy

> "If your dashboard looks like it requires a PhD to operate, it's too complex. Just do one thing well."

- Dashboards fail not because they're ugly — but because they're disorganized and messy
- **Do one thing well** with the main dashboard view
- What you put in the main section reflects what is most important to the user
- Features/text sizes are much smaller than landing pages — you're packing more into less space
- Grids and layouts are more strictly followed than landing pages — you're using all the screen

---

## The Sidebar

The sidebar is the **spine of the product** — persistent, globally relevant elements.

**What goes in it:**
- Logo (optional — top of sidebar)
- Profile management (top — picture + arrow to indicate clickable)
- Navigation links — icon + short title
- Settings & Help at the bottom (rarely used, get pushed down)

**Rules:**
- Group links by relevance to reduce cognitive load
- Always have an active state indicator (rectangle/highlight on current page)
- Make it collapsible — icons-only mode requires clean icon choices
- Nest links into dropdowns as count grows
- Optional: notification badges, feature highlights, integrations callouts
- Optional: notification feed at the bottom (see Dub, Linear for reference)

---

## Dashboard Layout

**Grid:** Simple 2-column, 2-row as a starting point.

**Top bar:** Reserved for important page actions — dropdowns, primary action buttons (e.g. "Create Link").

**Typography scale:** Much tighter than landing pages. Smaller font sizes, less spacing between size steps.

**What to put at the top:** Whatever is most important to the user.
- Project management → project status
- Financial dashboard → investments
- Link tracker → link list

---

## The Four Core Dashboard Components

### 1. Lists & Tables
Most common component. Three ways to separate items:
1. **Space** — just padding/margin between rows
2. **Lines/dividers** — subtle borders between items
3. **Color** — alternating backgrounds

Good tables need more than display — give users: **search, filter, sort**. That transforms a table into an interactive tool.

Always design an **empty state** — what does the UI look like with no data?

**Micro-interaction:** Multi-select rows → reveals contextual "Bulk Actions" button.

### 2. Cards
Charts, stats, notifications — most dashboards are many cards together.
- Keep margins well-spaced — don't pack content tightly
- **Dark mode:** prefer outlined cards
- **Light mode:** prefer background-color cards
- Cards can contain forms (see Vercel's table-with-forms pattern)

### 3. User Input
Forms, inputs, selectors — common in modals and settings pages.

### 4. Tabs
Add "pages" without cluttering the sidebar. Related content, different views, same context (see Notion's database views).

---

## Charts

- Always include **grid lines and axis numbers** — people forget these
- Add a **summary** and **date selector** to every chart
- Line graph for trends over time
- Bar chart for breakdowns by category (add favicon/icon for easy identification)
- On hover: show value + contextual bubble
- On hover (bar): dim other bars to focus attention

---

## Modals, Popovers & Pages

| Pattern | When to use |
|---------|-------------|
| **Popover** | Simple, non-blocking context (display settings, quick options). User clicks away to close. |
| **Modal** | Complex actions that stay in context of current page (creating/editing). Blocking — requires action to close. Always pair with a **toast notification** confirming the change. |
| **New page** | Permanent or very large context (e.g. clicking into a full record). Always add a back button or breadcrumb. |

---

## Toast Notifications

The notification system of the dashboard.
- Use when you want to inform the user without taking over the screen
- Great for: confirmations, warnings, error states
- Error/warning toasts frequently get missed — design them explicitly

---

## Animation & Interaction

- Keep it **tame and user-focused** — dashboards aren't landing pages
- Charts are the one place to get creative with hover interactions
- **Optimistic UI** — assume server requests will succeed and update the UI instantly (Gmail's delete pattern). Eliminates awkward pauses.

---

## Key Principles Summary

1. Do one thing well — don't try to show everything
2. Strict grid discipline — use all the space intentionally
3. Tighter typography scale than marketing pages
4. Every table needs search/filter/sort to be useful
5. Always design empty states
6. Always design error/warning states (toasts)
7. Optimistic UI for speed perception
8. Sidebar = spine of the product — keep it clean and grouped
