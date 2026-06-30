---
title: "Tokens are the new currency: inside the AI token economy"
date: 2026-06-29
summary: AI's smallest unit — the token — quietly became the meter for the entire industry. The volumes are staggering, the prices are collapsing, and compute is now sold by the token.
tags: ai, tokens, compute
---

<p class="article-dek">A token is the smallest thing an AI model deals in — a fragment of a word. It is also becoming the unit the whole industry is priced, measured and built around. Volumes are now counted in the quadrillions, the cost of intelligence is falling roughly 10x a year, and the people building the infrastructure have started calling tokens "the new currency." Here is what that actually means.</p>

<p class="lead">Every era of computing gets a unit it counts itself by. Mainframes had instructions per second. The web had page views. Mobile had the app install. The AI era has settled on something stranger and smaller: the <strong>token</strong> — a chunk of text, usually about three-quarters of a word, that a language model reads and writes one piece at a time.</p>

It sounds like an implementation detail. It is, increasingly, the economic atom of the entire field — the thing that gets metered, billed, optimized and forecast. This is the AI token economy, and it is moving faster than almost anyone predicted.

## What a token actually is

When you send text to a model, it is chopped into tokens. "Tokenization" is short, but the model might see it as `token` + `ization`. Common words are one token; rare words split into several. A rough rule: **1 token ≈ 4 characters ≈ ¾ of a word.**

Models charge for two streams: **input tokens** (your prompt, documents, context) and **output tokens** (what the model generates). Output is almost always more expensive, because generating is harder than reading. Everything else in the industry — speed, cost, context limits, even GPU economics — ultimately reduces to tokens in and tokens out.

<div class="callout"><span class="callout-tag">The one-line version</span>A token is to AI what a barrel is to oil: a small, standardized unit that turns a messy physical process into something you can price, trade and scale. The whole industry now runs on the meter.</div>

## The volumes are almost incomprehensible

The clearest sign that tokens are the unit that matters is how obsessively the largest players now report them. Google is the bellwether. Its monthly token volume went from **9.7 trillion in early 2024**, to **480 trillion by May 2025** — a roughly 50x jump in a year — and kept going: **980 trillion** by July, past **1.3 quadrillion** by October, and roughly **3.2 quadrillion tokens per month by mid-2026.**<sup class="cite"><a href="#fn1">1</a></sup><sup class="cite"><a href="#fn2">2</a></sup><sup class="cite"><a href="#fn3">3</a></sup><sup class="cite"><a href="#fn4">4</a></sup>

<div class="stat-band">
<div class="stat"><span class="stat-v">3.2Q</span><span class="stat-l">Tokens Google processes per month, mid-2026<sup class="cite"><a href="#fn3">3</a></sup></span></div>
<div class="stat"><span class="stat-v">~330x</span><span class="stat-l">Growth in monthly tokens in ~2 years<sup class="cite"><a href="#fn1">1</a></sup></span></div>
<div class="stat"><span class="stat-v">~10x/yr</span><span class="stat-l">Fall in cost of GPT-4-level intelligence<sup class="cite"><a href="#fn5">5</a></sup></span></div>
<div class="stat"><span class="stat-v">$1T</span><span class="stat-l">Projected annual AI compute demand by 2027<sup class="cite"><a href="#fn9">9</a></sup></span></div>
</div>

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
  <!-- baseline y=278; 238px = 3000T => 0.0793px per T -->
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
<figcaption>Sources: Tomasz Tunguz on token consumption<sup class="cite"><a href="#fn1">1</a></sup>; reporting on Gemini crossing the quadrillion mark<sup class="cite"><a href="#fn2">2</a></sup>; Google I/O 2026 figures via The Register and CryptoBriefing.<sup class="cite"><a href="#fn3">3</a></sup><sup class="cite"><a href="#fn4">4</a></sup> "9.7T" bar shown at minimum height for visibility.</figcaption>
</figure>

That is one company, on one set of surfaces. Add OpenAI, Anthropic, Microsoft, Meta, and the long tail of startups, and the picture is of a brand-new commodity being produced at a scale that did not exist three years ago.

## The price of intelligence is collapsing

Here is the counterintuitive part. As volumes exploded, the **price per token fell off a cliff.** Andreessen Horowitz named it "LLMflation": the cost of a given level of AI capability is dropping about **10x every year** — faster than the cost curves of PC computing or dotcom-era bandwidth.<sup class="cite"><a href="#fn5">5</a></sup>

The concrete version: accessing **GPT-4-level performance cost around \$20 per million tokens in late 2022 — and roughly \$0.40 by 2025.**<sup class="cite"><a href="#fn5">5</a></sup> Epoch AI, measuring the price to hit GPT-4's score on PhD-level science questions, found it falling as much as **40x per year**, with declines across tasks ranging from 9x to 900x annually.<sup class="cite"><a href="#fn6">6</a></sup>

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
  <!-- baseline y=258; 218px = $20 => 10.9px per $ -->
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
<figcaption>Endpoints (~$20 in late 2022, ~$0.40 by 2025) from a16z's LLMflation analysis<sup class="cite"><a href="#fn5">5</a></sup>; interim years are illustrative of the ~10x-per-year trend documented by a16z and Epoch AI.<sup class="cite"><a href="#fn6">6</a></sup></figcaption>
</figure>

