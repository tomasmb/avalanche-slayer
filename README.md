# Avalanche Slayer

Avalanche Slayer is a Next.js learning app for recreational avalanche safety. It is designed to help a learner return to the app and immediately get the highest-value review for their next trip: terrain, forecast interpretation, route filtering, human factors, and companion rescue.

The product is intentionally built around:

- active recall instead of passive rereading
- mastery-based progression instead of completion-by-exposure
- spaced repetition based on time and prior performance
- scenario drills that force transfer into route and group decisions
- source-backed curriculum decisions that can be audited in the repo

## What is in the app

- `Pre-Trip Review`: build a just-in-time session by time budget and focus area
- `General Review`: mixed adaptive queue across the curriculum
- `Topic Review`: direct lookup plus targeted review for specific concepts
- `Scenario Drills`: transfer-focused avalanche decision practice
- `Rescue Refresh`: short, high-stakes rescue review
- `Sources & Method`: in-app evidence trail

## Curriculum and evidence

- [Product decisions](./docs/product-decisions.md)
- [Source index](./docs/source-index.md)
- [Avalanche curriculum map](./docs/research/avalanche-curriculum.md)
- [Learning-science rationale](./docs/research/learning-science.md)

Important boundary: this app is a supplement to formal avalanche education, current avalanche forecasts, and repeated field rescue practice. It is not a substitute for AST, AIARE, or instructor-led travel and rescue training.

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Quality checks

```bash
npm run lint
npm run build
```

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- localStorage-backed learner state
- source-indexed curriculum data and review engine

## Deployment

Deploy with Vercel after pushing to GitHub:

```bash
npx vercel deploy -y
```

Use `--prod` only when you explicitly want a production deployment.

## Primary references

- [Avalanche Canada Training](https://avalanche.ca/training)
- [Avy Savvy](https://avysavvy.avalanche.ca/en-ca)
- [Avalanche.org Encyclopedia](https://avalanche.org/avalanche-encyclopedia/)
- [AIARE Recreational Program](https://avtraining.org/recprogram/)
- [Dunlosky et al. at APS](https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html/comment-page-1)
- [Karpicke & Roediger (2008)](https://doi.org/10.1126/science.1152408)
- [Roediger & Butler (2011)](https://pubmed.ncbi.nlm.nih.gov/20951630/)
- [Cepeda et al. (2006)](https://pubmed.ncbi.nlm.nih.gov/16719566/)
- [Bloom, Learning for Mastery](https://files.eric.ed.gov/fulltext/ED053419.pdf)
