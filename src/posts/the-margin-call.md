---
title: "The margin call: how Korea's leveraged chip trade liquidated 1.2 million people"
date: 2026-07-30
summary: The KOSPI doubled in six months, then gave back more in one month than it did in 1997 or 2008. The index number is not the story. The story is that 1.2 million retail margin accounts got called and up to 460,000 were sold out by their own brokers. Here is the machine that did it, and an interactive chart that shows you exactly where a levered position dies.
tags: markets, macro, risk
---

<p class="article-dek">Six months ago the KOSPI was the best performing index on the planet. It doubled. On June 19 it closed at a record 9,385.59. Today it sits at 5,593.56, and July alone has taken more off the index than the 1997 crisis or 2008 did. But the drawdown is not the interesting part. The interesting part is how much of the selling had nothing to do with anyone's opinion.</p>

<p class="lead">Our thesis in one sentence: Korea did not have a valuation problem, it had a plumbing problem, and the plumbing was built in public over about eight weeks. A concentrated index, a new class of single-stock leveraged products, and a record stack of margin debt combined into a machine that only had one setting. When the tape turned, the machine sold, and the selling was mechanical. If you want to understand what a leverage unwind actually looks like from the inside, this is the cleanest example the market has produced in a decade.</p>

<div class="stat-band">
<div class="stat"><span class="stat-v">1.2M</span><span class="stat-l">Retail margin accounts hit with calls by July 13<sup class="cite"><a href="#fn6">6</a></sup></span></div>
<div class="stat"><span class="stat-v">~33%</span><span class="stat-l">KOSPI's July decline, worse than 1997 or 2008<sup class="cite"><a href="#fn7">7</a></sup></span></div>
<div class="stat"><span class="stat-v">₩38.6tn</span><span class="stat-l">Record margin loan balance set on June 24<sup class="cite"><a href="#fn3">3</a></sup></span></div>
<div class="stat"><span class="stat-v">10%+</span><span class="stat-l">Forced liquidation rate, up from a 2.1% average<sup class="cite"><a href="#fn6">6</a></sup></span></div>
</div>

## How the machine was assembled

Start with the concentration, because everything else sits on top of it. Samsung Electronics and SK Hynix are together roughly half of the KOSPI's market capitalisation. That is not a diversified index with two big names in it. That is a two-stock bet with 900-odd tickers attached for decoration. When the KOSPI cleared 9,000 in mid-June, the move was chip-led and the breadth underneath it was already thin.<sup class="cite"><a href="#fn9">9</a></sup>

Then add the product. In May, regulators approved single-stock leveraged ETFs on those same two companies, engineered to return twice the daily move of one stock. Sixteen products listed. Retail put roughly 13.8 trillion won into them.<sup class="cite"><a href="#fn4">4</a></sup> Note the layering: a 2x daily-reset instrument, written on a single security, that is itself half an index.

Then add the borrowing. Margin loan balances climbed to an all-time high of 38.63 trillion won on June 24, and the broader measure of investor debt cleared 60 trillion won by the end of May.<sup class="cite"><a href="#fn3">3</a></sup><sup class="cite"><a href="#fn6">6</a></sup> People were not simply buying the leveraged product. They were borrowing to buy the leveraged product.

Read that stack from the bottom up. Borrowed money, buying a 2x daily-reset fund, on one stock, that is half an index, in one sector, in one country. Every layer was individually defensible and someone signed off on each one. Assembled, they formed something with no reverse gear.

## The mechanic almost nobody prices correctly

Here is the part worth internalising, and it is the reason we built the chart below.

A margin call is not a market view. When your collateral value falls below the maintenance threshold, the broker sells. It does not matter what you think about HBM demand in 2027. It does not matter that you were right about the thesis and early on the timing. The position is closed at whatever bid exists at that moment, and that selling pushes the price lower, which drops the next investor's collateral value, which triggers the next tier of calls.

That feedback loop is what separates a correction from a liquidation. And it showed up in the Korean data with unusual clarity. The forced liquidation rate went from a six-month average of about 2.1% to above 10%.<sup class="cite"><a href="#fn6">6</a></sup> Single-day forced sales peaked at 142.2 billion won on July 9, and were still running at 61.1 billion won on July 29, three weeks into the decline.<sup class="cite"><a href="#fn1">1</a></sup> That tail is the tell. Genuine panic selling is fast and over. Forced selling grinds, because it has to wait for each new tier of collateral to fail.

