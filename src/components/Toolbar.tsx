import type { SortOption } from '../types';

const SORT_LABELS: Record<SortOption, string> = {
  top: 'Most interesting',
  mindblowing: 'Most mind-blowing',
  newest: 'Newest',
};

interface ToolbarProps {
  search: string;
  onSearchChange: (search: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

function Toolbar({ search, onSearchChange, sort, onSortChange }: ToolbarProps) {
  return (
    <div className="toolbar">
      <label className="search">
        <span className="visually-hidden">Search facts</span>
        <svg className="search__icon" viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
          <circle cx="9" cy="9" r="6" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="m13.5 13.5 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input type="search" placeholder="Search tidbits…" value={search} onChange={(e) => onSearchChange(e.target.value)} />
      </label>

      <label className="sort">
        <span className="sort__label">Sort by</span>
        <select value={sort} onChange={(e) => onSortChange(e.target.value as SortOption)}>
          {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
            <option key={option} value={option}>
              {SORT_LABELS[option]}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

export default Toolbar;
