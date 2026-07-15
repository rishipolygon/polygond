import { useEffect, useState } from 'react'

// Share bar shown at the foot of every post. On phones it uses the native share
// sheet (so readers can send it straight to Instagram, WhatsApp, Messages, etc.)
// and, where supported, shares the ready-made 9:16 "story" graphic as a file so
// it drops right into an Instagram / Snapchat / TikTok story. Everywhere else it
// falls back to X / LinkedIn / copy-link and a direct download of the graphic.
export default function Share({ slug, title }) {
  const url = `https://polygond.com/blog/${slug}`
  const storyPath = `/story/${slug}.png`
  const [canShare, setCanShare] = useState(false)
  const [canShareFile, setCanShareFile] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
    try {
      const probe = new File([new Blob([''])], 'p.png', { type: 'image/png' })
      setCanShareFile(!!navigator.canShare && navigator.canShare({ files: [probe] }))
    } catch {
      setCanShareFile(false)
    }
  }, [])

  async function shareLink() {
    try {
      await navigator.share({ title, text: title, url })
    } catch {
      /* user cancelled */
    }
  }

  function downloadStory() {
    const a = document.createElement('a')
    a.href = storyPath
    a.download = `${slug}-polygond-story.png`
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  async function shareStory() {
    try {
      const res = await fetch(storyPath)
      const blob = await res.blob()
      const file = new File([blob], `${slug}-polygond.png`, { type: 'image/png' })
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title, text: `${title}\n${url}` })
        return
      }
      downloadStory()
    } catch {
      downloadStory()
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked */
    }
  }

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`

  return (
    <section className="share">
      <span className="kicker">SHARE THIS NOTE</span>

      <div className="share-row">
        {canShare && (
          <button className="share-btn share-btn-primary" onClick={shareLink}>
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <path d="m8.6 13.5 6.8 4M15.4 6.5 8.6 10.5" />
            </svg>
            Share
          </button>
        )}
        <a className="share-btn" href={xUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
            <path d="M18.9 1.5h3.5l-7.6 8.7L23.7 22.5h-7l-5.5-7.2-6.3 7.2H1.4l8.1-9.3L.9 1.5h7.2l5 6.6zM17.7 20.4h1.9L6.4 3.5H4.3z" />
          </svg>
          X
        </a>
        <a className="share-btn" href={liUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
          LinkedIn
        </a>
        <button className="share-btn" onClick={copyLink}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
          </svg>
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>

      <div className="share-story">
        <img className="share-story-thumb" src={storyPath} alt="" width="99" height="176" loading="lazy" />
        <div className="share-story-copy">
          <h3>Post it to your story</h3>
          <p>A ready-made 9:16 graphic for Instagram, Snapchat, or TikTok.</p>
          <div className="share-row">
            {canShareFile && (
              <button className="share-btn share-btn-primary" onClick={shareStory}>
                Share to story
              </button>
            )}
            <button className="share-btn" onClick={downloadStory}>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M5 21h14" />
              </svg>
              Download graphic
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
