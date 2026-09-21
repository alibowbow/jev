# Jev Atlas

A Korean, video-first collection of published Jev demonstrations. Independent of TypeSafe AI.

## Features

- 86 distinct video cases across eight categories, with large desktop cards and a single-column mobile layout.
- A visual beginner guide (`learn.html`): typed-output illustrations, four scenario flows including a fictional intake response, interactive probability comparisons and a tool-role map.
- A sourced Jev/LLM comparison, a publisher-demo latency chart and a USD token-cost calculator comparing GPT-5.6 Luna, Gemini 3.8 Flash, GPT-6 Astra and Claude Fable 5.1, with explicit input/output assumptions and dated promotional terms.
- Fourteen implementation ideas (`ideas.html`), including two focused medical/dental workflow proposals with clinician-review boundaries and a shareable `#medical` filter.
- Korean and English keyword search, category filters, title sorting, result counts and empty states.
- Browser-local bookmarks, including storage-denied fallback and synchronization between tabs.
- Shareable `#case=<id>` links that highlight a card without automatically loading a third-party player.
- In-card playback for publisher MP4s and official X embeds, with original-source links, timeout handling and retry. Only one card plays at a time; filtering or sorting stops the previous player.
- Keyboard-accessible playback controls, Escape to collapse a video, focus restoration, `/` to search, a native source-information dialog and reduced-motion support.

The video-first runtime is integrated with the current page and data schema. No API key, account system, backend or production build step is required. This site collects demonstrations; it does not call the Jev inference API.

## Run and validate

```sh
npm ci
npm test
node --check assets/app.js
node --check assets/data.js
node --check assets/guide.js
node --check assets/comparison.js
python3 -m http.server 8080
```

Open `http://localhost:8080`. The test dependency is development-only; publish the repository's static entry point and assets.

The automated checks cover catalogue structure and actual DOM interactions, including filtering, search, sorting, bookmarks, sharing, playback errors, retry, inline-player cleanup on switching/filtering, stale asynchronous callbacks and safe text/URL handling. GitHub Actions runs these checks and JavaScript syntax validation. These tests simulate media responses; they do not establish that every external video can play in every browser.

## Catalogue and attribution

`assets/data.js` contains 86 distinct cases: two GitHub-hosted publisher MP4s and 84 official X embeds. Records are not duplicated to reach a target count. Video evidence and author-reported performance figures are not independent performance verification. Source links, creator credits and scope notes are retained per case.

The Browser Use demo shows flight search, not completed ticket purchase. DroidRun shows the payment-method screen, not a completed ride order.

Thumbnails load from the publishers' external hosts. Players load only after a user selects a video; bookmarks stay in this browser. Third-party media is linked from original publishers, not copied or rehosted. Availability depends on each publisher and the user's network or content-blocking settings. The source link remains available when an embed fails.

The September 21 selection adds 50 projects discovered through [Jevable](https://jevable.com/), with independently written Korean descriptions, original English project-name search and a robotics/simulation category. Per-card research URLs preserve discovery attribution alongside primary publisher links.

See [Jevable selection and media checks](docs/jevable-update-2026-09-21.md), [guide and catalogue update](docs/catalogue-update-2026-09-19.md) and [integration and validation notes](docs/video-first-review.md).

X video posts use the official player resolved from their post IDs. Captured `video.twimg.com` rendition URLs are not used for native playback or direct-file links: an available CDN file does not establish that third-party in-page playback is supported.
