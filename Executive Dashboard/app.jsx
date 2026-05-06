const { useState, useEffect, useMemo } = React;

// Tweak defaults persisted via edit-mode protocol
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showSummary": true,
  "compact": false
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('default');
  const [formOpen, setFormOpen] = useState(false);
  const [extras, setExtras] = useState([]);
  const [week, setWeek] = useState(window.WEEK_LABEL);
  const [weekIdx, setWeekIdx] = useState(0);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2200);
    return () => clearTimeout(t);
  }, [toast]);

  const allProjects = useMemo(() => [...extras, ...window.PROJECTS], [extras]);

  const filtered = useMemo(() => {
    let list = allProjects;
    if (weekIdx > 0) {
      // simulate a historical snapshot by lightly shifting status — only for demo
      list = list.map(p => ({ ...p, prevStatus: p.status }));
    }
    if (filter === 'attention') list = list.filter(p => p.status !== 'green');
    if (filter === 'risk') list = list.filter(p => p.status === 'red' || p.status === 'yellow');
    if (filter === 'red') list = list.filter(p => p.status === 'red');

    if (sort === 'recent') {
      list = [...list].sort((a, b) => b.updated.localeCompare(a.updated));
    } else if (sort === 'risk') {
      const rank = { red: 0, yellow: 1, green: 2 };
      list = [...list].sort((a, b) => rank[a.status] - rank[b.status]);
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [allProjects, filter, sort, weekIdx]);

  const featured = filtered.filter(p => p.featured || extras.find(e => e.id === p.id)).slice(0, 4);
  const additional = showAll ? filtered.filter(p => !featured.includes(p)) : [];

  const handleSubmit = (project) => {
    setExtras([project, ...extras]);
    setFormOpen(false);
    setToast(`"${project.name}" added to this week's update`);
  };

  const exportSnapshot = () => window.print();

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
          <div className="top-meta">Portfolio · <span className="mono">8 active projects</span></div>
        </div>
      </header>

      <main className="page">
        <div className="page-head">
          <div>
            <div className="eyebrow">Weekly Digest · No. 16</div>
            <h1 className="title">Weekly Executive Project Update</h1>
            <div className="subtitle">{week} · Skim in 30 seconds or less.</div>
          </div>
          <div className="head-actions">
            <button className="btn" onClick={() => setWeekIdx(weekIdx === 0 ? 1 : 0)}>
              <Icon.History className="btn-icon" />
              {weekIdx === 0 ? 'View past weeks' : 'Back to current'}
            </button>
            <button className="btn" onClick={exportSnapshot}>
              <Icon.Export className="btn-icon" />
              Export snapshot
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
            <span className="mono">
              {window.PRIOR_WEEKS[weekIdx - 1].label} · {window.PRIOR_WEEKS[weekIdx - 1].summary}
            </span>
            <div className="segmented" style={{ marginLeft: 'auto' }}>
              {window.PRIOR_WEEKS.map((w, i) => (
                <button key={i} className={weekIdx === i + 1 ? 'on' : ''} onClick={() => setWeekIdx(i + 1)}>
                  {w.label.split(',')[0]}
                </button>
              ))}
            </div>
            <button className="btn sm" onClick={() => setWeekIdx(0)}>Close</button>
          </div>
        )}

        {tweaks.showSummary && <ExecutiveSummary data={window.EXEC_SUMMARY} projects={allProjects} />}

        <div className="toolbar">
          <div className="toolbar-left">
            <div className="segmented">
              <button className={filter === 'all' ? 'on' : ''} onClick={() => setFilter('all')}>All</button>
              <button className={filter === 'attention' ? 'on' : ''} onClick={() => setFilter('attention')}>Needs attention</button>
              <button className={filter === 'risk' ? 'on' : ''} onClick={() => setFilter('risk')}>Risk only</button>
              <button className={filter === 'red' ? 'on' : ''} onClick={() => setFilter('red')}>Off track</button>
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
            <span className="toolbar-label mono">{filtered.length} projects · {featured.length} featured</span>
          </div>
        </div>

        <div className="grid">
          {featured.length === 0 ? (
            <div className="empty" style={{ gridColumn: '1 / -1' }}>No projects match this filter.</div>
          ) : (
            featured.map(p => <ProjectCard key={p.id} p={p} compact={tweaks.compact} />)
          )}
        </div>

        <div style={{ marginTop: 24, textAlign: 'center' }}>
          <button className="btn" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Hide additional projects' : `View all projects (${filtered.length - featured.length} more)`}
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
              {additional.map(p => <ProjectCard key={p.id} p={p} compact={true} />)}
            </div>
          </div>
        )}
      </main>

      {formOpen && <UpdateForm onClose={() => setFormOpen(false)} onSubmit={handleSubmit} />}
      <Tweaks state={tweaks} setState={setTweaks} />
      <Toast msg={toast} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
