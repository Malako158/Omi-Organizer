'use strict';

const { Plugin, ItemView } = require('obsidian');

const VIEW_TYPE = 'assistant-dashboard';
const BRIEF_FOLDER = '03 Projects/Assistant/05 Dashboard Output';

// ─── DEFAULT DATA (May 24 2026 brief — fallback when no JSON block found) ────
const DEFAULT_DATA = {
  date: '2026-05-24',
  emailBadge: 2,
  calBadge: 5,
  taskBadge: 5,
  emailTabCounts: [2, 4, 4],
  calHeader: ['Week of May 24 — 30', '5 flags · Miami Sat May 30'],
  todayLabel: 'Today — Sunday',
  overviewToday: {
    icon: '\u{1F6E1}️',
    line1: 'Protected Sunday — no work today.',
    line2: 'Reset prep only · Max 2h if anything'
  },
  overviewTasksTitle: 'Mon Priority Tasks',
  stats: [
    { label: 'Urgent Emails', value: '2', trend: '4 resolved since Sat', dir: 'up' },
    { label: 'Tasks This Week', value: '5', trend: 'Non-negotiable — all due Fri', dir: 'down' },
    { label: 'Miami In', value: '6', valueSuffix: ' days', trend: 'Hard deadline: Fri 5 PM', dir: 'down' }
  ],
  lineChartData: {
    labels: ['9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm'],
    data: [2,5,8,4,1,3,2,0,0]
  },
  emailsUrgent: [
    { from: 'Notion (self)', subject: 'Send voice memo to Helen', action: 'New task — do Monday Block 1, before her 5 PM brief.', time: 'Today', priority: 'red' },
    { from: 'Calendar', subject: 'Meeting w/ Rion Mon 12-12:30 PM (UNCONFIRMED)', action: 'Rion has NOT confirmed. Eats lunch on a Gym Day. Cancel if no reply by 11 AM Monday.', time: 'Mon', priority: 'yellow' }
  ],
  emailsResolved: [
    { from: 'HubSign', subject: 'Helen editor contract — fully signed', action: 'Both parties completed. Done.', time: 'Sat', priority: '' },
    { from: 'Calendar', subject: 'Leanne confirmed — Wed May 27, 12-1 PM', action: 'Meeting is on. Google Meet: meet.google.com/ddy-npoq-nvy', time: 'Sat', priority: '' },
    { from: 'Calendar', subject: 'Helen accepted Weekly Brief — Mon 5:00-5:15 PM', action: 'Google Meet: meet.google.com/fzy-pzmb-jes', time: 'Sat', priority: '' },
    { from: 'Calendar', subject: 'Haircut booked — Mon May 25, 10:00-11:00 AM', action: 'Already on the calendar.', time: 'Sat', priority: '' }
  ],
  emailsNoise: [
    { from: 'Dropbox (x2)', subject: 'Storage plan promotions', action: 'Ignore.', time: '-', priority: '' },
    { from: 'LinkedIn (x2)', subject: 'Profile view, connection suggestion', action: 'Ignore.', time: '-', priority: '' }
  ],
  calWeekend: [
    { time: 'All day', title: 'Protected Sunday — no work', sub: 'Sunday May 24 — Reset prep only, max 2h if anything', warn: '', color: 'green' }
  ],
  calWeek: [
    { time: 'Mon 6:15', title: 'Gym', sub: 'Monday May 25 — 6:15-7:45 AM', warn: '', color: 'green' },
    { time: 'Mon 8:30', title: 'Block 1 — Short tasks (pre-haircut)', sub: 'Monday May 25 — 8:30-10:00 AM — ~90 min only', warn: 'Haircut at 10 breaks Block 1 — short tasks only', color: 'yellow' },
    { time: 'Mon 10:00', title: 'Haircut', sub: 'Monday May 25 — 10:00-11:00 AM — Already booked', warn: '', color: 'muted' },
    { time: 'Mon 12:00', title: 'Meeting w/ Rion (pixelcityvisuals)', sub: 'Monday May 25 — 12:00-12:30 PM — Google Meet', warn: 'UNCONFIRMED — cancel if no reply by 11 AM', color: 'yellow' },
    { time: 'Mon 5:00', title: 'Weekly Brief w/ Helen', sub: 'Monday May 25 — 5:00-5:15 PM — meet.google.com/fzy-pzmb-jes', warn: '', color: 'accent' },
    { time: 'Tue 7:00', title: 'Videographer hiring sprint — 5h', sub: 'Tuesday May 26 — Block 1 — 7:00 AM-12:00 PM', warn: '', color: 'accent' },
    { time: 'Wed 6:15', title: 'Gym', sub: 'Wednesday May 27 — 6:15-7:45 AM', warn: '', color: 'green' },
    { time: 'Wed 12:00', title: 'Follow Up Meeting — Leanne (confirmed)', sub: 'Wednesday May 27 — 12:00-1:00 PM — meet.google.com/ddy-npoq-nvy', warn: '', color: 'green' },
    { time: 'Wed 7:00', title: 'ALVION Biweekly Meeting', sub: '295 Robinson St, Oakville — 7:00-8:00 PM', warn: '', color: 'accent' },
    { time: 'Thu 7:00', title: 'Miami legal info + strategy', sub: 'Thursday May 28 — Block 1 — 7:00 AM-12:00 PM', warn: '', color: 'accent' },
    { time: 'Fri 6:15', title: 'Gym', sub: 'Friday May 29 — 6:15-7:45 AM', warn: '', color: 'green' },
    { time: 'Fri 8:30', title: 'Meeting w/ Maverick', sub: 'Friday May 29 — 8:30-9:00 AM — Google Meet (recurring)', warn: 'Block 1 violation on Gym Day', color: 'yellow' },
    { time: 'Fri 10:00', title: 'Weekly Report', sub: 'Friday May 29 — 10:00-11:00 AM — ACE Coworking', warn: '', color: 'yellow' },
    { time: 'Fri 11:00', title: 'ALVION Founders Weekly', sub: 'Friday May 29 — 11:00 AM-1:00 PM — ACE Coworking', warn: 'Block 1 completely consumed — no deep work Friday', color: 'red' },
    { time: 'Sat May 30', title: 'Miami', sub: 'Saturday May 30 — Trip begins — Hard deadline: Fri 5 PM', warn: '', color: 'accent' }
  ],
  tasksHigh: [
    { label: 'Send voice memo to Helen', done: false, priority: 'red' },
    { label: "Check Chris's contract", done: false, priority: 'red' },
    { label: 'Organize Resimate files', done: false, priority: 'yellow' },
    { label: 'Find videographer — screen Andres, Evan, Naman, send responses', done: false, priority: 'red' },
    { label: 'Figure out Miami legal info (passport, ESTA, US entry)', done: false, priority: 'red' }
  ],
  tasksMedium: [
    { label: 'Start building ALVION content style', done: false, priority: 'yellow' },
    { label: 'Deep Dive Claude Workflow', done: false, priority: 'yellow' },
    { label: 'Study 910 Academy course', done: false, priority: '' }
  ],
  tasksBacklog: [
    { label: 'Make 2 real-estate edits for Katrina', done: false, priority: '' },
    { label: 'Editor Onboarding Process', done: false, priority: '' },
    { label: 'Update Prospect Labs Service Delivery Workflow', done: false, priority: '' },
    { label: 'Create file / Resimate Extra Shoots doc', done: false, priority: '' },
    { label: 'Get Boating License', done: false, priority: '' }
  ],
  senders: [
    { label: 'LinkedIn', value: 2 },
    { label: 'Dropbox', value: 2 },
    { label: 'Calendar (resolved)', value: 3 },
    { label: 'Notion (self)', value: 1 },
    { label: 'HubSign', value: 1 }
  ],
  progressItems: [
    { label: 'High priority tasks closed', done: 0, total: 5 },
    { label: 'Videographer candidates reviewed', done: 0, total: 3 },
    { label: 'Miami prep complete', done: 0, total: 1 }
  ],
  priorities: [
    {
      title: 'Figure out Miami legal info',
      sub: 'Trip is Saturday. Passport check, ESTA, US entry requirements as a Canadian, anything business-related. You need to know you’re clear before you get to the airport. Thursday Block 1, first thing — non-negotiable.'
    },
    {
      title: 'Videographer hiring sprint',
      sub: '3 candidates waiting — Andres, Evan, Naman. Screen all portfolios, shortlist, send interview requests and rejection emails. Tuesday Block 1, 7 AM–12 PM. Pipeline is live — move now.'
    },
    {
      title: 'Leanne meeting prep — Wed May 27',
      sub: 'Leanne confirmed — meeting is on at 12:00 PM. Pull your notes, know what you want out of the call. 15 min of prep Wednesday before noon is all it takes.'
    }
  ],
  flags: [
    { type: 'red', text: '<strong>Miami is Saturday May 30.</strong> Hard deadline for everything is Friday 5 PM. Nothing carries over. Miami legal info is now a must-do, not a maybe — Thursday morning, first thing.' },
    { type: 'yellow', text: '<strong>Monday Block 1 is broken.</strong> Haircut at 10 AM cuts the morning into ~90 min and ~30 min chunks. Short, completable tasks only on Monday — no deep focus work.' },
    { type: 'yellow', text: '<strong>Rion meeting Mon 12–12:30 PM is unconfirmed.</strong> If no reply by 11 AM Monday, drop it and reclaim the time.' },
    { type: 'yellow', text: '<strong>Friday is a full meeting day.</strong> Maverick (8:30), Weekly Report (10), ALVION Founders (11–1). No creative Block 1 possible. All deep work must land Mon–Thu.' },
    { type: 'green', text: '<strong>Tuesday and Thursday are completely clear.</strong> Guard them — they’re your only real deep work windows this week with Miami on Saturday.' }
  ],
  sharpRec: '<strong>This week has a hard deadline most weeks don’t: Friday 5 PM.</strong> Miami Saturday means you can’t push anything. Tuesday and Thursday are your fortress days — Tuesday for the videographer sprint, Thursday for Miami legal and strategy. Wednesday Block 1 is your only real production window — guard it. Monday is fragmented by the haircut, so keep it to short tasks. Friday is gone to meetings.<br><br>The pattern: <strong>Mon = short tasks + admin &middot; Tue = hiring sprint &middot; Wed = production + Leanne + ALVION &middot; Thu = Miami prep + strategy &middot; Fri = meetings + pack.</strong> Leave Friday with nothing hanging.',
  dayPlan: [
    {
      title: 'Monday May 25', meta: 'Gym Day — disrupted', warn: true,
      blocks: [
        '<strong>6:15-7:45 AM</strong> — Gym',
        '<strong>8:30-10:00 AM</strong> — Organize Resimate files (90 min pre-haircut — short task)',
        '<strong>10:00-11:00 AM</strong> — Haircut',
        '<strong>11:30-11:55 AM</strong> — Send voice memo to Helen',
        '<strong class="warn">12:00-12:30 PM — Meeting w/ Rion (only if confirmed — cancel by 11 AM if not)</strong>',
        '<strong>12:30-1:15 PM</strong> — Lunch',
        "<strong>1:15-2:30 PM</strong> — Check Chris's contract",
        '<strong>2:30-4:00 PM</strong> — Videographer pipeline — check Indeed, note where each candidate stands',
        '<strong>4:00-5:00 PM</strong> — Admin + email clear',
        '<strong>5:00-5:15 PM</strong> — Weekly Brief w/ Helen — meet.google.com/fzy-pzmb-jes'
      ]
    },
    {
      title: 'Tuesday May 26', meta: 'Work Day — Biggest Day', warn: false,
      blocks: [
        '<strong>7:00-10:30 AM</strong> — Videographer sprint — review all portfolios (Andres, Evan, Naman), score each one',
        '<strong>10:30-12:00 PM</strong> — Draft + send outreach to top candidates; rejections to weak ones',
        '<strong>12:00-1:00 PM</strong> — Lunch',
        '<strong>1:00-2:30 PM</strong> — ALVION content style — start building it out',
        '<strong>2:30-3:30 PM</strong> — Admin + client comms',
        '<strong>3:30 PM</strong> — Done'
      ]
    },
    {
      title: 'Wednesday May 27', meta: 'Gym Day + Leanne + ALVION Evening', warn: false,
      blocks: [
        '<strong>6:15-7:45 AM</strong> — Gym',
        '<strong>8:30-11:45 AM</strong> — Production work — video editing / client deliverables',
        '<strong>11:45-12:00 PM</strong> — Prep for Leanne meeting',
        '<strong>12:00-1:00 PM</strong> — Follow Up Meeting — Leanne — meet.google.com/ddy-npoq-nvy',
        '<strong>1:00-1:45 PM</strong> — Lunch',
        '<strong>1:45-3:30 PM</strong> — ALVION content style — continue build',
        '<strong>3:30-5:00 PM</strong> — Hiring follow-ups + editor briefs to Vietnam/India by 5 PM',
        '<strong>7:00-8:00 PM</strong> — ALVION Biweekly Meeting — 295 Robinson St, Oakville'
      ]
    },
    {
      title: 'Thursday May 28', meta: 'Work Day — Strategy + Miami Prep', warn: false,
      blocks: [
        '<strong>7:00-9:30 AM</strong> — Figure out Miami legal info — passport check, ESTA, US entry requirements, business considerations',
        '<strong>9:30-12:00 PM</strong> — Deep Dive Claude Workflow (only if Miami legal is done)',
        '<strong>12:00-1:00 PM</strong> — Lunch',
        '<strong>1:00-2:30 PM</strong> — Proposals / outreach / biz dev',
        '<strong>2:30-3:30 PM</strong> — Editor management — review output, prep briefs',
        '<strong>3:30-4:00 PM</strong> — Miami packing list + logistics',
        '<strong>4:00 PM</strong> — Done early — Miami Saturday'
      ]
    },
    {
      title: 'Friday May 29', meta: 'Gym Day — Full Meeting Morning', warn: true,
      blocks: [
        '<strong>6:15-7:45 AM</strong> — Gym',
        '<strong class="warn">8:30-9:00 AM — Meeting w/ Maverick — Google Meet (recurring violation)</strong>',
        '<strong>9:00-10:00 AM</strong> — Transition / notes / light admin',
        '<strong class="warn">10:00-11:00 AM — Weekly Report — ACE Coworking</strong>',
        '<strong class="warn">11:00 AM-1:00 PM — ALVION Founders Weekly — ACE Coworking — Block 1 completely gone</strong>',
        '<strong>1:30-3:30 PM</strong> — Week review + next actions',
        '<strong>3:30-5:15 PM</strong> — Miami final prep — pack, confirm anything outstanding, tie up loose ends',
        '<strong>5:15 PM</strong> — Weekend. Shut the laptop.'
      ]
    }
  ]
};

