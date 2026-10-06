import { Link } from "react-router-dom";
import { useTitle } from "../useTitle";

export default function NotFound() {
  useTitle("Not found — Quay");
  return (
    <section className="page">
      <div className="wrap">
        <p className="kicker">404</p>
        <h1 className="page-title">That page is not on the desk.</h1>
        <Link to="/" className="btn btn-lime">
          Back home
        </Link>
      </div>
    </section>
  );
}
