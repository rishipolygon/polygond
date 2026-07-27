---
title: "Kimi K3 did not undercut the frontier, it joined it: the largest open model ever and the price of intelligence"
date: 2026-07-27
summary: Moonshot released Kimi K3 on July 16 and published the weights this morning. The model placed fourth of 189 on the independent intelligence index, and it listed at $3 per million input tokens, roughly triple what the previous Kimi costs. Moonshot did not raise anyone's prices. It launched a model a full weight class up and charged accordingly. Here is what that says about what a unit of intelligence is actually worth, why the deflation everyone is waiting for arrives through downloads rather than rate cards, and why the grade of the barrel matters more than the price of it.
tags: ai, tokens, markets
---

<p class="article-dek">Kimi K3 shipped on July 16 as the largest open-weight model ever built: 2.8 trillion parameters, a million-token context window, fourth of 189 models on the independent intelligence index. This morning Moonshot published the weights. And at $3 per million input tokens, it arrived at roughly triple the price of the Kimi that came before it.</p>

<p class="lead">Our thesis in one sentence: K3 is the moment near-frontier capability stopped being a discount product, and where Moonshot placed it on the price sheet tells you more about where this market is heading than the benchmark table does. We covered the market reaction to this release in <a href="/blog/the-kimi-shock">the Kimi shock</a>. This note is about the number on the rate card, what it says about the cost of a unit of intelligence, and the thing almost nobody is pricing: that not all units are the same grade. It extends the argument we made in <a href="/blog/the-token-economy">the token paradox</a>.</p>

## What K3 actually posted

The benchmark sheet is genuinely strong, and strong in the places that matter commercially rather than academically.

K3 sits **fourth of 189 models** on the Artificial Analysis Intelligence Index, the highest any open-weight model has ever placed, trailing only Claude Fable 5 and two GPT-5.6 Sol variants. It took **first place on LMArena's Frontend Code arena** with an Elo of 1,679, beating Claude Fable 5 in 76% of blind head-to-head matchups judged by human developers. Its predecessor sat at number 18 on that same board. It ranks **first on SaaS workflow automation and first on legal task automation**, and third on GDPval-AA v2, the benchmark built to measure real economic work across 44 occupations.<sup class="cite"><a href="#fn3">3</a></sup>

<div class="stat-band">
<div class="stat"><span class="stat-v">#4 of 189</span><span class="stat-l">Artificial Analysis Intelligence Index, highest open-weight model ever<sup class="cite"><a href="#fn3">3</a></sup></span></div>
<div class="stat"><span class="stat-v">1,679</span><span class="stat-l">Elo on LMArena Frontend Code, first place, up from #18 for K2.6<sup class="cite"><a href="#fn3">3</a></sup></span></div>
<div class="stat"><span class="stat-v">3.2x</span><span class="stat-l">K3's input price versus K2.6, which stays on the sheet at $0.95<sup class="cite"><a href="#fn7">7</a></sup></span></div>
<div class="stat"><span class="stat-v">~594 GB</span><span class="stat-l">Quantized open weights, published today under a permissive license<sup class="cite"><a href="#fn5">5</a></sup></span></div>
</div>

That is not the profile of a cheap substitute. It is the profile of a product.

## Then Moonshot priced it like a frontier model

Kimi K3 lists at **$3 per million input tokens and $15 per million output**, with cached input at 30 cents. K2.6 listed at $0.95 and $4.<sup class="cite"><a href="#fn4">4</a></sup> That is 3.2 times the input rate and 3.75 times the output rate, landing precisely on Claude Sonnet 5's card.

One clarification worth making, because the shorthand gets this wrong: Moonshot did not raise anybody's prices. K2.6 is still on the sheet at $0.95 and $4, K2.5 at $0.60 and $3, K2 at $0.60 and $2.50, all unchanged.<sup class="cite"><a href="#fn7">7</a></sup> No existing customer saw a bill move. What happened is narrower and more interesting: Moonshot built a model a full weight class up and priced it for the class it had entered.

The reflex reading of Chinese labs is that they are the deflation engine and everything drifts toward pennies. K3 declines the role. It is not priced at 50 cents because it does not have to be. The discount was never a strategy. It was a position, and K3 is the model that let the company leave it while keeping the cheap tier on sale underneath.

