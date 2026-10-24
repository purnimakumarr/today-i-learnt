import { useState, type FormEvent } from 'react';
import { CATEGORIES } from '../lib/categories';
import { isValidHttpUrl } from '../lib/url';
import type { NewFact } from '../types';

const MAX_LENGTH = 200;

interface NewFactFormProps {
  onSubmit: (fact: NewFact) => Promise<void>;
  onDone: () => void;
}

function NewFactForm({ onSubmit, onDone }: NewFactFormProps) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const remaining = MAX_LENGTH - text.length;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text.trim() || !isValidHttpUrl(source) || !category || remaining < 0) return;

    setIsUploading(true);
    try {
      await onSubmit({ text: text.trim(), source, category });
      onDone();
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form id="new-fact-form" className="fact-form" onSubmit={handleSubmit}>
      <div className="field field--text">
        <label htmlFor="fact-text">Your tidbit</label>
        <textarea
          id="fact-text"
          rows={2}
          disabled={isUploading}
          placeholder="Did you know that…"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <span className="field__counter">{remaining}</span>
      </div>

      <div className="field">
        <label htmlFor="fact-source">Source</label>
        <input
          id="fact-source"
          type="url"
          inputMode="url"
          disabled={isUploading}
          placeholder="https://…"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
      </div>

      <div className="field">
        <label htmlFor="fact-category">Category</label>
        <select id="fact-category" disabled={isUploading} value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Choose…</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button className="btn btn--primary fact-form__submit" disabled={isUploading}>
        {isUploading ? 'Posting…' : 'Post'}
      </button>
    </form>
  );
}

export default NewFactForm;
