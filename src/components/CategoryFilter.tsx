import { CATEGORIES, categoryStyle } from '../lib/categories';

interface CategoryFilterProps {
  current: string;
  onSelect: (category: string) => void;
}

function CategoryFilter({ current, onSelect }: CategoryFilterProps) {
  return (
    <nav className="sidebar" aria-label="Filter by category">
      <ul className="category-list">
        <li>
          <button className="category-btn category-btn--all" aria-pressed={current === 'all'} onClick={() => onSelect('all')}>
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name}>
            <button
              className="category-btn"
              style={categoryStyle(cat.color)}
              aria-pressed={current === cat.name}
              onClick={() => onSelect(cat.name)}
            >
              <span className="category-btn__dot" aria-hidden="true" />
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default CategoryFilter;