## The 2026 price map

Today the market is split between **frontier models** — the most capable, priced at a premium — and a fast-improving tier of **budget models** that are good enough for most tasks at a fraction of the cost. The spread between them is roughly **100x.**

<figure class="fig">
<p class="fig-title">Frontier vs. budget: output price, mid-2026</p>
<p class="fig-sub">Output tokens · US$ per million · selected models</p>
<svg viewBox="0 0 700 290" role="img" aria-label="Horizontal bar chart of 2026 output token prices per million: GPT-5.5 $30, Claude Opus 4.8 $25, GPT-5.4 $15, Gemini 3.1 Pro $12, Gemini 3.1 Flash-Lite $0.40, DeepSeek V4 Flash $0.28.">
  <!-- bars start x=170, scale 500px = $32 => 15.625px per $ -->
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
<figcaption>Prices per million output tokens, verified late June 2026, via pricepertoken.com and CloudZero.<sup class="cite"><a href="#fn7">7</a></sup><sup class="cite"><a href="#fn8">8</a></sup> List prices change frequently; treat as a snapshot.</figcaption>
</figure>

The detail underneath matters too — input and output are priced separately, and **prompt caching** (reusing a fixed context like a system prompt or codebase) can cut input costs by roughly 90%.<sup class="cite"><a href="#fn7">7</a></sup>

| Model | Input \$/M | Output \$/M | Tier |
| --- | --- | --- | --- |
| GPT-5.5 | \$5 | \$30 | Frontier |
| Claude Opus 4.8 | \$5 | \$25 | Frontier |
| Gemini 3.1 Pro | \$2 | \$12 | Frontier (value) |
| GLM-5.2 | \$1.40 | \$4.40 | Mid |
| Gemini 3.1 Flash-Lite | \$0.10 | \$0.40 | Budget |
| DeepSeek V4 Flash | \$0.14 | \$0.28 | Budget |

## Why "tokens are the new currency"

This is not just analyst framing — it is how the people building the infrastructure now talk. At NVIDIA's GTC 2026, Jensen Huang reframed the data center itself as an **"AI factory"** whose product is tokens, and declared that **tokens are becoming the new fundamental currency**, with global AI compute demand heading toward **\$1 trillion a year by 2027.**<sup class="cite"><a href="#fn9">9</a></sup> He even quipped that in Silicon Valley, "tokens are a recruiting tool — people are asking, *how many tokens come with my job?*"<sup class="cite"><a href="#fn9">9</a></sup>

The logic is straightforward once you accept the premise. If intelligence is delivered as tokens, then a token is a unit of *cognitive work* — and whoever can produce the most useful tokens per dollar, per watt, per second, wins.<sup class="cite"><a href="#fn10">10</a></sup>

> If oil powered the industrial economy, tokens are shaping up to be the raw throughput of the cognitive one — produced in factories, sold by the meter, and measured to the decimal.

## The paradox: cheaper tokens, bigger bills

So if prices are collapsing, why are AI budgets exploding? Because demand is outrunning deflation — a textbook Jevons paradox. Two forces drive it:

**Reasoning models think out loud.** Newer models generate long internal chains of "thinking tokens" before answering. A single hard question can quietly consume thousands of tokens the user never sees.<sup class="cite"><a href="#fn9">9</a></sup>

**Agents run in loops.** An autonomous agent calls tools, reads results, writes code, checks its work, and calls other agents — often burning **millions of tokens** to complete one task.<sup class="cite"><a href="#fn10">10</a></sup> As Huang put it, every SaaS company is on its way to becoming an "Agent-as-a-Service" company.

The result is what some call the **LLM cost paradox**: per-token prices fall, yet total spend climbs, because each interaction now consumes vastly more tokens than the simple chatbot turn of 2023.<sup class="cite"><a href="#fn11">11</a></sup> Cheaper units, far more units.

## The honest caveats

**A token is not a standard unit.** Different models tokenize text differently, so "a million tokens" is not strictly comparable across providers — it is a meter that each vendor calibrates slightly differently.

**List price is not cost.** Headline per-token prices can sit below the true cost of serving them; some pricing is subsidized to win market share.<sup class="cite"><a href="#fn8">8</a></sup>

**The meter creates lock-in.** Once a workflow is tuned to one model's tokenizer, context window and caching behavior, switching has real friction.

**Tokens have a footprint.** Every token is computation, and computation is energy and water. Quadrillions of tokens a month is also a very large power bill.<sup class="cite"><a href="#fn12">12</a></sup>

## The bottom line

Three years ago, "token" was jargon you only met if you read API docs. Today it is the unit a trillion-dollar industry counts, prices and forecasts itself by. Volumes are growing by orders of magnitude a year, the cost of a unit of intelligence is in freefall, and the largest hardware company on earth is describing its product as a token factory.

