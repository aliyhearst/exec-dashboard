
const { useState, useEffect, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showSummary": true,
  "compact": false,
  "defaultView": "list"
}/*EDITMODE-END*/;

// Pick the single most important line for the focus cell
function ChannelChip({ channel, unread, onClick }) {
  if (!channel) return null;
  return (
    <button className="chan-btn" onClick={(e) => { e.stopPropagation(); onClick && onClick(); }} title={'Teams: #' + channel + (unread ? ' — ' + unread + ' unread' : '')}>
      <Icon.Teams />
      <span>#{channel}</span>
      {unread > 0 && <span className="unread-dot" />}
    </button>
  );
}

function ConnectedSection({ p }) {
  const connectorIcon = { linear: <Icon.Linear />, github: <Icon.Github />, doc: <Icon.Doc /> };
  const connectorLabel = { linear: 'Linear', github: 'GitHub', doc: 'Doc' };
  return (
    <div className="exp-connected">
      <span className="label">Connected</span>
      {p.channel && (
        <a className="conn-chip primary" onClick={(e) => e.preventDefault()} href="#">
          <Icon.Teams />
          <span className="mono">#{p.channel}</span>
          {p.unread > 0 && <span className="count">{p.unread}</span>}
          <span className="activity">· {p.lastActivity}</span>
        </a>
      )}
      {(p.connectors || []).map((c, i) => (
        <a key={i} className="conn-chip" onClick={(e) => e.preventDefault()} href="#">
          {connectorIcon[c.type]}
          <span>{connectorLabel[c.type]}</span>
          <span className="mono" style={{color:'var(--muted)'}}>{c.label}</span>
          {c.count != null && <span className="count">{c.count}</span>}
        </a>
      ))}
      <span className="connect-hint">
        <kbd>+</kbd> Add connector
      </span>
    </div>
  );
}

function pickFocus(p) {
  let tone = 'next', label = 'Next';
  if (p.status === 'red') { tone = 'risk'; label = 'Blocker'; }
  else if (p.status === 'yellow') { tone = 'atrisk'; label = 'Risk'; }
  else if (p.status === 'green') { tone = 'win'; label = 'Win'; }
  if (p.focus) return { tone, label, text: p.focus };
  if (p.status === 'red' && p.risks && p.risks[0]) return { tone, label, text: p.risks[0] };
  if (p.status === 'yellow' && p.risks && p.risks[0]) return { tone, label, text: p.risks[0] };
  if (p.status === 'green' && p.current && p.current[0]) return { tone, label, text: p.current[0] };
  if (p.next && p.next[0]) return { tone, label, text: p.next[0] };
  return null;
}

function highlight(text, q) {
  if (!q) return text;
  try {
    const re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    const parts = text.split(re);
    return parts.map((part, i) => re.test(part) ? <em key={i}>{part}</em> : <React.Fragment key={i}>{part}</React.Fragment>);
  } catch { return text; }
}

function projectMatches(p, q) {
  if (!q) return true;
  const hay = [p.name, p.owner, p.team, ...(p.current||[]), ...(p.next||[]), ...(p.risks||[])].join(' ').toLowerCase();
  return hay.includes(q.toLowerCase());
}

function SearchBar({ value, onChange, onClear }) {
  const ref = React.useRef(null);
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); ref.current?.focus(); }
      if (e.key === 'Escape' && document.activeElement === ref.current) { onClear(); ref.current?.blur(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClear]);
  return (
    <div className="search-wrap">
      <Icon.Search />
      <input ref={ref} value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search projects, owners, risks…" />
      {value ? (
        <button className="search-clear" onClick={onClear} aria-label="Clear"><Icon.X style={{width:13,height:13}}/></button>
      ) : (
        <kbd>⌘K</kbd>
      )}
    </div>
  );
}