To see why that matters, it helps to have a unit of account, and the best one on offer arrived two days before K3 shipped. On CNBC on July 14, Chamath Palihapitiya priced generative AI the way you would price crude: one barrel of intelligence equals one million tokens. Crude was trading near $80. The barrel of intelligence, he pointed out, was trading anywhere you liked. "You can buy it from OpenAI for 26 bucks. Anthropic's latest model costs you 56 bucks." And on the other side of the board: "Elon is selling you a barrel of intelligence for a buck. Zuck is about to sell it to you for a buck 50. Demis and Sundar are trying to sell it to you for a dollar. The Chinese will sell it to you for $0.50."<sup class="cite"><a href="#fn1">1</a></sup><sup class="cite"><a href="#fn2">2</a></sup>

<figure class="fig">
<p class="fig-title">A hundredfold spread on the same barrel</p>
<p class="fig-sub">Cost per million tokens as cited on CNBC, July 14, 2026 · US dollars</p>
<svg viewBox="0 0 700 320" role="img" aria-label="Horizontal bar chart of cost per million tokens: Anthropic latest 56 dollars, OpenAI 26 dollars, Kimi K3 input 3 dollars, Meta 1.50, xAI 1 dollar, Google 1 dollar, Chinese labs 50 cents.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="196" y="52" text-anchor="end">Anthropic · latest</text>
    <text x="196" y="92" text-anchor="end">OpenAI</text>
    <text x="196" y="132" text-anchor="end">Kimi K3 · input</text>
    <text x="196" y="172" text-anchor="end">Meta</text>
    <text x="196" y="212" text-anchor="end">xAI</text>
    <text x="196" y="252" text-anchor="end">Google</text>
    <text x="196" y="292" text-anchor="end">Chinese labs · as cited</text>
  </g>
  <!-- scale: $1 = 8px, x0 = 210 -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="210" y1="26" x2="210" y2="296"/>
    <line x1="290" y1="26" x2="290" y2="296"/>
    <line x1="370" y1="26" x2="370" y2="296"/>
    <line x1="450" y1="26" x2="450" y2="296"/>
    <line x1="530" y1="26" x2="530" y2="296"/>
    <line x1="610" y1="26" x2="610" y2="296"/>
  </g>
  <g fill="currentColor">
    <rect x="210" y="34" width="448" height="26" opacity="0.9"/>
    <rect x="210" y="74" width="208" height="26" opacity="0.72"/>
    <rect x="210" y="114" width="24" height="26" opacity="0.95"/>
    <rect x="210" y="154" width="12" height="26" opacity="0.5"/>
    <rect x="210" y="194" width="8" height="26" opacity="0.44"/>
    <rect x="210" y="234" width="8" height="26" opacity="0.44"/>
    <rect x="210" y="274" width="4" height="26" opacity="0.38"/>
  </g>
  <g font-size="12" font-weight="700" fill="currentColor">
    <text x="666" y="52">$56</text>
    <text x="426" y="92">$26</text>
    <text x="242" y="132">$3.00</text>
    <text x="230" y="172">$1.50</text>
    <text x="226" y="212">$1.00</text>
    <text x="226" y="252">$1.00</text>
    <text x="222" y="292">$0.50</text>
  </g>
  <g font-size="11" fill="currentColor" opacity="0.6" text-anchor="middle">
    <text x="210" y="314">$0</text>
    <text x="290" y="314">$10</text>
    <text x="370" y="314">$20</text>
    <text x="450" y="314">$30</text>
    <text x="530" y="314">$40</text>
    <text x="610" y="314">$50</text>
  </g>
</svg>
<p class="fig-note">Kimi K3's actual list price is ours, added for context. Every other figure is as cited on air. Prices quoted on television are approximate, blend input and output, and move constantly.</p>
</figure>

A hundredfold spread on what is nominally the same commodity. The forward call attached to it was specific: eventually a company misses earnings by a few cents and traces it straight back to buying $50 barrels when $1 barrels were on the shelf. He was careful to note it "hasn't happened yet."<sup class="cite"><a href="#fn2">2</a></sup>

Put K3 on that board and the framing does something useful. The 50 cent barrels are all still there. What is no longer there is a 50 cent barrel that competes at the top of the quality curve. Moonshot's cheap tier survived intact; its best model simply is not in it.

## The deflation is real. It is not coming from the rate card.

