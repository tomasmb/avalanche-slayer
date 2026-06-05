import { DecisionRecord, SourceRecord, Topic } from "@/lib/types";

export const sourceLibrary: SourceRecord[] = [
  {
    id: "avcan-training",
    title: "Avalanche Canada Training",
    url: "https://avalanche.ca/training",
    publisher: "Avalanche Canada",
    category: "avalanche-curriculum",
    note:
      "Defines the AST 1, MAT, Companion Rescue, and AST 2 progression and learning outcomes.",
  },
  {
    id: "avy-savvy",
    title: "Avy Savvy Online Tutorial",
    url: "https://avysavvy.avalanche.ca/en-ca",
    publisher: "Avalanche Canada",
    category: "avalanche-curriculum",
    note:
      "Provides the backbone topic map for fundamentals, terrain, forecasts, daily process, and rescue refresh.",
  },
  {
    id: "ates",
    title: "The Avalanche Terrain Exposure Scale",
    url: "https://avysavvy.avalanche.ca/en-ca/the-avalanche-terrain-exposure-scale",
    publisher: "Avalanche Canada",
    category: "terrain",
    note:
      "Grounds the simple / challenging / complex terrain model and terrain-classification drills.",
  },
  {
    id: "avaluator",
    title: "The Avaluator Trip Planner",
    url: "https://avysavvy.avalanche.ca/en-ca/the-avaluator-trip-planner",
    publisher: "Avalanche Canada",
    category: "decision-making",
    note:
      "Supports pre-trip route appropriateness logic by combining ATES exposure with daily danger.",
  },
  {
    id: "online-trip-planner",
    title: "Online Trip Planner",
    url: "https://avysavvy.avalanche.ca/en-ca/online-trip-planner",
    publisher: "Avalanche Canada",
    category: "decision-making",
    note:
      "Extends Avaluator planning into mapped terrain with current danger overlays, trail context, and ATES downloads.",
  },
  {
    id: "daily-process",
    title: "The Daily Process",
    url: "https://avysavvy.avalanche.ca/en-ca/the-daily-process",
    publisher: "Avalanche Canada",
    category: "decision-making",
    note:
      "Defines the pre-trip and on-trip checklist sequence used by the app's trip review mode.",
  },
  {
    id: "danger-scale",
    title: "North American Public Avalanche Danger Scale",
    url: "https://avalanche.org/avalanche-encyclopedia/danger-scale/",
    publisher: "Avalanche.org",
    category: "forecasting",
    note:
      "Frames danger-level interpretation, exponential hazard growth, and travel advice messaging.",
  },
  {
    id: "avalanche-problems",
    title: "Avalanche Problems",
    url: "https://avalanche.org/avalanche-encyclopedia/avalanche/avalanche-problems/",
    publisher: "Avalanche.org",
    category: "forecasting",
    note:
      "Provides the structure of type, distribution, likelihood, and size for forecast drills.",
  },
  {
    id: "human-factors",
    title: "Human Factors",
    url: "https://avalanche.org/avalanche-encyclopedia/human/decision-making/human-factors/",
    publisher: "Avalanche.org",
    category: "decision-making",
    note:
      "Defines heuristic traps and biases that the app treats as review-worthy, high-risk knowledge.",
  },
  {
    id: "companion-rescue",
    title: "Companion Rescue",
    url: "https://avysavvy.avalanche.ca/en-ca/companion-rescue",
    publisher: "Avalanche Canada",
    category: "rescue",
    note:
      "Supports the rescue refresher and the emphasis on rapid, practiced response inside a 10-minute window.",
  },
  {
    id: "aiare-rec",
    title: "AIARE Recreational Avalanche Training",
    url: "https://avtraining.org/recprogram/",
    publisher: "AIARE",
    category: "avalanche-curriculum",
    note:
      "Confirms the U.S. course progression of Avalanche Rescue, AIARE 1, and AIARE 2 with decision-making emphasis.",
  },
  {
    id: "aiare-1",
    title: "AIARE 1",
    url: "https://avtraining.org/aiare-level-1/",
    publisher: "AIARE",
    category: "avalanche-curriculum",
    note:
      "Supports learning outcomes for trip planning, terrain identification, risk framework use, and companion rescue.",
  },
  {
    id: "aiare-2",
    title: "AIARE 2",
    url: "https://avtraining.org/aiare-level-2/",
    publisher: "AIARE",
    category: "avalanche-curriculum",
    note:
      "Supports more advanced terrain, leadership, and decision-making expectations for later-stage learners.",
  },
  {
    id: "dunlosky",
    title:
      "Improving Students' Learning With Effective Learning Techniques",
    url: "https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html/comment-page-1",
    publisher: "Association for Psychological Science",
    category: "learning-science",
    note:
      "Summarizes that practice testing and distributed practice are high-utility techniques across settings.",
  },
  {
    id: "karpicke-roediger",
    title: "The Critical Importance of Retrieval for Learning",
    url: "https://doi.org/10.1126/science.1152408",
    publisher: "Science / AAAS",
    category: "learning-science",
    note:
      "Supports heavy use of retrieval instead of passive rereading as the core study action.",
  },
  {
    id: "roediger-butler",
    title: "The Critical Role of Retrieval Practice in Long-Term Retention",
    url: "https://pubmed.ncbi.nlm.nih.gov/20951630/",
    publisher: "Trends in Cognitive Sciences / PubMed",
    category: "learning-science",
    note:
      "Supports feedback-backed retrieval and the claim that retrieval practice can improve transfer to new contexts.",
  },
  {
    id: "cepeda",
    title:
      "Distributed Practice in Verbal Recall Tasks: A Review and Quantitative Synthesis",
    url: "https://doi.org/10.1037/0033-2909.132.3.354",
    publisher: "American Psychological Association",
    category: "learning-science",
    note:
      "Supports scheduling reviews over time rather than compressing all review into one sitting.",
  },
  {
    id: "bloom-mastery",
    title: "Learning for Mastery",
    url: "https://files.eric.ed.gov/fulltext/ED053419.pdf",
    publisher: "ERIC / Benjamin Bloom",
    category: "learning-science",
    note:
      "Grounds the requirement that learners demonstrate criterion-level performance before moving on.",
  },
];

