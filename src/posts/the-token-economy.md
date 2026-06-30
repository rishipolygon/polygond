---
title: "The token paradox: AI's economy is exploding, deflating, and barely profitable"
date: 2026-06-29
summary: Token volumes are up hundreds of times over, the price of intelligence is collapsing ~10x a year, growth is already decelerating — and almost no one selling tokens is making money. Here is who actually wins.
tags: ai, tokens, compute
---

<p class="article-dek">The "token economy" is real, and the numbers are staggering. But strip away the keynote slides and a stranger picture appears: a commodity getting ~10x cheaper every year, consumed in ever-larger volumes, sold mostly at a loss — while a single chipmaker banks the margin. This is our read on where the value actually goes.</p>

<p class="lead">Here is the paradox in one sentence. The fundamental unit of AI — the <strong>token</strong> — is collapsing in price, exploding in volume, and so far failing to turn a profit for almost anyone who sells it. Every part of that sentence is true at once, and holding all three together is the only honest way to think about this market.</p>

Our view, stated up front: the token economy is a genuine platform shift **and** a margin trap. Tokens are becoming the meter of computing, but being the meter is not the same as capturing the money — and right now the money is pooling in exactly one place. Let us walk through why.

## What a token actually is

When you send text to a model, it is chopped into tokens — fragments of words. A rough rule: **1 token ≈ 4 characters ≈ ¾ of a word.** Models bill two streams: **input tokens** (your prompt and context) and **output tokens** (what they generate, almost always priced higher). Speed, cost, context limits, GPU economics — all of it ultimately reduces to tokens in and tokens out. That is why the unit matters. It is the barrel of oil for cognition: small, standardized, and meterable.

<div class="stat-band">
<div class="stat"><span class="stat-v">3.2Q</span><span class="stat-l">Tokens Google processes per month, mid-2026<sup class="cite"><a href="#fn3">3</a></sup></span></div>
<div class="stat"><span class="stat-v">~10x/yr</span><span class="stat-l">Fall in cost of GPT-4-level intelligence<sup class="cite"><a href="#fn6">6</a></sup></span></div>
<div class="stat"><span class="stat-v">$2 : $1</span><span class="stat-l">OpenAI's inference cost per dollar of revenue<sup class="cite"><a href="#fn10">10</a></sup></span></div>
<div class="stat"><span class="stat-v">~88%</span><span class="stat-l">NVIDIA gross margin — where the profit sits<sup class="cite"><a href="#fn10">10</a></sup></span></div>
</div>

## The engine: volume up, price down

Two opposing forces drive everything here. Start with **volume.** Google is the bellwether, and it reports tokens the way it once reported searches. Its monthly token throughput went from **9.7 trillion in early 2024** to **480 trillion by May 2025**, then **1.3 quadrillion** by October, and roughly **3.2 quadrillion per month by mid-2026.**<sup class="cite"><a href="#fn1">1</a></sup><sup class="cite"><a href="#fn2">2</a></sup><sup class="cite"><a href="#fn3">3</a></sup><sup class="cite"><a href="#fn4">4</a></sup>

<figure class="fig">
<p class="fig-title">From trillions to quadrillions in two years</p>
<p class="fig-sub">Tokens processed per month, Google · trillions (T) · 1,000T = 1 quadrillion</p>
<svg viewBox="0 0 700 320" role="img" aria-label="Bar chart: Google monthly token processing grows from 9.7 trillion in early 2024 to 480 trillion in May 2025, 1,300 trillion in October 2025, and 3,200 trillion by mid-2026.">
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="78" y1="40" x2="690" y2="40"/>
    <line x1="78" y1="119" x2="690" y2="119"/>
    <line x1="78" y1="198" x2="690" y2="198"/>
    <line x1="78" y1="278" x2="690" y2="278"/>
  </g>
  <g text-anchor="end" font-size="12" fill="currentColor" fill-opacity="0.6">
    <text x="68" y="44">3,000T</text>
    <text x="68" y="123">2,000T</text>
    <text x="68" y="202">1,000T</text>
    <text x="68" y="282">0</text>
  </g>
  <rect x="120" y="275" width="86" height="3" fill="currentColor" fill-opacity="0.85"/>
  <text x="163" y="267" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">9.7T</text>
  <text x="163" y="300" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.6">early 2024</text>
  <rect x="258" y="240" width="86" height="38" fill="currentColor" fill-opacity="0.85"/>
  <text x="301" y="232" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">480T</text>
  <text x="301" y="300" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.6">May 2025</text>
  <rect x="396" y="175" width="86" height="103" fill="currentColor" fill-opacity="0.85"/>
  <text x="439" y="167" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">1,300T</text>
  <text x="439" y="300" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.6">Oct 2025</text>
  <rect x="534" y="24" width="86" height="254" fill="currentColor" fill-opacity="0.85"/>
  <text x="577" y="16" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">3,200T</text>
  <text x="577" y="300" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.6">mid-2026</text>
