---
title: "The DeepSeek discount: China's AI is closing the gap — and it costs a tenth as much"
date: 2026-07-14
summary: DeepSeek is preparing an IPO at a rumoured ~$71B valuation, and China's models now land within single digits of the Western frontier while charging 5–30x less. The interesting question for a North American reader is not whether to buy the stock — it is whether that price gap is a real arbitrage or a trap. Here is our read.
tags: ai, china, arbitrage
---

<p class="article-dek">On July 14, 2026, Bloomberg reported that DeepSeek — the Hangzhou lab that wiped a record $589 billion off NVIDIA in a single day last year — is preparing to file for an IPO, weeks after a funding round that valued it near $71 billion. Strip away the headline and a simpler question sits underneath it: China's AI models are now nearly as good as the West's and a fraction of the price. Is that gap something a North American buyer can actually capture, or a mirage with a border running through it?</p>

<p class="lead">Our thesis in one sentence: the <strong>capability</strong> gap between Chinese and Western AI has narrowed to single digits, while the <strong>price</strong> gap has stayed enormous — and that mismatch is a genuine arbitrage, but it lives in the open-weight models, not in the IPO. You probably can't buy the DeepSeek listing, and you may not want the DeepSeek app. What you can use is the thing DeepSeek gives away for free.</p>

This is the third piece in a thread we began with the [token economy](/blog/the-token-economy) — where we argued the price of intelligence is collapsing ~10x a year and margin pools at the silicon layer, not the model layer. DeepSeek is that collapse wearing a national flag. If intelligence is becoming a commodity, the low-cost commodity producer matters. China now has several.

## Where this started: the $6 million model

You have to rewind eighteen months to understand the stakes. DeepSeek was founded in **July 2023** by Liang Wenfeng, who also runs a quantitative hedge fund called High-Flyer.<sup class="cite"><a href="#fn1">1</a></sup> In January 2025 it released **R1**, a reasoning model that matched OpenAI's best on several benchmarks — and it claimed one of its models had been trained for about **$5.6 million**, versus the $100 million-plus the American labs were spending.<sup class="cite"><a href="#fn5">5</a></sup>

The market took that as an existential message: *if intelligence can be built this cheaply, why is everyone spending hundreds of billions on chips?* On **January 27, 2025**, NVIDIA fell **~17% and lost about $589 billion of market value** — the largest one-day loss for any company in history.<sup class="cite"><a href="#fn4">4</a></sup> The stock recovered. The idea did not go away.

<div class="stat-band">
<div class="stat"><span class="stat-v">$589B</span><span class="stat-l">NVIDIA market cap lost in one day, Jan 2025 — a record<sup class="cite"><a href="#fn4">4</a></sup></span></div>
<div class="stat"><span class="stat-v">~$71B</span><span class="stat-l">DeepSeek's rumoured 2026 valuation, pre-IPO<sup class="cite"><a href="#fn3">3</a></sup></span></div>
<div class="stat"><span class="stat-v">~6 pts</span><span class="stat-l">How far the best Chinese model trails the Western frontier<sup class="cite"><a href="#fn6">6</a></sup></span></div>
<div class="stat"><span class="stat-v">5–30x</span><span class="stat-l">How much cheaper Chinese models are per token<sup class="cite"><a href="#fn7">7</a></sup></span></div>
</div>

## What's actually being announced

Let's be precise about the IPO, because the coverage blurs it. DeepSeek is **preparing to file** — reporting points to a listing in China (mainland, with Hong Kong floated as the more logical venue for global money), with the filing possibly late 2026 and a debut in 2027.<sup class="cite"><a href="#fn1">1</a></sup><sup class="cite"><a href="#fn2">2</a></sup> Alongside it, the company is raising a new round targeting a pre-money valuation of roughly **480 billion yuan (~$71 billion)**.<sup class="cite"><a href="#fn3">3</a></sup>

