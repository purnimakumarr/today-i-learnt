import { useDeferredValue, useMemo, useState } from 'react';
import Header from './components/Header';
import NewFactForm from './components/NewFactForm';
import CategoryFilter from './components/CategoryFilter';
import Toolbar from './components/Toolbar';
import FactList from './components/FactList';
import Skeleton from './components/Skeleton';
import { useFacts } from './hooks/useFacts';
import { useVotedFacts } from './hooks/useVotedFacts';
import { useToast } from './hooks/useToast';
import { shareFact } from './lib/share';
import type { Fact, NewFact, SortOption, VoteColumn } from './types';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [sort, setSort] = useState<SortOption>('top');
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search.trim().toLowerCase());

  const { facts, isLoading, error, reload, addFact, vote } = useFacts(currentCategory, sort);
  const { votes, recordVote, forgetVote } = useVotedFacts();
  const showToast = useToast();

  const visibleFacts = useMemo(
    () => (deferredSearch ? facts.filter((fact) => fact.text.toLowerCase().includes(deferredSearch)) : facts),
    [facts, deferredSearch],
  );

  async function handleAddFact(newFact: NewFact) {
    try {
      await addFact(newFact);
      setShowForm(false);
      showToast('Your tidbit is live! 🎉', 'success');
    } catch {
      showToast('Couldn’t post your tidbit. Please try again.', 'error');
    }
  }

  async function handleVote(fact: Fact, column: VoteColumn) {
    if (votes[fact.id]) return;
    recordVote(fact.id, column);
    try {
      await vote(fact, column);
    } catch {
      forgetVote(fact.id);
      showToast('Your vote didn’t go through. Please try again.', 'error');
    }
  }

  async function handleShare(fact: Fact) {
    try {
      const result = await shareFact(fact);
      if (result === 'copied') showToast('Copied to clipboard. Send it to a friend!', 'success');
    } catch {
      showToast('Couldn’t share this tidbit.', 'error');
    }
  }

  return (
    <>
      <Header showForm={showForm} onToggleForm={() => setShowForm((show) => !show)} />
      <div className="container">
        {showForm && <NewFactForm onSubmit={handleAddFact} />}
        <div className="layout">
          <CategoryFilter current={currentCategory} onSelect={setCurrentCategory} />
          <main className="feed">
            <Toolbar search={search} onSearchChange={setSearch} sort={sort} onSortChange={setSort} />
            {isLoading ? (
              <Skeleton />
            ) : error ? (
              <div className="empty-state">
                <p className="empty-state__emoji" aria-hidden="true">
                  😵‍💫
                </p>
                <p className="empty-state__title">{error}</p>
                <button className="btn btn--primary" onClick={reload}>
                  Try again
                </button>
              </div>
            ) : (
              <FactList
                facts={visibleFacts}
                totalCount={facts.length}
                isSearching={deferredSearch !== ''}
                votes={votes}
                onVote={handleVote}
                onShare={handleShare}
              />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
