export const MODES = [
  { id: "text", label: "Text" },
  { id: "image", label: "Image" },
  { id: "video", label: "Video" },
  { id: "edit", label: "Edit" },
  { id: "voice", label: "Voice" },
  { id: "search", label: "Search" },
  { id: "embed", label: "Embed" },
];

export const MODELS = [
  { id: "sonnet", name: "Claude Sonnet class", provider: "Anthropic", kind: "text", unit: "1M tokens", inRate: 3, outRate: 15, featured: true, blurb: "Briefs, edits, and long instructions." },
  { id: "opus", name: "Claude Opus class", provider: "Anthropic", kind: "text", unit: "1M tokens", inRate: 5, outRate: 25, blurb: "Harder reasoning when the cheap pass is not enough." },
  { id: "gpt", name: "GPT flagship class", provider: "OpenAI", kind: "text", unit: "1M tokens", inRate: 2.5, outRate: 10, featured: true, blurb: "General desk model for code and copy." },
  { id: "flash", name: "Gemini Flash class", provider: "Google", kind: "text", unit: "1M tokens", inRate: 0.15, outRate: 0.6, featured: true, blurb: "Fast reads, long context, low quote." },
  { id: "grok", name: "Grok class", provider: "xAI", kind: "text", unit: "1M tokens", inRate: 2, outRate: 6, blurb: "A second opinion with a different tone." },
  { id: "deepseek", name: "DeepSeek class", provider: "DeepSeek", kind: "text", unit: "1M tokens", inRate: 0.27, outRate: 1.1, featured: true, blurb: "Code review without the flagship quote." },
  { id: "qwen", name: "Qwen class", provider: "Alibaba", kind: "text", unit: "1M tokens", inRate: 0.4, outRate: 1.6, blurb: "Multilingual drafts and tool calls." },
  { id: "llama", name: "Llama class", provider: "Meta", kind: "text", unit: "1M tokens", inRate: 0.2, outRate: 0.6, blurb: "Open-weight class for bulk notes." },
  { id: "still", name: "Still studio", provider: "Image desk", kind: "image", unit: "image", price: 0.048, featured: true, blurb: "Pack shots and stall cards." },
  { id: "faststill", name: "Fast still", provider: "Image desk", kind: "image", unit: "image", price: 0.02, blurb: "A quick frame while the copy is still moving." },
  { id: "poster", name: "Poster ink", provider: "Image desk", kind: "image", unit: "image", price: 0.036, blurb: "Flat color, type-friendly posters." },
  { id: "edit", name: "Edit pass", provider: "Image desk", kind: "edit", unit: "edit", price: 0.055, featured: true, blurb: "Recolor, relight, or swap a background." },
  { id: "loop", name: "Short loop", provider: "Video desk", kind: "video", unit: "second", price: 0.11, featured: true, blurb: "Four to eight seconds, one setup." },
  { id: "fastloop", name: "Fast loop", provider: "Video desk", kind: "video", unit: "second", price: 0.07, blurb: "A cheaper motion pass for drafts." },
  { id: "take", name: "Long take", provider: "Video desk", kind: "video", unit: "second", price: 0.2, blurb: "Slower camera, higher quote." },
  { id: "speak", name: "Speak", provider: "Voice desk", kind: "voice", unit: "clip", price: 0.016, featured: true, blurb: "One spoken line back as audio." },
  { id: "transcribe", name: "Transcribe", provider: "Voice desk", kind: "voice", unit: "minute", price: 0.006, blurb: "Voice note in, text out." },
  { id: "embed", name: "Embed small", provider: "Memory desk", kind: "embed", unit: "1M tokens", price: 0.02, blurb: "Notes, menus, and old orders." },
  { id: "rerank", name: "Rerank", provider: "Memory desk", kind: "embed", unit: "1k rows", price: 0.03, blurb: "Pull the five lines that match the question." },
];

export const PROMPTS = {
  text: "Write the stall sign for a night-market fish grill. Three short lines, no emojis.",
  image: "Charcoal grill, two fish, paper lamps, wet wood. No logo.",
  video: "Four seconds of steam over the grill. Hands only. No music.",
  edit: "Same grill, kettle now matte black, lamp a little warmer.",
  voice: "Speak this line: Order's up. Two yellowtail.",
  search: "What time do the night-market stalls have to close on weeknights? Use the market rules.",
  embed: "Embed these stall notes and rerank for 'yellowtail, no chili'.",
};