Note what this is *not*: it is not a Nasdaq or NYSE listing a North American retail investor can click "buy" on. A mainland or Hong Kong float sits behind capital controls, a different disclosure regime, and — for a strategically sensitive AI champion — real political risk on both sides of the Pacific. **The stock is the least accessible part of this story.** Hold that thought; it's why the arbitrage lives elsewhere.

## How good are the Chinese models, really?

Good enough that "cheap knockoff" is the wrong frame. On independent 2026 leaderboards, **DeepSeek V4 Pro leads the Chinese pack** with an overall score around **87**, ahead of Zhipu's **GLM-5.1 (~83)** and Moonshot's **Kimi K2.6 (~81)**.<sup class="cite"><a href="#fn6">6</a></sup> The best Western proprietary models still sit on top at roughly **93** — but that is a **~6-point gap**, not a generation.<sup class="cite"><a href="#fn6">6</a></sup> On some narrow tasks the gap is gone: Chinese models trade the lead on agentic coding and multilingual work.<sup class="cite"><a href="#fn8">8</a></sup>

<figure class="fig">
<p class="fig-title">The gap is single digits now</p>
<p class="fig-sub">Approx. overall capability score · higher is better · axis starts at 70 to show the gap</p>
<svg viewBox="0 0 700 250" role="img" aria-label="Horizontal bar chart of approximate overall capability scores: Western frontier about 93, DeepSeek V4 Pro about 87, GLM-5.1 about 83, Kimi K2.6 about 81. Axis truncated, starting at 70.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="170" y="42" text-anchor="end">Western frontier</text>
    <text x="170" y="90" text-anchor="end">DeepSeek V4 Pro</text>
    <text x="170" y="138" text-anchor="end">GLM-5.1</text>
    <text x="170" y="186" text-anchor="end">Kimi K2.6</text>
  </g>
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="180" y1="24" x2="180" y2="200"/>
    <line x1="364" y1="24" x2="364" y2="200"/>
    <line x1="548" y1="24" x2="548" y2="200"/>
  </g>
  <rect x="180" y="28" width="423" height="26" fill="currentColor" fill-opacity="0.9"/>
  <text x="613" y="47" font-size="13" font-weight="600" fill="currentColor">93</text>
  <rect x="180" y="76" width="313" height="26" fill="currentColor" fill-opacity="0.7"/>
  <text x="503" y="95" font-size="13" font-weight="600" fill="currentColor">87</text>
  <rect x="180" y="124" width="239" height="26" fill="currentColor" fill-opacity="0.55"/>
  <text x="429" y="143" font-size="13" font-weight="600" fill="currentColor">83</text>
  <rect x="180" y="172" width="202" height="26" fill="currentColor" fill-opacity="0.5"/>
  <text x="392" y="191" font-size="13" font-weight="600" fill="currentColor">81</text>
  <g font-size="10.5" fill="currentColor" fill-opacity="0.5">
    <text x="180" y="218" text-anchor="middle">70</text>
    <text x="364" y="218" text-anchor="middle">80</text>
    <text x="548" y="218" text-anchor="middle">90</text>
  </g>
</svg>
<figcaption><strong>Axis starts at 70, not 0</strong> — this magnifies a gap that is genuinely small. Scores are directional composites from independent 2026 leaderboards<sup class="cite"><a href="#fn6">6</a></sup>; different tests rank these models differently, and positions change monthly. The point is the shape, not the decimals.</figcaption>
</figure>

Think of it like generic versus brand-name. The brand still wins the blind taste test, but the generic now does the same job for most people — and it costs a fraction.

## The part that doesn't add up: the price

Here is the mismatch that makes this interesting. That ~6-point capability gap comes with a **5–30x price gap**.<sup class="cite"><a href="#fn7">7</a></sup> DeepSeek's V3.2 charges about **$0.27 per million input tokens**; its original R1 undercut OpenAI's comparable model by roughly **25x** on output.<sup class="cite"><a href="#fn5">5</a></sup><sup class="cite"><a href="#fn7">7</a></sup> Line the flagships up on what they charge to generate a million tokens and the picture is stark.

