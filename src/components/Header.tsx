import Logo from './Logo';

interface HeaderProps {
  showForm: boolean;
  onToggleForm: () => void;
}

function Header({ showForm, onToggleForm }: HeaderProps) {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <a className="brand" href="/">
          <Logo className="brand__logo" />
          <span className="brand__text">
            <span className="brand__name">Tidbit</span>
            <span className="brand__tagline">Bite-sized facts, shared with friends.</span>
          </span>
        </a>

        <button className="btn btn--primary" onClick={onToggleForm} aria-expanded={showForm} aria-controls="new-fact-form">
          {showForm ? 'Close' : 'Share a tidbit'}
        </button>
      </div>
    </header>
  );
}

export default Header;
