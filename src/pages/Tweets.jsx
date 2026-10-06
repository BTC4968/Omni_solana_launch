import { useState } from "react";
import { BRAND, fillTokens } from "../brand";
import { TWEET_DEFAULTS } from "../data";
import { copyText, useStored } from "../storage";
import { useTitle } from "../useTitle";

export default function Tweets() {
  useTitle("Tweet drafts — Quay");
  const [draft, setDraft] = useStored("quay-tweet-drafts", TWEET_DEFAULTS);
  const [copied, setCopied] = useState("");
  const posts = draft.posts || TWEET_DEFAULTS.posts;

  function update(id, body) {
    setDraft({
      ...draft,
      posts: posts.map((post) => (post.id === id ? { ...post, body } : post)),
    });
  }

  async function copy(id, body) {
    const ok = await copyText(fillTokens(body));
    setCopied(ok ? id : "");
    window.setTimeout(() => setCopied(""), 1600);
  }

  function reset() {
    setDraft(TWEET_DEFAULTS);
  }

  return (
    <section className="page">
      <div className="wrap">
        <p className="kicker">X drafts · {BRAND.handle}</p>
        <div className="section-head tweets-head">
          <h1 className="page-title">Four posts, ready to edit.</h1>
          <button type="button" className="btn btn-line" onClick={reset}>
            Reset drafts
          </button>
        </div>
        <p className="lede">
          Edit the copy here. It saves in this browser and does not post. Placeholders fill from the config: mint is {fillTokens("[MINT]")}, site is {fillTokens("[WEBSITE]")}.
        </p>
        <div className="tweet-list">
          {posts.map((post, index) => {
            const filled = fillTokens(post.body);
            const count = filled.length;
            return (
              <article key={post.id} className="tweet">
                <header>
                  <p className="mono faint">
                    {index + 1} · {post.label}
                    {draft.pinId === post.id ? " · pinned" : ""}
                  </p>
                  <p className="fine">{post.when}</p>
                </header>
                <label className="sr" htmlFor={`tweet-${post.id}`}>
                  {post.label} draft
                </label>
                <textarea
                  id={`tweet-${post.id}`}
                  rows={8}
                  value={post.body}
                  onChange={(event) => update(post.id, event.target.value)}
                />
                <footer>
                  <span className={count > 280 ? "over mono" : "mono faint"}>{count} / 280 filled</span>
                  <div className="tweet-actions">
                    <button
                      type="button"
                      className="text-btn"
                      onClick={() => setDraft({ ...draft, pinId: post.id })}
                      disabled={draft.pinId === post.id}
                    >
                      {draft.pinId === post.id ? "Pinned choice" : "Set as pin"}
                    </button>
                    <button type="button" className="btn btn-line" onClick={() => copy(post.id, post.body)}>
                      {copied === post.id ? "Copied" : "Copy filled"}
                    </button>
                  </div>
                </footer>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
