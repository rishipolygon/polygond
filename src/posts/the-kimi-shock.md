---
title: "The Kimi shock: China's largest open model reprices the AI trade"
date: 2026-07-22
summary: Moonshot AI released Kimi K3 this month, a 2.8 trillion parameter open-weight model that lands in the top four on the public leaderboards while pricing at a fraction of the closed frontier. Chip and AI stocks sold off within hours in what traders called a second DeepSeek moment. Here is our read on what actually changed, and why the selloff was never really about chips.
tags: ai, markets, macro
---

<p class="article-dek">On the week of July 16, a Beijing lab most Western investors could not name wiped hundreds of billions of dollars off the semiconductor complex in a single session. Moonshot AI released Kimi K3, the largest open-weight model in the world, and the market did what it did after DeepSeek eighteen months ago: it sold first and asked questions later.</p>

<p class="lead">Our thesis in one sentence: Kimi K3 did not break the frontier, it commoditized the tier just below it, and the selloff was the market re-pricing the belief that near-frontier AI would stay scarce, American, and expensive. This is the same fault line we wrote about in <a href="/blog/the-deepseek-discount">the DeepSeek discount</a>: when capability leaks out at open weights and a fraction of the price, the value stops accruing to whoever trained the model and starts accruing to whoever owns the distribution, the data, and the workflow around it.</p>

## What Moonshot actually shipped

Kimi K3 is a mixture-of-experts model with roughly **2.8 trillion total parameters**, of which only 16 of 896 experts fire on any given token, paired with a **one million token context window** and native visual understanding.<sup class="cite"><a href="#fn1">1</a></sup> That makes it the largest open-weight model ever released. Moonshot says the full weights land by July 27 under a modified MIT license, which is about as permissive as a frontier-scale release gets.<sup class="cite"><a href="#fn2">2</a></sup>

The performance claim is the part that moved markets. On the Artificial Analysis Intelligence Index, K3 ranks **fourth out of 189 models**, trailing only Claude Fable 5 and GPT-5.6 Sol, and it leads or ties the field on several coding-agent benchmarks.<sup class="cite"><a href="#fn1">1</a></sup> That is not "China catches up eventually." That is a free-to-self-host model sitting inside the top tier on the day it launched.

<div class="stat-band">
<div class="stat"><span class="stat-v">2.8T</span><span class="stat-l">Total parameters, the largest open-weight model released to date<sup class="cite"><a href="#fn1">1</a></sup></span></div>
<div class="stat"><span class="stat-v">#4 of 189</span><span class="stat-l">Rank on the Artificial Analysis Intelligence Index<sup class="cite"><a href="#fn1">1</a></sup></span></div>
<div class="stat"><span class="stat-v">$3 / $15</span><span class="stat-l">API price per million input / output tokens<sup class="cite"><a href="#fn3">3</a></sup></span></div>
<div class="stat"><span class="stat-v">~$30B</span><span class="stat-l">Valuation Moonshot is reportedly in talks to raise at<sup class="cite"><a href="#fn5">5</a></sup></span></div>
</div>

## The number that did the damage

Performance alone does not tank a chip index. Performance at this price does. Kimi K3 lists at **$3 per million input tokens and $15 per million output**, with cached input at $0.30.<sup class="cite"><a href="#fn3">3</a></sup> Put it next to the closed frontier and the gap is stark: it undercuts Claude Opus 4.8 and GPT-5.6 Sol on output by 40 to 50 percent, and because the weights are open, a company running at scale can skip the per-token meter entirely and self-host.