The chart below lets you find the exact point where a position stops belonging to you. Move the leverage slider and watch how quickly the survivable drawdown collapses. This is the whole argument in one control.

[[chart:margin-call]]

Two things fall out of that chart that are worth saying plainly.

The first is that leverage does not really add risk, it removes optionality. An unlevered investor who is wrong gets to wait. A levered investor who is wrong gets sold at the worst available tick and never finds out whether they were right. Same thesis, same stock, completely different outcome, and the variable was never the analysis. It was the ability to survive being early.

The second is that the danger is not linear. Going from 1x to 2x costs you a lot of room. Going from 2x to 3x costs you almost all of what is left. Under a standard 140% maintenance rule, a 2x position survives a 30% fall and a 3x position survives less than 7%. Most people who lever up are, in their own heads, taking twice as much risk. They are not.

## What actually pulled the trigger

Three things arrived at once, and the order matters less than the fact that the market was in no condition to absorb any of them.

The global AI trade began unwinding in early July, which took the KOSPI into a technical bear market by mid-month.<sup class="cite"><a href="#fn8">8</a></sup> The Bank of Korea delivered its first rate hike since 2023, which raises the cost of exactly the leverage the market was built on.<sup class="cite"><a href="#fn7">7</a></sup> Then on July 28, news that China had begun mass production of domestic deep ultraviolet lithography tools landed alongside an SK Hynix earnings miss. Samsung fell 13.4% and SK Hynix 14.7% in a single session, the index dropped 10.8% to 6,023.66, and circuit breakers fired on consecutive days for the first time in the market's history.<sup class="cite"><a href="#fn11">11</a></sup><sup class="cite"><a href="#fn7">7</a></sup> Roughly 864 trillion won of market capitalisation disappeared across two sessions.<sup class="cite"><a href="#fn7">7</a></sup>

None of those three is a solvency event for Samsung or SK Hynix. A Chinese lithography announcement changes a competitive trajectory over years, not a cash flow next quarter. The size of the reaction was not a judgement about the companies. It was the sound of collateral failing.

## The deleveraging, in the only number that matters

Margin loan balances have fallen from the June 24 record of 38.63 trillion won to 32.995 trillion won as of July 30, a three month low.<sup class="cite"><a href="#fn1">1</a></sup><sup class="cite"><a href="#fn2">2</a></sup> A lot of commentary is reading that as stabilisation. It is not stabilisation. Very little of that reduction is people calmly choosing to carry less risk. It is positions being closed, many of them by brokers rather than by owners.

<figure class="fig">
<p class="fig-title">The unwind, not a recovery</p>
<p class="fig-sub">Outstanding margin loan balance · trillion won · Korea Financial Investment Association</p>
<svg viewBox="0 0 700 250" role="img" aria-label="Line chart of Korea's outstanding margin loan balance falling from a record 38.63 trillion won on June 24 to 37.33 trillion on June 30, 34.37 trillion on July 15 and 32.995 trillion on July 30.">
  <!-- y scale: 32 tn at y=200, 39 tn at y=40 -->
  <g stroke="currentColor" stroke-opacity="0.12">
    <line x1="70" y1="40" x2="670" y2="40"/>
    <line x1="70" y1="120" x2="670" y2="120"/>
    <line x1="70" y1="200" x2="670" y2="200"/>
  </g>
  <g font-size="10.5" fill="currentColor" opacity="0.55" text-anchor="end">
    <text x="60" y="44">39</text>
    <text x="60" y="124">35.5</text>
    <text x="60" y="204">32</text>
  </g>
  <polyline points="110,54 180,84 400,148 640,180" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <g fill="currentColor">
    <circle cx="110" cy="54" r="4.5"/>
    <circle cx="180" cy="84" r="3.5" opacity="0.7"/>
    <circle cx="400" cy="148" r="3.5" opacity="0.7"/>
    <circle cx="640" cy="180" r="4.5"/>
  </g>
  <g font-size="11" font-weight="700" fill="currentColor">
    <text x="110" y="40" text-anchor="middle">38.63</text>
    <text x="640" y="166" text-anchor="middle">33.00</text>
  </g>
  <g font-size="10" fill="currentColor" opacity="0.6" text-anchor="middle">
    <text x="110" y="228">JUN 24</text>
    <text x="180" y="228">JUN 30</text>
    <text x="400" y="228">JUL 15</text>
    <text x="640" y="228">JUL 30</text>
  </g>