<figure class="fig">
<p class="fig-title">Nearly as capable, a fraction of the price</p>
<p class="fig-sub">Output tokens · US$ per million · flagship tiers, mid-2026</p>
<svg viewBox="0 0 700 240" role="img" aria-label="Horizontal bar chart of output token prices per million: GPT-5.5 about $30, Claude Opus 4.8 about $25, Gemini 3.1 Pro about $12, DeepSeek about $2.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="170" y="42" text-anchor="end">GPT-5.5</text>
    <text x="170" y="90" text-anchor="end">Claude Opus 4.8</text>
    <text x="170" y="138" text-anchor="end">Gemini 3.1 Pro</text>
    <text x="170" y="186" text-anchor="end">DeepSeek</text>
  </g>
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="180" y1="24" x2="180" y2="200"/>
    <line x1="333" y1="24" x2="333" y2="200"/>
    <line x1="486" y1="24" x2="486" y2="200"/>
    <line x1="639" y1="24" x2="639" y2="200"/>
  </g>
  <rect x="180" y="28" width="459" height="26" fill="currentColor" fill-opacity="0.9"/>
  <text x="647" y="47" font-size="13" font-weight="600" fill="currentColor">$30</text>
  <rect x="180" y="76" width="383" height="26" fill="currentColor" fill-opacity="0.75"/>
  <text x="571" y="95" font-size="13" font-weight="600" fill="currentColor">$25</text>
  <rect x="180" y="124" width="184" height="26" fill="currentColor" fill-opacity="0.55"/>
  <text x="372" y="143" font-size="13" font-weight="600" fill="currentColor">$12</text>
  <rect x="180" y="172" width="34" height="26" fill="currentColor" fill-opacity="0.4"/>
  <text x="222" y="191" font-size="13" font-weight="600" fill="currentColor">~$2</text>
  <g font-size="10.5" fill="currentColor" fill-opacity="0.5">
    <text x="180" y="218" text-anchor="middle">$0</text>
    <text x="486" y="218" text-anchor="middle">$20</text>
    <text x="639" y="218" text-anchor="middle">$30+</text>
  </g>
</svg>
<figcaption>List price per million <em>output</em> tokens, not cost per task. DeepSeek shown at ~$2 as a representative flagship rate; its budget tiers run lower still.<sup class="cite"><a href="#fn5">5</a></sup><sup class="cite"><a href="#fn7">7</a></sup> Because models tokenize and reason at different lengths, "cheaper per token" is not exactly "cheaper per answer" — but at a 10x+ gap, the direction is unambiguous.</figcaption>
</figure>

That is the whole story in one chart. You give up a few points of capability and you save an order of magnitude. For a huge share of real work — summarizing, drafting, classifying, coding boilerplate, powering a chatbot — a few points of benchmark score is invisible to the end user, but a 10x bill is not.

## So where's the catch?

The catch is that the cheapest way to *buy* DeepSeek — its own app and API — is exactly the way a North American institution can't. Because DeepSeek routes data to servers in China, US federal agencies (Commerce, the Navy) and a growing list of states — Texas first, then New York, Virginia, Tennessee and others — have **banned it on government devices**, and a bill to extend that across the federal government is moving through Congress.<sup class="cite"><a href="#fn9">9</a></sup><sup class="cite"><a href="#fn10">10</a></sup><sup class="cite"><a href="#fn11">11</a></sup> There is no nationwide consumer ban, but no serious enterprise wants its data on Chinese servers under Chinese data law.<sup class="cite"><a href="#fn11">11</a></sup>

So we have a paradox: the best price-performance in AI, wrapped in a package most North American buyers are told not to open.