So does K3's price hike kill the deflation thesis? No. It relocates it, and this morning is when that became concrete.

Moonshot published the K3 weights today: 2.8 trillion parameters, quantized to roughly 594GB, under a permissive license.<sup class="cite"><a href="#fn5">5</a></sup> That is the largest open-weight release in history and the actual event of this cycle.

Once a near-frontier model is a file you can download, the price of a barrel stops being a pricing decision and becomes an infrastructure question. What does it cost *you* to serve it. No lab sets that number. No rate card defends it. The floor is whoever has GPUs and the engineering depth to run a 2.8T mixture-of-experts model in production, and that floor falls on a hardware curve rather than a competitive one.

The rationalization is coming. It will not look like OpenAI cutting to a dollar. It will look like a growing share of enterprise workload quietly never touching a frontier API at all.

The honest version of the cost picture is not the rate card anyway. It is cost per completed task, which folds in how many tokens a model burns to get there. K3 is verbose, generating roughly double the reasoning output of a typical reasoning model, which eats into its headline advantage.<sup class="cite"><a href="#fn4">4</a></sup>

<figure class="fig">
<p class="fig-title">The refined price, not the rate card</p>
<p class="fig-sub">Estimated cost per Artificial Analysis Intelligence Index task · US dollars</p>
<svg viewBox="0 0 700 268" role="img" aria-label="Horizontal bar chart of cost per index task: Claude Opus 4.8 1.80 dollars, GPT-5.6 Sol Max 1.04, Kimi K3 0.94, GLM-5.2 0.47, DeepSeek V4 Pro 0.04.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="196" y="52" text-anchor="end">Claude Opus 4.8</text>
    <text x="196" y="96" text-anchor="end">GPT-5.6 Sol Max</text>
    <text x="196" y="140" text-anchor="end">Kimi K3</text>
    <text x="196" y="184" text-anchor="end">GLM-5.2</text>
    <text x="196" y="228" text-anchor="end">DeepSeek V4 Pro</text>
  </g>
  <!-- scale: $1.00 = 240px, x0 = 210 -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="210" y1="26" x2="210" y2="232"/>
    <line x1="330" y1="26" x2="330" y2="232"/>
    <line x1="450" y1="26" x2="450" y2="232"/>
    <line x1="570" y1="26" x2="570" y2="232"/>
  </g>
  <g fill="currentColor">
    <rect x="210" y="34" width="432" height="28" opacity="0.32"/>
    <rect x="210" y="78" width="250" height="28" opacity="0.42"/>
    <rect x="210" y="122" width="226" height="28" opacity="0.95"/>
    <rect x="210" y="166" width="113" height="28" opacity="0.56"/>
    <rect x="210" y="210" width="10" height="28" opacity="0.44"/>
  </g>
  <g font-size="12" font-weight="700" fill="currentColor">
    <text x="650" y="52">$1.80</text>
    <text x="468" y="96">$1.04</text>
    <text x="444" y="140">$0.94</text>
    <text x="331" y="184">$0.47</text>
    <text x="228" y="228">$0.04</text>
  </g>
  <g font-size="11" fill="currentColor" opacity="0.6" text-anchor="middle">
    <text x="210" y="256">$0</text>
    <text x="330" y="256">$0.50</text>
    <text x="450" y="256">$1.00</text>
    <text x="570" y="256">$1.50</text>
  </g>
</svg>
<p class="fig-note">K3 is cheaper per task than the closed leaders, and roughly twenty times more expensive than DeepSeek V4 Pro. It collapsed the price of top-tier capability. It did not become the cheapest thing available.</p>
</figure>

## The part the price board cannot show you

Here is where the commodity framing quietly breaks, and it is the most useful thing in this whole release.

Crude is not one thing. There is WTI, there is Brent, there is heavy sour, and the spread between them exists because they cost different amounts to refine and yield different products. A barrel price without a grade attached is a number with no meaning.

Intelligence works the same way, and K3 demonstrates it in the least flattering way possible. Its factual accuracy climbed from 33% to 46% generation over generation, which is real progress. But its non-hallucination score sits at 49%, meaning that when K3 does not know something, it fabricates a confident answer more than half the time rather than hedging or abstaining.<sup class="cite"><a href="#fn3">3</a></sup><sup class="cite"><a href="#fn6">6</a></sup>

