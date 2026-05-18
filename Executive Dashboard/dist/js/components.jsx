// Icon set — simple inline SVGs
const Icon = {
Plus: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M8 3v10M3 8h10" strokeLinecap="round"/></svg>,
Chev: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
Up: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M8 12V4M4 8l4-4 4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
Down: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M8 4v8M4 8l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
Flat: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M4 8h8" strokeLinecap="round"/></svg>,
Warn: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M8 2.5L14.5 13h-13L8 2.5z" strokeLinejoin="round"/><path d="M8 7v3M8 11.5v.1" strokeLinecap="round"/></svg>,
Export: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M8 10V3M5 6l3-3 3 3" strokeLinecap="round" strokeLinejoin="round"/><path d="M3 10v2a1 1 0 001 1h8a1 1 0 001-1v-2" strokeLinecap="round"/></svg>,
History: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M3 8a5 5 0 105-5" strokeLinecap="round"/><path d="M3 3v3h3" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 5v3l2 1.5" strokeLinecap="round"/></svg>,
Search: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><circle cx="7" cy="7" r="4"/><path d="M10 10l3 3" strokeLinecap="round"/></svg>,
Sparkle: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M8 1.5L9.4 5.6 13.5 7 9.4 8.4 8 12.5 6.6 8.4 2.5 7 6.6 5.6z"/><path d="M13 11.5l.5 1.5 1.5.5-1.5.5-.5 1.5-.5-1.5-1.5-.5 1.5-.5z"/></svg>,
Edit: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M11 2l3 3-8.5 8.5H2.5V10.5L11 2z"/></svg>,
Spinner: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" {...p} style={{animation:'spin 0.9s linear infinite',...(p.style||{})}}><path d="M8 1.5A6.5 6.5 0 1114.5 8" opacity="0.85"/></svg>,
Teams: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M3 4h7a1 1 0 011 1v6a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" strokeLinejoin="round"/><path d="M4.5 6.5h4M6.5 6.5V10" strokeLinecap="round"/><circle cx="12.5" cy="5.5" r="1.5"/><path d="M11 9.5a2.5 2.5 0 012.5-2.5h.5a1 1 0 011 1v2.25A1.75 1.75 0 0113.25 12H13" strokeLinecap="round"/></svg>,
Linear: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" {...p}><circle cx="8" cy="8" r="5.5"/><path d="M4 8l4 4M5 5l6 6M8 4l4 4"/></svg>,
Github: (p) => <svg viewBox="0 0 16 16" fill="currentColor" {...p}><path d="M8 1.5a6.5 6.5 0 00-2.05 12.67c.32.06.44-.14.44-.31v-1.2c-1.81.4-2.19-.77-2.19-.77-.3-.75-.72-.95-.72-.95-.59-.4.04-.4.04-.4.65.05 1 .67 1 .67.58 1 1.52.71 1.89.54.06-.42.23-.71.41-.87-1.44-.16-2.96-.72-2.96-3.21 0-.71.26-1.29.67-1.75-.07-.16-.29-.82.06-1.71 0 0 .55-.17 1.8.67a6.25 6.25 0 013.27 0c1.25-.84 1.8-.67 1.8-.67.36.9.13 1.55.06 1.71.42.46.67 1.04.67 1.75 0 2.5-1.52 3.05-2.97 3.21.23.2.44.59.44 1.19v1.77c0 .17.12.37.44.31A6.5 6.5 0 008 1.5z"/></svg>,
Doc: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" {...p}><path d="M4 2h5l3 3v9a1 1 0 01-1 1H4a1 1 0 01-1-1V3a1 1 0 011-1z" strokeLinejoin="round"/><path d="M9 2v3h3M5.5 8h5M5.5 10.5h5M5.5 6h2" strokeLinecap="round"/></svg>,
Star: ({ filled, ...p }) => <svg viewBox="0 0 16 16" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.4" {...p}><path d="M8 2l1.8 3.7 4 .6-2.9 2.8.7 4L8 11.3 4.4 13.2l.7-4L2.2 6.3l4-.6L8 2z" strokeLinejoin="round" strokeLinecap="round"/></svg>,
ChevRight: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
List: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><path d="M3 4h10M3 8h10M3 12h10" strokeLinecap="round"/></svg>,
GridIcon: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" {...p}><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1"/><rect x="9" y="9" width="4.5" height="4.5" rx="1"/></svg>,
X: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round"/></svg>,
Link: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M7 9a2.5 2.5 0 003.5 0l2-2a2.5 2.5 0 00-3.5-3.5L8 4.5"/><path d="M9 7a2.5 2.5 0 00-3.5 0l-2 2A2.5 2.5 0 007 12.5L8 11.5"/></svg>,
Lock: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="7" width="10" height="7" rx="1.2"/><path d="M5.5 7V5a2.5 2.5 0 015 0v2"/></svg>,
ArrowRight: (p) => <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" {...p}><path d="M2.5 6h7M7 3.5l2.5 2.5L7 8.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const statusLabel = (s) => ({ green: 'On Track', yellow: 'At Risk', red: 'Off Track' }[s]);

function StatusPill({ status }) {
return (
<span className={`status ${status}`}>
<span className="pulse" />
{statusLabel(status)}
</span>
);
}

function ChangeBadge({ prev, current }) {
if (!prev || prev === current) return null;
const order = { green: 0, yellow: 1, red: 2 };
const worse = order[current] > order[prev];
return (
<span className={`change-badge ${worse ? 'worse' : 'better'}`}>
{worse ? <Icon.Down /> : <Icon.Up />}
{statusLabel(prev)}
<Icon.ArrowRight />
{statusLabel(current)}
</span>
);
}

function DeltaChip({ delta, unit = '', good = 'up' }) {
if (delta == null) return null;
const sign = delta > 0 ? '+' : delta < 0 ? '−' : '';
const abs = Math.abs(delta);
const isFlat = delta === 0;
let tone = 'flat';
if (!isFlat) {
const positive = (delta > 0 && good === 'up') || (delta < 0 && good === 'down');
tone = positive ? 'up' : 'down';
}
const arrow = isFlat ? <Icon.Flat /> : delta > 0 ? <Icon.Up /> : <Icon.Down />;
return (
<span className={`metric-delta ${tone}`}>
{arrow}
<span>{sign}{abs}{unit}</span>
</span>
);
}

function Metric({ m }) {
return (
<div className="metric">
<div className="metric-label">{m.label}</div>
<div className="metric-value">
<span>{m.value}</span>
<DeltaChip delta={m.delta} unit={m.unit || ''} good={m.good || 'up'} />
</div>
</div>
);
}

function Bullets({ items, variant }) {
return (
<ul className={`bullets ${variant || ''}`}>
{items.map((t, i) => (
<li key={i}>
{variant === 'risks' && <span className="warn"><Icon.Warn /></span>}
<span>{t}</span>
</li>
))}
</ul>
);
}

function ProjectCard({ p, compact, onShare, onEdit }) {
const [open, setOpen] = React.useState(false);
return (
<div className={`card status-${p.status} ${compact ? 'compact' : ''}`}>
<div className="card-head">
<div>
<div className="proj-title">
<span>{p.name}</span>
<ChangeBadge prev={p.prevStatus} current={p.status} />
</div>
<div className="meta-row">
<span className="owner">{p.owner}</span>
<span className="dot-sep">·</span>
<span className="team">{p.team}</span>
<span className="dot-sep">·</span>
<span className="mono">Updated {p.updated}</span>
</div>
</div>
<div style={{display:'flex',alignItems:'center',gap:8}}>
{onEdit && (
<button
className="btn ghost sm"
onClick={(e) => { e.stopPropagation(); onEdit(p); }}
title="Edit this project's update"
>
<Icon.Edit className="btn-icon" />
<span className="share-label">Edit</span>
</button>
)}
<button
className="btn ghost sm share-btn"
onClick={(e) => { e.stopPropagation(); onShare && onShare(p); }}
title="Copy a pre-filled submission link for this project"
>
<Icon.Link className="btn-icon" />
<span className="share-label">Share link</span>
</button>
<StatusPill status={p.status} />
</div>
</div>

<div className="proj-sections">
<div className="section-block">
<h4>Current Status <span className="count">· {p.current.length}</span></h4>
<Bullets items={p.current} />
</div>
<div className="section-block">
<h4>Next Steps <span className="count">· {p.next.length}</span></h4>
<Bullets items={p.next} variant="next" />
</div>
{p.risks && p.risks.length > 0 && (
<div className="section-block risks">
<h4>Risks / Blockers <span className="count">· {p.risks.length}</span></h4>
<Bullets items={p.risks} variant="risks" />
</div>
)}
</div>

<div className="metrics-toggle">
<button className="btn ghost sm" onClick={() => setOpen(!open)}>
{open ? 'Hide metrics' : 'View metrics'}
<Icon.Chev style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
</button>
<span className="updated-tag">{p.metrics.length} KPIs tracked</span>
</div>

<div className={`metrics ${open ? 'open' : ''}`}>
{p.metrics.map((m, i) => <Metric key={i} m={m} />)}
</div>
</div>
);
}

function HealthDonut({ counts }) {
const total = counts.green + counts.yellow + counts.red;
const R = 38;
const C = 2 * Math.PI * R;
const segs = [
{ c: 'var(--green)', v: counts.green },
{ c: 'var(--amber)', v: counts.yellow },
{ c: 'var(--red)', v: counts.red },
];
let offset = 0;
return (
<svg className="donut" viewBox="0 0 92 92">
<circle className="track" cx="46" cy="46" r={R} />
{segs.map((s, i) => {
const len = (s.v / total) * C;
const el = (
<circle
key={i}
cx="46" cy="46" r={R}
stroke={s.c}
strokeDasharray={`${len} ${C}`}
strokeDashoffset={-offset}
strokeLinecap="butt"
transform="rotate(-90 46 46)"
/>
);
offset += len;
return el;
})}
<text x="46" y="44" textAnchor="middle" fontSize="18" fontWeight="600" fill="var(--ink)" fontFamily="Inter" letterSpacing="-0.02em">{total}</text>
<text x="46" y="58" textAnchor="middle" fontSize="9" fill="var(--muted)" fontFamily="JetBrains Mono" letterSpacing="0.1em">PROJECTS</text>
</svg>
);
}

function ExecutiveSummary({ data, projects }) {
const counts = {
green: projects.filter(p => p.status === 'green').length,
yellow: projects.filter(p => p.status === 'yellow').length,
red: projects.filter(p => p.status === 'red').length,
};
return (
<div className="summary">
<div className="summary-left">
<div className="summary-head">
<span className="summary-badge"><span className="dot"></span>Live Summary</span>
</div>
<div className="summary-title" style={{ marginTop: 10 }}>Portfolio health, this week</div>
<div className="mono">Auto-generated · 14:02 UTC</div>
<div className="health-ring">
<HealthDonut counts={counts} />
<div className="health-legend">
<div className="row"><span className="dot" style={{ background: 'var(--green)' }} /><span className="count">{counts.green}</span><span className="label">On Track</span></div>
<div className="row"><span className="dot" style={{ background: 'var(--amber)' }} /><span className="count">{counts.yellow}</span><span className="label">At Risk</span></div>
<div className="row"><span className="dot" style={{ background: 'var(--red)' }} /><span className="count">{counts.red}</span><span className="label">Off Track</span></div>
</div>
</div>
</div>
<div className="summary-bullets">
{data.bullets.map((b, i) => (
<div key={i} className={`sum-item ${b.tone}`}>
<span className="marker" />
<span>{b.text}</span>
</div>
))}
</div>
</div>
);
}

function UpdateForm({ onClose, onSubmit, projects, lockedProjectId, editProject }) {
const lockedProject = lockedProjectId ? projects.find(p => p.id === lockedProjectId) : null;
const isEditing = !!editProject;
const [mode, setMode] = React.useState(isEditing ? 'manual' : 'paste');
const [raw, setRaw] = React.useState('');
const [parsing, setParsing] = React.useState(false);
const [parseError, setParseError] = React.useState('');
const [parsed, setParsed] = React.useState(null);
const [form, setForm] = React.useState({
name: editProject ? editProject.name : (lockedProject ? lockedProject.name : ''),
owner: editProject ? editProject.owner : (lockedProject ? lockedProject.owner : ''),
team: editProject ? editProject.team : (lockedProject ? lockedProject.team : ''),
status: editProject ? editProject.status : (lockedProject ? lockedProject.status : 'green'),
current: editProject ? (editProject.current || []).join('\n') : '',
next: editProject ? (editProject.next || []).join('\n') : '',
risks: editProject ? (editProject.risks || []).join('\n') : '',
matchedProjectId: editProject ? editProject.id : (lockedProjectId || ''),
_spId: editProject ? (editProject._spId || null) : null,
});
const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

const applyParse = (p) => {
setParsed(p);
const matched = projects.find(x => x.id === p.fields.matchedProjectId);
setForm({
name: matched ? matched.name : (p.fields.name || ''),
owner: matched ? matched.owner : (p.fields.owner || ''),
team: matched ? matched.team : (p.fields.team || ''),
status: p.fields.status || 'green',
current: (p.fields.current || []).join('\n'),
next: (p.fields.next || []).join('\n'),
risks: (p.fields.risks || []).join('\n'),
matchedProjectId: matched ? matched.id : '',
_spId: null,
});
setMode('manual');
};

const parseWithAI = async () => {
if (!raw.trim()) return;
setParsing(true);
setParseError('');
const projectList = projects.map(p => `- ${p.id}: "${p.name}" (owner: ${p.owner}, team: ${p.team})`).join('\n');
const prompt = `You are parsing a casual status update into structured data for a project tracker.

Known projects (match by id if the text clearly refers to one):
${projectList}

Statuses: "green" (On Track), "yellow" (At Risk), "red" (Off Track).

Parse the following update into JSON with this exact shape:
{
"matchedProjectId": "<id from list, or empty string if no clear match>",
"name": "<project name if new, empty if matched>",
"owner": "<owner name or empty>",
"team": "<team name or empty>",
"status": "green" | "yellow" | "red",
"current": ["bullet", ...],
"next": ["bullet", ...],
"risks": ["bullet", ...],
"confidence": <0.0 to 1.0>,
"confidenceNotes": "<one short sentence on what's uncertain>"
}

Return ONLY valid JSON, no other text.

Update to parse:
"""
${raw}
"""`;

try {
const response = await window.claude.complete(prompt);
const clean = response.replace(/^\s*```(?:json)?/i, '').replace(/```\s*$/, '').trim();
const data = JSON.parse(clean);
applyParse({ confidence: data.confidence ?? 0.7, notes: data.confidenceNotes || '', fields: data });
} catch (err) {
setParseError('Could not parse that update. Try rephrasing or use manual entry.');
} finally {
setParsing(false);
}
};

const submit = (e) => {
e && e.preventDefault();
const toBullets = (s) => s.split('\n').map(t => t.trim()).filter(Boolean);
const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
onSubmit({
...(editProject || {}),
id: form.matchedProjectId || editProject?.id || 'new-' + Date.now(),
name: form.name || 'Untitled Project',
owner: form.owner || 'Unassigned',
team: form.team || '—',
updated: today,
status: form.status,
prevStatus: editProject ? editProject.status : form.status,
featured: editProject ? editProject.featured : false,
current: toBullets(form.current),
next: toBullets(form.next),
risks: toBullets(form.risks),
metrics: editProject ? (editProject.metrics || []) : [],
_spId: form._spId || editProject?._spId || null,
});
};

const examples = [
"Mobile launch update: still at risk this week. iOS is good, 240 testers in TestFlight, but Android review is blocked and the payments SDK vendor missed their QA deadline. Next up: escalate with our partner contact and rehearse launch-day war room Thursday.",
"Revenue Dashboard — all green. Finance + RevOps fully onboarded. WAU hit 312, up 28%. Next: open GA to sales leadership and ship cohort retention view.",
];

const confidenceColor = (c) => c > 0.8 ? 'var(--green)' : c > 0.55 ? 'var(--amber)' : 'var(--red)';
const confidenceLabel = (c) => c > 0.8 ? 'High confidence' : c > 0.55 ? 'Medium confidence' : 'Low confidence';

return (
<div className="modal-backdrop" onClick={onClose}>
<form className="modal modal-wide" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
<div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:16}}>
<div>
<h3>{isEditing ? `Edit: ${editProject.name}` : 'Submit weekly update'}</h3>
{lockedProject ? (
<p className="muted" style={{marginBottom:0, display:'flex', alignItems:'center', gap:8}}>
<Icon.Lock style={{width:13,height:13,color:'var(--muted)'}} />
<span>Submitting an update for <strong style={{color:'var(--ink)'}}>{lockedProject.name}</strong> · <span className="mono" style={{fontSize:12}}>{lockedProject.owner}</span></span>
</p>
) : isEditing ? (
<p className="muted" style={{marginBottom:0}}>Editing current update. Changes will sync to SharePoint.</p>
) : (
<p className="muted" style={{marginBottom:0}}>Paste a free-text update and let AI structure it, or fill fields manually.</p>
)}
</div>
<button type="button" className="btn ghost sm" onClick={onClose} aria-label="Close"><Icon.X /></button>
</div>

{!isEditing && (
<div className="mode-tabs">
<button type="button" className={'mode-tab ' + (mode === 'paste' ? 'on' : '')} onClick={() => setMode('paste')}>
<Icon.Sparkle /> Paste an update
</button>
<button type="button" className={'mode-tab ' + (mode === 'manual' ? 'on' : '')} onClick={() => setMode('manual')}>
<Icon.Edit /> Manual entry
</button>
{parsed && (
<span className="parse-badge" style={{marginLeft:'auto'}}>
<span className="dot" style={{background:confidenceColor(parsed.confidence)}}></span>
{confidenceLabel(parsed.confidence)} · {Math.round(parsed.confidence * 100)}%
</span>
)}
</div>
)}

{mode === 'paste' && !isEditing ? (
<div className="paste-pane">
<textarea
className="paste-textarea"
placeholder="Paste or type your update in plain English. Mention the project, what changed, what's next, and any blockers."
value={raw}
onChange={(e) => setRaw(e.target.value)}
rows={8}
/>
<div className="paste-examples">
<span className="label">Try:</span>
{examples.map((ex, i) => (
<button key={i} type="button" className="example-btn" onClick={() => setRaw(ex)}>
Example {i + 1}
</button>
))}
</div>
{parseError && <div className="parse-error">{parseError}</div>}
{parsed && parsed.notes && (
<div className="parse-notes">
<strong>Notes:</strong> {parsed.notes}
</div>
)}
<div className="form-actions">
<button type="button" className="btn" onClick={onClose}>Cancel</button>
<button type="button" className="btn primary" onClick={parseWithAI} disabled={parsing || !raw.trim()}>
{parsing ? <><Icon.Spinner /> Parsing…</> : <><Icon.Sparkle /> Parse with AI</>}
</button>
</div>
</div>
) : (
<div className="manual-pane">
{parsed && !isEditing && (
<div className="parse-summary">
<Icon.Sparkle style={{color: confidenceColor(parsed.confidence)}} />
<span>AI populated these fields from your update. Review and edit anything before submitting.</span>
<button type="button" className="btn sm ghost" onClick={() => setMode('paste')}>Re-parse</button>
</div>
)}
<div className="form-grid">
<div className="form-field full">
<label>Project {parsed && parsed.fields.matchedProjectId && <span className="field-tag ok">Matched existing</span>}{lockedProject && <span className="field-tag ok"><Icon.Lock style={{width:10,height:10,marginRight:3}}/>Locked</span>}{isEditing && <span className="field-tag ok"><Icon.Edit style={{width:10,height:10,marginRight:3}}/>Editing</span>}</label>
{lockedProject || isEditing ? (
<div style={{padding:'10px 12px', border:'1px solid var(--line-3)', borderRadius:8, background:'#F5F5F5', color:'var(--ink)', fontSize:14, display:'flex', alignItems:'center', gap:8}}>
<Icon.Lock style={{width:13,height:13,color:'var(--muted)'}} />
<span>{isEditing ? editProject.name : lockedProject.name}</span>
<span style={{color:'var(--muted-2)',margin:'0 4px'}}>·</span>
<span className="mono" style={{color:'var(--muted)', fontSize:12.5}}>{isEditing ? editProject.team : lockedProject.team}</span>
</div>
) : parsed && parsed.fields.matchedProjectId ? (
<select value={form.matchedProjectId} onChange={(e) => {
const matched = projects.find(p => p.id === e.target.value);
setForm({...form, matchedProjectId: e.target.value, name: matched?.name || form.name, owner: matched?.owner || form.owner, team: matched?.team || form.team});
}}>
<option value="">— New project —</option>
{projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
</select>
) : (
<input value={form.name} onChange={update('name')} placeholder="e.g. Partner API GA" required />
)}
</div>
<div className="form-field">
<label>Owner</label>
<input value={form.owner} onChange={update('owner')} placeholder="Full name" required />
</div>
<div className="form-field">
<label>Team</label>
<input value={form.team} onChange={update('team')} placeholder="e.g. Platform" />
</div>
<div className="form-field full">
<label>Status</label>
<div className="status-picker">
{['green','yellow','red'].map(s => (
<label key={s} className={form.status === s ? `sel-${s}` : ''}>
<input type="radio" name="status" value={s} checked={form.status === s} onChange={update('status')} />
<span className="swatch" style={{ background: `var(--${s === 'green' ? 'green' : s === 'yellow' ? 'amber' : 'red'})` }} />
<span>{statusLabel(s)}</span>
</label>
))}
</div>
</div>
<div className="form-field full">
<label>Current status · one bullet per line</label>
<textarea value={form.current} onChange={update('current')} placeholder={'Core API integration shipped\nBeta with 5 customers'} />
</div>
<div className="form-field full">
<label>Next steps · one bullet per line</label>
<textarea value={form.next} onChange={update('next')} />
</div>
<div className="form-field full">
<label>Risks / blockers · one bullet per line</label>
<textarea value={form.risks} onChange={update('risks')} placeholder="Waiting on vendor API approval" />
</div>
</div>
<div className="form-actions">
<button type="button" className="btn" onClick={onClose}>Cancel</button>
<button type="submit" className="btn primary">{isEditing ? 'Save changes' : 'Submit update'}</button>
</div>
</div>
)}
</form>
</div>
);
}

