# AI Showcase

A Korean collection of published Jev, Claude Opus 5.5, GPT-6 Astra, Fable 5.1, Sonnet 5.5 and community-attributed Fable 5.5 demonstrations. Independent of the model providers.

## Features

- 86 distinct video cases across eight categories, with large desktop cards and a single-column mobile layout.
- A visual beginner guide (`learn.html`): typed-output illustrations, four scenario flows including a fictional intake response, interactive probability comparisons and a tool-role map.
- A sourced Jev/LLM comparison, a publisher-demo latency chart and a USD token-cost calculator comparing GPT-5.6 Luna, Gemini 3.8 Flash, GPT-6 Astra and Claude Fable 5.1, with explicit input/output assumptions and dated promotional terms.
- Fourteen implementation ideas (`ideas.html`), including two focused medical/dental workflow proposals with clinician-review boundaries and a shareable `#medical` filter.
- Korean and English keyword search, category filters, title sorting, result counts and empty states.
- Browser-local bookmarks, including storage-denied fallback and synchronization between tabs.
- Shareable `#case=<id>` links that highlight a card without automatically loading a third-party player.
- In-card playback for public video files with native controls, with original-source links, timeout handling and retry. Only one card plays at a time; filtering or sorting stops the previous player.
- Keyboard-accessible playback controls, Escape to collapse a video, focus restoration, `/` to search, a native source-information dialog and reduced-motion support.

The video-first runtime is integrated with the current page and data schema. No API key, account system, backend or production build step is required. This site collects demonstrations; it does not call the Jev inference API.

## Run and validate

```sh
npm ci
npm test
for file in assets/*.js; do node --check "$file" || exit 1; done
python3 -m http.server 8080
```

Open `http://localhost:8080`. The test dependency is development-only; publish the repository's static entry point and assets.

The automated checks cover catalogue structure and actual DOM interactions, including filtering, search, sorting, bookmarks, sharing, playback errors, retry, inline-player cleanup on switching/filtering, stale media callbacks and safe text/URL handling. GitHub Actions runs these checks and JavaScript syntax validation. These tests simulate media responses; they do not establish that every external video can play in every browser.

## Catalogue and attribution

`assets/data.js` contains 86 distinct cases: 66 Jevable video files, 18 publisher video files referenced by Made with Jev, and two GitHub-hosted publisher MP4s. Records are not duplicated to reach a target count. Video evidence and author-reported performance figures are not independent performance verification. Source links, creator credits and scope notes are retained per case.

The Browser Use demo shows flight search, not completed ticket purchase. DroidRun shows the payment-method screen, not a completed ride order.

Thumbnails load from the publishers' external hosts. Players load only after a user selects a video; bookmarks stay in this browser. Third-party media is linked from the publisher or discovery site; this repository does not copy or rehost the files. Availability depends on each publisher and the user's network or content-blocking settings. The source link remains available when an embed fails.

