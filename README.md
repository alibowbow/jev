# Jev Atlas

A Korean, video-first collection of published Jev demonstrations. Independent of TypeSafe AI.

## Features

- 24 distinct video cases across six categories, with large desktop cards and a single-column mobile layout.
- Korean and English keyword search, category filters, title sorting, result counts and empty states.
- Browser-local bookmarks, including storage-denied fallback and synchronization between tabs.
- Shareable `#case=<id>` links that highlight a card without automatically loading a third-party player.
- On-demand publisher MP4s and official X embeds, with original-source links, timeout handling and retry.
- Keyboard-accessible native dialogs, focus restoration, `/` to search and reduced-motion support.

The video-first runtime is integrated with the current page and data schema. No API key, account system, backend or production build step is required. This site collects demonstrations; it does not call the Jev inference API.

## Run and validate

```sh
npm ci
npm test
node --check assets/app.js
node --check assets/data.js
python3 -m http.server 8080
```

Open `http://localhost:8080`. The test dependency is development-only; publish the repository's static entry point and assets.

The 15 automated checks cover catalogue structure and actual DOM interactions, including filtering, search, sorting, bookmarks, sharing, playback errors, retry, modal cleanup, stale asynchronous callbacks and safe text/URL handling. GitHub Actions runs these checks and JavaScript syntax validation. These tests simulate media responses; they do not establish that every external video can play in every browser.

## Catalogue and attribution

`assets/data.js` contains 24 distinct cases: two publisher-hosted MP4s and 22 X video posts. Records are not duplicated to reach a target count. Video evidence and author-reported performance figures are not independent performance verification. Source links, creator credits and scope notes are retained per case.

The Browser Use demo shows flight search, not completed ticket purchase. DroidRun shows the payment-method screen, not a completed ride order.

Thumbnails load from the publishers' external hosts. Players load only after a user selects a video; bookmarks stay in this browser. Third-party media is linked from original publishers, not copied or rehosted. Availability depends on each publisher and the user's network or content-blocking settings. The source link remains available when an embed fails.

See [integration and validation notes](docs/video-first-review.md).