function Tweaks({ state, setState }) {
const [visible, setVisible] = React.useState(false);
React.useEffect(() => {
const handler = (e) => {
if (e.data?.type === '__activate_edit_mode') setVisible(true);
if (e.data?.type === '__deactivate_edit_mode') setVisible(false);
};
window.addEventListener('message', handler);
window.parent.postMessage({ type: '__edit_mode_available' }, '*');
return () => window.removeEventListener('message', handler);
}, []);
if (!visible) return null;
const toggle = (k) => () => {
const next = { ...state, [k]: !state[k] };
setState(next);
window.parent.postMessage({ type: '__edit_mode_set_keys', edits: { [k]: next[k] } }, '*');
};
return (
<div className="tweaks">
<h5>Tweaks</h5>
<div className="tweak-row">
<span>Executive Summary</span>
<button className={`toggle ${state.showSummary ? 'on' : ''}`} onClick={toggle('showSummary')} />
</div>
<div className="tweak-row">
<span>Compact density</span>
<button className={`toggle ${state.compact ? 'on' : ''}`} onClick={toggle('compact')} />
</div>
</div>
);
}

function Toast({ msg }) {
if (!msg) return null;
return <div className="toast">{msg}</div>;
}

Object.assign(window, { Icon, StatusPill, ChangeBadge, ProjectCard, ExecutiveSummary, UpdateForm, Tweaks, Toast, HealthDonut, statusLabel });
