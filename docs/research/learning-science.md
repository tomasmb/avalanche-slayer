# Learning-Science Rationale

## Core claim

The app is designed around active recall, spaced review, criterion-based mastery, and scenario transfer because those choices fit both the learning-science literature and the avalanche use case.

## Retrieval before rereading

- The [APS summary of Dunlosky et al.](https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html/comment-page-1) identifies practice testing as a high-utility learning technique and contrasts it with lower-utility habits such as simple rereading.
- [Karpicke & Roediger (2008)](https://doi.org/10.1126/science.1152408) supports the claim that retrieval itself is a major driver of durable learning.
- [Roediger & Butler (2011)](https://pubmed.ncbi.nlm.nih.gov/20951630/) argues that retrieval practice improves long-term retention and can support flexible transfer when paired with feedback.

Product decision: the default study unit in the app is a prompt-first retrieval card, followed by answer reveal and self-rating.

## Review spread over time

- The APS summary above rates distributed practice as high utility.
- [Cepeda et al. (2006)](https://pubmed.ncbi.nlm.nih.gov/16719566/) reports that spacing and the retention interval interact, supporting reviews that recur over time rather than one compressed cram session.

Product decision: the scheduler prioritizes elapsed time, due status, and prior performance instead of treating every return visit as a fresh start.

## Mastery instead of exposure

- [Bloom, Learning for Mastery](https://files.eric.ed.gov/fulltext/ED053419.pdf) argues that many learners can reach mastery if time, feedback, and corrective opportunities are structured appropriately.

Product decision: a topic is not treated as mastered because it was opened once. The app requires strong retrieval performance and, when present, a successful scenario performance.

## Transfer matters in avalanche education

- [Roediger & Butler (2011)](https://pubmed.ncbi.nlm.nih.gov/20951630/) supports transfer-oriented retrieval.
- [AIARE 1](https://avtraining.org/aiare-level-1/) expects learners to plan travel, identify avalanche terrain, use a risk-management framework, and demonstrate rescue.
- [AIARE 2](https://avtraining.org/aiare-level-2/) raises the expectation to leadership and more complicated situations.

Product inference: avalanche knowledge is only useful if it survives the jump from remembering facts to choosing terrain and managing a group. That is why the app includes scenario drills rather than stopping at flashcards.

## Why the scheduler is risk-sensitive

This is a product inference rather than a direct claim from a single paper. In avalanche education, forgetting rescue flow or misreading terrain carries more consequence than forgetting a lower-stakes definition. The app therefore shortens intervals for high-stakes content while still following the broader spacing and retrieval principles above.
