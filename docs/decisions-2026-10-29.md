# OpenAI Decisions API: source and validation ledger

Reviewed 2026-10-29. Thirty records are separate applications, experimental workflows or implementation examples, not 30 independent sources. Metrics belong to their original reporters; none was independently reproduced. Dates on individual cards are the source publication date, not necessarily when the application first launched.

## Official product and adoption

- [OpenAI GA announcement, 2026-10-22](https://openai.com/index/decisions-api/): OpenAI dots, Personal Finance and Communications; Box, Datadog, Ramp, Sierra and Speak. The five customer measurements are vendor reports in OpenAI's announcement. Box describes 30 insurance certificates; the other sample sizes are not specified.
- [Official guide](https://developers.openai.com/api/docs/guides/decisions): text, images, JSON; `predicate`, `choice`, `score`; only `gpt-6-luna` on this endpoint as reviewed; 400 questions maximum. The guide explains that the application executes actions. The comparison of up to 10x is against GPT-6 Luna on the Responses API, not a guarantee.
- Pricing in the announcement: $0.10 / 1M uncached input tokens, $0.01 / 1M cached input tokens, no output-token charge. Cache writes, other processing tiers, region and long context can add charges; voice, transcription and image processing elsewhere in a workflow have separate costs. Pricing and availability can change.

## Published demonstrations

- [Pat Simmons, AI for Mortals, 2026-10-07](https://www.aiformortals.co/blog/decisions-api) and [his code repository](https://github.com/per-simmons/decisions-api-demos): eight distinct projects, including the separate AssaultCube opener. The iPhone calorie app is described in the article but no corresponding source folder is listed in the repository. All counts, costs and timings are author reports, not reproduced. The game uses game-state access and code for movement/aiming; the voice and feed tests use synthetic inputs.
- [Decision Models Showdown](https://github.com/ivipinmishra/decision-models-showdown): two distinct fictional test workflows, 20 tickets and 15 alerts; its keyless provider is explicitly MOCK. No empirical winner is asserted.
- Community primary sources: [YouTube Filters](https://github.com/IvanCampos/YouTube-Filters), [Pretzel](https://github.com/appdess/decisions-api-demo), and [DemoPilot](https://github.com/Yash-1706/openai-dev-day-polaris). They are creator-provided prototypes; execution, quality and current hosting were not independently verified.
- OpenAI's showcase lists [Tempo](https://developers.openai.com/showcase/tempo), [Signal](https://developers.openai.com/showcase/signal), and [Ticker](https://developers.openai.com/showcase/ticker). Their initial live page text was inspected, but no interactive run or API call was made. Signal uses simulated traffic and Ticker a fictional market, not real-world autonomous driving or real-money trading.

## Examples and limits

- [Voice integration guide](https://developers.openai.com/api/docs/guides/decisions-voice), the avatar example in the OpenAI announcement, and [Agents SDK Decisions examples](https://openai.github.io/openai-agents-python/models/#decisions-api) are recipes, not reported production deployments. The SDK examples explicitly separate classification from permissions.
- [Vercel's handoff example](https://vercel.com/i/openai-decisions-api-use-cases), 2026-10-08, operates on a fictional note; it is a design example, not a reported production deployment.
- No API key is requested by this static catalogue. External sites have their own terms, billing and data handling. The locally authored category artwork is not an image from the linked demos.
