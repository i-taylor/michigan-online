import './cookbook.less'

const PAGES = [
  { href: 'index.html',              label: 'Image Assets' },
  { href: 'html-elements.html',      label: 'HTML Elements' },
  { href: 'new-canvas-elements.html', label: 'New Canvas' },
  { href: 'snippets.html',           label: 'Snippet Rules' },
]

const SEARCH_DATA = [
  { title: 'Michigan Online Logo (Horizontal)', page: 'index.html', url: 'index.html#asset-mo-logo',         keywords: 'course images michiganOnline.png logo horizontal' },
  { title: 'University of Michigan Logo',        page: 'index.html', url: 'index.html#asset-umich-logo',      keywords: 'course images umichlogo.png logo' },
  { title: 'Video icon',                         page: 'index.html', url: 'index.html#asset-video-icon',      keywords: 'icons video.png video' },
  { title: 'Discussion icon',                    page: 'index.html', url: 'index.html#asset-discussion-icon', keywords: 'icons discussion.png comment' },
  { title: 'Objectives icon',                    page: 'index.html', url: 'index.html#asset-objectives-icon', keywords: 'icons objectives.png light bulb lightbulb' },
  { title: 'Overview icon',                      page: 'index.html', url: 'index.html#asset-overview-icon',   keywords: 'icons overview.png clipboard' },
  { title: 'Reading icon',                       page: 'index.html', url: 'index.html#asset-reading-icon',    keywords: 'icons reading.png book page' },
  { title: 'Star icon',                          page: 'index.html', url: 'index.html#asset-star-icon',       keywords: 'icons star.png star' },
  { title: 'Time icon',                          page: 'index.html', url: 'index.html#asset-time-icon',       keywords: 'icons time.png clock' },
  { title: 'Text Block Section',         page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-text-block',           keywords: 'new canvas text block section h2 h3 h4 paragraph' },
  { title: 'Heading 2',                  page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-heading-h2',           keywords: 'new canvas heading h2 text block section title' },
  { title: 'Heading 3',                  page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-heading-h3',           keywords: 'new canvas heading h3 accent line text block' },
  { title: 'Heading 4',                  page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-heading-h4',           keywords: 'new canvas heading h4 text block' },
  { title: 'Information Callout Box',    page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-callout-info',         keywords: 'new canvas callout box information tag takeaway definition' },
  { title: 'Action Callout Box',         page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-callout-action',       keywords: 'new canvas callout box action reflection prompt tag' },
  { title: 'Highlight Callout Box',      page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-callout-highlight',    keywords: 'new canvas callout box highlight warning emphasis tag' },
  { title: 'Video Block',                page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-video-block',          keywords: 'new canvas video block lecture tag text block' },
  { title: 'Guest Lecture Video Block',  page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-video-block-highlight', keywords: 'new canvas video block guest lecture highlight' },
  { title: 'Blue Video Block',           page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-video-block-blue',     keywords: 'new canvas video block blue tag' },
  { title: 'Accordion',                  page: 'new-canvas-elements.html', url: 'new-canvas-elements.html#new-canvas-accordion',            keywords: 'new canvas accordion details summary faq frequently asked' },
  { title: 'Snippet checklist', page: 'snippets.html', url: 'snippets.html#snippet-checklist', keywords: 'snippet rules checklist role presentation alt width height base url icons' },
]

const currentPage = document.body.dataset.page || ''
const dynamicSearchData = []

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, ' ').trim()
}

function buildNav() {
  const navRoot = document.getElementById('nav-root')
  if (!navRoot) return null

  // Detach any filter-pills placed inside nav-root by the page
  const filterContent = navRoot.querySelector('.filter-pills')

  const navRow = document.createElement('div')
  navRow.className = 'nav-row'

  const navLeft = document.createElement('div')
  navLeft.className = 'nav-left'

  const nav = document.createElement('nav')
  nav.className = 'tabs'
  nav.setAttribute('aria-label', 'Cookbook pages')
  PAGES.forEach(({ href, label }) => {
    const a = document.createElement('a')
    a.className = 'tab'
    a.href = href
    a.textContent = label
    if (href === currentPage) a.setAttribute('aria-current', 'page')
    nav.appendChild(a)
  })
  navLeft.appendChild(nav)
  if (filterContent) navLeft.appendChild(filterContent)

  const searchLabel = document.createElement('label')
  searchLabel.className = 'search'
  const span = document.createElement('span')
  span.className = 'visually-hidden'
  span.textContent = 'Search'
  const input = document.createElement('input')
  input.type = 'search'
  input.placeholder = 'Search'
  input.setAttribute('aria-label', 'Search')
  searchLabel.appendChild(span)
  searchLabel.appendChild(input)

  navRow.appendChild(navLeft)
  navRow.appendChild(searchLabel)
  navRoot.replaceWith(navRow)

  return input
}

function buildToast() {
  const toast = document.createElement('div')
  toast.className = 'toast'
  toast.id = 'toast'
  toast.setAttribute('aria-live', 'polite')
  document.body.appendChild(toast)
}

let toastTimer
export function showToast(message) {
  const toast = document.getElementById('toast')
  if (!toast) return
  toast.textContent = message
  toast.classList.add('show')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1100)
}

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    ta.remove()
    return ok
  }
}

async function handleCopy(triggerEl) {
  const el = document.querySelector(triggerEl.getAttribute('data-copy'))
  if (!el) return
  const ok = await copyText(el.textContent)
  showToast(ok ? 'Snippet copied to clipboard' : 'Copy failed')

  if (triggerEl.classList.contains('preview')) {
    triggerEl.classList.add('copied')
    setTimeout(() => triggerEl.classList.remove('copied'), 650)
  }

  if (triggerEl.tagName === 'BUTTON') {
    const original = triggerEl.textContent
    triggerEl.textContent = ok ? 'Copied!' : 'Copy failed'
    triggerEl.disabled = true
    setTimeout(() => { triggerEl.textContent = original; triggerEl.disabled = false }, 1100)
  }
}

function setupCopy() {
  document.addEventListener('click', async (e) => {
    const btn = e.target.closest('button.copy[data-copy]')
    if (btn) { handleCopy(btn); return }
    const preview = e.target.closest('.preview[data-copy]')
    if (preview) handleCopy(preview)
  })

  document.addEventListener('keydown', async (e) => {
    const preview = document.activeElement?.closest?.('.preview[data-copy]')
    if (!preview) return
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCopy(preview) }
  })
}

function filterLocalCards(query) {
  document.querySelectorAll('.grid .card, .category-grid .card, main > .card').forEach((card) => {
    const haystack = card.dataset.search || normalize(card.textContent)
    card.dataset.search = haystack
    card.style.display = !query || haystack.includes(query) ? '' : 'none'
  })
}

function renderOtherResults(query) {
  const section = document.getElementById('search-results')
  const list    = document.getElementById('results-list')
  const empty   = document.getElementById('results-empty')
  if (!section || !list || !empty) return

  if (!query) { section.hidden = true; return }

  const matches = [...SEARCH_DATA, ...dynamicSearchData].filter((item) =>
    item.page !== currentPage &&
    normalize(item.title + ' ' + item.keywords).includes(query)
  )

  list.innerHTML = matches.map((item) =>
    `<li class="result-item"><a href="${item.url}">${item.title}</a><div class="result-meta">From ${item.page}</div></li>`
  ).join('')

  empty.hidden = matches.length > 0
  section.hidden = false
}

function setupSearch(input) {
  if (!input) return

  input.addEventListener('input', () => {
    const query = normalize(input.value)
    filterLocalCards(query)
    renderOtherResults(query)
  })

  fetch('elements.json')
    .then((r) => r.ok ? r.json() : [])
    .then((items) => {
      if (!Array.isArray(items)) return
      items.forEach((item) => {
        if (!item?.title || !item?.id) return
        dynamicSearchData.push({
          title: item.title,
          page: 'html-elements.html',
          url: 'html-elements.html#' + item.id,
          keywords: item.keywords || ''
        })
      })
      if (input.value) renderOtherResults(normalize(input.value))
    })
    .catch(() => {})
}

const searchInput = buildNav()
buildToast()
setupCopy()
setupSearch(searchInput)
