/* Jev Atlas editorial catalogue. Source-reviewed 2026-09-19. No API calls. */
(() => {
'use strict';
const D = 'https://docs.typesafe.ai/';
const sources = {
  intro: ['TypeSafe · Introduction', D+'introduction'],
  choice: ['TypeSafe · Choice', D+'primitives/choice'],
  score: ['TypeSafe · Score', D+'primitives/score'],
  noul: ['TypeSafe · Noul', D+'primitives/noul'],
  intent: ['TypeSafe · Intent routing', D+'patterns/intent-routing'],
  confidence: ['TypeSafe · Confidence-gated routing', D+'patterns/confidence-routing'],
  fanout: ['TypeSafe · Speculative fan-out', D+'patterns/fan-out'],
  composite: ['TypeSafe · Composite scoring', D+'patterns/composite-scoring'],
  rag: ['TypeSafe · Classifying RAG passages', D+'cookbooks/classifying_rag_passages'],
  rerank: ['TypeSafe · Re-ranking', D+'cookbooks/rerank_typesafe'],
  lines: ['TypeSafe · Line-by-line search', D+'cookbooks/semantic_find'],
  entity: ['TypeSafe · Entity alignment', D+'cookbooks/entity_alignment'],
  citation: ['TypeSafe · Double-checking citations', D+'cookbooks/citation_check'],
  guards: ['TypeSafe · Guardrails for LLMs', D+'cookbooks/llm_guardrails'],
  sde: ['TypeSafe · SDE cascade', D+'cookbooks/sde_cascade'],
  skill: ['TypeSafe · Skill suggestion', D+'cookbooks/skill_suggestion'],
  parallel: ['TypeSafe · Parallel questions', D+'cookbooks/parallel_questions'],
  format: ['TypeSafe · Structure recovery', D+'cookbooks/autoformat'],
  date: ['TypeSafe · Date extraction', D+'cookbooks/date_extraction_cookbook'],
  spans: ['TypeSafe · Pre-parsed value extraction', D+'cookbooks/pre_parsed_value_extraction_cookbook'],
  hierarchy: ['TypeSafe · Hierarchical classification', D+'cookbooks/hierarchical_classification'],
  industry: ['TypeSafe · Classification using confidence', D+'cookbooks/classification_using_confidence'],
  features: ['TypeSafe · Autoresearch feature discovery', D+'cookbooks/autoresearch_feature_discovery'],
  consistency: ['TypeSafe · Self-consistency: choices', D+'cookbooks/consistency_choice_cookbook'],
  uncertain: ['TypeSafe · Self-consistency: nouls', D+'cookbooks/consistency_noul_cookbook'],
  quick: ['TypeSafe · Quick start', D+'introduction/quickstart'],
  functions: ['TypeSafe · Function calling', D+'cookbooks/function_calling'],
  map: ['TypeSafe · Example use cases', D+'concepts/use-case-map'],
  home: ['TypeSafe · Smart home demo', D+'demos/smart-home'],
  launch: ['TypeSafe · Introducing Jev', 'https://typesafe.ai/blog/introducing-system-one-models-and-jev'],
  langchain: ['LangChain · Building a Harness with Jev', 'https://www.langchain.com/blog/building-a-harness-with-jev'],
  langfuse: ['Langfuse · Using Jev for evals', 'https://langfuse.com/blog/2026-09-18-using-typesafes-jev-for-evals'],
  cloudflare: ['Cloudflare · Jev integration', 'https://developers.cloudflare.com/ai/models/typesafe/jev/'],
  browser: ['Browser Use · Jev Ultrafast', 'https://github.com/browser-use/jev-ultrafast'],
  mobile: ['DroidRun · Mobile Jev', 'https://github.com/droidrun/mobile-jev'],
  models: ['TypeSafe · Models', D+'models'],
  limits: ['TypeSafe · Model limitations', D+'model-jaggedness/jev-1.13']
};
const categories = [
  ['agents','에이전트·비용','workflow','라우팅부터 검증까지, 생성 모델의 일을 더 작고 정확하게.'],
  ['browser','브라우저·모바일','monitor','화면의 요소를 고르고, 실제 동작은 실행기가 담당합니다.'],
  ['search','검색·RAG','search','방대한 자료에서 답변에 필요한 근거를 찾습니다.'],
  ['safety','검증·안전','shield','좁고 구체적인 검사로 답변과 실행의 오류를 줄입니다.'],
  ['documents','문서·데이터','file','원문을 보존하면서 문서의 구조와 의미를 읽습니다.'],
  ['support','고객지원','headphones','문의의 맥락을 이해하고 적절한 처리 경로로 연결합니다.'],
  ['commerce','커머스','bag','상품, 리뷰, 반품 데이터를 일관된 기준으로 정리합니다.'],
  ['operations','세일즈·운영','layers','반복적인 업무 판단을 명시적인 흐름으로 바꿉니다.'],
  ['development','개발·관측','code','코드와 에이전트의 상태를 분류하고 이상 징후를 점검합니다.'],
  ['research','연구·교육','book','자료 선별, 근거 점검, 학습 지원을 작은 판단으로 나눕니다.'],
  ['content','콘텐츠','pen','작성은 생성 모델이, 일관성과 기준 검사는 Jev가.'],
  ['games','게임·IoT','game','구조화된 상태와 제한된 행동으로 반응형 시스템을 만듭니다.']
].map(([id,name,icon,description])=>({id,name,icon,description}));
const media = {
  flights: {type:'video', url:'https://raw.githubusercontent.com/browser-use/jev-ultrafast/main/docs/demo.mp4', page:'https://github.com/browser-use/jev-ultrafast/blob/main/docs/demo.mp4', title:'Jev Ultrafast · Google Flights', credit:'Browser Use', note:'제작자가 공개한 항공편 검색 데모입니다. 예약·결제 완료 영상이 아닙니다.'},
  uber: {type:'video', url:'https://raw.githubusercontent.com/droidrun/mobile-jev/main/docs/media/uber-demo.mp4', page:'https://github.com/droidrun/mobile-jev/blob/main/docs/media/uber-demo.mp4', title:'Mobile Jev · Uber', credit:'DroidRun / Mobilerun', note:'목적지 입력 후 결제 수단 선택 화면까지의 데모입니다. 차량 호출 완료는 보여주지 않습니다.'},
  doom: {type:'link', page:'https://typesafe.ai/blog/introducing-system-one-models-and-jev', title:'TypeSafe · Doom demo', credit:'TypeSafe', note:'공식 발표 페이지의 Doom 데모에서 확인할 수 있습니다.'},
  wiki: {type:'link', page:'https://typesafe.ai/blog/introducing-system-one-models-and-jev', title:'TypeSafe · Wikiracing demo', credit:'TypeSafe', note:'공식 발표 페이지의 Wikiracing 데모로 연결됩니다.'},
  home: {type:'link', page:'https://docs.typesafe.ai/demos/smart-home', title:'TypeSafe · Smart home demo', credit:'TypeSafe', note:'공식 스마트홈 데모와 구현 설명으로 연결됩니다.'}
};
// category | id | title | summary | Jev role | LLM role | flow | caveat | primitives | sources | evidence | media
const rows = `
agents|model-router|작업에 맞는 LLM 라우팅|단순 조회와 복잡한 추론을 구분해 요청에 맞는 생성 모델을 고릅니다.|요청을 정의된 모델 선택지에 대응|선택된 모델이 답변·추론 수행|요청 > 난도·유형 판단 > 모델 선택 > 답변 생성|라우팅 결과와 실제 품질을 별도로 평가해야 합니다.|Choice|langchain|example|
agents|extraction-cascade|저가 생성 + 고성능 재처리|가벼운 LLM의 추출 결과를 검증하고, 문제가 있는 항목만 더 강한 모델로 보냅니다.|원문과 추출 필드의 불일치 검사|초기 추출 및 실패 항목 재처리|원문 > 저가 LLM > 필드 검증 > 필요 시 재처리|전체 비용에는 검증과 재호출 비용도 포함됩니다.|Noul,Choice|sde|example|
agents|skill-selector|에이전트 스킬 추천|많은 스킬을 전부 읽히는 대신 적합한 후보를 좁히고, 맞는 스킬이 없으면 선택을 보류합니다.|스킬 후보 순위와 적합성 판단|선택된 스킬을 읽고 작업 실행|요청 > 후보 순위 > 상위 후보 확인 > 스킬 로드|공식 예제의 테스트 결과가 모든 스킬 목록에 일반화되지는 않습니다.|Choice,Noul|skill|example|
agents|parallel-review|여러 판단을 한 번에|같은 문서에 대한 독립적인 질문을 한 요청에 묶어 반복 입력을 줄입니다.|분류·여부·점수를 병렬 평가|결과가 필요한 경우 설명문 작성|문서 > 복수 질문 > 병렬 판단 > 코드로 결과 조합|질문과 선택지의 입력 토큰도 과금 대상입니다.|Choice,Noul,Score|parallel|example|
agents|intent-dispatch|의도에 따라 처리 경로 분기|정해진 업무 처리, 생성형 응답, 사람의 검토를 요청 의도에 따라 연결합니다.|요청을 담당 처리 유형으로 분류|자유로운 설명이나 작성 담당|요청 > 의도 분류 > 처리기 선택 > 결과 응답|분류 목록 밖의 요청을 위한 기타·보류 경로가 필요합니다.|Choice|intent|example|
agents|confidence-gate|불확실하면 사람에게|선택 결과뿐 아니라 불확실성을 읽어 자동 처리와 검토 대기열을 분리합니다.|선택지별 확률과 확신도 반환|검토용 요약이나 추가 설명 작성|상태 > 판단 > 불확실성 점검 > 자동 처리 또는 검토|confidence는 개별 답변의 정답률 보증이 아닙니다.|Choice,Score|confidence|example|
agents|search-gate|검색이 필요한 질문 골라내기|제공된 자료만으로 답할 수 있는지 먼저 살펴 불필요한 검색이나 근거 없는 답변을 줄입니다.|답변에 필요한 정보의 존재 여부 판단|검색 결과를 바탕으로 최종 답변|질문·자료 > 근거 충분성 검사 > 필요 시 검색 > 생성|최신 정보가 필수인 작업은 코드 정책으로 검색을 강제합니다.|Noul|lines,intent|concept|
agents|tool-shortlist|도구 설명의 문맥 다이어트|도구 카탈로그에서 현재 작업에 맞는 후보만 골라 생성 모델에 전달합니다.|허용된 도구 후보의 관련성 판단|후보 중 도구를 사용하고 설명 작성|도구 목록 > 후보 선별 > LLM 계획 > 권한 검사 후 실행|도구를 숨기기 전에 정답 도구의 누락률을 측정해야 합니다.|Choice|skill|concept|
agents|loop-stop|에이전트 반복 종료 판단|작업 성공 조건을 작은 검사로 나눠 계속 진행할지, 검토로 넘길지 판단합니다.|현재 상태가 명시적 완료 조건을 만족하는지 검사|남은 작업을 계획하고 수행|실행 상태 > 완료 조건 검사 > 계속·보류·종료 > 결과 확인|모델의 완료 선언보다 실제 도구 상태를 우선합니다.|Noul,Choice|mobile,confidence|concept|
agents|repair-router|오류 종류별 복구 경로|생성 결과의 오류를 누락·근거 부족·형식 문제로 나눠 서로 다른 복구 절차에 연결합니다.|오류 유형 분류와 재검토 신호|문맥을 보충해 필요한 부분만 수정|초안 > 오류 분류 > 복구 경로 선택 > 재검증|JSON 구문이나 수치 계산 검사는 코드로 처리합니다.|Choice,Noul|sde,guards|concept|
browser|flight-search|항공편을 찾는 브라우저 에이전트|Jev가 화면의 조작 대상을 고르고, 입력할 텍스트가 필요할 때 작은 LLM과 협업합니다.|관측된 요소 중 행동과 대상 선택|TYPE_TEXT 단계의 문자열 생성|DOM 관측 > Jev 선택 > 필요 시 텍스트 생성 > 브라우저 실행|공개 데모는 항공편 검색까지이며 예약·결제를 수행하지 않습니다.|Choice|browser|demo|flights
browser|wiki-browser|목표 위키 문서 찾아가기|자연어 목표를 받아 검색과 링크 선택으로 지정된 Wikipedia 문서를 여는 공개 예제입니다.|현재 화면에서 다음 요소 선택|입력 문자열이 필요한 단계 보조|목표 > 화면 요소 읽기 > 검색·탐색 > 대상 문서 확인|한 작업의 실행 기록은 일반적인 브라우저 성공률이 아닙니다.|Choice|browser|demo|
browser|hotel-filter|숙소 검색·필터 조작|공개 저장소에서 로컬 숙소 검색 화면의 필터 작업을 동일한 에이전트 정책으로 시험했습니다.|검색 화면의 필터와 조작 선택|검색 문자열 생성 보조|검색 조건 > 요소 선택 > 필터 적용 > 결과 검증|로컬 테스트 페이지 결과이며 실제 예약 사이트 전반의 검증은 아닙니다.|Choice|browser|demo|
browser|mobile-uber|스마트폰에서 경로 입력|실제 Android 앱을 조작해 출발지와 목적지를 입력하고 결제 수단 선택 화면에 도달합니다.|관측된 앱 상태에서 다음 조작 결정|확장 시 복합 목표 해석·설명에 사용 가능|기기 상태 > 조작 결정 > Mobilerun 실행 > 새 화면 확인|공개 영상은 차량 호출이나 결제 완료를 입증하지 않습니다.|Choice|mobile|demo|uber
browser|android-theme|Android 다크 모드 전환|설정 앱을 탐색해 다크 테마를 켜고 실제 스위치 상태를 다시 읽어 성공을 확인하는 예제입니다.|앱·설정 항목·행동 선택|정해진 설정 변경에는 필수 아님|설정 탐색 > 다크 테마 선택 > 전환 > 상태 재확인|기기·언어·운영체제 버전에 따라 화면 구성이 달라집니다.|Choice|mobile|demo|
browser|app-launcher|자연어 앱 실행기|설치된 앱 목록을 선택지로 주고 요청과 가장 관련된 앱을 엽니다.|등록된 앱 중 대상 선택|복합 요청을 정리하거나 후속 설명|요청 > 설치 앱 목록 > 앱 선택 > 허용된 실행|설치되지 않은 앱을 만들어내지 않도록 없음 선택지를 둡니다.|Choice|mobile,choice|concept|
browser|dropdown-selector|드롭다운 항목 선택|자유 텍스트를 화면에 실제 존재하는 옵션에 맞춰 선택하는 폼 보조 기능입니다.|관측된 옵션 중 의미에 맞는 항목 선택|복잡한 입력 요구를 정리|필드 요구 > 현재 옵션 > 후보 판단 > 옵션 선택|화면이 바뀌면 기존 요소 참조를 재검증해야 합니다.|Choice|browser|concept|
browser|form-completeness|폼 제출 전 누락 확인|필드의 의미를 이해해 비어 있거나 서로 충돌하는 입력을 표시합니다.|요구사항 대비 입력 누락·충돌 검사|수정 안내문과 추가 질문 작성|폼 상태 > 의미 검사 > 수정 안내 > 사용자 확인|실제 제출은 별도 승인과 서버 유효성 검사 뒤에 수행합니다.|Noul|sde,guards|concept|
browser|stale-ui-recovery|바뀐 화면에서 행동 재선택|페이지 이동이나 UI 갱신 뒤 이전 판단이 더는 유효하지 않을 때 새 상태에서 다시 선택합니다.|새 관측에서 허용된 행동 선택|동일 조건의 입력 문자열은 필요 시 재사용|화면 갱신 > 참조 검증 > 상태 재관측 > 행동 재선택|요소의 신선도·가림 여부 검사는 브라우저 코드가 담당합니다.|Choice|browser|concept|
browser|completion-proof|완료 메시지보다 실제 상태|에이전트가 끝났다고 말해도 실제 화면이나 저장 결과가 목표와 일치하는지 따로 확인합니다.|관측 상태와 성공 조건의 의미적 일치 판단|검증된 사실만 완료 보고로 작성|실행 > 결과 재관측 > 성공 조건 검사 > 완료 보고|결제·삭제 등 중요한 동작은 모델 판단만으로 승인하지 않습니다.|Noul|mobile,guards|concept|
search|bm25-rerank|검색 결과 다시 정렬하기|빠른 키워드 검색으로 후보를 만든 뒤 질문과 각 후보의 관련성을 다시 평가합니다.|질문과 후보 문서의 관련성 판단|선택된 근거로 답변 작성|키워드 검색 > 후보 목록 > 재순위화 > 근거 전달|후보 검색에서 누락된 문서는 재정렬만으로 복원할 수 없습니다.|Noul|rerank|example|
search|semantic-lines|뜻으로 찾는 문서 내 검색|정확한 단어가 일치하지 않아도 질문에 답하는 줄을 찾고, 답이 아예 없는지도 확인합니다.|줄 ID 선택과 답변 존재 여부 검사|선택된 줄을 풀어 설명|문서에 줄 ID 부여 > 관련 줄 선택 > 존재 여부 검사 > 원문 표시|선택지 중 1위가 있다는 사실만으로 답이 존재한다고 볼 수 없습니다.|Choice,Noul|lines|example|
search|rag-context|RAG 문맥 선별|검색된 조각을 유용한 근거·상충 근거·제외 대상으로 구분해 답변 모델의 문맥을 구성합니다.|문서 조각의 관련성과 위험 신호 판단|선별한 원문을 근거로 답변|검색 후보 > 조각 분류 > 코드로 문맥 조립 > 답변|상충하는 자료를 단순히 버리면 편향된 답변이 될 수 있습니다.|Noul,Score|rag|example|
search|entity-alignment|지식 그래프의 같은 대상 찾기|서로 다른 목록에서 같은 대상을 가리키는 기록을 찾아 병합·유지·검토로 나눕니다.|후보 쌍의 동일성 및 충돌 판단|검토자가 읽을 설명 작성은 선택 사항|후보 쌍 > 동일성 평가 > 병합·보류 결정 > 출처 보존|잘못된 병합을 되돌릴 수 있도록 원본과 연결 이력을 남깁니다.|Score,Noul|entity|example|
search|document-picker|질문에 맞는 문서 선택|질문과 문서의 설명을 비교해 읽어야 할 파일을 우선순위로 정리합니다.|권한 내 문서 후보의 관련성 판단|고른 문서를 읽고 종합 답변|권한 필터 > 후보 수집 > 관련성 판단 > 문서 읽기|접근 권한은 모델이 아니라 검색 서버에서 먼저 제한합니다.|Choice|lines,skill|concept|
search|faq-match|의미가 같은 FAQ 연결|표현이 다른 질문을 검수된 FAQ 항목과 연결하고 맞는 답이 없으면 일반 상담으로 넘깁니다.|FAQ 선택과 답변 적합성 판단|FAQ를 상황에 맞게 설명|질문 > FAQ 후보 > 적합성 검사 > 응답·상담|선택 확률만으로 충분성을 판단하지 말고 별도 없음 경로를 둡니다.|Choice,Noul|intent,lines|concept|
search|search-dedup|중복 검색 결과 정리|제목이나 주소가 달라도 같은 내용을 재게시한 문서인지 비교해 결과 목록을 정돈합니다.|문서 후보 쌍의 내용 동일성 평가|다양한 원문을 묶어 요약|후보 검색 > 중복 후보 묶기 > 의미 비교 > 대표·원본 링크|업데이트나 반론을 중복으로 제거하지 않도록 구분합니다.|Score|entity|concept|
search|codebase-find|코드베이스를 계층적으로 탐색|폴더에서 파일로 단계적으로 범위를 좁혀 요청에 맞는 소스 위치를 찾는 공식 예제입니다.|파일 트리 각 단계의 관련 경로 선택|찾은 코드를 읽고 수정·설명|요청 > 폴더 후보 > 경로 탐색 > 파일 확인|초기 경로를 잘못 고를 수 있어 여러 후보를 유지하는 방식이 유용합니다.|Choice|hierarchy|example|
search|conflicting-evidence|서로 모순되는 근거 표시|같은 주제의 자료가 동일한 범위와 시점에서 상충하는지 표시해 비교 검토를 돕습니다.|주장 쌍의 지지·모순·판단 불가 분류|차이가 발생한 조건을 설명|주장·근거 > 조건 정렬 > 관계 판정 > 비교 설명|시점·대상 집단이 다른 결과를 곧바로 모순으로 처리하지 않습니다.|Choice|citation|concept|
search|resolved-case-retrieval|유사한 해결 사례 검색|새 문의와 과거 해결 기록을 비교해 재사용 가능한 해결 절차를 찾아줍니다.|증상·환경이 유사한 기록의 순위화|현재 조건에 맞는 안내 작성|문의 > 해결 기록 후보 > 관련성 평가 > 절차 검토|버전이 달라진 절차는 최신 지원 문서로 다시 확인합니다.|Score|rerank|concept|
safety|citation-check|인용이 주장을 뒷받침하는가|출처가 존재하는 것과 실제로 주장을 지지하는 것을 구분해 잘못 붙인 인용을 찾습니다.|주장과 출처 문맥의 관계 판단|문제 있는 주장이나 인용 수정|주장·원문 > 지지 여부 검사 > 검토 표시 > 수정|원문 자체의 진실성을 증명하는 검사는 아닙니다.|Choice|citation|example|
safety|llm-guardrails|LLM 입출력 가드레일|입력과 출력에서 정의된 위험 신호를 검사해 통과·검토·차단 경로를 분리합니다.|위험 유형의 존재와 심각도 평가|허용된 응답을 생성하거나 수정|입력 검사 > LLM 생성 > 출력 검사 > 전달|보안 경계나 권한 제어를 모델 검사로 대체하지 않습니다.|Noul,Score|guards|example|
safety|tool-safety|도구 실행 전 위험 점검|LangChain 미들웨어에서 도구 호출이 위험한 행동을 포함하는지 실행 전에 검사합니다.|도구 요청의 위험 신호 분류|작업 계획과 허용된 도구 요청 작성|도구 요청 > 정책 검사 > 차단·검토 > 허용된 실행|셸 격리·허용 목록·사용자 승인은 독립적으로 유지합니다.|Noul,Choice|langchain|example|
safety|moderation-abstain|애매한 콘텐츠는 검토로|분류 결과가 흔들리는 게시물은 자동 조치하지 않고 명시적인 불확실 상태로 남깁니다.|규정에 따른 분류와 분포 제공|검토 근거 요약은 선택 사항|게시물 > 규정별 분류 > 불확실 구간 > 검토 대기|공식 예제는 제한된 반복 실험이며 광범위한 정확도 보증이 아닙니다.|Choice|consistency|example|
safety|probability-review|경계 확률의 수동 검토|예·아니오 판단이 경계에 있을 때 이분법으로 확정하지 않고 검토 대상으로 남깁니다.|각 질문의 P(true) 반환|검토에 필요한 정보 정리|자료 > 여러 여부 판단 > 경계 구간 확인 > 사람 검토|보험 등 고위험 의사결정의 최종 판단을 자동화하는 용도로 보지 않습니다.|Noul|uncertain|example|
safety|pii-screen|발송 전 민감 정보 점검|생성된 메시지에 공개해서는 안 되는 정보가 섞였는지 탐지하는 보조 검사입니다.|허용 범위를 벗어난 정보 노출 가능성 표시|해당 부분을 제거한 초안 작성|초안 > 패턴 검사 > 의미 검사 > 승인 후 발송|정규식·DLP·접근 통제와 함께 사용하고 완전 탐지를 보장하지 않습니다.|Noul|guards|concept|
safety|negation-preservation|부정 표현이 뒤집히지 않게|원문에서 없다고 한 사실이 요약에서 있다고 바뀌는 오류를 좁은 검사로 찾습니다.|원문과 요약의 긍정·부정 일치 검사|충돌한 문장만 다시 작성|원문·요약 > 부정 의미 검사 > 문제 구간 표시 > 수정|불명확한 표현은 단정하지 않고 원문을 함께 보여줍니다.|Choice|citation|concept|
safety|unsupported-promise|근거 없는 약속 탐지|정책이나 승인 기록에 없는 일정·보상·기능을 답변이 약속하는지 살펴봅니다.|약속과 승인된 근거의 일치 판단|근거에 맞는 답변으로 수정|정책·초안 > 약속 검사 > 검토 표시 > 답변 수정|최신 정책 버전과 실제 승인 정보를 입력해야 합니다.|Noul|citation,guards|concept|
safety|answer-checklist|필수 답변 항목 점검|요청에서 요구한 항목이 결과에 빠졌는지 항목별로 검사합니다.|필수 항목 충족 여부 평가|누락된 내용만 보완|요구 목록 > 초안 > 항목별 검사 > 보완|형식 충족과 내용의 사실성은 별개로 평가합니다.|Noul|sde|concept|
safety|execution-grounding|실행하지 않은 일의 완료 보고 방지|도구 기록에 없는 작업을 에이전트가 완료했다고 쓰는지 비교합니다.|완료 주장과 실행 결과의 일치 검사|실제로 확인된 결과만 보고|도구 로그 > 완료 초안 > 근거 비교 > 보고 수정|도구 응답의 성공 여부는 먼저 코드로 검사합니다.|Choice|guards,citation|concept|
documents|structure-recovery|깨진 문서 구조 복원|서식이 사라진 텍스트에서 문단·제목·목록·코드를 구분해 원문을 보존하며 구조를 복원합니다.|줄 연결과 블록 유형 분류|문구를 다시 쓰지 않는 복원에는 필수 아님|원문 > 줄 연결 판단 > 블록 분류 > 코드 렌더링|잘못된 구조 분류를 고칠 수 있도록 원문을 남깁니다.|Noul,Choice|format|example|
documents|date-parts|자연어 날짜를 안전하게 추출|문서에 적힌 날짜 요소를 고른 뒤 실제 날짜 계산과 유효성 검사는 코드에서 수행합니다.|날짜 종류와 문서에 명시된 구성요소 선택|모호한 날짜에 대한 추가 질문 작성|문서 > 날짜 요소 선택 > 코드 계산 > 검토·확정|상대 날짜에는 기준 날짜와 시간대가 필요합니다.|Choice|date|example|
documents|span-extraction|이메일·전화·금액 원문 추출|코드가 찾은 값 후보 중 의미에 맞는 항목을 고르고 원문 값을 그대로 복사합니다.|후보 값의 역할과 대상 선택|추출 후 설명이 필요한 경우만 사용|패턴 후보 > 의미 선택 > 원문 복사 > 형식 검증|후보 추출기가 놓친 값은 모델도 선택할 수 없습니다.|Choice,Noul|spans|example|
documents|industry-classification|사업보고서의 산업 분류|사업 설명을 산업군에 분류하고, 세부 분류가 불확실하면 더 넓은 분류로 표시합니다.|산업군 선택과 확신도 반환|산업 분류에 대한 설명 작성은 선택 사항|사업 설명 > 산업군 선택 > 확신도 점검 > 분류 표시|공식 예제의 SIC 분류를 다른 국가의 분류에 그대로 적용하지 않습니다.|Choice|industry|example|
documents|receipt-verify|영수증 추출 결과 검수|OCR·LLM이 읽은 판매자와 금액 등의 필드가 추출된 원문과 맞는지 확인합니다.|원문 대비 필드의 의미적 일치 검사|이미지·텍스트를 읽어 초기 필드 추출|OCR·추출 > 필드 대조 > 계산 검증 > 검토|Jev에 이미지를 직접 보내는 설계가 아니라 텍스트를 전달합니다.|Noul|sde,spans|concept|
documents|vendor-records|거래처 중복 기록 정리|띄어쓰기와 표기가 다른 거래처 후보를 비교해 동일한 조직인지 검토합니다.|조직 정보 후보 쌍의 동일성 판단|검토용 차이 요약 작성|후보 생성 > 동일성 비교 > 검토 > 병합 이력 보존|확정 식별자가 있으면 모델보다 정확한 일치 규칙을 우선합니다.|Score|entity|concept|
documents|schema-mapping|다른 이름의 열을 공통 필드로|여러 문서의 필드명을 표준 스키마 후보에 대응시켜 데이터 가져오기를 돕습니다.|열 이름과 표본의 의미를 표준 필드에 대응|알 수 없는 필드 설명을 작성|입력 스키마 > 필드 후보 > 의미 매핑 > 형식 검증|날짜·통화·단위 변환은 코드로 검증합니다.|Choice|choice,spans|concept|
documents|meeting-segments|회의록의 결정과 논의 구분|발언을 확정 결정·미해결 질문·후속 작업·단순 논의로 나눠 표시합니다.|발언 블록의 역할 분류|분류 결과로 회의 요약 작성|전사문 > 발언 분류 > 원문 연결 > 회의 요약|가능성을 논의한 것을 확정 결정으로 바꾸지 않도록 검토합니다.|Choice|format|concept|
documents|clause-checklist|문서의 필수 조항 체크|제공된 체크리스트와 문서 원문을 대조해 필요한 항목의 존재 여부를 확인합니다.|조항별 존재·불명확 여부 판단|검토 메모 작성|체크리스트·문서 > 항목 검사 > 근거 위치 > 전문가 검토|법적 유효성이나 최신 법령 준수를 자동으로 보증하지 않습니다.|Noul|lines,citation|concept|
documents|record-conflicts|레코드 간 충돌 정리|같은 대상의 여러 기록에서 서로 다른 속성을 찾아 정합성 검토 목록을 만듭니다.|동일 대상 여부와 속성 충돌 판단|차이점 설명 작성|기록 후보 > 대상 정렬 > 충돌 표시 > 원본 확인|최신 기록이라고 항상 올바른 값인 것은 아닙니다.|Score,Noul|entity|concept|
support|ticket-triage|지원 문의의 긴급도·담당 분류|지원 메시지에서 긴급성, 담당 팀, 상태를 함께 읽는 공식 시작 예제입니다.|문의 유형·긴급도 등 복수 판단|고객에게 전달할 답변 작성|문의 > 복수 판단 > 담당 큐 > 응답|감정이나 어조만으로 처리 우선순위를 확정하지 않습니다.|Choice,Noul,Score|quick|example|
support|product-area|제품 영역별 지원팀 배정|같은 오류 표현이라도 결제·로그인·연동 등 실제 영향을 받는 제품 영역으로 분기합니다.|제품 영역과 문의 목적을 독립 분류|영역에 맞는 안내 작성|문의 > 영역·목적 분류 > 팀 배정 > 안내|여러 영역에 걸친 문의는 단일 팀으로 강제하지 않습니다.|Choice|fanout|concept|
support|refund-path|환불 요청과 정책 문의 구분|환불을 원하는지, 이미 진행 중인 환불 상태를 묻는지, 정책만 묻는지 구분합니다.|요청의 업무 유형 선택|선택된 정책과 조회 결과 설명|문의 > 환불 의도 분류 > 조회·검토 > 안내|환불 실행 권한과 승인 절차는 별도로 유지합니다.|Choice|intent|concept|
support|frustration-signal|불만 표현을 검토 신호로|문의에 나타난 좌절이나 반복 실패 표현을 읽어 상담사가 참고할 신호로 제공합니다.|명시된 불만의 강도를 기준별 평가|차분하고 적절한 응답 작성|문의 > 불만 신호 평가 > 상담사 표시 > 응답|사람의 성격·정신 상태를 추론하는 점수로 사용하지 않습니다.|Score|score|concept|
support|cancellation-intent|명시적인 해지 의사 감지|사용자가 실제로 해지를 요청했는지, 기능을 묻는 것인지 구분해 올바른 절차로 연결합니다.|해지 요청의 존재와 업무 유형 판단|해지 안내 및 필요한 확인 질문|문의 > 의사 확인 > 해지 절차 > 사용자 확인|이탈 예측 점수를 실제 행동의 확률로 단정하지 않습니다.|Noul,Choice|intent,noul|concept|
support|call-followup|상담 중 약속한 후속 작업|전사문에서 약속된 연락·자료 전달·조사 요청을 기존 업무 종류에 대응합니다.|후속 행동 존재와 작업 유형 분류|선별된 원문으로 후속 작업 초안 작성|상담 전사 > 약속 구간 > 작업 분류 > 담당자 승인|전사 오류와 약속의 주체를 확인한 뒤 등록합니다.|Choice,Noul|format|concept|
support|missing-information|추가 질문이 필요한 문의|오류 재현이나 주문 확인에 꼭 필요한 정보가 있는지 확인한 뒤 부족한 항목을 묻습니다.|필수 정보별 충족 여부 검사|빠진 항목만 자연스럽게 질문|문의 > 필수 정보 검사 > 누락 목록 > 질문 작성|민감한 정보는 필요 최소한으로 요청합니다.|Noul|sde|concept|
support|duplicate-tickets|같은 문제의 문의 묶기|같은 사용자가 채널을 바꿔 보낸 문의 후보를 비교해 중복 대응을 줄입니다.|문의 내용·대상의 동일성 판단|묶인 기록의 경과 요약|권한 내 후보 > 중복 비교 > 검토 > 사건 연결|다른 사용자의 문의를 개인정보와 함께 병합하지 않습니다.|Score|entity|concept|
support|outage-match|알려진 장애와 문의 연결|현재 문의의 증상을 등록된 장애 기록과 비교해 관련 공지나 상태 페이지로 연결합니다.|장애 후보와 증상의 관련성 평가|실제 장애 상태에 맞는 답변 작성|문의 > 장애 후보 > 관련성 평가 > 공지 안내|장애 발생·해결 시점은 실제 운영 데이터로 확인합니다.|Score|rerank|concept|
support|support-response-policy|지원 답변의 정책 일치 검사|작성된 답변이 제공된 환불·보증·지원 정책을 벗어나지 않는지 문장별로 살펴봅니다.|답변 주장과 정책 근거 비교|불일치 문장 수정|정책·초안 > 주장 검사 > 검토 > 수정 답변|정책에 없는 예외를 모델이 승인하게 하지 않습니다.|Choice|citation|concept|
commerce|shopify-taxonomy|상품을 세부 카테고리까지|공식 상품 분류 트리를 단계적으로 탐색해 넓은 부서에서 구체적인 상품군으로 좁힙니다.|분류 트리의 다음 경로 선택|선택된 카테고리 설명 작성은 선택 사항|상품 설명 > 대분류 > 후보 경로 유지 > 세부 분류|공식 예제의 분류 체계 버전과 실제 판매 채널의 체계를 맞춥니다.|Choice|hierarchy|example|
commerce|attribute-normalize|상품 속성 표준화|판매자마다 다른 재질·핏·용도 표현을 정해진 속성 목록에 맞춰 정리합니다.|설명에서 표준 속성 후보 선택|읽기 쉬운 설명문 작성|상품 원문 > 후보 속성 > 의미 선택 > 정규화|숫자 단위와 실제 사양은 별도 검증합니다.|Choice|spans|concept|
commerce|duplicate-listings|동일 상품의 중복 등록 찾기|모델명이나 판매자 표기가 다른 상품 후보를 비교해 같은 제품인지 확인합니다.|제품 후보 쌍의 동일성 판단|관리자용 차이 설명 작성|모델명 후보 > 속성 대조 > 동일성 평가 > 검토|옵션·용량·세대가 다른 제품을 병합하지 않도록 합니다.|Score|entity|concept|
commerce|spec-consistency|상세 설명과 사양표 대조|상품의 홍보 문구가 제공된 사양표와 서로 충돌하는지 확인합니다.|문구와 사양의 지지·모순 관계 판단|확인된 사양에 맞게 문구 수정|사양표·설명 > 주장 대조 > 불일치 표시 > 수정|문구의 일치가 제품 성능의 독립 검증을 의미하지는 않습니다.|Choice|citation|concept|
commerce|listing-policy|상품 등록 정책 검토|제공된 판매 규정에 비추어 제한 대상일 가능성이 있는 등록물을 검토 대기열로 보냅니다.|텍스트의 규정 위반 신호 탐지|판매자에게 수정 안내 작성|등록 텍스트 > 규정 검사 > 검토 > 처리|이미지 판독과 최종 제재 결정은 별도 절차가 필요합니다.|Noul|guards|concept|
commerce|return-reasons|반품 사유를 일관되게 분류|자유롭게 적힌 반품 사유를 사이즈·파손·오배송·단순 변심 같은 운영 분류로 정리합니다.|반품 사유 후보 선택|추가 정보 요청이나 안내 작성|반품 설명 > 사유 분류 > 처리 경로 > 안내|자동 분류만으로 보상 여부를 확정하지 않습니다.|Choice|choice|concept|
commerce|product-relevance|검색 의도와 상품의 관련성|검색어와 후보 상품을 비교해 단어가 아닌 실제 용도와 조건에 맞는 결과를 앞에 둡니다.|상품 후보의 질의 적합성 평가|조건에 맞는 상품을 설명|검색 후보 > 조건 대조 > 재정렬 > 설명|재고·가격·배송 조건은 실시간 데이터로 별도 확인합니다.|Score|rerank|concept|
commerce|review-features|리뷰에서 제품별 신호 추출|리뷰를 배송·내구성·설치 난도 등 설명 가능한 축으로 바꿔 집계와 분석에 활용합니다.|속성별 평가 신호 생성|집계 결과를 문장으로 요약|리뷰 > 속성별 질문 > 수치 집계 > 분석|모델 점수는 실제 고장률이나 객관적 성능 측정치가 아닙니다.|Score,Noul|features|concept|
commerce|substitute-match|조건에 맞는 대체 상품 후보|단종·품절 상품의 대체 후보를 용도와 호환 조건별로 비교해 검토 목록을 만듭니다.|조건별 유사성과 불일치 평가|후보 차이점 설명|조건 > 후보 목록 > 기준별 평가 > 비교 표시|전기·안전·치수 호환성은 검증된 사양과 코드 규칙을 우선합니다.|Score|composite|concept|
commerce|multilingual-catalog|다국어 상품 태그 정리|여러 언어의 상품 설명을 같은 태그 체계로 연결하는 분류 계층을 설계합니다.|텍스트를 공통 태그 후보에 대응|원문 번역·지역화 문구 작성|상품 설명 > 언어별 평가 > 공통 태그 > 검토|한국어 등 언어별 분류 품질을 별도로 측정해야 합니다.|Choice|choice,models|concept|
operations|sales-inbox|영업 문의의 목적 분기|가격 문의·기술 검토·파트너십·기존 고객 지원을 나눠 담당 흐름으로 연결합니다.|문의 목적 분류|목적에 맞는 회신 초안 작성|문의 > 목적 분류 > 담당 경로 > 회신|계약 조건 제시나 외부 발송은 승인 뒤 수행합니다.|Choice|intent|concept|
operations|quote-request|명시적인 견적 요청 찾기|문의에서 가격표 열람과 구체적인 견적 요청을 구분해 필요한 다음 질문을 정합니다.|견적 의사와 정보 충족 여부 판단|수량·범위 등 추가 질문 작성|문의 > 견적 요청 여부 > 정보 점검 > 후속 질문|관심 신호를 구매 확정이나 매출 확률로 해석하지 않습니다.|Noul|noul,sde|concept|
operations|company-fit|기업 문의의 제품 적합성|명시된 요구와 제품의 제공 범위를 기준별로 비교해 영업 상담의 준비 자료를 만듭니다.|요구 충족·부족·불명확 요소 평가|지원 범위와 제약 설명|요구사항 > 제품 기준 > 항목 평가 > 검토 메모|제공되지 않은 기업 정보나 숨은 구매 의도를 추정하지 않습니다.|Score|composite|concept|
operations|crm-industry|기업 설명의 산업 태깅|CRM에 적힌 기업 설명을 지정된 산업 분류로 정리하고 애매한 결과는 넓은 분류로 남깁니다.|산업 후보 선택과 확신도 제공|태그 근거 요약은 선택 사항|기업 설명 > 산업 후보 > 불확실성 점검 > 태그 저장|실제 사업과 계획 중인 사업을 구분하는 기준이 필요합니다.|Choice|industry|concept|
operations|invoice-exceptions|청구 문서의 예외 분류|청구 관련 메시지에서 수정 요청·중복 의심·만기 문의를 분류해 검토 순서를 정합니다.|문서의 업무 유형·예외 신호 판단|확인 요청 메일 초안 작성|청구 메시지 > 유형 판단 > 수치·날짜 검증 > 검토|지급 승인·계좌 변경은 별도의 확인과 권한 통제로 처리합니다.|Choice|date,spans|concept|
operations|vendor-checklist|거래처 제출 서류 점검|정해진 온보딩 문서 목록과 제출 내용을 비교해 빠진 항목을 찾아냅니다.|필수 서류의 존재와 관련성 판단|보완 요청 초안 작성|제출 자료 > 체크리스트 > 누락 검사 > 담당 검토|문서의 진위나 자격 유효성을 모델이 보증하지 않습니다.|Noul|sde|concept|
operations|incident-priority|운영 사건의 영향도 분류|사건 설명을 고객 영향·진행 여부·대체 수단 유무로 나눠 운영 검토를 돕습니다.|독립적인 영향 기준 평가|확인된 사실로 상황 보고 작성|사건 기록 > 영향 기준 평가 > 코드 우선순위 > 검토|객관적인 모니터링 수치와 경보 규칙이 우선입니다.|Score|composite|concept|
operations|delivery-exceptions|배송 예외 메시지 분류|택배사나 고객의 자유 텍스트를 주소 문제·부재·지연·파손 관련 절차로 연결합니다.|예외 유형 선택|처리 절차와 필요한 정보를 안내|상태 메시지 > 유형 분류 > 처리 경로 > 안내|실제 위치나 도착 예정 시각을 텍스트만으로 추정하지 않습니다.|Choice|choice|concept|
operations|email-action|메일의 다음 행동 분류|읽고 끝낼 메일, 답장이 필요한 메일, 자료 확인이 필요한 메일을 구분합니다.|명시된 요청과 후속 행동 유형 판단|회신이나 작업 초안 작성|메일 > 행동 분류 > 담당 큐 > 사용자 승인|이 분류 기능 자체가 메일을 자동 발송하거나 삭제하지는 않습니다.|Choice,Noul|intent|concept|
operations|demand-features|운영 텍스트의 수요 신호|문의와 영업 메모의 제품 관심·납기 우려를 구조화해 별도 수요 모델의 입력으로 사용합니다.|텍스트 속 의미 신호를 수치화|집계된 변화의 설명 작성|텍스트 > 의미 특성 > 시계열 모델 > 검증|예측 정확도는 별도 학습·검증 데이터로 평가해야 합니다.|Score,Noul|features|concept|
development|langfuse-evals|Langfuse 트레이스 평가|Jev의 구조화된 평가를 관측 도구와 연결해 실행 기록을 검사하는 공식 연동 가이드입니다.|입출력에 대한 정의된 평가 반환|원래 에이전트 작업과 분석 설명|실행 트레이스 > Jev 평가 > 점수 기록 > 관측|검사 기준은 앱별로 작성하고 실제 오류와 대조합니다.|Noul,Choice,Score|langfuse|example|
development|cloudflare-worker|Cloudflare에서 판단 함수 호출|Workers AI의 Jev 연동으로 텍스트 상태에 대한 긴급도와 담당 분류를 요청하는 예제입니다.|typed 질문에 대한 구조화된 판단|후속 생성 모델이 답변 작성|Worker 입력 > Jev 호출 > 분기 > 결과 반환|플랫폼의 모델 가용성과 요금은 배포 전에 확인합니다.|Noul,Choice,Score|cloudflare|example|
development|typed-functions|타입이 정해진 함수 호출|함수 이름과 열거형 인자를 미리 정의하고 자연어 요청을 유효한 호출 후보에 대응합니다.|허용된 함수·인자 값 선택|자유 텍스트 생성이 필요한 경우 보조|요청 > 함수 선택 > 인자 선택 > 코드 검증·실행|유효한 타입이어도 잘못된 함수를 선택할 수 있습니다.|Choice,Noul|functions|example|
development|issue-triage|개발 이슈의 종류 분류|새 이슈를 버그·기능 제안·사용 질문으로 나눠 적합한 템플릿이나 대기열로 보냅니다.|이슈 목적·영역 분류|추가 질문과 답변 초안 작성|이슈 > 유형 분류 > 템플릿 선택 > 검토|자동 분류를 이유로 이슈를 무조건 닫지 않습니다.|Choice|intent|concept|
development|semantic-lint|팀 규칙을 읽는 의미 린트|구문 검사로 잡기 어려운 코드·문서 규칙을 구체적인 질문으로 만들어 검토합니다.|제공된 팀 규칙의 위반 신호 판단|수정안 제시|변경 내용 > 규칙 검사 > 검토 주석 > 수정|보안 분석·컴파일·테스트를 대체하지 않는 보조 린트입니다.|Noul|map,guards|concept|
development|pr-coverage|변경 요청의 반영 여부|PR의 요구사항과 변경 내용을 비교해 빠진 요구나 범위를 벗어난 변경을 표시합니다.|요구 항목별 반영 여부 판단|누락 보완 코드 작성|요구사항·diff > 항목 검사 > 검토 > 보완|실제 동작 여부는 테스트와 코드 리뷰로 확인합니다.|Noul|sde|concept|
development|test-failure-route|테스트 실패의 담당 경로|실패 로그를 테스트 환경·의존성·제품 동작 문제 후보로 나눠 조사 순서를 돕습니다.|실패 원인 유형의 후보 분류|선별된 로그를 바탕으로 디버깅|실패 로그 > 유형 후보 > 담당 배정 > 원인 조사|유형 분류를 실제 근본 원인 확정으로 취급하지 않습니다.|Choice|intent|concept|
development|log-clusters|비슷한 오류 로그 묶기|표면 문자열이 달라도 같은 실패 유형을 설명하는 로그 후보를 연결합니다.|로그 쌍의 의미적 유사성 판단|사건별 요약 작성|규칙 기반 후보 > 의미 비교 > 사건 그룹 > 요약|타임스탬프·서비스 ID는 코드로 처리하고 민감 값은 제거합니다.|Score|entity|concept|
development|release-note-check|릴리스 노트와 변경 이력 대조|릴리스 노트에 적힌 기능이나 수정이 실제 변경 이력에 존재하는지 확인합니다.|문장과 커밋·검증 기록의 근거 관계 판단|검증된 변경만으로 릴리스 노트 수정|변경 이력 > 초안 > 근거 비교 > 검토|커밋에 코드가 있다고 배포가 완료됐다고 단정하지 않습니다.|Choice|citation|concept|
development|trace-taxonomy|에이전트 실패 유형 태깅|실행 기록을 검색 누락·도구 오류·근거 없는 응답 등 정의된 유형으로 분석합니다.|트레이스의 실패 신호 분류|분류별 원인 분석과 개선안 작성|실행 기록 > 실패 태깅 > 통계 집계 > 개선 실험|원본 트레이스와 평가 기준 버전을 함께 남깁니다.|Choice,Noul|langfuse|concept|
research|feature-discovery|LLM + Jev + 예측 모델|LLM이 평가 질문을 제안하고 Jev가 텍스트를 특성으로 바꾸며 별도 모델이 예측을 학습합니다.|각 행에 대한 의미 특성 생성|오류 분석을 바탕으로 질문 후보 제안|LLM 질문 제안 > Jev 특성 > 예측 학습 > 별도 평가|공식 예제는 제한된 데이터 실험이며 자동 과학 발견의 보증이 아닙니다.|Score,Noul|features|example|
research|patent-taxonomy|특허 기술 분류 탐색|특허 설명을 공식 기술 분류 트리의 넓은 영역부터 세부 분류까지 단계적으로 대응합니다.|CPC 분류 경로의 후보 선택|선행 자료 요약이나 설명 작성|특허 설명 > 상위 분류 > 후보 탐색 > 세부 항목|분류 기능이며 특허성·침해 여부에 대한 법률 판단이 아닙니다.|Choice|hierarchy|example|
research|mesh-index|연구 문헌의 주제 색인|문헌의 주제를 MeSH 분류 경로로 탐색하는 공식 계층 분류 예제입니다.|주제 트리의 관련 경로 선택|검색된 문헌 요약 작성|문헌 설명 > 주제 후보 > 계층 탐색 > 색인 검토|문헌 색인용이며 진단이나 치료 결정용이 아닙니다.|Choice|hierarchy|example|
research|review-screening|문헌 검토의 1차 선별|초록이 명시된 포함·제외 기준에 해당하는지 항목별로 검사해 검토 순서를 정합니다.|문헌별 기준 충족·불명확 여부 판단|선별된 문헌의 요약 작성|초록 > 기준별 평가 > 불명확 표시 > 연구자 검토|초록만으로 제외하기 어려운 문헌은 전문 검토로 보냅니다.|Noul|noul,confidence|concept|
research|methods-check|방법론 보고 항목 확인|자료에 대조군·데이터 설명·실험 설정 같은 필수 보고 항목이 있는지 확인합니다.|항목별 기술 여부 검사|빠진 항목의 보완 요청 작성|방법 섹션 > 항목 검사 > 근거 표시 > 검토|항목이 존재한다는 사실과 연구 설계의 타당성은 다릅니다.|Noul|lines|concept|
research|survey-coding|자유 응답의 주제 코딩|주관식 설문과 인터뷰 발언을 정의된 주제에 다중으로 대응해 분석 표를 만듭니다.|주제별 포함 여부 판단|주제별 경향과 대표 원문 요약|응답 > 주제별 질문 > 코딩 표 > 연구자 검토|희귀한 의견을 기타 항목에 묻지 않도록 표본을 확인합니다.|Noul|fanout|concept|
research|claim-evidence|연구 주장과 근거 연결|논문이나 요약의 주장이 인용한 본문에 의해 지지되는지 관계를 분류합니다.|주장·근거 관계 선택|정확한 범위로 주장 수정|주장 > 인용 문맥 > 관계 분류 > 검토|통계 재현이나 원자료의 품질 검증을 대체하지 않습니다.|Choice|citation|concept|
research|misconception-tags|학습 답안의 오개념 태그|학생 답안을 미리 정의한 오개념 유형에 연결해 어떤 피드백이 필요한지 살펴봅니다.|답안에서 드러난 오류 유형 분류|수준에 맞는 해설 작성|답안 > 오류 후보 > 유형 판단 > 해설|학생의 능력이나 성향을 고정적으로 평가하지 않습니다.|Choice|choice|concept|
research|hint-level|지금 필요한 힌트 단계|정답을 바로 알려주기 전에 현재 풀이가 어느 단계에서 막혔는지 기준별로 살펴봅니다.|제공된 풀이의 단계·도움 필요 정도 평가|선택된 수준의 힌트 작성|풀이 > 단계 평가 > 힌트 수준 > 설명|수학 계산의 정확성은 별도 검사기로 확인합니다.|Score|score|concept|
research|learning-resource|학습 목표에 맞는 자료 선별|명시된 학습 목표와 후보 자료의 내용·선수 지식을 비교해 읽을 순서를 돕습니다.|자료별 목표 적합성 평가|선정 자료를 연결해 학습 안내 작성|학습 목표 > 자료 후보 > 적합성 평가 > 순서 제안|자료의 품질과 난이도는 실제 학습자 평가로 보완합니다.|Score|rerank|concept|
content|headline-grounding|본문이 뒷받침하는 제목|제목의 핵심 주장이 본문에서 확인되는지 검사해 과장되거나 엇나간 제목을 표시합니다.|제목과 본문의 지지 관계 판단|사실 범위를 지키는 제목 작성|본문·제목 > 주장 검사 > 표시 > 제목 수정|일치 검사는 기사 자체의 사실 확인과는 다릅니다.|Choice|citation|concept|
content|style-rubric|브랜드 문체 체크|친근함·격식·금지 표현 등 구체적인 문체 기준으로 초안을 점검합니다.|문체 기준별 적합성 평가|원하는 문체로 문장 수정|문체 기준 > 초안 평가 > 항목 피드백 > 수정|추상적인 좋음 점수보다 관찰 가능한 기준을 사용합니다.|Score,Noul|score|concept|
content|topic-index|콘텐츠 주제 자동 색인|게시물과 대본을 사전에 정한 주제 분류로 정리해 아카이브 탐색을 돕습니다.|주제 후보 선택|태그를 바탕으로 소개문 작성|콘텐츠 > 주제 후보 > 분류 > 색인 저장|복합 주제는 독립 질문이나 다중 태그로 처리합니다.|Choice|choice|concept|
content|transcript-scenes|전사문의 장면 역할 분류|영상 전사문을 도입·문제·설명·예시·마무리 역할로 구분해 편집 설계를 돕습니다.|텍스트 구간의 서사 역할 분류|연결 내레이션과 편집안 작성|전사 텍스트 > 구간 분류 > 역할 지도 > 편집 검토|영상을 직접 이해하는 기능이 아니라 전사문 기반입니다.|Choice|format|concept|
content|ad-landing-match|광고와 도착 페이지의 일치|광고 문구가 연결된 페이지의 혜택·조건·제약과 일치하는지 확인합니다.|문구와 페이지 근거의 불일치 검사|조건을 명확히 반영한 문구 작성|광고·페이지 > 조건 비교 > 불일치 표시 > 수정|광고 준법 여부는 별도 전문 검토가 필요합니다.|Choice|citation|concept|
content|translation-fidelity|번역에서 빠진 의미 찾기|원문과 번역문을 비교해 핵심 의미·조건·부정 표현이 유지됐는지 검토합니다.|의미 누락·변경 신호 판단|번역 초안과 문제 구간 수정|원문·번역 > 의미 검사 > 검토 표시 > 재번역|언어별 성능 차이가 있어 실제 이중언어 평가가 필요합니다.|Noul|citation,models|concept|
content|subtitle-readability|자막 텍스트의 읽기 난도|자막 문장의 길이·표현 난도·문맥 단절을 구분해 수정할 구간을 찾습니다.|표현 난도와 문맥 연결성 평가|읽기 쉬운 자막 대안 작성|자막 텍스트 > 코드 길이 검사 > 의미 평가 > 수정|타이밍·음성 일치·화면 배치는 별도 미디어 검사로 확인합니다.|Score|score|concept|
content|optout-detection|수신 거부 의사 놓치지 않기|정해진 문구가 아니어도 더 이상 연락받고 싶지 않다는 명시적 요청을 식별합니다.|수신 거부 의사 존재 여부 판단|필요한 확인 문구 작성|응답 > 명시적 규칙 > 의미 검사 > 검토·처리|명확한 수신 거부 표현은 모델 결과와 무관하게 우선 반영합니다.|Noul|noul|concept|
content|community-spam|커뮤니티 스팸 검토|게시물의 문맥과 규정을 함께 읽어 스팸·정상·불명확 상태로 나눕니다.|규정에 따른 유형과 불확실성 판단|필요한 안내문 작성|게시물 > 규정 검사 > 정상·검토·제한 > 운영자 확인|링크가 있다는 이유만으로 정상적인 공유 글을 제한하지 않습니다.|Choice|consistency|concept|
content|brief-coverage|브리프와 결과물 체크|대본이나 카피가 제작 브리프의 핵심 메시지와 필수 항목을 반영했는지 검사합니다.|브리프 항목별 충족 여부 판단|빠진 부분을 보완한 초안 작성|브리프·결과 > 항목 대조 > 누락 표시 > 수정|창의성이나 실제 성과를 객관적인 점수로 보장하지 않습니다.|Noul|sde|concept|
games|doom|상태를 읽고 움직이는 Doom|게임의 구조화된 상태를 바탕으로 행동을 고르는 TypeSafe의 공식 실시간 게임 데모입니다.|위치·위협 등 텍스트 상태에서 행동 선택|확장 시 장기 전략·대사 생성에 사용 가능|게임 상태 > 행동 판단 > 게임 엔진 > 새 상태|이미지를 직접 보는 데모가 아니며 전용 게임 봇보다 우수하다는 뜻도 아닙니다.|Choice|launch|demo|doom
games|wikiracing|링크만 따라 목표에 도달하기|현재 Wikipedia 문서의 링크 중 다음 이동 대상을 골라 목표 문서까지 찾아가는 데모입니다.|관측된 링크 후보 중 다음 이동 선택|게임 자체의 링크 선택에는 필수 아님|현재 문서 > 링크 후보 > 선택 > 다음 문서|후보가 많으면 여러 단계로 나누며 경로 성공이 항상 보장되지는 않습니다.|Choice,Score|launch|demo|wiki
games|smart-home|자연어 스마트홈 제어|방·기기·행동을 병렬로 판단하고 실제 제어는 코드가 수행하는 공식 데모입니다.|요청 대상과 허용된 행동 선택|일반 대화나 복합 요청 처리|요청 > 방·기기·행동 판단 > 코드 분기 > 상태 확인|현실 기기 연결에는 독립적인 안전 규칙과 접근 통제가 필요합니다.|Choice,Noul|home|example|home
games|compound-commands|복합 명령은 LLM과 나눠 처리|여러 동작이 섞인 요청만 LLM으로 분해한 뒤 각 명령을 Jev로 판단하는 공식 설계입니다.|복합 명령 여부와 단일 명령의 처리 판단|복합 요청을 독립 명령으로 분해|요청 > 복합 여부 > LLM 분해 > 개별 판단|분해된 명령의 순서와 상충 관계는 실행 전에 검증합니다.|Noul,Choice|home|example|
games|npc-actions|상태 기반 NPC 행동 선택|거리·체력·목표처럼 구조화된 게임 상태에서 허용된 행동 후보를 고르는 응용입니다.|현재 상태에 맞는 행동 선택|장기 목표나 대사 작성|게임 상태 > 행동 후보 > 판단 > 엔진 실행|프레임마다 호출하지 말고 이벤트·상태 변화에 맞춰 설계합니다.|Choice|choice,launch|concept|
games|quest-state|퀘스트 진행 조건의 의미 검사|플레이어의 대화나 조사 결과가 명시된 퀘스트 조건을 만족하는지 보조 판단합니다.|조건별 증거 충족 여부 검사|상황에 맞는 후속 대사 작성|퀘스트 상태 > 증거 검사 > 코드 조건 > 다음 단계|아이템 보유·수량 같은 확정 상태는 게임 코드가 계산합니다.|Noul|noul|concept|
games|dialogue-direction|대화 방향과 대사 생성 분리|대화의 다음 목적을 안내·질문·거절·축하 등으로 고른 뒤 LLM이 실제 대사를 만듭니다.|허용된 대화 목적 선택|목적과 캐릭터 설정에 맞는 대사 작성|대화 상태 > 목적 선택 > LLM 대사 > 검증|분류 단계가 캐릭터의 자연스러움을 떨어뜨리지 않는지 평가합니다.|Choice|intent|concept|
games|player-reports|플레이어 신고의 유형 분류|채팅과 신고 원문을 규정에 맞춰 분류해 운영자가 검토할 사건을 정리합니다.|괴롭힘·스팸 등 규정 관련 신호 분류|사건 요약 작성|신고·문맥 > 유형 분류 > 근거 연결 > 운영자 검토|제재는 단일 모델 판정만으로 확정하지 않습니다.|Choice,Noul|guards|concept|
games|tutorial-help|도움이 필요한 순간 고르기|반복 실패와 명시적인 도움 요청을 바탕으로 튜토리얼을 제안할 시점을 판단합니다.|주어진 플레이 상태의 도움 필요 신호 평가|간단한 상황별 힌트 작성|플레이 상태 > 신호 평가 > 도움 제안 > 사용자 선택|사용자의 심리 상태를 추정하거나 플레이를 강요하는 데 쓰지 않습니다.|Score|score|concept|
games|iot-maintenance|기기 점검 메시지 분류|센서 상태의 텍스트 설명과 점검 메모를 유형별로 정리해 유지보수 검토를 돕습니다.|이상 유형·정보 부족 신호 분류|담당자용 점검 요약 작성|측정·메모 > 규칙 검사 > 의미 분류 > 담당자 검토|위험한 장비의 제어와 긴급 정지는 결정론적 안전 시스템이 담당합니다.|Choice,Noul|composite|concept|
`;
const cases = rows.trim().split('\n').map((line, index) => {
 const v = line.split('|');
 if (v.length !== 12) throw new Error('Invalid catalogue row '+(index+1));
 const [category,id,title,summary,jev,llm,flow,caution,primitives,refs,evidence,mediaKey] = v;
 return {number:index+1,id,category,title,summary,jev,llm,flow:flow.split(' > '),caution,primitives:primitives.split(','),sources:refs.split(','),evidence,media:mediaKey||null,reviewedAt:'2026-09-19'};
});
window.JEV_ATLAS = Object.freeze({version:'1.0.0',reviewedAt:'2026-09-19',categories,sources,media,cases});
})();
