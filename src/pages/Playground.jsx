import Runner from "../components/Runner";
import { BRAND } from "../brand";
import { useTitle } from "../useTitle";

export default function Playground() {
  useTitle("Playground — Quay");
  return (
    <section className="page">
      <div className="wrap play-grid">
        <div>
          <p className="kicker">Sample desk</p>
          <h1 className="page-title">Playground</h1>
          <p className="lede">
            Pick a model, read the USDC quote, then sign a sample transfer. The reply is canned. Nothing is sent to a provider and nothing lands on Solana.
          </p>
          <ol className="quiet-list">
            <li>The quote uses the preview rate card, including the {Math.round(BRAND.discount * 100)}% pool.</li>
            <li>The signature button does not open a wallet.</li>
            <li>Search mode does not fetch the web.</li>
          </ol>
        </div>
        <Runner />
      </div>
    </section>
  );
}
