import FactCard from './FactCard';
import type { Fact, VoteColumn } from '../types';

interface FactListProps {
  facts: Fact[];
  onVote: (fact: Fact, column: VoteColumn) => Promise<void>;
}

function FactList({ facts, onVote }: FactListProps) {
  if (facts.length === 0) {
    return <p className="message">No tidbits in this category yet. Be the first to share one!</p>;
  }

  return (
    <section aria-label="Facts">
      <ul className="fact-list">
        {facts.map((fact) => (
          <FactCard key={fact.id} fact={fact} onVote={onVote} />
        ))}
      </ul>
      <p className="fact-count">
        {facts.length} {facts.length === 1 ? 'tidbit' : 'tidbits'} so far. Add your own!
      </p>
    </section>
  );
}

export default FactList;