<figure class="fig">
<p class="fig-title">Top-tier output, discount-tier price</p>
<p class="fig-sub">API price · US dollars per million output tokens</p>
<svg viewBox="0 0 700 240" role="img" aria-label="Horizontal bar chart of API output price per million tokens: GPT-5.6 Sol 30 dollars, Claude Opus 4.8 25 dollars, Kimi K3 15 dollars, Gemini 3.1 Pro 12 dollars.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="196" y="52" text-anchor="end">GPT-5.6 Sol</text>
    <text x="196" y="100" text-anchor="end">Claude Opus 4.8</text>
    <text x="196" y="148" text-anchor="end">Kimi K3</text>
    <text x="196" y="196" text-anchor="end">Gemini 3.1 Pro</text>
  </g>
  <!-- scale: 1 dollar = 14px, x0 = 210 -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="210" y1="26" x2="210" y2="214"/>
    <line x1="350" y1="26" x2="350" y2="214"/>
    <line x1="490" y1="26" x2="490" y2="214"/>
    <line x1="630" y1="26" x2="630" y2="214"/>
  </g>
  <g fill="currentColor">
    <rect x="210" y="40" width="420" height="26" opacity="0.32"/>
    <rect x="210" y="88" width="350" height="26" opacity="0.4"/>
    <rect x="210" y="136" width="210" height="26" opacity="0.9"/>
    <rect x="210" y="184" width="168" height="26" opacity="0.5"/>
  </g>
  <g font-size="12" font-weight="700" fill="currentColor">
    <text x="640" y="58">$30</text>
    <text x="570" y="106">$25</text>
    <text x="430" y="154">$15</text>
    <text x="388" y="202">$12</text>
  </g>
  <g font-size="11" fill="currentColor" opacity="0.6" text-anchor="middle">
    <text x="210" y="232">$0</text>
    <text x="350" y="232">$10</text>
    <text x="490" y="232">$20</text>
    <text x="630" y="232">$30</text>
  </g>
</svg>
<p class="fig-note">Kimi K3 is the cheapest model in the frontier tier on a per-token basis, and the only one whose weights you can run yourself. Gemini 3.1 Pro is cheaper still but closed and a rung below on the intelligence index.</p>
</figure>

Note the honest caveat baked into that chart: K3 is not the cheapest model on earth. DeepSeek V4 runs near $0.14 in and under $1 out, and Gemini 3.1 Pro undercuts K3 too.<sup class="cite"><a href="#fn3">3</a></sup> What K3 does is collapse the price of *top-four* capability. Scarcity at the frontier is exactly what the current AI equity valuations are built on, and that is what got repriced.

## The one-day scare

The tape told the story faster than the analysts did. As K3 benchmarks spread on July 17 and 18, the chip and AI complex sold off in a pattern investors immediately recognized from the January 2025 DeepSeek shock.

<figure class="fig">
<p class="fig-title">A second DeepSeek moment, on the tape</p>
<p class="fig-sub">Approximate single-session move around the K3 launch · percent</p>
<svg viewBox="0 0 700 300" role="img" aria-label="Horizontal bar chart of one-day declines around the Kimi K3 launch: SoftBank down 9 percent, TSMC down 7, Taiwan TAIEX down 6, Nikkei down 4, Nvidia down 2.4, Nasdaq futures down 1.7.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="186" y="44" text-anchor="end">SoftBank</text>
    <text x="186" y="84" text-anchor="end">TSMC</text>
    <text x="186" y="124" text-anchor="end">Taiwan · TAIEX</text>
    <text x="186" y="164" text-anchor="end">Japan · Nikkei</text>
    <text x="186" y="204" text-anchor="end">Nvidia</text>
    <text x="186" y="244" text-anchor="end">Nasdaq futures</text>
  </g>
  <!-- scale: 1 percent = 46px, x0 = 200 -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="200" y1="24" x2="200" y2="262"/>
    <line x1="292" y1="24" x2="292" y2="262"/>
    <line x1="384" y1="24" x2="384" y2="262"/>
    <line x1="476" y1="24" x2="476" y2="262"/>
    <line x1="568" y1="24" x2="568" y2="262"/>
  </g>
  <g fill="currentColor">
    <rect x="200" y="32" width="414" height="24" opacity="0.9"/>
    <rect x="200" y="72" width="322" height="24" opacity="0.78"/>
    <rect x="200" y="112" width="276" height="24" opacity="0.66"/>
    <rect x="200" y="152" width="184" height="24" opacity="0.54"/>
    <rect x="200" y="192" width="110" height="24" opacity="0.44"/>
    <rect x="200" y="232" width="78" height="24" opacity="0.36"/>
  </g>
  <g font-size="12" font-weight="700" fill="currentColor">
    <text x="624" y="49">-9.0</text>
    <text x="532" y="89">-7.0</text>
    <text x="486" y="129">-6.0</text>
    <text x="394" y="169">-4.0</text>
    <text x="320" y="209">-2.4</text>
    <text x="288" y="249">-1.7</text>
  </g>
  <g font-size="11" fill="currentColor" opacity="0.6" text-anchor="middle">
    <text x="200" y="280">0</text>
    <text x="292" y="280">-2</text>
    <text x="384" y="280">-4</text>
    <text x="476" y="280">-6</text>
    <text x="568" y="280">-8</text>
  </g>
