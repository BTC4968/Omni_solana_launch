import { useState } from "react";
import { INSTALL } from "../data";
import { copyText } from "../storage";

export default function Snippets() {
  const [tab, setTab] = useState(INSTALL[0].id);
  const [copied, setCopied] = useState(false);
  const current = INSTALL.find((item) => item.id === tab) || INSTALL[0];

  async function copy() {
    const ok = await copyText(current.code);
    setCopied(ok);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="snippets">
      <div className="tabs" role="tablist" aria-label="Setup snippet">
        {INSTALL.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={tab === item.id}
            className={tab === item.id ? "on" : ""}
            onClick={() => {
              setTab(item.id);
              setCopied(false);
            }}
          >
            {item.label}
          </button>
        ))}
      </div>
      <p className="fine">{current.hint}</p>
      <pre className="code"><code>{current.code}</code></pre>
      <button type="button" className="btn btn-line" onClick={copy}>
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
