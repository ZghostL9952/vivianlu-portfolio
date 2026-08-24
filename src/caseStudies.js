export const caseStudies = {
  sportsexcitement: {
    slug: 'sportsexcitement',
    number: '01',
    theme: 'sports',
    eyebrow: 'SportsExcitement · UX Design Internship',
    title: 'Making sign-up shorter for the people doing the most.',
    summary: 'A community sports platform redesign where roles are earned through actions—not declared through a longer form.',
    heroGraphic: 'sports-phones',
    meta: {
      Role: 'UX Design Intern',
      Team: 'Design, research, product & engineering',
      Timeline: 'Mar – Jun 2026',
      Tools: 'Figma · Figma Make · Claude',
    },
    sections: [
      {
        eyebrow: 'The tension',
        title: 'The more involved you were, the worse sign-up got.',
        paragraphs: [
          'A parent who also plays and coaches could select all three roles. The form responded by stacking all three sets of fields before they had seen anything the app could do.',
          'The assignment was simple to say and complicated to solve: get users into the product faster without losing the information the business still needed.',
        ],
        visual: 'role-stack',
        callout: 'Three roles should unlock more of the product—not create three times the paperwork.',
      },
      {
        eyebrow: 'System thinking',
        title: 'Redesigning the flow, not just the screens.',
        paragraphs: [
          'Every field removed from sign-up needed a new home. I mapped the old flow with the TeamsHub designers and worked with product and engineering to classify each field as must-have, should-have, nice-to-have, or unnecessary.',
          'That turned a visual cleanup into a product decision: assign roles implicitly from the first meaningful action inside the app.',
        ],
        visual: 'field-filter',
        stats: [
          ['7', 'fields kept'],
          ['2', 'sign-up steps'],
          ['3', 'action-based paths'],
        ],
      },
      {
        eyebrow: 'Competitive signal',
        title: 'A proven pattern—with one important gap.',
        paragraphs: [
          'We tested four pathways across TeamSnap, GameChanger, and SportsEngine. GameChanger proved action-based role assignment could lower friction, but every competitor treated parents as secondary.',
          '“Add my child” became a first-class action beside “Join a team” and “Create a team.” The tap assigns the role automatically.',
        ],
        visual: 'action-menu',
        bullets: ['Join a team → Athlete', 'Add my child → Parent', 'Create a team → Coach'],
      },
      {
        eyebrow: 'Outcome',
        title: 'Seven fields, two screens, and a clearer first move.',
        paragraphs: [
          'The final flow keeps only account essentials, adds email verification, and moves role assignment to the home screen. I handed off the design with edge cases and haptic notes to the design and engineering teams.',
          'The feature is currently in implementation and user testing.',
        ],
        visual: 'signup-flow',
      },
    ],
  },
  advisrlab: {
    slug: 'advisrlab',
    number: '02',
    theme: 'advisr',
    eyebrow: 'AdvisrLab · UW iSchool Capstone',
    title: 'Designing an AI advisor that knows when not to answer.',
    summary: 'A source-grounded advising assistant that gives students a fast answer—or a clear path to the right human.',
    heroGraphic: 'advisr-chat',
    meta: {
      Role: 'Team Lead · Research · Prompt Engineering',
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
          sample: 'n=14–16',
          items: [
            { value: 56, label: 'Need it now', detail: '56% selected an immediate answer as a reason to use an AI advisor.' },
            { value: 57, label: 'Avoid asking', detail: '57% said they always or often avoid advising questions because of social fear.' },
          ],
        },
        paragraphs: [
          'UW iSchool students were navigating long waits, scattered policy pages, and the social friction of asking a “simple” question. Advisors, meanwhile, were spending limited time on repeatable requests.',
          'As team lead, I guided research, product scope, and prompt design for a five-person capstone team. Our goal was not to replace advisors; it was to make routine help immediate without making high-stakes guidance reckless.',
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
          'We converted official advising content into a focused Markdown knowledge base, then separated facts from behavior rules so either layer could be maintained without rewriting the whole agent.',
          'Every question followed one of three paths: answer from an approved source, ask for the one detail that changes the answer, or escalate with a single best next step. Responses exposed the source and confidence instead of hiding the system’s limits.',
        ],
        visual: 'advisr-system',
      },
      {
        eyebrow: 'Outcome',
        title: 'A safer MVP and an honest boundary.',
        paragraphs: [
          'Testing with 5+ iSchool students led us to add clarifying questions, cautious handling for graduation decisions, official course titles, and condition-based answers for policies such as add codes.',
          'We delivered the prompt system, curated source files, escalation logic, and a maintainable handoff package. The MVP still had real constraints: no student-record access, no live data, and manual content updates—so the product was positioned as a first line of support, never the final authority.',
        ],
        visual: 'advisr-outcome',
        callout: 'Success was not answering everything. It was making the next safe step obvious.',
      },
    ],
  },
  somacanvas: {
    slug: 'somacanvas',
    number: '03',
    theme: 'soma',
    eyebrow: 'SomaCanvas · Interaction Design',
    title: 'What if your body was the brush?',
    summary: 'A browser-based gesture drawing tool that turns imprecision into texture—and creating into play.',
    heroGraphic: 'soma-canvas',
    meta: {
      Role: 'Team Lead · UX Designer · Prototyping',
      Team: 'Zima Blue · 3 people',
      Timeline: 'Apr – Jun 2026',
      Tools: 'MediaPipe · Figma · Claude Code',
    },
    sections: [
      {
        eyebrow: 'The premise',
        title: 'Precision was the barrier—not creativity.',
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
          'SomaCanvas uses MediaPipe hand tracking in the browser. A pointing finger creates a fine jiggly line, an open palm makes a paint splash, and a closed fist becomes the resting state.',
          'The camera feed is the canvas, keeping the body spatially connected to the marks instead of splitting attention between a webcam preview and a blank drawing area.',
        ],
        visual: 'gesture-map',
      },
      {
        eyebrow: 'Evaluation',
        title: 'Confusion became experimentation, then intention.',
        paragraphs: [
          'Seven participants completed three open-ended drawing trials with no tutorial. We measured whether they could learn the gestures and whether making art felt different afterward.',
          'All six participants who completed the comparison said later attempts improved. By the third trial, users described more direction, polish, and engagement.',
        ],
        stats: [
          ['+0.86', 'confidence'],
          ['+0.57', 'comfort'],
          ['−0.43', 'feeling limited'],
        ],
        visual: 'confidence-chart',
      },
      {
        eyebrow: 'What broke',
        title: 'Feedback mattered more than precision.',
        paragraphs: [
          'Without a cursor, users could not connect their hand position to the output. We added a visible tracking point and clearer recognition states so people could distinguish their gesture from a system failure.',
          'We also removed the eraser. It implied there were mistakes to fix, contradicting the project’s core philosophy. Undo stayed; perfectionism did not.',
        ],
        visual: 'feedback-loop',
        bullets: ['Visible cursor position', 'Clear gesture-recognition state', 'Higher confidence thresholds', 'No eraser'],
      },
      {
        eyebrow: 'Next iteration',
        title: 'From playful demo to reflective practice.',
        paragraphs: [
          'The next version explores mood-based color palettes, a drawing calendar, better onboarding, and broader testing with motor-impaired users, older adults, and children.',
          'The early study suggests the abstract output model works. The next question is whether it works for the people most excluded by conventional drawing tools.',
        ],
        visual: 'mood-calendar',
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
        eyebrow: 'The tension',
        title: 'Real products looked like ads.',
        paragraphs: [
          'Product carousels and membership banners used the same visual patterns people have learned to skip. Underneath, seventeen overlapping categories repeated across menus.',
          'Nothing was technically broken. The page simply asked every element to compete for attention at once.',
        ],
        visual: 'attention-map',
        callout: 'The page did not look bad. It asked too much of the person reading it.',
      },
      {
        eyebrow: 'Information architecture',
        title: 'Cut 17 categories to 12.',
        paragraphs: [
          'We defined one label per concept and benchmarked the taxonomy against Sam’s Club. Duplicates, misplaced items, and categories too narrow to browse by came out.',
          'Hick’s Law framed the choice cost. Miller’s Law helped us turn twelve isolated decisions into one chunked visual group.',
        ],
        stats: [
          ['17', 'categories before'],
          ['12', 'categories after'],
          ['1', 'controlled vocabulary'],
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
        eyebrow: 'Outcome',
        title: 'A blueprint for the rest of the store.',
        paragraphs: [
          'The redesigned Electronics section uses twelve categories, one navigation system, clearer product cards, and grouped search suggestions.',
          'A future round should validate the taxonomy with Costco shoppers through card sorting and connect online browsing more directly to nearby warehouse inventory.',
        ],
        visual: 'costco-blueprint',
      },
    ],
  },
}

export const caseStudyOrder = ['sportsexcitement', 'advisrlab', 'somacanvas', 'costco']