// ─── PARSE BRIEF DATA ─────────────────────────────────────────────────────────
function parseBriefData(markdown) {
  const match = markdown.match(/```dashboard-data\s*([\s\S]*?)```/);
  if (!match) return DEFAULT_DATA;
  try {
    return JSON.parse(match[1].trim());
  } catch (e) {
    console.warn('[Assistant Dashboard] Failed to parse dashboard-data block:', e);
    return DEFAULT_DATA;
  }
}

// ─── DASHBOARD VIEW ───────────────────────────────────────────────────────────
class DashboardView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this._msgHandler = null;
  }

  getViewType() { return VIEW_TYPE; }
  getDisplayText() { return 'Assistant'; }
  getIcon() { return 'layout-dashboard'; }

  async onOpen() {
    // Clean up old message listener
    if (this._msgHandler) window.removeEventListener('message', this._msgHandler);

    const container = this.containerEl.children[1];
    container.empty();
    container.style.cssText = 'padding:0;height:100%;overflow:hidden;background:#0F0F0F;';

    // Loading state
    const loader = container.createEl('div');
    loader.style.cssText = 'color:#5A5A5A;font-size:13px;padding:32px;font-family:Inter,system-ui,sans-serif;';
    loader.textContent = 'Loading brief…';

    const [data, template] = await Promise.all([
      this.plugin.loadBriefData(),
      this.plugin.loadTemplate()
    ]);

    container.empty();
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'width:100%;height:100%;border:none;display:block;';
    iframe.srcdoc = template.replace('%%DASHBOARD_DATA%%', JSON.stringify(data));
    container.appendChild(iframe);

    // Listen for refresh signal from inside the iframe
    this._msgHandler = async (e) => {
      if (e.data && e.data.type === 'assistant-refresh') {
        await this.onOpen();
      }
    };
    window.addEventListener('message', this._msgHandler);
  }

  async onClose() {
    if (this._msgHandler) {
      window.removeEventListener('message', this._msgHandler);
      this._msgHandler = null;
    }
  }
}

