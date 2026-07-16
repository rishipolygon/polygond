---
title: "The gas behind the boom: how data centers and LNG are fighting for the same molecule"
date: 2026-07-15
summary: AI data centers cannot wait five years for a grid connection, so hyperscalers are building their own gas power plants on site. US data center gas demand is heading from near zero to somewhere between 3 and 6 billion cubic feet a day by 2030. At the same time LNG exporters are bidding for the same supply. Here is our read on how much gas the boom burns, and who gets paid to supply it.
tags: energy, ai, macro
---

<p class="article-dek">The AI race is usually told as a story about chips. It is really a story about electrons. A frontier data center needs a firm, uninterrupted gigawatt of power, and the grid cannot connect one fast enough. So the largest technology companies on earth have started doing something they never wanted to do: building their own power plants. Almost all of those plants burn natural gas.</p>

<p class="lead">Our thesis in one sentence: the AI build-out has opened one of the largest new sources of natural gas demand in US history, and because that same gas is also being chased by record LNG exports, the value is accruing to the people who supply the molecule and the machines that burn it, not the hyperscalers renting the compute. This is the energy half of a story we started with the [gigawatt land grab](/blog/the-gigawatt-land-grab): the binding constraint on AI is power, and power now means gas.</p>

First, a distinction that most coverage blurs, because it changes the whole picture. **LNG and "gas for data centers" are related but not the same thing.** A data center burning gas on site almost always runs ordinary **pipeline** natural gas. LNG, liquefied natural gas, is the super-cooled, shippable form built for export. The two connect in two ways, and both matter below: they compete for the same underlying supply, and in a growing number of off-grid cases LNG is literally trucked to the site as a substitute for a pipeline.

## Why gas, and why now

The reason is boring and decisive: **time.** Grid interconnection queues in much of the US now run five years or longer.<sup class="cite"><a href="#fn2">2</a></sup> A hyperscaler racing a rival to stand up compute cannot wait half a decade for a utility to say yes. Gas is the only power source that is dispatchable, available at gigawatt scale, and buildable now. So developers are going "behind the meter," generating their own electricity on site and skipping the queue entirely.

The scale of that pivot is already enormous. Data center developers have announced roughly **101 gigawatts** of behind-the-meter onsite gas generation in the US, with over 57 GW of equipment already ordered and around 7 GW under construction.<sup class="cite"><a href="#fn1">1</a></sup> For context, US data center electricity use is forecast to climb from about 176 terawatt-hours in 2023 to somewhere between 325 and 580 TWh by 2028.<sup class="cite"><a href="#fn6">6</a></sup> That is a small country's worth of new demand, and gas is being asked to carry the base load.

<div class="stat-band">
<div class="stat"><span class="stat-v">101 GW</span><span class="stat-l">Announced US behind-the-meter gas generation for data centers<sup class="cite"><a href="#fn1">1</a></sup></span></div>
<div class="stat"><span class="stat-v">3 to 6 Bcf/d</span><span class="stat-l">Forecast new data center gas demand by 2030<sup class="cite"><a href="#fn3">3</a></sup></span></div>
<div class="stat"><span class="stat-v">+66%</span><span class="stat-l">Rise in cost to build a new gas plant since 2023<sup class="cite"><a href="#fn5">5</a></sup></span></div>
<div class="stat"><span class="stat-v">100 GW</span><span class="stat-l">GE Vernova gas turbine backlog, ~20% tied to data centers<sup class="cite"><a href="#fn4">4</a></sup></span></div>
</div>

## How much gas, exactly

Here is the honest range, because the forecasts genuinely disagree. New US natural gas demand from data centers is projected at roughly **3 to 6 billion cubic feet per day by 2030**, up from a near-zero baseline today. RBC and S&P Global cluster near the top of that band at about 6.1 Bcf/d, Goldman Sachs sits lower at around 3.3 Bcf/d, and the most aggressive bulls talk about 10 to 12 Bcf/d.<sup class="cite"><a href="#fn3">3</a></sup> Put in perspective, the base case alone is a 2.5% to 5% addition to *total* US gas production and 7% to 15% of all power-sector gas burn, one of the largest single-sector demand additions the industry has ever absorbed.<sup class="cite"><a href="#fn3">3</a></sup>

But near-term, data centers are the smaller story. In 2026 they add only about 0.5 Bcf/d of incremental demand. **LNG exports add roughly 3.7 Bcf/d in the same year**, more than seven times as much, on a shorter and more certain timeline because the volumes are already contracted.<sup class="cite"><a href="#fn1">1</a></sup> US LNG exports are set to average 16.3 Bcf/d in 2026, up from 14.9 in 2025 and 11.9 in 2024.<sup class="cite"><a href="#fn1">1</a></sup> The point is not that one wins. It is that **two of the biggest demand shocks in the history of American gas are landing at the same time, pulling on the same supply.**

