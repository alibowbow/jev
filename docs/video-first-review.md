# Video-first runtime integration

## Resolved problem

PR #1 replaced the page, styles and catalogue, but retained the old `assets/app.js`. The old runtime expected removed DOM IDs and fields such as `flow` and `sources`, causing startup to fail and leaving the published catalogue empty.

The replacement runtime uses the current schema and native DOM construction. No catalogue string is inserted as HTML. External links, images and media are restricted to the expected HTTPS publisher hosts.

## Completed integration

- [x] Render all 24 existing cases and six category filters.
- [x] Search, title sorting, reset, empty states and result counts.
- [x] Local bookmarks with valid-ID filtering, storage-denied fallback and cross-tab updates.
- [x] Share-link copying and a visible manual-copy fallback.
- [x] Case anchors highlight and focus a card without automatically loading a player.
- [x] On-demand MP4 playback and X `createTweet` embeds.
- [x] Permanent original-source link, loading timeout and retry.
- [x] Epoch guards and per-request widget containers prevent stale responses from replacing newer media.
- [x] Closing a dialog releases videos/iframes and restores keyboard focus.
- [x] Asset version updated so browsers request the integrated runtime.
- [x] Existing seven structural tests and eight DOM behavior tests pass (15 total).
- [x] JavaScript syntax checks pass; CI installs its locked test dependency.

## Validation boundaries

The DOM tests simulate widget and media success, failure, timeout and late callbacks. Native browser layout, media decoding and external-service availability require browser verification. The catalogue contains 24 published video references; this is not a claim that all 24 external videos have played successfully or that their reported performance has been independently reproduced.

Desktop and mobile responsive rules remain in `assets/styles.css`; narrow-screen metric wrapping and the manual share-link field are included in this integration.
