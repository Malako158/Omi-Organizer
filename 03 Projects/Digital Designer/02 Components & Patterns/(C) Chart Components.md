# Chart Components

**Project:** Assistant Dashboard  
**Last updated:** 2026-05-22  
**Depends on:** [[01 Design Principles/(C) Colour System]], [[02 Components & Patterns/(C) Component Rules]]  
**Library:** Chart.js (CDN — no build step required)

---

## The Rule Before the Charts

Charts are not decoration. Every chart must answer a specific question faster than reading a list would. If a table would do the job better, use a table. A chart earns its space by showing **pattern**, **trend**, or **rank** at a glance.

---

## Chart Panel — The Wrapper

All charts live inside a single tab-switched panel. The tabs control which chart is visible. The panel itself never changes size.

```html
<div class="card chart-panel">
  <!-- Tab switcher -->
  <div class="chart-panel__header">
    <h2 class="card__title">Activity</h2>
    <div class="tabs">
      <button class="tab tab--active" data-chart="line">Over Time</button>
      <button class="tab" data-chart="ranked">Top Items</button>
      <button class="tab" data-chart="progress">Progress</button>
    </div>
  </div>

  <!-- Time range selector — only shown on line chart -->
  <div class="chart-panel__controls" id="time-range-controls">
    <button class="range-btn range-btn--active" data-range="1d">1d</button>
    <button class="range-btn" data-range="1w">1w</button>
    <button class="range-btn" data-range="1m">1m</button>
  </div>

  <!-- Chart canvas area -->
  <div class="chart-panel__body">
    <canvas id="chart-line"     class="chart-view chart-view--active"></canvas>
    <div    id="chart-ranked"   class="chart-view ranked-list"></div>
    <div    id="chart-progress" class="chart-view progress-list"></div>
  </div>
</div>
```

```css
.chart-panel {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.chart-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

/* Time range buttons */
.chart-panel__controls {
  display: flex;
  gap: 2px;
  margin-bottom: 16px;
}
.range-btn {
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 400;
  color: var(--text-muted);
  background: none;
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 120ms, color 120ms;
}
.range-btn:hover        { color: var(--text-secondary); }
.range-btn--active      { background: var(--bg-elevated); color: var(--text-primary); }

/* Show/hide chart views via tab switching */
.chart-panel__body { position: relative; min-height: 240px; }
.chart-view        { display: none; width: 100%; }
.chart-view--active { display: block; }
```

---

## Chart 1 — Line Chart (Activity Over Time)

**Question it answers:** "What's my activity pattern over the selected time range?"  
**Data:** Any time-series — emails received, tasks completed, messages, etc.  
**Library:** Chart.js

### HTML
```html
<canvas id="chart-line" class="chart-view"></canvas>
```

### Chart.js Configuration

```js
// Global Chart.js defaults — set once, applies to all charts
Chart.defaults.color = '#A0A0A0';           // --text-secondary
Chart.defaults.font.family = 'Inter, system-ui, sans-serif';
Chart.defaults.font.size = 12;

// Line chart instance
const lineChart = new Chart(document.getElementById('chart-line'), {
  type: 'line',
  data: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], // swap based on range
    datasets: [{
      label: 'Activity',
      data: [12, 19, 8, 24, 15, 6, 21],          // inject real data here
      borderColor: '#6B5CE7',                      // --accent
      backgroundColor: 'rgba(107, 92, 231, 0.08)', // --accent-muted (softer fill)
      borderWidth: 2,
      fill: true,
      tension: 0.4,        // smooth curve — not jagged
      pointRadius: 0,      // no dots on the line — cleaner
      pointHoverRadius: 5, // dot appears only on hover
      pointHoverBackgroundColor: '#6B5CE7',
      pointHoverBorderColor: '#0F0F0F',
      pointHoverBorderWidth: 2,
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',       // tooltip snaps to nearest x point
      intersect: false,
    },
    plugins: {
      legend: { display: false }, // no legend — label is in the card header
      tooltip: {
        backgroundColor: '#1A1A1A',  // --bg-surface
        borderColor: '#2E2E2E',      // --border-default
        borderWidth: 1,
        titleColor: '#F2F2F2',       // --text-primary
        bodyColor: '#A0A0A0',        // --text-secondary
        padding: 10,
        displayColors: false,        // no colour swatch in tooltip
        callbacks: {
          label: (ctx) => `${ctx.parsed.y} items`, // customise unit here
        }
      }
    },
    scales: {
      x: {
        grid: { display: false },   // no vertical grid lines
        border: { display: false },
        ticks: { color: '#5A5A5A' } // --text-muted
      },
      y: {
        grid: {
          color: '#1F1F1F',          // --border-muted — barely visible
          drawBorder: false,
        },
        border: { display: false, dash: [4, 4] },
        ticks: {
          color: '#5A5A5A',
          maxTicksLimit: 5,          // never more than 5 y-axis labels
          padding: 8,
        },
        beginAtZero: true,
      }
    }
  }
});
```

### Rules
- `tension: 0.4` — smooth curve. Never use 0 (too rigid) or 1 (too wobbly).
- `pointRadius: 0` — no dots on the line. Points appear on hover only.
- Fill opacity: **8%** (`rgba(107,92,231,0.08)`). The reference uses ~12% but 8% reads cleaner on near-black.
- No legend. The card title or tab label is the legend.
- Y-axis max 5 ticks. More than that is noise.
- Grid lines on Y only, colour `--border-muted`. X-axis grid: never.

---

## Chart 2 — Ranked List (Horizontal Bar Leaderboard)

**Question it answers:** "What are the top items and how do they compare?"  
**Data:** Any ranked dataset — top senders, busiest days, most active contacts.  
**Implementation:** Pure CSS — no Chart.js needed for this one. Simpler, faster, more control.

