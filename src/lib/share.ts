import type { Fact } from '../types';

export type ShareResult = 'shared' | 'copied' | 'cancelled';

/** Uses the native share sheet where available (mostly mobile), otherwise copies to the clipboard. */
export async function shareFact(fact: Fact): Promise<ShareResult> {
  const text = `Did you know? ${fact.text}`;

  if (navigator.share) {
    try {
      await navigator.share({ title: 'A tidbit for you', text, url: fact.source });
      return 'shared';
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return 'cancelled';
      // Fall through to the clipboard if the share sheet failed for another reason.
    }
  }

  await navigator.clipboard.writeText(`${text}\nSource: ${fact.source}`);
  return 'copied';
}
