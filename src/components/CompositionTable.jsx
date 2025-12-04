const CompositionTable = ({ data }) => {
  if (!data) return null;
  const entries = typeof data === 'object' && !Array.isArray(data) ? Object.entries(data) : [];
  if (entries.length === 0) return null;

  // wheel handler to prevent scroll chaining to page when at edges
  const handleWheel = (e) => {
    const el = e.currentTarget;
    const delta = e.deltaY;
    const atTop = el.scrollTop === 0;
    const atBottom = Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

    if ((atTop && delta < 0) || (atBottom && delta > 0)) {
      // prevent the outer page from scrolling
      e.preventDefault();
      e.stopPropagation();
    }
    // otherwise allow normal inner scroll
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
      <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-500 shrink-0">
        <span>Component</span>
        <span>Concentration</span>
      </div>

      <div
        onWheel={handleWheel}
        className="divide-y divide-slate-100 overflow-y-auto max-h-60 custom-scrollbar overscroll-contain"
      >
        {entries.map(([key, value]) => (
          <div key={key} className="grid grid-cols-2 px-5 py-3.5 hover:bg-emerald-50/30 transition-colors duration-200">
            <span className="font-semibold text-slate-700 capitalize text-sm flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div>
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="text-slate-600 font-mono text-sm">
              {Array.isArray(value) ? value.join(", ") : value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompositionTable