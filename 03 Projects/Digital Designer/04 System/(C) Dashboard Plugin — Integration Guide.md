# Dashboard Plugin — Integration Guide

**Purpose:** How the Obsidian plugin reads live data from the daily brief  
**Plugin location:** `.obsidian/plugins/assistant-dashboard/`  
**Brief output folder:** `03 Projects/Assistant/05 Dashboard Output/`

---

## How It Works

1. The launchd job fires at 6 AM, Claude writes the daily brief as a `.md` file into `05 Dashboard Output/`
2. The plugin picks up the **most recently named** `.md` file from that folder (sorted alphabetically descending — name files `YYYY-MM-DD (C) Brief.md` to guarantee correct ordering)
3. The plugin looks for a `dashboard-data` fenced code block in the file
4. It parses the JSON and hydrates the full dashboard
5. If no JSON block is found, it falls back to the last built-in data (May 24 brief)

---

## Required JSON Block Format

The Agent must append this block to every brief it writes. It goes at the **end of the `.md` file**, after all the human-readable content:

````markdown
```dashboard-data
{
  "date": "YYYY-MM-DD",
  "emailBadge": 2,
  "calBadge": 5,
  "taskBadge": 5,
  "emailTabCounts": [2, 4, 4],
  "calHeader": ["Week of May 24 — 30", "5 flags · Miami Sat May 30"],
  "todayLabel": "Today — Sunday",
  "overviewToday": {
    "icon": "🛡️",
    "line1": "Protected Sunday — no work today.",
    "line2": "Reset prep only · Max 2h if anything"
  },
  "overviewTasksTitle": "Mon Priority Tasks",
  "stats": [
    { "label": "Urgent Emails", "value": "2", "trend": "4 resolved since Sat", "dir": "up" },
    { "label": "Tasks This Week", "value": "5", "trend": "Non-negotiable — all due Fri", "dir": "down" },
    { "label": "Miami In", "value": "6", "valueSuffix": " days", "trend": "Hard deadline: Fri 5 PM", "dir": "down" }
  ],
  "lineChartData": {
    "labels": ["9am","10am","11am","12pm","1pm","2pm","3pm","4pm","5pm"],
    "data": [2, 5, 8, 4, 1, 3, 2, 0, 0]
  },
  "emailsUrgent": [
    { "from": "Sender Name", "subject": "Subject line", "action": "What to do about it.", "time": "Today", "priority": "red" }
  ],
  "emailsResolved": [
    { "from": "Sender Name", "subject": "Subject line", "action": "Resolved — filed.", "time": "Sat", "priority": "" }
  ],
  "emailsNoise": [
    { "from": "Sender (x2)", "subject": "Subject", "action": "Ignore.", "time": "-", "priority": "" }
  ],
  "calWeekend": [
    { "time": "All day", "title": "Event title", "sub": "Date + detail", "warn": "", "color": "green" }
  ],
  "calWeek": [
    { "time": "Mon 8:30", "title": "Block 1", "sub": "Monday May 25 — 8:30-10:00 AM", "warn": "Optional warning text", "color": "accent" }
  ],
  "tasksHigh": [
    { "label": "Task name", "done": false, "priority": "red" }
  ],
  "tasksMedium": [
    { "label": "Task name", "done": false, "priority": "yellow" }
  ],
  "tasksBacklog": [
    { "label": "Task name", "done": false, "priority": "" }
  ],
  "senders": [
    { "label": "Sender name", "value": 3 }
  ],
  "progressItems": [
    { "label": "High priority tasks closed", "done": 0, "total": 5 }
  ],
  "priorities": [
    { "title": "Priority title", "sub": "Detail about why this matters and how to attack it." }
  ],
  "flags": [
    { "type": "red", "text": "<strong>Flag title.</strong> Description of the issue." },
    { "type": "yellow", "text": "<strong>Flag title.</strong> Description." },
    { "type": "green", "text": "<strong>Good news.</strong> Description." }
  ],
  "sharpRec": "<strong>Lead sentence of the recommendation.</strong> Full recommendation text here. Use HTML for bold. Keep it punchy and specific.",
  "dayPlan": [
    {
      "title": "Monday May 25",
      "meta": "Gym Day — disrupted",
      "warn": true,
      "blocks": [
        "<strong>6:15-7:45 AM</strong> — Gym",
        "<strong>8:30-10:00 AM</strong> — Task name",
        "<strong class=\"warn\">12:00-12:30 PM — Meeting (UNCONFIRMED)</strong>"
      ]
    }
  ]
}
```
````