<figure class="fig">
<p class="fig-title">Same barrel, different grade</p>
<p class="fig-sub">Non-hallucination rate on AA-Omniscience · percent, higher is better</p>
<svg viewBox="0 0 700 190" role="img" aria-label="Horizontal bar chart of non-hallucination rate: GLM-5.2 72 percent, Claude Opus 4.8 64 percent, Kimi K3 49 percent.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="196" y="48" text-anchor="end">GLM-5.2</text>
    <text x="196" y="92" text-anchor="end">Claude Opus 4.8</text>
    <text x="196" y="136" text-anchor="end">Kimi K3</text>
  </g>
  <!-- scale: 1 point = 4.4px, x0 = 210 -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="210" y1="22" x2="210" y2="140"/>
    <line x1="320" y1="22" x2="320" y2="140"/>
    <line x1="430" y1="22" x2="430" y2="140"/>
    <line x1="540" y1="22" x2="540" y2="140"/>
    <line x1="650" y1="22" x2="650" y2="140"/>
  </g>
  <g fill="currentColor">
    <rect x="210" y="30" width="317" height="28" opacity="0.5"/>
    <rect x="210" y="74" width="282" height="28" opacity="0.4"/>
    <rect x="210" y="118" width="216" height="28" opacity="0.95"/>
  </g>
  <g font-size="12" font-weight="700" fill="currentColor">
    <text x="535" y="48">72%</text>
    <text x="500" y="92">64%</text>
    <text x="434" y="136">49%</text>
  </g>
  <g font-size="11" fill="currentColor" opacity="0.6" text-anchor="middle">
    <text x="210" y="164">0</text>
    <text x="320" y="164">25</text>
    <text x="430" y="164">50</text>
    <text x="540" y="164">75</text>
    <text x="650" y="164">100</text>
  </g>
</svg>
<p class="fig-note">This metric appears nowhere in Moonshot's own launch charts. For frontend code generation, where K3 legitimately wins, it may not matter much. For research, legal or financial work, a confident fabrication is worse than an admission of ignorance.</p>
</figure>

The grading problem runs deeper than one metric. The coding scores everyone quoted came from at least three different agent harnesses mixed into a single table. Harness choice alone moves these numbers by 10 to 26 points. Claude Opus 4.8 shows a 17.3 point spread on one benchmark depending on whose harness ran it, 69.2% versus 51.9%.<sup class="cite"><a href="#fn3">3</a></sup> The number you are comparing is never the model in isolation. It is the model plus its prompt, tools, retry logic, timeouts and context management. One analysis put the gap between lab benchmark scores and real-world deployment performance at roughly 37% across the industry.<sup class="cite"><a href="#fn6">6</a></sup>

So a $56 barrel and a $3 barrel can post similar headline numbers and still be materially different grades. The spread on the price board is real. Some meaningful fraction of it is also the price of a model that abstains when it does not know.

## The honest caveats

**We are pricing off self-reported numbers.** Moonshot had not published a technical report at launch, so training data and decontamination procedures remain undisclosed.<sup class="cite"><a href="#fn3">3</a></sup> **Open weights are free to license, not free to run.** A 2.8T model at roughly 594GB quantized is a serious infrastructure commitment, and the real bill is compute, storage, networking and the engineers who can keep it up. **And the board moves weekly.** Every figure here is a snapshot of a market repricing itself faster than anyone can publish. Underwrite the direction, not the decimal.

## The bottom line

K3 is the clearest signal yet that near-frontier capability has stopped being scarce and started being a product decision. A Chinese lab built the largest open model in history, placed fourth in the world with it, charged Sonnet prices for it, and then gave the weights away on schedule. Each of those four facts contradicts a different assumption the market was carrying six months ago.

A hundredfold spread on a commodity input is not a stable equilibrium, and finance departments eventually find line items like that. But the value has already moved past the crude and into the refinery. The scarce thing in 2026 is not access to a capable model. As of this morning that is a download. The scarce thing is knowing which grade of intelligence your specific workload can tolerate, building the harness that extracts twenty extra points from identical weights, and having the evaluation discipline to catch a 51% fabrication rate before your customers do.

The cheap barrels have arrived. Most companies still have no refinery.