</svg>
<figcaption>Sources: Tomasz Tunguz on token consumption<sup class="cite"><a href="#fn1">1</a></sup>; reporting on Gemini crossing the quadrillion mark<sup class="cite"><a href="#fn2">2</a></sup>; Google I/O 2026 figures via The Register and CryptoBriefing.<sup class="cite"><a href="#fn3">3</a></sup><sup class="cite"><a href="#fn4">4</a></sup> Note: these are Google's own keynote figures — self-reported, not audited. "9.7T" shown at minimum bar height.</figcaption>
</figure>

Now the opposing force: **price.** Andreessen Horowitz named it "LLMflation" — the cost of a given level of AI capability is falling about **10x a year**, faster than the cost curves of PC computing or dotcom-era bandwidth.<sup class="cite"><a href="#fn6">6</a></sup> Concretely, GPT-4-level performance cost roughly **\$20 per million tokens in late 2022 and about \$0.40 by 2025.**<sup class="cite"><a href="#fn6">6</a></sup> Epoch AI, measuring the price to match GPT-4 on PhD-level science questions, clocked declines of up to **40x per year.**<sup class="cite"><a href="#fn7">7</a></sup>

<figure class="fig">
<p class="fig-title">LLMflation: the cost of GPT-4-level intelligence</p>
<p class="fig-sub">Approx. price to access GPT-4-equivalent capability · US$ per million tokens</p>
<svg viewBox="0 0 700 300" role="img" aria-label="Descending bar chart: the cost of GPT-4-level intelligence falls from about $20 per million tokens in late 2022 to about $0.40 per million tokens by 2025.">
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="64" y1="40" x2="690" y2="40"/>
    <line x1="64" y1="113" x2="690" y2="113"/>
    <line x1="64" y1="186" x2="690" y2="186"/>
    <line x1="64" y1="258" x2="690" y2="258"/>
  </g>
  <g text-anchor="end" font-size="12" fill="currentColor" fill-opacity="0.6">
    <text x="54" y="44">$20</text>
    <text x="54" y="117">$13</text>
    <text x="54" y="190">$7</text>
    <text x="54" y="262">$0</text>
  </g>
  <rect x="110" y="40" width="90" height="218" fill="currentColor" fill-opacity="0.85"/>
  <text x="155" y="32" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">$20</text>
  <text x="155" y="280" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.6">late 2022</text>
  <rect x="270" y="231" width="90" height="27" fill="currentColor" fill-opacity="0.85"/>
  <text x="315" y="223" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">~$2.50</text>
  <text x="315" y="280" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.6">2023</text>
  <rect x="430" y="249" width="90" height="9" fill="currentColor" fill-opacity="0.85"/>
  <text x="475" y="241" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">~$0.80</text>
  <text x="475" y="280" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.6">2024</text>
  <rect x="590" y="253" width="90" height="5" fill="currentColor" fill-opacity="0.85"/>
  <text x="635" y="245" text-anchor="middle" font-size="14" font-weight="600" fill="currentColor">~$0.40</text>
  <text x="635" y="280" text-anchor="middle" font-size="11.5" fill="currentColor" fill-opacity="0.6">2025</text>
</svg>
<figcaption>Endpoints (~$20 in late 2022, ~$0.40 by 2025) from a16z's LLMflation analysis<sup class="cite"><a href="#fn6">6</a></sup>; 2023–2024 bars are illustrative of the ~10x-per-year trend, not discrete measurements.<sup class="cite"><a href="#fn7">7</a></sup></figcaption>
</figure>