export const decisionLog: DecisionRecord[] = [
  {
    id: "decision-review-modes",
    decision: "Separate pre-trip, general, topic, scenario, and rescue review modes",
    implementation:
      "The route structure mirrors distinct avalanche education use cases: just-in-time planning, broad refresh, targeted lookup, decision practice, and rescue skill upkeep.",
    sourceIds: ["daily-process", "avcan-training", "aiare-rec"],
  },
  {
    id: "decision-retrieval-first",
    decision: "Use reveal-and-rate flashcards as the default study interaction",
    implementation:
      "The main review loop favors recall before answer reveal and grades confidence to avoid passive reading masquerading as learning.",
    sourceIds: ["karpicke-roediger", "dunlosky"],
  },
  {
    id: "decision-spaced-repetition",
    decision: "Schedule reviews by elapsed time, recent success, and stakes",
    implementation:
      "Cards return sooner after misses, a bit later after shaky retrieval, and later after fluent recall; critical rescue and terrain items stay on a shorter leash.",
    sourceIds: ["cepeda", "dunlosky", "companion-rescue"],
  },
  {
    id: "decision-mastery-gate",
    decision: "Require at least 85% retrieval accuracy plus a passed scenario for mastery",
    implementation:
      "Topic mastery is not granted by exposure alone; learners must meet a criterion and demonstrate transfer in a decision context.",
    sourceIds: ["bloom-mastery", "aiare-1", "avcan-training"],
  },
  {
    id: "decision-scenario-transfer",
    decision: "Use scenario drills to force terrain, forecast, and group-decision transfer",
    implementation:
      "The app pairs concept retrieval with decision drills because avalanche training is about applying knowledge under realistic route and group constraints, not only recalling definitions.",
    sourceIds: ["roediger-butler", "aiare-1", "aiare-2", "avcan-training"],
  },
  {
    id: "decision-terrain-forward",
    decision: "Keep terrain, ATES, and route choice highly visible in the curriculum",
    implementation:
      "The app prioritizes terrain classification because terrain is the stable risk-control lever available to recreationists.",
    sourceIds: ["ates", "avaluator", "avcan-training"],
  },
  {
    id: "decision-forecast-drills",
    decision: "Teach forecast reading through danger-and-problem interpretation drills",
    implementation:
      "Learners practice extracting meaning from danger levels, avalanche problems, and travel advice rather than just reading definitions.",
    sourceIds: ["danger-scale", "avalanche-problems", "avy-savvy"],
  },
  {
    id: "decision-human-factors",
    decision: "Treat human factors as a core topic instead of an optional appendix",
    implementation:
      "The app surfaces heuristic traps alongside terrain and forecast content because accident risk is not only snowpack-driven.",
    sourceIds: ["human-factors", "daily-process"],
  },
  {
    id: "decision-rescue-refresh",
    decision: "Maintain a dedicated rescue refresher mode",
    implementation:
      "Companion rescue is both perishable and high stakes, so the app keeps it quickly accessible from the dashboard.",
    sourceIds: ["companion-rescue", "avcan-training", "aiare-rec"],
  },
];