</svg>
<figcaption>Four reported balances, drawn to scale on a time axis. The line between them is a connector, not daily data. Deleveraging of this shape is not risk appetite normalising, it is collateral being consumed.</figcaption>
</figure>

## The policy response, and its timing

The rules that arrived are sensible. New single-stock leveraged ETF listings are banned. The minimum cash deposit rises from 10 million to 30 million won. The minimum trading unit goes from 1 share to 20. Individual holdings are capped at 20% of a portfolio. Investor education becomes mandatory, along with trading simulations, and the products move to a variable 1x to 2x structure.<sup class="cite"><a href="#fn4">4</a></sup><sup class="cite"><a href="#fn5">5</a></sup> The deposit and trading-unit changes were pulled forward to August 1 from a September and November timeline.<sup class="cite"><a href="#fn4">4</a></sup>

Every one of those measures would have helped. Every one of them arrived after the liquidations. The Financial Supervisory Service approved these products in May and the government began restricting them in July, about two months later. FSC Chairman Lee Eog-weon said he takes seriously the responsibility for the volatility the products caused, and Finance Minister Koo Yun-cheol apologised publicly.<sup class="cite"><a href="#fn4">4</a></sup> Neither statement returns a won to anyone who was sold out.

The general lesson is one we keep running into: product design is systemic risk. A daily-reset 2x instrument on a security that constitutes a quarter of a national index is not a retail convenience. It is a leverage transmission channel with a listing.

<div class="callout">
<span class="callout-tag">The part that is not a market story</span>
Reuters found a 24 year old student who turned 20 million won into 300 million on a 500% margin loan, then lost all of it inside four weeks. He intends to try again. Before calling that reckless, note that a Seoul apartment costs roughly 14 years of median salary.<sup class="cite"><a href="#fn6">6</a></sup> When the ordinary route to an asset closes, leverage stops looking like gambling and starts looking like the only door left open. That is a housing policy failure arriving on a brokerage statement.
</div>

## Why anyone outside Korea should care

Not because of contagion in the credit sense. Korean brokerage receivables are around 1.2 trillion won, which is a real number for the firms involved and a rounding error for the global system.<sup class="cite"><a href="#fn1">1</a></sup>

Care because Korea is the same trade as everywhere else, just further along. Index concentration in a handful of AI hardware names, retail leverage stacked on a single theme, and products that amplify daily moves are not uniquely Korean features. Korea simply had the most extreme version, got there first, and has now run the experiment in public. The result is on the tape: a market can fall 40% from its high without a single one of its largest companies reporting anything close to a 40% deterioration in its business.

That gap between the fundamental news and the price is not irrationality. It is leverage clearing. It is worth knowing what it looks like before it shows up somewhere you own.

<div class="takeaways">
<h3>The five things to remember</h3>
<ol>
<li><strong>Concentration was the precondition.</strong> Two chipmakers are about half the KOSPI, so a single-stock shock was always going to be an index-level event.</li>
<li><strong>The leverage was stacked, not merely present.</strong> Borrowed money buying a 2x daily-reset fund on one stock, against a record 38.63 trillion won margin balance.</li>
<li><strong>Forced selling is not opinion.</strong> The liquidation rate went from 2.1% to over 10%, and forced sales were still running three weeks into the decline. That grind is the signature of collateral failing, not panic.</li>
<li><strong>Leverage removes optionality more than it adds risk.</strong> Being right and early is indistinguishable from being wrong once the broker has sold you out.</li>
<li><strong>The rules arrived after the damage.</strong> Approved in May, restricted in July, with 1.2 million margin calls in between. Product design is systemic risk.</li>
</ol>
</div>

## References

