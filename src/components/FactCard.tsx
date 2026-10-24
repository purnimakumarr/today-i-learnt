import { categoryStyle, getCategory } from '../lib/categories';
import { hostname, timeAgo } from '../lib/format';
import type { Fact, VoteColumn } from '../types';

interface FactCardProps {
  fact: Fact;
  votedFor?: VoteColumn;
  onVote: (fact: Fact, column: VoteColumn) => void;
  onShare: (fact: Fact) => void;
}

const VOTES: { column: VoteColumn; emoji: string; label: string }[] = [
  { column: 'votesInteresting', emoji: '👍', label: 'Interesting' },
  { column: 'votesMindblowing', emoji: '🤯', label: 'Mind-blowing' },
  { column: 'votesFalse', emoji: '⛔️', label: 'False' },
];

function FactCard({ fact, votedFor, onVote, onShare }: FactCardProps) {
  const isDisputed = fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;
  const category = getCategory(fact.category);

  return (
    <li className="fact-card">
      {isDisputed && (
        <span className="badge badge--disputed" title="More people voted this false than interesting">
          Disputed
        </span>
      )}
      <p className="fact-card__text">{fact.text}</p>

      <div className="fact-card__footer">
        <span className="chip" style={categoryStyle(category.color)}>
          {category.name}
        </span>
        <span className="fact-card__meta">
          <a className="fact-card__source" href={fact.source} target="_blank" rel="noopener noreferrer">
            {hostname(fact.source)} ↗
          </a>
          <span aria-hidden="true"> · </span>
          <time dateTime={fact.created_at}>{timeAgo(fact.created_at)}</time>
        </span>

        <div className="fact-card__actions">
          <div className="votes" role="group" aria-label="Vote">
            {VOTES.map(({ column, emoji, label }) => (
              <button
                key={column}
                className="vote"
                onClick={() => onVote(fact, column)}
                disabled={votedFor !== undefined}
                aria-pressed={votedFor === column}
                aria-label={`${label}: ${fact[column]} votes`}
                title={votedFor ? 'You already voted on this one' : label}
              >
                <span aria-hidden="true">{emoji}</span> {fact[column]}
              </button>
            ))}
          </div>
          <button className="icon-btn" onClick={() => onShare(fact)} aria-label="Share this tidbit" title="Share">
            <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
              <path
                d="M10 3v10M6 7l4-4 4 4M4 11v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </li>
  );
}

export default FactCard;
