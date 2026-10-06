import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MODES, PROMPTS, REPLIES, modelById, modelsForMode, sampleImage } from "../data";
import { listPrice, money, usdc, withDiscount } from "../format";

function modeForModel(model) {
  return model.kind === "text" ? "text" : model.kind;
}

export default function Runner({ compact = false }) {
  const [params] = useSearchParams();
  const requested = params.get("model");
  const starter = modelById(requested || "sonnet");
  const [mode, setMode] = useState(modeForModel(starter));
  const [modelId, setModelId] = useState(starter.id);
  const [prompt, setPrompt] = useState(PROMPTS[modeForModel(starter)]);
  const [inputTokens, setInputTokens] = useState(2000);
  const [outputTokens, setOutputTokens] = useState(400);
  const [units, setUnits] = useState(modeForModel(starter) === "video" ? 4 : 1);
  const [phase, setPhase] = useState("idle");
  const [quote, setQuote] = useState(null);
  const timer = useRef(null);

  const choices = useMemo(() => modelsForMode(mode), [mode]);
  const model = choices.find((item) => item.id === modelId) || choices[0];

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (!requested) return;
    const next = modelById(requested);
    const nextMode = modeForModel(next);
    setMode(nextMode);
    setModelId(next.id);
    setPrompt(PROMPTS[nextMode]);
    setUnits(next.kind === "video" ? 4 : 1);
    setPhase("idle");
    setQuote(null);
  }, [requested]);

  function selectMode(next) {
    const nextModels = modelsForMode(next);
    setMode(next);
    setModelId(nextModels[0].id);
    setPrompt(PROMPTS[next]);
    setUnits(next === "video" ? 4 : 1);
    setPhase("idle");
    setQuote(null);
  }

  function reset() {
    clearTimeout(timer.current);
    setPhase("idle");
    setQuote(null);
  }

  function getQuote() {
    clearTimeout(timer.current);
    setPhase("quoting");
    setQuote(null);
    const amount = {
      inputTokens,
      outputTokens,
      units: model.kind === "text" ? 1 : units,
    };
    timer.current = setTimeout(() => {
      const list = listPrice(model, amount);
      setQuote({ list, quay: withDiscount(list) });
      setPhase("quoted");
    }, 450);
  }

  function sign() {
    clearTimeout(timer.current);
    setPhase("signing");
    timer.current = setTimeout(() => setPhase("done"), 650);
  }

  const unitLabel = model.kind === "video" ? "Seconds" : model.kind === "text" ? "Calls" : "Quantity";

  return (
    <div className={`console ${compact ? "console-compact" : ""}`}>
      <div className="console-top">
        <span className="sample-tag">Sample desk</span>
        <span className="mono faint">{model.provider}</span>
      </div>
      <div className="modes" role="tablist" aria-label="Call type">
        {MODES.map((item) => (
          <button
            key={item.id}
            type="button"
            role="tab"
            aria-selected={mode === item.id}
            className={mode === item.id ? "on" : ""}
            onClick={() => selectMode(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <label className="field">
        <span>Prompt</span>
        <textarea rows={compact ? 3 : 5} value={prompt} onChange={(event) => setPrompt(event.target.value)} />
      </label>
      {!compact && model.kind === "text" && (
        <div className="sliders">
          <label>
            <span>Input tokens · {inputTokens.toLocaleString()}</span>
            <input
              type="range"
              min="200"
              max="32000"
              step="200"
              value={inputTokens}
              onChange={(event) => setInputTokens(Number(event.target.value))}
            />
          </label>
          <label>
            <span>Output tokens · {outputTokens.toLocaleString()}</span>
            <input
              type="range"
              min="50"
              max="8000"
              step="50"
              value={outputTokens}
              onChange={(event) => setOutputTokens(Number(event.target.value))}
            />
          </label>
        </div>
      )}
      {!compact && model.kind !== "text" && (
        <label className="field">
          <span>
            {unitLabel} · {units}
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
      <div className="console-row">
        <label className="field grow">
          <span>Model</span>
          <select
            value={model.id}
            onChange={(event) => {
              setModelId(event.target.value);
              reset();
            }}
          >
            {choices.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
        <button type="button" className="btn btn-lime" onClick={getQuote} disabled={phase === "quoting" || phase === "signing"}>
          {phase === "quoting" ? "Quoting…" : "Get a quote"}
        </button>
      </div>
      {quote && (
        <div className="quote-box" aria-live="polite">
          <p className="quote-main">
            <span className="mono">402</span> {usdc(quote.quay)}
          </p>
          <p className="fine">
            List {money(quote.list)} · pool saves {money(quote.list - quote.quay)}
          </p>
          {phase !== "done" && (
            <button type="button" className="btn btn-line" onClick={sign} disabled={phase === "signing"}>
              {phase === "signing" ? "Signing…" : "Sign sample transfer"}
            </button>
          )}
        </div>
      )}
      {phase === "done" && (
        <div className="reply" aria-live="polite">
          <span className="sample-tag">Sample reply</span>
          {sampleImage(mode, model.id) && (
            <img className="reply-still" src={sampleImage(mode, model.id)} alt="" />
          )}
          <p>{REPLIES[mode]}</p>
          <p className="fine">Nothing was signed or broadcast. This is the shape of a call, not a live result.</p>
        </div>
      )}
      {phase !== "idle" && (
        <button type="button" className="text-btn" onClick={reset}>
          Reset
        </button>
      )}
    </div>
  );
}
