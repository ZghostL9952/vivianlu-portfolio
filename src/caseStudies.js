// Edit case-study copy and section order here. Keys/slugs must match App.jsx projects.
// theme selects .theme-* styles; section.visual selects CaseGraphic or SpexVisual.
// fullWidth expands a section; hideVisual suppresses its graphic.
// sectionGroups.indices are zero-based positions in sections: update them after reordering.
// The group id "solution" renders SPEX age tabs, whose ageGroup must match walkthroughFlows.
export const caseStudies = {
  sportsexcitement: {
    slug: 'sportsexcitement',
    number: '01',
    theme: 'sports',
    eyebrow: 'SportsExcitement · UX Design Internship',
    title: 'Sports start here.',
    summary: 'Designing a short, age-aware sign-up experience that connects people to the sports and communities they care about.',
    heroGraphic: 'sports-phones',
    meta: {
      Role: 'UX Design Intern',
      Team: 'Product, design & engineering',
      'Tools used': 'Figma, User interviews, Competitive analysis, WCAG 2.1 AA checks',
      Focus: 'Registration & onboarding',
    },
    sectionGroups: [
      { id: 'overview', label: 'Overview', indices: [0] },
      { id: 'challenge', label: 'Challenge', indices: [1] },
      { id: 'process', label: 'Design process', indices: [2, 3] },
      { id: 'solution', label: 'Solution', title: 'Easy sign-up', indices: [4, 5, 6] },
      { id: 'impact', label: 'Impact', indices: [7] },
    ],
    sections: [
      {
        eyebrow: 'Overview',
        title: 'A place to play together.',
        paragraphs: [
          'SPEX is a youth sports and community platform that connects athletes, parents, coaches, teams, sponsors, businesses, and local communities in a safe, engaging, and inclusive space. It brings registration, sign-in, community engagement, and coach management together to help people organize sports, training, and events.',
        ],
        hideVisual: true,
      },
      {
        eyebrow: 'Challenge',
        title: 'Make sign-up safe and easy.',
        paragraphs: [
          'Designing for a community that includes minors brings safety and privacy to the center of onboarding. COPPA and other applicable laws were part of the constraints we needed to consider alongside a welcoming first experience.',
          'The challenge was to keep sign-up short while introducing age restrictions and tailoring the experience to each person’s goal: joining as an athlete, coach, parent, or community member.',
        ],
        hideVisual: true,
        fullWidth: true,
        callout: 'How might we make the first step feel simple while respecting different ages, responsibilities, and goals?'
      },
      {
        eyebrow: 'Design process',
        title: 'What shaped my design decisions.',
        paragraphs: [
          'I started by talking with people who used competing sports platforms to understand where registration became frustrating. Alongside competitive analysis, those conversations helped me shape a sign-up journey around the different needs of coaches, parents, athletes, and community members, leading to 3 priorities:',
        ],
        visual: 'spex-challenge',
        fullWidth: true,
      },
      {
        // title: 'User journey mapping',
        paragraphs: [
          'The 3 priorities shaped the registration map: where someone enters, how age changes their path, and where a parent becomes part of the experience. It provides a shared reference for connecting individual screens into a coherent sign-up flow.',
        ],
        visual: 'spex-journey',
        fullWidth: true,
      },
      {
        eyebrow: 'Solution · 18+',
        title: 'Adults: 18+',
        paragraphs: [
          'The adult experience focuses on a short path into SPEX, with onboarding personalized around what someone wants to do as an athlete, coach, parent, or community member.',
        ],
        visual: 'spex-flow',
        ageGroup: '18+',
        fullWidth: true,
      },
      {
        eyebrow: 'Solution · 13–17',
        title: 'Teens: 13–17',
        paragraphs: [
          'The teen journey follows the same core steps as adult sign-up, with a clear message that account information defaults to private. Role selection is limited to Athlete and Community member, keeping the choices relevant to this age group.',
        ],
        visual: 'spex-flow',
        ageGroup: '13–17',
        fullWidth: true,
      },
      {
        eyebrow: 'Solution · Under 13',
        title: 'Kids: under 13',
        paragraphs: [
          'An under-13 birthday leads to a parent or guardian handoff. Instead of continuing to account creation, the child can enter a parent’s contact details to request help; a confirmation explains that the parent can create an account and add an athlete profile.',
        ],
        visual: 'spex-flow',
        ageGroup: 'Under 13',
        fullWidth: true,
      },
      {
        eyebrow: 'Impact',
        title: 'Fewer fields, more signups',
        paragraphs: [
          'I cut the upfront registration fields in half by removing information already collected during team setup and verification. Signups increased 11% following the redesign.',
          'The five-step flow shipped across mobile and desktop in collaboration with product managers and engineers, with age and privacy requirements refined through team critiques and WCAG 2.1 AA checks.',
        ],
        visual: 'spex-impact',
        hideVisual: true,
        fullWidth: true,
      },
    ],
  },
  advisrlab: {
    slug: 'advisrlab',
    number: '02',
    theme: 'advisr',
    eyebrow: 'AdvisrLab · UW iSchool Capstone',
    title: 'AI advisor that knows when to stop answering.',
    summary: 'A source-grounded advising assistant that gives students a fast answer—or a clear path to the right human.',
    heroGraphic: 'advisr-chat',
    meta: {
      Role: 'Product Lead · Research · Prompt Design',
      Team: '5 people',
      Timeline: 'Jan – May 2026',
      Tools: 'UW Purple AI · Figma · Miro',
    },
    sections: [
      {
        eyebrow: 'Overview',
        title: 'Students needed faster, lower-pressure advising.',
        overviewChart: {
          title: 'Early student survey',
          sample: 'n=20',
          items: [
            { value: 56, label: 'Need it now', detail: '56% selected an immediate answer as a reason to use an AI advisor.' },
            { value: 57, label: 'Avoid asking', detail: '57% said they always or often avoid advising questions because of social fear.' },
          ],
        },
        paragraphs: [
          'UW iSchool students were navigating long waits, scattered policy pages, and the social friction of asking a “simple” question. Advisors, meanwhile, were spending limited time on repeatable requests.',
          'As Product Lead, I guided a five-person capstone team through research, product scope, and prompt design. Interviews with 3 advisors and 2 peer advisors, alongside a survey of 20 Informatics students, shifted our focus from answering as many questions as possible to providing guidance backed by official sources.',
        ],
        visual: 'advisr-context',
        callout: 'Fast answers only help when students can see why they should trust them.',
      },
      {
        eyebrow: 'Define',
        title: 'Trust was not a badge. It was a behavior.',
        paragraphs: [
          'Our survey showed speed and scattered information tied as the top pain points. But when we asked what would make an advising bot trustworthy, students chose evidence and a way out.',
          'That reframed the task: the bot had to show its source, admit uncertainty, and hand off questions that depended on a student record or advisor authority.',
        ],
        visual: 'advisr-trust',
      },
      {
        eyebrow: 'Design',
        title: 'We designed a decision system, not a chatbot personality.',
        paragraphs: [
          'We achieved 96% accuracy in answering questions from iSchool FAQ list during internal testing. The bot was able to ask follow up questions 73% of the time. Limitations due to model usage and the nature of AI limitations.',
        ],
        visual: 'advisr-system',
        graphicBeforeText: true,
        portal: true,
        fullWidth: true,
      },
      {
        eyebrow: 'Outcome',
        title: 'A board-approved pilot',
        paragraphs: [
          'Testing with 8 students and advisors helped us refine when the assistant should answer, ask for more context, or escalate to a person. Those sessions informed the agent’s response rules and its handling of questions that needed advisor judgment.',
          'I presented our research and prototypes to advisors, UW IT, and the advising board, then incorporated their feedback and documented the handoff. The board-approved pilot is now live on the iSchool’s internal website. Its scope remains a first line of support, with no student-record access or live registration data and with source content maintained manually.',
        ],
        visual: 'advisr-outcome',
        fullWidth: true,
      },
    ],
  },
  somacanvas: {
    slug: 'somacanvas',
    number: '03',
    theme: 'soma',
    eyebrow: 'SomaCanvas · Interaction Design',
    title: 'What if your body was the brush?',
    summary: 'A browser-based gesture drawing tool that turns imprecision into texture, and creating into play.',
    heroGraphic: 'soma-canvas',
    meta: {
      Role: 'Team Lead & UX Designer',
      Team: 'Zima Blue · 3 people',
      Timeline: 'Apr – Aug 2026',
      Tools: 'React · MediaPipe · Figma · Claude Code · Codex',
    },
    sections: [
      {
        eyebrow: 'Overview',
        title: 'Precision was the barrier, not creativity.',
        paragraphs: [
          'Most digital art tools assume steady hands, complex toolbars, and pixel-level control. We asked whether natural hand movement could be enough to make something beautiful.',
          'Abstract output changed tracking noise from a defect into an aesthetic. A wobbly line was no longer a mistake; it was texture.',
        ],
        visual: 'gesture-tools',
        callout: 'Interaction should feel like play. Output should reward exploration.',
      },
      {
        eyebrow: 'Interaction model',
        title: 'Your hand shape is the tool.',
        paragraphs: [
          'I designed and built SomaCanvas with React and MediaPipe to turn hand gestures into abstract drawing without precise cursor control. Five gestures become a rest state, magnetic circles, liquid edits, twin-finger ribbons, and orbital constellations.',
          'The camera feed is the canvas, keeping the body spatially connected to the marks instead of splitting attention between a webcam preview and a blank drawing area.',
        ],
        visual: 'gesture-map',
      },
      {
        eyebrow: 'Color system',
        title: 'Color should invite play, not another decision.',
        paragraphs: [
          'We started with random colors so people could move straight into making. Choosing a palette up front felt like another test of taste—the opposite of the freedom and play we wanted SomaCanvas to create.',
          'I later designed a mood check-in that sets the palette’s dominant color family when someone enters the site. The system makes the first choice; people who want more control can still open Settings and fine-tune it with a hidden color wheel.',
        ],
        visual: 'soma-palette',
        callout: 'Default to freedom. Reveal precision only when someone asks for it.',
      },
      {
        eyebrow: 'Evaluation',
        title: 'Confusion became experimentation, then intention.',
        paragraphs: [
          'We evaluated SomaCanvas with 7 participants across 3 open-ended drawing trials. Average self-reported creative confidence rose from 2.43 to 3.29 on a 5-point scale after use.',
          'All six participants who completed the comparison said later attempts improved. By the third trial, users described more direction, polish, and engagement.',
        ],
        visual: 'confidence-chart',
        followup: {
          title: 'Feedback mattered more than precision.',
          paragraphs: [
            'The clearest usability issue was feedback, not precision. Without a cursor, users could not connect their hand position to the output, so we added a visible tracking point, clearer recognition states, and higher confidence thresholds.',
            'We also removed the eraser. It implied there were mistakes to fix, contradicting the project’s core philosophy. Undo stayed; perfectionism did not.',
          ],
        },
      },
      {
        eyebrow: 'Next iteration',
        title: 'From playful demo to reflective practice.',
        paragraphs: [
          'The next version explores a drawing calendar, better onboarding, and broader testing with motor-impaired users, older adults, and children.',
          'The early study suggests the abstract output model works. The next question is whether it works for the people most excluded by conventional drawing tools.',
        ],
        visual: 'mood-calendar',
        hideVisual: true,
      },
    ],
  },
  costco: {
    slug: 'costco',
    number: '04',
    theme: 'costco',
    eyebrow: 'Costco Electronics · Information Architecture',
    title: 'A page that stopped competing with itself.',
    summary: 'A redesign of Costco Electronics that reduces choice overload, clarifies product hierarchy, and makes search easier to scan.',
    heroGraphic: 'costco-browser',
    meta: {
      Role: 'UX Design · Information Architecture',
      Team: '4 people',
      Timeline: 'Sep – Dec 2023',
      Tools: 'Figma · Whiteboard · Sticky notes',
    },
    sections: [
      {
        eyebrow: 'Overview',
        title: 'A clearer hierarchy from browse to decision.',
        paragraphs: [
          'The redesign reorganized Costco Electronics around how shoppers browse, compare, and search. It reduced seventeen overlapping categories to twelve, clarified the information priority within product cards, and grouped search suggestions by intent.',
          'Together, these changes create a more legible path from entering Electronics to choosing a product—fewer competing options, faster scanning, and clearer next actions.',
        ],
        visual: 'attention-map',
        callout: 'One consistent information hierarchy now connects category browsing, product comparison, and search.',
      },
      {
        eyebrow: 'Redesign',
        title: 'Cut 17 categories to 12.',
        paragraphs: [
          'We defined one label per concept and benchmarked the taxonomy against Sam’s Club. Duplicates, misplaced items, and categories too narrow to browse by came out.',
          'Hick’s Law framed the choice cost. Miller’s Law helped us turn twelve isolated decisions into one chunked visual group.',
        ],
        visual: 'category-grid',
      },
      {
        eyebrow: 'Product hierarchy',
        title: 'Answer “is this the one?” first.',
        paragraphs: [
          'The primary action and product differentiators moved up. Savings, price, name, rating, and membership status became an intentional reading order instead of a stack of equally weighted details.',
          'The redesigned card surfaces the information needed to compare before everything else.',
        ],
        visual: 'product-compare',
      },
      {
        eyebrow: 'Search',
        title: 'Group before the user has to.',
        paragraphs: [
          'Search suggestions moved from one mixed list into department groups. Gestalt proximity performs the first filtering step visually, helping users distinguish a camera from lens wipes without reading every result.',
        ],
        visual: 'search-groups',
      },
      {
        eyebrow: 'Measurable impact',
        title: 'A framework for measuring redesign impact.',
        paragraphs: [
          'The redesigned Electronics section uses twelve categories, one navigation system, clearer product cards, and grouped search suggestions.',
          'Because a full usability study has not yet been conducted, these proposed benchmarks define what a future comparative test with Costco shoppers should measure.',
        ],
        visual: 'costco-impact',
      },
    ],
  },
}

// Order for the "More projects" links; homepage card order is set separately in App.jsx.
export const caseStudyOrder = ['sportsexcitement', 'advisrlab', 'somacanvas', 'costco']
