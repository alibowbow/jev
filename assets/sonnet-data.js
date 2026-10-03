/* Sonnet 5.5: primary sources; author reports are not independent validation. */
window.SONNET_ATLAS = {
  "model": "Sonnet 5.5",
  "storageKey": "sonnet-showcase:saved:v1",
  "reviewed": "2026-10-03",
  "linkHosts": [
    "x.com",
    "github.com",
    "www.anthropic.com",
    "platform.claude.com",
    "assets.claude.ai",
    "saffron-flint-kkcm.here.now",
    "ivanainai.com",
    "www.10zin.ca"
  ],
  "posterHosts": [
    "pbs.twimg.com",
    "www-cdn.anthropic.com"
  ],
  "categories": [
    {
      "id": "art",
      "name": "애니메이션·아트"
    },
    {
      "id": "game",
      "name": "게임"
    },
    {
      "id": "simulation",
      "name": "3D·시뮬레이션"
    },
    {
      "id": "web",
      "name": "웹·UI"
    },
    {
      "id": "tools",
      "name": "업무·개발 도구"
    }
  ],
  "cases": [
    {
      "id": "sonnet-goldilocks",
      "category": "art",
      "title": "JavaScript로 그린 골디락스 단편",
      "summary": "동화 장면을 코드로 그린 약 4분 영상. 캐릭터 목소리·음악·효과음도 함께 공개했습니다.",
      "author": "Winter",
      "handle": "@WinterArc2125",
      "source": "https://x.com/WinterArc2125/status/2104659846838513699",
      "published": "2026-09-28T19:49:44.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 확인"
        }
      ],
      "keywords": [
        "goldilocks",
        "WinterArc2125",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: JavaScript 그림·영상 구성(제작자 주장). 음성·음악 도구: 미상.",
        "동화 「골디락스와 곰 세 마리」를 JavaScript로 그려 달라고 요청했습니다."
      ],
      "note": "실행 HTML·코드는 공개되지 않았습니다. 음성·음악까지 Sonnet이 단독 생성했는지는 확인할 수 없습니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104658461220904960/vid/avc1/1280x720/BYlL7Z8K4Swxlwpb.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104658461220904960/img/rTwG_TOWynxtZ40f.jpg",
        "videoId": "2104658461220904960",
        "hasAudio": true,
        "alt": "Winter의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "JavaScript로 그린 골디락스 단편",
        "input": "동화 「골디락스와 곰 세 마리」를 JavaScript로 그려 달라고 요청했습니다.",
        "workflow": "제작자는 모든 프레임을 코드로 그렸다고 설명합니다. 공개 게시물에는 구체적인 반복 수정 과정이나 음성 제작 도구가 없습니다.",
        "result": "제작자는 장면 전환과 음성·음악을 포함한 결과 영상을 공개했습니다.",
        "limitations": "실행 HTML·코드는 공개되지 않았습니다. 음성·음악까지 Sonnet이 단독 생성했는지는 확인할 수 없습니다.",
        "tools": "Sonnet 5.5: JavaScript 그림·영상 구성(제작자 주장). 음성·음악 도구: 미상.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/WinterArc2125/status/2104659846838513699"
          }
        ]
      }
    },
    {
      "id": "sonnet-clawdnam",
      "category": "art",
      "title": "CLAWDNAM STYLE 코드 애니메이션",
      "summary": "Opus가 조사·구성을 맡고 Sonnet이 장면 애니메이션을 만든 뮤직비디오. 여러 챕터를 병렬로 제작했습니다.",
      "author": "am.will",
      "handle": "@LLMJunky",
      "source": "https://x.com/LLMJunky/status/2104659862663618566",
      "published": "2026-09-28T19:49:48.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 확인"
        }
      ],
      "keywords": [
        "clawdnam",
        "LLMJunky",
        "Claude Sonnet 5.5",
        "소넷",
        "Opus 5.5: 조사·스토리. Sonnet 5.5: 애니메이션·렌더링. ClaudeAnimationBase: 제작 엔진.",
        "제작자가 공개한 프롬프트로 곡의 콘셉트·스토리와 14개 챕터를 구성했습니다."
      ],
      "note": "공유된 저장소는 공용 애니메이션 엔진입니다. 이 작품의 전체 프로젝트 코드나 작업 로그는 공개되지 않았습니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104659136344424449/vid/avc1/1280x720/uAyCkTRtaRll4HiS.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104659136344424449/img/mjzSFYCZUrRNcWb8.jpg",
        "videoId": "2104659136344424449",
        "hasAudio": true,
        "alt": "am.will의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "CLAWDNAM STYLE 코드 애니메이션",
        "input": "제작자가 공개한 프롬프트로 곡의 콘셉트·스토리와 14개 챕터를 구성했습니다.",
        "workflow": "Opus 5.5가 조사와 스토리·콘셉트를 만들고, Sonnet 5.5가 ClaudeAnimationBase 기반 애니메이션·렌더링을 맡았다고 설명합니다.",
        "result": "완성된 코드 애니메이션 영상과 역할 분담 설명이 공개되어 있습니다.",
        "limitations": "공유된 저장소는 공용 애니메이션 엔진입니다. 이 작품의 전체 프로젝트 코드나 작업 로그는 공개되지 않았습니다.",
        "tools": "Opus 5.5: 조사·스토리. Sonnet 5.5: 애니메이션·렌더링. ClaudeAnimationBase: 제작 엔진.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/LLMJunky/status/2104659862663618566"
          },
          {
            "label": "공개 프롬프트",
            "url": "https://x.com/LLMJunky/status/2104659866304516101"
          },
          {
            "label": "모델 역할 분담",
            "url": "https://x.com/LLMJunky/status/2104660772227875031"
          },
          {
            "label": "공용 제작 엔진 (작품 코드 아님)",
            "url": "https://github.com/JohnHeibel/ClaudeAnimationBase"
          }
        ]
      },
      "prompt": "https://x.com/LLMJunky/status/2104659866304516101"
    },
    {
      "id": "sonnet-lyric-video",
      "category": "art",
      "title": "자작곡에 맞춘 가사 모션 영상",
      "summary": "제작자의 자작곡에 가사와 움직이는 그래픽을 붙인 영상. 한 번의 요청으로 만든 결과라고 소개했습니다.",
      "author": "enji vi",
      "handle": "@original_ngv",
      "source": "https://x.com/original_ngv/status/2104660974288699505",
      "published": "2026-09-28T19:54:13.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 확인"
        }
      ],
      "keywords": [
        "lyric-video",
        "original_ngv",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: 가사 모션 영상(제작자 주장). 곡: 제작자 자작곡.",
        "자작곡을 바탕으로 가사 모션 영상을 요청했습니다. 실제 프롬프트와 제공 파일은 미공개입니다."
      ],
      "note": "음악은 제작자의 자작곡입니다. 작업 시간·한 번의 요청이라는 설명은 독립 검증하지 않았으며 편집 코드도 미공개입니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104660531974115328/vid/avc1/1280x720/ULm_CEUU9kB2xcLc.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104660531974115328/img/hcqJFr-59h02f5-H.jpg",
        "videoId": "2104660531974115328",
        "hasAudio": true,
        "alt": "enji vi의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "자작곡에 맞춘 가사 모션 영상",
        "input": "자작곡을 바탕으로 가사 모션 영상을 요청했습니다. 실제 프롬프트와 제공 파일은 미공개입니다.",
        "workflow": "제작자는 xHigh 설정에서 한 번의 요청으로 약 30분 만에 결과를 만들었다고 보고했습니다.",
        "result": "공개 영상에 음악과 가사·그래픽의 타이밍이 함께 담겨 있습니다.",
        "limitations": "음악은 제작자의 자작곡입니다. 작업 시간·한 번의 요청이라는 설명은 독립 검증하지 않았으며 편집 코드도 미공개입니다.",
        "tools": "Sonnet 5.5: 가사 모션 영상(제작자 주장). 곡: 제작자 자작곡.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/original_ngv/status/2104660974288699505"
          }
        ]
      }
    },
    {
      "id": "sonnet-strategy-game",
      "category": "game",
      "title": "직접 고쳐 가는 멀티플레이 전략 게임",
      "summary": "Age of Empires 스타일의 전략 게임. 제작자는 멀티플레이가 가능하고 규칙을 직접 수정할 수 있다고 소개했습니다.",
      "author": "FutureBrian",
      "handle": "@ForwardEditor",
      "source": "https://x.com/ForwardEditor/status/2104665557144322555",
      "published": "2026-09-28T20:12:26.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 확인"
        }
      ],
      "keywords": [
        "strategy-game",
        "ForwardEditor",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: 게임 제작(제작자 주장). 기타 엔진·서비스: 공개 글에 미상.",
        "기존 전략 게임에서 원하는 변화를 반영한 게임을 만들었습니다. 전체 입력 프롬프트는 미공개입니다."
      ],
      "note": "제작자 실행 링크는 초기 확인에서 403, 재확인에서 200을 반환했습니다. 멀티플레이·게임 규칙·지속 동작은 재현하지 못했습니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104663902415949824/vid/avc1/1280x720/EdzdZXJlD07aYRTH.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104663902415949824/img/Lt9CdLGuUQUqJB7K.jpg",
        "videoId": "2104663902415949824",
        "hasAudio": true,
        "alt": "FutureBrian의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "직접 고쳐 가는 멀티플레이 전략 게임",
        "input": "기존 전략 게임에서 원하는 변화를 반영한 게임을 만들었습니다. 전체 입력 프롬프트는 미공개입니다.",
        "workflow": "Sonnet 5.5 초기 접근권으로 게임을 제작하고 시연 영상과 브라우저 링크를 공개했습니다.",
        "result": "게임 화면 영상이 공개되어 있으며, 제작자는 실제 멀티플레이가 가능하다고 보고했습니다.",
        "limitations": "제작자 실행 링크는 초기 확인에서 403, 재확인에서 200을 반환했습니다. 멀티플레이·게임 규칙·지속 동작은 재현하지 못했습니다.",
        "tools": "Sonnet 5.5: 게임 제작(제작자 주장). 기타 엔진·서비스: 공개 글에 미상.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다. 제작자 실행 링크는 확인 환경에서 HTTP 403: 실행 미검증. 원본 실행 링크 HEAD 재확인: HTTP 200. 응답은 실행·정확성 검증이 아닙니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/ForwardEditor/status/2104665557144322555"
          }
        ]
      },
      "demo": "https://saffron-flint-kkcm.here.now/"
    },
    {
      "id": "sonnet-bmw-threejs",
      "category": "simulation",
      "title": "Three.js로 만든 BMW M5 장면",
      "summary": "BMW M5를 Three.js로 만들어 달라는 짧은 요청에서 시작한 3D 장면. 제작자는 수정 없이 나온 결과라고 설명했습니다.",
      "author": "K2S",
      "handle": "@k2sbhai",
      "source": "https://x.com/k2sbhai/status/2104662506891546798",
      "published": "2026-09-28T20:00:19.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 없음"
        }
      ],
      "keywords": [
        "bmw-threejs",
        "k2sbhai",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: 장면 코드 작성(제작자 주장). Three.js: 3D 렌더링.",
        "원문에 공개된 요청: build a 3d bmw m5 using three.js."
      ],
      "note": "코드·실행 데모가 미공개입니다. 실제 차의 치수·형상 정확성이나 제작 과정의 재현은 확인하지 않았습니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104661825866596352/vid/avc1/1172x720/aczI3xvfHou9N3QH.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104661825866596352/img/834YiBFgB2sVJLUr.jpg",
        "videoId": "2104661825866596352",
        "hasAudio": false,
        "alt": "K2S의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "Three.js로 만든 BMW M5 장면",
        "input": "원문에 공개된 요청: build a 3d bmw m5 using three.js.",
        "workflow": "Sonnet 5.5에 한 번 요청했고 후속 수정은 없었다고 제작자가 보고했습니다.",
        "result": "차량을 보여 주는 3D 장면 영상이 공개되어 있습니다.",
        "limitations": "코드·실행 데모가 미공개입니다. 실제 차의 치수·형상 정확성이나 제작 과정의 재현은 확인하지 않았습니다.",
        "tools": "Sonnet 5.5: 장면 코드 작성(제작자 주장). Three.js: 3D 렌더링.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/k2sbhai/status/2104662506891546798"
          }
        ]
      },
      "prompt": "https://x.com/k2sbhai/status/2104662506891546798"
    },
    {
      "id": "sonnet-deskworlds",
      "category": "simulation",
      "title": "플라스마 구체 인터랙티브 배경화면",
      "summary": "움직이는 플라스마 구체를 Three.js로 표현한 Deskworlds 배경화면. 원본 코드와 설치·미리보기 안내가 공개되어 있습니다.",
      "author": "Chase Lean",
      "handle": "@chaseleantj",
      "source": "https://x.com/chaseleantj/status/2104669620871536998",
      "published": "2026-09-28T20:28:35.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 없음"
        }
      ],
      "keywords": [
        "deskworlds",
        "chaseleantj",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: 제작 코드(제작자 주장). Three.js·WebGL2: 렌더링. macOS 앱: 배경화면 호스트.",
        "상호작용하는 플라스마 구체 배경화면을 만들었습니다. 전체 프롬프트는 공개되지 않았습니다."
      ],
      "note": "코드를 설치·실행하지 않았습니다. 배경화면 앱은 macOS 13 이상용이며 배터리 사용량·장기 안정성은 미검증입니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104669049468694528/vid/avc1/1108x720/F8B8I59AgwCc9HsB.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104669049468694528/img/27jj60Nxc0_zj9ax.jpg",
        "videoId": "2104669049468694528",
        "hasAudio": false,
        "alt": "Chase Lean의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "플라스마 구체 인터랙티브 배경화면",
        "input": "상호작용하는 플라스마 구체 배경화면을 만들었습니다. 전체 프롬프트는 공개되지 않았습니다.",
        "workflow": "제작자가 Sonnet 5.5 결과로 소개했습니다. 저장소 README에서 플라스마 구체와 Three.js·WebGL2 기반 구성을 대조했습니다.",
        "result": "시연 영상과 실제 Deskworlds 저장소가 존재합니다. README는 브라우저 미리보기 및 macOS 배경화면 앱을 설명합니다.",
        "limitations": "코드를 설치·실행하지 않았습니다. 배경화면 앱은 macOS 13 이상용이며 배터리 사용량·장기 안정성은 미검증입니다.",
        "tools": "Sonnet 5.5: 제작 코드(제작자 주장). Three.js·WebGL2: 렌더링. macOS 앱: 배경화면 호스트.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/chaseleantj/status/2104669620871536998"
          },
          {
            "label": "Deskworlds 코드·README",
            "url": "https://github.com/chaseleantj/deskworlds"
          }
        ]
      },
      "code": "https://github.com/chaseleantj/deskworlds"
    },
    {
      "id": "sonnet-tornado",
      "category": "simulation",
      "title": "방향을 조절하는 토네이도 시뮬레이션",
      "summary": "토네이도를 움직여 헛간을 부수는 브라우저 시연. 기상 예측용이 아닌 스타일화된 물리 표현입니다.",
      "author": "Ivana",
      "handle": "@ivanainai",
      "source": "https://x.com/ivanainai/status/2104677250603868415",
      "published": "2026-09-28T20:58:54.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 확인"
        }
      ],
      "keywords": [
        "tornado",
        "ivanainai",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: 브라우저 시뮬레이션 제작(제작자 주장). 렌더링 도구: 원문에서 미상.",
        "제작자가 후속 게시물에 조종 가능한 토네이도와 파괴 장면을 요청한 프롬프트를 공개했습니다."
      ],
      "note": "실행 링크는 초기 확인에서 403, 재확인에서 200을 반환했습니다. 실행을 독립 재현하지 않았습니다. 원문 프롬프트는 과학적으로 정확한 날씨 모델이 아닌 스타일화된 물리임을 명시합니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104673284981698560/vid/avc1/1280x720/Icr5LBtYWoT9iaE3.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104673284981698560/img/CJvmnsS4URUmDBsS.jpg",
        "videoId": "2104673284981698560",
        "hasAudio": true,
        "alt": "Ivana의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "방향을 조절하는 토네이도 시뮬레이션",
        "input": "제작자가 후속 게시물에 조종 가능한 토네이도와 파괴 장면을 요청한 프롬프트를 공개했습니다.",
        "workflow": "Sonnet 5.5로 제작한 결과 영상, 실행 링크, 프롬프트 게시물을 함께 공개했습니다.",
        "result": "공개 영상에 토네이도와 파괴 장면이 담겨 있습니다.",
        "limitations": "실행 링크는 초기 확인에서 403, 재확인에서 200을 반환했습니다. 실행을 독립 재현하지 않았습니다. 원문 프롬프트는 과학적으로 정확한 날씨 모델이 아닌 스타일화된 물리임을 명시합니다.",
        "tools": "Sonnet 5.5: 브라우저 시뮬레이션 제작(제작자 주장). 렌더링 도구: 원문에서 미상.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다. 제작자 실행 링크는 확인 환경에서 HTTP 403: 실행 미검증. 원본 실행 링크 HEAD 재확인: HTTP 200. 응답은 실행·정확성 검증이 아닙니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/ivanainai/status/2104677250603868415"
          },
          {
            "label": "스타일화된 물리·원문 프롬프트",
            "url": "https://x.com/ivanainai/status/2104677452966772958"
          }
        ]
      },
      "demo": "https://ivanainai.com/tornado",
      "prompt": "https://x.com/ivanainai/status/2104677452966772958"
    },
    {
      "id": "sonnet-personal-site",
      "category": "web",
      "title": "개인 웹사이트 리디자인",
      "summary": "개인 홈페이지의 시각 구성과 인터페이스를 새로 만든 사례. 시연 영상과 실제 사이트를 연결했습니다.",
      "author": "Tenzin Dhonyoe",
      "handle": "@_tenZdhon_",
      "source": "https://x.com/_tenZdhon_/status/2104680469451157900",
      "published": "2026-09-28T21:11:41.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 확인"
        }
      ],
      "keywords": [
        "personal-site",
        "_tenZdhon_",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: 웹사이트 리디자인(제작자 주장). 기타 도구: 미상.",
        "기존 개인 웹사이트를 새로 디자인했습니다. 상세 요구사항·프롬프트는 미공개입니다."
      ],
      "note": "사이트의 모든 상호작용·접근성·성능은 재검증하지 않았습니다. 이후 사이트가 변경될 수 있습니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104679747779203072/vid/avc1/1112x720/elXGOcx_dOZVoBKH.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104679747779203072/img/7csRuXE_SBNPL47K.jpg",
        "videoId": "2104679747779203072",
        "hasAudio": true,
        "alt": "Tenzin Dhonyoe의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "개인 웹사이트 리디자인",
        "input": "기존 개인 웹사이트를 새로 디자인했습니다. 상세 요구사항·프롬프트는 미공개입니다.",
        "workflow": "제작자가 Sonnet 5.5로 리디자인했다고 소개하고 결과 사이트 10zin.ca를 공개했습니다.",
        "result": "디자인 시연 영상과 사이트 HTML 응답을 확인했습니다.",
        "limitations": "사이트의 모든 상호작용·접근성·성능은 재검증하지 않았습니다. 이후 사이트가 변경될 수 있습니다.",
        "tools": "Sonnet 5.5: 웹사이트 리디자인(제작자 주장). 기타 도구: 미상.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다. 제작자 사이트 HTML은 HTTP 200. 전체 기능은 미검증. 원본 실행 링크 HEAD 재확인: HTTP 200. 응답은 실행·정확성 검증이 아닙니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/_tenZdhon_/status/2104680469451157900"
          }
        ]
      },
      "demo": "https://www.10zin.ca/"
    },
    {
      "id": "sonnet-pelican-svg",
      "category": "art",
      "title": "페달 움직임을 맞춘 펠리컨 SVG",
      "summary": "자전거를 타는 펠리컨을 SVG 애니메이션으로 표현했습니다. 바퀴·다리·체인 타이밍을 맞췄다는 제작자 설명이 있습니다.",
      "author": "gKev1n",
      "handle": "@GKev1n",
      "source": "https://x.com/GKev1n/status/2104680736372736409",
      "published": "2026-09-28T21:12:45.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 확인"
        }
      ],
      "keywords": [
        "pelican-svg",
        "GKev1n",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: SVG 작성(제작자 주장). SMIL: 애니메이션.",
        "자전거를 타는 펠리컨 SVG를 제작했습니다. 전체 프롬프트는 미공개입니다."
      ],
      "note": "SVG 파일 자체는 공개 링크가 없습니다. 제작자는 새의 모습과 깃털 표현이 평면적이라고 지적했습니다. 카드는 SVG가 아닌 원문 시연 MP4를 재생합니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104680681926438912/vid/avc1/1394x720/8KStEmurP6CClFsF.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104680681926438912/img/EQ7XWsAL0x_JD4z6.jpg",
        "videoId": "2104680681926438912",
        "hasAudio": true,
        "alt": "gKev1n의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "페달 움직임을 맞춘 펠리컨 SVG",
        "input": "자전거를 타는 펠리컨 SVG를 제작했습니다. 전체 프롬프트는 미공개입니다.",
        "workflow": "제작자는 JavaScript 없이 순수 SMIL로 약 68KB SVG를 만들었다고 보고했습니다.",
        "result": "공개 영상에 자전거 애니메이션이 담겨 있습니다. 제작자는 바퀴의 미끄러짐 없는 회전과 페달·체인의 연동을 설명했습니다.",
        "limitations": "SVG 파일 자체는 공개 링크가 없습니다. 제작자는 새의 모습과 깃털 표현이 평면적이라고 지적했습니다. 카드는 SVG가 아닌 원문 시연 MP4를 재생합니다.",
        "tools": "Sonnet 5.5: SVG 작성(제작자 주장). SMIL: 애니메이션.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/GKev1n/status/2104680736372736409"
          }
        ]
      }
    },
    {
      "id": "sonnet-cpp-skate",
      "category": "game",
      "title": "의존성 없는 C++ 스케이트 시연",
      "summary": "별도 의존성 없이 만든 C++ 스케이트 데모라고 소개한 사례. 공개된 자료는 결과 스크린샷입니다.",
      "author": "Bijan Bowen",
      "handle": "@bijanbowen",
      "source": "https://x.com/bijanbowen/status/2104684289241616458",
      "published": "2026-09-28T21:26:52.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "스크린샷",
          "label": "실행 자료 미공개"
        }
      ],
      "keywords": [
        "cpp-skate",
        "bijanbowen",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: C++ 데모 제작(제작자 주장). 라이브러리 의존성 없음이라는 설명은 미검증.",
        "C++로 독립 실행형 스케이트 데모를 만들었습니다. 실제 프롬프트는 미공개입니다."
      ],
      "note": "영상·코드·실행 파일이 공개 링크로 제공되지 않습니다. 컴파일 성공이나 실제 플레이는 검증하지 못했습니다.",
      "media": {
        "type": "image",
        "poster": "https://pbs.twimg.com/media/HTVXI21XQAAJaWg.jpg",
        "alt": "Bijan Bowen의 원문 스크린샷"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "의존성 없는 C++ 스케이트 시연",
        "input": "C++로 독립 실행형 스케이트 데모를 만들었습니다. 실제 프롬프트는 미공개입니다.",
        "workflow": "제작자는 Sonnet 5.5 결과를 의존성 없는 자체 완결형 데모로 설명했습니다.",
        "result": "게임 장면 스크린샷과 제작자의 모델 사용 설명이 공개되어 있습니다.",
        "limitations": "영상·코드·실행 파일이 공개 링크로 제공되지 않습니다. 컴파일 성공이나 실제 플레이는 검증하지 못했습니다.",
        "tools": "Sonnet 5.5: C++ 데모 제작(제작자 주장). 라이브러리 의존성 없음이라는 설명은 미검증.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 이미지 원본을 대조했습니다. 실행 가능한 데모는 미공개입니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/bijanbowen/status/2104684289241616458"
          }
        ]
      }
    },
    {
      "id": "sonnet-defect-test",
      "category": "tools",
      "title": "9개 결함으로 비교한 수정 작업",
      "summary": "같은 코드의 결함 9개를 서로 다른 effort 설정으로 수정한 제작자 테스트. 성공 보고와 검증 한계를 함께 기록했습니다.",
      "author": "Sinda",
      "handle": "@SKatalystAI",
      "source": "https://x.com/SKatalystAI/status/2104688696658162111",
      "published": "2026-09-28T21:44:23.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "스크린샷",
          "label": "실행 자료 미공개"
        }
      ],
      "keywords": [
        "defect-test",
        "SKatalystAI",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: 코드 수정. 제작자 자체 테스트: 설정별 정적 점검과 테스트 실행 보고.",
        "결함 9개가 있는 코드에 수정 작업을 요청해 medium·High·xHigh 설정을 비교했습니다. 저장소는 미공개입니다."
      ],
      "note": "코드·테스트 결과 파일이 미공개이며 독립 실행하지 않았습니다. 정적 흔적이 달라졌다는 사실만으로 런타임 정확성을 입증할 수 없습니다.",
      "media": {
        "type": "image",
        "poster": "https://pbs.twimg.com/media/HTVZrnSXUAEZ0_9.jpg",
        "alt": "Sinda의 원문 스크린샷"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "9개 결함으로 비교한 수정 작업",
        "input": "결함 9개가 있는 코드에 수정 작업을 요청해 medium·High·xHigh 설정을 비교했습니다. 저장소는 미공개입니다.",
        "workflow": "제작자가 정적 결함 흔적과 테스트 수를 확인했습니다. medium은 3개, High·xHigh는 9개 결함 흔적이 바뀌었다고 보고했습니다.",
        "result": "정적 점검 결과와 xHigh에서 테스트 144개가 통과했다는 보고가 있습니다.",
        "limitations": "코드·테스트 결과 파일이 미공개이며 독립 실행하지 않았습니다. 정적 흔적이 달라졌다는 사실만으로 런타임 정확성을 입증할 수 없습니다.",
        "tools": "Sonnet 5.5: 코드 수정. 제작자 자체 테스트: 설정별 정적 점검과 테스트 실행 보고.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 이미지 원본을 대조했습니다. 실행 가능한 데모는 미공개입니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/SKatalystAI/status/2104688696658162111"
          }
        ]
      }
    },
    {
      "id": "sonnet-puzzle-game",
      "category": "game",
      "title": "4개 층으로 구성한 퍼즐 어드벤처",
      "summary": "Resident Evil에서 영감을 얻은 4층 퍼즐 게임. Sonnet으로 구현하고 ElevenLabs로 캐릭터 음성을 더했습니다.",
      "author": "Alex",
      "handle": "@The_Alex",
      "source": "https://x.com/The_Alex/status/2104693073418826205",
      "published": "2026-09-28T22:01:46.000Z",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "원본 시연",
          "label": "오디오 트랙 확인"
        }
      ],
      "keywords": [
        "puzzle-game",
        "The_Alex",
        "Claude Sonnet 5.5",
        "소넷",
        "Sonnet 5.5: 게임 구현. ElevenLabs: 음성. 친구·가족: 제작자 보고 플레이 테스트.",
        "여러 층의 공간·퍼즐·캐릭터 음성이 있는 게임을 제작했습니다. 전체 프롬프트는 미공개입니다."
      ],
      "note": "배포 안내는 다운로드형 파일입니다. 브라우저 실행 데모로 표시하지 않으며 설치·실행하지 않았습니다. 추적하는 적은 구현에서 빠졌다고 제작자가 설명했습니다.",
      "media": {
        "type": "mp4",
        "url": "https://video.twimg.com/amplify_video/2104635298999369728/vid/avc1/1280x720/2AY63uCwxTiVNfyc.mp4",
        "poster": "https://pbs.twimg.com/amplify_video_thumb/2104635298999369728/img/QmMCXnKk--mSwBMR.jpg",
        "videoId": "2104635298999369728",
        "hasAudio": true,
        "alt": "Alex의 원문 시연 영상"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 원문·모델 표기 확인 / 결과 독립 재현 아님",
        "purpose": "4개 층으로 구성한 퍼즐 어드벤처",
        "input": "여러 층의 공간·퍼즐·캐릭터 음성이 있는 게임을 제작했습니다. 전체 프롬프트는 미공개입니다.",
        "workflow": "제작자가 Sonnet 5.5로 구현하고 ElevenLabs 음성을 결합했습니다. 친구·가족에게 플레이 테스트를 했다고 보고했습니다.",
        "result": "긴 게임 시연 영상과 제작자의 배포 안내가 공개되어 있습니다. 약 한 시간에 클리어했다는 사용자 테스트 보고가 있습니다.",
        "limitations": "배포 안내는 다운로드형 파일입니다. 브라우저 실행 데모로 표시하지 않으며 설치·실행하지 않았습니다. 추적하는 적은 구현에서 빠졌다고 제작자가 설명했습니다.",
        "tools": "Sonnet 5.5: 게임 구현. ElevenLabs: 음성. 친구·가족: 제작자 보고 플레이 테스트.",
        "modelEvidence": "제작자 원문에서 Sonnet 5.5 사용을 명시합니다. 모델 실행 로그 전체를 확인한 것은 아닙니다.",
        "access": "X 공개 메타데이터에서 원본 MP4·썸네일을 대조하고 미디어 스트림을 검사했습니다.",
        "sources": [
          {
            "label": "제작자 원문",
            "url": "https://x.com/The_Alex/status/2104693073418826205"
          },
          {
            "label": "제작자 배포 안내 (다운로드형)",
            "url": "https://x.com/The_Alex/status/2104705004506595472"
          }
        ]
      }
    },
    {
      "id": "sonnet-official-murmuration",
      "category": "simulation",
      "title": "400마리 새떼를 표현한 HTML",
      "summary": "400마리 찌르레기의 군집 움직임을 HTML 파일 하나로 만든 공식 데모.",
      "author": "Anthropic",
      "handle": "공식 데모",
      "source": "https://www.anthropic.com/claude-sonnet-5-5",
      "demo": "https://assets.claude.ai/brand/artifacts/models//beluga/murmuration-latest.html",
      "prompt": "https://www.anthropic.com/claude-sonnet-5-5#cost",
      "published": "2026-09-28",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "HTML 데모",
          "label": "Anthropic 공식 공개"
        }
      ],
      "keywords": [
        "murmuration",
        "birds flock starlings dunes wind clock HTML",
        "Claude Sonnet 5.5",
        "소넷",
        "400마리 찌르레기의 군무를 HTML 하나로 표현하도록 요청했습니다."
      ],
      "note": "공식 발표에 연결된 원본을 새 탭에서 엽니다. 결과의 정확성·성능은 독립 재현하지 않았습니다.",
      "media": {
        "type": "demo",
        "poster": "https://www-cdn.anthropic.com/images/4zrzovbb/website/cf0eae4b26b6fbe29e370d300ecac766cb94bc2d-1600x1000.png?rect=0%2C0%2C1600%2C1000",
        "alt": "Anthropic 공식 데모 이미지"
      },
      "evidence": {
        "origin": "official-demo",
        "status": "공식 발표·실제 데모 링크 확인 / 독립 재현 아님",
        "purpose": "400마리 새떼를 표현한 HTML",
        "input": "400마리 찌르레기의 군무를 HTML 하나로 표현하도록 요청했습니다.",
        "workflow": "Anthropic이 공개한 프롬프트와 데모 링크를 대조했습니다. 이 사이트에서는 원본 HTML을 실행하거나 복제하지 않습니다.",
        "result": "400마리 찌르레기의 군집 움직임을 HTML 파일 하나로 만든 공식 데모.",
        "limitations": "공식 제공 시연입니다. 모든 상호작용이나 수치·물리 정확성을 검증한 결과가 아닙니다.",
        "tools": "Sonnet 5.5: HTML 제작(공식 설명). 브라우저: 원본 실행.",
        "modelEvidence": "Anthropic의 Sonnet 5.5 발표 페이지에 프롬프트·데모가 함께 수록되어 있습니다.",
        "access": "공식 발표에서 원본 실행 링크와 이미지를 직접 확인했습니다. 원본 실행 링크 HEAD 재확인: HTTP 200. 응답은 실행·정확성 검증이 아닙니다.",
        "sources": [
          {
            "label": "공식 발표·데모 프롬프트",
            "url": "https://www.anthropic.com/claude-sonnet-5-5#cost"
          },
          {
            "label": "공식 모델 문서",
            "url": "https://platform.claude.com/docs/en/models/sonnet-5-5/whats-new-sonnet-5-5"
          }
        ]
      }
    },
    {
      "id": "sonnet-official-dunes",
      "category": "simulation",
      "title": "바람이 만드는 모래언덕 HTML",
      "summary": "바람에 따라 형태가 바뀌는 모래언덕을 표현한 공식 HTML 데모.",
      "author": "Anthropic",
      "handle": "공식 데모",
      "source": "https://www.anthropic.com/claude-sonnet-5-5",
      "demo": "https://assets.claude.ai/brand/artifacts/models/beluga/dunes-latest.html",
      "prompt": "https://www.anthropic.com/claude-sonnet-5-5#cost",
      "published": "2026-09-28",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "HTML 데모",
          "label": "Anthropic 공식 공개"
        }
      ],
      "keywords": [
        "dunes",
        "birds flock starlings dunes wind clock HTML",
        "Claude Sonnet 5.5",
        "소넷",
        "바람이 모래언덕의 형상을 바꾸는 모습을 HTML 하나로 만들도록 요청했습니다."
      ],
      "note": "공식 발표에 연결된 원본을 새 탭에서 엽니다. 결과의 정확성·성능은 독립 재현하지 않았습니다.",
      "media": {
        "type": "demo",
        "poster": "https://www-cdn.anthropic.com/images/4zrzovbb/website/d71a0217af7efe761f190d4bceea9a38e9a7dbad-1600x1000.png?rect=0%2C0%2C1600%2C1000",
        "alt": "Anthropic 공식 데모 이미지"
      },
      "evidence": {
        "origin": "official-demo",
        "status": "공식 발표·실제 데모 링크 확인 / 독립 재현 아님",
        "purpose": "바람이 만드는 모래언덕 HTML",
        "input": "바람이 모래언덕의 형상을 바꾸는 모습을 HTML 하나로 만들도록 요청했습니다.",
        "workflow": "Anthropic이 공개한 프롬프트와 데모 링크를 대조했습니다. 이 사이트에서는 원본 HTML을 실행하거나 복제하지 않습니다.",
        "result": "바람에 따라 형태가 바뀌는 모래언덕을 표현한 공식 HTML 데모.",
        "limitations": "공식 제공 시연입니다. 모든 상호작용이나 수치·물리 정확성을 검증한 결과가 아닙니다.",
        "tools": "Sonnet 5.5: HTML 제작(공식 설명). 브라우저: 원본 실행.",
        "modelEvidence": "Anthropic의 Sonnet 5.5 발표 페이지에 프롬프트·데모가 함께 수록되어 있습니다.",
        "access": "공식 발표에서 원본 실행 링크와 이미지를 직접 확인했습니다. 원본 실행 링크 HEAD 재확인: HTTP 200. 응답은 실행·정확성 검증이 아닙니다.",
        "sources": [
          {
            "label": "공식 발표·데모 프롬프트",
            "url": "https://www.anthropic.com/claude-sonnet-5-5#cost"
          },
          {
            "label": "공식 모델 문서",
            "url": "https://platform.claude.com/docs/en/models/sonnet-5-5/whats-new-sonnet-5-5"
          }
        ]
      }
    },
    {
      "id": "sonnet-official-clock",
      "category": "art",
      "title": "24개 시계로 시간을 그리는 HTML",
      "summary": "작은 시계 24개의 바늘을 움직여 시간을 표시하는 공식 HTML 데모.",
      "author": "Anthropic",
      "handle": "공식 데모",
      "source": "https://www.anthropic.com/claude-sonnet-5-5",
      "demo": "https://assets.claude.ai/brand/artifacts/models/beluga/clock-latest.html",
      "prompt": "https://www.anthropic.com/claude-sonnet-5-5#cost",
      "published": "2026-09-28",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "HTML 데모",
          "label": "Anthropic 공식 공개"
        }
      ],
      "keywords": [
        "clock",
        "birds flock starlings dunes wind clock HTML",
        "Claude Sonnet 5.5",
        "소넷",
        "24개 시계가 함께 시간을 표시하도록 HTML 하나로 구현할 것을 요청했습니다."
      ],
      "note": "공식 발표에 연결된 원본을 새 탭에서 엽니다. 결과의 정확성·성능은 독립 재현하지 않았습니다.",
      "media": {
        "type": "demo",
        "poster": "https://www-cdn.anthropic.com/images/4zrzovbb/website/b521482c2a09be87ac40f01e8949c216c426eeaa-1600x1000.png?rect=0%2C0%2C1600%2C1000",
        "alt": "Anthropic 공식 데모 이미지"
      },
      "evidence": {
        "origin": "official-demo",
        "status": "공식 발표·실제 데모 링크 확인 / 독립 재현 아님",
        "purpose": "24개 시계로 시간을 그리는 HTML",
        "input": "24개 시계가 함께 시간을 표시하도록 HTML 하나로 구현할 것을 요청했습니다.",
        "workflow": "Anthropic이 공개한 프롬프트와 데모 링크를 대조했습니다. 이 사이트에서는 원본 HTML을 실행하거나 복제하지 않습니다.",
        "result": "작은 시계 24개의 바늘을 움직여 시간을 표시하는 공식 HTML 데모.",
        "limitations": "공식 제공 시연입니다. 모든 상호작용이나 수치·물리 정확성을 검증한 결과가 아닙니다.",
        "tools": "Sonnet 5.5: HTML 제작(공식 설명). 브라우저: 원본 실행.",
        "modelEvidence": "Anthropic의 Sonnet 5.5 발표 페이지에 프롬프트·데모가 함께 수록되어 있습니다.",
        "access": "공식 발표에서 원본 실행 링크와 이미지를 직접 확인했습니다. 원본 실행 링크 HEAD 재확인: HTTP 200. 응답은 실행·정확성 검증이 아닙니다.",
        "sources": [
          {
            "label": "공식 발표·데모 프롬프트",
            "url": "https://www.anthropic.com/claude-sonnet-5-5#cost"
          },
          {
            "label": "공식 모델 문서",
            "url": "https://platform.claude.com/docs/en/models/sonnet-5-5/whats-new-sonnet-5-5"
          }
        ]
      }
    },
    {
      "id": "sonnet-partner-epic",
      "category": "tools",
      "title": "게임플레이 시스템 설계·데이터 흐름 검토",
      "summary": "게임 코드베이스의 설계 감사와 데이터 흐름 검토에 사용한 초기 테스트. Epic Games가 보고한 결과입니다.",
      "author": "Epic Games",
      "handle": "파트너 자체평가",
      "source": "https://www.anthropic.com/claude-sonnet-5-5#performance",
      "published": "2026-09-28",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "초기 테스트",
          "label": "파트너 자체평가"
        }
      ],
      "keywords": [
        "epic",
        "Epic Games",
        "Claude Sonnet 5.5",
        "소넷",
        "게임플레이 시스템 설계·데이터 흐름 검토",
        "게임 코드베이스의 설계 감사와 데이터 흐름 검토에 사용한 초기 테스트. Epic Games가 보고한 결과입니다."
      ],
      "note": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
      "media": {
        "type": "report",
        "poster": "assets/sonnet-thumbs/epic.svg",
        "alt": "Epic Games 자체평가 안내 표지 (결과 화면 아님)"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "공식 발표에 인용된 파트너 자체평가 / 독립 검증 아님",
        "purpose": "게임플레이 시스템 설계·데이터 흐름 검토",
        "input": "수만 줄 규모 게임플레이 시스템 아키텍처의 설계 감사와 데이터 흐름 검토.",
        "workflow": "여러 시간에 걸친 작업을 맡기고 응답 및 작업 품질을 확인했다고 설명합니다.",
        "result": "요구한 품질 기준을 충족했고 세세한 지시를 줄여도 작업이 이어졌다는 회사의 자체 보고입니다.",
        "limitations": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
        "tools": "Sonnet 5.5: Epic Games의 초기 테스트 대상. 작업 환경: 해당 파트너 도구·내부 평가.",
        "modelEvidence": "Anthropic 발표에 Epic Games의 Sonnet 5.5 초기 테스트 설명이 실려 있습니다.",
        "access": "공식 발표의 회사 이름·인용 설명을 대조했습니다. 공개 실행 데모·프로젝트 코드 링크는 없습니다.",
        "sources": [
          {
            "label": "Epic Games 초기 평가를 인용한 공식 발표",
            "url": "https://www.anthropic.com/claude-sonnet-5-5#performance"
          }
        ]
      }
    },
    {
      "id": "sonnet-partner-unity",
      "category": "tools",
      "title": "Unity Editor의 여러 단계 개발 작업",
      "summary": "Unity Editor와 코드 변경을 묶은 개발 작업. 프로젝트를 다시 열고 실행 결과까지 확인했다는 파트너 평가입니다.",
      "author": "Unity",
      "handle": "파트너 자체평가",
      "source": "https://www.anthropic.com/claude-sonnet-5-5#performance",
      "published": "2026-09-28",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "초기 테스트",
          "label": "파트너 자체평가"
        }
      ],
      "keywords": [
        "unity",
        "Unity",
        "Claude Sonnet 5.5",
        "소넷",
        "Unity Editor의 여러 단계 개발 작업",
        "Unity Editor와 코드 변경을 묶은 개발 작업. 프로젝트를 다시 열고 실행 결과까지 확인했다는 파트너 평가입니다."
      ],
      "note": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
      "media": {
        "type": "report",
        "poster": "assets/sonnet-thumbs/unity.svg",
        "alt": "Unity 자체평가 안내 표지 (결과 화면 아님)"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "공식 발표에 인용된 파트너 자체평가 / 독립 검증 아님",
        "purpose": "Unity Editor의 여러 단계 개발 작업",
        "input": "Unity Editor 조작과 코딩이 이어지는 여러 단계 작업.",
        "workflow": "변경 후 프로젝트를 다시 열고 런타임 결과를 확인해 완료 여부를 판단했다고 설명합니다.",
        "result": "대부분의 작업이 회사의 런타임 점검을 통과했다는 초기 평가입니다.",
        "limitations": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
        "tools": "Sonnet 5.5: Unity의 초기 테스트 대상. 작업 환경: 해당 파트너 도구·내부 평가.",
        "modelEvidence": "Anthropic 발표에 Unity의 Sonnet 5.5 초기 테스트 설명이 실려 있습니다.",
        "access": "공식 발표의 회사 이름·인용 설명을 대조했습니다. 공개 실행 데모·프로젝트 코드 링크는 없습니다.",
        "sources": [
          {
            "label": "Unity 초기 평가를 인용한 공식 발표",
            "url": "https://www.anthropic.com/claude-sonnet-5-5#performance"
          }
        ]
      }
    },
    {
      "id": "sonnet-partner-base44",
      "category": "web",
      "title": "반복 수정하며 웹앱 만들기",
      "summary": "실제 앱 빌드 과정의 반복 수정과 도구 호출을 평가한 Base44 초기 테스트. 개별 앱은 공개되지 않았습니다.",
      "author": "Base44",
      "handle": "파트너 자체평가",
      "source": "https://www.anthropic.com/claude-sonnet-5-5#performance",
      "published": "2026-09-28",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "초기 테스트",
          "label": "파트너 자체평가"
        }
      ],
      "keywords": [
        "base44",
        "Base44",
        "Claude Sonnet 5.5",
        "소넷",
        "반복 수정하며 웹앱 만들기",
        "실제 앱 빌드 과정의 반복 수정과 도구 호출을 평가한 Base44 초기 테스트. 개별 앱은 공개되지 않았습니다."
      ],
      "note": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
      "media": {
        "type": "report",
        "poster": "assets/sonnet-thumbs/base44.svg",
        "alt": "Base44 자체평가 안내 표지 (결과 화면 아님)"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "공식 발표에 인용된 파트너 자체평가 / 독립 검증 아님",
        "purpose": "반복 수정하며 웹앱 만들기",
        "input": "실제 앱 제작 요구사항을 반복 빌드 작업으로 평가. 구체 프롬프트는 미공개입니다.",
        "workflow": "앱 빌드의 반복 횟수·도구 실패·사용자 응답 대기 상황을 자체 비교했습니다.",
        "result": "비교 모델과 비슷한 앱 품질을 더 적은 반복으로 얻고 도구 호출 실패가 적었다는 회사 보고입니다.",
        "limitations": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
        "tools": "Sonnet 5.5: Base44의 초기 테스트 대상. 작업 환경: 해당 파트너 도구·내부 평가.",
        "modelEvidence": "Anthropic 발표에 Base44의 Sonnet 5.5 초기 테스트 설명이 실려 있습니다.",
        "access": "공식 발표의 회사 이름·인용 설명을 대조했습니다. 공개 실행 데모·프로젝트 코드 링크는 없습니다.",
        "sources": [
          {
            "label": "Base44 초기 평가를 인용한 공식 발표",
            "url": "https://www.anthropic.com/claude-sonnet-5-5#performance"
          }
        ]
      }
    },
    {
      "id": "sonnet-partner-slack",
      "category": "tools",
      "title": "Slackbot 업무 요청 평가",
      "summary": "기존 Slackbot 프롬프트로 업무 요청을 처리한 오프라인 평가. 실제 운영 배포 검증과는 구분합니다.",
      "author": "Slack",
      "handle": "파트너 자체평가",
      "source": "https://www.anthropic.com/claude-sonnet-5-5#performance",
      "published": "2026-09-28",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "초기 테스트",
          "label": "파트너 자체평가"
        }
      ],
      "keywords": [
        "slack",
        "Slack",
        "Claude Sonnet 5.5",
        "소넷",
        "Slackbot 업무 요청 평가",
        "기존 Slackbot 프롬프트로 업무 요청을 처리한 오프라인 평가. 실제 운영 배포 검증과는 구분합니다."
      ],
      "note": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
      "media": {
        "type": "report",
        "poster": "assets/sonnet-thumbs/slack.svg",
        "alt": "Slack 자체평가 안내 표지 (결과 화면 아님)"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "공식 발표에 인용된 파트너 자체평가 / 독립 검증 아님",
        "purpose": "Slackbot 업무 요청 평가",
        "input": "기존 Slackbot 업무 요청 평가와 동일한 프롬프트. 구체 요청 목록은 미공개입니다.",
        "workflow": "프롬프트를 바꾸지 않고 회사의 오프라인 평가를 수행했습니다.",
        "result": "이전 모델 대비 대부분의 평가에서 더 적은 단계로 좋은 결과를 얻었다는 자체 보고입니다.",
        "limitations": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
        "tools": "Sonnet 5.5: Slack의 초기 테스트 대상. 작업 환경: 해당 파트너 도구·내부 평가.",
        "modelEvidence": "Anthropic 발표에 Slack의 Sonnet 5.5 초기 테스트 설명이 실려 있습니다.",
        "access": "공식 발표의 회사 이름·인용 설명을 대조했습니다. 공개 실행 데모·프로젝트 코드 링크는 없습니다.",
        "sources": [
          {
            "label": "Slack 초기 평가를 인용한 공식 발표",
            "url": "https://www.anthropic.com/claude-sonnet-5-5#performance"
          }
        ]
      }
    },
    {
      "id": "sonnet-partner-zendesk",
      "category": "tools",
      "title": "고객지원 답변·이관 판단 테스트",
      "summary": "답변과 상담 이관 요청을 포함한 고객지원 사례에 적용한 Zendesk 초기 평가입니다.",
      "author": "Zendesk",
      "handle": "파트너 자체평가",
      "source": "https://www.anthropic.com/claude-sonnet-5-5#performance",
      "published": "2026-09-28",
      "reviewed": "2026-10-03",
      "metrics": [
        {
          "value": "초기 테스트",
          "label": "파트너 자체평가"
        }
      ],
      "keywords": [
        "zendesk",
        "Zendesk",
        "Claude Sonnet 5.5",
        "소넷",
        "고객지원 답변·이관 판단 테스트",
        "답변과 상담 이관 요청을 포함한 고객지원 사례에 적용한 Zendesk 초기 평가입니다."
      ],
      "note": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
      "media": {
        "type": "report",
        "poster": "assets/sonnet-thumbs/zendesk.svg",
        "alt": "Zendesk 자체평가 안내 표지 (결과 화면 아님)"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "공식 발표에 인용된 파트너 자체평가 / 독립 검증 아님",
        "purpose": "고객지원 답변·이관 판단 테스트",
        "input": "실제 지원 사례 수백 건의 답변과 상담 이관 요청. 개별 티켓은 미공개입니다.",
        "workflow": "회사가 사용하는 모델과 답변·의사결정·처리 시간을 자체 비교했습니다.",
        "result": "잘못된 판단이 줄고 티켓 처리가 빨라졌다는 초기 평가입니다.",
        "limitations": "Anthropic 공식 발표에 인용된 파트너 자체평가입니다. 개별 프로젝트·코드·평가 데이터는 공개되지 않았고 독립 재현하지 않았습니다. 커뮤니티 완성 작품이나 실행 데모로 세지 않습니다.",
        "tools": "Sonnet 5.5: Zendesk의 초기 테스트 대상. 작업 환경: 해당 파트너 도구·내부 평가.",
        "modelEvidence": "Anthropic 발표에 Zendesk의 Sonnet 5.5 초기 테스트 설명이 실려 있습니다.",
        "access": "공식 발표의 회사 이름·인용 설명을 대조했습니다. 공개 실행 데모·프로젝트 코드 링크는 없습니다.",
        "sources": [
          {
            "label": "Zendesk 초기 평가를 인용한 공식 발표",
            "url": "https://www.anthropic.com/claude-sonnet-5-5#performance"
          }
        ]
      }
    }
  ]
};
