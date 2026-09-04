import { useEffect, useRef, useState } from 'react'
import './App.css'
import { caseStudies, caseStudyOrder } from './caseStudies'
import LiquidGlassContainer from './vendor/liquid-glass-container'

const blockedCaseStudySlugs = new Set(['sportsexcitement'])

const LOADER_JUMP_DURATION_MS = 850
const LOADER_JUMP_LOOPS = 2
const LOADER_JUMP_STAGGER_MS = 110
const LOADER_STACK_START_MS = (LOADER_JUMP_DURATION_MS * LOADER_JUMP_LOOPS) + (LOADER_JUMP_STAGGER_MS * 2)
const LOADER_FLY_START_MS = LOADER_STACK_START_MS + 650
const LOADER_SETTLE_MS = LOADER_FLY_START_MS - 60
const LOADER_DONE_MS = LOADER_FLY_START_MS + 870
const LOGO_EXPRESSIONS = ['/frame-5.svg', '/frame-6.svg']

const projects = [
  { number: '01', slug: 'sportsexcitement', title: 'User Sign-up, SportsExcitement, intern', subtitle: 'Streamlining sign-up so new users can get started faster', tags: ['UX Design', 'Mobile', 'Web'], tone: 'peach', artwork: 'spex' },
  { number: '02', slug: 'advisrlab', title: 'AI Advising, UW iSchool Sponsored Capstone, team lead', subtitle: 'Designing fast answers with visible limits', tags: ['UX Research','UX Design' ,'Prompt Engineer', 'Product Management'], tone: 'blue', artwork: 'advisrlab' },
  { number: '03', slug: 'somacanvas', title: 'Somacanvas, continued class project, 0 → 1', subtitle: 'A visual workspace for shaping and connecting ideas', tags: ['Product Design', 'Web', 'Interaction Design'], tone: 'soma', artwork: 'somacanvas' },
  { number: '04', slug: 'costco', title: 'Costco Website Redesign, class project', subtitle: 'Making online shopping clearer and easier to navigate', tags: ['UX Design', 'Prototype', 'Information Architecture'], tone: 'costco', artwork: 'costco' },
]

function Arrow({ diagonal = false }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {diagonal ? <path d="M5 15 15 5m-8 0h8v8" /> : <path d="M3 10h14m-5-5 5 5-5 5" />}
    </svg>
  )
}

function ProjectArtwork({ type }) {
  if (type === 'spex') {
    return <img className="artwork-image" src="/spex-card.svg" alt="User sign-up redesign interface" />
  }

  if (type === 'advisrlab') {
    return <img className="artwork-image" src="/advisrlab-card.png" alt="AdvisrLab AI advising chatbot interface" />
  }

  if (type === 'somacanvas') {
    return (
      <div className="soma-desktop" aria-hidden="true">
        <div className="soma-desktop-bar">
          <span />
          <span />
          <span />
        </div>
        <video className="artwork-video" autoPlay loop muted playsInline preload="metadata">
          <source src="/somacanvas-demo.mp4" type="video/mp4" />
        </video>
      </div>
    )
  }

  if (type === 'costco') {
    return <img className="artwork-image" src="/costco-card.svg" alt="Costco website redesign interface" />
  }

  if (type === 'mobile') {
    return (
      <svg className="artwork-svg" viewBox="0 0 720 480" role="img" aria-label="Mobile planning application mockup">
        <defs><linearGradient id="phone-bg" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#fffaf5" /><stop offset="1" stopColor="#f2d9c9" /></linearGradient></defs>
        <circle cx="530" cy="105" r="128" fill="#ec9c75" opacity=".7" /><circle cx="210" cy="415" r="145" fill="#f6c8a8" />
        <rect x="250" y="50" width="220" height="390" rx="34" fill="#22211f" transform="rotate(-7 360 245)" />
        <rect x="261" y="63" width="198" height="364" rx="25" fill="url(#phone-bg)" transform="rotate(-7 360 245)" />
        <g transform="rotate(-7 360 245)">
          <rect x="326" y="73" width="68" height="9" rx="5" fill="#22211f" /><text x="288" y="127" className="svg-kicker">TODAY</text><text x="288" y="161" className="svg-heading">Good morning.</text>
          <rect x="286" y="192" width="150" height="82" rx="15" fill="#e56f45" /><text x="302" y="217" className="svg-small light">09:30</text><text x="302" y="248" className="svg-label light">Design review</text>
          <rect x="286" y="287" width="150" height="50" rx="14" fill="#fff" /><circle cx="308" cy="312" r="8" fill="#efb25e" /><text x="326" y="316" className="svg-small">Weekly planning</text>
          <rect x="286" y="348" width="150" height="50" rx="14" fill="#fff" /><circle cx="308" cy="373" r="8" fill="#a4b991" /><text x="326" y="377" className="svg-small">Focus time</text>
        </g>
      </svg>
    )
  }
  if (type === 'dashboard') {
    return (
      <svg className="artwork-svg" viewBox="0 0 720 480" role="img" aria-label="Financial dashboard interface mockup">
        <rect x="76" y="62" width="568" height="356" rx="17" fill="#18243d" /><rect x="91" y="78" width="538" height="324" rx="8" fill="#f7f8fb" /><rect x="91" y="78" width="114" height="324" rx="8" fill="#e5eaf4" />
        <circle cx="119" cy="108" r="10" fill="#49689b" /><rect x="140" y="102" width="42" height="11" rx="5" fill="#9ca9bd" />
        <g fill="#bcc5d3"><rect x="113" y="158" width="65" height="8" rx="4" /><rect x="113" y="192" width="48" height="8" rx="4" /><rect x="113" y="226" width="57" height="8" rx="4" /><rect x="113" y="260" width="42" height="8" rx="4" /></g>
        <text x="237" y="120" className="svg-kicker blue-ink">OVERVIEW</text><text x="237" y="160" className="svg-heading blue-ink">$48,290</text>
        <path d="M240 284C285 274 298 216 342 230s49 61 93 24 61-80 130-55" fill="none" stroke="#4e70a8" strokeWidth="6" strokeLinecap="round" /><path d="M240 284C285 274 298 216 342 230s49 61 93 24 61-80 130-55v101H240Z" fill="#7894c0" opacity=".13" />
        <g fill="#dfe4ed"><rect x="237" y="327" width="102" height="48" rx="8" /><rect x="351" y="327" width="102" height="48" rx="8" /><rect x="465" y="327" width="102" height="48" rx="8" /></g>
      </svg>
    )
  }
  if (type === 'editorial') {
    return (
      <svg className="artwork-svg" viewBox="0 0 720 480" role="img" aria-label="Travel editorial website mockup">
        <path d="M0 350 205 176l88 80L429 91l291 270v119H0Z" fill="#788d70" opacity=".34" /><path d="M0 390 210 251l103 87 134-142 273 201v83H0Z" fill="#4d6a55" opacity=".35" /><circle cx="566" cy="101" r="61" fill="#f4cc7d" />
        <g transform="rotate(5 350 250)">
          <rect x="135" y="68" width="450" height="340" rx="5" fill="#f5f0e6" /><text x="172" y="113" className="svg-logo">FIELD NOTES</text><line x1="172" y1="128" x2="548" y2="128" stroke="#222c24" strokeWidth="1" />
          <rect x="172" y="154" width="236" height="152" fill="#8aa08b" /><path d="m172 290 68-87 48 40 45-65 75 112Z" fill="#415b48" /><circle cx="346" cy="185" r="21" fill="#efd189" />
          <text x="431" y="174" className="svg-kicker">ISSUE 04</text><text x="431" y="207" className="svg-serif">A slower way</text><text x="431" y="234" className="svg-serif">through the hills</text>
          <rect x="431" y="258" width="106" height="5" rx="2" fill="#9da69d" /><rect x="431" y="271" width="83" height="5" rx="2" fill="#b3bab2" /><line x1="172" y1="331" x2="548" y2="331" stroke="#c2beb4" /><text x="172" y="361" className="svg-small">WORDS, PLACES &amp; SMALL DISCOVERIES</text>
        </g>
      </svg>
    )
  }
  return (
    <svg className="artwork-svg" viewBox="0 0 720 480" role="img" aria-label="Design system interface mockup">
      <rect x="93" y="59" width="534" height="362" rx="16" fill="#f9f7fc" /><rect x="93" y="59" width="534" height="54" rx="16" fill="#2d2638" /><circle cx="124" cy="86" r="8" fill="#d0c0e6" /><rect x="145" y="81" width="70" height="10" rx="5" fill="#786d86" />
      <text x="126" y="151" className="svg-kicker purple-ink">COMPONENT LIBRARY</text><rect x="126" y="174" width="216" height="93" rx="12" fill="#ede7f5" /><circle cx="158" cy="207" r="16" fill="#896ca7" /><rect x="185" y="194" width="89" height="8" rx="4" fill="#8c8198" /><rect x="185" y="212" width="126" height="6" rx="3" fill="#c3b9cc" /><rect x="144" y="239" width="72" height="14" rx="7" fill="#d8cae7" />
      <rect x="360" y="174" width="234" height="93" rx="12" fill="#e7dff0" /><rect x="382" y="194" width="190" height="50" rx="10" fill="#604877" /><text x="429" y="224" className="svg-label light">Create project</text>
      <g transform="translate(126 292)"><rect width="468" height="93" rx="12" fill="#f0edf4" /><circle cx="45" cy="45" r="19" fill="#e3b972" /><circle cx="91" cy="45" r="19" fill="#a9bc99" /><circle cx="137" cy="45" r="19" fill="#b9a2d0" /><rect x="189" y="26" width="107" height="10" rx="5" fill="#9b91a5" /><rect x="189" y="49" width="181" height="7" rx="4" fill="#c7c0cd" /></g>
    </svg>
  )
}

function ProjectCard({ project }) {
  const [primaryTitle, ...secondaryTitle] = project.title.split(',')
  const projectContext = secondaryTitle.join(',').trim()
  const isUnderConstruction = blockedCaseStudySlugs.has(project.slug)
  const artwork = <ProjectArtwork type={project.artwork} />

  return (
    <article className={`project-card${isUnderConstruction ? ' is-under-construction' : ''}`}>
      {isUnderConstruction ? (
        <div className={`project-visual ${project.tone}`} aria-label={`${project.title} is under construction`}>
          {artwork}
          <div className="construction-banner" role="status">
            <div className="construction-banner-track" aria-hidden="true">
              {Array.from({ length: 8 }, (_, index) => <span key={index}> Under Construction <b>·</b> Coming Soon <b>·</b></span>)}
            </div>
            <span className="sr-only">Under Construction · Coming Soon</span>
          </div>
        </div>
      ) : (
        <a className={`project-visual ${project.tone}`} href={`/work/${project.slug}`} aria-label={`View ${project.title} case study`}>
          {artwork}
        </a>
      )}
      <div className="project-copy">
        <h2>
          {primaryTitle}
          {projectContext && <span className="project-context">, {projectContext}</span>}
        </h2>
        <div className="tags" aria-label="Project disciplines">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </article>
  )
}

const primaryNavigation = [
  { id: 'work', label: 'Work', href: '/' },
  { id: 'visual', label: 'Visual', href: '/visual' },
  { id: 'about', label: 'About', href: '/about' },
]

const pageDetails = {
  visual: {
    eyebrow: 'Visual archive',
    title: 'Experiments, visuals, and things made for joy.',
    description: 'A dedicated collection of visual explorations is coming here next.',
  },
  about: {
    eyebrow: 'About',
    title: 'A little more about Vivian.',
    description: 'This page is ready for your story, experience, approach, and the things that inspire your work.',
  },
  resume: {
    eyebrow: 'Resume',
    title: 'Experience, selected roles, and capabilities.',
    description: 'Add your résumé content or PDF when it is ready and this route can point directly to it.',
  },
}

