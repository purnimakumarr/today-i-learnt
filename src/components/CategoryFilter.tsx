import { CATEGORIES } from '../lib/categories';

interface CategoryFilterProps {
  onSelect: (category: string) => void;
}

function CategoryFilter({ onSelect }: CategoryFilterProps) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button onClick={() => onSelect('all')} className="btn btn-all-categories">
            All
          </button>
        </li>
        {CATEGORIES.map((cat) => (
          <li key={cat.name} className="category">
            <button onClick={() => onSelect(cat.name)} className="btn btn-category" style={{ backgroundColor: cat.color }}>
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default CategoryFilter;
