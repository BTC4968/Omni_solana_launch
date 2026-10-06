import { Link } from "react-router-dom";
import Snippets from "../components/Snippets";
import { BRAND } from "../brand";
import { useTitle } from "../useTitle";

export default function Docs() {
  useTitle("Docs — Quay");
  return (
    <section className="page">
      <div className="wrap docs">
        <p className="kicker">Desk notes</p>
        <h1 className="page-title">How a call is designed to work.</h1>
        <p className="lede">
          {BRAND.name} is a preview of a Solana model desk. The pages you can click are real. Provider calls, on-chain settlement, and the ${BRAND.ticker} mint are not connected yet.
        </p>

        <article id="call">
          <h2>A priced call</h2>
          <p>
            The agent sends a normal request. If there is no key, the desk answers with HTTP 402 and a price in {BRAND.settlement}. The agent signs a Solana transfer for that amount. After the transfer is observed, the desk runs the model and returns the result.
          </p>
          <p>
            The network fee is meant to be paid by the desk, so the agent wallet only needs {BRAND.settlement}. That sponsorship is a design choice for the live desk. This site does not broadcast a transaction.
          </p>
        </article>

        <article id="keys">
          <h2>Keys</h2>
          <p>
            A person can top up with {BRAND.settlement} on {BRAND.chain} and issue a key per agent, each with a spend cap. The preview key form stores names in this browser so you can see the layout. Those keys cannot call a model.
          </p>
          <p>
            <Link to="/token#keys">Open the key preview</Link>
          </p>
        </article>

        <article id="pool">
          <h2>The pool</h2>
          <p>
            A share of ${BRAND.ticker} trading fees is meant to refill a public pool. While the pool has funds, calls are priced {Math.round(BRAND.discount * 100)}% under the provider list, for every key. You do not have to hold the token. The pool on this site is illustrative.
          </p>
        </article>

        <article id="jobs">
          <h2>Autopilot</h2>
          <p>
            One brief and a budget become a plan: copy, image, edit, voice, video. Each step is billed at its own price and should stop before the budget. The replay on the homepage is a sample, with sample costs.
          </p>
        </article>

        <article id="setup">
          <h2>Setup</h2>
          <p>The host in these snippets is a placeholder. Replace it when a server exists. Do not point an agent at a mint address that has not been deployed.</p>
          <Snippets />
        </article>

        <article>
          <h2>What this preview will not do</h2>
          <ul>
            <li>Call a model provider.</li>
            <li>Open a wallet or ask for a seed phrase.</li>
            <li>Show a chart, a buy button, or a mint address before launch.</li>
            <li>Post to X. Drafts stay in the browser until you copy them.</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
