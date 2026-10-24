interface HeaderProps {
  showForm: boolean;
  onToggleForm: () => void;
}

function Header({ showForm, onToggleForm }: HeaderProps) {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" height="68" width="68" alt="Today I Learnt logo" />
        <h1>Today I Learnt</h1>
      </div>

      <button className="btn btn-large btn-open" onClick={onToggleForm}>
        {showForm ? 'Close' : 'Share a fact'}
      </button>
    </header>
  );
}

export default Header;
