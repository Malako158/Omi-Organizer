# Component Rules

**Project:** Assistant Dashboard  
**Last updated:** 2026-05-22  
**Depends on:** [[01 Design Principles/(C) Colour System]]

---

## The Rule Before the Components

Every component answers one question the user has. A row in the email list answers "what is this email and do I need to act on it?" A stat card answers "what's the number and is it good or bad?" Build to answer the question — nothing more.

---

## 1. Sidebar

**Job:** Navigate between modules. Show state at a glance.

```
Width:      220px fixed
Background: --bg-surface
Padding:    16px 12px
```

### Structure (top → bottom)
1. **Workspace header** — Logo/avatar + name + chevron. Compact. ~56px tall.
2. **Nav section** — Primary nav items. One per module.
3. **Bottom utility** — Settings, Help, or a focus card. Pushed to bottom with `margin-top: auto`.

### Nav Item
```html
<a class="nav-item nav-item--active">
  <span class="nav-item__icon"><!-- SVG icon --></span>
  <span class="nav-item__label">Emails</span>
  <span class="badge badge--red">4</span>  <!-- optional count -->
</a>
```
```css
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: var(--radius-sm);
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  transition: background 150ms, color 150ms;
}
.nav-item:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}
.nav-item--active {
  background: var(--accent-subtle);
  color: var(--accent);
  font-weight: 500;
}
.nav-item__icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.7;
}
.nav-item--active .nav-item__icon { opacity: 1; }
```

**Rules:**
- Icon always 18px. No larger.
- Count badge goes right — use `margin-left: auto` to push it flush right.
- Active state = `--accent-subtle` background + `--accent` text. No bold border, no glow.
- Max 6–7 nav items before it needs grouping.

---

## 2. Page Header

**Job:** Tell the user where they are and give them the primary action.

```
Height:     ~56px
Background: transparent (sits on --bg-base)
Border:     1px solid --border-muted on the bottom
Padding:    0 24px
```

```html
<header class="page-header">
  <h1 class="page-header__title">Emails</h1>
  <div class="page-header__actions">
    <button class="btn btn--ghost">Display</button>
    <button class="btn btn--primary">+ Compose</button>
  </div>
</header>
```
```css
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 56px;
  padding: 0 24px;
  border-bottom: 1px solid var(--border-muted);
}
.page-header__title {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
}
```

---

## 3. Buttons

**Three types only.** Don't introduce others.

```css
/* === PRIMARY — for the one most important action per view === */
.btn--primary {
  background: var(--accent);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms;
}
.btn--primary:hover { background: var(--accent-hover); }

/* === GHOST — secondary actions, filters, toggles === */
.btn--ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
  padding: 7px 14px;
  border-radius: var(--radius-sm);
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  transition: border-color 150ms, color 150ms;
}
.btn--ghost:hover {
  border-color: var(--text-muted);
  color: var(--text-primary);
}

/* === ICON — single icon, no label === */
.btn--icon {
  background: transparent;
  border: none;
  padding: 6px;
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: background 150ms, color 150ms;
}
.btn--icon:hover {
  background: var(--bg-elevated);
  color: var(--text-primary);
}
```

**Rules:**
- One primary button per view max. Everything else is ghost or icon.
- Never use accent colour on ghost borders.
- No drop shadows on buttons.

---

## 4. Data Row (List Item)

**Job:** Surface one item (email, task, link) with enough context to decide what to do with it.

```html
<div class="data-row">
  <div class="data-row__avatar"><!-- favicon or initials --></div>
  <div class="data-row__main">
    <span class="data-row__primary">Subject line or task name</span>
    <span class="data-row__secondary">sender@domain.com · 10m ago</span>
  </div>
  <span class="data-row__meta">Campaign follow-up</span>
  <span class="badge badge--red">Urgent</span>
</div>
```
```css
.data-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border-muted);
  transition: background 120ms;
}
.data-row:hover { background: var(--bg-subtle); }
.data-row__avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  flex-shrink: 0;
  background: var(--bg-elevated);
  overflow: hidden;
}
.data-row__main {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
  min-width: 0;
}
.data-row__primary {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.data-row__secondary {
  font-size: 12px;
  color: var(--text-secondary);
}
.data-row__meta {
  font-size: 12px;
  color: var(--text-muted);
  flex-shrink: 0;
}
```

