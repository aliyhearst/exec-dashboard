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
  X: (p) => <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" {...p}><path d="M4 4l8 8M12 4l-8 8" strokeLinecap="round"/></svg>,
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
  // "good" tells us which direction of change is positive. 'up' = higher is better.
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

function ProjectCard({ p, compact }) {
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
        <StatusPill status={p.status} />
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
          <span className="summary-badge">AI Summary</span>
        </div>
        <div className="summary-title" style={{ marginTop: 10 }}>Portfolio health this week</div>
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

function UpdateForm({ onClose, onSubmit }) {
  const [form, setForm] = React.useState({
    name: '', owner: '', team: '', status: 'green',
    current: '', next: '', risks: '',
  });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const toBullets = (s) => s.split('\n').map(t => t.trim()).filter(Boolean);
    onSubmit({
      id: 'new-' + Date.now(),
      name: form.name || 'Untitled Project',
      owner: form.owner || 'Unassigned',
      team: form.team || '—',
      updated: 'Apr 21',
      status: form.status,
      prevStatus: form.status,
      featured: false,
      current: toBullets(form.current),
      next: toBullets(form.next),
      risks: toBullets(form.risks),
      metrics: [],
    });
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
        <h3>Submit weekly update</h3>
        <p className="muted">Teams can submit updates here. In future this will pull from Slack, Linear, Jira, or Google Sheets.</p>
        <div className="form-grid">
          <div className="form-field">
            <label>Project name</label>
            <input value={form.name} onChange={update('name')} placeholder="e.g. Partner API GA" required />
          </div>
          <div className="form-field">
            <label>Owner</label>
            <input value={form.owner} onChange={update('owner')} placeholder="Full name" required />
          </div>
          <div className="form-field">
            <label>Team</label>
            <input value={form.team} onChange={update('team')} placeholder="e.g. Platform" />
          </div>
          <div className="form-field">
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
            <textarea value={form.current} onChange={update('current')} placeholder={`Core API integration shipped\nBeta with 5 customers`} />
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
          <button type="submit" className="btn primary">Submit update</button>
        </div>
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
