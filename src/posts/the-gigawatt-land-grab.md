---
title: "The gigawatt land grab: why Meta went to Alberta, and what it costs"
date: 2026-07-10
summary: Meta just broke ground on a CAD $13B, 1-gigawatt AI data centre in rural Alberta — its first in Canada and 33rd worldwide. Strip away the ribbon-cutting and it is a case study in the real bottleneck of the AI boom: not chips, not talent, but power, land, and the political will to permit both. Here is our read on who wins.
tags: ai, compute, energy
---

<p class="article-dek">On July 8, 2026, Meta put a shovel in the ground in Sturgeon County, Alberta — a county of a few thousand people about to host one of the largest single private investments in the province's history. The facility is a 1-gigawatt AI data centre, Meta's first in Canada and 33rd in its global fleet. The interesting question is not that Meta is building it. It is <em>why here</em>, and what the answer reveals about where the AI economy is actually being fought.</p>

<p class="lead">Our thesis in one sentence: the binding constraint on AI has quietly shifted from <strong>silicon</strong> to <strong>power</strong>, and Alberta just won a round of a global auction most people did not know was happening. The chips are a solved problem you can buy. A gigawatt of firm electricity, pre-zoned industrial land, and a regulator that says yes in months rather than years — that is the scarce asset now. Meta did not pick a frozen county northeast of Edmonton for the talent. It picked it for the megawatts.</p>

This is the second half of a story we started with the [token economy](/blog/the-token-economy): margin in AI pools at the infrastructure layer, not the model layer. The Alberta announcement is that thesis made physical. Follow the concrete and the substations, not the demos.

## What was actually announced

The facts, before the framing. Meta is investing **more than CAD $13 billion** (~US $9 billion) in a **1-gigawatt** data centre in Sturgeon County, Alberta.<sup class="cite"><a href="#fn1">1</a></sup><sup class="cite"><a href="#fn3">3</a></sup> It is the company's **first data centre in Canada** and its **33rd globally**.<sup class="cite"><a href="#fn1">1</a></sup> Construction runs **two to three years** and will employ **3,000+ workers at peak**, leaving behind **300+ permanent operational jobs** plus roughly **CAD $60 million** in local infrastructure spending.<sup class="cite"><a href="#fn1">1</a></sup><sup class="cite"><a href="#fn4">4</a></sup>

<div class="stat-band">
<div class="stat"><span class="stat-v">$13B</span><span class="stat-l">CAD investment (~US $9B)<sup class="cite"><a href="#fn2">2</a></sup></span></div>
<div class="stat"><span class="stat-v">1 GW</span><span class="stat-l">Power footprint — like a mid-sized city, 24/7<sup class="cite"><a href="#fn1">1</a></sup></span></div>
<div class="stat"><span class="stat-v">33rd</span><span class="stat-l">Meta data centre globally; 1st in Canada<sup class="cite"><a href="#fn1">1</a></sup></span></div>
<div class="stat"><span class="stat-v">~74%</span><span class="stat-l">Share of Alberta's grid run on natural gas<sup class="cite"><a href="#fn7">7</a></sup></span></div>
</div>

Note the fourth number. Hold it — we come back to it.

## Why Alberta, really

Strip the press-release language ("strong community," "shared values") and three hard variables explain the choice.

**Power availability.** A 1-gigawatt facility draws power like a city of roughly a million people, continuously. There are not many grids in North America with a spare gigawatt and the appetite to sell it. Alberta's deregulated, energy-rich market has it.

**Land and permitting.** The Sturgeon County site has **long been zoned for industrial use** and sits in an industrial-heartland corridor already threaded with heavy energy infrastructure.<sup class="cite"><a href="#fn1">1</a></sup> That collapses the timeline that kills most projects — the years lost to rezoning, transmission studies, and local opposition.

**Regulatory posture.** Alberta markets itself, explicitly, as the fast-yes jurisdiction. For a company racing rivals to stand up compute, permitting speed is not a nicety; it is the product.

This is the pattern beneath the pattern: hyperscalers are becoming among the largest *industrial* actors in rural North America, negotiating grid access and land directly with provinces and states. **The politics of AI increasingly happen at the county level** — and Alberta wrote a very competitive bid.

## The context: this is a rounding error for Meta