<figure class="fig">
<p class="fig-title">Two demand shocks, one pipeline</p>
<p class="fig-sub">Incremental US natural gas demand · billion cubic feet per day</p>
<svg viewBox="0 0 700 210" role="img" aria-label="Horizontal bar chart of incremental US natural gas demand in billion cubic feet per day: data centers add about 0.5 in 2026, LNG exports add about 3.7 in 2026, and data centers add a range of 3 to 6 by 2030.">
  <g font-size="12.5" font-weight="600" fill="currentColor">
    <text x="188" y="46" text-anchor="end">Data centers · 2026</text>
    <text x="188" y="100" text-anchor="end">LNG exports · 2026</text>
    <text x="188" y="154" text-anchor="end">Data centers · by 2030</text>
  </g>
  <!-- scale: 7 Bcf = 470px, start x=198, so 1 Bcf = 67.14px -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="198" y1="20" x2="198" y2="176"/>
    <line x1="332" y1="20" x2="332" y2="176"/>
    <line x1="466" y1="20" x2="466" y2="176"/>
    <line x1="601" y1="20" x2="601" y2="176"/>
  </g>
  <g fill="currentColor">
    <rect x="198" y="30" width="34" height="26" opacity="0.55"/>
    <rect x="198" y="84" width="248" height="26" opacity="0.85"/>
    <rect x="399" y="138" width="208" height="26" opacity="0.35"/>
  </g>
  <g font-size="12" font-weight="700" fill="currentColor">
    <text x="240" y="48">~0.5</text>
    <text x="454" y="102">~3.7</text>
    <text x="399" y="132" font-size="11" opacity="0.8">3.0 to 6.1</text>
  </g>
  <g font-size="11" fill="currentColor" opacity="0.6" text-anchor="middle">
    <text x="198" y="194">0</text>
    <text x="332" y="194">2</text>
    <text x="466" y="194">4</text>
    <text x="601" y="194">6</text>
  </g>
</svg>
<p class="fig-note">Near-term, LNG dwarfs data centers. By 2030 the data center curve catches up. Both draw on the same supply.</p>
</figure>

## Where LNG comes in directly

Beyond competing for supply, LNG is starting to fuel data centers physically. Sites that cannot get a pipeline or a grid connection in time are turning to **virtual pipelines**: gas liquefied elsewhere, trucked to the site, stored on location, and burned there. LNG makes this work at distance because it is far denser than compressed gas. Trucked CNG is economic within roughly 60 miles of a pipeline, while LNG stretches the range out to about 300 miles, and it stores cleanly without the fuel maintenance diesel needs while cutting emissions by around 30% versus diesel.<sup class="cite"><a href="#fn7">7</a></sup> For a genuinely off-grid campus, that is the difference between building now and not building at all.

This is still a niche relative to pipeline supply, but it is the fastest-growing niche, and it turns LNG logistics from a pure export business into a domestic power-delivery one.

## So who actually gets paid

This is the part that matters for anyone watching the market. When a scarce input suddenly has two desperate buyers, the margin moves to whoever controls the input and the equipment. Our read on the winners:

**Turbine makers, first and clearest.** GE Vernova's gas turbine backlog hit **100 gigawatts in the first quarter of 2026**, up 17 GW in a single quarter, with about a fifth of it tied directly to data centers and reservation slots booked out to 2030.<sup class="cite"><a href="#fn4">4</a></sup> Its electrification arm booked $2.4 billion in data center equipment orders in one quarter, more than all of the prior year, and the stock jumped 14% the day it reported.<sup class="cite"><a href="#fn4">4</a></sup> When the machine that burns the gas is sold out for years, that is pricing power.

**Gas producers with the right address.** Operators in the Haynesville and Permian basins sit next to both the Gulf Coast export terminals and the fast-growing Southern data center corridors. They supply both buyers at once.

**Midstream and pipelines.** Every new molecule of demand has to move. Owners of the pipes and storage between the wellhead and the burner tip collect a toll regardless of which buyer wins.

**A new class of LNG logistics providers** serving the off-grid virtual-pipeline market, a business that did not meaningfully exist three years ago.

The supply squeeze is the proof the demand is real. The cost to build a new combined-cycle gas plant has risen from under $1,500 per kilowatt in 2023 to about $2,157, a 66% jump, and turbine waitlists now stretch into the early 2030s.<sup class="cite"><a href="#fn5">5</a></sup> Prices do not do that unless the demand behind them is serious.

## The honest caveats