// ─── PLUGIN ───────────────────────────────────────────────────────────────────
module.exports = class AssistantDashboardPlugin extends Plugin {
  async onload() {
    this.registerView(VIEW_TYPE, (leaf) => new DashboardView(leaf, this));

    this.addRibbonIcon('layout-dashboard', 'Assistant Dashboard', () => this.activateView());

    this.addCommand({
      id: 'open-assistant-dashboard',
      name: 'Open Assistant Dashboard',
      callback: () => this.activateView()
    });

    this.addCommand({
      id: 'refresh-assistant-dashboard',
      name: 'Refresh Assistant Dashboard',
      callback: async () => {
        const leaves = this.app.workspace.getLeavesOfType(VIEW_TYPE);
        if (leaves.length) await leaves[0].view.onOpen();
      }
    });
  }

  async activateView() {
    const { workspace } = this.app;
    const existing = workspace.getLeavesOfType(VIEW_TYPE);
    if (existing.length) {
      workspace.revealLeaf(existing[0]);
      return;
    }
    const leaf = workspace.getLeaf('tab');
    await leaf.setViewState({ type: VIEW_TYPE, active: true });
    workspace.revealLeaf(leaf);
  }

  async loadTemplate() {
    try {
      return await this.app.vault.adapter.read(
        this.manifest.dir + '/dashboard-template.html'
      );
    } catch (e) {
      return '<html><body style="color:#F2F2F2;background:#0F0F0F;padding:32px;font-family:Inter,sans-serif;">Template not found. Make sure dashboard-template.html is in the plugin folder.</body></html>';
    }
  }

  async loadBriefData() {
    try {
      const listing = await this.app.vault.adapter.list(BRIEF_FOLDER);
      const mdFiles = (listing.files || [])
        .filter(f => f.endsWith('.md'))
        .sort()
        .reverse();
      if (!mdFiles.length) return DEFAULT_DATA;
      const content = await this.app.vault.adapter.read(mdFiles[0]);
      return parseBriefData(content);
    } catch (e) {
      console.warn('[Assistant Dashboard] Could not read brief folder:', e);
      return DEFAULT_DATA;
    }
  }
};