<ol class="refs">
<li id="fn1"><span class="src">Seoul Economic Daily</span>: forced liquidations of 61.1 billion won on July 29, the July 9 peak of 142.2 billion won, the KOSPI close of 5,593.56 on July 30, the margin loan balance of 32.995 trillion won, and brokerage receivables of 1.2 trillion won. <a href="https://en.sedaily.com/finance/2026/07/30/forced-liquidations-hit-3-week-high-as-stocks-plunge-two" target="_blank" rel="noopener">en.sedaily.com</a></li>
<li id="fn2"><span class="src">Seoul Economic Daily</span>: margin loan balance falling to a three-month low as volatility persists. <a href="https://en.sedaily.com/finance/2026/07/24/margin-loan-balance-hits-3-month-low-as-market-volatility" target="_blank" rel="noopener">en.sedaily.com</a></li>
<li id="fn3"><span class="src">Seoul Economic Daily</span>: Korea's margin loans reaching a record 38.63 trillion won as the KOSPI approached 9,000. <a href="https://en.sedaily.com/markets/2026/06/01/koreas-margin-loans-hit-record-38-trillion-won-as-kospi" target="_blank" rel="noopener">en.sedaily.com</a></li>
<li id="fn4"><span class="src">Korea JoongAng Daily</span>: the tightened single-stock leveraged ETF rules, the 20% portfolio cap, the deposit increase from 10 million to 30 million won, the trading-unit change, the accelerated August 1 start, the 13.8 trillion won of retail inflows, and the statements from FSC Chairman Lee Eog-weon and Finance Minister Koo Yun-cheol. <a href="https://www.koreajoongangdaily.com/business/govt-scrambles-to-crack-down-on-singlestock-leveraged-etfs-with-kospi-in-free-fall/12799542" target="_blank" rel="noopener">koreajoongangdaily.com</a></li>
<li id="fn5"><span class="src">Korea JoongAng Daily</span>: the government halting new Samsung and SK hynix leveraged ETF listings over volatility concerns. <a href="https://www.koreajoongangdaily.com/business/govt-to-halt-new-samsung-sk-hynix-leveraged-etfs-over-volatility-concerns/12777885" target="_blank" rel="noopener">koreajoongangdaily.com</a></li>
<li id="fn6"><span class="src">Reuters</span>: the 1.2 million accounts hit with margin calls, the rise in the forced liquidation rate, investor debt above 60 trillion won, the Seoul housing multiple, and the retail investor account. <a href="https://www.investing.com/news/stock-market-news/i-couldnt-breathesouth-koreas-frenzied-stock-trading-exposes-margin-loan-risks-4799867" target="_blank" rel="noopener">reuters via investing.com</a></li>
<li id="fn7"><span class="src">Yahoo Finance</span>: July's roughly 33% decline against 27% in 1997 and 23% in 2008, the June peak of 9,385.59, the 864 trillion won of market capitalisation erased over two sessions, the consecutive circuit breakers, and the Bank of Korea rate hike. <a href="https://finance.yahoo.com/markets/stocks/articles/south-korea-stock-market-crash-092957385.html" target="_blank" rel="noopener">finance.yahoo.com</a></li>
<li id="fn8"><span class="src">CNBC</span>: the KOSPI entering bear territory in July after leading global markets, and the chip concentration behind the move. <a href="https://www.cnbc.com/2026/07/09/kospi-bear-territory-ai-samsung-skhynix-chipmakers.html" target="_blank" rel="noopener">cnbc.com</a></li>
<li id="fn9"><span class="src">KED Global</span>: the KOSPI passing 9,000 on a chip-led rally that masked weak breadth elsewhere in the index. <a href="https://www.kedglobal.com/korean-stock-market/newsView/ked202606180003" target="_blank" rel="noopener">kedglobal.com</a></li>
<li id="fn10"><span class="src">The Korea Times</span>: forced stock sales reaching their highest level in nearly three years, with Korea Financial Investment Association data on liquidations against outstanding margin loans. <a href="https://www.koreatimes.co.kr/economy/others/20260610/kospi-rout-pushes-forced-stock-sales-to-highest-level-in-nearly-3-years" target="_blank" rel="noopener">koreatimes.co.kr</a></li>
<li id="fn11"><span class="src">Seoul Economic Daily</span>: the July 28 session, with Samsung down 13.4%, SK Hynix down 14.7% and the index at 6,023.66 on news of Chinese domestic lithography production. <a href="https://en.sedaily.com/finance/2026/07/28/kospi-plunges-289-percent-in-july-steeper-than-financial" target="_blank" rel="noopener">en.sedaily.com</a></li>
</ol>

<p class="disclaimer"><strong>Disclaimer.</strong> This note is produced by Polygon Digital for informational and educational purposes only. It is not investment, financial, legal or tax advice and is not a recommendation regarding any security or fund. Views are our own opinion as of the publication date. The interactive chart is a simplified teaching model of a single margin loan against a single position: it ignores interest, fees, the grace period a broker may allow, cross-collateral and product-specific rules, and it should not be used to manage a real position. Index levels, margin balances, liquidation figures and account counts are sourced from third parties as cited, are frequently preliminary or reported as approximations, and change daily. Account-liquidation totals in particular range from roughly 320,000 to 460,000 depending on source and cutoff date. Verify against primary sources, including the Korea Financial Investment Association's daily series, before relying on any figure here.</p>
