import { useMemo, useState } from 'react'

/* Interactive margin-call ladder.
   Everything on screen is COMPUTED from the reader's two inputs plus the
   published KOSPI drawdown markers. No invented time series: the only
   external numbers are the four dated index levels in MARKERS below. */

// KOSPI drawdown milestones, measured from the record close of 9,385.59 (Jun 19 2026).
const PEAK = 9385.59
const MARKERS = [
  { label: 'Bear market', sub: 'mid-July', level: PEAK * 0.8 },
  { label: 'Jul 28 close', sub: '6,023.66', level: 6023.66 },
  { label: 'Jul 30 close', sub: '5,593.56', level: 5593.56 },
  { label: 'July low', sub: '5,262.77', level: 5262.77 },
].map((m) => ({ ...m, dd: 1 - m.level / PEAK }))

const AXIS_MAX = 0.5 // chart runs 0% to 50% drawdown

// Geometry
const W = 700
const H = 232
const X0 = 16
const X1 = 684
const TRACK_Y = 88
const TRACK_H = 46
const LABEL_ROWS = [22, 37, 52, 67] // markers stagger so close drawdowns do not collide

const pct = (v, dp = 1) => `${(v * 100).toFixed(dp)}%`
const xOf = (dd) => X0 + (Math.min(dd, AXIS_MAX) / AXIS_MAX) * (X1 - X0)