**Rules:**
- Avatar always 32px circle. If no image — use initials on `--bg-elevated`.
- Primary text truncates with ellipsis — never wraps.
- Badge goes last, right-aligned.
- No vertical borders. Rows are separated by bottom border only (or just spacing).

---

## 5. Card

**Job:** Group a section of content (a chart, a summary, a stat).

```css
.card {
  background: var(--bg-surface);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  padding: 20px;
}
.card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.card__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
}
```

**Rules:**
- Cards never have box shadows on a dark background — use the border instead.
- `--bg-surface` on `--bg-base`. Never `--bg-surface` on `--bg-surface`.
- Card padding: 20px. Don't go below 16px.

---

## 6. Stat Card

**Job:** One number. One label. Optional trend.

```html
<div class="card stat-card">
  <span class="stat-card__label">Emails today</span>
  <span class="stat-card__value">24</span>
  <span class="stat-card__trend stat-card__trend--up">↑ 3 vs yesterday</span>
</div>
```
```css
.stat-card__label {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 6px;
}
.stat-card__value {
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary);
  line-height: 1;
}
.stat-card__trend {
  font-size: 12px;
  margin-top: 6px;
}
.stat-card__trend--up   { color: var(--status-green); }
.stat-card__trend--down { color: var(--status-red); }
.stat-card__trend--flat { color: var(--text-muted); }
```

---

## 7. Tab Switcher

**Job:** Switch between views or metrics within a single panel.

```html
<div class="tabs">
  <button class="tab tab--active">Emails</button>
  <button class="tab">WhatsApp</button>
  <button class="tab">Tasks</button>
</div>
```
```css
.tabs {
  display: flex;
  gap: 4px;
  border-bottom: 1px solid var(--border-default);
  margin-bottom: 16px;
}
.tab {
  padding: 8px 14px;
  font-size: 13px;
  font-weight: 400;
  color: var(--text-secondary);
  background: none;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  transition: color 150ms, border-color 150ms;
}
.tab:hover { color: var(--text-primary); }
.tab--active {
  color: var(--accent);
  font-weight: 500;
  border-bottom-color: var(--accent);
}
```

---

## 8. Input / Search

```css
.input {
  background: var(--bg-subtle);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
  font-size: 13px;
  color: var(--text-primary);
  outline: none;
  transition: border-color 150ms;
  width: 100%;
}
.input::placeholder { color: var(--text-muted); }
.input:focus        { border-color: var(--border-focus); }
```

---

## Component Inventory

| Component | Status | File |
|---|---|---|
| Sidebar + nav items | ✅ Defined | This file |
| Page header | ✅ Defined | This file |
| Buttons (primary, ghost, icon) | ✅ Defined | This file |
| Data row | ✅ Defined | This file |
| Card | ✅ Defined | This file |
| Stat card | ✅ Defined | This file |
| Tab switcher | ✅ Defined | This file |
| Input / search | ✅ Defined | This file |
| Badge / pill | ✅ Defined | [[01 Design Principles/(C) Colour System]] |
| Line chart (area) | ✅ Defined | [[(C) Chart Components]] |
| Ranked list (horizontal bar) | ✅ Defined | [[(C) Chart Components]] |
| Progress bars | ✅ Defined | [[(C) Chart Components]] |
| Chart panel + tab switcher | ✅ Defined | [[(C) Chart Components]] |
| Modal | 🔲 To define | — |
| Empty state | 🔲 To define | — |
