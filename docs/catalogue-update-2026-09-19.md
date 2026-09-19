# Guide and catalogue update — 2026-09-19

Added two static Korean guide pages with the same main navigation as the video catalogue. Explanatory interactions use predefined examples and make no inference API calls. The 12 ideas are editorial proposals, not published customer outcomes. Official references are linked beside the explanations.

## New video sources

Each entry has a distinct original post URL and a video thumbnail (`amplify_video_thumb`) in the source directory. This confirms published video evidence, not end-to-end playback or performance reproduction. Korean descriptions are independently written.

| Case | Creator post | Discovery record |
| --- | --- | --- |
| x-post-firewall | [Original](https://x.com/marcelpociot/status/2100520134481735729) | [Record](https://madewithjev.com/builds/x-post-firewall) |
| instant-compaction | [Original](https://x.com/tamarajtran/status/2100694549362553153) | [Record](https://madewithjev.com/builds/instant-compaction) |
| jev-review | [Original](https://x.com/niazmorshed_/status/2100465662867218857) | [Record](https://madewithjev.com/builds/jev-review) |
| computer-use-without-screenshots | [Original](https://x.com/milindlabs/status/2100631847155994852) | [Record](https://madewithjev.com/builds/computer-use-without-screenshots) |
| jev-trader | [Original](https://x.com/jarrodwatts/status/2100356151468585346) | [Record](https://madewithjev.com/builds/jev-trader) |
| predictive-launcher | [Original](https://x.com/dabit3/status/2100756930054504776) | [Record](https://madewithjev.com/builds/predictive-launcher) |
| invoice-finder | [Original](https://x.com/FarouqAldori/status/2100711180704641520) | [Record](https://madewithjev.com/builds/invoice-finder) |
| realtime-game-levels | [Original](https://x.com/HugoDuprez/status/2100953089003921543) | [Record](https://madewithjev.com/builds/realtime-game-levels) |
| subway-surfers | [Original](https://x.com/_MaxBlade/status/2100634359099232678) | [Record](https://madewithjev.com/builds/subway-surfers) |
| ocr-image-classifier | [Original](https://x.com/fayazara/status/2100953838891192789) | [Record](https://madewithjev.com/builds/ocr-image-classifier) |
| ai-slop-detector | [Original](https://x.com/kraayenJon/status/2101157548346794059) | [Record](https://madewithjev.com/builds/ai-slop-detector) |
| doomscroll-filter | [Original](https://x.com/robj3d3/status/2101074194260000982) | [Record](https://madewithjev.com/builds/doomscroll-filter) |

Static chart-only posts and unrelated replicas were excluded. Trading is presented as an implementation demo without profit claims. OCR, speech and computer-use demos distinguish preprocessing and execution from Jev’s own role. “AI slop” scoring is a style heuristic, not proof of AI authorship.

## Validation

Run `npm test` and the syntax checks listed in README. Guide tests check local navigation/assets, all related-demo IDs, example switching and category-filter reset. Runtime tests use the catalogue length rather than a stale fixed total. External playback remains publisher-dependent.
