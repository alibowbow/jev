# Opus video audio correction — 2026-09-27

## Cause and change

All 84 initial ohmyopus highlight files were inspected with ffprobe and contained H.264 video only, with no audio stream. The original player was not muted; changing its volume could not restore absent audio.

66 publisher-original MP4 URLs were recovered from X's public syndication metadata (including the quoted official introduction for HAProxy). Full source lengths and audio streams are preserved. The selected rendition is the largest published MP4 up to a 1920-pixel long edge, or the largest available when none meets that size. No media is rehosted in the repository.

Verified original files: 43 with an audio track and 10 without one; 13 could not be downloaded for file-level audio verification in this session and retain an unknown audio status. Another 18 cases retain explicitly labeled silent highlights because a matching playable original could not be recovered from the available public material. Do not imply that their original posts are necessarily silent.

Public metadata was collected without credentials. Command-line CDN requests subsequently returned 403, while ordinary native browser video pages played; browser media downloads were used for the file-level checks. Restricted Reddit/Threads sources were not bypassed. An audio stream is evidence that the file can carry sound, not a claim that it is audible at every moment.

The card player starts unmuted on a user click, exposes an explicit sound toggle synchronized with the native controls, and hides the toggle for verified silent files. Silent preview and silent original labels are distinct. Only one video is active; closing, filtering or switching unloads it and removes its sound listeners.

The paper-plane original also contained nonzero audio samples (first five seconds: mean -17.6 dB, peak -2.5 dB). Runtime tests cover the sound toggle, native volume synchronization, silent-file disclosure and cleanup, with 40 tests passing.

## Checked media