That combination — exploding supply, collapsing unit cost, and a brand-new unit of value — is exactly what the start of a major economic platform looks like. The token economy is not a metaphor about the future of AI. It is the accounting system the present is already being built on.

<div class="takeaways">
<h3>The five things to remember</h3>
<ol>
<li><strong>A token is the atom.</strong> ~¾ of a word; everything in AI — cost, speed, context, GPU economics — is metered in tokens.</li>
<li><strong>Volumes are exploding.</strong> Google alone went from ~9.7T tokens/month to ~3.2 quadrillion in about two years.</li>
<li><strong>Intelligence is deflating ~10x a year.</strong> GPT-4-level capability fell from ~$20 to ~$0.40 per million tokens.</li>
<li><strong>Tokens are being treated as currency.</strong> NVIDIA frames data centers as token factories; compute demand is heading toward $1T/yr.</li>
<li><strong>Cheaper tokens, bigger bills.</strong> Reasoning and agents consume orders of magnitude more tokens, so total spend keeps rising.</li>
</ol>
</div>

## References

<ol class="refs">
<li id="fn1"><span class="src">Tomasz Tunguz</span> — Beyond a Trillion: The Token Race (token-consumption analysis). <a href="https://tomtunguz.com/trillion-token-race/" target="_blank" rel="noopener">tomtunguz.com</a></li>
<li id="fn2"><span class="src">Stephen Smith</span> — Google's Gemini Likely Just Crossed 1 Quadrillion Tokens Processed Per Month. <a href="https://www.smithstephen.com/p/googles-gemini-likely-just-crossed" target="_blank" rel="noopener">smithstephen.com</a></li>
<li id="fn3"><span class="src">The Register</span> — Google touts its "tokenmaxxing," capex and AI agents at I/O (2026). <a href="https://www.theregister.com/ai-ml/2026/05/19/google_io_ai/" target="_blank" rel="noopener">theregister.com</a></li>
<li id="fn4"><span class="src">CryptoBriefing</span> — Google processes over 3.2 quadrillion tokens monthly, a 7x increase from last year. <a href="https://cryptobriefing.com/google-3-2-quadrillion-tokens-monthly/" target="_blank" rel="noopener">cryptobriefing.com</a></li>
<li id="fn5"><span class="src">Andreessen Horowitz (a16z)</span> — Welcome to LLMflation: LLM inference cost is going down fast. <a href="https://a16z.com/llmflation-llm-inference-cost/" target="_blank" rel="noopener">a16z.com</a></li>
<li id="fn6"><span class="src">Epoch AI</span> — LLM inference prices have fallen rapidly but unequally across tasks. <a href="https://epoch.ai/data-insights/llm-inference-price-trends" target="_blank" rel="noopener">epoch.ai</a></li>
<li id="fn7"><span class="src">PricePerToken</span> — LLM API Pricing 2026: compare model costs per million tokens. <a href="https://pricepertoken.com/" target="_blank" rel="noopener">pricepertoken.com</a></li>
<li id="fn8"><span class="src">CloudZero</span> — LLM API Pricing Comparison 2026: every major model, ranked by cost. <a href="https://www.cloudzero.com/blog/llm-api-pricing-comparison/" target="_blank" rel="noopener">cloudzero.com</a></li>
<li id="fn9"><span class="src">RCR Wireless</span> — Agents, inference and the new token economics: Nvidia pitches the AI future (GTC 2026). <a href="https://www.rcrwireless.com/20260318/ai-infrastructure/agents-inference-token-economics-nvidia-ai" target="_blank" rel="noopener">rcrwireless.com</a></li>
<li id="fn10"><span class="src">Presidio</span> — How Tokens, Agents, and AI Factories Could Change Everything. <a href="https://www.presidio.com/blogs/how-tokens-agents-and-ai-factories-could-change-everything/" target="_blank" rel="noopener">presidio.com</a></li>
<li id="fn11"><span class="src">ikangai</span> — The LLM Cost Paradox: How "Cheaper" AI Models Are Breaking Budgets. <a href="https://www.ikangai.com/the-llm-cost-paradox-how-cheaper-ai-models-are-breaking-budgets/" target="_blank" rel="noopener">ikangai.com</a></li>
<li id="fn12"><span class="src">Google Cloud</span> — Q2 2025 AI Hypercomputer updates (inference infrastructure at scale). <a href="https://cloud.google.com/blog/products/ai-machine-learning/q2-2025-ai-hypercomputer-updates" target="_blank" rel="noopener">cloud.google.com</a></li>
</ol>

<p class="disclaimer"><strong>Disclaimer.</strong> This note is produced by Polygon Digital for informational and educational purposes only. It is not investment, financial, legal or tax advice and is not a recommendation regarding any company or asset. Token volumes, model prices and forecasts are sourced from third parties as cited, change rapidly, and may be out of date by the time you read this. Always verify against primary sources before relying on these figures.</p>
