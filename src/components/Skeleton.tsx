function Skeleton({ count = 4 }: { count?: number }) {
  return (
    <ul className="fact-list" aria-busy="true" aria-label="Loading facts">
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="fact-card skeleton">
          <span className="skeleton__line" />
          <span className="skeleton__line skeleton__line--short" />
          <span className="skeleton__footer">
            <span className="skeleton__pill" />
            <span className="skeleton__pill skeleton__pill--wide" />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default Skeleton;