const visualProjects = [
  {
    slug: 'tedx-uofw',
    title: 'TEDxUofW',
    role: 'Design Director',
    thumbnail: '/tedx-uofw-thumbnail.png',
    image: '/tedx-uofw.svg',
    alt: 'TEDxUofW visual design artwork',
  },
  {
    slug: 'somacanvas',
    title: 'SomaCanvas',
    role: 'Designer & Developer',
    href: 'https://somacanvas-alpha.vercel.app/',
    video: '/somacanvas-demo.mp4',
    alt: 'SomaCanvas gesture drawing experience',
  },
]

// Edit the artwork title and medium labels in this list.
const artGallery = [
  { src: '/art-gallery-05.jpg', title: '"The Boundary Between Insanity and Genius"', medium: 'Painted sculpture', alt: 'Sculpted portrait photographed against a vivid green background' },
  { src: '/art-gallery-01.jpg', title: 'Life Drawing', medium: 'Oil on canvas', alt: 'Figure painting with blue and warm ochre brushwork' },
  { src: '/art-gallery-02.jpg', title: 'Into the Hidden Danger', medium: 'Oil on canvas', alt: 'Surreal underwater room painting in deep blue and green' },
  { src: '/art-gallery-03.jpg', title: 'Busy Morning', medium: 'Pen & ink', alt: 'Detailed ink drawing of a waterfront mountain village' },
  { src: '/art-gallery-04.jpg', title: 'A Portal: A Chance to Redeem', medium: 'Acrylic on canvas', alt: 'Mixed-media painting with a kangaroo and burned canvas edges' },
  { src: '/art-gallery-06.jpg', title: 'Anthropomorphic', medium: 'Multi-medium sculpture', alt: 'Wearable sculptural figure assembled with flowers, faces, and paper forms' },
  { src: '/art-gallery-07.jpg', title: 'Positive and Negative Space', medium: 'Ink', alt: 'Black-and-white botanical silhouette artwork' },
  { src: '/art-gallery-08.jpg', title: 'City Poster of My Hometown-TsingTao', medium: 'Digital Art', alt: 'Travel the World Tsingtao advertising artwork' },
  { src: '/art-gallery-09.jpg', title: 'The Exquisite Melt', medium: 'Medium', alt: 'Painting of four figures dissolving into a colorful sea' },
]

let topTedxLayer = 20

