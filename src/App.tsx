import { useState } from 'react';
import Header from './components/Header';
import NewFactForm from './components/NewFactForm';
import CategoryFilter from './components/CategoryFilter';
import FactList from './components/FactList';
import { useFacts } from './hooks/useFacts';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const { facts, isLoading, error, addFact, vote } = useFacts(currentCategory);

  return (
    <>
      <Header showForm={showForm} onToggleForm={() => setShowForm((show) => !show)} />
      <div className="container">
        {showForm && <NewFactForm onSubmit={addFact} onDone={() => setShowForm(false)} />}
        <div className="layout">
          <CategoryFilter onSelect={setCurrentCategory} />
          <main className="feed">
            {isLoading ? (
              <p className="message">Loading…</p>
            ) : error ? (
              <p className="message">{error}</p>
            ) : (
              <FactList facts={facts} onVote={vote} />
            )}
          </main>
        </div>
      </div>
    </>
  );
}

export default App;
