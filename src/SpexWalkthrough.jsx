import { useEffect, useRef, useState } from 'react'
import { cursorAt, frameAt, sampleAccount, typed, walkthroughFlows } from './spexWalkthroughTimeline.js'
import './SpexWalkthrough.css'

const assetUrl = (name) => `/spex/${name}.svg`
const seconds = (time) => `0:${String(Math.floor(time / 1000)).padStart(2, '0')}`

function Field({ x, y, width, maskWidth = width, value, placeholder = '', active = false, center = false, size = 14 }) {
  return (
    <g>
      <rect x={x + 2} y={y + 2} width={maskWidth - 4} height="39" rx="6" fill="white" />
      {active && <rect x={x} y={y} width={width} height="43" rx="8" fill="none" stroke="#f06a3e" strokeWidth="1.6" />}
      <text x={center ? x + width / 2 : x + 12} y={y + 27} textAnchor={center ? 'middle' : 'start'} fontSize={size} fill={value ? '#003057' : '#757575'}>{value || placeholder}</text>
    </g>
  )
}

function AccountFields({ local, accepted, flow }) {
  const time = accepted ? 9200 : local
  const first = typed(sampleAccount.first, time, 650, 650)
  const last = typed(sampleAccount.last, time, 2050, 450)
  const email = typed(sampleAccount.email, time, 3150, 1500)
  const password = typed(sampleAccount.password, time, 5150, 1300)
  const revealed = !accepted && time >= 6800 && time < 7600
  return (
    <>
      <g transform={`translate(0 ${flow.accountOffset})`}>
      <Field x={19} y={217} width={163} value={first} active={!accepted && time >= 500 && time < 1900} />
      <Field x={207} y={217} width={154} value={last} active={!accepted && time >= 1900 && time < 3000} />
      <Field x={19} y={311} width={332} value={email} placeholder="your.email@example.com" active={!accepted && time >= 3000 && time < 5000} />
      <Field x={19} y={431} width={332} maskWidth={302} value={revealed ? password : '•'.repeat(password.length)} placeholder="Create a strong password" active={!accepted && time >= 5000 && time < 6800} />
      <rect x="20" y="484" width="315" height="19" fill="white" />
      {password.length > 0 && <>
        <rect x="19" y="489" width="172" height="6" rx="3" fill="#edf0ed" />
        <rect x="19" y="489" width={172 * password.length / sampleAccount.password.length} height="6" rx="3" fill={password.length < 10 ? '#eca445' : '#16a34a'} />
        <text x="199" y="497" fontSize="11" fill="#5b5b5b">{password.length < 10 ? 'Keep going' : 'Strong password'}</text>
      </>}
      {revealed && <g>
        <rect x="321" y="442" width="24" height="24" fill="white" />
        <path d="M324 454q8-11 16 0-8 11-16 0Z" fill="none" stroke="#667185" strokeWidth="1.4" />
        <circle cx="332" cy="454" r="2.5" fill="none" stroke="#667185" strokeWidth="1.4" />
      </g>}
      </g>
      {accepted && <g transform={`translate(0 ${flow.checkboxOffset})`}>
        <rect x="20.5" y="615" width="16" height="16" rx="3" fill="#003057" />
        <path d="m24 623 3 3 6-7" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>}
    </>
  )
}

