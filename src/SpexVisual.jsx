import { useRef, useState } from 'react'
import './SpexVisual.css'
import SpexWalkthrough from './SpexWalkthrough.jsx'

const stages = [
  { name: 'Empathise / Understand', short: 'Understand', color: '#acc8f1', status: 'Completed', title: 'See what others do.', detail: 'I ran competitive analysis to understand how other platforms approach registration and onboarding, building a foundation for the SPEX experience.' },
  { name: 'Define', short: 'Define', color: '#efb0a6', status: 'Completed', title: 'Set the rules.', detail: 'I worked with PMs to define age constraints and clarify how sign-up should adapt to different ages and user goals.' },
  { name: 'Ideate', short: 'Ideate', color: '#b6dce4', status: 'Completed', title: 'Sketch ideas.', detail: 'I created low-fidelity sketches to explore how the sign-up journey could stay short while accommodating different ages and roles.' },
  { name: 'Design / prototype', short: 'Design / prototype', color: '#a5dcc3', status: 'Completed', title: 'Make the screens.', detail: 'I translated the sketches into high-fidelity designs, making the age-specific journeys and personalized onboarding concrete.' },
  { name: 'Review', short: 'Review', color: '#deb0c3', status: 'Completed', title: 'Ask the team.', detail: 'I ran the high-fidelity designs through the team to gather feedback and align on the experience before implementation.' },
  { name: 'Implement', short: 'Implement', color: '#d7d6d2', status: 'Current stage', title: 'Build it together.', detail: 'I’m currently collaborating with developers to implement the designs and carry the intended experience through to the product.' },
  { name: 'Test and learn', short: 'Test & learn', color: '#f3d49c', status: 'Next · Not yet tested', title: 'Try it with users.', detail: 'We haven’t run usability testing yet. The next step is to evaluate sign-up clarity, age-specific paths, trust, and personalization, then use what we learn to guide further iteration.' },
]

function DesignProcess() {
  const [active, setActive] = useState(5)
  const stage = stages[active]

  return (
    <div className="spex-process">
      <p className="spex-visual-hint">Hover, focus, or tap a stage to explore my work.</p>
      <div className="spex-process-track">
        <div className="spex-feedback-loop" aria-hidden="true"><span>← Learn, revisit, refine</span></div>
        <ol className="spex-process-stages" aria-label="Design process stages">
          {stages.map((item, index) => (
            <li key={item.name} className={index === 4 ? 'is-review' : ''}>
              <button
                type="button"
                style={{ '--stage-color': item.color }}
                aria-label={`${item.name}: ${item.status}`}
                aria-pressed={active === index}
                aria-controls="spex-process-detail"
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                onClick={() => setActive(index)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item.short}</strong>
              </button>
              <small>{index === 5 ? 'I am here' : index === 6 ? 'Up next' : '\u00a0'}</small>
            </li>
          ))}
        </ol>
      </div>
      <div className="spex-process-detail" id="spex-process-detail" role="region" aria-label="Stage details" aria-live="polite" style={{ '--stage-color': stage.color }}>
        <div><span className="spex-stage-status">{stage.status}</span><h3>{stage.title}</h3></div>
        <p>{stage.detail}</p>
      </div>
      <p className="spex-process-credit">Process adapted from the framework by Rachel McConnell (@Minette_78).</p>
    </div>
  )
}

function JourneyMap() {
  const dialogRef = useRef(null)
  return (
    <figure className="spex-journey">
      <button className="spex-map-preview" type="button" onClick={() => dialogRef.current.showModal()} aria-label="Expand registration journey map">
        <img src="/spex-user-journey.svg" width="3275" height="1379" loading="lazy" alt="Working registration flow showing new and returning users, date of birth, age decisions, and parent involvement." />
        <span>Expand journey map ↗</span>
      </button>
      <figcaption>Working registration map · Connecting age decisions, account setup, and the next step.</figcaption>
      <dialog className="spex-map-dialog" ref={dialogRef} aria-labelledby="spex-map-title">
        <header><h3 id="spex-map-title">Registration journey map</h3><form method="dialog"><button type="submit" autoFocus>Close <span aria-hidden="true">×</span></button></form></header>
        <p>Scroll to explore the working registration map. The final design journeys are organized into ages 18+, 13–17, and under 13.</p>
        <div className="spex-map-scroll" tabIndex={0} role="region" aria-label="Scrollable registration map"><img src="/spex-user-journey.svg" width="3275" height="1379" alt="Detailed registration journey map, including sign-in, registration, age checks, parent notification, and account setup." /></div>
      </dialog>
    </figure>
  )
}

const goals = [
  ['01', 'More trust', 'Help people feel confident about joining the community.'],
  ['02', 'Safer accounts', 'Make age-appropriate safeguards part of onboarding.'],
  ['03', 'Easy sign-up', 'Reduce friction on the way into the platform.'],
  ['04', 'Made for you', 'Connect onboarding to each person’s goals.'],
]

export default function SpexVisual({ kind, ageGroup }) {
  if (kind === 'spex-flow') return <SpexWalkthrough key={ageGroup} ageGroup={ageGroup} />
  if (kind === 'spex-process') return <DesignProcess />
  if (kind === 'spex-journey') return <JourneyMap />
  if (kind === 'spex-impact') return (
    <div className="spex-goals" aria-label="Intended outcomes, not measured results">
      {goals.map(([number, title, detail]) => <article key={number}><span>{number} / Goal</span><h3>{title}</h3><p>{detail}</p></article>)}
    </div>
  )
  return (
    <div className="spex-challenge" aria-label="Design priorities">
      <p>One sign-up. Three priorities.</p>
      <ol>
        <li><span>01</span><div><h3>Keep it short</h3><p>Keep the first step clear and approachable.</p></div></li>
        <li><span>02</span><div><h3>Check their age</h3><p>Shape the journey around age constraints.</p></div></li>
        <li><span>03</span><div><h3>Find their goal</h3><p>Athlete, coach, parent, or community member.</p></div></li>
      </ol>
    </div>
  )
}
