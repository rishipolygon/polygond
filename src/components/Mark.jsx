// The Polygon Digital hexagon mark, inlined so it inherits currentColor
// and flips with the theme. Geometry from the official SVG master.
export default function Mark({ size = 28, className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      {...props}
    >
      <polygon
        points="50,4 89.8,27 89.8,73 50,96 10.2,73 10.2,27"
        fill="none"
        stroke="currentColor"
        strokeWidth="5.4"
        strokeLinejoin="miter"
      />
      <polygon points="50,26 70.8,38 70.8,62 50,74 29.2,62 29.2,38" fill="currentColor" />
    </svg>
  )
}