## The crack in the story: growth is already slowing

Here is the data point the breathless coverage skips. Google's token growth is **decelerating.** Between May and July 2025 it added ~250 trillion tokens a month; by late 2025 that had fallen to ~107 trillion — a **57% drop in the growth rate.**<sup class="cite"><a href="#fn5">5</a></sup>

That matters, because the explanations are all bearish in different ways. Tomasz Tunguz lays out the candidates: Google may be **rate-limiting free users** because the unit economics do not work; it may be **GPU-capacity constrained**; or efficiency gains (caching, smaller models) may be **reducing tokens per task.**<sup class="cite"><a href="#fn5">5</a></sup> Whichever it is, the "infinite exponential" narrative is already meeting a ceiling — supply, cost, or demand. An analyst should treat the quadrillion headline as a number that is *flattening*, not compounding forever.

## Cheaper tokens, bigger bills

So if prices are collapsing, why are AI budgets exploding? A textbook Jevons paradox: when a resource gets cheaper, we use so much more of it that total spend rises anyway. Two mechanisms are doing the work.

**Reasoning models think out loud.** Newer models emit long internal chains of "thinking tokens" before answering — a single hard query can silently burn thousands of tokens you never see.<sup class="cite"><a href="#fn13">13</a></sup> **Agents run in loops.** An autonomous agent calls tools, reads results, writes code, checks itself, and spawns other agents — often consuming **millions of tokens** per task.<sup class="cite"><a href="#fn14">14</a></sup>

The result is the **LLM cost paradox**: per-token prices fall, yet total bills climb, because each interaction now consumes vastly more tokens than the simple chatbot turn of 2023.<sup class="cite"><a href="#fn15">15</a></sup> Cheaper units, far more units. This is great for whoever sells the underlying compute. It is brutal for whoever has to price a product on top of it.

## Follow the money: who actually wins

This is where conviction matters. Volume is not value. Despite quadrillions of tokens, **selling inference is, at the unit level, a money-losing business in 2026.**

OpenAI reportedly burns about **\$2 of cost for every \$1 of inference revenue** — before R&D, sales, or salaries — and is guiding to multibillion-dollar losses with no profit expected until the end of the decade.<sup class="cite"><a href="#fn10">10</a></sup> Anthropic, even after its revenue run-rate vaulted toward \$30 billion, posted gross margins around **40%** in 2025; OpenAI's slipped from ~40% to ~33%.<sup class="cite"><a href="#fn11">11</a></sup> Meanwhile hyperscaler capex is on track to top **\$700 billion in 2026**, nearly double the prior year.<sup class="cite"><a href="#fn12">12</a></sup>

And the one company smiling? The picks-and-shovels seller. NVIDIA runs **~88% gross margins**, "taking the margin while the labs hold the unit-economics bag."<sup class="cite"><a href="#fn10">10</a></sup>

<figure class="fig">
<p class="fig-title">Where the token economy's profit actually pools</p>
<p class="fig-sub">Approx. gross margin, 2025–26 · selected players</p>
<svg viewBox="0 0 700 220" role="img" aria-label="Horizontal bar chart of approximate gross margins: NVIDIA about 88 percent, Anthropic about 40 percent, OpenAI about 33 percent.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="150" y="46" text-anchor="end">NVIDIA</text>
    <text x="150" y="106" text-anchor="end">Anthropic</text>
    <text x="150" y="166" text-anchor="end">OpenAI</text>
  </g>
  <!-- scale: 100% = 500px, start x=160 -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="160" y1="30" x2="160" y2="186"/>
    <line x1="285" y1="30" x2="285" y2="186"/>
    <line x1="410" y1="30" x2="410" y2="186"/>
    <line x1="535" y1="30" x2="535" y2="186"/>
    <line x1="660" y1="30" x2="660" y2="186"/>
  </g>
  <rect x="160" y="30" width="440" height="32" fill="currentColor" fill-opacity="0.9"/>
  <text x="610" y="51" font-size="13" font-weight="600" fill="currentColor">~88%</text>
  <rect x="160" y="90" width="200" height="32" fill="currentColor" fill-opacity="0.55"/>
  <text x="370" y="111" font-size="13" font-weight="600" fill="currentColor">~40%</text>
  <rect x="160" y="150" width="165" height="32" fill="currentColor" fill-opacity="0.45"/>
  <text x="335" y="171" font-size="13" font-weight="600" fill="currentColor">~33%</text>
  <g font-size="10.5" fill="currentColor" fill-opacity="0.5">
    <text x="160" y="205" text-anchor="middle">0%</text>
    <text x="410" y="205" text-anchor="middle">50%</text>
    <text x="660" y="205" text-anchor="middle">100%</text>
  </g>