export const REPLIES = {
  text: "Night catch.\nGrilled while you wait.\nYellowtail until it is gone.",
  image: "Sample frame: two fish on a charcoal grill, paper lamps, wet wood, no lettering.",
  video: "Sample storyboard: 4s, steam, hands enter, fish turns, hold. No audio claimed.",
  edit: "Sample edit: same stall, kettle switched to matte black, lamp warmed.",
  voice: "Sample line ready: “Order's up. Two yellowtail.”",
  search: "Sample note: weeknight stalls close at 11. Cite the market rules before you treat this as fact. This preview did not fetch the web.",
  embed: "Sample index: 800 notes embedded. Top hit: yellowtail, salt only, stall 14.",
};

export const CAPABILITIES = [
  {
    n: "01",
    title: "Finish the stall from one brief",
    body: "Autopilot splits a brief into steps, assigns a model to each, and brings back copy, a still, an edit, a clip, and a spoken line on one receipt.",
    example: 'build "night stall for a clay kettle"',
  },
  {
    n: "02",
    title: "Ask for a second read",
    body: "The agent already writes. It can send the same question to another language model before it ships the line.",
    example: "is this fee copy clear? → name the chain",
  },
  {
    n: "03",
    title: "Make the stills",
    body: "Image models for the stall card, the poster, and the pack shot. Same key as the language models.",
    example: "clay kettle, wet wood, one lamp",
  },
  {
    n: "04",
    title: "Change the still",
    body: "Recolor, relight, or swap the background without leaving the desk.",
    example: "make the kettle matte black",
  },
  {
    n: "05",
    title: "Cut a short clip",
    body: "Video models for a few seconds of the stall. The quote is per second, so the budget is visible first.",
    example: "steam, hands, four seconds",
  },
  {
    n: "06",
    title: "Read the web and the file",
    body: "A chat can take a PDF with the prompt. Search grounding is part of the desk design. This preview does not fetch live pages.",
    example: "chat with the market-rules pdf",
  },
  {
    n: "07",
    title: "Remember the stall",
    body: "Embedding and rerank models for notes, menus, and old orders, on the same key.",
    example: "embed 800 notes · rerank top 5",
  },
  {
    n: "08",
    title: "Talk and listen",
    body: "A voice note comes in as text. A spoken line goes out as audio.",
    example: 'transcribe the note, then speak "Order\'s up."',
  },
  {
    n: "09",
    title: "Pay the call on Solana",
    body: "No card. The desk answers with a USDC quote. The agent signs a Solana transfer. The design has the desk cover the network fee, so the agent does not need SOL.",
    example: "402 · 0.041 USDC → signed → result",
  },
  {
    n: "10",
    title: "Install from one message",
    body: "The agent reads the setup note, adds the MCP server, and asks you for a key or a wallet.",
    example: "mcp add quay · ask for a key",
  },
];

export const LANES = [
  {
    n: "01",
    title: "Language",
    ids: ["sonnet", "gpt", "deepseek", "llama"],
  },
  {
    n: "02",
    title: "Picture",
    ids: ["still", "poster", "edit", "faststill"],
  },
  {
    n: "03",
    title: "Motion",
    ids: ["loop", "fastloop", "take"],
  },
];

export const JOB = {
  id: "sample_7kQ2",
  prompt: "Launch stall for a clay kettle at a night market. Name, stall card, a darker edit, a four-second clip, and one spoken line. Stay under $2.",
  steps: [
    { id: "copy", label: "Copy", model: "Claude Sonnet class", cost: 0.02, out: "Kiln & Tide\nClay kettle. Night market.\nWater just off the boil." },
    { id: "image", label: "Image", model: "Still studio", cost: 0.048, out: "Stall card: clay kettle, wet wood, one paper lamp." },
    { id: "edit", label: "Edit", model: "Edit pass", cost: 0.055, out: "Same card, kettle switched to matte black." },
    { id: "voice", label: "Voice", model: "Speak", cost: 0.016, out: "Spoken line: “Kiln and Tide. Kettle’s hot.”" },
    { id: "video", label: "Video", model: "Short loop", cost: 0.44, out: "4s clip: steam, hands, lamp. Sample storyboard only." },
  ],
};

export const FRAMES = [
  { id: "grill", title: "Grill and paper lamps", model: "Still studio", caption: "Night stall, warm practical light.", src: "/samples/grill-lamps.jpg" },
  { id: "kettle", title: "Matte black kettle", model: "Edit pass", caption: "Same setup after a recolor.", src: "/samples/black-kettle.jpg" },
  { id: "poster", title: "Poster ink", model: "Poster ink", caption: "Two-color stall poster.", src: "/samples/poster-ink.jpg" },
  { id: "steam", title: "Steam loop", model: "Short loop", caption: "A still from a four-second storyboard.", src: "/samples/steam-still.jpg" },
];

