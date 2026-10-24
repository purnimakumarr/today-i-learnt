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
  const textLength = text.length;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!text || !isValidHttpUrl(source) || !category || textLength > MAX_LENGTH) return;

    setIsUploading(true);
    try {
      await onSubmit({ text, source, category });
      onDone();
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      <input
        disabled={isUploading}
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <span>{MAX_LENGTH - textLength}</span>
      <input
        disabled={isUploading}
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />
      <select disabled={isUploading} value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>
        {CATEGORIES.map((cat) => (
          <option key={cat.name} value={cat.name}>
            {cat.name.toUpperCase()}
          </option>
        ))}
      </select>
      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

export default NewFactForm;