## The actual arbitrage: the weights, not the app

Here is the move most of the coverage misses. DeepSeek, Qwen, GLM and Kimi are **open-weight** — you can download the model and run it anywhere. The Chinese part is the *recipe*; it does not require Chinese *servers*.

That splits the problem cleanly in two:

- **The politics attach to the data path, not the math.** Ship your prompt to `deepseek.com` and it lands in Hangzhou — that's the banned path. Run the same open weights on a US or Canadian host (Together, Fireworks, Groq, a private cloud, your own GPUs) and the data never leaves Western soil. Same model, neutral plumbing.
- **The price advantage mostly survives the move.** Western hosts serving open Chinese weights still charge a fraction of frontier-lab prices, because the weights are free and the only cost is compute. You lose some of DeepSeek's home-turf discount; you keep most of the arbitrage.

**That is the trade we'd actually put on:** not the stock, not the app, but open Chinese weights served on trusted infrastructure — capturing ~90% of frontier capability at a fraction of the cost, with the geopolitical objection engineered out. The border runs through the data path. Route around it and the discount is real.

## The counter-argument, taken seriously

We try to argue against ourselves. Three things could kill this trade:

1. **The frontier could pull away again.** If Western labs open a real capability lead on tasks that matter — long-horizon agents, hard reasoning — "90% as good" stops being good enough and the discount stops mattering. Commodity pricing only works while it's a commodity.
2. **Open weights could close.** DeepSeek's openness is a strategy, not a law. A successful IPO and commercial pressure could push its best models behind a paywall, and the free-recipe arbitrage narrows.
3. **Policy could widen from "data path" to "the model itself."** If US rules start treating Chinese *weights* as tainted regardless of where they run — the way Huawei gear got treated — then hosting-on-Western-soil stops being a clean workaround. Watch the legislation, not just the leaderboards.

None of these has happened yet. All three are live risks, and the third is the one we'd watch hardest.

## Our call

**On the IPO:** interesting to read, hard to own, and not where the value is for a North American investor. A ~$71 billion valuation for a lab that made efficiency its brand is a bet that cheap-and-good scales into a business — an open question when your best product is something you give away.<sup class="cite"><a href="#fn3">3</a></sup> The listing is a headline, not a position.

**On the models:** the real story. China has turned frontier-adjacent AI into a low-cost commodity, and the open weights are a legal, usable asset in North America if you keep the data on your side of the ocean. The arbitrage is price-performance, not equity.

**What would change our mind:** the capability gap widening back to a full generation, or the best Chinese models going closed. Either would turn "the DeepSeek discount" back into "you get what you pay for."

<div class="takeaways">
<h3>The five things to remember</h3>
<ol>
<li><strong>The gap is single digits.</strong> The best Chinese model trails the Western frontier by ~6 points, not a generation — and leads on some tasks.</li>
<li><strong>The price gap is enormous.</strong> 5–30x cheaper per token. A small capability sacrifice for an order-of-magnitude saving.</li>
<li><strong>The IPO is the least useful part.</strong> A mainland/Hong Kong listing at ~$71B is hard for a North American to own and not where the value sits.</li>
<li><strong>The ban is about the data path, not the math.</strong> DeepSeek's app is restricted because data goes to China — the open weights don't have to.</li>
<li><strong>The trade is open weights on trusted soil.</strong> Run Chinese models on Western infrastructure: keep the discount, drop the objection. Watch for policy that targets the weights themselves.</li>
</ol>
</div>

## References

