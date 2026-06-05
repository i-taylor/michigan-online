export let cssUrl = ''
export let cssInline = ''

function getFallbackCssUrl() {
  const { origin, pathname } = window.location

  if (pathname.includes('/staging/')) {
    return `${origin}/canvas-css/staging/css/canvas-style.css`
  }

  return `${origin}/canvas-css/dist/css/canvas-style.css`
}

if (import.meta.env.DEV) {
  // Plain import wires up HMR so edits to the LESS update the page's own styles
  await import('../../src/less/canvas-style.less')

  // ?inline gives the compiled CSS as a string for embedding in iframe srcdocs
  const { default: cssText } = await import('../../src/less/canvas-style.less?inline')
  cssInline = cssText

  // When the LESS recompiles, update cssInline and notify any iframe consumers
  import.meta.hot?.accept('../../src/less/canvas-style.less?inline', (newModule) => {
    cssInline = newModule?.default || ''
    window.dispatchEvent(new CustomEvent('lms-css-update'))
  })
} else {
  cssUrl = import.meta.env.VITE_LMS_CSS_URL || getFallbackCssUrl()

  if (cssUrl) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = cssUrl
    document.head.appendChild(link)
  }
}