The September 21 selection adds 50 projects discovered through [Jevable](https://jevable.com/), with independently written Korean descriptions, original English project-name search and a robotics/simulation category. Per-card research URLs preserve discovery attribution alongside primary publisher links.

See [Jevable selection and media checks](docs/jevable-update-2026-09-21.md), [guide and catalogue update](docs/catalogue-update-2026-09-19.md) and [integration and validation notes](docs/video-first-review.md).

The card play button starts a native video in the thumbnail area. Full X post widgets are never loaded, including on failure. Source links remain available outside the player. The player reserves the same 16:9 space and contains portrait/square videos without cropping. Only one media element is active; switching, filtering, sorting or collapsing stops and unloads it.

Jevable's public card player supplies a `/media/<post ID>/0` video route alongside its CDN source. Those published video endpoints are used for the 66 matching records. The other 18 publisher URLs are extracted from their original Made with Jev build pages and matched against each existing thumbnail's video ID. No iframe clipping, referrer spoofing or new media proxy is used.

## Opus 5.5 collection

[Open the separate Opus 5.5 page](https://alibowbow.github.io/jev/opus.html): 150 published projects across seven categories, with 123 inline videos (including one silent GIF) and 11 animated SVG originals, demo/code filters and separate bookmarks. See [selection and source ledger](docs/opus-2026-09-27.md). Data lives in `assets/opus-data.js`; all collections share `assets/app.js`.

The Opus player now prefers 66 publisher-original full videos over silent highlights. Remaining clips are labeled as silent previews; see [audio verification and correction](docs/opus-audio-2026-09-27.md). The inline player has an explicit sound toggle.

The September 28 update adds 50 animation/art projects, bringing that category to 76. New sources retain their full original media and do not fall back to fabricated highlight URLs. See [new art sources](docs/opus-art-2026-09-28.md).

### HTML 100 submenu

[HTML 100](https://alibowbow.github.io/jev/opus-html100.html) presents MiaAI-Lab's 100 standalone HTML works as individual cards using the existing catalogue renderer. Original numbering, Korean descriptions, six category filters, Korean/English/number search, screenshots, direct execution links, code and exact-prompt links are included. The original files and thumbnails remain on the creator's host. Data is in `assets/opus-html-data.js`; bookmarks use `opus-html100:saved:v1` independently of the main Opus collection. See [source and preservation notes](docs/opus-html100-2026-09-28.md).

## GPT-6 Astra collection

[Open GPT-6 Astra](https://alibowbow.github.io/jev/astra.html): 140 distinct published projects including 59 animation/art cases and 132 original inline videos. Sources, Korean descriptions and media metadata are documented in [the source ledger](docs/astra-2026-09-28.md). Data lives in `assets/astra-data.js`; Astra bookmarks use a separate local storage key.

The shared AI Showcase header offers six model tabs. Catalogue headings contain only the model, page type and counts.


### Astra HTML 100 submenu

[GPT-6 Astra HTML 100](https://alibowbow.github.io/jev/astra-html100.html) adds MiaAI-Lab’s separate set of 100 standalone works alongside the existing 140-project catalogue. Each card includes its original number, Korean description, screenshot, execution link, source code and original prompt. Six categories include 34 animation/art works. Data: `assets/astra-html-data.js`; bookmarks: `astra-html100:saved:v1`.

## Fable 5.1 collection

[Fable 5.1 HTML 100](https://alibowbow.github.io/jev/fable.html) is the fourth model tab, with 100 original MiaAI-Lab works including 42 animation/art pieces. It uses the same cards, six categories, Korean/English/number search and direct source links. Data: `assets/fable-data.js`; bookmarks: `fable-html100:saved:v1`.

Both additions link to the creator’s original files rather than copying or embedding executable third-party HTML. Original screenshots load lazily; selecting a thumbnail opens the work in a new tab. Audio-capable originals start sound through their own controls. Existing Jev, Opus and Astra records and media behavior are preserved. See [source and validation notes](docs/html-collections-2026-09-28.md).

## Sonnet 5.5 collection

[Sonnet use cases](https://alibowbow.github.io/jev/sonnet.html) contains 20 primary-source records across five fields: 12 community projects/tests, three official HTML demos and five partner early-test reports. Source-type filters and each card's detail dialog distinguish author reports, official demos and partner self-evaluations. Ten original X videos play in cards; eight have verified audio tracks and two are labeled silent. Published and reviewed dates, model/tool roles, limits and primary links are kept per case. See [selection and sources](docs/sonnet-2026-10-03.md) and [validation scope](docs/sonnet-validation.md).

[Sonnet HTML 100](https://alibowbow.github.io/jev/sonnet-html100.html) links MiaAI-Lab's 100 numbered works with independently written Korean copy. All HTML/TXT/thumbnail pairs and exact prompt matches were checked against creator commit `d50dc15f93a552cd1cfef8bddb63c3f2e94b7f7d`. Code links are pinned; execution and prompt links use the original creator Pages. The license is unconfirmed, so execution files, prompts and screenshots are not rehosted. Individual publication dates are unknown. [The source manifest](docs/sonnet-html100-sources.json) records file hashes, prompt matching and HTTP checks; these do not establish runtime correctness.

Both Sonnet pages share `assets/app.js`; their bookmarks use `sonnet-showcase:saved:v1` and `sonnet-html100:saved:v1`. The previous six collections retain their data unchanged.

## Fable 5.5 community-attributed collection

[Fable 5.5 use cases](https://alibowbow.github.io/jev/fable55.html) adds 20 distinct creator-published works by 16 creators across five categories, with 20 original inline videos (15 with verified audio, five silent), four creator-linked demo pages and one original code snapshot. Each creator explicitly names Fable 5.5 in their own post. The official Anthropic model catalogue checked on October 6, 2026 lists Fable 5.1, not Fable 5.5; actual model identity, private testing and silent routing are not established. The page and cards therefore label attribution as **creator-claimed / model unconfirmed**.

The collection includes driving and pixel games, interactive architecture, Blender films, motion design and scientific visualizations. It does not present creator claims as independent accuracy or performance evaluations. The three-body record links the original code commit and distinguishes later Opus 5.5 changes. A disabled Pokémon/Minecraft demo (HTTP 402) is excluded from runnable links while its creator video remains available.

Data: `assets/fable55-data.js`; bookmarks: `fable55-showcase:saved:v1`, separate from Fable 5.1. All eight earlier data files remain unchanged. Original media remain on creator hosts; source code, prompts and videos are not rehosted. See [selection and validation](docs/fable55-2026-10-06.md) and [public evidence ledger](docs/fable55-sources.json).