<ol class="refs">
<li id="fn1"><span class="src">Bloomberg</span> — DeepSeek Readies IPO Filing in China, Weighs New Funding Round (July 14, 2026). <a href="https://www.bloomberg.com/news/articles/2026-07-14/deepseek-mulls-new-funding-weeks-after-7-billion-round-ft-says" target="_blank" rel="noopener">bloomberg.com</a></li>
<li id="fn2"><span class="src">Reuters / TradingView</span> — DeepSeek is said to prepare for IPO filing as soon as this year. <a href="https://www.tradingview.com/news/reuters.com,2026:newsml_FWN43G0VF:0-deepseek-is-said-to-prepare-for-ipo-filing-as-soon-as-this-year-bloomberg-news/" target="_blank" rel="noopener">tradingview.com</a></li>
<li id="fn3"><span class="src">Finimize</span> — DeepSeek Eyes a $71 Billion Valuation and an IPO. <a href="https://finimize.com/content/deepseek-eyes-a-71-billion-valuation-and-an-ipo" target="_blank" rel="noopener">finimize.com</a></li>
<li id="fn4"><span class="src">Yahoo Finance</span> — Nvidia stock plummets, loses record $589 billion as DeepSeek prompts questions over AI spending. <a href="https://finance.yahoo.com/news/nvidia-stock-plummets-loses-record-589-billion-as-deepseek-prompts-questions-over-ai-spending-135105824.html" target="_blank" rel="noopener">finance.yahoo.com</a></li>
<li id="fn5"><span class="src">Forbes</span> — Why Is DeepSeek Sinking Nvidia Stock? (training cost, API pricing). <a href="https://www.forbes.com/sites/greatspeculations/2025/01/27/why-deepseek-is-sinking-nvidia-stock/" target="_blank" rel="noopener">forbes.com</a></li>
<li id="fn6"><span class="src">BenchLM</span> — Best Chinese LLMs (July 2026): DeepSeek V4 Pro Leads. <a href="https://benchlm.ai/blog/posts/best-chinese-llm" target="_blank" rel="noopener">benchlm.ai</a></li>
<li id="fn7"><span class="src">n1n.ai</span> — Chinese AI Model Benchmarks 2026: DeepSeek, GLM, Kimi and Qwen (pricing, 5–30x cost gap). <a href="https://explore.n1n.ai/blog/chinese-ai-model-benchmarks-2026-deepseek-glm-kimi-qwen-2026-06-28" target="_blank" rel="noopener">explore.n1n.ai</a></li>
<li id="fn8"><span class="src">Turing Post</span> — Kimi K2 vs DeepSeek-R1 vs Qwen3 vs GLM: 2026 Guide (task-level strengths). <a href="https://www.turingpost.com/p/chinesemodels" target="_blank" rel="noopener">turingpost.com</a></li>
<li id="fn9"><span class="src">U.S. Congress</span> — H.R.1121, No DeepSeek on Government Devices Act (119th Congress). <a href="https://www.congress.gov/bill/119th-congress/house-bill/1121/text" target="_blank" rel="noopener">congress.gov</a></li>
<li id="fn10"><span class="src">GovTech</span> — Where's DeepSeek Banned? The States Blocking Chinese-Made AI. <a href="https://www.govtech.com/biz/data/wheres-deepseek-banned-the-states-blocking-chinese-made-ai" target="_blank" rel="noopener">govtech.com</a></li>
<li id="fn11"><span class="src">The Conference Board</span> — State and Federal Governments Move to Ban DeepSeek on Government Devices. <a href="https://www.conference-board.org/research/CED-Newsletters-Alerts/state-and-federal-governments-deepseak-ban" target="_blank" rel="noopener">conference-board.org</a></li>
</ol>

<p class="disclaimer"><strong>Disclaimer.</strong> This note is produced by Polygon Digital for informational and educational purposes only. It is not investment, financial, legal or tax advice and is not a recommendation regarding any company, security or product, including any named above. Views are our own opinion as of the publication date. Valuations, benchmark scores, model prices and regulatory actions are sourced from third parties as cited, are frequently self-reported or preliminary, change rapidly, and may be out of date or revised. IPO plans may change or be withdrawn. Verify against primary sources before relying on any figure here.</p>