function ExpansionRow({ p, colSpan, onShare }) {
  return (
    <tr className="expansion">
      <td colSpan={colSpan}>
        <div className="exp-inner">
          <div className="exp-col">
            <h4>Current · {p.current.length}</h4>
            <Bullets items={p.current} />
          </div>
          <div className="exp-col">
            <h4>Next steps · {p.next.length}</h4>
            <Bullets items={p.next} variant="next" />
          </div>
          {p.risks && p.risks.length > 0 && (
            <div className="exp-risks" style={{ gridColumn: '1 / -1' }}>
              <strong>Risks &amp; Blockers</strong>
              <ul>{p.risks.map((r, i) => <li key={i}>{r}</li>)}</ul>
            </div>
          )}
          <ConnectedSection p={p} />
          {p.metrics && p.metrics.length > 0 && (
            <div className="exp-metrics">
              {p.metrics.map((m, i) => <Metric key={i} m={m} />)}
            </div>
          )}
          {onShare && (
            <div className="exp-actions" style={{ gridColumn: '1 / -1' }}>
              <button className="btn sm" onClick={(e) => { e.stopPropagation(); onShare(p); }}>
                <Icon.Link className="btn-icon" />
                Share submission link for {p.name}
              </button>
              <span className="exp-actions-hint">
                Sends a pre-filled, project-locked form link this project's contributors can fill out.
              </span>
            </div>
          )}
        </div>
      </td>
    </tr>
  );
}

