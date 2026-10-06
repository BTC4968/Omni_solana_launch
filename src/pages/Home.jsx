import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BRAND } from "../brand";
import { CAPABILITIES, FAQS, FRAMES, JOB, LANES, MODELS } from "../data";
import { headlineRate, money, withDiscount } from "../format";
import { useTitle } from "../useTitle";
import Estimator from "../components/Estimator";
import Runner from "../components/Runner";
import Snippets from "../components/Snippets";
function modelName(id) {
  return MODELS.find((model) => model.id === id)?.name || id;
}

export default function Home() {
  useTitle("Quay — One key for every model");
  const featured = MODELS.filter((model) => model.featured);
  const [openFaq, setOpenFaq] = useState(0);
  const [cursor, setCursor] = useState(JOB.steps.length);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return undefined;
    if (cursor >= JOB.steps.length) {
      setPlaying(false);
      return undefined;
    }
    const timer = window.setTimeout(() => setCursor((value) => value + 1), 700);
    return () => window.clearTimeout(timer);
  }, [playing, cursor]);

  const spent = JOB.steps.slice(0, cursor).reduce((sum, step) => sum + step.cost, 0);
  const budget = 2;

  function replay() {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setPlaying(false);
      setCursor(JOB.steps.length);
      return;
    }
    setCursor(0);
    setPlaying(true);
  }

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="kicker">Solana desk for agents</p>
            <h1 className="display">
              One key
              <br />
              for every model.
              <br />
              <em>Solana settles the bill.</em>
            </h1>
            <p className="lede">
              {BRAND.name} is a desk where an agent calls text, image, video, voice, and embedding models with one key.
              Each call is quoted in {BRAND.settlement} and signed on {BRAND.chain}.
            </p>
            <div className="hero-actions">
              <Link to="/playground" className="btn btn-lime btn-lg">
                Open the playground
              </Link>
              <Link to="/docs" className="btn btn-line btn-lg">
                Read the docs
              </Link>
            </div>
            <p className="fine">
              Preview catalog · {MODELS.length} sample models · {Math.round(BRAND.discount * 100)}% pool on the rate card · mint pending
            </p>
          </div>
          <Runner compact />
        </div>
      </section>

      <section className="section" id="can">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">01</p>
            <h2>What the agent can leave with.</h2>
            <p>One key covers the whole job. The examples below are the shape of a call, not a live log.</p>
          </div>
          <div className="caps">
            {CAPABILITIES.map((item) => (
              <article key={item.n} className="cap">
                <p className="cap-n mono">{item.n}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <p className="cap-ex mono">{item.example}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pool">
        <div className="wrap pool-grid">
          <div>
            <p className="kicker">02</p>
            <h2>Under the list price, while the pool has funds.</h2>
            <p className="lede">
              A share of ${BRAND.ticker} trading fees is meant to refill a public pool. While it has funds, every model on the desk
              is priced {Math.round(BRAND.discount * 100)}% under the provider list. Holding the token is optional.
            </p>
            <p className="fine">The rows are the preview rate card. They are not live provider invoices, and the pool is not funded yet.</p>
            <Link to="/token" className="text-link">
              See ${BRAND.ticker}
            </Link>
          </div>
          <div className="price-list">
            {featured.map((model) => {
              const rate = headlineRate(model);
              return (
                <div key={model.id} className="price-row">
                  <div>
                    <strong>{model.name}</strong>
                    <small>{rate.label}</small>
                  </div>
                  <div className="price-figures mono">
                    <span className="was">{money(rate.list)}</span>
                    <span>{money(withDiscount(rate.list))}</span>
                    <span className="save">−{Math.round(BRAND.discount * 100)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section" id="lanes">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">03</p>
            <h2>The agent picks. You hold one key.</h2>
            <p>Same credential for language, picture, and motion. New models are meant to show up without a new account.</p>
          </div>
          <div className="lanes">
            {LANES.map((lane) => (
              <article key={lane.n} className="lane">
                <p className="mono faint">{lane.n} · {lane.title}</p>
                <ul>
                  {lane.ids.map((id) => (
                    <li key={id}>
                      <Link to={`/playground?model=${id}`}>{modelName(id)}</Link>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <Link to="/models" className="text-link">
            Browse all {MODELS.length} preview models
          </Link>
        </div>
      </section>

      <section className="section" id="autopilot">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">04</p>
            <h2>One brief. A plan, then the assets.</h2>
            <p>
              Post a brief and a budget. The desk plans the steps, runs them, and returns one receipt. Below is a sample replay, already finished. Replay walks it again.
            </p>
          </div>
          <div className="job">
            <div className="job-top">
              <p className="mono faint">Sample replay · {JOB.id}</p>
              <button type="button" className="btn btn-line" onClick={replay} disabled={playing}>
                {playing ? "Replaying" : "Replay sample"}
              </button>
            </div>
            <div className="job-grid">
              <article className="pane">
                <p className="mono faint">Brief</p>
                <p>{JOB.prompt}</p>
                <p className="fine mono">POST /v1/jobs · budget {money(budget)}</p>
              </article>
              <article className="pane">
                <p className="mono faint">Plan</p>
                <ol className="plan">
                  {JOB.steps.map((step, index) => (
                    <li key={step.id} className={index < cursor ? "done" : ""}>
                      <span>{step.label}</span>
                      <small>{index < cursor ? step.model : "queued"}</small>
                    </li>
                  ))}
                </ol>
                <p className="meter">
                  <span style={{ width: `${Math.min(100, (spent / budget) * 100)}%` }} />
                </p>
                <p className="fine mono">
                  {Math.min(cursor, JOB.steps.length)}/{JOB.steps.length} steps · {money(spent)} of {money(budget)}
                </p>
              </article>
              <article className="pane">
                <p className="mono faint">Outputs</p>
                <ul className="outputs">
                  {JOB.steps.map((step, index) => (
                    <li key={step.id}>
                      <span className="mono">{step.label}</span>
                      <p>{index < cursor ? step.out : "Waiting on the plan."}</p>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
            <p className="fine">Sample replay. No job was submitted and no file was generated.</p>
          </div>
        </div>
      </section>

      <section className="section" id="frames">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">05</p>
            <h2>Sample stills.</h2>
            <p>Preview photographs for the gallery. A live job is meant to drop its files in this same layout.</p>
          </div>
          <div className="frames">
            {FRAMES.map((frame) => (
              <figure key={frame.id} className="frame">
                <img src={frame.src} alt={frame.title} />
                <figcaption>
                  <strong>{frame.title}</strong>
                  <span className="mono faint">{frame.model}</span>
                  <span>{frame.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="setup">
        <div className="wrap setup-grid">
          <div>
            <p className="kicker">06</p>
            <h2>One message. The agent connects itself.</h2>
            <p className="lede">
              Paste a note into Claude Code, Cursor, or any other agent. It should read the setup, add the MCP server, and ask you for a key or a wallet.
            </p>
          </div>
          <Snippets />
        </div>
      </section>

      <section className="section" id="settle">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker">07</p>
            <h2>You top up. The agent signs.</h2>
            <p>Both paths settle in {BRAND.settlement} on {BRAND.chain}. No card and no subscription.</p>
          </div>
          <div className="settle-grid">
            <article className="pane">
              <p className="mono faint">01 · you</p>
              <h3>Top up, hand out keys</h3>
              <p>
                Sign in with a wallet, send {BRAND.settlement} on {BRAND.chain}, and give each agent a key with a spend cap. Revoke a key when the job is over.
              </p>
              <Link to="/token#keys" className="btn btn-line">
                Issue a preview key
              </Link>
            </article>
            <article className="pane">
              <p className="mono faint">02 · the agent</p>
              <h3>It pays the quote</h3>
              <ol className="flow">
                <li>
                  <span>POST /v1/chat/completions</span>
                  <small>no key on the request</small>
                </li>
                <li>
                  <span>402 · a USDC price</span>
                  <small>quoted before the call runs</small>
                </li>
                <li>
                  <span>Signed Solana transfer</span>
                  <small>the agent’s wallet, not an EVM signature</small>
                </li>
                <li>
                  <span>200 · the result</span>
                  <small>network fee covered by the desk, by design</small>
                </li>
              </ol>
              <Link to="/playground" className="text-link">
                Walk a sample quote
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section className="section" id="rates">
        <div className="wrap rate-layout">
          <div>
            <p className="kicker">08</p>
            <h2>Sample rate card.</h2>
            <p className="lede">
              No subscription and no minimum. A call is meant to reserve its worst case and settle what the provider billed. Failed calls are designed to be free.
            </p>
            <div className="rate-groups">
              {["text", "image", "video"].map((kind) => (
                <div key={kind}>
                  <h3>{kind === "text" ? "Language" : kind === "image" ? "Images" : "Video"}</h3>
                  <ul className="rate-list">
                    {MODELS.filter((model) => model.kind === kind).map((model) => {
                      const rate = headlineRate(model);
                      return (
                        <li key={model.id}>
                          <span>
                            <strong>{model.name}</strong>
                            <small>{model.provider}</small>
                          </span>
                          <span className="mono">{money(rate.list)}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <Estimator />
        </div>
      </section>

      <section className="section" id="faq">
        <div className="wrap faq-wrap">
          <div className="section-head">
            <p className="kicker">09</p>
            <h2>Questions</h2>
          </div>
          <div className="faq">
            {FAQS.map((item, index) => {
              const open = openFaq === index;
              return (
                <div key={item.q} className={open ? "faq-item open" : "faq-item"}>
                  <button type="button" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : index)}>
                    {item.q}
                    <span aria-hidden="true">{open ? "–" : "+"}</span>
                  </button>
                  {open && <p>{item.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