export const topics: Topic[] = [
  {
    id: "avalanche-foundations",
    slug: "avalanche-foundations",
    title: "Avalanche Foundations",
    strapline: "Know what avalanches are, how they release, and why size matters.",
    level: "foundations",
    stakes: "high",
    summary:
      "Avalanche education starts with recognizing that not all avalanches behave the same way. You need a working vocabulary for release, terrain, size, and consequence before higher-level route decisions make sense.",
    whyItMatters:
      "The rest of the system depends on correctly interpreting what hazard is actually present and how severe the consequences could be.",
    quickHits: [
      "Slab avalanches are the primary killer in recreation settings.",
      "Size ratings express destructive potential, not just crown width.",
      "Avalanche problems describe the hazard situation more usefully than raw avalanche type alone.",
    ],
    objectives: [
      { id: "f-1", text: "Describe the difference between avalanche type and avalanche problem." },
      { id: "f-2", text: "Use destructive size language to estimate consequences." },
      { id: "f-3", text: "Recognize that different avalanche structures lead to different travel choices." },
    ],
    flashcards: [
      {
        id: "f-card-1",
        objectiveId: "f-1",
        prompt: "Why is an avalanche problem more useful for trip planning than avalanche type alone?",
        answer:
          "Because an avalanche problem adds where the problem exists, how likely it is to trigger, and how big it could be, which directly informs travel choices.",
      },
      {
        id: "f-card-2",
        objectiveId: "f-2",
        prompt: "What does a size 2 avalanche imply for a person?",
        answer:
          "It is big enough to bury, injure, or kill a person, so it is fully serious even if it is not a landscape-scale slide.",
      },
      {
        id: "f-card-3",
        objectiveId: "f-1",
        prompt: "What four elements make up an avalanche problem?",
        answer:
          "Problem type, distribution, likelihood of triggering, and expected size.",
      },
      {
        id: "f-card-4",
        objectiveId: "f-3",
        prompt: "What is the travel implication of hearing 'deep persistent slab' compared with 'storm slab'?",
        answer:
          "Deep persistent slabs usually push you toward much more conservative terrain choices because they can be low-probability but high-consequence and difficult to assess.",
      },
    ],
    scenarios: [
      {
        id: "f-scenario-1",
        title: "Problem Framing",
        prompt:
          "The forecast says human-triggered persistent slabs are possible on north through east aspects near treeline and alpine, size 2 to 3. What is the best interpretation?",
        options: [
          "This just names avalanche type, so terrain choice should wait until you dig a pit.",
          "This already describes a problem with location, trigger likelihood, and consequence, so terrain choices should avoid those aspect/elevation combinations.",
          "Because natural avalanches are not mentioned, steeper lines are acceptable with good skiing skills.",
        ],
        correctIndex: 1,
        explanation:
          "The forecast already gives the core problem structure: type, where, how likely, and how big. That is enough to drive conservative route filtering before you enter terrain.",
      },
    ],
    sourceIds: ["avy-savvy", "avalanche-problems"],
    relatedTopicIds: ["forecast-reading", "avalanche-problems-topic"],
  },
  {
    id: "terrain-and-ates",
    slug: "terrain-and-ates",
    title: "Terrain and ATES",
    strapline: "Use terrain as your main risk-control lever.",
    level: "foundations",
    stakes: "critical",
    summary:
      "Terrain is the most stable input in avalanche risk management. While weather and snowpack change, terrain exposure is something you can select deliberately before and during a trip.",
    whyItMatters:
      "Most backcountry users cannot control the hazard itself, but they can choose simpler terrain or routes with more escape and spacing options.",
    quickHits: [
      "Simple terrain offers many ways to reduce or eliminate exposure.",
      "Challenging terrain contains defined avalanche paths or terrain traps but may still offer route options.",
      "Complex terrain has overlapping paths and limited exposure-reduction options.",
    ],
    objectives: [
      { id: "t-1", text: "Classify simple, challenging, and complex terrain in functional terms." },
      { id: "t-2", text: "Recognize terrain traps and overhead exposure." },
      { id: "t-3", text: "Explain why ATES is useful for pre-trip route filtering." },
    ],
    flashcards: [
      {
        id: "t-card-1",
        objectiveId: "t-1",
        prompt: "What makes terrain 'simple' in the ATES system?",
        answer:
          "Exposure is mostly low-angle or primarily forested, with many options to reduce or eliminate avalanche exposure.",
      },
      {
        id: "t-card-2",
        objectiveId: "t-2",
        prompt: "Why can a low-angle gully still be dangerous?",
        answer:
          "It can act as a terrain trap or runout zone, making even a smaller avalanche much more consequential.",
      },
      {
        id: "t-card-3",
        objectiveId: "t-1",
        prompt: "What is the defining challenge of complex terrain?",
        answer:
          "Multiple overlapping avalanche paths or broad steep terrain with few good options to meaningfully reduce exposure.",
      },
      {
        id: "t-card-4",
        objectiveId: "t-3",
        prompt: "Why is ATES useful before you even see today's forecast?",
        answer:
          "Because it tells you the baseline exposure of the route, helping you decide whether the trip fits the day before you commit.",
      },
    ],
    scenarios: [
      {
        id: "t-scenario-1",
        title: "Slope With a Trap",
        prompt:
          "Your route option crosses a short steep roll above a terrain trap, but most of the day is mellow forest travel. Which ATES idea should dominate your decision?",
        options: [
          "The mellow majority of the route means the whole trip is effectively simple.",
          "Short but consequential avalanche features and terrain traps matter; one bad crossing can change the seriousness of the route.",
          "Terrain traps only matter under High or Extreme danger.",
        ],
        correctIndex: 1,
        explanation:
          "ATES and terrain assessment focus on exposure and consequences, not average pleasantness. A short, serious crossing can be the decisive risk feature.",
      },
    ],
    sourceIds: ["ates", "avy-savvy"],
    relatedTopicIds: ["trip-planning", "danger-and-forecast"],
  },
  {
    id: "danger-and-forecast",
    slug: "danger-and-forecast",
    title: "Danger Ratings and Forecast Reading",
    strapline: "Translate the bulletin into travel consequences.",
    level: "foundations",
    stakes: "critical",
    summary:
      "The danger rating is not a go / no-go color wheel. It expresses the likelihood, size, and distribution of expected avalanches, typically across elevation bands.",
    whyItMatters:
      "A learner who can read the forecast well can start making safer route filters before the group reaches the trailhead.",
    quickHits: [
      "Danger rises exponentially between the five levels.",
      "Ratings are often given separately for alpine, treeline, and below treeline.",
      "Considerable is especially dangerous because many people underestimate it.",
    ],
    objectives: [
      { id: "d-1", text: "Explain what a danger rating communicates." },
      { id: "d-2", text: "Interpret elevation-band differences." },
      { id: "d-3", text: "Translate travel advice into terrain choices." },
    ],
    flashcards: [
      {
        id: "d-card-1",
        objectiveId: "d-1",
        prompt: "What variables underpin the public danger rating?",
        answer:
          "Likelihood, expected size, and distribution of avalanches.",
      },
      {
        id: "d-card-2",
        objectiveId: "d-2",
        prompt: "Why do alpine, treeline, and below-treeline ratings matter?",
        answer:
          "Because avalanche conditions can differ significantly by elevation, exposure to wind, tree cover, and terrain complexity.",
      },
      {
        id: "d-card-3",
        objectiveId: "d-3",
        prompt: "What is the key travel takeaway under High danger?",
        answer:
          "Avoid avalanche terrain and use extra caution even in simple terrain that could still be exposed from above.",
      },
      {
        id: "d-card-4",
        objectiveId: "d-3",
        prompt: "Why is Considerable danger often deceptive?",
        answer:
          "Because dangerous conditions exist, but the hazard may look less obvious than under High, leading people to drift into poor terrain choices.",
      },
    ],
    scenarios: [
      {
        id: "d-scenario-1",
        title: "Mixed Elevation Forecast",
        prompt:
          "The forecast is Moderate below treeline, Considerable at treeline, and High in the alpine. Your route climbs to treeline meadows below larger bowls. What is the best reading?",
        options: [
          "Because the route never enters the alpine bowls, the day is effectively Moderate.",
          "Treeline is already a meaningful problem zone, and overhead exposure from higher terrain still matters.",
          "Below-treeline ratings always override the others when the parking lot is in the trees.",
        ],
        correctIndex: 1,
        explanation:
          "Treeline has its own rating for a reason, and overhead hazard can connect you to worse terrain above even if you do not intend to ski the bowls.",
      },
    ],
    sourceIds: ["danger-scale", "avy-savvy"],
    relatedTopicIds: ["avalanche-problems-topic", "terrain-and-ates"],
  },
  {
    id: "avalanche-problems-topic",
    slug: "avalanche-problems",
    title: "Avalanche Problems",
    strapline: "Know what kind of problem you are managing today.",
    level: "intermediate",
    stakes: "high",
    summary:
      "Forecasts become practical when you can tie each avalanche problem to likely terrain, expected triggers, and the kind of caution it demands.",
    whyItMatters:
      "Problem literacy is what turns a danger number into route choice, spacing, slope filtering, and humility.",
    quickHits: [
      "Storm slabs and wind slabs often demand tight attention to recent loading.",
      "Persistent and deep persistent slabs can remain dangerous despite fewer obvious clues.",
      "Loose wet, loose dry, and cornice problems create different management needs than slab problems.",
    ],
    objectives: [
      { id: "p-1", text: "Identify how common avalanche problems differ in behavior and management." },
      { id: "p-2", text: "Use problem location and size to narrow terrain choices." },
      { id: "p-3", text: "Recognize when lower likelihood does not mean low consequence." },
    ],
    flashcards: [
      {
        id: "p-card-1",
        objectiveId: "p-1",
        prompt: "What makes persistent slab problems tricky compared with many storm slab problems?",
        answer:
          "They can linger, be harder to predict with simple tests, and still produce large consequences even when obvious signs are sparse.",
      },
      {
        id: "p-card-2",
        objectiveId: "p-2",
        prompt: "What should you do first when a forecast lists a wind slab problem on lee terrain near ridgelines?",
        answer:
          "Filter out the specific wind-loaded terrain features and aspect/elevation combinations where the problem is expected.",
      },
      {
        id: "p-card-3",
        objectiveId: "p-3",
        prompt: "Why can a low-probability / high-consequence deep persistent slab still justify a conservative plan?",
        answer:
          "Because one trigger may produce a very large avalanche with poor odds for rescue, so the consequence side of risk stays high.",
      },
      {
        id: "p-card-4",
        objectiveId: "p-1",
        prompt: "What four descriptors should you pull from each avalanche problem?",
        answer:
          "Type, where it is distributed, how likely it is to trigger, and expected size.",
      },
    ],
    scenarios: [
      {
        id: "p-scenario-1",
        title: "Persistent Slab Day",
        prompt:
          "Today's bulletin lists a persistent slab problem as 'possible to likely' on shaded treeline and alpine slopes, size 2 to 3. Your partner says there were no whumpfs on the approach, so the danger is probably overstated. Best response?",
        options: [
          "Lack of whumpfs means the slope is green-lit if skiing quality is good.",
          "Persistent slabs can still be dangerous without dramatic clues, so route choices should stay conservative.",
          "The absence of cracking proves that only storm slab terrain needs to be avoided.",
        ],
        correctIndex: 1,
        explanation:
          "Persistent slab problems are specifically notorious for hiding behind weak surface clues while still producing serious outcomes.",
      },
    ],
    sourceIds: ["avalanche-problems", "avy-savvy"],
    relatedTopicIds: ["danger-and-forecast", "signs-and-slope-eval"],
  },
  {
    id: "trip-planning",
    slug: "trip-planning",
    title: "Trip Planning and the Avaluator",
    strapline: "Match route exposure to the day before you leave the trailhead.",
    level: "intermediate",
    stakes: "critical",
    summary:
      "Trip planning is where the day's danger and the route's terrain exposure first meet. The Avaluator helps decide whether your chosen trip belongs in normal caution, extra caution, or not recommended territory.",
    whyItMatters:
      "The safest line you will ever choose is usually the one you reject before you start walking.",
    quickHits: [
      "The Avaluator combines ATES exposure and the day's danger.",
      "A strong Plan B is a required feature, not a luxury.",
      "Using group communication early reduces pressure-driven decision drift later.",
    ],
    objectives: [
      { id: "tp-1", text: "Use the Avaluator logic to filter route choices." },
      { id: "tp-2", text: "Explain why Plan B belongs in every trip plan." },
      { id: "tp-3", text: "Connect daily danger to route appropriateness, not just to slope anxiety." },
    ],
    flashcards: [
      {
        id: "tp-card-1",
        objectiveId: "tp-1",
        prompt: "What two inputs does the Avaluator Trip Planner combine?",
        answer:
          "The ATES rating of the route and the day's avalanche danger rating.",
      },
      {
        id: "tp-card-2",
        objectiveId: "tp-2",
        prompt: "Why is a Plan B essential even when the primary plan looks reasonable at breakfast?",
        answer:
          "Because conditions or group reality may not match expectations, and switching early to simpler terrain is often the best move.",
      },
      {
        id: "tp-card-3",
        objectiveId: "tp-3",
        prompt: "What does 'extra caution' imply on the Avaluator?",
        answer:
          "The trip may still be possible, but it demands advanced understanding, constant slope evaluation, and disciplined travel habits.",
      },
      {
        id: "tp-card-4",
        objectiveId: "tp-1",
        prompt: "What does a 'not recommended' result mean?",
        answer:
          "Your exposure is too high for the day's conditions; even careful choices still leave an elevated accident likelihood.",
      },
    ],
    scenarios: [
      {
        id: "tp-scenario-1",
        title: "Pre-Trip Filter",
        prompt:
          "A route is rated complex. The forecast is Considerable at the relevant elevations. Which trip-planning move best fits the Avaluator philosophy?",
        options: [
          "Proceed if the group agrees to spread out and ski one at a time.",
          "Switch to a simpler Plan B because the route / condition pairing is pushing into unacceptable exposure.",
          "Proceed only if the strongest skier leads and makes the line choice.",
        ],
        correctIndex: 1,
        explanation:
          "The Avaluator is a route filter, not a dare. Complex terrain plus elevated danger should trigger a route downgrade, not just better pep talks.",
      },
    ],
    sourceIds: ["avaluator", "online-trip-planner", "daily-process"].filter(Boolean) as string[],
    relatedTopicIds: ["terrain-and-ates", "danger-and-forecast"],
  },
  {
    id: "daily-process-and-travel",
    slug: "daily-process-and-travel",
    title: "Daily Process and Travel Habits",
    strapline: "Use a repeatable operating system for the whole day.",
    level: "intermediate",
    stakes: "critical",
    summary:
      "Good avalanche days are not built from a single decision. They are built from a sequence: forecast, trip plan, gear, verification, travel habits, slope checks, and end-of-day reflection.",
    whyItMatters:
      "A consistent process reduces impulsive risk taking and keeps the whole group engaged in decision making.",
    quickHits: [
      "Good communication starts before the car leaves town.",
      "Group size and expectations affect rescue capacity and decision quality.",
      "Safe travel habits are part of risk management, not etiquette.",
    ],
    objectives: [
      { id: "dp-1", text: "Recall the main stages of the daily process." },
      { id: "dp-2", text: "Identify travel habits that reduce group exposure." },
      { id: "dp-3", text: "Explain how group communication changes risk." },
    ],
    flashcards: [
      {
        id: "dp-card-1",
        objectiveId: "dp-1",
        prompt: "What are the major daily-process checkpoints?",
        answer:
          "Get the forecast, make a trip plan, check gear, verify conditions, use good travel habits, evaluate slopes, and reflect afterward.",
      },
      {
        id: "dp-card-2",
        objectiveId: "dp-2",
        prompt: "Name two travel habits that directly reduce exposure.",
        answer:
          "Travel one at a time through exposed spots and regroup in islands of safety; also maintain spacing so one trigger does not catch the whole group.",
      },
      {
        id: "dp-card-3",
        objectiveId: "dp-3",
        prompt: "Why is expectation alignment important before a trip begins?",
        answer:
          "Because mismatched goals and risk tolerance create pressure, weak communication, and poor decisions once terrain choices become consequential.",
      },
      {
        id: "dp-card-4",
        objectiveId: "dp-2",
        prompt: "What is an island of safety?",
        answer:
          "A spot protected from avalanche exposure where the group can regroup without stacking risk under start zones or runouts.",
      },
    ],
    scenarios: [
      {
        id: "dp-scenario-1",
        title: "Group Management",
        prompt:
          "Your group of six reaches a short exposed crossing. The strongest rider wants everyone to move quickly together so nobody gets cold. Best response?",
        options: [
          "Cross together to minimize total time in terrain.",
          "Cross one at a time or in tightly controlled subgroups while others wait in safe zones.",
          "Send the least experienced person first so they gain confidence.",
        ],
        correctIndex: 1,
        explanation:
          "Travel habits exist to control exposure. Moving the whole group together can convert a small mistake into a group accident.",
      },
    ],
    sourceIds: ["daily-process", "avcan-training"],
    relatedTopicIds: ["trip-planning", "human-factors-topic"],
  },
  {
    id: "signs-and-slope-eval",
    slug: "signs-of-instability-and-slope-evaluation",
    title: "Signs of Instability and Slope Evaluation",
    strapline: "Watch for mismatch between the plan and reality.",
    level: "intermediate",
    stakes: "high",
    summary:
      "Even a good plan has to survive field reality. Classic red flags and slope-specific observations help confirm whether the original route still makes sense.",
    whyItMatters:
      "Most parties do not fail because they lacked a morning forecast; they fail because they did not update their model once new evidence appeared.",
    quickHits: [
      "Recent avalanches, cracking, and whumpfing are loud warnings.",
      "No red flags does not guarantee a slope is safe.",
      "Slope evaluation is about whether this exact feature fits today's problem set.",
    ],
    objectives: [
      { id: "ss-1", text: "Recognize major field red flags." },
      { id: "ss-2", text: "Explain why absence of signs is not proof of safety." },
      { id: "ss-3", text: "Use slope-specific thinking instead of generic optimism." },
    ],
    flashcards: [
      {
        id: "ss-card-1",
        objectiveId: "ss-1",
        prompt: "Name three classic signs of instability.",
        answer:
          "Recent avalanches, shooting cracks, and whumpfing / collapsing are three of the clearest classic signs.",
      },
      {
        id: "ss-card-2",
        objectiveId: "ss-2",
        prompt: "Why is 'we didn't see any signs' weak evidence on a persistent slab day?",
        answer:
          "Because some dangerous problems can present few obvious clues, so the forecast and terrain filters still matter.",
      },
      {
        id: "ss-card-3",
        objectiveId: "ss-3",
        prompt: "What is a trigger point?",
        answer:
          "A thinner or more stressed part of the snowpack, often around rocks or convexities, where a person is more likely to trigger a slab.",
      },
      {
        id: "ss-card-4",
        objectiveId: "ss-3",
        prompt: "What question should slope evaluation answer?",
        answer:
          "Whether this specific slope, at this aspect, elevation, shape, and loading pattern, matches today's avalanche problems.",
      },
    ],
    scenarios: [
      {
        id: "ss-scenario-1",
        title: "Plan Meets Evidence",
        prompt:
          "You planned a conservative treeline tour, but on the approach you see fresh natural avalanches on similar aspects and elevations. Best move?",
        options: [
          "Continue because the avalanches were not on your exact intended slope.",
          "Treat those avalanches as direct evidence and step down to an even safer option or turn around.",
          "Wait one hour and see if the snow settles before committing.",
        ],
        correctIndex: 1,
        explanation:
          "Recent avalanches are one of the strongest warning signs available. They indicate the snowpack is already proving the forecast right.",
      },
    ],
    sourceIds: ["daily-process", "avy-savvy", "avalanche-problems"],
    relatedTopicIds: ["danger-and-forecast", "human-factors-topic"],
  },
  {
    id: "human-factors-topic",
    slug: "human-factors",
    title: "Human Factors",
    strapline: "Manage the brain, not just the snow.",
    level: "advanced",
    stakes: "critical",
    summary:
      "Backcountry accidents are often rooted in cognitive shortcuts, group pressure, overconfidence, sunk cost, and haste. Avalanche skill includes recognizing when your thinking has drifted off the rails.",
    whyItMatters:
      "Strong weather and terrain knowledge still fails if the group cannot notice and interrupt biased decisions.",
    quickHits: [
      "Familiarity can make known terrain feel safer than it is.",
      "Acceptance and expert halo effects can silence dissent.",
      "Sunk cost and commitment escalate exposure after effort has already been invested.",
    ],
    objectives: [
      { id: "hf-1", text: "Identify common heuristic traps in avalanche travel." },
      { id: "hf-2", text: "Explain how social dynamics distort field decisions." },
      { id: "hf-3", text: "Use structured process to interrupt biased choices." },
    ],
    flashcards: [
      {
        id: "hf-card-1",
        objectiveId: "hf-1",
        prompt: "What does FACETS stand for in avalanche education?",
        answer:
          "Familiarity, Acceptance, Commitment / Consistency, Expert Halo, Tracks / Scarcity, and Social Facilitation.",
      },
      {
        id: "hf-card-2",
        objectiveId: "hf-2",
        prompt: "What is expert halo in a backcountry group?",
        answer:
          "When the group defers too much to a perceived expert and stops independently evaluating the risk.",
      },
      {
        id: "hf-card-3",
        objectiveId: "hf-3",
        prompt: "How does a repeatable checklist help with human factors?",
        answer:
          "It slows impulsive thinking, distributes decision ownership, and creates structured moments to question assumptions.",
      },
      {
        id: "hf-card-4",
        objectiveId: "hf-1",
        prompt: "Why is familiarity a trap rather than a guarantee?",
        answer:
          "Because people often make riskier decisions in terrain they know well, even when today's conditions are very different.",
      },
    ],
    scenarios: [
      {
        id: "hf-scenario-1",
        title: "The Local Line",
        prompt:
          "A strong local partner says, 'I've skied this route a dozen times. Stop overthinking it.' Which human factor is most clearly active?",
        options: [
          "Familiarity, possibly reinforced by expert halo.",
          "Only scarcity, because fresh tracks are limited.",
          "None; local knowledge cancels the need for group discussion.",
        ],
        correctIndex: 0,
        explanation:
          "Repeated success can breed familiarity bias, and the group may also give excessive weight to one respected person's confidence.",
      },
    ],
    sourceIds: ["human-factors", "daily-process"],
    relatedTopicIds: ["daily-process-and-travel", "trip-planning"],
  },
  {
    id: "companion-rescue-topic",
    slug: "companion-rescue",
    title: "Companion Rescue",
    strapline: "Treat rescue as practiced team choreography, not trivia.",
    level: "foundations",
    stakes: "critical",
    summary:
      "Companion rescue is time-compressed, physical, and unforgiving. The point is not just knowing the steps but being able to run them quickly, safely, and in order under stress.",
    whyItMatters:
      "Survival odds decline sharply after the first minutes, so rescue skills are both essential and perishable.",
    quickHits: [
      "The group's own response is the victim's best chance.",
      "Scene safety and leadership happen before the transceiver search.",
      "Practice has to be repeated regularly or speed and sequencing decay.",
    ],
    objectives: [
      { id: "cr-1", text: "Recall the first actions before the search begins." },
      { id: "cr-2", text: "Sequence the search, probing, and shoveling flow." },
      { id: "cr-3", text: "Explain why rescue review must recur even for experienced users." },
    ],
    flashcards: [
      {
        id: "cr-card-1",
        objectiveId: "cr-1",
        prompt: "What needs to happen before launching into the beacon search?",
        answer:
          "Manage scene safety, identify who is missing, assign leadership, and organize the group so the rescue does not create another avalanche victim.",
      },
      {
        id: "cr-card-2",
        objectiveId: "cr-2",
        prompt: "What comes after fine search?",
        answer:
          "Probe to pinpoint the victim, then shovel efficiently from the downhill side using organized technique.",
      },
      {
        id: "cr-card-3",
        objectiveId: "cr-3",
        prompt: "Why is rescue a dedicated refresher topic instead of a one-time lesson?",
        answer:
          "Because the skills are highly perishable, speed matters, and under stress sequencing errors are common without practice.",
      },
      {
        id: "cr-card-4",
        objectiveId: "cr-2",
        prompt: "Why is organized shoveling such a big deal?",
        answer:
          "Because excavation often takes longer than the search, and inefficient digging wastes precious minutes in the survival window.",
      },
    ],
    scenarios: [
      {
        id: "cr-scenario-1",
        title: "First Minute",
        prompt:
          "A partner is carried in an avalanche. What is the best first move for the unburied group?",
        options: [
          "Everyone immediately switches to search mode and runs into the debris.",
          "Pause just long enough to establish scene safety, identify the last seen point, count missing people, and assign roles.",
          "Call outside rescue before doing anything else.",
        ],
        correctIndex: 1,
        explanation:
          "The rescue starts with organization and hazard control. Outside help matters, but your group is the immediate rescue resource.",
      },
    ],
    sourceIds: ["companion-rescue", "avcan-training", "aiare-rec"],
    relatedTopicIds: ["daily-process-and-travel"],
  },
];

export const coreTopicIds = topics.map((topic) => topic.id);
