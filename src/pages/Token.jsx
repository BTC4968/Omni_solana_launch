import { useState } from "react";
import { BRAND, mintLabel } from "../brand";
import { useStored } from "../storage";
import { useTitle } from "../useTitle";

export default function Token() {
  useTitle(`$${BRAND.ticker} — Quay`);
  const [keys, setKeys] = useStored("quay-preview-keys", []);
  const [name, setName] = useState("");
  const [cap, setCap] = useState(10);
  const [error, setError] = useState("");

  function addKey(event) {
    event.preventDefault();
    const label = name.trim();
    const spend = Number(cap);
    if (!label) {
      setError("Name the key.");
      return;
    }
    if (!Number.isFinite(spend) || spend <= 0) {
      setError("Set a spend cap above zero.");
      return;
    }
    setKeys((list) => [
      { id: crypto.randomUUID(), name: label, cap: spend, spent: 0 },
      ...list,
    ]);
    setName("");
    setCap(10);
    setError("");
  }

  function revoke(id) {
    setKeys((list) => list.filter((key) => key.id !== id));
  }

  return (
    <section className="page">
      <div className="wrap token-grid">
        <div>
          <p className="kicker">Token</p>
          <h1 className="page-title">${BRAND.ticker}</h1>
          <p className="lede">
            Trading fees on ${BRAND.ticker} are meant to refill the pool that prices model calls {Math.round(BRAND.discount * 100)}% under the list. The token is not required to hold a key.
          </p>
          <dl className="spec">
            <div>
              <dt>Chain</dt>
              <dd>{BRAND.chain}</dd>
            </div>
            <div>
              <dt>Settlement</dt>
              <dd>{BRAND.settlement}</dd>
            </div>
            <div>
              <dt>Mint</dt>
              <dd className="mono">{mintLabel()}</dd>
            </div>
            <div>
              <dt>Supply</dt>
              <dd className="mono">{BRAND.supply}</dd>
            </div>
            <div>
              <dt>Decimals</dt>
              <dd className="mono">{BRAND.decimals}</dd>
            </div>
            <div>
              <dt>Planned handle</dt>
              <dd>
                <a href={BRAND.handleUrl} target="_blank" rel="noreferrer">
                  {BRAND.handle}
                </a>
              </dd>
            </div>
          </dl>
          <p className="fine">
            Supply, decimals, and authorities are planning figures. They update in one config file when the mint is deployed. Buy and chart stay off until then.
          </p>
          <div className="token-actions">
            <button type="button" className="btn btn-lime" disabled>
              Buy · opens with the mint
            </button>
            <button type="button" className="btn btn-line" disabled>
              Chart · opens with the mint
            </button>
          </div>
        </div>

        <div className="pane" id="keys">
          <p className="mono faint">Preview keys</p>
          <h2>Hand one to each agent</h2>
          <p>Names and caps stay in this browser. They are not on-chain and they cannot spend.</p>
          <form className="key-form" onSubmit={addKey}>
            <label className="field">
              <span>Name</span>
              <input value={name} onChange={(event) => setName(event.target.value)} placeholder="research-agent" />
            </label>
            <label className="field">
              <span>Spend cap, USD</span>
              <input
                type="number"
                min="1"
                step="1"
                value={cap}
                onChange={(event) => setCap(event.target.value)}
              />
            </label>
            <button type="submit" className="btn btn-lime">
              Add key
            </button>
          </form>
          {error && <p className="form-error">{error}</p>}
          {keys.length === 0 ? (
            <p className="empty">No preview keys yet.</p>
          ) : (
            <ul className="key-list">
              {keys.map((key) => (
                <li key={key.id}>
                  <span>
                    <strong>{key.name}</strong>
                    <small className="mono">
                      ${key.spent.toFixed(2)} / ${Number(key.cap).toFixed(2)}
                    </small>
                  </span>
                  <button type="button" className="text-btn" onClick={() => revoke(key.id)}>
                    Revoke
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