</svg>
<figcaption>Sources: reporting on inference economics and NVIDIA margins<sup class="cite"><a href="#fn10">10</a></sup>; lab gross margins via Forbes and Visual Capitalist.<sup class="cite"><a href="#fn11">11</a></sup><sup class="cite"><a href="#fn12">12</a></sup> Lab margins are company-level gross margin; per-call inference often runs at a loss once frontier usage is included.</figcaption>
</figure>

The list prices buyers see, meanwhile, span roughly **100x** between frontier and budget models — and several of them likely sit *below* the cost of serving them.

<figure class="fig">
<p class="fig-title">Frontier vs. budget: list price, mid-2026</p>
<p class="fig-sub">Output tokens · US$ per million · selected models</p>
<svg viewBox="0 0 700 290" role="img" aria-label="Horizontal bar chart of 2026 output token list prices per million: GPT-5.5 $30, Claude Opus 4.8 $25, GPT-5.4 $15, Gemini 3.1 Pro $12, Gemini 3.1 Flash-Lite $0.40, DeepSeek V4 Flash $0.28.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="160" y="32" text-anchor="end">GPT-5.5</text>
    <text x="160" y="74" text-anchor="end">Claude Opus 4.8</text>
    <text x="160" y="116" text-anchor="end">GPT-5.4</text>
    <text x="160" y="158" text-anchor="end">Gemini 3.1 Pro</text>
    <text x="160" y="200" text-anchor="end">Gemini 3.1 Flash-Lite</text>
    <text x="160" y="242" text-anchor="end">DeepSeek V4 Flash</text>
  </g>
  <rect x="170" y="16" width="469" height="24" fill="currentColor" fill-opacity="0.9"/>
  <text x="647" y="34" font-size="13" font-weight="600" fill="currentColor">$30</text>
  <rect x="170" y="58" width="391" height="24" fill="currentColor" fill-opacity="0.78"/>
  <text x="569" y="76" font-size="13" font-weight="600" fill="currentColor">$25</text>
  <rect x="170" y="100" width="234" height="24" fill="currentColor" fill-opacity="0.62"/>
  <text x="412" y="118" font-size="13" font-weight="600" fill="currentColor">$15</text>
  <rect x="170" y="142" width="188" height="24" fill="currentColor" fill-opacity="0.5"/>
  <text x="366" y="160" font-size="13" font-weight="600" fill="currentColor">$12</text>
  <rect x="170" y="184" width="7" height="24" fill="currentColor" fill-opacity="0.35"/>
  <text x="185" y="202" font-size="13" font-weight="600" fill="currentColor">$0.40</text>
  <rect x="170" y="226" width="5" height="24" fill="currentColor" fill-opacity="0.35"/>
  <text x="183" y="244" font-size="13" font-weight="600" fill="currentColor">$0.28</text>
</svg>
<figcaption><strong>List price per million output tokens — not cost per task.</strong> Because models tokenize differently and reason at different lengths, "cheaper per token" ≠ "cheaper per answer." Verified late June 2026 via pricepertoken.com and CloudZero<sup class="cite"><a href="#fn8">8</a></sup><sup class="cite"><a href="#fn9">9</a></sup>; treat as a fast-moving snapshot, and assume some prices are subsidized.<sup class="cite"><a href="#fn10">10</a></sup></figcaption>
</figure>

| Model | Input \$/M | Output \$/M | Tier |
| --- | --- | --- | --- |
| GPT-5.5 | \$5 | \$30 | Frontier |
| Claude Opus 4.8 | \$5 | \$25 | Frontier |
| Gemini 3.1 Pro | \$2 | \$12 | Frontier (value) |
| GLM-5.2 | \$1.40 | \$4.40 | Mid |
| Gemini 3.1 Flash-Lite | \$0.10 | \$0.40 | Budget |
| DeepSeek V4 Flash | \$0.14 | \$0.28 | Budget |

