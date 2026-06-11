---
title: "Reading the curve: a primer on term structure"
date: 2026-06-04
summary: Contango, backwardation, and what the shape of a futures curve is actually telling you.
tags: energy, term structure
---

The futures curve is the closest thing a commodity market has to a public balance sheet. Before any model, any forecast, any narrative — the curve tells you what the market is willing to pay to hold a barrel today versus a barrel next year.

## Two shapes, two stories

| Shape | Front vs. back | What it usually signals |
| --- | --- | --- |
| Contango | Front cheaper | Ample supply, storage being paid for |
| Backwardation | Front richer | Tightness, a premium on barrels now |

Neither shape is a forecast. A steep contango doesn't say prices will rise along the curve — it says storage is the marginal buyer and someone has to be paid to hold inventory.

## The convenience yield

The textbook decomposition:

```
F(t,T) = S(t) · e^[(r + u − y)(T − t)]
```

where `r` is the financing rate, `u` the storage cost, and `y` the *convenience yield* — the value of having the physical barrel in hand. When `y` spikes, backwardation deepens, and the market is telling you that optionality on physical supply is scarce.

## Why it matters weekly

Curve shape moves slower than spot, but when it flips, it flips for structural reasons. Watching the front spreads week over week is one of the highest signal-to-noise habits in energy markets.

More on storage economics in a future note.