export function sampleImage(mode, modelId) {
  if (modelId === "poster") return "/samples/poster-ink.jpg";
  if (mode === "image") return "/samples/grill-lamps.jpg";
  if (mode === "edit") return "/samples/black-kettle.jpg";
  if (mode === "video") return "/samples/steam-still.jpg";
  return "";
}

export const INSTALL = [
  {
    id: "agent",
    label: "Any agent",
    hint: "Paste this to the agent. It should read the note, add the MCP server, and ask for a key or a wallet.",
    code: "Read the Quay setup note and connect the desk so you can call text, image, video, voice, and embedding models. Settlement is USDC on Solana. If I do not have a key, ask me for one or use a wallet signature. Do not invent a mint address.",
  },
  {
    id: "claude",
    label: "Claude Code",
    hint: "The host is a placeholder until the desk URL is live.",
    code: "claude mcp add quay --transport http https://[DESK]/mcp",
  },
  {
    id: "cursor",
    label: "Cursor",
    hint: "Drop this into the MCP config. Replace [DESK] when the server exists.",
    code: `{
  "mcpServers": {
    "quay": {
      "url": "https://[DESK]/mcp"
    }
  }
}`,
  },
  {
    id: "wallet",
    label: "Wallet",
    hint: "A call with no key. The agent signs the USDC transfer on Solana.",
    code: `POST /v1/chat/completions
← 402 · price in USDC
→ signed Solana USDC transfer
← 200 · result

The desk is designed to cover the network fee.
Nothing in this preview is signed or broadcast.`,
  },
];

export const FAQS = [
  {
    q: "Which models?",
    a: "The preview catalog on this site is a sample rate card: language, image, edit, video, voice, and embeddings. It is not a live feed of provider invoices. The desk is designed to add models without a new key.",
  },
  {
    q: "Can an agent pay on its own?",
    a: "That is the design. A call with no key gets a USDC quote. The agent signs a Solana transfer, and the desk covers the network fee so the agent does not need SOL. Or you top up and hand it a key with a spend cap.",
  },
  {
    q: "Can an agent run up a bill?",
    a: "Keys are meant to carry a spend cap. A call should reserve its worst case before it runs. The local MCP is meant to enforce a daily budget. Those limits are not enforced by this preview.",
  },
  {
    q: "Do you keep prompts?",
    a: "The desk is designed to keep billing records only: model, cost, and time. This preview stores tweet drafts and sample keys in your browser, and nowhere else.",
  },
  {
    q: "Do I need the token?",
    a: "No. $QUAY trading fees are meant to refill a public pool. While that pool has funds, calls are priced 6% under the sample list. You can use a key without holding the token.",
  },
  {
    q: "What if a call fails?",
    a: "Provider errors, blocked images, and failed clips are designed to cost nothing. You should not be billed for a result the desk did not deliver.",
  },
];

export const TWEET_DEFAULTS = {
  pinId: "launch",
  posts: [
    {
      id: "launch",
      label: "Launch",
      when: "When the mint is confirmed and the site matches it",
      body: "Quay is a Solana desk for agents.\n\nOne key for text, image, video, voice, and embeddings. Each call is quoted in USDC.\n\n$QUAY\nMint: [MINT]\n[WEBSITE]",
    },
    {
      id: "function",
      label: "How a call works",
      when: "15–30 minutes after launch",
      body: "How a Quay call works:\n\n1. The agent asks for a model\n2. Quay quotes the call in USDC\n3. The agent signs on Solana\n4. The result comes back\n\nA failed call is designed to cost nothing.\n\n[WEBSITE]",
    },
    {
      id: "story",
      label: "Why it exists",
      when: "60–90 minutes after launch",
      body: "Most model routers want a card.\n\nQuay is built so the wallet can be the customer. A share of $QUAY trading fees is meant to refill a pool that prices calls under the list.\n\nYou do not need the token to use a key.\n\n[WEBSITE]",
    },
    {
      id: "faq",
      label: "FAQ",
      when: "3–4 hours after launch",
      body: "FAQ\n\nDo you need $QUAY to call a model? No.\nDoes a failed call bill you? It should not.\nWhere does a call settle? USDC on Solana.\n\nMint: [MINT]",
    },
  ],
};

export function modelById(id) {
  return MODELS.find((model) => model.id === id) || MODELS[0];
}

export function modelsForMode(mode) {
  const kind = mode === "search" ? "text" : mode;
  return MODELS.filter((model) => model.kind === kind);
}