function ScreenOverlays({ frame, flow }) {
  const { stage, local, role, baseball, cycling } = frame
  if (stage.id === 'birthday') return (
    <>
      <Field x={19} y={255} width={100} value={typed('05', local, 750, 350)} placeholder="MM" active={local >= 600 && local < 1800} center />
      <Field x={136} y={255} width={100} value={typed('17', local, 1950, 350)} placeholder="DD" active={local >= 1800 && local < 2900} center />
      <Field x={253} y={255} width={100} value={typed(flow.birthdayYear, local, 3050, 550)} placeholder="YYYY" active={local >= 2900 && local < 4200} center />
    </>
  )
  if (stage.id === 'account' || stage.id === 'accepted') return <AccountFields local={local} accepted={stage.id === 'accepted'} flow={flow} />
  if (stage.id === 'verification') {
    const code = typed(sampleAccount.code, local, 900, 2400)
    return <>
      <rect x="18" y="198" width="224" height="22" fill="white" />
      <text x="19" y="215" fontSize="13" fill="#003057">{sampleAccount.email}</text>
      {Array.from({ length: 6 }, (_, index) => <g key={index}>
        {local >= 600 && code.length === index && <rect x={25 + 60 * index} y="241" width="39" height="48" rx="4" stroke="#f06a3e" strokeWidth="1.6" fill="none" />}
        <text x={45 + 60 * index} y="273" textAnchor="middle" fontSize="22" fill="#003057">{code[index]}</text>
      </g>)}
      <rect x="134" y="299" width="125" height="17" fill="white" />
      <text x="195" y="312" textAnchor="middle" fontSize="11" fill="#5b5b5b">Code expires in {59 - Math.floor(local / 1000)}s</text>
    </>
  }
  if (stage.id === 'roles' && role) return <g transform={flow.key === 'teen' && role === 'community' ? 'translate(0 -192)' : undefined}><image href={assetUrl(`role-${role}`)} width="390" height="844" /></g>
  if (stage.id === 'parent') return <Field x={27} y={467} width={332} value={typed(sampleAccount.guardianEmail, local, 850, 1900)} placeholder="your.email@example.com" active={local >= 650 && local < 3800} />
  if (stage.id === 'sports') return <>
    {baseball && <image href={assetUrl('sport-baseball')} width="390" height="844" />}
    {cycling && <image href={assetUrl('sport-cycling')} width="390" height="844" />}
  </>
  return null
}

