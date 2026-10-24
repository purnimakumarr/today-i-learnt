import FactCard from './FactCard';
import type { Fact, VoteColumn } from '../types';

interface FactListProps {
  facts: Fact[];
  totalCount: number;
  isSearching: boolean;
  votes: Record<number, VoteColumn>;
  onVote: (fact: Fact, column: VoteColumn) => void;
  onShare: (fact: Fact) => void;
}

function FactList({ facts, totalCount, isSearching, votes, onVote, onShare }: FactListProps) {
  if (facts.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__emoji" aria-hidden="true">
          {isSearching ? '🔍' : '🌱'}
        </p>
        <p className="empty-state__title">{isSearching ? 'No tidbits match your search' : 'Nothing here yet'}</p>
        <p className="empty-state__text">
          {isSearching ? 'Try a different word or another category.' : 'Be the first to share a tidbit in this category!'}
        </p>
      </div>
    );
  }

  return (
    <section aria-label="Facts">
      <ul className="fact-list">
        {facts.map((fact) => (
          <FactCard key={fact.id} fact={fact} votedFor={votes[fact.id]} onVote={onVote} onShare={onShare} />
        ))}
      </ul>
      <p className="fact-count">
        {isSearching
          ? `Showing ${facts.length} of ${totalCount} tidbits`
          : `${totalCount} ${totalCount === 1 ? 'tidbit' : 'tidbits'} so far. Add your own!`}
      </p>
    </section>
  );
}

export default FactList;
