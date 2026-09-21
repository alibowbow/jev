/* Independently edited descriptions. Primary post + published video evidence per case. */
(() => {
'use strict';
const cats = [
 ['browser','브라우저·컴퓨터'], ['work','업무·자동화'], ['data','검색·데이터'],
 ['content','콘텐츠·마케팅'], ['interface','새로운 인터페이스'], ['games','게임'], ['simulation','로봇·시뮬레이션'], ['markets','시장·트레이딩']
].map(([id,name]) => ({id,name}));
// id, category, title, summary, metrics, author, handle, post ID, poster path, source directory slug, note
const rows = [
['flight-search','browser','항공편을 찾는 데, 단 7.1초.','취리히에서 런던까지. Jev가 클릭할 곳을 고르고, 작은 LLM이 검색어를 입력해 실제 Google Flights를 탐색합니다.',['7.1초|항공편 검색','$0.0039|공개된 실행 비용'],'Browser Use','gregpr07','2100411066966749359','amplify_video_thumb/2100410607807918080/img/lNfcykqoOvLoZHWa','browser-use-flights','검색 시연입니다. 항공권 예약이나 결제 완료를 뜻하지 않습니다.'],
['voice-mac','browser','말이 끝나기 전에, Mac이 움직인다.','“메모 앱을 열어줘.” 음성 요청이 들어오자 앱을 여는 컴퓨터 사용 데모입니다. 말에서 행동으로 이어지는 짧은 간격이 인상적입니다.',['음성 → 실행|Mac 제어'],'Andy Gao','instantricecook','2100814590300889426','amplify_video_thumb/2100809295809974272/img/_1rbvz04k6wjpcGW','voice-computer-use-mac','음성 인식과 실행을 포함한 시스템 데모입니다. Jev에 음성을 직접 입력하는 방식이라는 뜻은 아닙니다.'],
['job-match','work','400개 기업과 지원자 경력을, 한 번에 비교.','지원자 프로필을 기업별로 대조하고, 직무와 경력이 맞지 않는 지점을 표시합니다. 어디부터 살펴볼지 좁혀 주는 지원 기회 탐색 데모입니다.',['400개|비교한 기업','12초|공개된 처리 시간'],'Sarvagya Kulshreshtha','sarvagya_kul','2100980770206879849','amplify_video_thumb/2100980671640645632/img/19dyomYRhfAONg7S','job-match-prediction','제작자는 비용 $0.0005를 보고했습니다. 화면의 중간 집계와 수치가 다르며 독립 재현하지 않았습니다. 적합성 추정은 실제 합격 확률이나 채용 결과가 아닙니다.'],
['ad-teardown','content','광고 724개, 40초 만에 해부하다.','37개 브랜드의 광고를 한꺼번에 분석합니다. 시선을 끄는 문구, 형식, 제안, 행동 유도와 랜딩페이지의 어긋남을 항목별로 나눕니다.',['724개|분석한 광고','약 40초|공개된 처리 시간','$0.09|공개된 토큰 비용'],'Matthew Berman','TheMattBerman','2100654891756589230','amplify_video_thumb/2100654321792684032/img/cXvU50KmCe6QFu86','competitor-ad-teardown','제작자가 공개한 데모 결과입니다. 이미지·영상을 Jev가 직접 읽었다는 뜻은 아니며, 전처리 구성과 비용 범위는 원문에서 확인해야 합니다.'],
['superx','content','게시하기 전에, 글에 61가지 질문을.','SuperX가 초안의 표현과 구성을 여러 기준으로 평가합니다. 쓰고, 점검하고, 다시 고치는 과정을 짧은 피드백 루프로 만듭니다.',['61개|초안당 평가 질문','약 1초|공개된 처리 시간','$0.0004|초안당 공개 비용'],'Rob Hallam','robj3d3','2100722975645598191','amplify_video_thumb/2100722766362406912/img/pH0lahpfd-qTj_nE','superx-post-scoring','점수는 제작자의 평가 모델에 따른 추정이며 조회수·확산·성과를 보장하지 않습니다.'],
['sponsor-skip','content','유튜브 협찬 멘트만, 알아서 건너뛴다.','자막이나 음성 인식으로 얻은 텍스트에서 협찬 구간을 찾습니다. Jev가 구간을 판단하면 확장 프로그램이 재생 위치를 옮깁니다.',['협찬 구간 감지|자막·음성 인식 연계'],'Tony Dinh','tdinh_me','2100793777103466615','amplify_video_thumb/2100792834526007296/img/8AFbjqEeZrJUEHid','youtube-sponsor-skipper','음성 모드는 별도의 Deepgram 전사를 사용합니다. 모드별 비용이 다르고 구간을 잘못 넘길 가능성이 있습니다.'],
['fraud-cascade','work','애매한 이메일만, 더 큰 AI에게.','Jev가 이메일 100개를 먼저 분류하고, 불확실한 31개만 Kimi K3에 넘깁니다. 빠른 판단과 추가 검토를 연결한 하이브리드 데모입니다.',['1.42초|Jev의 첫 분류','96 / 100|전체 파이프라인 정답','약 $0.07|전체 추론 비용'],'Hassan','nutlope','2100614659690713543','amplify_video_thumb/2100608348219478016/img/23vFEVMegwLrMa8g','fraud-detection-jev-kimi','정상 50개·사기 50개인 제작자 테스트의 결과입니다. 전체 실행은 약 16초이며, 실제 운영의 탐지율을 보장하지 않습니다.'],
['paper-atlas','data','논문 1,018편을, 24개 주제로 정리.','DeepSeek가 만든 논문 요약을 읽고 Jev가 주제를 고릅니다. 요약은 생성 모델에, 분류는 판단 모델에 맡긴 연구 자료 탐색 실험입니다.',['1,018편|분류 대상','24개|주제 선택지','$0.08|Jev 분류 비용'],'Hassan','nutlope','2100426999546184123','amplify_video_thumb/2100425141947604992/img/AITyHwcOWq1jw-3Z','1kpapers','요약 비용 $3.99는 별도입니다. 제작자는 Jev 분류를 기존 사이트에 적용하기 전 평가 중이라고 밝혔습니다.'],
['predictive-sheet','interface','열 이름만 적었는데, 의미가 채워진다.','스프레드시트에 “긴급도”라는 열을 추가합니다. 숫자 공식을 쓰는 대신 각 행의 의미를 읽고, 후속 조치가 필요한 정도를 평가하는 데모입니다.',['약 100ms|제작자가 보고한 판단 시간'],'Nader Dabit','dabit3','2100780008193020049','amplify_video_thumb/2100779722447667200/img/gvsEg2-3oD6FRZhc','predictive-spreadsheets','전체 표의 완료 시간이 아닌 개별 판단에 대한 제작자 설명입니다.'],
['download-sort','work','다운로드 폴더가, 스스로 정리된다.','새 파일이 들어오면 사용자가 정한 분류 기준에 맞춰 이름을 바꾸고 폴더로 옮깁니다. 송장처럼 의미를 읽어야 하는 파일 정리를 자동화합니다.',['분류 → 이동|파일 정리 자동화'],'Marcel Pociot','marcelpociot','2100906882365788167','amplify_video_thumb/2100906588626173952/img/1KnNI3B3aUJEwFvI','downloads-folder-sorter','자동 파일 이동을 보여 주는 제작자 데모입니다. 운영 시 잘못된 분류와 복구 경로를 별도로 검증해야 합니다.'],
['lead-fit','content','700개 잠재 고객, 메시지 궁합을 찾다.','잠재 고객과 개인화한 영업 메시지를 함께 평가합니다. 고객에게 어울리지 않는 문구를 골라내고, 어떤 메시지를 먼저 검토할지 비교합니다.',['700개|잠재 고객','40초|공개된 처리 시간','$0.09|공개된 실행 비용'],'Romàn','romanbuildsaas','2100891604735099103','amplify_video_thumb/2100891566340501504/img/agvkcRfNWmnGbRI5','lead-outreach-scoring','메시지 적합성의 모델 추정입니다. 실제 회신율·구매율을 측정한 성과는 아닙니다.'],
['email-500','work','이메일 500개 분류에, 3.5센트.','받은편지함을 펼쳐 놓고 이메일을 연속 분류합니다. 같은 기준을 많은 항목에 적용하는 작업을 눈앞에서 빠르게 처리하는 데모입니다.',['500개|분류한 이메일','$0.035|공개된 실행 비용'],'Riley Brown','rileybrown','2100404532119269426','amplify_video_thumb/2100403183533125632/img/54ZFO-CHvDeC-rw-','500-emails-3-cents','수초 내 처리했다는 제작자 보고입니다. 정확도 측정이나 실제 메일 서비스 도입을 검증한 사례는 아닙니다.'],
['post-analysis','content','게시물 3,282개에서, 반응의 패턴을 찾다.','게시물마다 주제, 도입부, 어조 등 8가지 질문을 던집니다. 과거 반응과 함께 살펴보며 어떤 글이 읽혔는지 돌아보는 분석 도구입니다.',['3,282개|분석한 게시물','8분 34초|공개된 실행 시간','$0.1282|공개된 토큰 비용'],'Ian Nuttall','iannuttall','2100668908227162567','amplify_video_thumb/2100668725737213952/img/m210oIkCyuGX5Dqr','x-post-analysis','개인 게시물 기록에 대한 관찰입니다. 과거 상관관계를 미래 성과나 인과관계로 해석해서는 안 됩니다.'],
['stagehand','browser','원격 브라우저도, 판단하고 바로 클릭.','페이지의 접근성 정보를 Jev에 전달하면 다음 행동을 선택합니다. Stagehand가 실제 클릭을 실행하는 방식으로 원격 브라우저를 조작합니다.',['$0.001|제작자가 공개한 작업 비용'],'Kyle Jeong','kylejeong','2100622054945095934','amplify_video_thumb/2100495119065722880/img/7A1mijkU3Z_Zj7PM','stagehand-remote-browser','공개된 단일 작업의 비용입니다. 원격 브라우저 사용료까지 모두 포함한 운영 비용이라는 뜻은 아닙니다.'],
['gesture-canvas','interface','가리키고 말하면, 캔버스가 알아듣는다.','손가락으로 대상을 가리키고 음성으로 동작을 지시합니다. 제스처와 말에서 얻은 정보를 연결해 캔버스의 도형을 조작하는 실험입니다.',['제스처 + 음성|캔버스 조작'],'Jack Cheng','jackcheng','2100729670991802386','amplify_video_thumb/2100729243185324032/img/YNw8njfnSXu-Tbyr','gesture-canvas','입력 처리 시스템과 Jev를 결합한 데모입니다. Jev 자체의 이미지·음성 직접 인식 기능을 의미하지 않습니다.'],
['reference-finder','data','아이디어 한 줄에서, 이미지 100장으로.','하나의 요청을 출발점으로 Cosmos, NASA, The Met의 시각 자료를 찾습니다. 창작에 쓸 레퍼런스를 탐색하는 Jev 기반 도구입니다.',['100장|요청당 공개된 탐색 결과'],'Albiona Hoti','albicodes','2100720936852857271','amplify_video_thumb/2100720525739687936/img/2Kp3WYXT1muLjThU','visual-reference-finder','이미지 생성이 아니라 기존 자료 검색 데모입니다. 개별 이미지의 사용 권리는 각 원출처에서 확인해야 합니다.'],
['clippy','interface','막히는 순간에만, 도우미가 나타난다.','제품을 사용하는 흐름에서 도움이 필요할 만한 순간을 포착합니다. 언제 나타날지뿐 아니라 어떻게 반응할지도 Jev가 고르는 도우미입니다.',['상황 인식형 도움|제품 사용 지원'],'Marek Sotak','sotak','2100701152824185319','amplify_video_thumb/2100700282434826240/img/H7dKngwXowyoEgJ6','realtime-clippy','사용 행동을 바탕으로 도움이 필요한 상황을 추정하는 데모입니다. 사람의 내면 상태를 확정해서 읽는 기능은 아닙니다.'],
['postgres','data','데이터베이스에, 사람 말로 조건을 건다.','SQL 조건에 자연어 판단을 연결합니다. 미리 모든 규칙을 작성하지 않고도 각 행이 원하는 조건에 맞는지 평가하는 PostgreSQL 실험입니다.',['129행|평가한 데이터','약 1초|첫 실행','$0.0009|공개된 첫 실행 비용'],'Zachi','iam_zachi','2100679300756435135','amplify_video_thumb/2100674729216524288/img/ZqaCccSfzuzlrdro','postgres-jev-function','작은 테이블의 제작자 데모입니다. 일반 SQL 인덱스의 대체나 모든 규모에서의 속도 개선을 뜻하지 않습니다.'],
['email-1500','work','받은편지함 1,500개를, 한눈에 정리.','이메일을 하나씩 열어 보지 않고도 분류 결과를 표로 살펴봅니다. Ryan Vogel이 자신의 이메일 약 1,500개로 공개한 대량 분류 시연입니다.',['약 1,500개|분류 대상'],'Ryan Vogel','ryanvogel','2100042788851101842','amplify_video_thumb/2100042377339588608/img/2O56_xRC0r54ugfr','inbox-triage-1500-emails','분류 시연이며 정확도나 절감률에 대한 독립 평가 수치는 공개하지 않습니다.'],
['mario','games','마리오의 다음 점프를, Jev가 고른다.','이동하고 점프하는 선택을 게임의 진행과 연결합니다. 문장을 작성하는 대신 바로 사용할 수 있는 행동을 고르는 실시간 게임 실험입니다.',['Super Mario Bros.|게임 플레이 시연'],'Faadil Shaik','faadilhshaik','2100086301894881578','amplify_video_thumb/2100085174826647552/img/6YMRQKKZYBPsW2oo','jev-plays-mario','제작자가 공개한 플레이 시연입니다. 전체 게임 클리어 또는 다른 게임으로의 일반화를 주장하지 않습니다.'],
['doom','games','초당 10번의 판단으로, DOOM을 플레이.','발사할지, 피할지, 회복할지. 게임 상태에서 다음 행동을 고르는 작은 판단을 반복해 실시간 플레이를 만드는 TypeSafe의 공개 데모입니다.',['약 10회/초|모델 호출','$7/시간|제작자가 공개한 비용'],'TypeSafe · Diogo Almeida','CompleteSkeptic','2099925687465570372','amplify_video_thumb/2099924592534183936/img/hBGk8j8MRxBgPyg9','jev-plays-doom','호출 빈도와 비용은 공개 데모 기준입니다. 게임의 구조화된 상태와 실행 코드를 함께 사용하는 방식입니다.'],
['tetris','games','테트리스의 다음 수를, 약 0.3초에.','블록을 어디에 놓을지 빠르게 선택합니다. 제작자는 2분 동안 357개 블록을 놓고 134줄을 지운 플레이 결과를 공개했습니다.',['약 0.3초|한 수 판단','134줄|2분간 공개된 결과'],'Alan Daitch','AlanDaitch','2100438353946513815','ext_tw_video_thumb/2100438029299040256/pu/img/s_cly7mjSq3voOC3','jev-plays-tetris','게임 구현·속도 설정에 따른 제작자 시연 결과이며 표준 게임 벤치마크는 아닙니다.'],
['slay-spire','games','카드 게임의 다음 행동을, 0.7초에.','Slay the Spire 2에서 다음 수를 고르는 에이전트를 시험했습니다. 빠른 행동 선택을 게임 조작에 연결한 플레이 영상입니다.',['0.7초|제작자가 공개한 한 수 판단'],'Paul Wei','coolish','2100570517954838897','amplify_video_thumb/2100569632482746369/img/TPuOBiHYCWUWxNOc','slay-the-spire-2','제작자의 개별 실행 결과입니다. 승률이나 전략의 우수성을 입증한 비교가 아닙니다.']
];
// Added after source and published-video checks on 2026-09-19.
rows.push(
["x-post-firewall","content","보고 싶지 않은 글, 말로 정해 접어 둔다.","“이런 주제의 글은 숨겨 줘.” 자연어로 정한 기준에 따라 X 게시물을 접는 브라우저 확장 프로그램입니다. 사용자의 기준을 글마다 적용합니다.",["자연어 규칙|X 피드 필터"],"Marcel Pociot","marcelpociot","2100520134481735729","amplify_video_thumb/2100519256425140224/img/-A44e4qCo8mVP8ws","x-post-firewall","제작자의 브라우저 확장 시연입니다. 분류 기준에 따라 보고 싶은 글까지 숨길 수 있으며 모든 게시물의 정확한 필터링을 보장하지 않습니다."],
["instant-compaction","work","에이전트 기록에서, 필요한 맥락만 남긴다.","쌓인 도구 호출 기록을 관련성으로 평가하고 불필요한 항목을 덜어 냅니다. 긴 요약문을 만드는 대신 남길 기록을 고르는 컨텍스트 정리 실험입니다.",["관련성 평가|에이전트 기록 정리"],"Tamara Tran","tamarajtran","2100694549362553153","amplify_video_thumb/2100694537672998912/img/OF8vottg6-45ZgNl","instant-compaction","기록을 선택·제거하는 방식의 데모입니다. 원문을 요약하는 기능이나 중요한 정보가 전혀 손실되지 않는다는 보장은 아닙니다."],
["jev-review","work","코딩 에이전트의 작업을, 기준별로 다시 점검.","Jev Review는 코딩 에이전트의 결과를 여러 기준으로 평가하는 실험적 MCP 플러그인입니다. 작성한 코드를 점검하고 개선하는 흐름에 판단을 더합니다.",["MCP 플러그인|코드 평가 루프"],"Niaz Morshed","niazmorshed_","2100465662867218857","amplify_video_thumb/2100465308519759872/img/2uIG43VFGvWzku0s","jev-review","실험적 도구의 제작자 시연입니다. 평가 점수가 테스트 통과, 보안 검증 또는 코드의 정확성을 대신하지 않습니다."],
["computer-use-without-screenshots","browser","화면을 텍스트로 바꿔, 클릭할 곳을 고른다.","로컬 UI 탐지와 OCR이 화면의 요소와 글자를 추출합니다. Jev가 그 정보를 바탕으로 대상을 선택하면 실행 코드가 컴퓨터를 조작합니다.",["UI 탐지 + OCR|컴퓨터 제어"],"Milind S","milindlabs","2100631847155994852","amplify_video_thumb/2100629037790183424/img/NR6wQpZiC-xjCEsC","computer-use-without-screenshots","Jev가 스크린샷을 직접 읽는 방식이 아닙니다. 제작자가 언급한 약 90ms는 판단 단계에 대한 수치이며 전체 작업 시간은 아닙니다."],
["jev-trader","markets","시장 상태를 읽고, 매매 행동을 선택하는 봇.","Monad의 Kuru MON–USDC 시장에서 매 블록마다 상태를 읽고 거래 행동을 고르는 공개 실험입니다. Jev의 선택을 실제 거래 코드에 연결합니다.",["매 블록 판단|공개 트레이딩 실험"],"Jarrod Watts","jarrodwatts","2100356151468585346","amplify_video_thumb/2100355999064379392/img/BiAbeDjN57avf2VK","jev-trader","제작자의 코드·영상 공개 사례이며 수익성을 검증한 결과가 아닙니다. 300ms는 설명에 등장하는 블록 간격으로 전체 판단 지연이나 수익률을 뜻하지 않습니다."],
["predictive-launcher","interface","“방금 받은 PDF”, 이렇게 말해도 찾는다.","파일이나 앱을 정확한 이름 대신 원하는 상황으로 찾습니다. 입력하는 문장에 맞춰 후보 순서를 바꾸는 예측형 런처 시연입니다.",["자연어 → 후보|파일·앱 런처"],"Nader Dabit","dabit3","2100756930054504776","amplify_video_thumb/2100756324845862913/img/8ew1NdHs6k5cReoF","predictive-launcher","파일 메타데이터를 제공하는 앱과 결합한 데모입니다. Jev 자체가 사용자의 디스크를 직접 탐색하는 기능은 아닙니다."],
["invoice-finder","work","여러 서비스의 송장, 한곳으로 모으기.","서비스의 청구 페이지를 찾아 송장을 목록으로 모으고 내려받는 흐름을 보여 줍니다. 청구서 위치를 찾는 브라우저 작업에 Jev를 연결합니다.",["청구 페이지 탐색|송장 수집"],"Farouq Aldori","FarouqAldori","2100711180704641520","amplify_video_thumb/2100710351536840705/img/716A3kUOeRsyb0eG","invoice-finder","제작자가 공개한 서비스·청구 포털에서의 시연입니다. 모든 웹사이트나 계정에서의 호환성은 검증하지 않았습니다."],
["realtime-game-levels","games","게임 레벨 구성에, 실시간 판단을 더하다.","Jev의 구조화된 결과를 게임 레벨 구성에 연결한 제작자 시연입니다. 게임을 만드는 코드와 모델의 결과가 함께 움직이는 실험을 살펴봅니다.",["게임 레벨 구성|실시간 시연"],"Hugo Duprez","HugoDuprez","2100953089003921543","amplify_video_thumb/2100952449661992960/img/GEVdw9BvAW7Dv2Gx","realtime-game-levels","제작자가 공개한 게임 구성 데모입니다. Jev가 게임 그래픽이나 자유 형식의 코드를 직접 생성한다는 의미는 아닙니다."],
["subway-surfers","games","Subway Surfers, 여러 판을 동시에 달린다.","Jev의 행동 선택을 Subway Surfers 플레이에 연결했습니다. 제작자는 여러 게임을 한꺼번에 실행하는 화면과 플레이 결과를 공개했습니다.",["50개 동시 실행|제작자가 공개한 구성"],"Max Blade","_MaxBlade","2100634359099232678","amplify_video_thumb/2100633400717565952/img/KlytLNSLCQA-yY2E","subway-surfers","게임 구현과 속도 설정에 따른 제작자 시연입니다. 표준 벤치마크나 사람보다 우수한 플레이 성능을 입증한 비교는 아닙니다."],
["ocr-image-classifier","data","이미지 약 900장, 읽은 글자로 분류한다.","OCR로 이미지 속 텍스트를 먼저 추출하고 Jev가 분류를 맡습니다. 문서성 이미지를 빠르게 정리하는 두 단계 파이프라인입니다.",["약 900장|제작자가 공개한 분류량","40초|공개된 처리 시간"],"Fayaz Ahmed","fayazara","2100953838891192789","amplify_video_thumb/2100953271238320128/img/vzUjAo15Bg8tVa_q","ocr-image-classifier","OCR과 Jev를 결합한 제작자 실행 결과입니다. Jev의 직접 이미지 인식 시연이 아니며 독립 정확도 평가는 확인하지 않았습니다."],
["ai-slop-detector","content","글의 상투적인 표현을, 35가지 기준으로.","반복되는 문구나 과장된 표현 등 글쓰기의 특징을 점검하는 도구입니다. AI처럼 느껴지는 문체를 여러 항목으로 나눠 평가합니다.",["35개 기준|문체 점검"],"Jon Kraayenbrink","kraayenJon","2101157548346794059","amplify_video_thumb/2101157511579508736/img/Ssx23uOBOnKsJyaJ","ai-slop-detector","문체에 대한 휴리스틱 평가입니다. AI 작성 여부, 표절 또는 실제 작성자의 신원을 입증하는 탐지 결과가 아닙니다."],
["doomscroll-filter","content","관심 주제는 남기고, 낚시성 글은 걸러 보기.","주제를 정해 최근 X 게시물을 모으고 글마다 여러 질문으로 평가합니다. 원하는 내용과 홍보·낚시성 표현을 구분해 피드를 정리하는 시연입니다.",["8개 질문|게시물별 평가"],"Rob Hallam","robj3d3","2101074194260000982","amplify_video_thumb/2101071392385236992/img/CEKcs7SuhRGA5TTV","doomscroll-filter","제작자가 정한 기준과 텍스트·반응 정보를 이용하는 데모입니다. 모든 광고나 낚시성 게시물을 정확하게 탐지한다는 뜻은 아닙니다."]
);
const cases = rows.map(([id,category,title,summary,metrics,author,handle,post,poster,slug,note]) => ({
 id,category,title,summary,metrics:metrics.map(s=>{const [value,label]=s.split('|');return {value,label};}),
 author,handle,source:`https://x.com/${handle}/status/${post}`,
 research:`https://madewithjev.com/builds/${slug}`,
 reviewed:'2026-09-19',note,
 media:{type:'x',id:post,poster:`https://pbs.twimg.com/${poster}?format=jpg&name=large`,evidence:'published-video-thumbnail'}
}));
cases[0].media = {...cases[0].media,type:'mp4',url:'https://raw.githubusercontent.com/browser-use/jev-ultrafast/main/docs/demo.mp4',evidence:'publisher-video-file'};
cases[0].code = 'https://github.com/browser-use/jev-ultrafast';
cases.find(c=>c.id==='sponsor-skip').code = 'https://github.com/trungdq88/youtube-sponsor-detection';
cases.push({id:'mobile-uber',category:'browser',title:'스마트폰에서 목적지 입력까지, 21초.',summary:'실제 Android의 Uber 앱을 열고 공항에서 금문교까지의 경로를 입력합니다. Jev가 탭할 곳을 결정하며 결제 수단 선택 화면까지 진행합니다.',metrics:[{value:'약 21초',label:'기록된 작업 시간'},{value:'9번',label:'실행한 행동'}],author:'DroidRun / Mobilerun',handle:'droidrun',source:'https://github.com/droidrun/mobile-jev/blob/main/docs/media/uber-demo.mp4',code:'https://github.com/droidrun/mobile-jev',research:'https://github.com/droidrun/mobile-jev',reviewed:'2026-09-19',note:'차량 호출이나 결제 완료를 보여 주는 영상이 아닙니다.',media:{type:'mp4',url:'https://raw.githubusercontent.com/droidrun/mobile-jev/main/docs/media/uber-demo.mp4',poster:'https://raw.githubusercontent.com/droidrun/mobile-jev/main/docs/media/uber-demo.gif',evidence:'publisher-video-file'}});
cases.find(c=>c.id==='jev-trader').code = 'https://github.com/jarrodwatts/jev-trader';
// Jevable discoveries, with independent Korean descriptions and original-post attribution.
cases.unshift(...[
  {
    "id": "drape-try-on",
    "category": "interface",
    "title": "말로 고른 옷을, 내 모습에 입혀 본다.",
    "summary": "Drape는 말에서 추출한 요청과 현재 착장 정보를 읽고 옷장 속 후보를 고릅니다. Jev의 선택을 가상 피팅 화면에 연결한 실시간 스타일링 실험입니다.",
    "metrics": [
      {
        "value": "옷 선택 → 가상 피팅",
        "label": "Drape"
      }
    ],
    "author": "Nailthy Tang",
    "handle": "nailthy62",
    "source": "https://x.com/nailthy62/status/2101388186916454439",
    "research": "https://jevable.com/project/2101388186916454439",
    "reviewed": "2026-09-21",
    "keywords": [
      "Drape real-time virtual try-on",
      "virtual-try-on",
      "fashion",
      "voice"
    ],
    "note": "Jev는 옷을 선택하는 판단을 맡습니다. 음성 전사와 착장 이미지 표현은 별도 시스템의 역할입니다.",
    "media": {
      "type": "x",
      "id": "2101388186916454439",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101384523124740096/img/1Q6moTMdLcZ-mJ3r.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "proq-plan-classifier",
    "category": "data",
    "title": "건설 도면 26장을, 먼저 종류별로 나눈다.",
    "summary": "Proq의 자재 명세서 작성 흐름에 도면 분류를 더했습니다. Jev가 도면 묶음을 분류하고, 기존 LLM 파이프라인이 후속 작업을 이어가는 구성입니다.",
    "metrics": [
      {
        "value": "26장",
        "label": "공개된 도면 묶음"
      },
      {
        "value": "2.9초",
        "label": "제작자가 보고한 분류 시간"
      }
    ],
    "author": "Trinay Hari",
    "handle": "hari_trinay",
    "source": "https://x.com/hari_trinay/status/2101118529936519453",
    "research": "https://jevable.com/project/2101118529936519453",
    "reviewed": "2026-09-21",
    "keywords": [
      "Proq construction-plan classification",
      "construction",
      "document-classification",
      "plan-sets"
    ],
    "note": "도면 분류 단계의 제작자 시연입니다. 자재 산출 전체가 2.9초에 끝나거나 도면 이미지를 Jev가 직접 이해한다는 뜻은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101118529936519453",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101118259076734976/img/JId8Xua4ypyd342R.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "jevform",
    "category": "interface",
    "title": "답변에 따라, 다음 질문이 달라지는 설문.",
    "summary": "JevForm은 사용자가 방금 입력한 답을 바탕으로 이어질 질문을 고릅니다. 정해진 문항을 끝까지 보여 주는 대신 응답에 맞춰 폼의 흐름을 바꾸는 데모입니다.",
    "metrics": [
      {
        "value": "응답 → 다음 문항",
        "label": "동적 설문"
      }
    ],
    "author": "Tamir",
    "handle": "tamirspiritt",
    "source": "https://x.com/tamirspiritt/status/2101079101997982037",
    "research": "https://jevable.com/project/2101079101997982037",
    "reviewed": "2026-09-21",
    "keywords": [
      "JevForm",
      "forms",
      "adaptive-ui",
      "json-render"
    ],
    "note": "Jev와 json-render를 결합한 제작자 시연입니다. 질문 선택과 화면 렌더링은 각각의 구성 요소가 맡습니다.",
    "media": {
      "type": "x",
      "id": "2101079101997982037",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101079056540139521/img/IYIVL8ehM6E2HcyL.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "mujoco-robot-arm",
    "category": "simulation",
    "title": "로봇 팔의 다음 움직임을, 텍스트 상태로 선택.",
    "summary": "MuJoCo 시뮬레이터의 물체 배치와 접촉 정보를 간단한 텍스트로 전달합니다. 다음 작업과 팔·그리퍼의 움직임을 두 단계로 고르는 로봇 제어 실험입니다.",
    "metrics": [
      {
        "value": "상태 → 동작",
        "label": "MuJoCo 로봇 팔"
      }
    ],
    "author": "Dmytro Hrybov",
    "handle": "dimentary",
    "source": "https://x.com/dimentary/status/2101018760371171420",
    "research": "https://jevable.com/project/2101018760371171420",
    "reviewed": "2026-09-21",
    "keywords": [
      "MuJoCo robot-arm control",
      "simulation",
      "robot-arm"
    ],
    "note": "시뮬레이션 데모입니다. 실제 로봇에서의 안전성·정밀도 검증이나 Jev의 직접 영상 인식 사례가 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101018760371171420",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101017646154366976/img/02bH3Hxy9l0qEffS.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "voice-figma",
    "category": "interface",
    "title": "마우스 대신 말로, Figma를 조작한다.",
    "summary": "디자인 작업 중 음성 요청을 Figma의 동작으로 연결합니다. 입력한 말을 바탕으로 도구가 실행할 행동을 고르는 인터페이스 시연입니다.",
    "metrics": [
      {
        "value": "음성 → 디자인 동작",
        "label": "Figma 제어"
      }
    ],
    "author": "mikegee",
    "handle": "mikegee",
    "source": "https://x.com/mikegee/status/2100845388655960112",
    "research": "https://jevable.com/project/2100845388655960112",
    "reviewed": "2026-09-21",
    "keywords": [
      "Voice-controlled Figma",
      "Figma",
      "voice"
    ],
    "note": "음성 인식과 Figma 실행 도구를 결합한 실험입니다. Jev 자체가 음성을 직접 인식하거나 완성된 디자인을 생성하는 기능은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100845388655960112",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100844622213959680/img/yPzf2Js8iJLezbtu.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "live-3d-expressions",
    "category": "interface",
    "title": "표정 하나 대신, 눈·입·시선을 따로 움직인다.",
    "summary": "Mutuals의 3D 캐릭터가 메시지마다 여러 판단을 조합해 반응합니다. 입과 눈썹, 시선, 몸짓을 나눠 선택해 캐릭터의 표현을 구성하는 데모입니다.",
    "metrics": [
      {
        "value": "메시지당 10개 판단",
        "label": "3D 캐릭터 반응"
      }
    ],
    "author": "Joao Bortotti",
    "handle": "john_bortotti",
    "source": "https://x.com/john_bortotti/status/2101019513676345555",
    "research": "https://jevable.com/project/2101019513676345555",
    "reviewed": "2026-09-21",
    "keywords": [
      "Live 3D character expressions",
      "3d",
      "characters",
      "animation"
    ],
    "note": "가상 캐릭터의 표현을 만드는 제작자 실험입니다. 실제 사람의 감정을 판별하거나 정해진 정확도로 모사한다는 뜻은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101019513676345555",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101017687044366336/img/i9QnHKeZumFnNMCB.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "semantic-sheet-formatting",
    "category": "interface",
    "title": "셀의 의미에 맞춰, 표의 서식을 바꾼다.",
    "summary": "값의 크기뿐 아니라 셀에 담긴 내용을 기준으로 스프레드시트의 서식을 고르는 실험입니다. 의미를 읽는 조건부 서식을 Shortcut에 연결하는 구상을 보여 줍니다.",
    "metrics": [
      {
        "value": "의미 기반 서식",
        "label": "스프레드시트"
      }
    ],
    "author": "Robert Yang",
    "handle": "GuangyuRobert",
    "source": "https://x.com/GuangyuRobert/status/2100601420395282695",
    "research": "https://jevable.com/project/2100601420395282695",
    "reviewed": "2026-09-21",
    "keywords": [
      "Semantic spreadsheet formatting",
      "spreadsheets",
      "formatting",
      "semantic-classification"
    ],
    "note": "제작자의 실험과 통합 제안입니다. Shortcut에 정식 출시된 기능으로 확인한 사례는 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100601420395282695",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100477859018272768/img/XiwQwp3fqCnc1ZYz.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "pdf-ocr-router",
    "category": "data",
    "title": "PDF에서 OCR이 필요한 페이지만 골라낸다.",
    "summary": "문서의 각 페이지를 살펴 OCR로 보낼지, 로컬 텍스트 추출로 처리할지 나눕니다. 읽을 수 있는 페이지까지 비싼 처리 경로에 보내지 않도록 경로를 고르는 데모입니다.",
    "metrics": [
      {
        "value": "페이지별 경로 선택",
        "label": "OCR · 텍스트 추출"
      }
    ],
    "author": "Misbah Syed",
    "handle": "MisbahSy",
    "source": "https://x.com/MisbahSy/status/2100979972194369925",
    "research": "https://jevable.com/project/2100979972194369925",
    "reviewed": "2026-09-21",
    "keywords": [
      "A page-by-page OCR router",
      "pdf",
      "ocr",
      "routing"
    ],
    "note": "Jev는 처리 경로를 분류합니다. OCR 인식 품질과 전체 비용 절감은 문서 구성과 사용 도구에 따라 달라집니다.",
    "media": {
      "type": "x",
      "id": "2100979972194369925",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100978985480167424/img/Qcx8F-7plQRcpzqg.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "bannerbear-field-mapping",
    "category": "work",
    "title": "서로 다른 필드 이름을, 의미로 연결한다.",
    "summary": "Bannerbear 템플릿의 사진·이름·회사 칸을 데이터의 avatar·full_name·business에 대응시킵니다. 이름이 정확히 같지 않아도 채울 위치를 고르는 필드 매핑 시연입니다.",
    "metrics": [
      {
        "value": "데이터 → 템플릿",
        "label": "Bannerbear 필드 연결"
      }
    ],
    "author": "Jon Yongfook",
    "handle": "yongfook",
    "source": "https://x.com/yongfook/status/2100801037192024478",
    "research": "https://jevable.com/project/2100801037192024478",
    "reviewed": "2026-09-21",
    "keywords": [
      "Bannerbear instant field mapping",
      "automation",
      "data mapping"
    ],
    "note": "제작자가 공개한 템플릿 매핑 사례입니다. 임의의 데이터 구조에서 모든 필드를 정확히 연결한다는 보장은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100801037192024478",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100800207256756224/img/qfKKxj1Oh8pHHnD7.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "higgsfield-model-routing",
    "category": "content",
    "title": "프롬프트에 맞는 영상·이미지 모델을 고른다.",
    "summary": "Higgsfield는 요청에 어울리는 생성 모델을 선택하는 단계에 Jev를 연결했습니다. 사용자가 적은 내용을 보고 실제 생성 작업을 맡길 경로를 정하는 사례입니다.",
    "metrics": [
      {
        "value": "요청 → 모델 선택",
        "label": "Higgsfield 라우팅"
      }
    ],
    "author": "Higgsfield AI 🧩",
    "handle": "higgsfield_ai",
    "source": "https://x.com/higgsfield_ai/status/2101022133753430365",
    "research": "https://jevable.com/project/2101022133753430365",
    "reviewed": "2026-09-21",
    "keywords": [
      "Higgsfield model routing",
      "model-routing",
      "image",
      "video"
    ],
    "note": "Jev의 역할은 모델 선택입니다. 이미지·영상 생성은 선택된 별도 모델이 수행합니다.",
    "media": {
      "type": "x",
      "id": "2101022133753430365",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101022052279058432/img/9UB9da_sc74S_NtV.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "upweight-hacker-news",
    "category": "data",
    "title": "내가 원하는 읽을거리를, 슬라이더로 위로 올린다.",
    "summary": "Upweight는 기술적 깊이와 실용성처럼 읽고 싶은 글의 기준을 조절하게 합니다. 여섯 개 슬라이더의 설정에 맞춰 Hacker News 글의 우선순위를 다시 매깁니다.",
    "metrics": [
      {
        "value": "6개 슬라이더",
        "label": "개인화된 뉴스 정렬"
      }
    ],
    "author": "Vishesh Baghel",
    "handle": "VisheshBaghell",
    "source": "https://x.com/VisheshBaghell/status/2100536228827496721",
    "research": "https://jevable.com/project/2100536228827496721",
    "reviewed": "2026-09-21",
    "keywords": [
      "Upweight for Hacker News",
      "hacker-news",
      "ranking",
      "personalization"
    ],
    "note": "선호 기준에 따른 순위 조정 데모입니다. 기사 내용의 사실 여부나 객관적 품질을 인증하는 기능은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100536228827496721",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100535993141239808/img/Q_giQHiIdU-aAvI6.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "gmail-intent-search",
    "category": "data",
    "title": "정확한 단어를 몰라도, 찾던 이메일에 가까이.",
    "summary": "받은편지함에서 사용자가 찾는 내용의 의도를 기준으로 이메일을 탐색합니다. 단어 일치만으로 찾기 어려운 메일을 후보로 좁히는 검색 시연입니다.",
    "metrics": [
      {
        "value": "의도 기반 검색",
        "label": "Gmail 받은편지함"
      }
    ],
    "author": "nader dabit",
    "handle": "dabit3",
    "source": "https://x.com/dabit3/status/2100960281769738433",
    "research": "https://jevable.com/project/2100960281769738433",
    "reviewed": "2026-09-21",
    "keywords": [
      "Search your inbox by intent",
      "productivity"
    ],
    "note": "제작자의 메일 검색 데모입니다. 큰 받은편지함에는 임베딩 등 후보 검색 단계가 추가로 필요할 수 있습니다.",
    "media": {
      "type": "x",
      "id": "2100960281769738433",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100959260616151040/img/nb1GFqB_cwNesugB.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "ui-flow-capture",
    "category": "browser",
    "title": "보고 싶은 제품 흐름을, 그때그때 캡처한다.",
    "summary": "로그인이나 제품 탐색처럼 원하는 화면 흐름을 브라우저에서 찾아 수집하는 실험입니다. 미리 저장된 자료 대신 현재 동작하는 UI를 레퍼런스로 확보하는 구상입니다.",
    "metrics": [
      {
        "value": "탐색 → 흐름 수집",
        "label": "UI 레퍼런스"
      }
    ],
    "author": "omar ✌️",
    "handle": "omarjpeg",
    "source": "https://x.com/omarjpeg/status/2101047036863037753",
    "research": "https://jevable.com/project/2101047036863037753",
    "reviewed": "2026-09-21",
    "keywords": [
      "On-demand UI flow capture",
      "design-research",
      "ui-flows",
      "browser-agents"
    ],
    "note": "Jev와 브라우저 조작 도구를 결합한 제작자 시연입니다. 모든 서비스의 화면 흐름을 자동으로 수집할 수 있다는 뜻은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101047036863037753",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101046478685007872/img/gR52RkPOJb99hnPD.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "json-render-ui",
    "category": "interface",
    "title": "상황에 맞는 화면을, 준비된 부품으로 조립한다.",
    "summary": "컴포넌트와 동작, 디자인 규칙을 준비해 두면 Jev가 상황에 맞는 구성을 고릅니다. json-render가 그 선택을 실제 인터페이스로 표현하는 생성형 UI 실험입니다.",
    "metrics": [
      {
        "value": "선택 → 화면 렌더링",
        "label": "json-render"
      }
    ],
    "author": "Chris Tate",
    "handle": "ctatedev",
    "source": "https://x.com/ctatedev/status/2101022101750571357",
    "research": "https://jevable.com/project/2101022101750571357",
    "reviewed": "2026-09-21",
    "keywords": [
      "Instant generative UI",
      "generative-ui",
      "json-render",
      "real-time"
    ],
    "note": "미리 제공한 컴포넌트와 동작을 구성하는 방식입니다. Jev가 자유 형식의 HTML이나 앱 코드를 직접 작성하는 사례가 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101022101750571357",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101022081810911232/img/3tKdQ3Y2_ZGSg3Q7.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "moss-litter-pickup",
    "category": "simulation",
    "title": "로봇에게, 다음에 주울 쓰레기를 고르게 한다.",
    "summary": "MOSS는 캔과 병 같은 후보에서 집을 대상을 선택하는 과정을 실험합니다. Jev가 내린 선택을 시뮬레이션에서 재생해 수거 흐름을 살펴봅니다.",
    "metrics": [
      {
        "value": "대상 선택 → 수거",
        "label": "MOSS 시뮬레이션"
      }
    ],
    "author": "metr0x",
    "handle": "metrox_eth",
    "source": "https://x.com/metrox_eth/status/2101021471644733867",
    "research": "https://jevable.com/project/2101021471644733867",
    "reviewed": "2026-09-21",
    "keywords": [
      "MOSS litter-picking simulation",
      "simulation",
      "robotics"
    ],
    "note": "판단을 시뮬레이션에 재생한 데모입니다. 실제 야외 로봇의 자율 수거나 현장 안전성을 입증한 사례가 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101021471644733867",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101021391575457792/img/x227ubbFebYxck1p.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "session-replay-triage",
    "category": "work",
    "title": "막힌 클릭과 오류 기록에서, 고칠 문제를 찾는다.",
    "summary": "반응 없는 클릭, 반복 클릭, JavaScript 오류 같은 사용 기록을 모아 문제를 추립니다. 우선 살펴볼 버그를 고른 뒤 수정안을 만드는 개발 흐름에 연결합니다.",
    "metrics": [
      {
        "value": "사용 기록 → 수정 후보",
        "label": "세션 리플레이 분석"
      }
    ],
    "author": "Taras",
    "handle": "tarasshyn",
    "source": "https://x.com/tarasshyn/status/2101012033340571952",
    "research": "https://jevable.com/project/2101012033340571952",
    "reviewed": "2026-09-21",
    "keywords": [
      "Session replay to bug fixes",
      "session-replay",
      "debugging"
    ],
    "note": "이벤트 기록과 개발 도구를 결합한 워크플로 데모입니다. Jev가 영상을 직접 시청하거나 수정 코드를 단독으로 작성하는 방식은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101012033340571952",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101011544515526656/img/iSFydnTHWxsRx9hy.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "postgres-query-planner",
    "category": "data",
    "title": "같은 쿼리도, 테이블을 어떤 순서로 합칠까.",
    "summary": "PostgreSQL 쿼리에서 테이블을 결합하는 순서를 고르는 실험입니다. 데이터베이스 실행 계획의 선택 지점에 Jev를 넣어 처리 경로를 바꿔 봅니다.",
    "metrics": [
      {
        "value": "조인 순서 선택",
        "label": "PostgreSQL 실행 계획"
      }
    ],
    "author": "Michael Malis",
    "handle": "mmalisper",
    "source": "https://x.com/mmalisper/status/2101001041903009987",
    "research": "https://jevable.com/project/2101001041903009987",
    "reviewed": "2026-09-21",
    "keywords": [
      "A Jev query planner",
      "postgres",
      "query-optimization"
    ],
    "note": "제작자의 쿼리 플래너 실험입니다. 공개된 개별 벤치마크의 개선을 모든 쿼리와 데이터베이스 규모에 일반화할 수 없습니다.",
    "media": {
      "type": "x",
      "id": "2101001041903009987",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100995303935791105/img/eK9B54C5duJ9b-Od.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "agent-environment-router",
    "category": "work",
    "title": "이 작업은 어떤 에이전트와 컴퓨터에 맡길까.",
    "summary": "요청을 보고 사용할 에이전트, 모델, 컴퓨터, 작업 폴더를 선택합니다. 개발 작업의 성격에 맞춰 실행 환경을 연결하는 라우팅 데모입니다.",
    "metrics": [
      {
        "value": "작업 → 실행 환경",
        "label": "에이전트 라우팅"
      }
    ],
    "author": "Sawyer Hood",
    "handle": "sawyerhood",
    "source": "https://x.com/sawyerhood/status/2100994779291259187",
    "research": "https://jevable.com/project/2100994779291259187",
    "reviewed": "2026-09-21",
    "keywords": [
      "Automatic agent and model selection",
      "model-routing",
      "tool-selection"
    ],
    "note": "선택된 에이전트와 컴퓨터가 실제 작업을 수행합니다. Jev가 직접 코드를 고치거나 운영체제를 실행한다는 의미는 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100994779291259187",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100990656252661760/img/ceUStNdfX7n8-khU.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "box-incident-triage",
    "category": "work",
    "title": "장애 대응의 첫 판단을, 질문별로 구조화한다.",
    "summary": "Box는 인시던트 분류 흐름에 Jev의 구조화된 판단을 적용했습니다. 사건 상태에 대한 질문에 참·거짓, 선택지, 점수로 응답해 다음 처리 단계와 연결하는 사례입니다.",
    "metrics": [
      {
        "value": "구조화된 질문·응답",
        "label": "Box 인시던트 분류"
      }
    ],
    "author": "Box",
    "handle": "Box",
    "source": "https://x.com/Box/status/2100993278955188320",
    "research": "https://jevable.com/project/2100993278955188320",
    "reviewed": "2026-09-21",
    "keywords": [
      "Incident triage in Box",
      "incident-triage",
      "documents"
    ],
    "note": "Box가 공개한 워크플로 시연입니다. 운영 장애를 자동으로 해결하거나 대응 정확도를 독립 검증한 결과는 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100993278955188320",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100986163511357440/img/o0Yzl7VqISwchxkk.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "slack-skill-router",
    "category": "work",
    "title": "Slack 요청이 들어오면, 쓸 도구부터 정한다.",
    "summary": "에이전트가 일을 시작하기 전에 요청에 맞는 스킬과 도구, 전달할 값을 고릅니다. Slack의 자연어 요청을 실행 준비가 된 작업으로 연결하는 데모입니다.",
    "metrics": [
      {
        "value": "요청 → 스킬·도구",
        "label": "Slack 에이전트"
      }
    ],
    "author": "John Yeo",
    "handle": "johnyeo_",
    "source": "https://x.com/johnyeo_/status/2100987661926252737",
    "research": "https://jevable.com/project/2100987661926252737",
    "reviewed": "2026-09-21",
    "keywords": [
      "A faster Slack agent",
      "slack",
      "tool-selection"
    ],
    "note": "선행 라우팅 단계의 제작자 시연입니다. 실제 도구 호출과 작업 수행 시간은 연결된 서비스에 따라 달라집니다.",
    "media": {
      "type": "x",
      "id": "2100987661926252737",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100986453845028864/img/YknQ8SR5kudv19m-.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "jev-reviewer-papers",
    "category": "data",
    "title": "문헌 검토에 필요한 정보를, 논문에서 추려 낸다.",
    "summary": "Jev Reviewer는 체계적 문헌 검토에 쓸 정보를 논문에서 찾고 추출하는 도구입니다. 여러 자료를 비교하기 전에 필요한 항목을 모으는 작업을 지원합니다.",
    "metrics": [
      {
        "value": "논문 → 검토 항목",
        "label": "Jev Reviewer"
      }
    ],
    "author": "Ahmad Sofi-Mahmudi",
    "handle": "ASofiMahmudi",
    "source": "https://x.com/ASofiMahmudi/status/2100985031703269425",
    "research": "https://jevable.com/project/2100985031703269425",
    "reviewed": "2026-09-21",
    "keywords": [
      "Jev Reviewer",
      "research-papers",
      "open-source"
    ],
    "note": "연구 자료 탐색·추출을 지원하는 제작자 시연입니다. 추출 결과의 원문 대조와 최종 연구 판단은 검토자가 수행해야 합니다.",
    "media": {
      "type": "x",
      "id": "2100985031703269425",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100984949104836608/img/grrFxuawHqVXDVSV.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "plain-english-logic",
    "category": "work",
    "title": "영어로 적은 사실과 규칙을, 실행 가능한 논리로.",
    "summary": "자연어로 표현한 사실과 규칙을 처리하는 논리 인터프리터에 Jev를 연결했습니다. 인터프리터가 규칙 실행을 조율하고 모델의 판단을 중간 단계에 활용하는 실험입니다.",
    "metrics": [
      {
        "value": "자연어 규칙 + 인터프리터",
        "label": "논리 실행 실험"
      }
    ],
    "author": "Shawn Simister",
    "handle": "narphorium",
    "source": "https://x.com/narphorium/status/2100985027093749764",
    "research": "https://jevable.com/project/2100985027093749764",
    "reviewed": "2026-09-21",
    "keywords": [
      "A plain-English logic interpreter",
      "logic",
      "programming-languages"
    ],
    "note": "인터프리터와 Jev를 결합한 시스템 데모입니다. 임의의 자연어 규칙을 항상 올바르게 해석하거나 추론한다는 보장은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100985027093749764",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100984200820121600/img/dXya52zCSiVBJVaF.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "supabase-rls-linter",
    "category": "work",
    "title": "데이터 접근 정책을, 배포 전에 한 번 더 점검.",
    "summary": "Supabase의 행 단위 접근 제어 정책을 살펴보는 실험적 린터입니다. 정책 내용을 평가해 개발자가 검토할 지점을 찾는 흐름에 Jev를 활용합니다.",
    "metrics": [
      {
        "value": "정책 검토 보조",
        "label": "Supabase RLS"
      }
    ],
    "author": "Ali Waseem",
    "handle": "softwarecuddler",
    "source": "https://x.com/softwarecuddler/status/2100981707105284255",
    "research": "https://jevable.com/project/2100981707105284255",
    "reviewed": "2026-09-21",
    "keywords": [
      "Supabase RLS linter",
      "supabase",
      "security",
      "linting"
    ],
    "note": "제작자의 실험적 점검 도구입니다. 보안 감사, 접근 제어 테스트 또는 취약점 부재의 증명을 대신하지 않습니다.",
    "media": {
      "type": "x",
      "id": "2100981707105284255",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100981261007507456/img/FLs24JzKRsdrrFER.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "library-index-search",
    "category": "data",
    "title": "책 전체 대신 색인에서, 펼쳐 볼 쪽을 찾는다.",
    "summary": "실물 도서의 색인을 질문과 대조해 관련 내용이 있을 법한 페이지를 고릅니다. 책을 직접 펼쳐 확인하기 전에 탐색 범위를 좁혀 주는 도서 검색 실험입니다.",
    "metrics": [
      {
        "value": "질문 + 책 색인",
        "label": "관련 페이지 탐색"
      }
    ],
    "author": "Seth Thompson",
    "handle": "s3ththompson",
    "source": "https://x.com/s3ththompson/status/2100975114753892550",
    "research": "https://jevable.com/project/2100975114753892550",
    "reviewed": "2026-09-21",
    "keywords": [
      "Search a physical library",
      "books",
      "semantic-search"
    ],
    "note": "색인에 기반한 후보 페이지 선택입니다. 책 전체 내용을 읽고 답변을 생성하거나 해당 페이지에 정답이 있음을 보장하는 방식은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100975114753892550",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100974992653500416/img/7rTO_q-ntbWDGTuR.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "tax-document-classifier",
    "category": "work",
    "title": "세금 관련 서류를, 처리 전에 종류별로 정리.",
    "summary": "문서 처리 파이프라인에서 세무 서류의 유형을 분류합니다. 다음 단계에 맞는 묶음과 경로를 고르는 반복 판단에 Jev를 연결한 시연입니다.",
    "metrics": [
      {
        "value": "서류 유형 분류",
        "label": "문서 처리 파이프라인"
      }
    ],
    "author": "Nakshatra Saxena",
    "handle": "nedwize",
    "source": "https://x.com/nedwize/status/2100973868324417852",
    "research": "https://jevable.com/project/2100973868324417852",
    "reviewed": "2026-09-21",
    "keywords": [
      "Tax document classification",
      "documents",
      "classification"
    ],
    "note": "문서 분류 사례입니다. 세액 계산, 세법 해석 또는 신고 내용의 적정성을 판단한 사례가 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100973868324417852",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100973360989773825/img/yMtL6CxrKMVXQEHV.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "jevals-workbench",
    "category": "work",
    "title": "같은 질문을 바꿔 가며, 판단 결과를 비교한다.",
    "summary": "Jevals는 Jev의 선택형·점수형 등 여러 질문을 로컬에서 시험하는 작업대입니다. 입력과 질문을 수정하고 결과를 비교하며 적용할 구성을 탐색합니다.",
    "metrics": [
      {
        "value": "질문 실험·비교",
        "label": "Jevals 로컬 도구"
      }
    ],
    "author": "Nick DeJesus 🛒🎉 - Former Unpaid CTO @BTPipeline",
    "handle": "Dayhaysoos",
    "source": "https://x.com/Dayhaysoos/status/2100968892591968320",
    "research": "https://jevable.com/project/2100968892591968320",
    "reviewed": "2026-09-21",
    "keywords": [
      "Jevals",
      "evaluation",
      "testing",
      "open-source"
    ],
    "note": "개발용 평가 도구의 제작자 시연입니다. 도구를 사용하는 것만으로 운영 정확도나 확률 보정이 확보되는 것은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100968892591968320",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100965288850145280/img/Ik0MohKW-MEyT6p4.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "wakeword-free-assistant",
    "category": "interface",
    "title": "깨우는 말 없이, 명령인지 일상 대화인지 구분.",
    "summary": "음성 전사 결과를 읽고 도우미에게 내린 요청인지 평범한 대화인지 판단합니다. 매번 호출어를 말하지 않는 음성 인터페이스를 실험합니다.",
    "metrics": [
      {
        "value": "전사 → 의도 구분",
        "label": "호출어 없는 도우미"
      }
    ],
    "author": "Max Blade",
    "handle": "_MaxBlade",
    "source": "https://x.com/_MaxBlade/status/2100967959879471519",
    "research": "https://jevable.com/project/2100967959879471519",
    "reviewed": "2026-09-21",
    "keywords": [
      "An assistant without a wake word",
      "voice",
      "intent"
    ],
    "note": "음성 수집과 전사는 별도 구성 요소가 맡습니다. 주변 대화를 명령으로 오인할 수 있는 실험적 인터페이스입니다.",
    "media": {
      "type": "x",
      "id": "2100967959879471519",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100966551826444288/img/i2s52ZeMNTOO-IRD.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "driving-decision-simulator",
    "category": "simulation",
    "title": "차선 변경, 감속, 제동 중 다음 행동을 고른다.",
    "summary": "주행 환경의 상태를 전달받아 가속·감속·차선 변경 같은 행동을 선택합니다. 연속되는 교통 상황에 작은 판단을 연결하는 운전 시뮬레이션입니다.",
    "metrics": [
      {
        "value": "환경 상태 → 행동",
        "label": "주행 시뮬레이터"
      }
    ],
    "author": "Cipher",
    "handle": "cipherwrk",
    "source": "https://x.com/cipherwrk/status/2100965547454374316",
    "research": "https://jevable.com/project/2100965547454374316",
    "reviewed": "2026-09-21",
    "keywords": [
      "A driving decision simulator",
      "simulation",
      "driving"
    ],
    "note": "가상 환경의 의사결정 데모입니다. 실제 도로의 자율주행이나 차량 안전 제어에 사용할 수 있음을 입증한 사례가 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100965547454374316",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100965500314615808/img/19kMbu9jghFUkaBs.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "brand-news-matching",
    "category": "content",
    "title": "오늘의 뉴스 중, 우리 브랜드에 맞는 이야기는.",
    "summary": "여러 뉴스 항목을 브랜드별 관심사와 대조해 관련성을 평가합니다. 콘텐츠 팀이 참고할 주제를 먼저 좁혀 보는 뉴스 매칭 데모입니다.",
    "metrics": [
      {
        "value": "384개 뉴스 · 15개 브랜드",
        "label": "제작자가 공개한 비교 규모"
      }
    ],
    "author": "Elvis",
    "handle": "elvissun",
    "source": "https://x.com/elvissun/status/2100951347080421409",
    "research": "https://jevable.com/project/2100951347080421409",
    "reviewed": "2026-09-21",
    "keywords": [
      "News matching for brands",
      "news",
      "matching"
    ],
    "note": "내용과 브랜드의 적합성 평가입니다. 뉴스의 진위 검증이나 해당 주제로 만든 콘텐츠의 성과를 보장하지 않습니다.",
    "media": {
      "type": "x",
      "id": "2100951347080421409",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100951319108567040/img/AZ1jFv9ySdRV-JYE.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "asteroid-drone",
    "category": "simulation",
    "title": "확신이 낮은 순간은, 다른 모델에 넘기는 드론.",
    "summary": "소행성 구역의 가상 드론이 좌우 이동과 속도 조절을 선택합니다. 판단의 확신도를 표시하고 애매한 상황은 큰 모델로 넘기는 구성을 보여 줍니다.",
    "metrics": [
      {
        "value": "빠른 판단 + 추가 검토",
        "label": "가상 드론 제어"
      }
    ],
    "author": "Mahmoud",
    "handle": "MKhordoo",
    "source": "https://x.com/MKhordoo/status/2100950317852455039",
    "research": "https://jevable.com/project/2100950317852455039",
    "reviewed": "2026-09-21",
    "keywords": [
      "A drone in an asteroid field",
      "simulation",
      "navigation"
    ],
    "note": "시뮬레이션과 모델 라우팅 실험입니다. 실제 비행의 충돌 회피 성능이나 확률 점수의 안전성을 검증한 사례가 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100950317852455039",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100950290618867712/img/FY-SPST7ifK3ls5W.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "focus-rail",
    "category": "games",
    "title": "달리는 열차가 제 역에 가도록, 선로를 바꾼다.",
    "summary": "Focus Rail에서 열차와 역의 상태를 보고 분기기를 선택합니다. 여러 열차의 움직임에 맞춰 다음 선로 연결을 고르는 실시간 게임 시연입니다.",
    "metrics": [
      {
        "value": "열차 상태 → 분기기",
        "label": "Focus Rail"
      }
    ],
    "author": "benkigera",
    "handle": "benkigera",
    "source": "https://x.com/benkigera/status/2101035079149449398",
    "research": "https://jevable.com/project/2101035079149449398",
    "reviewed": "2026-09-21",
    "keywords": [
      "Focus Rail train routing",
      "simulation",
      "strategy"
    ],
    "note": "게임 환경의 행동 선택 데모입니다. 실제 철도 운행이나 안전 제어를 위한 시스템이 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101035079149449398",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101034877193740288/img/BZfW41He6nNwOkLN.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "abide-agent-rules",
    "category": "work",
    "title": "코딩 에이전트가, 팀의 작업 규칙을 따르는지.",
    "summary": "Abide는 에이전트의 각 작업 단계를 자연어로 적은 규칙에 비춰 봅니다. 단순한 코드 검사로 표현하기 어려운 지침을 점검하는 보조 도구입니다.",
    "metrics": [
      {
        "value": "작업 단계별 규칙 점검",
        "label": "Abide"
      }
    ],
    "author": "Ohans Emmanuel",
    "handle": "OhansEmmanuel",
    "source": "https://x.com/OhansEmmanuel/status/2101034822760288452",
    "research": "https://jevable.com/project/2101034822760288452",
    "reviewed": "2026-09-21",
    "keywords": [
      "Abide coding-agent rules",
      "code review",
      "open source"
    ],
    "note": "자연어 지침 준수를 평가하는 제작자 실험입니다. 컴파일러, 테스트, 코드 리뷰를 대신하지 않습니다.",
    "media": {
      "type": "x",
      "id": "2101034822760288452",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101034808826851328/img/I9qffLGFLpK0-4Tn.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "agentrun-workflows",
    "category": "work",
    "title": "한 번 배운 작업을, 다음에는 다시 활용한다.",
    "summary": "AgentRun은 에이전트가 작업을 수행하며 만든 해결 절차를 재사용하는 흐름입니다. Jev의 판단과 코딩 에이전트를 연결해 반복 작업의 실행 방식을 구성합니다.",
    "metrics": [
      {
        "value": "작업 학습 → 재사용",
        "label": "AgentRun"
      }
    ],
    "author": "Miguel Ríos Berríos",
    "handle": "MiguelriosEN",
    "source": "https://x.com/MiguelriosEN/status/2101033282414768456",
    "research": "https://jevable.com/project/2101033282414768456",
    "reviewed": "2026-09-21",
    "keywords": [
      "AgentRun reusable workflows",
      "automation",
      "workflows"
    ],
    "note": "여러 구성 요소를 결합한 에이전트 시스템입니다. Jev 단독으로 코드를 생성하거나 모든 반복 작업을 자동 학습하는 기능은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101033282414768456",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101032781270917120/img/8tGv1qWQd8M9mEec.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "android-e2e-testing",
    "category": "browser",
    "title": "Android 앱의 테스트 단계를, 실제 기기에서.",
    "summary": "Wikipedia 앱을 열고 정해진 흐름을 따라가는 Android 테스트 시연입니다. Jev가 다음 조작을 고르고 기기 제어 도구가 테스트 단계를 실행합니다.",
    "metrics": [
      {
        "value": "15단계",
        "label": "공개된 Android 테스트"
      }
    ],
    "author": "Kevin Kern",
    "handle": "kevinkern",
    "source": "https://x.com/kevinkern/status/2101032931456168098",
    "research": "https://jevable.com/project/2101032931456168098",
    "reviewed": "2026-09-21",
    "keywords": [
      "Android end-to-end testing",
      "testing",
      "mobile"
    ],
    "note": "제작자가 공개한 특정 앱·기기 환경의 실행입니다. 모든 Android 앱에서의 호환성이나 기존 테스트 대비 일반적인 속도 우위를 뜻하지 않습니다.",
    "media": {
      "type": "x",
      "id": "2101032931456168098",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101032303396790272/img/RbVCCv2UgU7Jox4h.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "voice-beatmaking",
    "category": "content",
    "title": "“스네어를 바꿔 줘”, 말로 비트를 다듬는다.",
    "summary": "음성 요청을 받아 템포와 드럼 구성 같은 음악 작업의 설정을 바꿉니다. Jev가 요청에 맞는 조작을 고르고 음악 도구가 소리를 표현하는 시연입니다.",
    "metrics": [
      {
        "value": "음성 → 음악 도구 조작",
        "label": "대화형 비트 제작"
      }
    ],
    "author": "Mahir",
    "handle": "mahirb22",
    "source": "https://x.com/mahirb22/status/2101023899265692100",
    "research": "https://jevable.com/project/2101023899265692100",
    "reviewed": "2026-09-21",
    "keywords": [
      "Making beats by talking",
      "music",
      "voice"
    ],
    "note": "음성 인식과 음악 제작 도구를 결합한 데모입니다. Jev가 오디오 파형이나 완성된 음악을 직접 생성하는 기능은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101023899265692100",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101023732634427392/img/Lw8PZXdVXHBvuawd.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "contextual-autofill",
    "category": "interface",
    "title": "지금 화면에 맞는 자동 입력 버튼이 나타난다.",
    "summary": "앱의 현재 맥락에서 채울 만한 값을 고르고 빠른 입력 버튼으로 제공합니다. 별도의 대화를 시작하지 않고 작업 화면 안에서 도움을 받는 인터페이스 실험입니다.",
    "metrics": [
      {
        "value": "화면 맥락 → 빠른 입력",
        "label": "상황별 자동 완성"
      }
    ],
    "author": "Chris Nicholas",
    "handle": "ctnicholasdev",
    "source": "https://x.com/ctnicholasdev/status/2100928133608472817",
    "research": "https://jevable.com/project/2100928133608472817",
    "reviewed": "2026-09-21",
    "keywords": [
      "Intelligent autofill buttons",
      "forms",
      "interfaces"
    ],
    "note": "제작자의 앱 인터페이스 데모입니다. 자동 입력 제안의 적합성은 앱이 제공하는 맥락과 선택지에 따라 달라집니다.",
    "media": {
      "type": "x",
      "id": "2100928133608472817",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100928115648405506/img/1ddfEiaKJLPA4Xuh.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "cascade-search",
    "category": "data",
    "title": "쉬운 검색어는 로컬에서, 애매한 표현만 Jev로.",
    "summary": "Cascade Search는 입력 중인 검색어를 필터 조건으로 바꿉니다. 작은 로컬 모델이 먼저 처리하고 뜻이 모호한 표현을 Jev에 넘기는 두 단계 검색 실험입니다.",
    "metrics": [
      {
        "value": "로컬 모델 + Jev",
        "label": "입력 중 검색 필터"
      }
    ],
    "author": "Zaid",
    "handle": "zaidmukaddam",
    "source": "https://x.com/zaidmukaddam/status/2100910232255992032",
    "research": "https://jevable.com/project/2100910232255992032",
    "reviewed": "2026-09-21",
    "keywords": [
      "Cascade Search typed query filters",
      "search",
      "query parsing"
    ],
    "note": "제작자가 언급한 0.25ms는 로컬 모델 단계의 수치입니다. Jev 호출이나 전체 검색의 지연 시간으로 해석하면 안 됩니다.",
    "media": {
      "type": "x",
      "id": "2100910232255992032",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100910214530953216/img/pZDYHLcrOl_f0pWI.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "clipboard-quick-actions",
    "category": "interface",
    "title": "복사한 내용에 맞춰, 다음 동작을 제안한다.",
    "summary": "Mac의 클립보드에 들어온 내용을 보고 유용한 빠른 동작을 고릅니다. 터미널 명령처럼 후속 작업이 있는 텍스트를 알아보고 실행 선택지를 보여 주는 데모입니다.",
    "metrics": [
      {
        "value": "클립보드 → 동작 제안",
        "label": "Mac 빠른 작업"
      }
    ],
    "author": "Marcel Pociot 🧪",
    "handle": "marcelpociot",
    "source": "https://x.com/marcelpociot/status/2100907261593829675",
    "research": "https://jevable.com/project/2100907261593829675",
    "reviewed": "2026-09-21",
    "keywords": [
      "Contextual clipboard quick actions",
      "macOS",
      "clipboard"
    ],
    "note": "동작을 제안하는 인터페이스 시연입니다. 복사한 모든 명령을 자동 실행하거나 명령의 안전성을 보장하는 기능은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100907261593829675",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100907154752282625/img/ymaN0AxIqCG4H4yU.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "cal-team-scheduling",
    "category": "work",
    "title": "팀원이 함께 비는 시간을, 바로 골라 본다.",
    "summary": "Cal.com의 팀 일정 조율 흐름에서 구성원들이 함께 가능한 시간을 선택합니다. 캘린더 데이터와 빠른 판단을 연결하는 회의 시간 탐색 사례입니다.",
    "metrics": [
      {
        "value": "공통 가능 시간 선택",
        "label": "Cal.com 일정 조율"
      }
    ],
    "author": "Peer Richelsen",
    "handle": "peer_rich",
    "source": "https://x.com/peer_rich/status/2100902559313502602",
    "research": "https://jevable.com/project/2100902559313502602",
    "reviewed": "2026-09-21",
    "keywords": [
      "Instant team scheduling with Cal.com",
      "scheduling",
      "calendars"
    ],
    "note": "전체 응답 시간에는 캘린더 API 왕복도 포함됩니다. 모델 판단 속도를 그대로 회의 예약 완료 시간으로 볼 수 없습니다.",
    "media": {
      "type": "x",
      "id": "2100902559313502602",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100902393894342656/img/22LO2K2E8E9JAhMB.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "maxfusion-ad-shots",
    "category": "content",
    "title": "영상 광고를, 장면별 평가표로 살펴본다.",
    "summary": "Maxfusion에서 가져온 영상 광고의 각 장면을 기준별로 평가하는 도구입니다. 여러 광고를 비교하기 전에 살펴볼 컷을 좁혀 주는 광고 리서치 시연입니다.",
    "metrics": [
      {
        "value": "장면별 평가",
        "label": "Maxfusion 광고 리서치"
      }
    ],
    "author": "Vlad Dubchak",
    "handle": "vladdubchak_x",
    "source": "https://x.com/vladdubchak_x/status/2100870244004683886",
    "research": "https://jevable.com/project/2100870244004683886",
    "reviewed": "2026-09-21",
    "keywords": [
      "Scoring every shot in a video ad",
      "advertising",
      "video"
    ],
    "note": "영상 처리와 Jev를 결합한 파이프라인입니다. Jev가 영상을 직접 입력받는 기능이나 광고 매출·전환율을 예측한 검증 결과가 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100870244004683886",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100856866427256833/img/C3ods4J011QCJLCP.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "orus-strategy-review",
    "category": "markets",
    "title": "거래 전에, 제안된 전략을 한 번 더 평가한다.",
    "summary": "Orus는 매매 전략 제안을 실행 전에 검토하는 단계에 Jev를 활용합니다. 선택한 기준에 따라 계획을 평가하고 거래 흐름에 연결하는 실험입니다.",
    "metrics": [
      {
        "value": "전략 제안 → 검토",
        "label": "Orus"
      }
    ],
    "author": "Orus Agent",
    "handle": "Orus_agent",
    "source": "https://x.com/Orus_agent/status/2100859259915227358",
    "research": "https://jevable.com/project/2100859259915227358",
    "reviewed": "2026-09-21",
    "keywords": [
      "Orus trade-strategy review",
      "decision review",
      "agents"
    ],
    "note": "전략 검토 도구의 제작자 시연입니다. 실거래 수익성이나 손실 방지 성능을 검증한 투자 추천이 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100859259915227358",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100852121105006592/img/NlvQ4G9nQNYzq8zZ.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "jevcal-thresholds",
    "category": "work",
    "title": "어디까지 자동 처리하고, 언제 추가 검토할까.",
    "summary": "Jevcal은 정답이 붙은 자체 데이터로 판단 기준을 시험합니다. 원하는 정확도와 자동 처리 비율 사이에서 확신도 임계값을 고르고 LLM 이관 범위를 조절합니다.",
    "metrics": [
      {
        "value": "정확도 · 처리 비율",
        "label": "확신도 임계값 조정"
      }
    ],
    "author": "Abhishek kothari",
    "handle": "thenightshipper",
    "source": "https://x.com/thenightshipper/status/2100850610962919551",
    "research": "https://jevable.com/project/2100850610962919551",
    "reviewed": "2026-09-21",
    "keywords": [
      "Jevcal confidence-threshold calibration",
      "calibration",
      "open source"
    ],
    "note": "평가 데이터에 대한 보정 실험입니다. 선택한 임계값이 새 운영 데이터에서도 같은 정확도를 유지한다는 보장은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100850610962919551",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100850405668491264/img/f4I89LjtDpd8cdBF.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "action-label-quality",
    "category": "data",
    "title": "로봇 학습용 행동 라벨을, 대량으로 점검한다.",
    "summary": "사람의 행동을 기록한 학습 데이터에서 텍스트 라벨의 품질을 검토합니다. 물리 환경 AI를 위한 데이터 준비 단계에 Jev의 반복 평가를 적용한 사례입니다.",
    "metrics": [
      {
        "value": "58,643개",
        "label": "제작자가 점검한 행동 라벨"
      }
    ],
    "author": "Peter Wang",
    "handle": "the_cyw",
    "source": "https://x.com/the_cyw/status/2100807905859739779",
    "research": "https://jevable.com/project/2100807905859739779",
    "reviewed": "2026-09-21",
    "keywords": [
      "Quality checks for physical-AI action labels",
      "data quality",
      "robotics"
    ],
    "note": "행동 라벨 품질 점검 데모입니다. Jev가 원본 영상을 직접 인식하거나 로봇의 행동 성능을 검증한 결과는 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100807905859739779",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100807113576693760/img/8lI0CmDrKghq79Z5.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "mario-branch-retry",
    "category": "games",
    "title": "실패한 마리오를, 여러 갈래로 다시 시도한다.",
    "summary": "Jev가 움직임을 고르고, 캐릭터가 죽으면 microsandbox가 네 개의 가상 실행으로 분기합니다. 살아남은 경로를 이어 가는 게임 재시도 실험입니다.",
    "metrics": [
      {
        "value": "4개 실행으로 분기",
        "label": "Mario Never Dies"
      }
    ],
    "author": "appcypher",
    "handle": "theappcypher",
    "source": "https://x.com/theappcypher/status/2101095181382721998",
    "research": "https://jevable.com/project/2101095181382721998",
    "reviewed": "2026-09-21",
    "keywords": [
      "Mario Never Dies",
      "mario",
      "microsandbox",
      "branching-timelines"
    ],
    "note": "샌드박스 분기와 게임 복구를 결합한 데모입니다. 처음부터 실패 없이 플레이하거나 최적 전략을 찾았다는 뜻은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101095181382721998",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101094095808847872/img/3gUUWv-2l7gtBJLH.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "jev-board",
    "category": "interface",
    "title": "키보드에도, 상황을 읽는 작은 인터페이스.",
    "summary": "Jev board는 키보드를 소재로 한 생성형 UI 실험입니다. 사용 흐름 속에 작은 판단을 넣어 인터페이스가 맥락에 반응하는 모습을 탐색합니다.",
    "metrics": [
      {
        "value": "키보드 × 상황별 UI",
        "label": "Jev board"
      }
    ],
    "author": "Zahle Khan",
    "handle": "zahlekhan",
    "source": "https://x.com/zahlekhan/status/2100681083176226921",
    "research": "https://jevable.com/project/2100681083176226921",
    "reviewed": "2026-09-21",
    "keywords": [
      "Jev board",
      "keyboard",
      "generative-ui",
      "ambient-interfaces"
    ],
    "note": "제작자가 공개한 인터페이스 탐색 실험입니다. 지원 기능의 범위와 일반 환경에서의 동작은 별도로 검증하지 않았습니다.",
    "media": {
      "type": "x",
      "id": "2100681083176226921",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100679218455789568/img/zy8kM6C3lA-2EyJa.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "simulated-audience",
    "category": "interface",
    "title": "성격이 다른 가상 청중 100명에게 말해 본다.",
    "summary": "각기 다른 성향을 부여한 캐릭터가 발화 내용에 반응합니다. Jev가 캐릭터별 반응을 골라 발표를 듣는 가상 청중의 모습을 만드는 실험입니다.",
    "metrics": [
      {
        "value": "100개 가상 성격",
        "label": "시뮬레이션 청중"
      }
    ],
    "author": "amit",
    "handle": "legitamit",
    "source": "https://x.com/legitamit/status/2100713197502173373",
    "research": "https://jevable.com/project/2100713197502173373",
    "reviewed": "2026-09-21",
    "keywords": [
      "An audience of 100 personalities",
      "voice",
      "audience-simulation",
      "multi-agent"
    ],
    "note": "설정된 캐릭터들의 모의 반응입니다. 실제 청중의 감정, 주의력, 설득 효과를 측정하거나 예측한 결과가 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100713197502173373",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100711545218924544/img/R3UxL8HSq04FnC4R.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "whale-city",
    "category": "games",
    "title": "고래 위 도시에서, 다음 이야기를 행동으로 고른다.",
    "summary": "큰 모델이 설계한 세계에서 Jev가 다음 행동을 선택하고 별도의 영상 모델이 장면을 표현합니다. 세계 설정·행동 선택·영상 생성을 나눈 상호작용 실험입니다.",
    "metrics": [
      {
        "value": "세계 설정 → 행동 → 영상",
        "label": "고래 위 도시"
      }
    ],
    "author": "gokaygokay",
    "handle": "gokayfem",
    "source": "https://x.com/gokayfem/status/2101022590722810271",
    "research": "https://jevable.com/project/2101022590722810271",
    "reviewed": "2026-09-21",
    "keywords": [
      "A city on a whale",
      "simulation",
      "decision-making",
      "video"
    ],
    "note": "여러 모델을 결합한 제작자 데모입니다. Jev 자체가 세계관이나 영상을 생성하는 기능은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101022590722810271",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101020230071803904/img/FWi7MqiT0DI2iQJ9.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "prompt-difficulty",
    "category": "interface",
    "title": "쉬운 질문이라면, 빠른 모드를 먼저 제안한다.",
    "summary": "프롬프트를 입력하는 동안 요청의 난이도를 평가합니다. 간단해 보이는 작업에는 빠른 모드를 선택할 수 있게 안내하는 인터페이스 데모입니다.",
    "metrics": [
      {
        "value": "입력 중 난이도 평가",
        "label": "빠른 모드 제안"
      }
    ],
    "author": "Kevin Grajeda",
    "handle": "k_grajeda",
    "source": "https://x.com/k_grajeda/status/2101021361351131464",
    "research": "https://jevable.com/project/2101021361351131464",
    "reviewed": "2026-09-21",
    "keywords": [
      "A prompt difficulty classifier",
      "model-routing",
      "prompt-classification"
    ],
    "note": "난이도 추정에 따른 제안이며 사용자가 모드를 선택합니다. 빠른 모델이 같은 답변 품질을 낸다는 보장은 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101021361351131464",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101018655794331648/img/xm_XTf33FJqqEmIb.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "seo-internal-links",
    "category": "content",
    "title": "어느 페이지끼리 연결해야, 읽는 흐름이 좋아질까.",
    "summary": "사이트 페이지들을 대조해 내부 링크로 연결할 만한 관계를 고릅니다. 억지로 연결하지 않고 관련성이 있는 페이지를 찾는 SEO 검토 실험입니다.",
    "metrics": [
      {
        "value": "586개 페이지",
        "label": "공개된 내부 링크 검토 규모"
      }
    ],
    "author": "borja",
    "handle": "borjafat",
    "source": "https://x.com/borjafat/status/2101018783976722479",
    "research": "https://jevable.com/project/2101018783976722479",
    "reviewed": "2026-09-21",
    "keywords": [
      "An internal-link SEO audit",
      "seo",
      "classification"
    ],
    "note": "페이지 관련성에 따른 추천 데모입니다. 검색 순위 상승이나 트래픽 증가를 측정한 성과는 아닙니다.",
    "media": {
      "type": "x",
      "id": "2101018783976722479",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2101018477087592448/img/9YlAHKLLo_h6rgtK.jpg",
      "evidence": "published-video-thumbnail"
    }
  },
  {
    "id": "jevton-town",
    "category": "games",
    "title": "120명의 작은 마을, 각자 다음 행동을 고른다.",
    "summary": "Jevton의 주민들이 도로와 상점이 있는 가상 마을에서 움직입니다. 여러 NPC의 작은 선택을 조합해 하나의 마을 시뮬레이션을 만드는 실험입니다.",
    "metrics": [
      {
        "value": "120명 NPC",
        "label": "Jevton 가상 마을"
      }
    ],
    "author": "Chizi",
    "handle": "chiziaruhoma",
    "source": "https://x.com/chiziaruhoma/status/2100878555047514390",
    "research": "https://jevable.com/project/2100878555047514390",
    "reviewed": "2026-09-21",
    "keywords": [
      "Jevton: a town of 120 people",
      "simulation",
      "characters"
    ],
    "note": "설정된 게임 세계의 행동 선택 시연입니다. 실제 주민 행동이나 지역 경제를 예측하는 모델이 아닙니다.",
    "media": {
      "type": "x",
      "id": "2100878555047514390",
      "poster": "https://pbs.twimg.com/amplify_video_thumb/2100876059709149184/img/jYoCG-SwxUKhp2pf.jpg",
      "evidence": "published-video-thumbnail"
    }
  }
]);
// Video-only media from the public players on Jevable and Made with Jev.
// Keep the original post IDs and credits; never inject a full social-post widget.
const videoFiles = {
  "drape-try-on": "https://jevable.com/media/2101388186916454439/0",
  "proq-plan-classifier": "https://jevable.com/media/2101118529936519453/0",
  "jevform": "https://jevable.com/media/2101079101997982037/0",
  "mujoco-robot-arm": "https://jevable.com/media/2101018760371171420/0",
  "voice-figma": "https://jevable.com/media/2100845388655960112/0",
  "live-3d-expressions": "https://jevable.com/media/2101019513676345555/0",
  "semantic-sheet-formatting": "https://jevable.com/media/2100601420395282695/0",
  "pdf-ocr-router": "https://jevable.com/media/2100979972194369925/0",
  "bannerbear-field-mapping": "https://jevable.com/media/2100801037192024478/0",
  "higgsfield-model-routing": "https://jevable.com/media/2101022133753430365/0",
  "upweight-hacker-news": "https://jevable.com/media/2100536228827496721/0",
  "gmail-intent-search": "https://jevable.com/media/2100960281769738433/0",
  "ui-flow-capture": "https://jevable.com/media/2101047036863037753/0",
  "json-render-ui": "https://jevable.com/media/2101022101750571357/0",
  "moss-litter-pickup": "https://jevable.com/media/2101021471644733867/0",
  "session-replay-triage": "https://jevable.com/media/2101012033340571952/0",
  "postgres-query-planner": "https://jevable.com/media/2101001041903009987/0",
  "agent-environment-router": "https://jevable.com/media/2100994779291259187/0",
  "box-incident-triage": "https://jevable.com/media/2100993278955188320/0",
  "slack-skill-router": "https://jevable.com/media/2100987661926252737/0",
  "jev-reviewer-papers": "https://jevable.com/media/2100985031703269425/0",
  "plain-english-logic": "https://jevable.com/media/2100985027093749764/0",
  "supabase-rls-linter": "https://jevable.com/media/2100981707105284255/0",
  "library-index-search": "https://jevable.com/media/2100975114753892550/0",
  "tax-document-classifier": "https://jevable.com/media/2100973868324417852/0",
  "jevals-workbench": "https://jevable.com/media/2100968892591968320/0",
  "wakeword-free-assistant": "https://jevable.com/media/2100967959879471519/0",
  "driving-decision-simulator": "https://jevable.com/media/2100965547454374316/0",
  "brand-news-matching": "https://jevable.com/media/2100951347080421409/0",
  "asteroid-drone": "https://jevable.com/media/2100950317852455039/0",
  "focus-rail": "https://jevable.com/media/2101035079149449398/0",
  "abide-agent-rules": "https://jevable.com/media/2101034822760288452/0",
  "agentrun-workflows": "https://jevable.com/media/2101033282414768456/0",
  "android-e2e-testing": "https://jevable.com/media/2101032931456168098/0",
  "voice-beatmaking": "https://jevable.com/media/2101023899265692100/0",
  "contextual-autofill": "https://jevable.com/media/2100928133608472817/0",
  "cascade-search": "https://jevable.com/media/2100910232255992032/0",
  "clipboard-quick-actions": "https://jevable.com/media/2100907261593829675/0",
  "cal-team-scheduling": "https://jevable.com/media/2100902559313502602/0",
  "maxfusion-ad-shots": "https://jevable.com/media/2100870244004683886/0",
  "orus-strategy-review": "https://jevable.com/media/2100859259915227358/0",
  "jevcal-thresholds": "https://jevable.com/media/2100850610962919551/0",
  "action-label-quality": "https://jevable.com/media/2100807905859739779/0",
  "mario-branch-retry": "https://jevable.com/media/2101095181382721998/0",
  "jev-board": "https://jevable.com/media/2100681083176226921/0",
  "simulated-audience": "https://jevable.com/media/2100713197502173373/0",
  "whale-city": "https://jevable.com/media/2101022590722810271/0",
  "prompt-difficulty": "https://jevable.com/media/2101021361351131464/0",
  "seo-internal-links": "https://jevable.com/media/2101018783976722479/0",
  "jevton-town": "https://jevable.com/media/2100878555047514390/0",
  "voice-mac": "https://jevable.com/media/2100814590300889426/0",
  "job-match": "https://jevable.com/media/2100980770206879849/0",
  "superx": "https://jevable.com/media/2100722975645598191/0",
  "fraud-cascade": "https://jevable.com/media/2100614659690713543/0",
  "predictive-sheet": "https://jevable.com/media/2100780008193020049/0",
  "download-sort": "https://jevable.com/media/2100906882365788167/0",
  "email-500": "https://jevable.com/media/2100404532119269426/0",
  "stagehand": "https://jevable.com/media/2100622054945095934/0",
  "postgres": "https://jevable.com/media/2100679300756435135/0",
  "email-1500": "https://jevable.com/media/2100042788851101842/0",
  "instant-compaction": "https://jevable.com/media/2100694549362553153/0",
  "jev-review": "https://jevable.com/media/2100465662867218857/0",
  "computer-use-without-screenshots": "https://jevable.com/media/2100631847155994852/0",
  "jev-trader": "https://jevable.com/media/2100356151468585346/0",
  "realtime-game-levels": "https://jevable.com/media/2100953089003921543/0",
  "ocr-image-classifier": "https://jevable.com/media/2100953838891192789/0",
  "ad-teardown": "https://video.twimg.com/amplify_video/2100654321792684032/vid/avc1/640x360/KUagVXwb-SSHp1TY.mp4",
  "sponsor-skip": "https://video.twimg.com/amplify_video/2100792834526007296/vid/avc1/570x360/gskXXEggT9IaRAHT.mp4",
  "paper-atlas": "https://video.twimg.com/amplify_video/2100425141947604992/vid/avc1/486x360/D4f1Ou22ZW45hlI3.mp4",
  "lead-fit": "https://video.twimg.com/amplify_video/2100891566340501504/vid/avc1/640x360/49MTyZIvwe3t4oSM.mp4",
  "post-analysis": "https://video.twimg.com/amplify_video/2100668725737213952/vid/avc1/524x360/H60EZdX5rjJXxwoT.mp4",
  "gesture-canvas": "https://video.twimg.com/amplify_video/2100729243185324032/vid/avc1/474x360/nLpMqywXTPRVxKYg.mp4",
  "reference-finder": "https://video.twimg.com/amplify_video/2100720525739687936/vid/avc1/320x568/QnWf-pVb6KpSZpvo.mp4",
  "clippy": "https://video.twimg.com/amplify_video/2100700282434826240/vid/avc1/562x360/TMm5MksXFfTGCiQF.mp4",
  "mario": "https://video.twimg.com/amplify_video/2100085174826647552/vid/avc1/640x360/lrPaXa-jly9ZrKaE.mp4",
  "doom": "https://video.twimg.com/amplify_video/2099924592534183936/vid/avc1/586x360/BRwXZhNNv-q4Do5h.mp4",
  "tetris": "https://video.twimg.com/ext_tw_video/2100438029299040256/pu/vid/avc1/760x360/pMnxzXWpVRxOmCAq.mp4?tag=12",
  "slay-spire": "https://video.twimg.com/amplify_video/2100569632482746369/vid/avc1/320x568/FVP3i4_liPcaojvz.mp4",
  "x-post-firewall": "https://video.twimg.com/amplify_video/2100519256425140224/vid/avc1/500x360/_SoZRXrArj4LeF1B.mp4",
  "predictive-launcher": "https://video.twimg.com/amplify_video/2100756324845862913/vid/avc1/640x360/S7b4BiG1wv1cBXje.mp4",
  "invoice-finder": "https://video.twimg.com/amplify_video/2100710351536840705/vid/avc1/558x360/3SbPwaVAB__QxUy7.mp4",
  "subway-surfers": "https://video.twimg.com/amplify_video/2100633400717565952/vid/avc1/640x360/hRa7TkUdZ-9COBJd.mp4",
  "ai-slop-detector": "https://video.twimg.com/amplify_video/2101157511579508736/vid/avc1/680x360/g7Wbr5p1VgW6Z7Aj.mp4?tag=14",
  "doomscroll-filter": "https://video.twimg.com/amplify_video/2101071392385236992/vid/avc1/640x360/RiTZE48Nad0UQ_hY.mp4"
};
for (const c of cases) {
  if (videoFiles[c.id]) c.media = {...c.media, type:'mp4', url:videoFiles[c.id]};
}
window.JEV_ATLAS = Object.freeze({version:6,reviewed:'2026-09-21',categories:cats,cases});
})();