function Row({ p, q, expanded, onToggle, onStar, starred, onShare }) {
  const focus = pickFocus(p);
  return (
    <>
      <tr className={'row ' + (expanded ? 'expanded' : '')} onClick={onToggle}>
        <td className="col-name">
          <div className="td-name-inner">
            <Icon.ChevRight className={'caret ' + (expanded ? 'open' : '')} />
            <button className={'star-btn ' + (starred ? 'on' : '')} onClick={(e) => { e.stopPropagation(); onStar(); }} aria-label="Pin">
              <Icon.Star filled={starred} />
            </button>
            <span style={{whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis',minWidth:0,flex:'1 1 auto'}}>{highlight(p.name, q)}</span>
            {p.prevStatus && p.prevStatus !== p.status && <ChangeBadge prev={p.prevStatus} current={p.status} />}
          </div>
        </td>
        <td className="col-status"><StatusPill status={p.status} /></td>
        <td className="col-owner">{highlight(p.owner, q)}</td>
        <td className="col-team">{p.team}</td>
        <td className="col-updated">{p.updated}</td>
        <td className="col-focus">
          {focus ? (
            <div className="focus-cell">
              <span className={'label ' + focus.tone}>{focus.label}</span>
              <span className="text">{highlight(focus.text, q)}</span>
            </div>
          ) : <span style={{color:'var(--muted-2)'}}>—</span>}
        </td>
      </tr>
      {expanded && <ExpansionRow p={p} colSpan={6} onShare={onShare} />}
    </>
  );
}

function ListView({ projects, q, starred, onStar, onShare }) {
  const [expandedId, setExpandedId] = useState(null);
  const toggle = (id) => setExpandedId(expandedId === id ? null : id);

  const pinned = projects.filter(p => starred.has(p.id));
  const rest = projects.filter(p => !starred.has(p.id));

  const renderTable = (rows) => (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Team</th>
            <th>Updated</th>
            <th>Focus</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(p => (
            <Row key={p.id} p={p} q={q}
              expanded={expandedId === p.id}
              onToggle={() => toggle(p.id)}
              starred={starred.has(p.id)}
              onStar={() => onStar(p.id)}
              onShare={onShare} />
          ))}
        </tbody>
      </table>
    </div>
  );

  if (projects.length === 0) {
    return <div className="search-empty"><span className="mono">No matches</span>Try a different search term or clear filters.</div>;
  }

  return (
    <>
      {pinned.length > 0 && (
        <>
          <div className="list-section">
            <h3>Pinned</h3>
            <span className="mono">{pinned.length}</span>
            <div className="rule"></div>
          </div>
          {renderTable(pinned)}
        </>
      )}
      {rest.length > 0 && (
        <>
          {pinned.length > 0 && (
            <div className="list-section">
              <h3>All projects</h3>
              <span className="mono">{rest.length}</span>
              <div className="rule"></div>
            </div>
          )}
          {renderTable(rest)}
        </>
      )}
    </>
  );
}

function App() {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [view, setView] = useState(TWEAK_DEFAULTS.defaultView || 'list');
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const [formOpen, setFormOpen] = useState(false);
  const [lockedProjectId, setLockedProjectId] = useState(null);
  const [extras, setExtras] = useState([]);
  const [week, setWeek] = useState(window.WEEK_LABEL);
  const [weekIdx, setWeekIdx] = useState(0);
  const [toast, setToast] = useState('');
  const [query, setQuery] = useState('');
  const [starred, setStarred] = useState(new Set(['platform-migration', 'mobile-launch']));

  // Handle URL params: #project=<id>&submit=1 (hash-based so preview auth stays intact)
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) return;
      const params = new URLSearchParams(hash);
      const pid = params.get('project');
      const submit = params.get('submit');
      if (pid && submit === '1') {
        const exists = window.PROJECTS.find(p => p.id === pid);
        if (exists) {
          setLockedProjectId(pid);
          setFormOpen(true);
        }
      }
    };
    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const allProjects = useMemo(() => [...extras, ...window.PROJECTS], [extras]);

  const filtered = useMemo(() => {
    let list = allProjects.filter(p => projectMatches(p, query));
    if (filter === 'attention') list = list.filter(p => p.status !== 'green');
    if (filter === 'risk') list = list.filter(p => p.status === 'red' || p.status === 'yellow');
    if (filter === 'red') list = list.filter(p => p.status === 'red');

    if (sort === 'recent') list = [...list].sort((a, b) => b.updated.localeCompare(a.updated));
    else if (sort === 'risk') {
      const rank = { red: 0, yellow: 1, green: 2 };
      list = [...list].sort((a, b) => rank[a.status] - rank[b.status]);
    } else if (sort === 'name') list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [allProjects, filter, sort, query]);

  // Grid view uses featured subset
  const featured = filtered.filter(p => p.featured || extras.find(e => e.id === p.id)).slice(0, 4);
  const additional = showAll ? filtered.filter(p => !featured.includes(p)) : [];

  const toggleStar = (id) => {
    const next = new Set(starred);
    if (next.has(id)) next.delete(id); else next.add(id);
    setStarred(next);
  };

  const handleSubmit = (project) => {
    setExtras([project, ...extras]);
    setFormOpen(false);
    setLockedProjectId(null);
    setToast(`"${project.name}" added to this week's update`);
  };

  const handleShare = (project) => {
    const base = window.location.origin + window.location.pathname + window.location.search;
    const url = `${base}#project=${encodeURIComponent(project.id)}&submit=1`;
    // Attempt to write to clipboard
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        () => setToast(`Share link for "${project.name}" copied to clipboard`),
        () => setToast(`Link: ${url}`)
      );
    } else {
      setToast(`Link: ${url}`);
    }
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setLockedProjectId(null);
    // Clear hash if we got here from a share link
    if (lockedProjectId && window.location.hash) {
      window.history.replaceState({}, '', window.location.pathname + window.location.search);
    }
  };

  const exportSnapshot = () => window.print();

  const statusCounts = {
    green: allProjects.filter(p => p.status === 'green').length,
    yellow: allProjects.filter(p => p.status === 'yellow').length,
    red: allProjects.filter(p => p.status === 'red').length,
  };

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark"></span>
            <span className="brand-name">Northline</span>
            <span className="brand-sep">/</span>
            <span className="brand-sub">Executive Review</span>
          </div>
          <div className="top-spacer"></div>
          <a href="Automation Roadmap.html" className="brand-sub" style={{color:'var(--muted)', textDecoration:'none', fontSize:13.5, marginRight:16, display:'inline-flex', alignItems:'center', gap:6}} title="View automation roadmap">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" width="13" height="13"><path d="M2 8h12M10 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Roadmap
          </a>
          <div className="top-meta">
            <span>Portfolio</span>
            <span className="top-dot"></span>
            <span className="mono">{allProjects.length} projects</span>
            <span className="top-dot"></span>
            <span className="mono" style={{color:'var(--red-ink)'}}>{statusCounts.red} off track</span>
          </div>
        </div>
      </header>

      <main className="page">
        <div className="page-head">
          <div>
            <div className="eyebrow">WEEKLY DIGEST — NO. 16</div>
            <h1 className="title">Weekly Executive Project <span className="accent">Update</span></h1>
            <div className="subtitle">{week} · A thirty-second read on what is working, what is not, and what is next.</div>
          </div>
          <div className="head-actions">
            <button className="btn" onClick={() => setWeekIdx(weekIdx === 0 ? 1 : 0)}>
              <Icon.History className="btn-icon" />
              {weekIdx === 0 ? 'Past weeks' : 'Current week'}
            </button>
            <button className="btn" onClick={exportSnapshot}>
              <Icon.Export className="btn-icon" />
              Export
            </button>
            <button className="btn primary" onClick={() => setFormOpen(true)}>
              <Icon.Plus className="btn-icon" />
              Submit update
            </button>
          </div>
        </div>

        {weekIdx > 0 && (
          <div className="history-banner">
            <Icon.History className="btn-icon" />
            <span>Viewing archived snapshot:</span>
            <span className="mono">{window.PRIOR_WEEKS[weekIdx - 1].label} · {window.PRIOR_WEEKS[weekIdx - 1].summary}</span>
            <button className="btn sm" onClick={() => setWeekIdx(0)}>Close</button>
          </div>
        )}

        {tweaks.showSummary && <ExecutiveSummary data={window.EXEC_SUMMARY} projects={allProjects} />}

        <div className="toolbar-row">
          <SearchBar value={query} onChange={setQuery} onClear={() => setQuery('')} />
          <div className="view-switch">
            <button className={view === 'list' ? 'on' : ''} onClick={() => setView('list')}>
              <Icon.List /> List
            </button>
            <button className={view === 'grid' ? 'on' : ''} onClick={() => setView('grid')}>
              <Icon.GridIcon /> Grid
            </button>
          </div>
        </div>

        <div className="toolbar-row filters">
          <div className="toolbar-left">
            <div className="segmented">
              <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All <span style={{opacity:0.6,marginLeft:4}}>{allProjects.length}</span></button>
              <button className={filter === 'attention' ? 'on' : ''} onClick={() => setFilter('attention')}>Needs attention <span style={{opacity:0.6,marginLeft:4}}>{statusCounts.yellow + statusCounts.red}</span></button>
              <button className={filter === 'risk' ? 'on' : ''} onClick={() => setFilter('risk')}>At risk <span style={{opacity:0.6,marginLeft:4}}>{statusCounts.yellow}</span></button>
              <button className={filter === 'red' ? 'on' : ''} onClick={() => setFilter('red')}>Off track <span style={{opacity:0.6,marginLeft:4}}>{statusCounts.red}</span></button>
            </div>
            <div className="select">
              <span className="toolbar-label">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="default">Featured</option>
                <option value="risk">Highest risk</option>
                <option value="recent">Most recent</option>
                <option value="name">Name</option>
              </select>
              <span className="select-caret">▾</span>
            </div>
          </div>
          <div className="toolbar-right">
            <span className="toolbar-label mono">
              {filtered.length} of {allProjects.length}
              {query && <span style={{marginLeft:6,color:'var(--ink-2)'}}>· "{query}"</span>}
            </span>
          </div>
        </div>

        {view === 'list' ? (<div className="list-view-bound">
          <ListView projects={filtered} q={query} starred={starred} onStar={toggleStar} onShare={handleShare} /></div>
        ) : (
          <>
            <div className="grid">
              {featured.length === 0 ? (
                <div className="empty" style={{ gridColumn: '1 / -1' }}>No projects match this filter.</div>
              ) : (
                featured.map(p => <ProjectCard key={p.id} p={p} compact={tweaks.compact} onShare={handleShare} />)
              )}
            </div>
            <div className="view-all-wrap">
              <button className="btn" onClick={() => setShowAll(!showAll)}>
                {showAll ? 'Hide additional projects' : `Show all projects · ${filtered.length - featured.length} more`}
                <Icon.Chev style={{ transform: showAll ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }} />
              </button>
            </div>
            {showAll && additional.length > 0 && (
              <div className="more-wrap">
                <div className="more-head">
                  <h2>Additional projects</h2>
                  <span className="mono">{additional.length} tracked</span>
                  <div className="rule"></div>
                </div>
                <div className="grid compact">
                  {additional.map(p => <ProjectCard key={p.id} p={p} compact={true} onShare={handleShare} />)}
                </div>
              </div>
            )}
          </>
        )}
      </main>

      {formOpen && <UpdateForm onClose={handleCloseForm} onSubmit={handleSubmit} projects={allProjects} lockedProjectId={lockedProjectId} />}
      <Tweaks state={tweaks} setState={setTweaks} view={view} setView={setView} />
      <Toast msg={toast} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