---

## Field Reference

| Field | Type | Notes |
|---|---|---|
| `date` | `"YYYY-MM-DD"` | Brief date |
| `emailBadge` | number | Count shown on sidebar Email badge (red) |
| `calBadge` | number | Count shown on sidebar Calendar badge (yellow) |
| `taskBadge` | number | Count shown on sidebar Tasks badge (red) |
| `emailTabCounts` | `[urgent, resolved, noise]` | Numbers in the 3 email tab labels |
| `calHeader` | `[title, meta]` | Calendar card header — title + right-side meta text |
| `todayLabel` | string | Section label above today's calendar events |
| `overviewToday.icon` | string | Emoji shown in the today card on Overview |
| `overviewToday.line1` | string | Primary today description |
| `overviewToday.line2` | string | Secondary today note (smaller, muted) |
| `overviewTasksTitle` | string | Card title for the priority tasks list on Overview |
| `stats[].label` | string | Stat card label (all caps, small) |
| `stats[].value` | string | Main number — can be a string like `"24"` |
| `stats[].valueSuffix` | string? | Optional suffix rendered smaller: `" days"` |
| `stats[].trend` | string | Trend line below the number |
| `stats[].dir` | `"up"` \| `"down"` | Controls green/red trend colour |
| `lineChartData.labels` | string[] | X-axis labels for the activity chart |
| `lineChartData.data` | number[] | Data points matching labels |
| `emailsUrgent[].priority` | `"red"` \| `"yellow"` \| `""` | Badge shown on email row |
| `calWeek[].color` | `"green"` \| `"yellow"` \| `"red"` \| `"accent"` \| `"muted"` | Left border colour of calendar event |
| `flags[].type` | `"red"` \| `"yellow"` \| `"green"` | Controls flag background colour |
| `flags[].text` | HTML string | Can contain `<strong>` for bold |
| `sharpRec` | HTML string | The sharp recommendation callout. Can use `<strong>` and `<br>` |
| `dayPlan[].warn` | boolean | Shows "Violations" badge on the accordion header |
| `dayPlan[].blocks` | HTML string[] | Each block is a `<div>` — can use `<strong>` and `<strong class="warn">` |

---

## Installing the Plugin

Run this in Terminal (one time):

```bash
cp -r "/Users/aydenatkinson/Documents/Obsidian + Claude Files/Ayden AI Brain/03 Projects/Digital Designer/04 System/assistant-dashboard-plugin" \
      "/Users/aydenatkinson/Documents/Obsidian + Claude Files/Ayden AI Brain/.obsidian/plugins/assistant-dashboard"
```

Then in Obsidian: **Settings → Community Plugins → enable "Assistant Dashboard"**

The dashboard icon will appear in the left ribbon. Click it to open the tab.

---

## Refreshing Data

- **Refresh button** (top-right of dashboard) — reloads the latest brief from disk, re-renders everything
- **Command palette** → `Refresh Assistant Dashboard` — same effect
- Close and reopen the tab — full reload

---

## Updating the Plugin

If `dashboard-template.html` or `main.js` changes in `04 System/assistant-dashboard-plugin/`, re-run the `cp` command above to copy updated files into the installed plugin. Then reload Obsidian or disable/re-enable the plugin.
