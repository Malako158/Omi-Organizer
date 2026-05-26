# Skill: Omi Organizer

Scan the Omi Collection, classify new content by topic, and route it into organized memory
files. Run once or twice a day to keep the vault clean and Claude's context current.

## When to Use

- User says "organize my Omi", "run the Omi organizer", or "process my Omi notes"
- User triggers it on a schedule (once or twice daily)
- Omi Collection has new daily files that haven't been processed yet

---

## How It Works

1. Fetch all active tasks from Notion and sync them into `Omi Memory/Tasks.md`
2. Scan `Omi Collection/` for daily files
3. Check which dates have already been processed (via `Omi Memory/_processed.md`)
4. Read `overview.md` and `action-items.md` for each unprocessed date
5. Classify each conversation and action item by topic
6. Append new entries to the relevant topic files in `Omi Memory/`
7. Scan active projects and update any project CLAUDE.md files with relevant new context
8. Mark the date as processed
9. Print a brief summary of what was organized

---

## Phase 0: Sync Notion Tasks

Before processing Omi, fetch all active tasks from Notion and write them into `Omi Memory/Tasks.md` under a `## Notion Tasks` section. This keeps all tasks — from Omi and Notion — in one place.

**Fetch active Notion tasks via curl:**

```bash
curl -s "https://api.notion.com/v1/databases/2f55b015-d19d-8194-9010-e776c2480c18/query" \
  -H "Authorization: Bearer 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" \
  -H "Notion-Version: 2022-06-28" \
  -H "Content-Type: application/json" \
  -d '{
    "filter": {
      "and": [
        {"property": "Status", "status": {"does_not_equal": "Done"}}
      ]
    },
    "page_size": 100
  }'
```

**Parse the response and extract for each task:**
- `Name` → title text
- `Status` → status name (Inbox, To-Do, Doing, Waiting)
- `Priority` → select name (High, Medium, Low) — may be empty
- `Due Date` → date field — may be empty

**Write to `Omi Memory/Tasks.md`:**

Replace (or create) the `## Notion Tasks` section at the TOP of the file, above all Omi date entries. Format:

```markdown
# Tasks

_Last updated: YYYY-MM-DD_

---

## Notion Tasks
_Synced: YYYY-MM-DD HH:MM_

### 🔴 Doing
- [ ] [Task name]

### 🟡 To-Do
- [ ] [Task name] _(High)_
- [ ] [Task name]

### ⏳ Waiting
- [ ] [Task name]

### 📥 Inbox
- [ ] [Task name]

---
```

**Rules:**
- Group tasks by Status: Doing → To-Do → Waiting → Inbox
- Within To-Do, sort High priority first — add `_(High)_` label
- Omit empty groups entirely
- Always fully replace the `## Notion Tasks` section — never append or duplicate
- Leave all Omi date entries (`## YYYY-MM-DD`) below untouched

---

## Phase 1: Scan for Unprocessed Dates

```bash
# Find all daily summary files
find "Omi Collection" -name "*.md" | grep -E "[0-9]{4}-[0-9]{2}-[0-9]{2}\.md" | sort
```

Then read `Omi Memory/_processed.md` to see which dates are already done.
Any date NOT in `_processed.md` is unprocessed — queue it for Phase 2.

If `Omi Memory/` doesn't exist yet, create the folder and all topic files from scratch.

---

## Phase 2: Read Each Unprocessed Date

For each unprocessed date (e.g. `Omi Collection/2026/05/20/`), read:
- `overview.md` — conversation summaries (the what + context)
- `action-items.md` — tasks and action items extracted by Omi

Do NOT read `transcript.md` unless you need to clarify something ambiguous in the overview.

---

## Phase 3: Classify by Topic

For each conversation/item, assign it to one or more of these topics based on content:

| Topic File | What Goes Here |
|---|---|
| `Business.md` | Revenue, clients, growth plans, milestones, strategy |
| `Workflow.md` | Systems, processes, automation, tools, operations |
| `Hiring & Team.md` | Team members, roles, hiring, contractors, profiles |
| `Projects.md` | Active client work, deliverables, revisions, deadlines |
| `AI & Tools.md` | AI usage, Omi, Claude, Obsidian, software setup |
| `Communications.md` | Client calls, conversations, follow-ups, negotiations |
| `Tasks.md` | Action items and to-dos (from action-items.md) |
| `Ideas.md` | New ideas, opportunities, things worth exploring |
| `Personal.md` | Personal context, schedule, lifestyle, non-business |

