// Registry of interactive figures that posts can embed.
//
// In a post's markdown, put the token on its own line:
//
//   [[chart:margin-call]]
//
// Post.jsx splits the body on those tokens, renders the markdown around them
// and mounts the matching component in between. An unknown key renders nothing,
// so a typo degrades to a gap rather than a crash.

import MarginCall from './MarginCall.jsx'

export const charts = {
  'margin-call': MarginCall,
}

export const CHART_TOKEN = /^\[\[chart:([a-z0-9-]+)\]\]$/gim
