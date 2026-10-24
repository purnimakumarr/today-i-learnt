import type { CSSProperties } from 'react';
import type { Category } from '../types';

export const CATEGORIES: Category[] = [
  { name: 'technology', color: '#3B6FE0' },
  { name: 'science', color: '#1F9D63' },
  { name: 'finance', color: '#D9483B' },
  { name: 'society', color: '#C98A0B' },
  { name: 'entertainment', color: '#D63F8C' },
  { name: 'health', color: '#11968A' },
  { name: 'history', color: '#E06A1B' },
  { name: 'news', color: '#7A5AE0' },
];

const FALLBACK_COLOR = '#8A7F75';

export function getCategory(name: string): Category {
  return CATEGORIES.find((cat) => cat.name === name) ?? { name, color: FALLBACK_COLOR };
}

/** Exposes a category's color as the --cat custom property used by .chip and .category-btn. */
export function categoryStyle(color: string): CSSProperties {
  return { '--cat': color } as CSSProperties;
}
