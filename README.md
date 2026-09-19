# Jev Atlas

Jev와 LLM의 협업 패턴을 탐색하는 한국어 독립 아카이브입니다. TypeSafe의 공식 사이트가 아닙니다.

## Catalogue

120개 활용 카드, 12개 분야. **공개 데모 7개 / 공식 예제 30개 / 응용 시나리오 83개**를 명확하게 구분합니다. 카드 수는 독립 도입 기업 수나 영상 수를 의미하지 않습니다. 같은 공개 프로젝트 안의 서로 다른 작업이 개별 카드일 수 있습니다.

각 카드에는 요약, Jev 역할, LLM 역할, 동작 흐름, 구현 시 주의점, 일차 출처와 자료 검토일이 있습니다. 응용 시나리오는 근거 문서의 패턴을 확장한 설계 아이디어이며 실제 도입 실적이나 성능을 주장하지 않습니다. 기준일: 2026-09-19.

## Run

런타임 의존성과 API 키가 없는 정적 HTML/CSS/JavaScript 사이트입니다. `index.html`을 직접 열거나 프로젝트 루트에서 정적 서버를 실행하세요.

```sh
python3 -m http.server 8080
```

`http://localhost:8080`에서 접속합니다. 배포 시 루트 디렉터리를 정적 콘텐츠로 제공하면 됩니다. 모든 자산 경로는 상대 경로이므로 GitHub Pages의 `/jev/` 같은 하위 경로도 지원합니다.

## Features

- 검색, 분야·근거 유형·영상/데모 필터, 이름순 정렬.
- 반응형 카드 그리드와 키보드 접근 가능한 상세 대화상자.
- 브라우저 내 즐겨찾기, `#case=...` 공유 링크, 검색 단축키 `/`.
- 2개의 원본 MP4 재생 경로, 3개의 외부 데모 경로, LangChain의 YouTube 기술 해설.
- 미디어는 명시적 재생 클릭 전 요청하지 않습니다. 모든 미디어에 원본 링크가 항상 표시됩니다. 외부 호스트의 재생·임베딩 허용 여부나 가용성은 보장하지 않습니다.
- 선택하지 않은 외부 미디어·폰트·분석 스크립트를 로드하지 않습니다. 즐겨찾기는 이 브라우저에만 저장되며 계정 간 동기화하지 않습니다.
- 저장소 차단·잘못된 저장값·미디어 오류에 대한 폴백, reduced-motion 지원.

## Structure

```text
index.html
assets/
  app.js        # UI, filters, dialog, local bookmarks, lazy media
  data.js       # 120 editorial cards and source registry
  styles.css
  favicon.svg
tests/
  catalog.test.cjs
```

`assets/data.js`의 `rows`는 파이프 구분 텍스트입니다. 열 순서: category, id, title, summary, jev, llm, flow, caution, primitives, sources, evidence, media. `flow`는 ` > `, 복수 primitive/source는 쉼표로 구분합니다. 텍스트에 구분 문자를 추가하지 마세요. 새 원문은 `sources`에 먼저 등록합니다.

## Validation

```sh
npm test
node --check assets/app.js
```

테스트는 카드 수·고유 ID·필수 필드·분류·근거 유형·출처 URL·영상 폴백을 검증합니다. 외부 사이트의 현재 응답 상태와 Jev의 실측 정확도를 검증하는 테스트는 아닙니다.

## Publishing

정적 호스팅에 별도 빌드 없이 배포할 수 있습니다. GitHub Pages를 사용할 때는 저장소 Settings → Pages에서 `main` 브랜치와 `/ (root)`를 선택하세요. Pages가 활성화된 뒤의 표준 주소는 `https://alibowbow.github.io/jev/`입니다. 이 설정은 코드 커밋과 별개입니다.

## Sources and media

TypeSafe의 공식 문서·발표, LangChain·Langfuse·Cloudflare의 공식 통합 안내, Browser Use와 DroidRun의 공개 저장소를 연결합니다. 원본 영상과 문서는 각 제작자에게 귀속됩니다. 외부 미디어를 복제하거나 재배포하지 않습니다. 카드의 한국어 설명과 시각적 개념도는 아카이브용 편집 콘텐츠입니다. 가격이나 성능 보증을 제공하지 않습니다.
