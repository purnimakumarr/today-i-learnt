import FactCard from './FactCard';
import type { Fact, VoteColumn } from '../types';

interface FactListProps {
  facts: Fact[];
  onVote: (fact: Fact, column: VoteColumn) => Promise<void>;
}

function FactList({ facts, onVote }: FactListProps) {
  if (facts.length === 0) {
    return <p className="message">No facts for this category yet! Create the first one ✌️</p>;
  }

  return (
    <section>
      <ul className="facts-list">
        {facts.map((fact) => (
          <FactCard key={fact.id} fact={fact} onVote={onVote} />
        ))}
      </ul>
      <p>There are {facts.length} facts in the database. Add your own!</p>
    </section>
  );
}

export default FactList;