**Announced is not built.** The 101 GW figure and the 2030 demand forecasts are targets and projections; both slip, and a meaningful share of announced onsite gas will be delayed, downsized, or replaced by grid deals as queues clear. **Efficiency cuts both ways.** A cheaper, more efficient model like the ones we wrote about in [the DeepSeek discount](/blog/the-deepseek-discount) could bend the power curve down as fast as demand bent it up. **And the forecasts genuinely disagree**, from 3 to 12 Bcf/d, which is a polite way of saying nobody knows the pace. Underwrite the direction, not the decimal.

## The bottom line

The AI boom is not only a technology story. It is an energy story, and right now the energy is gas. Data centers and LNG exporters have become the two loudest new buyers in the American gas market, arriving at once and reaching for the same supply. The models get the headlines. The turbines, the pipelines, and the molecule get the margin. If you want to know who quietly wins the AI decade, follow the gas, not the GPUs.

<div class="takeaways">
<h3>The five things to remember</h3>
<ol>
<li><strong>Time is why gas won.</strong> Five-year grid queues pushed hyperscalers to build their own onsite gas power to skip the line.</li>
<li><strong>The number is 3 to 6 Bcf/d by 2030</strong>, from near zero today: one of the largest single-sector demand additions in US gas history.</li>
<li><strong>LNG is the bigger near-term buyer.</strong> Exports add ~3.7 Bcf/d in 2026 versus ~0.5 for data centers, and both pull on the same supply.</li>
<li><strong>Margin sits with the suppliers.</strong> Turbine makers, gas producers, midstream, and LNG logistics collect regardless of whose model trains there.</li>
<li><strong>The squeeze is the proof.</strong> Gas plant build costs up 66% and turbines sold out to 2030 say the demand is real.</li>
</ol>
</div>

## References

<ol class="refs">
<li id="fn1"><span class="src">East Daley Analytics</span>: Data Centers Could Add 6 Bcf/d to Gas Demand, with LNG exports adding ~3.7 Bcf/d of incremental demand in 2026. <a href="https://eastdaley.com/burner-tip-posts/data-centers-could-add-6-bcf-d-to-gas-demand-eda-forecast" target="_blank" rel="noopener">eastdaley.com</a></li>
<li id="fn2"><span class="src">Utility Dive</span>: Behind-the-meter data center gas plants and multi-year interconnection queues. <a href="https://www.utilitydive.com/news/data-centers-raise-energy-bills-not-for-reason-you-think/822205/" target="_blank" rel="noopener">utilitydive.com</a></li>
<li id="fn3"><span class="src">RBC Capital Markets / S&P Global / Goldman Sachs</span>: Data center gas demand forecast of ~3 to 6.1 Bcf/d by 2030. <a href="https://www.rbccm.com/en/insights/2026/05/natural-gas-powers-the-data-center-boom" target="_blank" rel="noopener">rbccm.com</a></li>
<li id="fn4"><span class="src">mgrid / Power Engineering</span>: GE Vernova gas turbine backlog reaches 100 GW as data centers drive Q1 2026 orders. <a href="https://mgrid.org/2026/04/22/ge-vernovas-gas-turbine-backlog-hits-100-gw-as-data-centers-drive-4-billion-in-q1-orders/" target="_blank" rel="noopener">mgrid.org</a></li>
<li id="fn5"><span class="src">TechCrunch</span>: Data center demand drives 66% surge in natural gas power plant costs. <a href="https://techcrunch.com/2026/04/27/data-center-demand-drives-66-surge-in-natural-gas-power-plant-costs/" target="_blank" rel="noopener">techcrunch.com</a></li>
<li id="fn6"><span class="src">RBC Capital Markets</span>: US data center electricity use rising from ~176 TWh (2023) to 325 to 580 TWh by 2028. <a href="https://www.rbccm.com/en/insights/2026/05/natural-gas-powers-the-data-center-boom" target="_blank" rel="noopener">rbccm.com</a></li>
<li id="fn7"><span class="src">Natural Gas Intelligence</span>: LNG and CNG virtual pipelines for data centers; LNG economic to ~300 miles, ~30% lower emissions than diesel. <a href="https://naturalgasintel.com/news/lng-cng-gain-footing-as-data-centers-chase-five-nines-natural-gas-reliability/" target="_blank" rel="noopener">naturalgasintel.com</a></li>
</ol>

<p class="disclaimer"><strong>Disclaimer.</strong> This note is produced by Polygon Digital for informational and educational purposes only. It is not investment, financial, legal or tax advice and is not a recommendation regarding any company or security, including any company named above. Views are our own opinion as of the publication date. Demand forecasts, capacities, cost figures and export volumes are sourced from third parties as cited, are often self-reported or announced targets, change rapidly, and may be revised. Verify against primary sources before relying on any figure here.</p>
