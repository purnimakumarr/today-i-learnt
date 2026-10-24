import { useState } from 'react';
import { getCategory } from '../lib/categories';
import type { Fact, VoteColumn } from '../types';

interface FactCardProps {
  fact: Fact;
  onVote: (fact: Fact, column: VoteColumn) => Promise<void>;
}

function FactCard({ fact, onVote }: FactCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  async function handleVote(column: VoteColumn) {
    setIsUpdating(true);
    try {
      await onVote(fact, column);
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <li className="fact">
      <p>
        {isDisputed && <span className="disputed">[😡 DISPUTED]</span>}
        {fact.text}
        <a className="source" href={fact.source} target="_blank" rel="noopener noreferrer">
          (Source)
        </a>
      </p>
      <span className="tag" style={{ backgroundColor: getCategory(fact.category).color }}>
        {fact.category}
      </span>
      <div className="vote-buttons">
        <button onClick={() => handleVote('votesInteresting')} disabled={isUpdating}>
          👍 {fact.votesInteresting}
        </button>
        <button onClick={() => handleVote('votesMindblowing')} disabled={isUpdating}>
          🤯 {fact.votesMindblowing}
        </button>
        <button onClick={() => handleVote('votesFalse')} disabled={isUpdating}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

export default FactCard;
