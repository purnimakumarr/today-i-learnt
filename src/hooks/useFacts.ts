import { useCallback, useEffect, useState } from 'react';
import supabase from '../lib/supabase';
import type { Fact, NewFact, VoteColumn } from '../types';

export function useFacts(category: string) {
  const [facts, setFacts] = useState<Fact[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    async function getFacts() {
      setIsLoading(true);
      setError(null);

      let query = supabase.from('facts').select('*');
      if (category !== 'all') query = query.eq('category', category);

      const { data, error } = await query.order('votesInteresting', { ascending: false }).limit(1000);

      if (ignore) return;
      if (error) setError('There was a problem getting data');
      else setFacts(data);
      setIsLoading(false);
    }

    getFacts();
    return () => {
      ignore = true;
    };
  }, [category]);

  const addFact = useCallback(async (newFact: NewFact) => {
    const { data, error } = await supabase.from('facts').insert([newFact]).select().single();
    if (error) throw error;
    setFacts((facts) => [data, ...facts]);
  }, []);

  const vote = useCallback(async (fact: Fact, column: VoteColumn) => {
    const { data, error } = await supabase
      .from('facts')
      .update({ [column]: fact[column] + 1 })
      .eq('id', fact.id)
      .select()
      .single();
    if (error) throw error;
    setFacts((facts) => facts.map((f) => (f.id === fact.id ? data : f)));
  }, []);

  return { facts, isLoading, error, addFact, vote };
}