**Rules:**
- One conversation can appear in multiple topic files if it spans topics
- Be concise — extract the core insight, don't copy-paste the full summary
- Always include the source date as a link: `[[Omi Collection/2026/05/20/2026-05-20|2026-05-20]]`
- Tasks go into `Tasks.md` AND their relevant topic file if they belong to a project/workflow

---

## Phase 4: Write to Topic Files

Each topic file lives at `Omi Memory/[Topic].md`.

**File format:**

```markdown
# [Topic]

_Last updated: YYYY-MM-DD_

---

## YYYY-MM-DD
[[Omi Collection/YYYY/MM/DD/YYYY-MM-DD|Source]]

- **[Conversation Title]** — [1-2 sentence summary of what's relevant to this topic]

---
```

**Appending rules:**
- Always append new dates at the TOP of the file (newest first)
- Don't duplicate entries — if a date is already there, skip it
- Keep each entry tight — 1-3 bullet points max per conversation

**Tasks file format** (`Omi Memory/Tasks.md`):

```markdown
# Tasks

_Last updated: YYYY-MM-DD_

---

## YYYY-MM-DD
[[Omi Collection/YYYY/MM/DD/YYYY-MM-DD|Source]]

- [ ] [Task 1]
- [ ] [Task 2]

---
```

---

## Phase 5: Update Processed Log

After writing all topic files, append the processed date(s) to `Omi Memory/_processed.md`:

```markdown
# Processed Dates

- 2026-05-20
- 2026-05-17
```

---

## Phase 6: Update Active Project Files

After writing to `Omi Memory/`, scan each active project folder under `03 Projects/` and
check if any new Omi content is relevant to that project.

**How to find active projects:**
```bash
ls "03 Projects/"
```
Skip `(PROJECT TEMPLATE)`. Every other folder is a live project.

**For each active project, read its CLAUDE.md** to understand:
- What the project is
- Who the team is
- What clients/work is in scope

**Then check the new Omi content against these triggers:**

| If Omi mentions... | Update this section of project CLAUDE.md |
|---|---|
| New client added or lost | `## Active Clients` table |
| Team member added, removed, or role changed | `## The Team` table |
| Revenue milestone hit or target changed | `## Revenue Targets` table |
| New action items related to this project | `## Current Status` open items list |
| Major strategic shift or new direction | `## Where We're Headed` |
| Status update (e.g. project complete, new phase) | `## Current Status` |

**Update rules:**
- Only update sections where something actually changed — don't rewrite the whole file
- Always update the `> **Last updated:**` date in `## Current Status`
- Add new action items to the existing checklist, don't replace it
- If a client is removed, move them from Active Clients to a `## Past Clients` section
- If nothing relevant to a project was found in the new Omi data, skip it entirely

**If a brand new project appears in Omi that doesn't have a folder yet:**
Flag it in the summary output as: "⚠️ New project detected in Omi: [name] — run the New
Project skill to set it up."

---

## Phase 7: Summary Output

After everything is written, print a clean summary to the user:

```
✅ Omi Organizer — [DATE]

Notion sync: [N] active tasks pulled (Doing: N, To-Do: N, Waiting: N, Inbox: N)

Processed: [date1], [date2]
Conversations reviewed: [N]
Action items found: [N]

Routed to:
- Business.md — [N] entries
- Projects.md — [N] entries
- Tasks.md — [N] Omi items + [N] Notion tasks
- [other topics with entries]

Project files updated:
- [Project Name] — [what changed, e.g. "1 new client, 3 new action items"]
- (none) if no projects were updated

New action items to note:
- [list any high-priority tasks extracted, max 5]
```

Keep it brief. No fluff.

---

## Edge Cases

- **No new dates:** Print "Nothing new to process. Omi Collection is up to date." Then stop.
- **Missing topic file:** Create it from the template above, then write to it.
- **Ambiguous topic:** Default to `Business.md` if it's work-related, `Personal.md` if not.
- **Empty overview:** Skip the conversation and note it in the summary as skipped.