## "Tokens are the new currency" — consider the source

The most-quoted line in this whole story — that **tokens are the new currency**, that data centers are **"AI factories,"** that compute demand hits **\$1 trillion a year by 2027** — comes from NVIDIA's Jensen Huang at GTC 2026.<sup class="cite"><a href="#fn13">13</a></sup> It is a brilliant frame. It is also a frame from the company that sells the factory equipment, and it is engineered to make \$700-billion capex feel like prudence rather than a gamble. Tokens are a *unit of account* for compute, yes. Calling them "currency" — a store of value — is marketing. Hold the insight; discount the source.

## Our call

If you take one position from this piece, take this: **in the token economy, margin accrues to whoever has pricing power, and today that is the silicon layer, not the model layer.** Our read —

- **NVIDIA and the infrastructure layer are the near-term winners.** They sell into a deflationary commodity boom without bearing its deflation. The risk to this call is a credible non-NVIDIA accelerator or an inference-efficiency breakthrough that compresses those 88% margins.
- **Pure model labs are in a commodity squeeze.** Capability is converging, price is collapsing, and they carry the unit-economics losses. They survive by *escaping the token* — selling outcomes (agents, seats, enterprise workflows) rather than metered tokens. Anthropic's enterprise run-rate surge is the template; raw API resale is the trap.<sup class="cite"><a href="#fn11">11</a></sup>
- **The durable value is one layer up.** Whoever turns cheap tokens into reliable *outcomes* — completed tasks, not generated text — captures the surplus that deflation strips out of the raw token. Tokens are the input cost; the product is the result.

**What would change our mind:** model labs sustaining gross margins above ~60% on metered inference, or token growth re-accelerating *with* monetization rather than via free-tier giveaways. Either would mean the token itself, not the chip, is where the economy compounds. We do not see it yet.

## The honest caveats

**A token is not a standard unit.** Different tokenizers split text differently, so cross-vendor "per token" comparisons — including our own pricing chart — are directional, not exact. **The volume figures are self-reported** keynote numbers, not audited. **List price is not cost**, and some pricing is strategic. And **every token is energy** — quadrillions a month is also one of the largest power-demand stories in the economy.<sup class="cite"><a href="#fn12">12</a></sup>

## The bottom line

The token economy is simultaneously the most important platform shift in computing and a textbook case of a boom where the revenue and the profit sit in different pockets. Volumes are real, the deflation is real, and the losses are real. The mistake is reading the quadrillions as a scoreboard. They are a *throughput* metric — and throughput, as every commodity producer eventually learns, is not the same as profit. Watch the margins, not the meter.

<div class="takeaways">
<h3>The five things to remember</h3>
<ol>
<li><strong>Hold three facts at once:</strong> token volume is exploding, price is falling ~10x/yr, and selling tokens is mostly unprofitable.</li>
<li><strong>The exponential is bending.</strong> Google's token-growth rate already fell ~57% — supply, cost, or demand is biting.</li>
<li><strong>Cheaper tokens, bigger bills.</strong> Reasoning and agents consume orders of magnitude more, so total spend keeps rising (Jevons).</li>
<li><strong>Margin sits with silicon.</strong> NVIDIA earns ~88% gross margin while labs run ~33–40% and lose money per call.</li>
<li><strong>Value is one layer up.</strong> Whoever sells outcomes, not metered tokens, escapes the deflation. Watch margins, not the meter.</li>
</ol>
</div>

## References