To see why a $13B facility barely moves Meta's needle, look at the fleet it belongs to. Meta has committed to spending on the order of **US $600 billion on AI infrastructure over three years**, with **US $115–135 billion in 2026 alone**.<sup class="cite"><a href="#fn5">5</a></sup><sup class="cite"><a href="#fn6">6</a></sup> Alberta's gigawatt sits between Meta's Ohio "Prometheus" cluster (1 GW, online 2026) and the Louisiana "Hyperion" campus, a ~5 GW monster on 2,250 acres.<sup class="cite"><a href="#fn6">6</a></sup>

<figure class="fig">
<p class="fig-title">Alberta in Meta's gigawatt fleet</p>
<p class="fig-sub">Announced power footprint · gigawatts · selected Meta AI campuses</p>
<svg viewBox="0 0 700 220" role="img" aria-label="Horizontal bar chart of Meta data centre power footprints in gigawatts: Prometheus Ohio 1 GW, Alberta Sturgeon County 1 GW, Hyperion Louisiana about 5 GW.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="188" y="46" text-anchor="end">Prometheus · OH</text>
    <text x="188" y="106" text-anchor="end">Alberta · Sturgeon</text>
    <text x="188" y="166" text-anchor="end">Hyperion · LA</text>
  </g>
  <!-- scale: 5 GW = 470px, start x=198 -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="198" y1="24" x2="198" y2="186"/>
    <line x1="292" y1="24" x2="292" y2="186"/>
    <line x1="386" y1="24" x2="386" y2="186"/>
    <line x1="480" y1="24" x2="480" y2="186"/>
    <line x1="574" y1="24" x2="574" y2="186"/>
    <line x1="668" y1="24" x2="668" y2="186"/>
  </g>
  <rect x="198" y="30" width="94" height="32" fill="currentColor" fill-opacity="0.55"/>
  <text x="302" y="51" font-size="13" font-weight="600" fill="currentColor">1 GW</text>
  <rect x="198" y="90" width="94" height="32" fill="currentColor" fill-opacity="0.9"/>
  <text x="302" y="111" font-size="13" font-weight="600" fill="currentColor">1 GW</text>
  <rect x="198" y="150" width="470" height="32" fill="currentColor" fill-opacity="0.45"/>
  <text x="636" y="171" font-size="13" font-weight="600" fill="currentColor">~5 GW</text>
  <g font-size="10.5" fill="currentColor" fill-opacity="0.5">
    <text x="198" y="205" text-anchor="middle">0</text>
    <text x="386" y="205" text-anchor="middle">2 GW</text>
    <text x="668" y="205" text-anchor="middle">5 GW</text>
  </g>
</svg>
<figcaption>Sources: Meta newsroom on the Alberta build<sup class="cite"><a href="#fn1">1</a></sup>; reporting on Prometheus (Ohio) and Hyperion (Louisiana) footprints.<sup class="cite"><a href="#fn6">6</a></sup> Figures are announced/target capacities, not commissioned power.</figcaption>
</figure>

The takeaway: Alberta is not a moonshot for Meta. It is one tile in a continent-spanning mosaic of gigawatt bets, and the fact that a $13B project reads as *routine* is itself the story of 2026.

## The asterisk: "100% renewable," on a 74%-gas grid

Here is the tension the ribbon-cutting glosses. Meta says the facility's electricity use will be **matched with 100% clean and renewable energy**.<sup class="cite"><a href="#fn1">1</a></sup> The grid it physically plugs into does not remotely resemble that. In 2023, Alberta generated roughly **74% of its electricity from natural gas**, versus about **18% from renewables**.<sup class="cite"><a href="#fn7">7</a></sup> The province only fully exited coal in 2024, and its *legislated* renewable target is just **30% by 2030**.<sup class="cite"><a href="#fn7">7</a></sup>