</svg>
<p class="fig-note">TSMC fell about 7 percent the same day it reported a 77 percent jump in quarterly operating profit. When a chart looks like that, the market is not selling earnings. It is selling a thesis.</p>
</figure>

That last point is the whole thing. TSMC's numbers were excellent and its stock dropped anyway. SoftBank, the cleanest public proxy for the OpenAI trade, fell hardest. The market was not discounting this quarter's demand for chips. It was discounting the premise that the enormous capital committed to AI infrastructure will earn a return large enough to justify current valuations, once near-frontier capability is available to anyone for the cost of electricity.

## This is a company, not just a model

The reflex is to file Kimi K3 as a benchmark stunt. The valuation trajectory says otherwise. Moonshot went from a **$4.3 billion** valuation at the end of 2025 to a **$20 billion-plus** Series D in May 2026, and is now reportedly in talks that would value it near **$30 billion**, a roughly sixfold jump in about six months.<sup class="cite"><a href="#fn4">4</a></sup><sup class="cite"><a href="#fn5">5</a></sup> Kimi's annualized recurring revenue roughly doubled from about $100 million in March to over $200 million by the end of April, and the company has held early talks about a Hong Kong IPO.<sup class="cite"><a href="#fn5">5</a></sup>

<figure class="fig">
<p class="fig-title">Six months, six times the price</p>
<p class="fig-sub">Moonshot AI implied valuation · US dollars, billions</p>
<svg viewBox="0 0 700 300" role="img" aria-label="Vertical bar chart of Moonshot AI valuation: 4.3 billion end of 2025, 10 billion early 2026, 20 billion May 2026, about 30 billion in talks July 2026.">
  <!-- base y = 250, scale: 1 billion = 6.4px, max ~30B -->
  <g stroke="currentColor" stroke-opacity="0.1">
    <line x1="70" y1="250" x2="660" y2="250"/>
    <line x1="70" y1="186" x2="660" y2="186"/>
    <line x1="70" y1="122" x2="660" y2="122"/>
    <line x1="70" y1="58" x2="660" y2="58"/>
  </g>
  <!-- climbing connector across bar tops -->
  <polyline points="150,222 290,186 430,122 570,58" fill="none" stroke="currentColor" stroke-opacity="0.5" stroke-width="2" stroke-dasharray="2 6" stroke-linecap="round"/>
  <g fill="currentColor">
    <rect x="105" y="222" width="90" height="28" opacity="0.34"/>
    <rect x="245" y="186" width="90" height="64" opacity="0.48"/>
    <rect x="385" y="122" width="90" height="128" opacity="0.66"/>
    <rect x="525" y="58" width="90" height="192" opacity="0.9"/>
  </g>
  <g font-size="13" font-weight="700" fill="currentColor" text-anchor="middle">
    <text x="150" y="214">$4.3B</text>
    <text x="290" y="178">$10B</text>
    <text x="430" y="114">$20B</text>
    <text x="570" y="50">~$30B</text>
  </g>
  <g font-size="11.5" fill="currentColor" opacity="0.62" text-anchor="middle">
    <text x="150" y="270">End 2025</text>
    <text x="290" y="270">Early 2026</text>
    <text x="430" y="270">May 2026</text>
    <text x="570" y="270">Jul 2026 · in talks</text>
  </g>
</svg>
<p class="fig-note">Open weights are the marketing. The business is a chatbot with real, fast-growing revenue and a valuation compounding at a pace few private companies have matched.</p>
</figure>

Open-sourcing a 2.8T model is not charity. It is distribution. Every developer who builds on K3, every benchmark it tops, every enterprise that self-hosts it feeds a funnel back to Moonshot's paid API, its app subscriptions, and its next raise. DeepSeek proved the playbook. Moonshot is running it with more capital and a bigger model.

## The honest caveats

**Benchmarks are not deployment.** A number-four ranking on an aggregate index does not mean K3 wins your specific workload, and early leaderboard placements included at least one flagged anomaly.<sup class="cite"><a href="#fn1">1</a></sup> **Cheap to license is not cheap to run.** A 2.8T model is roughly 700GB even at aggressive quantization, so self-hosting it at scale is a serious infrastructure commitment, not a free lunch. **And open weights cut against Moonshot too.** The same dynamic that lets Kimi undercut the American frontier lets DeepSeek and others undercut Kimi. Nobody in this race owns a moat made of model quality for long. Underwrite the direction, not the leaderboard.

