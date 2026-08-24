import { useEffect, useRef, useState } from 'react'
import './App.css'
import { caseStudies, caseStudyOrder } from './caseStudies'

const LOADER_JUMP_DURATION_MS = 850
const LOADER_JUMP_LOOPS = 2
const LOADER_JUMP_STAGGER_MS = 110
const LOADER_STACK_START_MS = (LOADER_JUMP_DURATION_MS * LOADER_JUMP_LOOPS) + (LOADER_JUMP_STAGGER_MS * 2)
const LOADER_FLY_START_MS = LOADER_STACK_START_MS + 650
const LOADER_SETTLE_MS = LOADER_FLY_START_MS - 60
const LOADER_DONE_MS = LOADER_FLY_START_MS + 870

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
  const isUnderConstruction = project.slug === 'sportsexcitement'
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
    title: 'Experiments, images, and things made for joy.',
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
    <figure className={`case-graphic graphic-${kind}${hero ? ' is-hero' : ''}`}>
      <figcaption><span>Design artifact</span>{label}</figcaption>
      <div className="case-graphic-stage" aria-hidden={['advisr-trust', 'advisr-system', 'advisr-outcome'].includes(kind) ? undefined : 'true'}>
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
        {isSoma && (
          <div className="soma-ui">
            <div className="soma-cursor" />
            <i className="soma-stroke stroke-one" />
            <i className="soma-stroke stroke-two" />
            <i className="soma-stroke stroke-three" />
            <div className="soma-toolbar"><span>☝</span><span>✋</span><span>✊</span></div>
            <div className="soma-status">Open palm · paint splash</div>
          </div>
        )}
        {isCostco && (
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
    <section className={`case-section section-${section.visual}${index % 2 ? ' is-reversed' : ''}${isOpeningSection ? ' is-centered-intro' : ''}`} id={sectionId}>
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
      {!isOpeningSection && <CaseGraphic kind={section.visual} label={section.title} />}
    </section>
  )
}

function CaseStudy({ project }) {
  const [activeSection, setActiveSection] = useState(0)
  const otherProjects = caseStudyOrder.filter((slug) => slug !== project.slug).map((slug) => caseStudies[slug])
  const cardProject = projects.find((item) => item.slug === project.slug)

  useEffect(() => {
    const sections = project.sections.map((_, index) => document.getElementById(`${project.slug}-section-${index + 1}`)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(sections.indexOf(visible.target))
    }, { rootMargin: '-24% 0px -52% 0px', threshold: [0, .2, .5] })

    sections.forEach((section) => observer.observe(section))
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
        </div>
        <div className={`project-visual case-hero-card ${cardProject.tone}`}>
          <ProjectArtwork type={cardProject.artwork} />
        </div>
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
        <nav className="case-jump-menu" aria-label={`${project.eyebrow} sections`}>
          {project.sections.map((section, index) => (
            <a
              className={activeSection === index ? 'active' : ''}
              href={`#${project.slug}-section-${index + 1}`}
              key={section.title}
            >
              <span>{section.eyebrow}</span>
            </a>
          ))}
        </nav>
      </div>
      <aside className="case-more">
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
    return section === 'work' && caseStudies[slug] ? slug : null
  }
  const [activePage, setActivePage] = useState(getCurrentPage)
  const [activeProjectSlug, setActiveProjectSlug] = useState(getCurrentProject)
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
  const logoRef = useRef(null)
  const loaderPrimaryRef = useRef(null)
  const shouldPlayLoader = useRef(loaderPhase !== 'done')
  const activeTabIndex = primaryNavigation.findIndex((item) => item.id === activePage)

  useEffect(() => {
    const syncPage = () => {
      setActivePage(getCurrentPage())
      setActiveProjectSlug(getCurrentProject())
    }
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
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const activeCaseStudy = activeProjectSlug ? caseStudies[activeProjectSlug] : null

  return (
    <>
      <LoadingIntro phase={loaderPhase} primaryRef={loaderPrimaryRef} flyStyle={flyStyle} />
      <div className={`site-shell${loaderPhase !== 'done' ? ' app-loading' : ''}`}>
      <header className="site-header">
        <a className="monogram" ref={logoRef} href="/" aria-label="Vivian Lu, home" onClick={(event) => navigate(event, 'work', '/')}>
          <img src="/favicon.svg" alt="" />
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
              className={activePage === 'resume' ? 'active' : ''}
              href="/resume"
              onClick={(event) => navigate(event, 'resume', '/resume')}
              aria-current={activePage === 'resume' ? 'page' : undefined}
            >resume</a>
            <span aria-hidden="true">/</span>
            <a href="https://www.linkedin.com/in/zifu-lu" target="_blank" rel="noreferrer">linkedin</a>
          </div>
        </nav>
      </header>

      {activeCaseStudy ? <CaseStudy project={activeCaseStudy} /> : activePage === 'work' ? <main>
        <section className="intro" id="top" aria-labelledby="intro-heading">
          <div className="intro-primary">
            <div className="availability"><span /> Seattle · {seattleTime}</div>
            <h1 id="intro-heading">Hello!<br />I’m Vivian Lu.</h1>
            <p className="intro-lede">A multidisciplinary designer creating clear, human experiences for ambitious ideas and the people they serve.</p>
            <a className="text-link" href="#contact">Say hello <Arrow /></a>
          </div>
          <aside className="intro-notes" id="about" aria-label="About Vivian">
            <p>Currently designing at Sportsexcitement</p>
            <p>Pursuing Informatics B.S. and Psychology B.A. at UW Seattle</p>
          </aside>
        </section>

        <section className="work-section" id="work" aria-labelledby="work-heading">
          <div className="section-heading"><p>Selected work</p><h2 id="work-heading">A few things I’ve shaped.</h2></div>
          <div className="project-grid">{projects.map((project) => <ProjectCard key={project.title} project={project} />)}</div>
        </section>
      </main> : <PagePlaceholder page={activePage} />}

      <footer id="contact">
        <div className="footer-prompt"><p>Have a project in mind?</p><a href="mailto:hello@vivianlu.design">Let’s make something thoughtful. <Arrow diagonal /></a></div>
        <div className="footer-bottom"><p>© {new Date().getFullYear()} Vivian Lu</p><div className="footer-links"><a href="mailto:hello@vivianlu.design">Email</a><a href="/about">About</a><a href="#top">Back to top ↑</a></div></div>
      </footer>
      </div>
    </>
  )
}

export default App
