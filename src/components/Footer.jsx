import Mark from './Mark.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Mark size={16} />
          <span>© {new Date().getFullYear()} Polygon Digital</span>
        </div>
        <span className="footer-mono">POLYGOND.COM · EST. 2025</span>
      </div>
    </footer>
  )
}