| Case | Selected file | Seconds | Audio status | Evidence |
| --- | --- | ---: | --- | --- |
| lens-lab | Original | 32.0 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102591147927654847&lang=en&token=0) |
| bricks | Original | 83.328 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102471885061812714&lang=en&token=0) |
| haproxy | Original | 20.053 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102439069053747549&lang=en&token=0) |
| paper-planes | Original | 28.053 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102437977435893771&lang=en&token=0) |
| house-photo | Original | 30.037 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102499166635352354&lang=en&token=0) |
| arxiv-blog | Original | 23.123 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102464761141346483&lang=en&token=0) |
| earthrise | Original | 52.48 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102471870692180179&lang=en&token=0) |
| willowmere | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/willowmere/highlight.mp4) |
| antikythera | Original | 60.011 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102463453176979794&lang=en&token=0) |
| sf1906 | Original | 8.0 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102466523164274839&lang=en&token=0) |
| kowloon | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/kowloon/highlight.mp4) |
| lean-sdk | Original | 100.6 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102543349102338309&lang=en&token=0) |
| claymation | Original | 22.452 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102458348511879448&lang=en&token=0) |
| shinkansen | Original | 18.208 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102507018372436264&lang=en&token=0) |
| hand | Original | 20.767 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102517718754943254&lang=en&token=0) |
| sf-unreal | Original | 53.5 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102483668468195539&lang=en&token=0) |
| sketch-home | Original | 19.1 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102503719762018434&lang=en&token=0) |
| fur-cat | Original | 58.411 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102498299190079933&lang=en&token=0) |
| catapult | Original | 80.216 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102471877184627062&lang=en&token=0) |
| volcano | Original | 19.797 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102450239923720440&lang=en&token=0) |
| pelican-bevy | Preview | 6 | no audio track | [Preview](https://ohmyopus.com/media/pelican-bevy/highlight.mp4) |
| pachinko | Original | 30.08 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102539560702165495&lang=en&token=0) |
| pelican-threejs | Original | 91.416 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102436416437580159&lang=en&token=0) |
| creature-rig | Original | 25.216 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102641562824135022&lang=en&token=0) |
| lawnmower | Original | 37.248 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102513817855094922&lang=en&token=0) |
| roblox-smash | Original | 133.468 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102487879809126834&lang=en&token=0) |
| unreal-worlds | Original | 130.752 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102440678282412195&lang=en&token=0) |
| guitar-store | Original | 263.787 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102532400353829356&lang=en&token=0) |
| endless-world | Original | 80.939 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102529695908806728&lang=en&token=0) |
| geometry-wars | Original | 132.416 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102529784131600745&lang=en&token=0) |
| minecraft-sunset | Original | 23.116 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102470200415166699&lang=en&token=0) |
| grill-gacha | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/grill-gacha/highlight.mp4) |
| spider-threejs | Original | 186.965 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102588571442188577&lang=en&token=0) |
| doodle-shooter | Original | 109.611 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102449525944099320&lang=en&token=0) |
| opus-2k | Original | 28.7 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102695292113981770&lang=en&token=0) |
| pressure-wash | Original | 15.061 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102674509593796808&lang=en&token=0) |
| pixel-forest-map | Original | 3.285 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102522318559858721&lang=en&token=0) |
| watermelon | Original | 29.333 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102471866635919731&lang=en&token=0) |
| oneshot-anim | Original | 30.059 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102472218269900876&lang=en&token=0) |
| train-js | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/train-js/highlight.mp4) |
| small-print | Original | 29.056 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102531681450119426&lang=en&token=0) |
| pixel-wizard | Original | 11.285 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102476258948927543&lang=en&token=0) |
| replit-video | Original | 26.368 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102520354069729456&lang=en&token=0) |
| talis-promo | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/talis-promo/highlight.mp4) |
| launch-self | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/launch-self/highlight.mp4) |
| cosmic-orbits | Original | 31.979 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102436464323661880&lang=en&token=0) |
| life-anim | Original | 30.172 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102495989194236158&lang=en&token=0) |
| svg-logo-battle | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/svg-logo-battle/highlight.mp4) |
| duck-film | Original | 239.424 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102512879258009818&lang=en&token=0) |
| office-horror | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/office-horror/highlight.mp4) |
| hard-problems-anim | Original | 30.0 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102478640428773861&lang=en&token=0) |
| nz-acrylic | Original | 21.666 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102573127192727704&lang=en&token=0) |
| seaside-brush | Original | 13.607 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102457111787745405&lang=en&token=0) |
| shotbase-video | Original | 58.304 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102441708395041170&lang=en&token=0) |
| raindrop-story | Original | 32.0 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102498589259821559&lang=en&token=0) |
| claude-history | Original | 87.552 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102463796149440888&lang=en&token=0) |
| dusk-murmuration | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/dusk-murmuration/highlight.mp4) |
| neural-pixel | Original | 56.043 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102737776219168939&lang=en&token=0) |
| voice-app-video | Original | 21.388 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102562623824757136&lang=en&token=0) |
| kinesin-clay | Original | 22.549 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102569129026916389&lang=en&token=0) |
| pixel-horse | Original | 10.0 | silent | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102707412704919910&lang=en&token=0) |
| nyc-skyline | Original | 28.16 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102678371281018916&lang=en&token=0) |
| cartoon-editor | Original | 30.059 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102681172367323300&lang=en&token=0) |
| chalk-kite | Original | 22.8 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102484620109644273&lang=en&token=0) |
| sand-art | Original | 120.043 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102592355165782312&lang=en&token=0) |
| teemo-intro | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/teemo-intro/highlight.mp4) |
| letters-abroad | Original | 26.325 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102519201554690273&lang=en&token=0) |
| redesign-28m | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/redesign-28m/highlight.mp4) |
| landing | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/landing/highlight.mp4) |
| gyeongbokgung | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/gyeongbokgung/highlight.mp4) |
| living-sketchbook | Original | 110.74 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102615272054231093&lang=en&token=0) |
| mongol-atlas | Original | 26.842 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102566466121797767&lang=en&token=0) |
| valley-road | Original | 83.243 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2103088660887318850&lang=en&token=0) |
| snail-trailer | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/snail-trailer/highlight.mp4) |
| ui-morph-motion | Original | 14.059 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2103273003555402193&lang=en&token=0) |
| inkwave | Original | 147.797 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2103357848961036304&lang=en&token=0) |
| paper-3b1b-video | Original | 518.954 | unknown | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2103141339651350646&lang=en&token=0) |
| tidewater-island | Original | 227.435 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102878170089169235&lang=en&token=0) |
| lego-microduck | Original | 24.043 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2103110908444631120&lang=en&token=0) |
| friendr-explainer | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/friendr-explainer/highlight.mp4) |
| japan-boat | Original | 59.733 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102760783344189761&lang=en&token=0) |
| trolley-game | Original | 28.053 | audio | [Publisher metadata](https://cdn.syndication.twimg.com/tweet-result?id=2102641525071155565&lang=en&token=0) |
| life-purpose | Preview | 6.7 | no audio track | [Preview](https://ohmyopus.com/media/life-purpose/highlight.mp4) |
| pixel-island | Preview | 6 | no audio track | [Preview](https://ohmyopus.com/media/pixel-island/highlight.mp4) |
