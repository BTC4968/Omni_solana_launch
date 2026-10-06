import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MODELS } from "../data";
import { headlineRate, money, withDiscount } from "../format";
import { BRAND } from "../brand";
import { useTitle } from "../useTitle";

const FILTERS = ["all", "text", "image", "edit", "video", "voice", "embed"];

export default function Models() {
  useTitle("Models — Quay");
  const [params] = useSearchParams();
  const qParam = params.get("q") || "";
  const [query, setQuery] = useState(qParam);
  const [kind, setKind] = useState("all");

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MODELS.filter((model) => {
      if (kind !== "all" && model.kind !== kind) return false;
      if (!q) return true;
      return [model.name, model.provider, model.kind, model.blurb].join(" ").toLowerCase().includes(q);
    });
  }, [query, kind]);

  return (
    <section className="page">
      <div className="wrap">
        <p className="kicker">Preview catalog</p>
        <h1 className="page-title">Models</h1>
        <p className="lede">
          {MODELS.length} entries on the sample rate card. Quotes use the {Math.round(BRAND.discount * 100)}% pool price. This list is not a live provider feed.
        </p>
        <div className="toolbar">
          <label className="field grow">
            <span className="sr">Filter models</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by name or provider"
            />
          </label>
          <div className="filters" role="tablist" aria-label="Model kind">
            {FILTERS.map((item) => (
              <button key={item} type="button" className={kind === item ? "on" : ""} onClick={() => setKind(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
        {visible.length === 0 ? (
          <p className="empty">No preview models match that filter.</p>
        ) : (
          <div className="model-grid">
            {visible.map((model) => {
              const rate = headlineRate(model);
              return (
                <article key={model.id} className="model-card">
                  <p className="mono faint">{model.kind}</p>
                  <h2>{model.name}</h2>
                  <p>{model.provider}</p>
                  <p className="blurb">{model.blurb}</p>
                  <p className="mono rate-line">
                    <span className="was">{money(rate.list)}</span>
                    <span>{money(withDiscount(rate.list))}</span>
                  </p>
                  <p className="fine">{rate.label}</p>
                  <Link to={`/playground?model=${model.id}`}>Try a sample quote</Link>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
