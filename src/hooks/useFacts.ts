import { useCallback, useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import type { Fact, NewFact, SortOption, VoteColumn } from '../types';

const SORT_COLUMNS: Record<SortOption, keyof Fact> = {
  top: 'votesInteresting',
  newest: 'created_at',
  mindblowing: 'votesMindblowing',
};

export function useFacts(category: string, sort: SortOption) {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let ignore = false;

    async function getFacts() {
      setIsLoading(true);
      setError(null);

      let query = supabase.from('facts').select('*');
      if (category !== 'all') query = query.eq('category', category);

      const { data, error } = await query.order(SORT_COLUMNS[sort], { ascending: false }).limit(1000);

      if (ignore) return;
      if (error) setError('We couldn’t load facts right now.');
      else setFacts(data);
      setIsLoading(false);
    }

    getFacts();
    return () => {
      ignore = true;
    };
  }, [category, sort, reloadKey]);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  const addFact = useCallback(async (newFact: NewFact) => {
    const { data, error } = await supabase.from('facts').insert([newFact]).select().single();
    if (error) throw error;
    setFacts((facts) => [data, ...facts]);
  }, []);

  /** Optimistically bumps the count, then rolls back if Supabase rejects the update. */
  const vote = useCallback(async (fact: Fact, column: VoteColumn) => {
    const bump = (delta: number) =>
      setFacts((facts) => facts.map((f) => (f.id === fact.id ? { ...f, [column]: f[column] + delta } : f)));

    bump(1);
    const { error } = await supabase
      .from('facts')
      .update({ [column]: fact[column] + 1 })
      .eq('id', fact.id);

    if (error) {
      bump(-1);
      throw error;
    }
  }, []);

  return { facts, isLoading, error, reload, addFact, vote };
}