<ol class="refs">
<li id="fn1"><span class="src">Tomasz Tunguz</span> — Beyond a Trillion: The Token Race. <a href="https://tomtunguz.com/trillion-token-race/" target="_blank" rel="noopener">tomtunguz.com</a></li>
<li id="fn2"><span class="src">Stephen Smith</span> — Google's Gemini Likely Just Crossed 1 Quadrillion Tokens Processed Per Month. <a href="https://www.smithstephen.com/p/googles-gemini-likely-just-crossed" target="_blank" rel="noopener">smithstephen.com</a></li>
<li id="fn3"><span class="src">The Register</span> — Google touts its "tokenmaxxing," capex and AI agents at I/O (2026). <a href="https://www.theregister.com/ai-ml/2026/05/19/google_io_ai/" target="_blank" rel="noopener">theregister.com</a></li>
<li id="fn4"><span class="src">CryptoBriefing</span> — Google processes over 3.2 quadrillion tokens monthly, a 7x increase from last year. <a href="https://cryptobriefing.com/google-3-2-quadrillion-tokens-monthly/" target="_blank" rel="noopener">cryptobriefing.com</a></li>
<li id="fn5"><span class="src">Tomasz Tunguz</span> — Is Token Consumption Growth Slowing Down? <a href="https://tomtunguz.com/is-token-consumption-slowing-down/" target="_blank" rel="noopener">tomtunguz.com</a></li>
<li id="fn6"><span class="src">Andreessen Horowitz (a16z)</span> — Welcome to LLMflation: LLM inference cost is going down fast. <a href="https://a16z.com/llmflation-llm-inference-cost/" target="_blank" rel="noopener">a16z.com</a></li>
<li id="fn7"><span class="src">Epoch AI</span> — LLM inference prices have fallen rapidly but unequally across tasks. <a href="https://epoch.ai/data-insights/llm-inference-price-trends" target="_blank" rel="noopener">epoch.ai</a></li>
<li id="fn8"><span class="src">PricePerToken</span> — LLM API Pricing 2026: cost per million tokens. <a href="https://pricepertoken.com/" target="_blank" rel="noopener">pricepertoken.com</a></li>
<li id="fn9"><span class="src">CloudZero</span> — LLM API Pricing Comparison 2026: every major model, ranked by cost. <a href="https://www.cloudzero.com/blog/llm-api-pricing-comparison/" target="_blank" rel="noopener">cloudzero.com</a></li>
<li id="fn10"><span class="src">Ed Zitron — Where's Your Ed At</span> — Why Everybody Is Losing Money On AI (inference unit economics; NVIDIA margins). <a href="https://www.wheresyoured.at/why-everybody-is-losing-money-on-ai/" target="_blank" rel="noopener">wheresyoured.at</a></li>
<li id="fn11"><span class="src">Forbes</span> — OpenAI and Anthropic Are Testing Two Very Different AI Business Models (margins, revenue run-rate). <a href="https://www.forbes.com/sites/paulocarvao/2026/05/21/anthropic-openai-enterprise-ai-profitability/" target="_blank" rel="noopener">forbes.com</a></li>
<li id="fn12"><span class="src">Visual Capitalist</span> — The Costs of AI Companies / compute vs. talent and hyperscaler capex. <a href="https://www.visualcapitalist.com/visualized-the-costs-of-ai-companies/" target="_blank" rel="noopener">visualcapitalist.com</a></li>
<li id="fn13"><span class="src">RCR Wireless</span> — Agents, inference and the new token economics: Nvidia pitches the AI future (GTC 2026). <a href="https://www.rcrwireless.com/20260318/ai-infrastructure/agents-inference-token-economics-nvidia-ai" target="_blank" rel="noopener">rcrwireless.com</a></li>
<li id="fn14"><span class="src">Presidio</span> — How Tokens, Agents, and AI Factories Could Change Everything. <a href="https://www.presidio.com/blogs/how-tokens-agents-and-ai-factories-could-change-everything/" target="_blank" rel="noopener">presidio.com</a></li>
<li id="fn15"><span class="src">ikangai</span> — The LLM Cost Paradox: How "Cheaper" AI Models Are Breaking Budgets. <a href="https://www.ikangai.com/the-llm-cost-paradox-how-cheaper-ai-models-are-breaking-budgets/" target="_blank" rel="noopener">ikangai.com</a></li>
</ol>

<p class="disclaimer"><strong>Disclaimer.</strong> This note is produced by Polygon Digital for informational and educational purposes only. It is not investment, financial, legal or tax advice and is not a recommendation regarding any company or security, including any company named above. Views are our own opinion as of the publication date. Token volumes, model prices, margins and forecasts are sourced from third parties as cited, are frequently self-reported, change rapidly, and may be out of date or revised. Verify against primary sources before relying on any figure here.</p>