<figure class="fig">
<p class="fig-title">What actually powers Alberta's grid</p>
<p class="fig-sub">Electricity generation by source · Alberta · ~2023–24 share</p>
<svg viewBox="0 0 700 190" role="img" aria-label="Horizontal bar chart of Alberta electricity generation share: natural gas about 74 percent, renewables about 18 percent, other about 8 percent.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="150" y="46" text-anchor="end">Natural gas</text>
    <text x="150" y="106" text-anchor="end">Renewables</text>
    <text x="150" y="166" text-anchor="end">Other</text>
  </g>
  <!-- scale: 100% = 500px, start x=160 -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="160" y1="24" x2="160" y2="176"/>
    <line x1="285" y1="24" x2="285" y2="176"/>
    <line x1="410" y1="24" x2="410" y2="176"/>
    <line x1="535" y1="24" x2="535" y2="176"/>
    <line x1="660" y1="24" x2="660" y2="176"/>
  </g>
  <rect x="160" y="30" width="370" height="32" fill="currentColor" fill-opacity="0.9"/>
  <text x="540" y="51" font-size="13" font-weight="600" fill="currentColor">~74%</text>
  <rect x="160" y="90" width="90" height="32" fill="currentColor" fill-opacity="0.5"/>
  <text x="260" y="111" font-size="13" font-weight="600" fill="currentColor">~18%</text>
  <rect x="160" y="150" width="40" height="32" fill="currentColor" fill-opacity="0.35"/>
  <text x="210" y="171" font-size="13" font-weight="600" fill="currentColor">~8%</text>
  <g font-size="10.5" fill="currentColor" fill-opacity="0.5">
    <text x="160" y="192" text-anchor="middle">0%</text>
    <text x="410" y="192" text-anchor="middle">50%</text>
    <text x="660" y="192" text-anchor="middle">100%</text>
  </g>
</svg>
<figcaption>Source: Alberta generation mix via Statista / Canada Energy Regulator (2023 shares; coal fully retired 2024).<sup class="cite"><a href="#fn7">7</a></sup> "Matched with renewables" is an accounting mechanism (credits, PPAs), distinct from the physical electrons on the wire.</figcaption>
</figure>

The gap between "matched with renewables" and "powered by renewables" is the central sustainability fudge of the entire AI build-out — and it is not unique to Meta. Matching is an *accounting* claim: buy enough renewable certificates or sign enough power-purchase agreements to offset annual consumption on paper. It says nothing about what is generating electricity at 3 a.m. on a windless January night in Alberta, when the answer is: gas. Reporting on the project has already flagged that the facility will run **largely on fossil fuels** in practice.<sup class="cite"><a href="#fn5">5</a></sup>

We are not moralizing — we are pricing risk. As AI infrastructure scales into the tens of gigawatts industry-wide, this accounting question stops being a footnote and becomes a regulatory and reputational liability that a spreadsheet should carry. A gigawatt of "clean-matched" gas load is a carbon position dressed as a green one.

## Follow the money: who actually wins

Consistent with our token-economy call, the durable value here is not where the headline points.

| Layer | Position | Our read |
| --- | --- | --- |
| Silicon / power infra | NVIDIA, turbine & grid suppliers, utilities | **Structural winner.** Sells into every gigawatt regardless of whose logo is on the building. |
| Hyperscaler (Meta) | Owns the campus, bears the capex | **Strategic, not yet profitable.** Buying optionality on superintelligence at brutal cost. |
| Province / county | Alberta, Sturgeon County | **Real, lumpy upside.** Jobs and tax base, but concentrated and construction-heavy. |
| Local grid & ratepayers | AESO, Albertans | **The overlooked variable.** A gigawatt of new demand reshapes prices and emissions for everyone on the wire. |

The province gets a genuine jolt: 3,000+ construction jobs, 300+ permanent roles, $60M in local infrastructure, and an anchor tenant that reshapes a rural tax base for a generation.<sup class="cite"><a href="#fn1">1</a></sup> But note the shape of it — the *big* employment number is temporary construction; the *permanent* number is an order of magnitude smaller. This is the honest profile of data-centre economics everywhere: capital-intensive, land-intensive, and surprisingly light on long-term headcount. It is an infrastructure asset, not a factory town.

## Our call

If you take one position from this note, take this: **in the AI build-out, the scarce, price-setting asset is firm power and the permission to build it — and that value accrues to whoever supplies the gigawatt, not whoever rents it.** Our read —

- **The infrastructure and power layer are the durable winners.** Turbine makers, grid-equipment suppliers, and utilities monetize every gigawatt of AI demand without carrying model-layer risk. The Alberta build is one more data point in a demand curve that only bends up.
- **Meta is buying optionality, not margin.** A $13B gigawatt is a rational bet *only* if superintelligence-scale compute pays off. Meta can afford to be wrong here; a pure-play could not. Watch capex discipline, not ribbon-cuttings.
- **The energy claim is the risk to underwrite.** "100% renewable-matched" on a 74%-gas grid is a liability waiting for a carbon price, a disclosure rule, or a bad news cycle. Discount the green framing accordingly.

**What would change our mind:** Alberta pairing this load with genuinely additional firm clean power (new nuclear, deep geothermal, or grid-scale storage that actually serves the 3 a.m. gap) rather than annual-matching credits. That would turn the asterisk into a moat. We do not see it yet.

