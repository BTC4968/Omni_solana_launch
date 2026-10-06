// Identity, chain, and mint. Edit this file when the launch details are approved.
export const BRAND = {
  name: "Quay",
  ticker: "QUAY",
  handle: "@quaydesk",
  handleUrl: "https://x.com/quaydesk",
  website: "",
  chain: "Solana",
  cluster: "mainnet-beta",
  settlement: "USDC",
  discount: 0.06,
  mint: "",
  supply: "1,000,000,000",
  decimals: 6,
  tagline: "One key for every model. Solana settles the bill.",
};

export function mintLabel() {
  return BRAND.mint || "Pending";
}

export function websiteLabel() {
  return BRAND.website || "[WEBSITE]";
}

export function fillTokens(text) {
  return text
    .replaceAll("[MINT]", mintLabel())
    .replaceAll("[WEBSITE]", websiteLabel())
    .replaceAll("[TICKER]", `$${BRAND.ticker}`)
    .replaceAll("[HANDLE]", BRAND.handle);
}
