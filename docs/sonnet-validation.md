# Sonnet validation scope

Final validation commands: `npm test`, `node --check` for every `assets/*.js`, and `git diff --check`.

Automated regression coverage includes:

- Existing six data files are byte-identical to the reviewed main, with 86 / 150 / 100 / 140 / 100 / 100 records.
- All ten static pages expose the five model tabs and valid routes under the `/jev/` project path. Sonnet submenus keep the correct active route.
- 20 general records distinguish 12 community projects/tests, three official demos and five partner reports. Community sources, official demo URLs and partner identities are unique within their respective types.
- 100 HTML records match numbered HTML/TXT/thumbnail pairs and the source manifest. Code and source TXT references are pinned to the reviewed creator commit. Individual publication dates remain unknown.
- Required primary evidence, Korean copy, safe HTTPS hosts, original video IDs and audio inspection records.
- Korean/English/number searches, source-type and media filters, empty-result reset, bookmarks on revisiting, isolated storage keys and storage-denied fallback.
- URL deep links, malformed hashes, share fallback, keyboard search and Escape/focus restoration in the detail dialog.
- In-card playback, sound toggle, silent originals, media failure/retry, stale callbacks, cleanup on filtering, source access and failed-image fallback.
- Text-only rendering, unsafe-link rejection, local-thumbnail path restrictions and no embedded third-party HTML execution.

The DOM tests simulate video playback. They are not evidence of actual decoding, listening quality or external execution accuracy. Original source HEAD requests and `ffprobe` streams are recorded separately in the source manifests.

## Browser limitation before merge

Local `agent-browser` startup failed. A direct Chromium attempt also failed at `process_singleton_posix.cc` with `socket() failed: Operation not permitted`. The cloud browser cannot open `http://127.0.0.1:8765/sonnet.html` (`ERR_BLOCKED_BY_CLIENT`). No sandbox or persistent permission change was requested. These attempts are **not passed browser checks**.

Responsive changes use five equal-width model tabs, wrapping labels and flexible Sonnet action/filter rows. The details grid switches to a single column below 600px. Actual mobile/Fold viewport rendering is not established by DOM tests or CSS review.

After the user-authorized merge, the existing GitHub Pages workflow and public operating site will be checked. The PR and final task report will record those observed results separately from this pre-merge limitation. Source HTML 100 works are not copied, embedded or claimed as individually runtime-tested.
