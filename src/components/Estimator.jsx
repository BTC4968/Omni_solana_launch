import { useMemo, useState } from "react";
import { MODELS } from "../data";
import { BRAND } from "../brand";
import { listPrice, money, withDiscount } from "../format";

export default function Estimator() {
  const [modelId, setModelId] = useState("sonnet");
  const [inputTokens, setInputTokens] = useState(2000);
  const [outputTokens, setOutputTokens] = useState(500);
  const [units, setUnits] = useState(1);
  const model = useMemo(() => MODELS.find((item) => item.id === modelId) || MODELS[0], [modelId]);
  const list = listPrice(model, {
    inputTokens,
    outputTokens,
    units: model.kind === "text" ? 1 : units,
  });
  const quay = withDiscount(list);

  return (
    <form className="est" onSubmit={(event) => event.preventDefault()}>
      <p className="kicker">Estimate · 1 call</p>
      <label className="field">
        <span>Model</span>
        <select
          value={model.id}
          onChange={(event) => {
            const next = MODELS.find((item) => item.id === event.target.value);
            setModelId(event.target.value);
            setUnits(next?.kind === "video" ? 4 : 1);
          }}
        >
          {MODELS.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name} · {item.provider}
            </option>
          ))}
        </select>
      </label>
      {model.kind === "text" ? (
        <div className="sliders">
          <label>
            <span>Input tokens · {inputTokens.toLocaleString()}</span>
            <input type="range" min="200" max="32000" step="200" value={inputTokens} onChange={(event) => setInputTokens(Number(event.target.value))} />
          </label>
          <label>
            <span>Output tokens · {outputTokens.toLocaleString()}</span>
            <input type="range" min="50" max="8000" step="50" value={outputTokens} onChange={(event) => setOutputTokens(Number(event.target.value))} />
          </label>
        </div>
      ) : (
        <label className="field">
          <span>
            {model.kind === "video" ? "Seconds" : "Quantity"} · {units}
          </span>
          <input
            type="range"
            min="1"
            max={model.kind === "video" ? 12 : 8}
            step="1"
            value={units}
            onChange={(event) => setUnits(Number(event.target.value))}
          />
        </label>
      )}
      <div className="est-total">
        <strong className="mono">{money(quay)}</strong>
        <span>with the {Math.round(BRAND.discount * 100)}% pool</span>
      </div>
      <dl className="est-split">
        <div>
          <dt>List</dt>
          <dd className="mono">{money(list)}</dd>
        </div>
        <div>
          <dt>${BRAND.ticker} pool</dt>
          <dd className="mono save">−{money(list - quay)}</dd>
        </div>
      </dl>
      <p className="fine">Sample math on the preview rate card. Not a live invoice.</p>
    </form>
  );
}