export default function SpexWalkthrough({ ageGroup = '18+' }) {
  const flow = walkthroughFlows[ageGroup]
  const { stages: walkthroughStages, chapters: walkthroughChapters, duration: walkthroughDuration } = flow
  const containerRef = useRef(null)
  const elapsedRef = useRef(0)
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [inView, setInView] = useState(false)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [ready, setReady] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const frame = frameAt(elapsed, flow)
  const { stage, local, complete } = frame
  const cursor = cursorAt(stage, local)
  const running = playing && ready && inView && visible && !complete

  useEffect(() => {
    let cancelled = false
    Promise.all(flow.assets.map((name) => new Promise((resolve, reject) => {
      const image = new Image()
      image.onload = resolve
      image.onerror = reject
      image.src = assetUrl(name)
    }))).then(() => { if (!cancelled) setReady(true) }).catch(() => { if (!cancelled) setLoadError(true) })
    return () => { cancelled = true }
  }, [flow])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .2 })
    observer.observe(containerRef.current)
    const onVisibilityChange = () => setVisible(!document.hidden)
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [])

  useEffect(() => {
    if (!running) return undefined
    let handle
    let previous
    let lastPaint = 0
    const tick = (now) => {
      if (previous !== undefined) elapsedRef.current = Math.min(walkthroughDuration, elapsedRef.current + Math.min(now - previous, 100))
      previous = now
      if (now - lastPaint >= 32 || elapsedRef.current === walkthroughDuration) {
        setElapsed(elapsedRef.current)
        lastPaint = now
      }
      if (elapsedRef.current < walkthroughDuration) handle = requestAnimationFrame(tick)
    }
    handle = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(handle)
  }, [running, walkthroughDuration])

  const seek = (time) => {
    elapsedRef.current = time
    setElapsed(time)
  }
  const replay = () => { seek(0); setPlaying(true) }
  const jumpToChapter = (index) => {
    seek(walkthroughStages.find((item) => item.chapter === index).start)
    setPlaying(false)
  }

  return (
    <figure className="spex-walkthrough-player" ref={containerRef} aria-label={`Animated ${flow.key} sign-up walkthrough in an iPhone mockup`}>
      <div className="spex-demo-heading"><span>{flow.label} · Sign-up walkthrough</span><span>{complete ? 'Complete' : 'Prototype'}</span></div>
      <div className="spex-phone-stage">
        <div className="spex-iphone">
          <i className="spex-phone-button" aria-hidden="true" />
          <div className="spex-iphone-screen">
            <svg viewBox="0 0 390 844" role="img" aria-label={`${walkthroughChapters[stage.chapter]}: ${stage.description}`} className="spex-demo-screen">
              <rect width="390" height="844" fill="white" />
              <g opacity={!playing ? 1 : Math.min(1, local / (stage.id === 'splash' ? 800 : 180))} transform={stage.id === 'splash' && playing ? `translate(0 ${12 * (1 - Math.min(1, local / 800))})` : undefined}>
                <image href={assetUrl(stage.asset)} width="390" height="844" />
                <ScreenOverlays frame={frame} flow={flow} />
              </g>
              {local >= 400 && stage.clicks.length > 0 && !complete && <g className="spex-demo-cursor" opacity={Math.min(1, (local - 400) / 200)} transform={`translate(${cursor.x} ${cursor.y})`}>
                {cursor.pulse !== null && <circle r={13 + cursor.pulse * 19} fill="none" stroke="#ff7041" strokeWidth="2" opacity={1 - cursor.pulse} />}
                <circle r={cursor.pulse !== null ? 10 + cursor.pulse * 3 : 13} fill="#ff7041" fillOpacity=".3" stroke="white" strokeWidth="2" />
                <circle r="4" fill="#e45020" />
              </g>}
            </svg>
            <span className="spex-dynamic-island" aria-hidden="true" />
            <span className="spex-home-indicator" aria-hidden="true" />
          </div>
        </div>
      </div>
      <figcaption className="spex-demo-sidebar">
        <div className="spex-demo-caption" aria-live={playing ? 'off' : 'polite'}>
          <span>{String(stage.chapter + 1).padStart(2, '0')} / {String(walkthroughChapters.length).padStart(2, '0')}</span>
          <div><h3>{complete ? flow.completionTitle : stage.title}</h3><p>{complete ? flow.completionDescription : stage.description}</p></div>
        </div>
        <div className="spex-demo-controls">
          <button type="button" onClick={() => complete ? replay() : setPlaying(!playing)} disabled={!ready} aria-label={`${complete ? 'Replay' : playing ? 'Pause' : 'Play'} ${flow.key} walkthrough`}>
            <span aria-hidden="true">{complete ? '↻' : playing ? 'Ⅱ' : '▶'}</span>{complete ? 'Replay' : playing ? 'Pause' : 'Play'}
          </button>
          <input type="range" min="0" max={walkthroughDuration} step="100" value={elapsed} onChange={(event) => { seek(Number(event.target.value)); setPlaying(false) }} aria-label={`${flow.label} walkthrough progress`} aria-valuetext={`${walkthroughChapters[stage.chapter]}, ${Math.floor(elapsed / 1000)} seconds of ${Math.ceil(walkthroughDuration / 1000)}`} />
          <span className="spex-demo-time">{seconds(elapsed)} / {seconds(walkthroughDuration)}</span>
          <button type="button" className="spex-demo-replay" onClick={replay} disabled={!ready} aria-label={`Restart ${flow.key} walkthrough`}>↻</button>
        </div>
        <ol className="spex-demo-chapters" aria-label={`${flow.label} walkthrough steps`} style={{ gridTemplateColumns: `repeat(${walkthroughChapters.length}, minmax(0, 1fr))` }}>
          {walkthroughChapters.map((chapter, index) => <li key={chapter}>
            <button type="button" onClick={() => jumpToChapter(index)} aria-label={`View ${flow.label} step ${index + 1}: ${chapter}`} aria-current={stage.chapter === index ? 'step' : undefined}>
              <span>{index + 1}</span><small>{chapter}</small>
            </button>
          </li>)}
        </ol>
        <p className="spex-demo-note">{loadError ? 'The preview could not load. Refresh to try again.' : !ready ? 'Loading walkthrough…' : 'Animated prototype · Illustrative account details'}</p>
      </figcaption>
    </figure>
  )
}
