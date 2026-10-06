import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { BRAND } from "../brand";
import Logo from "./Logo";

const LINKS = [
  { to: "/models", label: "Models" },
  { to: "/docs", label: "Docs" },
  { to: "/playground", label: "Playground" },
  { to: "/tweets", label: "Tweets" },
];

function SearchForm({ id, onDone }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  return (
    <form
      className="search"
      role="search"
      onSubmit={(event) => {
        event.preventDefault();
        navigate(`/models?q=${encodeURIComponent(q.trim())}`);
        onDone?.();
      }}
    >
      <label className="sr" htmlFor={id}>
        Search models
      </label>
      <input
        id={id}
        value={q}
        onChange={(event) => setQ(event.target.value)}
        placeholder="Search models"
        autoComplete="off"
      />
    </form>
  );
}

export default function Shell({ children }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <div className="app">
      <div className="topbar">
        <div className="wrap topbar-inner">
          <span className="dot" aria-hidden="true" />
          <p>
            Solana desk · {BRAND.settlement} per call · ${BRAND.ticker} mint pending
          </p>
        </div>
      </div>
      <header className="header">
        <div className="wrap nav">
          <Link to="/" className="brand" aria-label={`${BRAND.name} home`}>
            <Logo />
            <span>
              <strong>{BRAND.name}</strong>
              <small>Desk</small>
            </span>
          </Link>
          <nav className="nav-links desk-only" aria-label="Primary">
            {LINKS.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="desk-only search-slot">
            <SearchForm id="model-search-desk" />
          </div>
          <div className="nav-actions">
            <Link to="/token" className="ticker">
              ${BRAND.ticker}
            </Link>
            <Link to="/token#keys" className="btn btn-lime">
              Get a key
            </Link>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </div>
        <div className={`wrap mobile-panel ${open ? "open" : ""}`}>
          <SearchForm id="model-search-mobile" onDone={() => setOpen(false)} />
          <nav className="mobile-links" aria-label="Mobile">
            {LINKS.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/token">Token</NavLink>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="footer">
        <div className="wrap footer-grid">
          <div>
            <Link to="/" className="brand footer-brand">
              <Logo size={22} />
              <strong>{BRAND.name}</strong>
            </Link>
            <p className="fine">
              Every model for an agent, quoted in {BRAND.settlement} on {BRAND.chain}. Preview build. The mint is not live.
            </p>
          </div>
          <div>
            <p className="foot-label">Product</p>
            <Link to="/models">Models</Link>
            <Link to="/playground">Playground</Link>
            <Link to="/token">${BRAND.ticker}</Link>
          </div>
          <div>
            <p className="foot-label">Desk</p>
            <Link to="/docs">Docs</Link>
            <Link to="/tweets">Tweet drafts</Link>
            <Link to="/docs#setup">Setup note</Link>
          </div>
          <div>
            <p className="foot-label">Network</p>
            <p>{BRAND.chain}</p>
            <p>{BRAND.settlement} settlement</p>
            <a href={BRAND.handleUrl} target="_blank" rel="noreferrer">
              {BRAND.handle}
            </a>
          </div>
        </div>
        <div className="wrap footer-base">
          <p>© {new Date().getFullYear()} {BRAND.name}. Sample rates are a preview, not provider invoices.</p>
          <p className="mono">Mint {BRAND.mint || "pending"}</p>
        </div>
      </footer>
    </div>
  );
}