## The honest caveats

**Announced ≠ built.** Capacities and cost figures are Meta's own targets for a two-to-three-year project; both slip. **The grid mix is a 2023 snapshot** and Alberta's renewable share is rising, if slowly. **"Matching" is a real contractual commitment**, not nothing — it funds renewable projects that might not otherwise exist; our objection is to reading it as physical supply. And **local economic benefits are real but concentrated** — good for Sturgeon County, not a template for provincial policy.

## The bottom line

Meta going to Alberta is not a Canada story. It is a story about what AI costs once you stop measuring it in tokens and start measuring it in **gigawatts, gigadollars, and grid capacity**. The models get the headlines; the substations decide the winners. Alberta won this round because it had power, land, and a fast yes — the three things that are now scarcer than chips. The open question is what the province pays, in emissions and in ratepayer exposure, for the privilege. Watch the wire, not the ribbon.

<div class="takeaways">
<h3>The five things to remember</h3>
<ol>
<li><strong>Power is the new bottleneck.</strong> Chips you can buy; a firm gigawatt with fast permitting you cannot. Alberta had it.</li>
<li><strong>$13B is routine for Meta.</strong> It sits inside a ~$600B, three-year buildout — one tile in a gigawatt mosaic.</li>
<li><strong>"Renewable-matched" ≠ renewable-powered.</strong> The grid is ~74% gas; matching is accounting, not electrons.</li>
<li><strong>Margin sits with the gigawatt supplier</strong>, not the tenant. Infra and power win regardless of whose model trains there.</li>
<li><strong>Jobs are front-loaded.</strong> 3,000 construction, ~300 permanent — an infrastructure asset, not a factory town.</li>
</ol>
</div>

## References

<ol class="refs">
<li id="fn1"><span class="src">Meta Newsroom</span> — Breaking Ground on Meta's First Data Center in Canada (Sturgeon County, Alberta). <a href="https://about.fb.com/news/2026/07/breaking-ground-on-metas-first-data-center-in-canada/" target="_blank" rel="noopener">about.fb.com</a></li>
<li id="fn2"><span class="src">The Globe and Mail</span> — Meta to spend $13-billion to build AI data centre in Alberta. <a href="https://www.theglobeandmail.com/business/article-meta-ai-data-centre-sturgeon-county-alberta/" target="_blank" rel="noopener">theglobeandmail.com</a></li>
<li id="fn3"><span class="src">CNBC</span> — Meta is building its first big Canadian data center as AI expansion crosses the border. <a href="https://www.cnbc.com/2026/07/08/meta-is-building-its-first-big-data-center-in-canada-amid-ai-push.html" target="_blank" rel="noopener">cnbc.com</a></li>
<li id="fn4"><span class="src">CBC News</span> — Meta building its first Canadian data centre northeast of Edmonton. <a href="https://www.cbc.ca/news/canada/edmonton/meta-data-centre-sturgeon-county-alberta-9.7263271" target="_blank" rel="noopener">cbc.ca</a></li>
<li id="fn5"><span class="src">Cybernews</span> — Meta's new $10B AI data center will run almost entirely on fossil fuels. <a href="https://cybernews.com/ai-news/meta-data-center-canada/" target="_blank" rel="noopener">cybernews.com</a></li>
<li id="fn6"><span class="src">Data Center Dynamics / The Next Web</span> — Meta's multi-GW clusters: Prometheus (Ohio) and Hyperion (Louisiana, ~5 GW). <a href="https://thenextweb.com/news/meta-200-billion-hyperion-data-center-louisiana" target="_blank" rel="noopener">thenextweb.com</a></li>
<li id="fn7"><span class="src">Statista / Canada Energy Regulator</span> — Alberta electricity generation by source (2023: ~74% natural gas, ~18% renewables; coal retired 2024). <a href="https://www.statista.com/statistics/1402468/electricity-generation-alberta-canada/" target="_blank" rel="noopener">statista.com</a></li>
</ol>

<p class="disclaimer"><strong>Disclaimer.</strong> This note is produced by Polygon Digital for informational and educational purposes only. It is not investment, financial, legal or tax advice and is not a recommendation regarding any company or security, including any company named above. Views are our own opinion as of the publication date. Investment figures, capacities, jobs numbers, energy-mix shares and forecasts are sourced from third parties as cited, are often self-reported or announced targets, change rapidly, and may be revised. Verify against primary sources before relying on any figure here.</p>