<div class="takeaways">
<h3>The five things to remember</h3>
<ol>
<li><strong>K3 is a product now, not a discount.</strong> Fourth of 189 on the independent index, first on frontend code by blind human vote, first on legal and SaaS automation.</li>
<li><strong>Moonshot priced it accordingly.</strong> K3 lists at $3 and $15, matching Claude Sonnet 5, while K2.6 stays on sale at $0.95 and $4. Nobody's prices went up. The cheap tier just stopped being where the best model lives.</li>
<li><strong>The spread is still the story.</strong> A million tokens costs anywhere from 50 cents to $56 depending on the seller. No commodity sustains a hundredfold spread indefinitely.</li>
<li><strong>Deflation arrives through weights, not rate cards.</strong> With K3 open as of today, the price of near-frontier capability becomes an infrastructure question no lab controls.</li>
<li><strong>Barrels have grades.</strong> K3 fabricates confidently 51% of the time it is uncertain, versus 36% for Opus and 28% for GLM. Harness choices swing benchmark results another 10 to 26 points on identical weights. That is where the durable advantage sits.</li>
</ol>
</div>

## References

<ol class="refs">
<li id="fn1"><span class="src">CNBC</span>: Chamath Palihapitiya says soaring AI token spend will hit companies' earnings; "barrel of intelligence" framing and per-lab pricing, July 14, 2026. <a href="https://www.cnbc.com/2026/07/14/chamath-palihapitiya-ai-tokenmaxxing.html" target="_blank" rel="noopener">cnbc.com</a></li>
<li id="fn2"><span class="src">Fireside Alpha</span>: Transcript and breakdown of the "Squawk Box" segment, including the crude analogy, the per-lab price board and the earnings-miss prediction. <a href="https://firesidealpha.substack.com/p/chamath-a-barrel-of-intelligence" target="_blank" rel="noopener">firesidealpha.substack.com</a></li>
<li id="fn3"><span class="src">Emergent / Artificial Analysis</span>: Kimi K3 benchmark scores, Intelligence Index rank, AA-Omniscience accuracy and non-hallucination rates, LMArena Frontend Code Elo, and the harness-variance caveats. <a href="https://emergent.sh/learn/kimi-k3-benchmark" target="_blank" rel="noopener">emergent.sh</a></li>
<li id="fn4"><span class="src">The Decoder</span>: K3 pricing versus K2.6, comparison to Sonnet 5 and to DeepSeek and GLM cost per task, and the argument that ultra-cheap Chinese frontier pricing is ending. <a href="https://the-decoder.com/kimis-open-model-k3-nears-gpt-5-6-sol-and-fable-5-while-signaling-the-end-of-super-cheap-chinese-ai/" target="_blank" rel="noopener">the-decoder.com</a></li>
<li id="fn5"><span class="src">Hugging Face</span>: Kimi K3 model overview, 2.8T parameters, MXFP4 quantization and the open-weight release. <a href="https://huggingface.co/blog/ResterChed/kimi-k3-model-overview-mxfp4-quantization-open-wei" target="_blank" rel="noopener">huggingface.co</a></li>
<li id="fn6"><span class="src">Kili Technology</span>: Kimi K3's benchmarks and hallucinations, and the measured gap between lab benchmark scores and real-world deployment performance. <a href="https://kili-technology.com/blog/kimi-k3s-benchmarks-and-hallucinations----what-that-tells-us-about-ai-evaluation" target="_blank" rel="noopener">kili-technology.com</a></li>
<li id="fn7"><span class="src">BenchLM</span>: Moonshot API price sheet, July 2026, showing K3 at $3.00 / $15.00 alongside K2.6 at $0.95 / $4.00, K2.5 at $0.60 / $3.00 and K2 at $0.60 / $2.50, all unchanged and still offered. <a href="https://benchlm.ai/moonshot/api-pricing" target="_blank" rel="noopener">benchlm.ai</a></li>
</ol>

<p class="disclaimer"><strong>Disclaimer.</strong> This note is produced by Polygon Digital for informational and educational purposes only. It is not investment, financial, legal or tax advice and is not a recommendation regarding any company or security, including any company named above. Views are our own opinion as of the publication date. Token prices, benchmark scores, hallucination rates and cost-per-task estimates are sourced from third parties as cited, are frequently self-reported or preliminary, and change rapidly. Prices quoted in broadcast interviews are approximate. Verify against primary sources before relying on any figure here.</p>
