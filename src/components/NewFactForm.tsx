import { useState, type FormEvent } from 'react';
import { CATEGORIES } from '../lib/categories';
import { isValidHttpUrl } from '../lib/url';
import type { NewFact } from '../types';

const MAX_LENGTH = 200;
const WARN_AT = 20;

type Field = 'text' | 'source' | 'category';

interface NewFactFormProps {
  onSubmit: (fact: NewFact) => Promise<void>;
}

function validate({ text, source, category }: NewFact): Partial<Record<Field, string>> {
  const errors: Partial<Record<Field, string>> = {};
  if (!text.trim()) errors.text = 'Write your tidbit first.';
  else if (text.length > MAX_LENGTH) errors.text = `Keep it bite-sized: ${MAX_LENGTH} characters max.`;
  if (!isValidHttpUrl(source)) errors.source = 'Add a link starting with http:// or https://';
  if (!category) errors.category = 'Pick a category.';
  return errors;
}

function NewFactForm({ onSubmit }: NewFactFormProps) {
  const [text, setText] = useState('');
  const [source, setSource] = useState('');
  const [category, setCategory] = useState('');
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [isUploading, setIsUploading] = useState(false);

  const remaining = MAX_LENGTH - text.length;
  const errors = validate({ text, source, category });
  const isValid = Object.keys(errors).length === 0;
  const touch = (field: Field) => () => setTouched((t) => ({ ...t, [field]: true }));
  const errorFor = (field: Field) => (touched[field] ? errors[field] : undefined);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid) {
      setTouched({ text: true, source: true, category: true });
      return;
    }

    setIsUploading(true);
    try {
      await onSubmit({ text: text.trim(), source, category });
    } finally {
      setIsUploading(false);
    }
  }

  const counterTone = remaining < 0 ? 'field__counter--over' : remaining <= WARN_AT ? 'field__counter--warn' : '';

  return (
    <form id="new-fact-form" className="fact-form" onSubmit={handleSubmit} noValidate>
      <div className="field field--text">
        <label htmlFor="fact-text">Your tidbit</label>
        <textarea
          id="fact-text"
          rows={2}
          autoFocus
          disabled={isUploading}
          placeholder="Did you know that…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={touch('text')}
          aria-invalid={!!errorFor('text')}
          aria-describedby="fact-text-counter fact-text-error"
        />
        <span id="fact-text-counter" className={`field__counter ${counterTone}`} aria-label={`${remaining} characters left`}>
          {remaining}
        </span>
        <FieldError id="fact-text-error" message={errorFor('text')} />
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
          onBlur={touch('source')}
          aria-invalid={!!errorFor('source')}
          aria-describedby="fact-source-error"
        />
        <FieldError id="fact-source-error" message={errorFor('source')} />
      </div>

      <div className="field">
        <label htmlFor="fact-category">Category</label>
        <select
          id="fact-category"
          disabled={isUploading}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          onBlur={touch('category')}
          aria-invalid={!!errorFor('category')}
          aria-describedby="fact-category-error"
        >
          <option value="">Choose…</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.name} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        <FieldError id="fact-category-error" message={errorFor('category')} />
      </div>

      <button className="btn btn--primary fact-form__submit" disabled={isUploading || !isValid}>
        {isUploading ? 'Posting…' : 'Post'}
      </button>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <span id={id} className="field__error">
      {message}
    </span>
  );
}

export default NewFactForm;
