# Skill: Dashboard Builder

Takes a set of data sources and design requirements, applies the principles from `00 Inspiration & References/(C) Dashboard UI — Video Reference.md`, and outputs a complete, build-ready dashboard.

---

## When to Use

- Say "Build a dashboard for [project]"
- Say "Run the dashboard builder"
- Any time a UI needs to be designed from scratch or redesigned

---

## How It Works

### Step 1: Define the Dashboard

Before building anything, answer these questions:
1. **What is the one thing this dashboard does well?** (Don't try to do everything)
2. **Who is the user and what do they need to see first?** (This determines what goes at the top)
3. **What data sources feed into it?** (Email, calendar, tasks, metrics, etc.)
4. **What actions does the user need to take?** (Create, edit, delete, filter)
5. **What format?** Obsidian markdown, HTML file, or other

---

### Step 2: Plan the Layout

Apply the 2-column, 2-row grid as the starting point:

```
┌─────────────────────────────────────────────┐
│ TOP BAR — Page title + primary action button │
├──────────────┬──────────────────────────────┤
│              │                              │
│  MAIN PANEL  │     SECONDARY PANEL          │
│  (primary    │     (supporting data,        │
│   data)      │      charts, filters)        │
│              │                              │
├──────────────┴──────────────────────────────┤
│ BOTTOM ROW — Charts / metrics / summaries    │
└─────────────────────────────────────────────┘
```

Adjust columns and rows based on data density. Keep it simple.

---

### Step 3: Map Components to Data

For each data source, pick the right component:

| Data type | Component |
|-----------|-----------|
| List of records (tasks, emails, events) | Table or List |
| Single stat or count | Stat card |
| Trend over time | Line chart card |
| Breakdown by category | Bar chart card |
| User actions (create, edit) | Modal + Toast |
| Quick settings or options | Popover |
| Deep record detail | New page with breadcrumb |
| Related views of same data | Tabs |

---

### Step 4: Apply the Rules

Before writing any output, check against these:

**Structure:**
- [ ] Does the layout use a clear grid?
- [ ] Is the most important thing at the top?
- [ ] Are navigation items grouped logically?
- [ ] Is there a sidebar with active state?

**Content:**
- [ ] Does every table have search/filter/sort?
- [ ] Is there an empty state designed?
- [ ] Are charts labeled with grid lines and axis numbers?
- [ ] Do charts have a date selector?

**Interactions:**
- [ ] Are modals used for blocking actions?
- [ ] Are popovers used for non-blocking context?
- [ ] Are toasts used for confirmations and errors?
- [ ] Is optimistic UI applied where possible?

**Typography & Spacing:**
- [ ] Is the font scale tighter than a landing page?
- [ ] Are card margins well-spaced (not packed)?
- [ ] Is border vs background-color used correctly for the mode (dark/light)?

---

### Step 5: Build the Output

**For Obsidian markdown dashboards:**
- Use callout blocks for visual cards: `> [!info]`, `> [!warning]`, `> [!success]`
- Use tables for lists of records
- Use horizontal rules (`---`) for section separation
- Use checkboxes for actionable items
- Use bold headers and emoji section markers for visual hierarchy
- Save to the relevant project's output folder with `(C)` prefix

**For HTML dashboards:**
- Build as a single self-contained `.html` file
- Use CSS Grid for layout
- Use a consistent color system (neutral background, accent for primary actions)
- Include hover states on all interactive elements
- Save to `03 Builds/[Project Name]/` in this project

---

### Step 6: Review Checklist

After building, run a final check:
- [ ] Does it do **one thing well**?
- [ ] Can a new user understand it in under 10 seconds?
- [ ] Are all empty and error states handled?
- [ ] Does every interactive element have a clear affordance (it looks clickable)?
- [ ] Is optimistic UI applied for any server-dependent actions?

---

## Reference

Full design principles: [[00 Inspiration & References/(C) Dashboard UI — Video Reference]]
