# Video-first showcase review

This branch stages the video-first redesign for review. It is not ready to merge or deploy.

## Intended interface

- Large cards in a two-column desktop grid and a one-column mobile grid.
- Compact category buttons above the grid instead of a sidebar.
- A result-focused headline, short Korean summary, large video preview, author-reported figures, and original source on each card.
- Search, local bookmarks, shareable case anchors, and on-demand video dialogs.
- Publisher MP4 playback and official X embeds, with original links retained when playback is unavailable.

## Catalogue scope

The prepared dataset contains 24 distinct cases across six categories, including two publisher-hosted MP4s and 22 X video posts. Published video evidence is not an end-to-end playback verification. The catalogue does not claim 100 verified videos, and no cases were invented to reach that number.

## Blocking integration task

The connection security check rejected the write for the prepared `assets/app.js`. That replacement is not included in this branch. The existing runtime expects the old page structure and must not be used to validate the redesigned shell. Do not merge this draft until the matching runtime has been added through an authorized write and the combined result has been tested.

## Review checklist

- [ ] Add the matching video-first `assets/app.js` runtime.
- [ ] Confirm the shell, stylesheet, dataset, and runtime use the same DOM IDs and schema.
- [ ] Run the updated catalogue tests and JavaScript syntax checks on the combined branch.
- [ ] Test category filtering, search, bookmarks, share links, dialogs, and keyboard navigation.
- [ ] Check desktop and mobile layouts.
- [ ] Verify actual external video playback; record blocked or unavailable videos as failures.
- [ ] Remove this integration blocker only after verification, then mark the PR ready for review.

No merge, production branch update, or deployment is part of this draft review.
