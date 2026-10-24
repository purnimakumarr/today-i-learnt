import { useCallback, useState } from 'react';
import type { VoteColumn } from '../types';

const STORAGE_KEY = 'tidbit:votes';

type VotedFacts = Record<number, VoteColumn>;

function load(): VotedFacts {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as VotedFacts;
  } catch {
    return {};
  }
}

function save(votes: VotedFacts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(votes));
  } catch {
    // Storage can be unavailable (private mode, blocked site data); votes just won't persist.
  }
}

/**
 * Remembers which facts this browser has voted on, so each visitor gets one vote per fact.
 * This only discourages casual repeat votes; real enforcement would need auth or a server-side check.
 */
export function useVotedFacts() {
  const [votes, setVotes] = useState<VotedFacts>(load);

  const update = useCallback((change: (votes: VotedFacts) => VotedFacts) => {
    setVotes((votes) => {
      const next = change(votes);
      save(next);
      return next;
    });
  }, []);

  const recordVote = useCallback(
    (factId: number, column: VoteColumn) => update((votes) => ({ ...votes, [factId]: column })),
    [update],
  );

  const forgetVote = useCallback(
    (factId: number) =>
      update((votes) => {
        const next = { ...votes };
        delete next[factId];
        return next;
      }),
    [update],
  );

  return { votes, recordVote, forgetVote };
}
