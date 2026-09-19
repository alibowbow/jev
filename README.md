# Jev Atlas

A Korean, video-first collection of published Jev demonstrations. Independent of TypeSafe AI.

> **Draft integration branch — not ready to merge or deploy.** The replacement `assets/app.js` was rejected by the connection security check and has not been committed. The old runtime is incompatible with the redesigned page and data. See [the integration checklist](docs/video-first-review.md).

## Prepared redesign

- Large two-column desktop cards and a one-column mobile layout.
- Compact category buttons above the grid, with six categories.
- Result-focused Korean headlines, short summaries, large video previews, creator credits, source links, and author-reported figures.
- Markup and styling for search, bookmarks, share links, and accessible video dialogs. These require the pending matching runtime.

## Catalogue

`assets/data.js` contains 24 distinct cases, replacing the old mixed catalogue of documentation examples and hypothetical applications. Two records reference publisher-hosted MP4s; 22 reference X video posts. Records are not duplicated to reach a target count.

Video-specific thumbnails and publisher-file references establish published video evidence, not successful playback on every device. External playback remains unverified as a complete set. Performance figures are author-reported and have not been independently reproduced.

The Browser Use demo shows flight search, not completed ticket purchase. DroidRun shows the payment-method screen, not a completed ride order.

## Files in this draft

- `index.html`: compact page shell and video dialog markup.
- `assets/styles.css`: top filters, large cards, responsive layout, and dialog styles.
- `assets/data.js`: case descriptions, categories, source links, and media records.
- `tests/catalog.test.cjs`: structural tests for the new catalogue and runtime integration.
- `docs/video-first-review.md`: pending tasks and merge checklist.

The existing `assets/app.js` is unchanged. A matching runtime must be supplied before this branch can be used as a working website. Existing CI is retained; a failing integration test must not be bypassed.

## Validation after runtime integration

```sh
npm test
node --check assets/app.js
node --check assets/data.js
python3 -m http.server 8080
```

The prepared complete local source passed seven structural tests and syntax checks. That result does not establish that this incomplete branch passes. Re-run tests against the actual branch after adding the runtime, then test browser interactions and external video playback separately.

No build step, API key, account system, or backend is intended. Static publishing should use the repository root only after the integration checklist is complete.

## Attribution

Primary links and scope notes are stored in each case record. Third-party media is linked from original publishers, not copied or rehosted. Videos and trademarks belong to their respective owners.

This draft does not merge changes into `main` or deploy the site.
