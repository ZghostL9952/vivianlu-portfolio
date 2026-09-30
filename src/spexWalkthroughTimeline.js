// Coordinates use the original 390 × 844 Figma exports.
const adultStages = [
  { id: 'splash', chapter: 0, asset: 'SplashScreen', duration: 2800, title: 'Welcome to SPEX', description: 'SPEX appears, then a tap on Sign Up starts the journey.', clicks: [[2200, 195, 702]] },
  { id: 'birthday', chapter: 1, asset: 'Birthday', duration: 5000, title: 'Start with age', description: 'Enter a birthday to follow the adult sign-up path.', clicks: [[600, 69, 277], [1800, 186, 277], [2900, 303, 277], [4400, 195, 482]] },
  { id: 'account', chapter: 2, asset: 'CreateAccount', duration: 9200, title: 'Make an account', description: 'Fill in the account details, check the password, and open the terms.', clicks: [[500, 95, 239], [1900, 275, 239], [3000, 178, 333], [5000, 175, 453], [6800, 331, 454], [7600, 331, 454], [8500, 28, 623]] },
  { id: 'terms', chapter: 3, asset: 'Terms', duration: 3000, title: 'Read the terms', description: 'Open the terms of service before accepting and continuing.', clicks: [[2350, 284, 766]] },
  { id: 'accepted', chapter: 3, asset: 'CreateAccount', duration: 1600, title: 'Agree and go on', description: 'The checked box confirms acceptance; the account details stay in place.', clicks: [[1050, 195, 693]] },
  { id: 'verification', chapter: 4, asset: 'EmailVerification', duration: 5200, title: 'Check your email', description: 'Enter the six-digit code, then tap Verify Email.', clicks: [[600, 45, 265], [4500, 195, 406]] },
  { id: 'roles', chapter: 5, asset: 'RoleSelection-neutral', duration: 9000, title: 'Pick your role', description: 'Explore Coach, Parent, and Community member, then continue as an Athlete.', clicks: [[900, 70, 410], [1900, 70, 410], [2900, 70, 507], [3900, 70, 507], [4900, 63, 643], [5900, 63, 643], [6900, 70, 316], [8200, 195, 727]] },
  { id: 'sports', chapter: 6, asset: 'SportsChips-neutral', duration: 6000, title: 'Pick your sports', description: 'Select Baseball and Cycling, then continue with those interests.', clicks: [[1000, 208, 351], [2600, 71, 519], [4700, 195, 733]] },
]

function createFlow({ stages, chapters, ...details }) {
  let duration = 0
  const timedStages = stages.map((stage) => {
    const timed = { ...stage, start: duration }
    duration += stage.duration
    return timed
  })
  const assets = [...new Set(timedStages.map(({ asset }) => asset))]
  if (timedStages.some(({ id }) => id === 'roles')) {
    assets.push('role-athlete', 'role-community', 'sport-baseball', 'sport-cycling')
    if (details.key === 'adult') assets.push('role-coach', 'role-parent')
  }
  return { ...details, stages: timedStages, chapters, duration, assets }
}

const chapters = ['Welcome', 'Birthday', 'Account', 'Terms', 'Verify email', 'Your role', 'Sports']
const year = new Date().getFullYear()
adultStages.find(({ id }) => id === 'roles').roleChanges = [[900, 'coach'], [1900, null], [2900, 'parent'], [3900, null], [4900, 'community'], [5900, null], [6900, 'athlete']]