export default function MarginCall() {
  const [lev, setLev] = useState(2.0) // position value / own capital
  const [ratio, setRatio] = useState(140) // maintenance ratio, collateral / loan, %

  const model = useMemo(() => {
    const m = ratio / 100
    const loanShare = (lev - 1) / lev // loan / position
    // Margin call when position * (1 - d) / loan < m
    const callAt = 1 - m * loanShare
    // Equity is gone when the position falls by your share of it
    const zeroAt = 1 / lev
    // Highest leverage this maintenance ratio actually permits
    const maxLev = m / (m - 1)
    const noLoan = lev <= 1.001 // nothing borrowed, so nothing can be called
    const openable = callAt > 0
    const offChart = callAt > AXIS_MAX // call sits beyond the axis
    const equityAt = (d) => Math.max(lev * (1 - d) - (lev - 1), 0)
    return { callAt, zeroAt, maxLev, noLoan, openable, offChart, equityAt, loanShare }
  }, [lev, ratio])

  const survived = model.openable ? Math.min(model.callAt, AXIS_MAX) : 0
  const callX = xOf(Math.max(model.callAt, 0))
  const zeroX = xOf(model.zeroAt)
  // Flip the call labels to the left of the line once it nears the right edge.
  const flip = callX > W * 0.6
  const labelX = flip ? callX - 8 : callX + 7
  const labelAnchor = flip ? 'end' : 'start'

  return (
    <figure className="fig fig-live">
      <p className="fig-title">Find the drawdown that ends your position</p>
      <p className="fig-sub">
        Margin call and wipeout points by leverage · Korean broker maintenance-ratio convention
      </p>

      <div className="live-controls">
        <label className="live-ctl">
          <span className="live-ctl-head">
            <span>Leverage</span>
            <b>{lev.toFixed(2)}x</b>
          </span>
          <input
            type="range"
            min="1"
            max="5"
            step="0.05"
            value={lev}
            onChange={(e) => setLev(Number(e.target.value))}
            aria-label="Leverage, position value divided by your own capital"
          />
          <span className="live-ctl-foot">
            {pct(1 / lev, 0)} of the position is your money, {pct(model.loanShare, 0)} is borrowed
          </span>
        </label>

        <label className="live-ctl">
          <span className="live-ctl-head">
            <span>Maintenance ratio</span>
            <b>{ratio}%</b>
          </span>
          <input
            type="range"
            min="120"
            max="180"
            step="5"
            value={ratio}
            onChange={(e) => setRatio(Number(e.target.value))}
            aria-label="Maintenance ratio, collateral value divided by the loan"
          />
          <span className="live-ctl-foot">
            Collateral must stay above {ratio}% of the loan · max leverage {model.maxLev.toFixed(2)}x
          </span>
        </label>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={ariaLabel(lev, ratio, model)}>
        {/* axis grid every 10% */}
        <g stroke="currentColor" strokeOpacity="0.13">
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((d) => (
            <line key={d} x1={xOf(d)} y1={TRACK_Y - 12} x2={xOf(d)} y2={TRACK_Y + TRACK_H + 8} />
          ))}
        </g>

        {/* published KOSPI drawdown markers — hidden on narrow screens, where the
            readout below carries the same comparison at a legible size */}
        <g className="fig-markers">
          {MARKERS.map((m, i) => {
            const x = xOf(m.dd)
            const y = LABEL_ROWS[i % LABEL_ROWS.length]
            return (
              <g key={m.label}>
                {/* stops just inside the track so it does not cut through the call labels */}
                <line
                  x1={x}
                  y1={y + 4}
                  x2={x}
                  y2={TRACK_Y + 9}
                  stroke="currentColor"
                  strokeOpacity="0.4"
                  strokeDasharray="2 4"
                />
                <text
                  x={x - 6}
                  y={y}
                  textAnchor="end"
                  fontSize="9.5"
                  fill="currentColor"
                  fillOpacity="0.62"
                >
                  {m.label} {pct(m.dd, 0)}
                </text>
              </g>
            )
          })}
        </g>

        {/* the track: full drawdown range */}
        <rect
          x={X0}
          y={TRACK_Y}
          width={X1 - X0}
          height={TRACK_H}
          fill="currentColor"
          fillOpacity="0.05"
        />

        {/* survival zone: you are still standing */}
        <rect
          x={X0}
          y={TRACK_Y}
          width={Math.max(xOf(survived) - X0, 0)}
          height={TRACK_H}
          fill="currentColor"
          fillOpacity="0.82"
        />

        {/* liquidation zone: broker is selling */}
        {model.openable && !model.noLoan && !model.offChart && (
          <g>
            <rect
              x={callX}
              y={TRACK_Y}
              width={Math.max(Math.min(zeroX, X1) - callX, 0)}
              height={TRACK_H}
              fill="currentColor"
              fillOpacity="0.22"
            />
            <line
              x1={callX}
              y1={TRACK_Y - 10}
              x2={callX}
              y2={TRACK_Y + TRACK_H + 10}
              stroke="currentColor"
              strokeWidth="2"
            />
          </g>
        )}

        {/* labels on the track */}
        <g fontSize="10" fill="currentColor">
          {!model.openable && (
            <text x={X0 + 8} y={TRACK_Y + 27} fillOpacity="0.85" fontWeight="700">
              BELOW MAINTENANCE ON DAY ONE · this position cannot be opened
            </text>
          )}
          {model.openable && model.noLoan && (
            <text x={X0 + 8} y={TRACK_Y + 27} fillOpacity="0.85" fontWeight="700">
              NO LOAN, NO CALL · nobody can sell this position but you
            </text>
          )}
          {model.openable && !model.noLoan && model.offChart && (
            <text x={X1 - 8} y={TRACK_Y + 27} textAnchor="end" fillOpacity="0.85" fontWeight="700">
              MARGIN CALL {pct(model.callAt)} · past the end of this axis
            </text>
          )}
          {model.openable && !model.noLoan && !model.offChart && (
            <>
              <text x={labelX} y={TRACK_Y + 18} textAnchor={labelAnchor} fillOpacity="0.85" fontWeight="700">
                MARGIN CALL {pct(model.callAt)}
              </text>
              <text x={labelX} y={TRACK_Y + 34} textAnchor={labelAnchor} fillOpacity="0.6">
                broker starts selling here
              </text>
            </>
          )}
        </g>

        {/* wipeout marker */}
        {model.zeroAt <= AXIS_MAX && (
          <g>
            <line
              x1={zeroX}
              y1={TRACK_Y}
              x2={zeroX}
              y2={TRACK_Y + TRACK_H}
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
            <text
              x={Math.min(zeroX, X1)}
              y={TRACK_Y + TRACK_H + 22}
              fontSize="9.5"
              textAnchor={zeroX > X1 - 60 ? 'end' : 'middle'}
              fill="currentColor"
              fillOpacity="0.6"
            >
              capital gone {pct(model.zeroAt, 0)}
            </text>
          </g>
        )}

        {/* x axis */}
        <g fontSize="9.5" fill="currentColor" fillOpacity="0.55" textAnchor="middle">
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5].map((d) => (
            <text key={d} x={xOf(d)} y={TRACK_Y + TRACK_H + 42}>
              {pct(d, 0)}
            </text>
          ))}
          <text x={(X0 + X1) / 2} y={TRACK_Y + TRACK_H + 62} fillOpacity="0.45">
            DECLINE FROM YOUR ENTRY PRICE
          </text>
        </g>
      </svg>

      <div className="live-readout">
        <div className="live-cell">
          <span className="live-v">
            {!model.openable ? '–' : model.noLoan ? 'NONE' : pct(model.callAt)}
          </span>
          <span className="live-l">Drop that triggers the call</span>
        </div>
        <div className="live-cell">
          <span className="live-v">{pct(model.zeroAt, 0)}</span>
          <span className="live-l">Drop that erases your capital</span>
        </div>
        {MARKERS.slice(2, 3).map((m) => (
          <div className="live-cell" key={m.label}>
            <span className="live-v">
              {model.openable && !model.noLoan && model.callAt < m.dd
                ? 'LIQUIDATED'
                : pct(model.equityAt(m.dd), 0)}
            </span>
            <span className="live-l">
              At the KOSPI&apos;s {pct(m.dd, 0)} drawdown to {m.sub}
            </span>
          </div>
        ))}
      </div>

      <figcaption>
        Drag either control. Leverage is the whole position divided by your own money. The
        maintenance ratio is the Korean broker convention: collateral value must stay above that
        multiple of the loan, and 140% is the common setting. Note what happens above 3.5x, where the
        rule leaves no room at all. Index markers are measured from the KOSPI&apos;s record close of
        9,385.59 on June 19, 2026. This models a single margin loan against one position and ignores
        fees, interest and the extra day a broker may grant before selling.
      </figcaption>
    </figure>
  )
}

function ariaLabel(lev, ratio, model) {
  if (!model.openable) {
    return `At ${lev.toFixed(2)} times leverage with a ${ratio} percent maintenance ratio, the position starts below the maintenance requirement and cannot be opened.`
  }
  if (model.noLoan) {
    return 'With no borrowed money there is no margin call at any drawdown. The KOSPI fell 40 percent from its June 19 peak, which would leave 60 percent of an unlevered position.'
  }
  return `At ${lev.toFixed(2)} times leverage with a ${ratio} percent maintenance ratio, a margin call is triggered by a ${pct(model.callAt)} fall from your entry price, and your capital is fully erased by a ${pct(model.zeroAt, 0)} fall. The KOSPI fell 40 percent from its June 19 peak.`
}