## The bottom line

The chips did not get worse this month. The story around them got cheaper. Kimi K3 is the clearest proof yet that near-frontier AI is becoming a commodity, released for free, priced below the closed leaders, and shipped by a company worth six times what it was in January. The DeepSeek moment was not a one-off. It is the pattern. If your thesis depends on frontier capability staying scarce and expensive, this month was a warning. If it assumes capability gets cheap and the money moves to distribution, data, and workflow, this month was a gift. The models are converging. The moats are moving. Position for the second thing.

<div class="takeaways">
<h3>The five things to remember</h3>
<ol>
<li><strong>K3 commoditized the tier below the frontier.</strong> A 2.8T open-weight model ranked fourth of 189 on day one, trailing only Fable 5 and GPT-5.6.</li>
<li><strong>Price did the damage.</strong> At $3 / $15 per million tokens, and free to self-host, it undercuts the closed leaders by 40 to 50 percent on output.</li>
<li><strong>The selloff was a thesis, not earnings.</strong> TSMC fell 7 percent on a 77 percent profit jump; SoftBank fell 9. The market repriced AI capex, not this quarter's demand.</li>
<li><strong>This is a real business.</strong> Moonshot went from $4.3B to a reported ~$30B in six months, with revenue doubling in a month.</li>
<li><strong>No moat is made of model quality.</strong> Open weights cut against Moonshot as surely as they cut against the US labs. Value is moving to distribution.</li>
</ol>
</div>

## References

<ol class="refs">
<li id="fn1"><span class="src">Kingy AI / Artificial Analysis</span>: Kimi K3 architecture (2.8T parameters, 16 of 896 experts, 1M-token context) and #4 of 189 ranking on the Artificial Analysis Intelligence Index. <a href="https://kingy.ai/blog/kimi-k3-open-weight-economics-deep-dive/" target="_blank" rel="noopener">kingy.ai</a></li>
<li id="fn2"><span class="src">Bloomberg</span>: Moonshot unveils Kimi K3, narrowing the gap with US rivals; open-weight release timing and license. <a href="https://www.bloomberg.com/news/articles/2026-07-17/china-s-powerful-new-moonshot-ai-model-closes-gap-with-us-rivals" target="_blank" rel="noopener">bloomberg.com</a></li>
<li id="fn3"><span class="src">OpenRouter / Morph LLM</span>: Kimi K3 API pricing $3 input / $15 output ($0.30 cached) versus Claude Opus 4.8 ($5 / $25), GPT-5.6 Sol ($5 / $30), Gemini 3.1 Pro ($2 / $12), DeepSeek V4 (~$0.14 / ~$0.87). <a href="https://openrouter.ai/moonshotai/kimi-k3" target="_blank" rel="noopener">openrouter.ai</a></li>
<li id="fn4"><span class="src">TechCrunch</span>: Moonshot AI raises $2B at a $20B+ valuation as demand for open-source AI accelerates. <a href="https://techcrunch.com/2026/05/07/chinas-moonshot-ai-raises-2b-at-20b-valuation-as-demand-for-open-source-ai-skyrockets/" target="_blank" rel="noopener">techcrunch.com</a></li>
<li id="fn5"><span class="src">Tech-Insider</span>: Moonshot in talks near a $30B valuation, roughly 6x in six months; revenue and Hong Kong IPO discussions. <a href="https://tech-insider.org/au/moonshot-ai-kimi-valuation-2026/" target="_blank" rel="noopener">tech-insider.org</a></li>
<li id="fn6"><span class="src">Fortune</span>: Markets experience a new DeepSeek-style shock after Moonshot releases Kimi K3; chip and AI equity selloff. <a href="https://fortune.com/2026/07/17/china-moonshot-kimi-k3-markets-china-ai/" target="_blank" rel="noopener">fortune.com</a></li>
</ol>

<p class="disclaimer"><strong>Disclaimer.</strong> This note is produced by Polygon Digital for informational and educational purposes only. It is not investment, financial, legal or tax advice and is not a recommendation regarding any company or security, including any company named above. Views are our own opinion as of the publication date. Model specifications, benchmark rankings, prices and valuation figures are sourced from third parties as cited, are often self-reported, preliminary or reported-in-talks, and change rapidly. Single-session market moves are approximate and drawn from press reports. Verify against primary sources before relying on any figure here.</p>
