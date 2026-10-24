import { useState } from 'react';
import { categoryStyle, getCategory } from '../lib/categories';
import type { Fact, VoteColumn } from '../types';

interface FactCardProps {
  fact: Fact;
  onVote: (fact: Fact, column: VoteColumn) => Promise<void>;
}

const VOTES: { column: VoteColumn; emoji: string; label: string }[] = [
  { column: 'votesInteresting', emoji: '👍', label: 'Interesting' },
  { column: 'votesMindblowing', emoji: '🤯', label: 'Mind-blowing' },
  { column: 'votesFalse', emoji: '⛔️', label: 'False' },
];

function FactCard({ fact, onVote }: FactCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;
  const category = getCategory(fact.category);

  async function handleVote(column: VoteColumn) {
    setIsUpdating(true);
    try {
      await onVote(fact, column);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <li className="fact-card">
      {isDisputed && <span className="badge badge--disputed">Disputed</span>}
      <p className="fact-card__text">{fact.text}</p>

      <div className="fact-card__footer">
        <span className="chip" style={categoryStyle(category.color)}>
          {category.name}
        </span>
        <a className="fact-card__source" href={fact.source} target="_blank" rel="noopener noreferrer">
          Source ↗
        </a>

        <div className="votes">
          {VOTES.map(({ column, emoji, label }) => (
            <button
              key={column}
              className="vote"
              onClick={() => handleVote(column)}
              disabled={isUpdating}
              aria-label={`${label}: ${fact[column]} votes`}
              title={label}
            >
              <span aria-hidden="true">{emoji}</span> {fact[column]}
            </button>
          ))}
        </div>
      </div>
    </li>
  );
}

export default FactCard;