export const walkthroughFlows = {
  '18+': createFlow({
    key: 'adult', label: '18+', birthdayYear: String(year - 22), accountOffset: 0, checkboxOffset: 0,
    stages: adultStages, chapters,
    completionTitle: 'Ready to play',
    completionDescription: 'Adult sign-up walkthrough complete. Replay or choose a step to take another look.',
  }),
  '13–17': createFlow({
    key: 'teen', label: '13–17', birthdayYear: String(year - 15), accountOffset: 68, checkboxOffset: 48,
    chapters,
    completionTitle: 'Ready to play',
    completionDescription: 'Teen sign-up walkthrough complete, with private account information and an Athlete profile.',
    stages: adultStages.map((stage) => {
      if (stage.id === 'birthday') return { ...stage, description: 'Enter a birthday to follow the teen sign-up path.' }
      if (stage.id === 'account') return {
        ...stage, asset: 'TeenAccount', title: 'Keep your details private',
        description: 'The account screen explains that information defaults to private. Fill in the details, then review the terms.',
        clicks: stage.clicks.map(([time, x, y]) => [time, x, y + (y === 623 ? 48 : 68)]),
      }
      if (stage.id === 'accepted') return { ...stage, asset: 'TeenAccount', clicks: [[1050, 195, 733]] }
      if (stage.id === 'roles') return {
        ...stage, asset: 'TeenRoles-neutral', duration: 5600,
        description: 'Choose between Athlete and Community member. Explore Community member, then continue as an Athlete.',
        clicks: [[900, 63, 451], [2300, 63, 451], [3600, 70, 316], [5000, 195, 535]],
        roleChanges: [[900, 'community'], [2300, null], [3600, 'athlete']],
      }
      return stage
    }),
  }),
  'Under 13': createFlow({
    key: 'child', label: 'Under 13', birthdayYear: String(year - 10),
    chapters: ['Welcome', 'Birthday', 'Ask a parent', 'Confirmation'],
    completionTitle: 'A parent can help',
    completionDescription: 'The confirmation explains that a parent or guardian can create an account and add an athlete profile.',
    stages: [
      adultStages[0],
      { ...adultStages[1], description: 'An under-13 birthday leads to the parent or guardian handoff.' },
      { id: 'parent', chapter: 2, asset: 'Under13Link', duration: 5200, title: 'Ask a parent for help', description: 'Explain the age restriction, enter a parent or guardian’s contact details, and tap Send request.', clicks: [[650, 192, 489], [4400, 195, 551]] },
      { id: 'request-sent', chapter: 3, asset: 'Under13Sent', duration: 3200, title: 'Request sent', description: 'Show that the request has been sent and explain how a parent or guardian can help.', clicks: [] },
    ],
  }),
}

// Adult exports are retained for the existing sequence checks.
export const walkthroughStages = walkthroughFlows['18+'].stages
export const walkthroughDuration = walkthroughFlows['18+'].duration
export const walkthroughChapters = chapters
export const sampleAccount = { first: 'Jordan', last: 'Lee', email: 'jordan.lee@example.com', password: 'PlayTogether!24', code: '482916', guardianEmail: 'guardian.lee@example.com' }

export function frameAt(time, flow = walkthroughFlows['18+']) {
  const elapsed = Math.max(0, Math.min(time, flow.duration))
  const stage = flow.stages.find((item) => elapsed < item.start + item.duration) || flow.stages.at(-1)
  const local = elapsed - stage.start
  const role = stage.roleChanges?.findLast(([at]) => local >= at)?.[1] ?? null
  return { stage, local, role, baseball: stage.id === 'sports' && local >= 1000, cycling: stage.id === 'sports' && local >= 2600, complete: elapsed >= flow.duration }
}

export function typed(value, local, start, duration) {
  const count = Math.floor(Math.max(0, Math.min(1, (local - start) / duration)) * value.length)
  return value.slice(0, count)
}

export function cursorAt(stage, local) {
  let previous = [0, 330, 755]
  for (const click of stage.clicks) {
    if (local < click[0]) {
      const movementStart = Math.max(0, click[0] - 550)
      const progress = Math.max(0, Math.min(1, (local - movementStart) / (click[0] - movementStart)))
      const eased = progress * progress * (3 - 2 * progress)
      return { x: previous[1] + (click[1] - previous[1]) * eased, y: previous[2] + (click[2] - previous[2]) * eased, pulse: null }
    }
    if (local - click[0] < 420) return { x: click[1], y: click[2], pulse: (local - click[0]) / 420 }
    previous = click
  }
  return { x: previous[1], y: previous[2], pulse: null }
}