function ArtGallerySet({ duplicate = false, onSelect }) {
  return (
    <div className="art-gallery-set" aria-hidden={duplicate || undefined}>
      {artGallery.map((artwork, index) => (
        <figure className="art-gallery-item" key={`${artwork.src}-${index}`}>
          <button type="button" tabIndex={duplicate ? -1 : 0} onClick={() => onSelect(artwork)} aria-label={`Enlarge ${artwork.title}`}>
            <img src={artwork.src} alt={duplicate ? '' : artwork.alt} />
          </button>
          <figcaption>
            <strong>{artwork.title}</strong>
            <span>{artwork.medium}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

function ArtGalleryRail({ onSelect }) {
  const railRef = useRef(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return undefined
    let touchY = null
    let resumeTimer = null

    const pauseAutomaticScroll = () => {
      rail.classList.add('is-manual-scrolling')
      window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => rail.classList.remove('is-manual-scrolling'), 800)
    }
    const scrollWithWheel = (event) => {
      event.preventDefault()
      event.stopPropagation()
      pauseAutomaticScroll()
      rail.scrollTop += event.deltaY * .28
    }
    const beginTouchScroll = (event) => {
      touchY = event.touches[0]?.clientY ?? null
      pauseAutomaticScroll()
    }
    const scrollWithTouch = (event) => {
      const nextY = event.touches[0]?.clientY
      if (touchY === null || nextY === undefined) return
      event.preventDefault()
      event.stopPropagation()
      rail.scrollTop += (touchY - nextY) * .42
      touchY = nextY
      pauseAutomaticScroll()
    }
    const endTouchScroll = () => {
      touchY = null
      pauseAutomaticScroll()
    }

    rail.addEventListener('wheel', scrollWithWheel, { passive: false })
    rail.addEventListener('touchstart', beginTouchScroll, { passive: true })
    rail.addEventListener('touchmove', scrollWithTouch, { passive: false })
    rail.addEventListener('touchend', endTouchScroll)
    rail.addEventListener('touchcancel', endTouchScroll)
    return () => {
      window.clearTimeout(resumeTimer)
      rail.removeEventListener('wheel', scrollWithWheel)
      rail.removeEventListener('touchstart', beginTouchScroll)
      rail.removeEventListener('touchmove', scrollWithTouch)
      rail.removeEventListener('touchend', endTouchScroll)
      rail.removeEventListener('touchcancel', endTouchScroll)
    }
  }, [])

  return (
    <aside className="art-gallery-rail" ref={railRef} aria-label="Selected artworks">
      <div className="art-gallery-track">
        <ArtGallerySet onSelect={onSelect} />
        <ArtGallerySet duplicate onSelect={onSelect} />
      </div>
    </aside>
  )
}

function HomeArtGallery() {
  const [activeArtwork, setActiveArtwork] = useState(null)
  const railRef = useRef(null)

  useEffect(() => {
    const rail = railRef.current
    if (!rail) return undefined
    let touchX = null
    let touchY = null
    let resumeTimer = null

    const pauseAutomaticScroll = () => {
      rail.classList.add('is-manual-scrolling')
      window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => rail.classList.remove('is-manual-scrolling'), 800)
    }
    const scrollWithWheel = (event) => {
      event.preventDefault()
      event.stopPropagation()
      pauseAutomaticScroll()
      rail.scrollLeft += (Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY) * .28
    }
    const beginTouchScroll = (event) => {
      touchX = event.touches[0]?.clientX ?? null
      touchY = event.touches[0]?.clientY ?? null
      pauseAutomaticScroll()
    }
    const scrollWithTouch = (event) => {
      const nextX = event.touches[0]?.clientX
      const nextY = event.touches[0]?.clientY
      if (touchX === null || touchY === null || nextX === undefined || nextY === undefined) return
      const deltaX = touchX - nextX
      const deltaY = touchY - nextY
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        event.preventDefault()
        event.stopPropagation()
        rail.scrollLeft += deltaX * .42
      }
      touchX = nextX
      touchY = nextY
      pauseAutomaticScroll()
    }
    const endTouchScroll = () => {
      touchX = null
      touchY = null
      pauseAutomaticScroll()
    }

    rail.addEventListener('wheel', scrollWithWheel, { passive: false })
    rail.addEventListener('touchstart', beginTouchScroll, { passive: true })
    rail.addEventListener('touchmove', scrollWithTouch, { passive: false })
    rail.addEventListener('touchend', endTouchScroll)
    rail.addEventListener('touchcancel', endTouchScroll)
    return () => {
      window.clearTimeout(resumeTimer)
      rail.removeEventListener('wheel', scrollWithWheel)
      rail.removeEventListener('touchstart', beginTouchScroll)
      rail.removeEventListener('touchmove', scrollWithTouch)
      rail.removeEventListener('touchend', endTouchScroll)
      rail.removeEventListener('touchcancel', endTouchScroll)
    }
  }, [])

  useEffect(() => {
    if (!activeArtwork) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActiveArtwork(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [activeArtwork])

  const gallerySet = (duplicate = false) => (
    <div className="home-art-gallery-set" aria-hidden={duplicate || undefined}>
      {artGallery.map((artwork, index) => (
        <button
          type="button"
          tabIndex={duplicate ? -1 : 0}
          key={`${duplicate ? 'duplicate-' : ''}${artwork.src}-${index}`}
          onClick={() => setActiveArtwork(artwork)}
          aria-label={`Enlarge ${artwork.title}`}
        >
          <img src={artwork.src} alt={duplicate ? '' : artwork.alt} />
        </button>
      ))}
    </div>
  )

  return (
    <>
      <div className="home-art-gallery" ref={railRef} aria-label="Scrolling art gallery">
        <div className="home-art-gallery-track">
          {gallerySet()}
          {gallerySet(true)}
        </div>
      </div>
      {activeArtwork && (
        <div className="art-gallery-lightbox" role="dialog" aria-modal="true" aria-label={activeArtwork.title} onClick={() => setActiveArtwork(null)}>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={activeArtwork.src} alt={activeArtwork.alt} />
            <figcaption><strong>{activeArtwork.title}</strong><span>{activeArtwork.medium}</span></figcaption>
            <button type="button" onClick={() => setActiveArtwork(null)} aria-label="Close enlarged artwork">×</button>
          </figure>
        </div>
      )}
    </>
  )
}

function VisualArchive() {
  const [activeArtwork, setActiveArtwork] = useState(null)

  useEffect(() => {
    if (!activeArtwork) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setActiveArtwork(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [activeArtwork])

  return (
    <main className="visual-archive" id="top">
      <header className="visual-archive-heading">
        <p>Visual archive</p>
        <h1>Experiments, images, and things made for joy.</h1>
      </header>
      <div className="visual-grid">
        {visualProjects.map((project) => {
          const href = project.href ?? `/visual/${project.slug}`
          const externalLinkProps = project.href ? { target: '_blank', rel: 'noreferrer' } : {}
          return <article className="visual-card" key={project.slug}>
            <a className="visual-card-image" href={href} aria-label={`View ${project.title}, ${project.role}`} {...externalLinkProps}>
              {project.video ? (
                <video autoPlay loop muted playsInline preload="metadata" aria-label={project.alt}>
                  <source src={project.video} type="video/mp4" />
                </video>
              ) : <img src={project.thumbnail} alt={project.alt} />}
            </a>
            <a className="visual-card-title" href={href} {...externalLinkProps}>
              <h2>{project.title}</h2>
              <p>{project.role}</p>
            </a>
          </article>
        })}
      </div>
      <ArtGalleryRail onSelect={setActiveArtwork} />
      {activeArtwork && (
        <div className="art-gallery-lightbox" role="dialog" aria-modal="true" aria-label={activeArtwork.title} onClick={() => setActiveArtwork(null)}>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={activeArtwork.src} alt={activeArtwork.alt} />
            <figcaption><strong>{activeArtwork.title}</strong><span>{activeArtwork.medium}</span></figcaption>
            <button type="button" onClick={() => setActiveArtwork(null)} aria-label="Close enlarged artwork">×</button>
          </figure>
        </div>
      )}
    </main>
  )
}

function DraggableItem({ children, className = '', initialLayer = 1, label, onDragged, style }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [layer, setLayer] = useState(initialLayer)
  const dragRef = useRef(null)
  const movedRef = useRef(false)
  const suppressClickRef = useRef(false)

  const startDrag = (event) => {
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      originX: offset.x,
      originY: offset.y,
    }
    movedRef.current = false
    topTedxLayer += 1
    setLayer(topTedxLayer)
  }

  const moveDrag = (event) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const x = event.clientX - drag.x
    const y = event.clientY - drag.y
    if (!movedRef.current && Math.hypot(x, y) > 4) {
      movedRef.current = true
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    setOffset({ x: drag.originX + x, y: drag.originY + y })
  }

  const endDrag = (event) => {
    if (dragRef.current?.pointerId !== event.pointerId) return
    const wasMoved = movedRef.current
    suppressClickRef.current = wasMoved
    dragRef.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
    if (wasMoved) onDragged?.()
    window.setTimeout(() => { suppressClickRef.current = false }, 0)
  }

  const preventClickAfterDrag = (event) => {
    if (!suppressClickRef.current) return
    event.preventDefault()
    event.stopPropagation()
    suppressClickRef.current = false
  }

  const moveWithKeyboard = (event) => {
    const step = event.shiftKey ? 24 : 8
    const directions = {
      ArrowLeft: [-step, 0],
      ArrowRight: [step, 0],
      ArrowUp: [0, -step],
      ArrowDown: [0, step],
    }
    if (!directions[event.key]) return
    event.preventDefault()
    const [x, y] = directions[event.key]
    setOffset((current) => ({ x: current.x + x, y: current.y + y }))
    topTedxLayer += 1
    setLayer(topTedxLayer)
    onDragged?.()
  }

  return (
    <div
      className={`tedx-draggable ${className}`}
      style={{ ...style, '--drag-x': `${offset.x}px`, '--drag-y': `${offset.y}px`, zIndex: layer }}
      role="group"
      tabIndex="0"
      aria-label={`${label}. Drag to move, or use arrow keys.`}
      onPointerDown={startDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onKeyDown={moveWithKeyboard}
      onClickCapture={preventClickAfterDrag}
    >
      {children}
    </div>
  )
}

function TedxHandHint({ children, className = '' }) {
  return <span className={`tedx-hand-hint ${className}`} aria-hidden="true"><span>{children}</span><i /></span>
}

function TedxLiquidGlassSurface() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    window.glassControls = {
      edgeIntensity: .034,
      rimIntensity: .14,
      baseIntensity: .018,
      edgeDistance: .11,
      rimDistance: 1.05,
      baseDistance: .08,
      cornerBoost: .045,
      rippleEffect: .035,
      blurRadius: .6,
    }

    const glass = new LiquidGlassContainer({ borderRadius: 34, tintOpacity: 0 })
    glass.warp = true
    glass.element.classList.add('tedx-liquid-glass-canvas')
    glass.element.style.pointerEvents = 'none'
    glass.canvas.style.zIndex = '0'
    host.appendChild(glass.element)

    const draggable = host.closest('.tedx-draggable')
    let refreshFrame = 0
    const refresh = () => {
      window.cancelAnimationFrame(refreshFrame)
      refreshFrame = window.requestAnimationFrame(() => {
        glass.updateSizeFromDOM()
        glass.render?.()
      })
    }
    const movementObserver = new MutationObserver(refresh)
    if (draggable) movementObserver.observe(draggable, { attributes: true, attributeFilter: ['style', 'class'] })
    const sizeObserver = new ResizeObserver(refresh)
    sizeObserver.observe(host)
    refresh()

    return () => {
      window.cancelAnimationFrame(refreshFrame)
      movementObserver.disconnect()
      sizeObserver.disconnect()
      glass.destroy()
      glass.element.remove()
    }
  }, [])

  return <div ref={hostRef} className="tedx-liquid-glass-surface" aria-hidden="true" />
}

function TedxBrochure({ isOpen, setIsOpen, showInside, setShowInside, onDragged, onInteract, showClickHint }) {
  const turnBrochure = () => {
    onInteract?.()
    if (!isOpen) {
      setIsOpen(true)
      return
    }
    setShowInside((inside) => !inside)
  }

  const closeBrochure = (event) => {
    event.stopPropagation()
    setIsOpen(false)
    setShowInside(false)
  }

  return (
    <DraggableItem
      className={`tedx-object tedx-brochure${isOpen ? ' is-open' : ''}${showInside ? ' is-inside' : ''}`}
      initialLayer={4}
      label="Interactive TEDxUofW brochure"
      onDragged={onDragged}
      style={{ '--rotation': '6deg' }}
    >
      <button
        className="tedx-brochure-action"
        type="button"
        onClick={turnBrochure}
        aria-label={!isOpen ? 'Unfold the brochure' : showInside ? 'Flip to the brochure cover' : 'Flip to the inside of the brochure'}
      >
        <span className="tedx-brochure-spread">
          <img className="tedx-brochure-outside" src="/tedx-brochure-outside.svg" alt="TEDxUofW brochure cover and outside panels" draggable="false" />
          <img className="tedx-brochure-inside" src="/tedx-brochure-inside.svg" alt="TEDxUofW brochure inside panels" draggable="false" />
        </span>
      </button>
      {isOpen && <button className="tedx-brochure-close" type="button" onClick={closeBrochure} aria-label="Close and fold the brochure">×</button>}
      {showClickHint && <TedxHandHint className="is-brochure-hint">click me</TedxHandHint>}
    </DraggableItem>
  )
}

function VisualCase({ project }) {
  const [videoPlaying, setVideoPlaying] = useState(false)
  const [pileVersion, setPileVersion] = useState(0)
  const [brochureOpen, setBrochureOpen] = useState(false)
  const [brochureInside, setBrochureInside] = useState(false)
  const [interactionHint, setInteractionHint] = useState('drag')
  const videoRef = useRef(null)

  const toggleVideo = () => {
    setInteractionHint(null)
    const video = videoRef.current
    if (!video) return
    if (video.paused) video.play()
    else video.pause()
  }

  const repile = () => {
    videoRef.current?.pause()
    setVideoPlaying(false)
    setBrochureOpen(false)
    setBrochureInside(false)
    setInteractionHint('drag')
    topTedxLayer = 20
    setPileVersion((version) => version + 1)
  }

  const dismissActiveView = (event) => {
    if (!event.target.closest('.tedx-brochure')) {
      setBrochureOpen(false)
      setBrochureInside(false)
    }
    if (!event.target.closest('.tedx-video-card') && videoPlaying) {
      videoRef.current?.pause()
    }
  }

  return (
    <main className="tedx-playground" id="top" onPointerDown={dismissActiveView}>
      <a className="tedx-back" href="/visual"><span aria-hidden="true">←</span> Visual archive</a>

      <DraggableItem key={`artboard-${pileVersion}`} className="tedx-object tedx-artboard" initialLayer={2} label="TEDxUofW poster" onDragged={() => setInteractionHint(null)} style={{ '--rotation': '4deg' }}>
        <img src="/tedx-artboard.svg" alt="TEDxUofW event artwork" draggable="false" />
      </DraggableItem>

      <DraggableItem key={`bubbly-${pileVersion}`} className="tedx-object tedx-bubbly" initialLayer={5} label="Imprints title artwork" onDragged={() => setInteractionHint(null)} style={{ '--rotation': '-2deg' }}>
        <img src="/tedx-imprint-bubbly.svg" alt="Imprints title in bubbly lettering" draggable="false" />
      </DraggableItem>

      <DraggableItem key={`x-${pileVersion}`} className="tedx-object tedx-x-mark" initialLayer={7} label="TEDx X mark" onDragged={() => setInteractionHint(null)} style={{ '--rotation': '12deg' }}>
        <img src="/tedx-x-logo.svg" alt="Abstract white X" draggable="false" />
        {interactionHint === 'drag' && <TedxHandHint className="is-drag-hint">drag me</TedxHandHint>}
      </DraggableItem>

      <DraggableItem key={`wordmark-${pileVersion}`} className="tedx-object tedx-wordmark" initialLayer={6} label="Imprints wordmark" onDragged={() => setInteractionHint(null)} style={{ '--rotation': '-2deg' }}>
        <img src="/tedx-imprint-black.png" alt="Imprints wordmark" draggable="false" />
      </DraggableItem>

      <DraggableItem key={`role-${pileVersion}`} className="tedx-object tedx-note tedx-role-note" initialLayer={8} label="Role note" onDragged={() => setInteractionHint(null)} style={{ '--rotation': '-5deg' }}>
        <TedxLiquidGlassSurface />
        <span>My role</span>
        <strong>{project.role}</strong>
      </DraggableItem>

      <DraggableItem key={`tools-${pileVersion}`} className="tedx-object tedx-note tedx-tools-note" initialLayer={9} label="Tools note" onDragged={() => setInteractionHint(null)} style={{ '--rotation': '4deg' }}>
        <TedxLiquidGlassSurface />
        <span>Tools used</span>
        <strong>Figma</strong>
        <strong>Adobe Premiere Pro</strong>
      </DraggableItem>

      <TedxBrochure
        key={`brochure-${pileVersion}`}
        isOpen={brochureOpen}
        setIsOpen={setBrochureOpen}
        showInside={brochureInside}
        setShowInside={setBrochureInside}
        onDragged={() => setInteractionHint('brochure')}
        onInteract={() => setInteractionHint(null)}
        showClickHint={interactionHint === 'brochure'}
      />

      <DraggableItem
        key={`video-${pileVersion}`}
        className={`tedx-object tedx-video-card${videoPlaying ? ' is-playing' : ''}`}
        initialLayer={2}
        label="TEDxUofW promotion video"
        onDragged={() => setInteractionHint('video')}
        style={{ '--rotation': '-2deg' }}
      >
        <video
          ref={videoRef}
          playsInline
          preload="metadata"
          poster={project.thumbnail}
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
          onEnded={() => setVideoPlaying(false)}
        >
          <source src="/tedx-promo.m4v" type="video/mp4" />
        </video>
        <button className="tedx-video-toggle" type="button" onClick={toggleVideo} aria-label={videoPlaying ? 'Pause promotion video' : 'Play promotion video'}>
          <span aria-hidden="true">{videoPlaying ? 'Ⅱ' : '▶'}</span>
        </button>
        {interactionHint === 'video' && <TedxHandHint className="is-video-hint">click me</TedxHandHint>}
      </DraggableItem>

      <button className="tedx-repile" type="button" onClick={repile}>Re-pile</button>
      <a className="tedx-site-link" href="https://imprints.tedxatuofw.com/" target="_blank" rel="noreferrer">
        Visit Imprints <Arrow diagonal />
      </a>
    </main>
  )
}

function PagePlaceholder({ page }) {
  const details = pageDetails[page]
  return (
    <main className="secondary-page">
      <p>{details.eyebrow}</p>
      <h1>{details.title}</h1>
      <div>
        <p>{details.description}</p>
        <a className="text-link" href="/">Return to work <Arrow /></a>
      </div>
    </main>
  )
}

// Replace these placeholders with book titles and authors when the list is ready.
const aboutBooks = {
  current: [
    { title: 'UX Skills for Business Strategy', author: 'Torrey Podmajersky, 2 more' },
  ],
  read: [
    { title: "Don't Make Me Think", author: 'Steve Krug' },
    { title: 'L\'Etranger', author: 'Albert Camus' },
    {title: 'Educated', author: 'Tara Westover' },
    {title: '我与地坛', author: '史铁生' },
  ],
}

function AboutBookList({ books }) {
  return (
    <ul>
      {books.map((book, index) => (
        <li key={`${book.title}-${index}`}><span>{book.title}</span><small>{book.author}</small></li>
      ))}
    </ul>
  )
}

function AboutPage() {
  return (
    <main className="about-page" id="top">
      <section className="about-intro">
        <p className="about-eyebrow">About</p>
        <div className="about-story">
          <h1>A little more<br />about Vivian.</h1>
          <div className="about-photo-stack" aria-label="Snapshots of Vivian, Dolly, and two geckos">
            <img className="about-photo about-photo-vivian" src="/about-vivian.jpg" alt="Vivian standing beside a large sunlit window" />
            <img className="about-photo about-photo-geckos" src="/about-geckos.jpg" alt="Vivian’s two geckos resting together" />
            <img className="about-photo about-photo-dolly" src="/about-dolly.jpg" alt="Dolly the cat sitting in a wall alcove" />
          </div>
          <p className="about-lede">I’m a passionate UX designer based in Seattle. I’ve come to realize there are only three things that pull me completely into a flow state: <em>designing</em>, <em>calligraphy</em>, and <em>Animal Crossing</em>. At home, I share my space with my cat, Dolly, and two geckos.</p>
          <p className="about-email">Email: <a href="mailto:vivian.zifu.lu@gmail.com">vivian.zifu.lu@gmail.com</a></p>
        </div>
      </section>

      <section className="about-shelf" aria-labelledby="about-shelf-heading">
        <div className="about-section-heading">
          <p>On my shelf</p>
          <h2 id="about-shelf-heading">Books I’m spending time with.</h2>
        </div>
        <div className="about-book-columns">
          <article>
            <h3>Currently reading</h3>
            <AboutBookList books={aboutBooks.current} />
          </article>
          <article>
            <h3>Favorite books</h3>
            <AboutBookList books={aboutBooks.read} />
          </article>
        </div>
      </section>

      <section className="about-now" aria-label="Currently enjoying">
        <article><span>Currently playing</span><h2>Animal Crossing</h2></article>
        <article><span>Currently watching</span><h2>Suits</h2></article>
      </section>
    </main>
  )
}

const somaGestures = [
  { id: 'fist', gesture: '✊', hand: 'Closed Fist', output: 'Rest · no mark' },
  { id: 'palm', gesture: '🖐️', hand: 'Open Palm', output: 'Grow a magnetic circle' },
  { id: 'point', gesture: '☝️', hand: 'Pointing Up', output: 'Liquid circles · nodes · ribbons' },
  { id: 'victory', gesture: '✌️', hand: 'Victory', output: 'Weave a twin-finger ribbon' },
  { id: 'love', gesture: '🤟', hand: 'I Love You', output: 'Place an orbital constellation' },
]

function drawSomaOrb(ctx, orb) {
  ctx.save()
  ctx.fillStyle = orb.fill
  ctx.beginPath()
  ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2)
  ctx.fill()
  ctx.globalAlpha = .66
  ctx.strokeStyle = orb.edge
  ctx.lineWidth = Math.max(2, orb.radius * .03)
  ctx.stroke()
  ctx.restore()
}

function drawSomaMembrane(ctx, from, to) {
  const dx = to.x - from.x
  const dy = to.y - from.y
  const distance = Math.hypot(dx, dy) || 1
  const nx = -dy / distance
  const ny = dx / distance
  const startWidth = from.radius * .44
  const endWidth = to.radius * .44
  const gradient = ctx.createLinearGradient(from.x, from.y, to.x, to.y)
  gradient.addColorStop(0, from.fill)
  gradient.addColorStop(1, to.fill)
  ctx.save()
  ctx.globalAlpha = .88
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.moveTo(from.x + nx * startWidth, from.y + ny * startWidth)
  ctx.bezierCurveTo(
    from.x + dx * .42 + nx * startWidth * .7,
    from.y + dy * .42 + ny * startWidth * .7,
    to.x - dx * .42 + nx * endWidth * .7,
    to.y - dy * .42 + ny * endWidth * .7,
    to.x + nx * endWidth,
    to.y + ny * endWidth,
  )
  ctx.lineTo(to.x - nx * endWidth, to.y - ny * endWidth)
  ctx.bezierCurveTo(
    to.x - dx * .42 - nx * endWidth * .7,
    to.y - dy * .42 - ny * endWidth * .7,
    from.x + dx * .42 - nx * startWidth * .7,
    from.y + dy * .42 - ny * startWidth * .7,
    from.x - nx * startWidth,
    from.y - ny * startWidth,
  )
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawSomaConstellation(ctx, nodes, colors) {
  const center = {
    x: nodes.reduce((sum, node) => sum + node.x, 0) / nodes.length,
    y: nodes.reduce((sum, node) => sum + node.y, 0) / nodes.length,
  }
  ctx.save()
  ctx.globalAlpha = .5
  ctx.strokeStyle = colors.deep
  ctx.lineWidth = 1.4
  ctx.beginPath()
  ctx.moveTo(nodes[0].x, nodes[0].y)
  nodes.slice(1).forEach((node, index) => {
    const previous = nodes[index]
    ctx.quadraticCurveTo(
      (previous.x + node.x + center.x) / 3,
      (previous.y + node.y + center.y) / 3,
      node.x,
      node.y,
    )
  })
  ctx.quadraticCurveTo(
    (nodes[2].x + nodes[0].x + center.x) / 3,
    (nodes[2].y + nodes[0].y + center.y) / 3,
    nodes[0].x,
    nodes[0].y,
  )
  ctx.stroke()
  ctx.globalAlpha = .28
  ctx.strokeStyle = colors.mid
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(center.x, center.y, Math.max(25, Math.hypot(nodes[0].x - center.x, nodes[0].y - center.y) * .72), -.9, 3.75)
  ctx.stroke()
  nodes.forEach((node, index) => {
    ctx.globalAlpha = .32
    ctx.shadowColor = index === 1 ? colors.accent : colors.pale
    ctx.shadowBlur = 18
    ctx.fillStyle = index === 1 ? colors.accent : colors.pale
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
    ctx.fill()
    ctx.shadowBlur = 0
    ctx.globalAlpha = .72
    ctx.strokeStyle = colors.deep
    ctx.lineWidth = 1.4
    ctx.stroke()
  })
  ctx.restore()
}

function drawSomaRibbon(ctx, w, h) {
  const top = [
    [w * .12, h * .68], [w * .28, h * .48], [w * .45, h * .54], [w * .61, h * .30], [w * .84, h * .37],
  ]
  const bottom = top.map(([x, y], index) => [x, y + h * (.14 + Math.sin(index * 1.7) * .025)])
  const gradient = ctx.createLinearGradient(w * .12, h * .7, w * .84, h * .32)
  gradient.addColorStop(0, '#8a5bc2')
  gradient.addColorStop(.34, '#d76fab')
  gradient.addColorStop(.7, '#f48aa1')
  gradient.addColorStop(1, '#ffd0cf')
  ctx.save()
  ctx.globalAlpha = .9
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.moveTo(top[0][0], top[0][1])
  for (let index = 1; index < top.length; index += 1) {
    const previous = top[index - 1]
    const point = top[index]
    ctx.quadraticCurveTo((previous[0] + point[0]) / 2, previous[1], point[0], point[1])
  }
  for (let index = bottom.length - 1; index >= 0; index -= 1) {
    const point = bottom[index]
    const next = bottom[Math.max(0, index - 1)]
    ctx.quadraticCurveTo((point[0] + next[0]) / 2, point[1], next[0], next[1])
  }
  ctx.closePath()
  ctx.fill()

  for (let fiber = 0; fiber < 7; fiber += 1) {
    const amount = (fiber + .5) / 7
    ctx.globalAlpha = fiber % 3 === 0 ? .82 : .5
    ctx.strokeStyle = fiber % 2 === 0 ? '#ffd5e5' : '#f6b3d2'
    ctx.lineWidth = fiber % 3 === 0 ? 1.7 : .9
    ctx.lineCap = 'round'
    ctx.beginPath()
    top.forEach((point, index) => {
      const target = bottom[index]
      const x = point[0] + (target[0] - point[0]) * amount
      const y = point[1] + (target[1] - point[1]) * amount + Math.sin(index * 1.9 + fiber) * 4
      if (index === 0) ctx.moveTo(x, y)
      else ctx.quadraticCurveTo((x + top[index - 1][0]) / 2, y, x, y)
    })
    ctx.stroke()
  }
  ctx.restore()
}

function drawSomaGesturePreview(canvas, gestureId) {
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const width = Math.max(1, rect.width)
  const height = Math.max(1, rect.height)
  canvas.width = Math.round(width * dpr)
  canvas.height = Math.round(height * dpr)
  const ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

  const background = ctx.createRadialGradient(width * .18, height * .12, 0, width * .18, height * .12, width)
  background.addColorStop(0, '#ffffff')
  background.addColorStop(.58, '#f7f6f2')
  background.addColorStop(1, '#ecebe5')
  ctx.fillStyle = background
  ctx.fillRect(0, 0, width, height)

  if (gestureId === 'palm') {
    const large = { x: width * .59, y: height * .49, radius: Math.min(width, height) * .22, fill: '#ef6f7d', edge: '#a8445d' }
    const small = { x: width * .29, y: height * .68, radius: Math.min(width, height) * .12, fill: '#ffd166', edge: '#bc8d31' }
    drawSomaMembrane(ctx, small, large)
    drawSomaOrb(ctx, small)
    drawSomaOrb(ctx, large)
  } else if (gestureId === 'point') {
    const source = { x: width * .28, y: height * .61, radius: Math.min(width, height) * .15, fill: '#78a58e', edge: '#365c4a' }
    const bud = { x: width * .59, y: height * .38, radius: Math.min(width, height) * .10, fill: '#78a58e', edge: '#365c4a' }
    drawSomaMembrane(ctx, source, bud)
    drawSomaOrb(ctx, source)
    drawSomaOrb(ctx, bud)
    drawSomaConstellation(ctx, [
      { x: width * .73, y: height * .62, radius: 10 },
      { x: width * .84, y: height * .52, radius: 7 },
      { x: width * .88, y: height * .73, radius: 9 },
    ], { deep: '#8d5a65', mid: '#d9879b', accent: '#efb2bd', pale: '#f6c9d1' })
    ctx.save()
    ctx.globalAlpha = .48
    ctx.strokeStyle = '#ef8c61'
    ctx.lineWidth = Math.max(5, width * .012)
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(width * .12, height * .28)
    ctx.bezierCurveTo(width * .34, height * .14, width * .52, height * .30, width * .72, height * .18)
    ctx.stroke()
    ctx.restore()
  } else if (gestureId === 'victory') {
    drawSomaRibbon(ctx, width, height)
  } else if (gestureId === 'love') {
    const colors = { deep: '#9f466d', mid: '#e875a7', accent: '#ff9fbd', pale: '#fbcfe1' }
    const first = [
      { x: width * .24, y: height * .59, radius: Math.min(width, height) * .045 },
      { x: width * .38, y: height * .35, radius: Math.min(width, height) * .034 },
      { x: width * .46, y: height * .67, radius: Math.min(width, height) * .04 },
    ]
    const second = [
      { x: width * .61, y: height * .42, radius: Math.min(width, height) * .038 },
      { x: width * .77, y: height * .29, radius: Math.min(width, height) * .03 },
      { x: width * .82, y: height * .60, radius: Math.min(width, height) * .043 },
    ]
    ctx.save()
    ctx.globalAlpha = .2
    ctx.strokeStyle = colors.mid
    ctx.lineWidth = Math.max(6, width * .018)
    ctx.lineCap = 'round'
    ctx.beginPath()
    ctx.moveTo(first[2].x, first[2].y)
    ctx.quadraticCurveTo(width * .55, height * .72, second[0].x, second[0].y)
    ctx.stroke()
    ctx.globalAlpha = .78
    ctx.strokeStyle = colors.accent
    ctx.lineWidth = 1.8
    ctx.stroke()
    ctx.restore()
    drawSomaConstellation(ctx, first, colors)
    drawSomaConstellation(ctx, second, colors)
  } else {
    ctx.save()
    ctx.translate(width * .5, height * .5)
    ctx.strokeStyle = 'rgba(102, 105, 99, .15)'
    ctx.lineWidth = 1
    ;[34, 55, 78].forEach((radius) => {
      ctx.beginPath()
      ctx.arc(0, 0, radius, 0, Math.PI * 2)
      ctx.stroke()
    })
    ctx.fillStyle = 'rgba(86, 89, 84, .58)'
    ctx.font = '500 11px DM Sans, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText('REST · NO MARK', 0, 4)
    ctx.restore()
  }

  const cursorX = gestureId === 'fist' ? width * .5 : gestureId === 'victory' ? width * .82 : width * .69
  const cursorY = gestureId === 'fist' ? height * .5 : gestureId === 'love' ? height * .38 : height * .31
  ctx.save()
  ctx.fillStyle = '#3b574b'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 5
  ctx.shadowColor = 'rgba(59, 87, 75, .22)'
  ctx.shadowBlur = 14
  ctx.beginPath()
  ctx.arc(cursorX, cursorY, 8, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()
  ctx.restore()
}

function SomaGestureMap() {
  const [activeGestureIndex, setActiveGestureIndex] = useState(1)
  const canvasRef = useRef(null)
  const activeGesture = somaGestures[activeGestureIndex]

  useEffect(() => {
    const canvas = canvasRef.current
    const redraw = () => drawSomaGesturePreview(canvas, activeGesture.id)
    redraw()
    const observer = new ResizeObserver(redraw)
    if (canvas) observer.observe(canvas)
    return () => observer.disconnect()
  }, [activeGesture.id])

  return (
    <div className="soma-gesture-map">
      <div className="soma-preview-surface">
        <canvas ref={canvasRef} aria-label={`${activeGesture.hand}: ${activeGesture.output}`} />
        <div className="soma-output-capsule" aria-live="polite">{activeGesture.output}</div>
      </div>
      <div className="soma-gesture-controls" role="group" aria-label="Preview each SomaCanvas gesture">
        {somaGestures.map((item, index) => (
          <button
            className={activeGestureIndex === index ? 'active' : ''}
            type="button"
            aria-pressed={activeGestureIndex === index}
            onClick={() => setActiveGestureIndex(index)}
            onFocus={() => setActiveGestureIndex(index)}
            onMouseEnter={() => setActiveGestureIndex(index)}
            key={item.id}
          >
            <span aria-hidden="true">{item.gesture}</span>
            <b>{item.hand}</b>
          </button>
        ))}
      </div>
    </div>
  )
}

const somaPaletteModes = [
  {
    id: 'mood',
    label: 'Mood-led',
    src: '/somacanvas-mood-wheel.m4v',
    ariaLabel: 'SomaCanvas mood wheel setting the initial color palette',
  },
  {
    id: 'fine-tune',
    label: 'Fine-tune',
    src: '/somacanvas-fine-tune.m4v',
    ariaLabel: 'SomaCanvas hidden settings color wheel fine-tuning the drawing palette',
  },
]

function SomaPaletteVideo() {
  const [activeModeId, setActiveModeId] = useState('mood')
  const activeMode = somaPaletteModes.find((mode) => mode.id === activeModeId)

  return (
    <div className="soma-palette-video">
      <div className="soma-palette-steps" aria-label="Color palette progression">
        <span><b>01</b> Random first</span>
        <i aria-hidden="true">→</i>
        {somaPaletteModes.map((mode, index) => (
          <div className="soma-palette-step" key={mode.id}>
            <button
              className={activeModeId === mode.id ? 'active' : ''}
              type="button"
              aria-pressed={activeModeId === mode.id}
              aria-controls="soma-palette-demo"
              onClick={() => setActiveModeId(mode.id)}
            >
              <b>0{index + 2}</b> {mode.label}
            </button>
            {index === 0 && <i aria-hidden="true">→</i>}
          </div>
        ))}
      </div>
      <video id="soma-palette-demo" key={activeMode.src} autoPlay loop muted playsInline controls preload="metadata" aria-label={activeMode.ariaLabel}>
        <source src={activeMode.src} type="video/mp4" />
      </video>
    </div>
  )
}

const somaSurveyResults = [
  { label: 'Confident creating digital art', pre: 2.43, post: 3.29, change: 0.86 },
  { label: 'Enjoy creating visual art', pre: 3.14, post: 3.71, change: 0.57 },
  { label: 'Comfortable with creative tools', pre: 3, post: 3.57, change: 0.57 },
  { label: 'Feel limited by artistic ability', pre: 3.29, post: 2.86, change: -0.43 },
]

function SomaEvaluationChart() {
  const chartRef = useRef(null)
  const [animationRun, setAnimationRun] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const chart = chartRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion || !('IntersectionObserver' in window)) {
      const frame = requestAnimationFrame(() => setAnimationRun(1))
      return () => cancelAnimationFrame(frame)
    }

    let wasVisible = false
    const observer = new IntersectionObserver(([entry]) => {
      const isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.15
      if (isVisible && !wasVisible) {
        wasVisible = true
        setProgress(0)
        setAnimationRun((run) => run + 1)
        return
      }
      if (!isVisible) wasVisible = false
    }, { threshold: [0, 0.15] })

    if (chart) observer.observe(chart)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!animationRun) return undefined
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      const reducedMotionFrame = requestAnimationFrame(() => setProgress(1))
      return () => cancelAnimationFrame(reducedMotionFrame)
    }

    let frame
    let startTime
    const duration = 1250
    const animate = (time) => {
      if (!startTime) startTime = time
      const elapsed = Math.min((time - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - elapsed, 3)
      setProgress(eased)
      if (elapsed < 1) frame = requestAnimationFrame(animate)
    }

    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [animationRun])

  const animatedValue = (value, itemProgress) => (value * itemProgress).toFixed(2)
  const animatedChange = (value, itemProgress) => {
    const prefix = value >= 0 ? '+' : '\u2212'
    return `${prefix}${Math.abs(value * itemProgress).toFixed(2)}`
  }

  return (
    <div className="soma-survey-chart" ref={chartRef} role="group" aria-labelledby="soma-survey-title">
      <div className="soma-survey-heading">
        <div>
          <h3 id="soma-survey-title">Pre vs. post-test</h3>
          <p>Average score · 1–5 Likert scale</p>
        </div>
        <div className="soma-survey-legend" aria-hidden="true">
          <span><i className="pre" />Pre-test</span>
          <span><i className="post" />Post-test</span>
        </div>
      </div>
      <div className="soma-survey-plot" aria-hidden="true">
        <div className="soma-survey-axis">
          {[5, 4, 3, 2, 1, 0].map((tick) => <span key={tick}>{tick}</span>)}
        </div>
        <div className="soma-survey-graph">
          {[0, 1, 2, 3, 4, 5].map((tick) => <i className="soma-survey-gridline" style={{ bottom: `${tick * 20}%` }} key={tick} />)}
          <div className="soma-survey-groups">
            {somaSurveyResults.map((item, index) => {
              const itemProgress = Math.max(0, Math.min(1, (progress * 1.16) - (index * 0.05)))
              const peak = Math.max(item.pre, item.post)
              return (
                <div className="soma-survey-group" key={item.label}>
                  <span
                    className={`soma-survey-change${item.change < 0 ? ' negative' : ''}`}
                    style={{ bottom: `calc(${(peak / 5) * 100 * itemProgress}% + 34px)` }}
                  >
                    {animatedChange(item.change, itemProgress)}
                  </span>
                  <div className="soma-survey-bar-pair">
                    <div className="soma-survey-bar-wrap" style={{ height: `${(item.pre / 5) * 100 * itemProgress}%` }}>
                      <strong>{animatedValue(item.pre, itemProgress)}</strong>
                      <i className="soma-survey-bar pre" />
                    </div>
                    <div className="soma-survey-bar-wrap" style={{ height: `${(item.post / 5) * 100 * itemProgress}%` }}>
                      <strong>{animatedValue(item.post, itemProgress)}</strong>
                      <i className="soma-survey-bar post" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="soma-survey-labels" aria-hidden="true">
        {somaSurveyResults.map((item) => <span key={item.label}>{item.label}</span>)}
      </div>
      <table className="sr-only">
        <caption>Pre- and post-test survey results from seven participants</caption>
        <thead><tr><th>Measure</th><th>Pre-test</th><th>Post-test</th><th>Change</th></tr></thead>
        <tbody>
          {somaSurveyResults.map((item) => (
            <tr key={item.label}><th>{item.label}</th><td>{item.pre.toFixed(2)}</td><td>{item.post.toFixed(2)}</td><td>{item.change > 0 ? '+' : ''}{item.change.toFixed(2)}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const costcoVocabularyBefore = [
  { label: 'TVs', target: 'tv' },
  { label: 'iPad & Tablets', target: 'tablets' },
  { label: 'Audio / Video', target: 'audio' },
  { label: 'Headphones & Earbuds', target: 'audio' },
  { label: 'Laptops & Desktops', target: 'computers' },
  { label: 'Smart Watches', target: 'watches' },
  { label: 'Video Games & Consoles', target: 'games' },
  { label: 'Action Cameras & Drones', target: 'cameras' },
  { label: 'Cell Phones & Accessories', target: 'phones' },
  { label: 'Smart Home', target: 'smart-home' },
  { label: 'Home Security & Cameras', target: 'smart-home' },
  { label: 'Routers, Wi-Fi & Modems', target: 'wifi' },
  { label: 'Monitors', target: 'computers' },
  { label: 'Musical Instruments', target: 'audio' },
  { label: 'Batteries', target: 'batteries' },
  { label: 'Landline Phones', target: 'phones' },
  { label: 'Hard Drives & Data Storage', target: 'storage' },
]

const costcoVocabularyAfter = [
  { id: 'tv', label: 'TVs & Home Theatre' },
  { id: 'computers', label: 'Computers & Monitors' },
  { id: 'tablets', label: 'iPad & Tablets' },
  { id: 'smart-home', label: 'Smart Home & Security' },
  { id: 'phones', label: 'Phones & Accessories' },
  { id: 'watches', label: 'Smart Watches' },
  { id: 'games', label: 'Video Games & Consoles' },
  { id: 'cameras', label: 'Action Cameras & Drones' },
  { id: 'audio', label: 'Audio & Instruments' },
  { id: 'wifi', label: 'Wi-Fi & Networking' },
  { id: 'storage', label: 'Data Storage' },
  { id: 'batteries', label: 'Batteries' },
]

function CostcoVocabulary() {
  const [activeVocabulary, setActiveVocabulary] = useState({ target: 'computers', source: null })
  const activeAfter = costcoVocabularyAfter.find((item) => item.id === activeVocabulary.target)
  const relatedBefore = costcoVocabularyBefore.filter((item) => item.target === activeVocabulary.target)
  const sourceSummary = activeVocabulary.source || relatedBefore.map((item) => item.label).join(' + ')

  return (
    <div
      className="costco-vocabulary"
      role="group"
      aria-label="Controlled vocabulary reduced seventeen overlapping electronics category labels to twelve canonical labels"
    >
      <div className="costco-vocabulary-heading">
        <span>Controlled vocabulary</span>
        <small>Hover a label to trace the change</small>
      </div>
      <div className="costco-vocabulary-lists">
        <div className="costco-vocabulary-panel is-before">
          <div className="costco-vocabulary-count"><strong>17</strong><span>Before</span></div>
          <div className="costco-vocabulary-list">
            {costcoVocabularyBefore.map((item) => {
              const isRelated = item.target === activeVocabulary.target
              const isDirect = item.label === activeVocabulary.source
              return (
                <button
                  className={`${isRelated ? 'is-related' : ''}${isDirect ? ' is-direct' : ''}`}
                  type="button"
                  aria-pressed={isRelated}
                  onMouseEnter={() => setActiveVocabulary({ target: item.target, source: item.label })}
                  onFocus={() => setActiveVocabulary({ target: item.target, source: item.label })}
                  key={item.label}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
        <div className="costco-vocabulary-arrow" aria-hidden="true"><span>→</span></div>
        <div className="costco-vocabulary-panel is-after">
          <div className="costco-vocabulary-count"><strong>12</strong><span>After</span></div>
          <div className="costco-vocabulary-list">
            {costcoVocabularyAfter.map((item) => {
              const isRelated = item.id === activeVocabulary.target
              return (
                <button
                  className={isRelated ? 'is-related' : ''}
                  type="button"
                  aria-pressed={isRelated}
                  onMouseEnter={() => setActiveVocabulary({ target: item.id, source: null })}
                  onFocus={() => setActiveVocabulary({ target: item.id, source: null })}
                  key={item.id}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>
      </div>
      <div className="costco-vocabulary-status" aria-live="polite">
        <span>{sourceSummary}</span><b aria-hidden="true">→</b><strong>{activeAfter.label}</strong>
      </div>
    </div>
  )
}

function CostcoProductCompare({
  variant = 'product',
  beforeSrc = '/costco-product-before.svg',
  afterSrc = '/costco-product-after.svg',
  beforeAlt = 'Original Costco product card',
  afterAlt = 'Redesigned Costco product card',
  beforeCaption = 'Original hierarchy',
  afterCaption = 'Redesigned hierarchy',
  controlLabel = 'Reveal redesigned product card',
}) {
  const [position, setPosition] = useState(50)
  const updatePosition = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    const nextPosition = ((event.clientX - bounds.left) / bounds.width) * 100
    setPosition(Math.round(Math.min(100, Math.max(0, nextPosition))))
  }

  const beginDrag = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId)
    updatePosition(event)
  }

  const continueDrag = (event) => {
    if (event.buttons === 1 || event.currentTarget.hasPointerCapture(event.pointerId)) updatePosition(event)
  }

  return (
    <div className={`costco-product-compare is-${variant}`}>
      <div className="costco-product-compare-labels" aria-hidden="true">
        <span><b>Before</b> {beforeCaption}</span>
        <span><b>After</b> {afterCaption}</span>
      </div>
      <div
        className="costco-product-compare-frame"
        style={{ '--compare-position': `${position}%` }}
        onPointerDown={beginDrag}
        onPointerMove={continueDrag}
      >
        <img src={beforeSrc} alt={beforeAlt} />
        <div className="costco-product-compare-after">
          <img src={afterSrc} alt={afterAlt} />
        </div>
        <div className="costco-product-compare-divider" aria-hidden="true">
          <span>↔</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          aria-label={controlLabel}
          aria-valuetext={`${100 - position}% of redesigned card visible`}
          onChange={(event) => setPosition(Number(event.currentTarget.value))}
          onInput={(event) => setPosition(Number(event.currentTarget.value))}
        />
      </div>
      <p>Drag to compare</p>
    </div>
  )
}

function CostcoSearchCompare() {
  return (
    <CostcoProductCompare
      variant="search"
      beforeSrc="/costco-search-before.png"
      afterSrc="/costco-search-after.svg"
      beforeAlt="Original Costco mixed search suggestions"
      afterAlt="Redesigned Costco grouped search suggestions"
      beforeCaption="Mixed results"
      afterCaption="Grouped results"
      controlLabel="Reveal redesigned search suggestions"
    />
  )
}

function CostcoOutcomeFlow({ compact = false }) {
  const [activeStage, setActiveStage] = useState('category')
  const [searchValue, setSearchValue] = useState('')
  const [searchMessage, setSearchMessage] = useState('')
  const searchInputRef = useRef(null)
  const stages = [
    { id: 'category', number: '01', title: 'Browse' },
    { id: 'product', number: '02', title: 'Product' },
    { id: 'search', number: '03', title: 'Search' },
  ]
  const activeStageIndex = stages.findIndex((stage) => stage.id === activeStage)

  useEffect(() => {
    if (activeStage === 'product') {
      window.setTimeout(() => searchInputRef.current?.focus(), 280)
    }
  }, [activeStage])

  const showProduct = () => {
    setActiveStage('product')
    setSearchMessage('')
  }

  const submitSearch = (event) => {
    event.preventDefault()
    if (searchValue.trim().toLowerCase() === 'lens') {
      setActiveStage('search')
      setSearchMessage('')
      return
    }
    setSearchMessage('Try searching “lens” to continue the prototype.')
  }

  const resetPrototype = () => {
    setActiveStage('category')
    setSearchValue('')
    setSearchMessage('')
  }

  return (
    <div className={`costco-prototype stage-${activeStage}${compact ? ' is-compact' : ''}`} aria-label="Interactive Costco redesign prototype">
      <div className="costco-prototype-heading">
        <div>
          <span>Interactive prototype</span>
          <small>Follow the prompts to try the redesigned shopping flow.</small>
        </div>
        <button type="button" onClick={resetPrototype}>Restart</button>
      </div>

      <ol className="costco-prototype-progress" aria-label="Prototype progress">
        {stages.map((stage, index) => (
          <li className={index === activeStageIndex ? 'active' : index < activeStageIndex ? 'complete' : ''} key={stage.id}>
            <span>{stage.number}</span>
            <b>{stage.title}</b>
          </li>
        ))}
      </ol>

      <div className="costco-prototype-browser">
        <div className="costco-prototype-browser-bar" aria-hidden="true">
          <i /><i /><i />
          <span>costco.com/electronics</span>
        </div>

        <div className={`costco-prototype-screen is-${activeStage}`} key={activeStage}>
          {activeStage === 'category' && (
            <div className="costco-prototype-category">
              <img src="/costco-flow-category.svg" alt="Redesigned Costco electronics categories page" />
              <svg className="costco-prototype-hotspot-layer" viewBox="0 0 1728 1117" preserveAspectRatio="xMidYMid meet">
                <foreignObject x="370" y="570" width="250" height="220">
                  <button className="costco-smart-watch-hotspot" type="button" onClick={showProduct} aria-label="Open Smart Watches">
                    <span>Click Smart Watches</span>
                  </button>
                </foreignObject>
              </svg>
            </div>
          )}

          {activeStage !== 'category' && (
            <div className="costco-prototype-shop">
              <header className="costco-prototype-shop-header">
                <button className="costco-prototype-logo" type="button" onClick={resetPrototype} aria-label="Return to Electronics categories">
                  COSTCO<small>WHOLESALE</small>
                </button>
                <form className="costco-prototype-search" onSubmit={submitSearch}>
                  <label className="sr-only" htmlFor="costco-prototype-search-input">Search Costco products</label>
                  <input
                    id="costco-prototype-search-input"
                    ref={searchInputRef}
                    type="search"
                    value={searchValue}
                    placeholder="Search products"
                    onChange={(event) => {
                      setSearchValue(event.currentTarget.value)
                      setSearchMessage('')
                    }}
                  />
                  <button type="submit" aria-label="Submit search">⌕</button>
                </form>
                <span className="costco-prototype-account">Sign In / Register</span>
              </header>

              <nav className="costco-prototype-shop-nav" aria-label="Prototype store navigation">
                <span>Shop</span><span>Deals</span><span>Electronics</span><span>Membership</span>
              </nav>

              {activeStage === 'product' && (
                <div className="costco-prototype-product-view">
                  <div className="costco-prototype-product-copy">
                    <small>Electronics / Smart Watches</small>
                    <h3>Smart Watches</h3>
                    <div className="costco-prototype-instruction" role="note" aria-label="Next prototype step">
                      <span>Next step</span>
                      <p>Type <b>lens</b> in the search bar, then press Enter or select the search icon.</p>
                    </div>
                    <span className="costco-prototype-search-message" aria-live="polite">{searchMessage}</span>
                  </div>
                  <div className="costco-prototype-product-card">
                    <img src="/costco-flow-product.svg" alt="Redesigned Costco Samsung Galaxy Watch product card" />
                  </div>
                </div>
              )}

              {activeStage === 'search' && (
                <div className="costco-prototype-search-view">
                  <div className="costco-prototype-search-caption costco-prototype-result-note" role="note" aria-label="Search result takeaway">
                    <small>Search response</small>
                    <h3>Grouped results make “lens” easier to scan.</h3>
                  </div>
                  <img src="/costco-flow-detail.svg" alt="Redesigned Costco search suggestions grouped by related terms, electronics, and glasses" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const costcoImpactMetrics = [
  {
    label: 'Task completion',
    before: 60,
    after: 90,
    max: 100,
    beforeDisplay: '60%',
    afterDisplay: '90%',
    delta: '+30 pts',
    direction: 'Higher is better',
    detail: 'Ask participants to find Smart Watches and complete the product-selection path without assistance.',
  },
  {
    label: 'Median task time',
    before: 24,
    after: 13,
    max: 30,
    beforeDisplay: '24 sec',
    afterDisplay: '13 sec',
    delta: '46% faster',
    direction: 'Lower is better',
    detail: 'Time the same find-and-compare task in the original experience and the redesigned prototype.',
  },
  {
    label: 'Selection errors',
    before: 1.8,
    after: 0.6,
    max: 2.2,
    beforeDisplay: '1.8',
    afterDisplay: '0.6',
    delta: '67% fewer',
    direction: 'Lower is better',
    detail: 'Count wrong category choices, misclicks, and incorrect search-result selections per task.',
  },
  {
    label: 'Information recall',
    before: 52,
    after: 84,
    max: 100,
    beforeDisplay: '52%',
    afterDisplay: '84%',
    delta: '+32 pts',
    direction: 'Higher is better',
    detail: 'After a five-second card view, ask participants to recall the price, savings, product name, and membership requirement.',
  },
  {
    label: 'Ease rating',
    before: 4.1,
    after: 6,
    max: 7,
    beforeDisplay: '4.1 / 7',
    afterDisplay: '6.0 / 7',
    delta: '+1.9',
    direction: 'Higher is better',
    detail: 'Collect a single ease question after each task using a seven-point response scale.',
  },
  {
    label: 'Design preference',
    before: 20,
    after: 80,
    max: 100,
    beforeDisplay: '20%',
    afterDisplay: '80%',
    delta: '8 in 10',
    direction: 'Redesign preferred',
    detail: 'After completing both versions, ask participants which design they would choose for the same shopping task.',
  },
]

function CostcoImpactChart() {
  const [activeMetricIndex, setActiveMetricIndex] = useState(0)
  const activeMetric = costcoImpactMetrics[activeMetricIndex]

  return (
    <div className="costco-impact-chart">
      <header className="costco-impact-heading">
        <div>
          <span>Usability validation targets</span>
          <h3>What success could look like</h3>
        </div>
        <div className="costco-impact-legend" aria-label="Chart legend">
          <span><i className="is-baseline" />Estimated original</span>
          <span><i className="is-target" />Redesign target</span>
        </div>
      </header>

      <div className="costco-impact-list" role="list" aria-label="Proposed usability metrics">
        {costcoImpactMetrics.map((metric, index) => (
          <button
            className={activeMetricIndex === index ? 'active' : ''}
            type="button"
            aria-pressed={activeMetricIndex === index}
            onClick={() => setActiveMetricIndex(index)}
            onFocus={() => setActiveMetricIndex(index)}
            onMouseEnter={() => setActiveMetricIndex(index)}
            key={metric.label}
          >
            <span className="costco-impact-label">{metric.label}<small>{metric.direction}</small></span>
            <span className="costco-impact-bars">
              <span className="costco-impact-series is-baseline">
                <span className="costco-impact-track"><i style={{ width: `${(metric.before / metric.max) * 100}%` }} /></span>
                <strong>{metric.beforeDisplay}</strong>
              </span>
              <span className="costco-impact-series is-target">
                <span className="costco-impact-track"><i style={{ width: `${(metric.after / metric.max) * 100}%` }} /></span>
                <strong>{metric.afterDisplay}</strong>
              </span>
            </span>
            <b className="costco-impact-delta">{metric.delta}</b>
          </button>
        ))}
      </div>

      <div className="costco-impact-detail" aria-live="polite">
        <span>{activeMetric.label}</span>
        <p>{activeMetric.detail}</p>
      </div>
      <p className="costco-impact-disclaimer"><b>Illustrative targets—not measured results.</b> Validate through a counterbalanced usability test with 8–12 participants before reporting these as outcomes.</p>
    </div>
  )
}

function CaseGraphic({ kind, label, hero = false }) {
  const trustItems = [
    { label: 'Official citations', value: 57, detail: 'Students most trusted answers they could verify against an official iSchool source.' },
    { label: 'Human escalation', value: 50, detail: 'Half wanted a clear route to a person when the assistant could not safely answer.' },
    { label: 'Admits uncertainty', value: 21, detail: 'Transparency mattered more than pretending the assistant always knew the answer.' },
  ]
  const [activeTrustIndex, setActiveTrustIndex] = useState(0)
  const activeTrustItem = trustItems[activeTrustIndex]
  const systemRoutes = [
    { label: 'Answer', condition: 'Supported + low-risk', detail: 'Respond directly with the official source and a visible confidence level.' },
    { label: 'Clarify', condition: 'One detail is missing', detail: 'Ask one focused question when the missing detail would change the answer.' },
    { label: 'Escalate', condition: 'High-stakes or personal', detail: 'Stop answering and give the single best route to a human advisor.' },
  ]
  const [activeSystemIndex, setActiveSystemIndex] = useState(0)
  const activeSystemRoute = systemRoutes[activeSystemIndex]
  const handoffItems = [
    { label: 'Knowledge base', detail: 'Structured source files made official advising content easier to retrieve and maintain.' },
    { label: 'Response system', detail: 'A consistent answer format surfaced sources, confidence, and the next step.' },
    { label: 'Escalation rules', detail: 'High-stakes and record-specific questions were routed back to human advising.' },
    { label: 'Maintenance guide', detail: 'The handoff documented ownership, updates, known limits, and future work.' },
  ]
  const [activeHandoffIndex, setActiveHandoffIndex] = useState(0)
  const activeHandoffItem = handoffItems[activeHandoffIndex]
  const isSports = kind.includes('sports') || ['role-stack', 'field-filter', 'action-menu', 'signup-flow'].includes(kind)
  const isAdvisr = kind.includes('advisr') || ['confidence-gate', 'trust-bars', 'prompt-layers', 'failure-map', 'handoff-card'].includes(kind)
  const isSoma = kind.includes('soma') || ['gesture-tools', 'gesture-map', 'confidence-chart', 'feedback-loop', 'mood-calendar'].includes(kind)
  const isCostco = kind.includes('costco') || ['attention-map', 'category-grid', 'product-compare', 'search-groups'].includes(kind)

  return (
    <figure className={`case-graphic graphic-${kind}${hero ? ' is-hero' : ''}`} aria-label={label}>
      <div className="case-graphic-stage" aria-hidden={['advisr-trust', 'advisr-system', 'advisr-outcome', 'gesture-map', 'soma-palette', 'confidence-chart', 'category-grid', 'product-compare', 'search-groups', 'costco-impact'].includes(kind) ? undefined : 'true'}>
        {isSports && (
          <div className="sports-ui">
            <div className="sports-phone phone-back"><i /><b /><em /><em /><em /></div>
            <div className="sports-phone phone-main"><i /><b /><em /><em /><button>Continue</button></div>
            <div className="sports-actions"><span>Join a team</span><span>Add my child</span><span>Create a team</span></div>
          </div>
        )}
        {isAdvisr && kind === 'advisr-trust' && (
          <div className="advisr-trust-ui">
            <div className="advisr-trust-header"><p>What creates trust?</p><small>N=14</small></div>
            <div className="advisr-trust-chart" role="group" aria-label="Student trust survey results">
              {trustItems.map((item, index) => (
                <button
                  className={activeTrustIndex === index ? 'active' : ''}
                  type="button"
                  aria-pressed={activeTrustIndex === index}
                  onClick={() => setActiveTrustIndex(index)}
                  onFocus={() => setActiveTrustIndex(index)}
                  onMouseEnter={() => setActiveTrustIndex(index)}
                  key={item.label}
                >
                  <span className="advisr-trust-column">
                    <strong>{item.value}%</strong>
                    <i><b style={{ '--trust-height': `${item.value}%` }} /></i>
                  </span>
                  <span className="advisr-trust-label">{item.label}</span>
                </button>
              ))}
            </div>
            <span className="advisr-trust-detail" aria-live="polite">{activeTrustItem.detail}</span>
          </div>
        )}
        {isAdvisr && kind === 'advisr-system' && (
          <div className="advisr-system-ui">
            <div className="advisr-system-foundation">
              <div><span>01</span><small>Ground every answer</small><b>Official iSchool sources</b></div>
              <i aria-hidden="true">→</i>
              <div><span>02</span><small>Check the risk</small><b>Is the answer fully supported?</b></div>
            </div>
            <div className="advisr-system-branch" aria-hidden="true"><i /><span /></div>
            <div className="advisr-system-paths" role="group" aria-label="AdvisrLab response routes">
              {systemRoutes.map((route, index) => (
                <button
                  className={activeSystemIndex === index ? 'active' : ''}
                  type="button"
                  aria-pressed={activeSystemIndex === index}
                  onClick={() => setActiveSystemIndex(index)}
                  onFocus={() => setActiveSystemIndex(index)}
                  onMouseEnter={() => setActiveSystemIndex(index)}
                  key={route.label}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <b>{route.label}</b>
                  <small>{route.condition}</small>
                </button>
              ))}
            </div>
            <p className="advisr-system-detail" aria-live="polite"><b>{activeSystemRoute.label}</b><span>{activeSystemRoute.detail}</span></p>
          </div>
        )}
        {isAdvisr && kind === 'advisr-outcome' && (
          <div className="advisr-outcome-ui">
            <div className="advisr-outcome-header"><p>MVP handoff</p><small>4 deliverables</small></div>
            <div className="advisr-outcome-checks" role="group" aria-label="MVP handoff deliverables">
              {handoffItems.map((item, index) => (
                <button
                  className={activeHandoffIndex === index ? 'active' : ''}
                  type="button"
                  aria-pressed={activeHandoffIndex === index}
                  onClick={() => setActiveHandoffIndex(index)}
                  onFocus={() => setActiveHandoffIndex(index)}
                  onMouseEnter={() => setActiveHandoffIndex(index)}
                  key={item.label}
                >
                  <i>✓</i><span>{item.label}</span>
                </button>
              ))}
            </div>
            <p className="advisr-outcome-detail" aria-live="polite">{activeHandoffItem.detail}</p>
            <div className="advisr-outcome-limit"><b>Designed boundary</b><span>No records, live registration data, or final graduation decisions.</span></div>
          </div>
        )}
        {isAdvisr && !['advisr-trust', 'advisr-system', 'advisr-outcome'].includes(kind) && (
          <div className="advisr-ui">
            <div className="advisr-top"><span>✦</span><b>AdvisrLab</b><i>Official sources</i></div>
            <div className="advisr-question">Can I skip this prerequisite?</div>
            <div className="advisr-answer"><b>I can’t confirm that from here.</b><span>This depends on your transcript. Let’s connect you with an advisor.</span></div>
            <div className="advisr-source"><i>↗</i><span>iSchool advising support</span><b>Verified</b></div>
          </div>
        )}
        {isSoma && kind === 'gesture-map' && (
          <SomaGestureMap />
        )}
        {isSoma && kind === 'soma-palette' && (
          <SomaPaletteVideo />
        )}
        {isSoma && kind === 'confidence-chart' && (
          <SomaEvaluationChart />
        )}
        {isSoma && !['gesture-map', 'soma-palette', 'confidence-chart'].includes(kind) && (
          <div className="soma-ui">
            <div className="soma-cursor" />
            <i className="soma-stroke stroke-one" />
            <i className="soma-stroke stroke-two" />
            <i className="soma-stroke stroke-three" />
            <div className="soma-toolbar"><span>☝</span><span>✋</span><span>✊</span></div>
            <div className="soma-status">Open palm · paint splash</div>
          </div>
        )}
        {isCostco && kind === 'category-grid' && (
          <CostcoVocabulary />
        )}
        {isCostco && kind === 'product-compare' && (
          <CostcoProductCompare />
        )}
        {isCostco && kind === 'search-groups' && (
          <CostcoSearchCompare />
        )}
        {isCostco && kind === 'costco-impact' && (
          <CostcoImpactChart />
        )}
        {isCostco && !['category-grid', 'product-compare', 'search-groups', 'costco-impact'].includes(kind) && (
          <div className="costco-ui">
            <div className="costco-browser-top"><b>COSTCO</b><i /><span>Search products</span></div>
            <div className="costco-nav">Shop <span>Deals</span><span>Electronics</span><span>Membership</span></div>
            <div className="costco-categories">{Array.from({ length: 12 }, (_, index) => <i key={index} />)}</div>
            <div className="costco-deal">SHOP DEALS</div>
          </div>
        )}
      </div>
    </figure>
  )
}

function SurveyChart({ chart }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = chart.items[activeIndex]

  return (
    <figure className="survey-chart" aria-label={`${chart.title}, ${chart.sample}`}>
      <figcaption><span>{chart.title}</span><b>{chart.sample}</b></figcaption>
      <div className="survey-chart-bars">
        {chart.items.map((item, itemIndex) => (
          <button
            className={activeIndex === itemIndex ? 'active' : ''}
            type="button"
            aria-pressed={activeIndex === itemIndex}
            onClick={() => setActiveIndex(itemIndex)}
            onFocus={() => setActiveIndex(itemIndex)}
            onMouseEnter={() => setActiveIndex(itemIndex)}
            key={item.label}
          >
            <span className="survey-chart-column" style={{ '--survey-value': `${item.value}%` }}>
              <strong>{item.value}%</strong>
              <i />
            </span>
            <span className="survey-chart-label">{item.label}</span>
          </button>
        ))}
      </div>
      <p className="survey-chart-detail" aria-live="polite">{activeItem.detail}</p>
    </figure>
  )
}

function CaseStudySection({ section, index, sectionId }) {
  const isOpeningSection = index === 0
  const hasGraphic = !isOpeningSection && !section.hideVisual
  const sectionDetails = (
    <>
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.stats && (
        <div className="case-stats">
          {section.stats.map(([value, description]) => <div key={description}><strong>{value}</strong><span>{description}</span></div>)}
        </div>
      )}
      {section.bullets && <ul className="case-bullets">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
      {section.callout && <blockquote>{section.callout}</blockquote>}
    </>
  )

  return (
    <section className={`case-section section-${section.visual}${index % 2 ? ' is-reversed' : ''}${isOpeningSection ? ' is-centered-intro' : ''}${!hasGraphic && !isOpeningSection ? ' has-no-graphic' : ''}`} id={sectionId}>
      <div className="case-section-copy">
        <p className="case-eyebrow">{String(index + 1).padStart(2, '0')} · {section.eyebrow}</p>
        <h2>{section.title}</h2>
        {isOpeningSection ? (
          <div className={`case-overview-layout${section.overviewChart ? ' has-chart' : ''}`}>
            <div className="case-overview-copy">
              <h3 className="case-overview-heading">Overview</h3>
              {sectionDetails}
            </div>
            {section.overviewChart && <SurveyChart chart={section.overviewChart} />}
          </div>
        ) : sectionDetails}
      </div>
      {hasGraphic && <CaseGraphic kind={section.visual} label={section.title} />}
      {section.followup && (
        <div className="case-section-followup">
          <h3>{section.followup.title}</h3>
          <div>
            {section.followup.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </div>
      )}
    </section>
  )
}

function CaseStudy({ project }) {
  const [activeSection, setActiveSection] = useState(0)
  const [menuVisible, setMenuVisible] = useState(true)
  const moreProjectsRef = useRef(null)
  const otherProjects = caseStudyOrder
    .filter((slug) => slug !== project.slug && !blockedCaseStudySlugs.has(slug))
    .map((slug) => caseStudies[slug])
  const cardProject = projects.find((item) => item.slug === project.slug)
  const jumpMenuItems = project.slug === 'costco'
    ? [
        { label: 'Overview', sectionIndex: 0, activeSections: [0] },
        { label: 'Redesign', sectionIndex: 1, activeSections: [1, 2, 3] },
        { label: 'Measurable Impact', sectionIndex: 4, activeSections: [4] },
      ]
    : project.sections.map((section, index) => ({
        label: section.eyebrow,
        sectionIndex: index,
        activeSections: [index],
      }))

  useEffect(() => {
    const sections = project.sections.map((_, index) => document.getElementById(`${project.slug}-section-${index + 1}`)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(sections.indexOf(visible.target))
    }, { rootMargin: '-24% 0px -52% 0px', threshold: [0, .2, .5] })

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [project])

  useEffect(() => {
    const moreProjects = moreProjectsRef.current
    if (!moreProjects) return undefined

    const observer = new IntersectionObserver(([entry]) => {
      setMenuVisible(!entry.isIntersecting)
    }, { threshold: 0 })

    observer.observe(moreProjects)
    return () => observer.disconnect()
  }, [project])

  return (
    <main className={`case-study theme-${project.theme}`} id="top">
      <header className="case-hero">
        <div className="case-hero-copy">
          <p className="case-eyebrow">{project.eyebrow}</p>
          <p className="case-hero-date">{project.meta.Timeline}</p>
          <h1>{project.title}</h1>
          <p className="case-summary">{project.summary}</p>
          {project.slug === 'somacanvas' && (
            <a
              className="soma-live-link"
              href="https://somacanvas-alpha.vercel.app/"
              target="_blank"
              rel="noreferrer"
              aria-label="Try SomaCanvas, opens in a new tab"
            >
              <span>Try SomaCanvas</span>
              <Arrow diagonal />
            </a>
          )}
        </div>
        {project.slug === 'costco' ? (
          <div className="project-visual case-hero-card costco costco-prototype-hero">
            <CostcoOutcomeFlow compact />
          </div>
        ) : (
          <div className={`project-visual case-hero-card ${cardProject.tone}`}>
            <ProjectArtwork type={cardProject.artwork} />
          </div>
        )}
        <dl className="case-meta">
          {Object.entries(project.meta).map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </header>
      <div className="case-content-layout">
        <div className="case-story">
          {project.sections.map((section, index) => (
            <CaseStudySection
              section={section}
              index={index}
              sectionId={`${project.slug}-section-${index + 1}`}
              key={section.title}
            />
          ))}
        </div>
        <nav
          className={`case-jump-menu${menuVisible ? '' : ' is-outside-case'}`}
          aria-hidden={!menuVisible}
          aria-label={`${project.eyebrow} sections`}
        >
          {jumpMenuItems.map((item) => (
            <a
              className={item.activeSections.includes(activeSection) ? 'active' : ''}
              href={`#${project.slug}-section-${item.sectionIndex + 1}`}
              key={item.label}
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
      <aside className="case-more" ref={moreProjectsRef}>
        <div className="case-more-heading"><p>More selected work</p><h2>Keep exploring.</h2></div>
        <div className="case-more-grid">
          {otherProjects.map((nextProject) => (
            <a className={`case-more-card more-theme-${nextProject.theme}`} href={`/work/${nextProject.slug}`} key={nextProject.slug}>
              <p>Project · {nextProject.number}</p>
              <h3>{nextProject.eyebrow.split(' · ')[0]}</h3>
              <span>{nextProject.sections[0].title}</span>
              <Arrow diagonal />
            </a>
          ))}
        </div>
      </aside>
    </main>
  )
}

function LoadingIntro({ phase, primaryRef, flyStyle }) {
  if (phase === 'done') return null

  return (
    <div className={`loading-intro ${phase}`} role="status" aria-live="polite">
      <span className="sr-only">Loading Vivian Lu’s portfolio</span>
      <div className="loader-marks" aria-hidden="true">
        <img className="loader-frame primary" ref={primaryRef} src="/favicon.svg" alt="" style={flyStyle} />
        <img className="loader-frame expression-one" src="/frame-5.svg" alt="" />
        <img className="loader-frame expression-two" src="/frame-6.svg" alt="" />
      </div>
    </div>
  )
}

function App() {
  const getSeattleTime = () => new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles',
  }).format(new Date())

  const getCurrentPage = () => {
    const route = window.location.pathname.split('/').filter(Boolean)[0]
    return pageDetails[route] ? route : 'work'
  }
  const getCurrentProject = () => {
    const [section, slug] = window.location.pathname.split('/').filter(Boolean)
    return section === 'work' && caseStudies[slug] && !blockedCaseStudySlugs.has(slug) ? slug : null
  }
  const getCurrentVisual = () => {
    const [section, slug] = window.location.pathname.split('/').filter(Boolean)
    return section === 'visual' ? visualProjects.find((project) => project.slug === slug && !project.href) ?? null : null
  }
  const isBlockedProjectPath = () => {
    const [section, slug] = window.location.pathname.split('/').filter(Boolean)
    return section === 'work' && blockedCaseStudySlugs.has(slug)
  }
  const [activePage, setActivePage] = useState(getCurrentPage)
  const [activeProjectSlug, setActiveProjectSlug] = useState(getCurrentProject)
  const [activeVisualProject, setActiveVisualProject] = useState(getCurrentVisual)
  const [seattleTime, setSeattleTime] = useState(getSeattleTime)
  const [loaderPhase, setLoaderPhase] = useState(() => {
    const forcePreview = new URLSearchParams(window.location.search).has('loader')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'done'
    try {
      return !forcePreview && window.sessionStorage.getItem('vivian-loader-seen') ? 'done' : 'loading'
    } catch {
      return 'loading'
    }
  })
  const [flyStyle, setFlyStyle] = useState({})
  const [logoExpression, setLogoExpression] = useState('/favicon.svg')
  const [logoSpinRun, setLogoSpinRun] = useState(0)
  const logoRef = useRef(null)
  const loaderPrimaryRef = useRef(null)
  const shouldPlayLoader = useRef(loaderPhase !== 'done')
  const activeTabIndex = primaryNavigation.findIndex((item) => item.id === activePage)

  useEffect(() => {
    const syncPage = () => {
      if (isBlockedProjectPath()) window.history.replaceState({}, '', '/')
      setActivePage(getCurrentPage())
      setActiveProjectSlug(getCurrentProject())
      setActiveVisualProject(getCurrentVisual())
    }

    if (isBlockedProjectPath()) window.history.replaceState({}, '', '/')
    window.addEventListener('popstate', syncPage)
    return () => window.removeEventListener('popstate', syncPage)
  }, [])

  useEffect(() => {
    const clock = window.setInterval(() => setSeattleTime(getSeattleTime()), 30000)
    return () => window.clearInterval(clock)
  }, [])

  useEffect(() => {
    if (!shouldPlayLoader.current) return undefined

    let timers = []
    let flyFrames = []
    const beginSequence = () => {
      document.documentElement.classList.add('intro-lock')

      timers = [
        window.setTimeout(() => setLoaderPhase('stacking'), LOADER_STACK_START_MS),
        window.setTimeout(() => setLoaderPhase('settled'), LOADER_SETTLE_MS),
        window.setTimeout(() => {
          const source = loaderPrimaryRef.current?.getBoundingClientRect()
          const target = logoRef.current?.getBoundingClientRect()

          if (source && target) {
            setFlyStyle({
              '--fly-x': `${target.left + target.width / 2 - (source.left + source.width / 2)}px`,
              '--fly-y': `${target.top + target.height / 2 - (source.top + source.height / 2)}px`,
              '--fly-scale': target.width / source.width,
            })
          }
          const measureFrame = window.requestAnimationFrame(() => {
            const transitionFrame = window.requestAnimationFrame(() => setLoaderPhase('flying'))
            flyFrames.push(transitionFrame)
          })
          flyFrames.push(measureFrame)
        }, LOADER_FLY_START_MS),
        window.setTimeout(() => {
          try { window.sessionStorage.setItem('vivian-loader-seen', 'true') } catch { /* storage is optional */ }
          document.documentElement.classList.remove('intro-lock')
          setLoaderPhase('done')
        }, LOADER_DONE_MS),
      ]
    }

    beginSequence()

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer))
      flyFrames.forEach((frame) => window.cancelAnimationFrame(frame))
      document.documentElement.classList.remove('intro-lock')
    }
  }, [])

  const navigate = (event, page, href) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', href)
    setActivePage(page)
    setActiveProjectSlug(null)
    setActiveVisualProject(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showRandomLogoExpression = () => {
    setLogoExpression(LOGO_EXPRESSIONS[Math.floor(Math.random() * LOGO_EXPRESSIONS.length)])
  }

  const resetLogoExpression = () => setLogoExpression('/favicon.svg')

  const handleLogoClick = (event) => {
    setLogoSpinRun((run) => run + 1)
    navigate(event, 'work', '/')
  }

  const activeCaseStudy = activeProjectSlug ? caseStudies[activeProjectSlug] : null

  return (
    <>
      <LoadingIntro phase={loaderPhase} primaryRef={loaderPrimaryRef} flyStyle={flyStyle} />
      <div className={`site-shell${loaderPhase !== 'done' ? ' app-loading' : ''}${activeVisualProject ? ' is-visual-case' : ''}`}>
      <header className="site-header">
        <a
          className="monogram"
          ref={logoRef}
          href="/"
          aria-label="Vivian Lu, home"
          onClick={handleLogoClick}
          onMouseEnter={showRandomLogoExpression}
          onMouseLeave={resetLogoExpression}
          onFocus={showRandomLogoExpression}
          onBlur={resetLogoExpression}
        >
          <img className={logoSpinRun ? 'is-spinning' : ''} key={logoSpinRun} src={logoExpression} alt="" />
        </a>
        <nav aria-label="Primary navigation">
          <div
            className={`nav-tabs${activeTabIndex >= 0 ? ' has-active' : ''}`}
            style={{ '--active-index': activeTabIndex }}
          >
            <span className="nav-selection" aria-hidden="true" />
            {primaryNavigation.map((item) => (
              <a
                className={`nav-tab${activePage === item.id ? ' active' : ''}`}
                href={item.href}
                key={item.id}
                onClick={(event) => navigate(event, item.id, item.href)}
                aria-current={activePage === item.id ? 'page' : undefined}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="nav-utility">
            <a
              href="/vivian-lu-resume.pdf"
              target="_blank"
              rel="noreferrer"
            >resume</a>
            <span aria-hidden="true">/</span>
            <a href="https://www.linkedin.com/in/zifu-lu" target="_blank" rel="noreferrer">linkedin</a>
          </div>
        </nav>
      </header>

      {activeCaseStudy ? <CaseStudy project={activeCaseStudy} /> : activeVisualProject ? <VisualCase project={activeVisualProject} /> : activePage === 'work' ? <main>
        <section className={`intro${loaderPhase === 'done' ? ' annotations-ready' : ''}`} id="top" aria-labelledby="intro-heading">
          <div className="intro-primary">
            <div className="availability"><span /> Seattle · {seattleTime}</div>
            <h1 id="intro-heading">Hello!<br />I’m Vivian Lu.</h1>
            <p className="intro-lede">A UX designer who <span className="lede-mark lede-underline">codes</span> and works with <span className="lede-mark lede-circle">AI</span> to build thoughtful interactive experiences grounded in <span className="lede-mark lede-highlight">human psychology</span>.</p>
            <ul className="intro-skill-pills" aria-label="Skills and capabilities">
              <li>Design Engineer</li>
              <li>AI Prototyping</li>
              <li>Frontend Development</li>
              <li>Figma Systems</li>
              <li>UX + Psychology</li>
            </ul>
          </div>
          <aside className="intro-notes" id="about" aria-label="About Vivian">
            <HomeArtGallery />
            <p>Currently designing at Sportsexcitement</p>
            <p>Pursuing Informatics B.S. and Psychology B.A. at UW Seattle</p>
          </aside>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-heading">
          <div className="section-heading"><p>Selected work</p><h2 id="work-heading">A few things I’ve shaped.</h2></div>
          <div className="project-grid">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
        </section>
      </main> : activePage === 'visual' ? <VisualArchive /> : activePage === 'about' ? <AboutPage /> : <PagePlaceholder page={activePage} />}

      {!activeVisualProject && <footer id="contact">
        <div className="footer-prompt"><p>Have a project in mind?</p><a href="mailto:vivian.zifu.lu@gmail.com">Let’s make something thoughtful. <Arrow diagonal /></a></div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Vivian Lu</p><div className="footer-links"><a href="mailto:vivian.zifu.lu@gmail.com">Email</a><a href="/about">About</a><a href="#top">Back to top ↑</a></div></div>
      </footer>}
      </div>
    </>
  )
}

export default App
