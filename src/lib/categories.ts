import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  { name: 'technology', color: '#3b82f6' },
  { name: 'science', color: '#16a34a' },
  { name: 'finance', color: '#ef4444' },
  { name: 'society', color: '#eab308' },
  { name: 'entertainment', color: '#db2777' },
  { name: 'health', color: '#14b8a6' },
  { name: 'history', color: '#f97316' },
  { name: 'news', color: '#8b5cf6' },
];

const FALLBACK_CATEGORY: Category = { name: 'other', color: '#78716c' };

export function getCategory(name: string): Category {
  return CATEGORIES.find((cat) => cat.name === name) ?? { ...FALLBACK_CATEGORY, name };
}