### HTML
```html
<div id="chart-ranked" class="chart-view ranked-list">
  <!-- Repeat .ranked-row for each item -->
  <div class="ranked-row">
    <div class="ranked-row__info">
      <div class="ranked-row__avatar"><!-- favicon or initials --></div>
      <span class="ranked-row__label">sender@gmail.com</span>
    </div>
    <div class="ranked-row__bar-wrap">
      <div class="ranked-row__bar" style="width: 82%"></div>
    </div>
    <span class="ranked-row__value">124</span>
  </div>
  <!-- more rows... -->
</div>
```

### CSS
```css
.ranked-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ranked-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.ranked-row__info {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 180px;       /* fixed label column — keeps bars aligned */
  flex-shrink: 0;
}

.ranked-row__avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--bg-elevated);
  flex-shrink: 0;
  overflow: hidden;
}

.ranked-row__label {
  font-size: 13px;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ranked-row__bar-wrap {
  flex: 1;
  height: 6px;
  background: var(--bg-elevated);
  border-radius: 999px;
  overflow: hidden;
}

.ranked-row__bar {
  height: 100%;
  background: var(--accent);
  border-radius: 999px;
  transition: width 500ms ease;  /* animates on data load */
}

.ranked-row__value {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-secondary);
  width: 36px;
  text-align: right;
  flex-shrink: 0;
}
```

### JS — Calculate bar widths
```js
function renderRankedList(data, containerId) {
  // data = [{ label, value, avatar }, ...]
  const max = Math.max(...data.map(d => d.value));
  const container = document.getElementById(containerId);

  container.innerHTML = data.map(item => `
    <div class="ranked-row">
      <div class="ranked-row__info">
        <div class="ranked-row__avatar">
          ${item.avatar
            ? `<img src="${item.avatar}" alt="">`
            : `<span class="initials">${item.label[0].toUpperCase()}</span>`}
        </div>
        <span class="ranked-row__label">${item.label}</span>
      </div>
      <div class="ranked-row__bar-wrap">
        <div class="ranked-row__bar" style="width: ${(item.value / max * 100).toFixed(1)}%"></div>
      </div>
      <span class="ranked-row__value">${item.value}</span>
    </div>
  `).join('');
}
```

### Rules
- Bar width is always **relative to the top item** (top item = 100%, rest proportional). Never absolute values.
- Max 6–8 rows. Beyond that the list needs pagination or a "show more" link.
- Label column fixed at 180px so bars always start at the same x position.
- Bar height: **6px**. Thinner than you think looks right. Trust it.
- Animate bar width on load with a CSS transition.

---

## Chart 3 — Progress Bars

**Question it answers:** "How far along am I toward a goal or completion?"  
**Data:** Tasks done vs total, weekly goal progress, client deliverable status.  
**Implementation:** Pure CSS.

### HTML
```html
<div id="chart-progress" class="chart-view progress-list">
  <div class="progress-row">
    <div class="progress-row__header">
      <span class="progress-row__label">Weekly tasks</span>
      <span class="progress-row__fraction">8 / 12</span>
    </div>
    <div class="progress-track">
      <div class="progress-fill" style="width: 66.7%"></div>
    </div>
  </div>
  <!-- more rows... -->
</div>
```

### CSS
```css
.progress-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.progress-row__header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
}

.progress-row__label {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-primary);
}

.progress-row__fraction {
  font-size: 12px;
  color: var(--text-secondary);
}

.progress-track {
  width: 100%;
  height: 6px;
  background: var(--bg-elevated);
  border-radius: 999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--accent);
  transition: width 600ms ease;
}

/* Override fill colour for status-based progress */
.progress-fill--complete { background: var(--status-green); }
.progress-fill--warning  { background: var(--status-yellow); }
.progress-fill--critical { background: var(--status-red); }
```

### Colour logic for progress fills
```js
function getProgressColour(pct) {
  if (pct >= 100) return 'progress-fill--complete';
  if (pct >= 50)  return '';                        // default accent
  if (pct >= 25)  return 'progress-fill--warning';
  return 'progress-fill--critical';
}
```

### Rules
- Track height: **6px** — same as ranked bars. Consistency across all bar-type elements.
- Always show the fraction (`8 / 12`) not just the percentage. Fractions feel more concrete.
- Use status colours (green/yellow/red) only when the fill value carries a pass/fail meaning. For neutral progress (not goal-based), use `--accent`.
- Never animate on every re-render — only on initial mount or when data changes.

---

## Tab Switching — JS

```js
const tabs = document.querySelectorAll('.tab[data-chart]');
const views = document.querySelectorAll('.chart-view');
const timeControls = document.getElementById('time-range-controls');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.chart;

    // Update tab active state
    tabs.forEach(t => t.classList.remove('tab--active'));
    tab.classList.add('tab--active');

    // Show correct view
    views.forEach(v => v.classList.remove('chart-view--active'));
    document.getElementById(`chart-${target}`).classList.add('chart-view--active');

    // Time range controls only on line chart
    timeControls.style.display = target === 'line' ? 'flex' : 'none';

    // Trigger Chart.js resize when switching back to canvas
    if (target === 'line') lineChart.resize();
  });
});
```

---

## Component Inventory Update

| Component | Status |
|---|---|
| Line chart (area) | ✅ Defined |
| Ranked list (horizontal bar) | ✅ Defined |
| Progress bars | ✅ Defined |
| Chart panel wrapper | ✅ Defined |
| Tab switching JS | ✅ Defined |
| Modal | 🔲 To define |
| Empty state | 🔲 To define |

---

## CDN Include

Add this to the `<head>` of the dashboard HTML before any chart JS:

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
```
