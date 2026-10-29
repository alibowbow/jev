/* OpenAI Decisions cases: source reports and examples, not independent benchmarks. */
window.DECISIONS_ATLAS = {
  "model": "OpenAI Decisions API",
  "storageKey": "decisions-showcase:saved:v1",
  "reviewed": "2026-10-29",
  "linkHosts": [
    "openai.com",
    "developers.openai.com",
    "openai.github.io",
    "github.com",
    "www.aiformortals.co",
    "www.youtube.com",
    "vercel.com",
    "tempo-chess-api.openai.chatgpt.site",
    "signal-traffic-api.openai.chatgpt.site",
    "ticker-trading-api.openai.chatgpt.site",
    "openai-dev-day-polaris.vercel.app"
  ],
  "posterHosts": [],
  "categories": [
    {
      "id": "voice",
      "name": "음성·브라우저"
    },
    {
      "id": "agents",
      "name": "에이전트·자동화"
    },
    {
      "id": "work",
      "name": "업무·고객지원"
    },
    {
      "id": "media",
      "name": "콘텐츠·영상"
    },
    {
      "id": "vision",
      "name": "이미지·분류"
    },
    {
      "id": "simulation",
      "name": "게임·시뮬레이션"
    },
    {
      "id": "compare",
      "name": "Jev 비교"
    }
  ],
  "cases": [
    {
      "id": "decisions-openai-dots",
      "category": "voice",
      "title": "OpenAI dots의 더 빠른 상호작용",
      "summary": "OpenAI는 dots 팀이 응답 시간을 줄이고 상호작용을 개선하는 데 Decisions를 사용한다고 밝혔습니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://openai.com/index/decisions-api/",
      "published": "2026-10-22",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "내부 활용",
          "label": "OpenAI 발표"
        }
      ],
      "keywords": [
        "dot",
        "비서",
        "반응속도"
      ],
      "note": "세부 질문과 측정값, 비교 조건은 공개 발표에 없습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/voice.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "official-use",
        "status": "OpenAI 내부 활용 · 실행 결과 독립 재현 아님",
        "purpose": "OpenAI dots의 더 빠른 상호작용",
        "input": "대화형 비서의 작업 흐름",
        "workflow": "반복되는 작은 판단을 Decisions로 처리한다고 소개합니다.",
        "result": "OpenAI가 응답성과 상호작용 개선 용도를 공개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "세부 질문과 측정값, 비교 조건은 공개 발표에 없습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.com/index/decisions-api/"
          }
        ]
      }
    },
    {
      "id": "decisions-openai-finance",
      "category": "work",
      "title": "금융 거래 내역 분류",
      "summary": "OpenAI Personal Finance 팀은 거래 설명을 범주별로 분류하는 데 사용합니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://openai.com/index/decisions-api/",
      "published": "2026-10-22",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "거래 분류",
          "label": "OpenAI 발표"
        }
      ],
      "keywords": [
        "finance",
        "transaction",
        "가계부"
      ],
      "note": "정확도와 거래 데이터 구성, 검토 방식은 공개되지 않았습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/work.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "official-use",
        "status": "OpenAI 내부 활용 · 실행 결과 독립 재현 아님",
        "purpose": "금융 거래 내역 분류",
        "input": "금융 거래의 설명",
        "workflow": "거래 설명을 항목 유형에 맞게 분류합니다.",
        "result": "OpenAI가 내부 활용 사례로 공개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "정확도와 거래 데이터 구성, 검토 방식은 공개되지 않았습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.com/index/decisions-api/"
          }
        ]
      }
    },
    {
      "id": "decisions-openai-communications",
      "category": "media",
      "title": "기사 주제와 논조 검토",
      "summary": "OpenAI 커뮤니케이션 팀이 기사 주제를 분류하고 주요 서사를 뒷받침하거나 반박하는지 평가합니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://openai.com/index/decisions-api/",
      "published": "2026-10-22",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "보도 분류",
          "label": "OpenAI 발표"
        }
      ],
      "keywords": [
        "communications",
        "news",
        "기사"
      ],
      "note": "분류 기준과 사람이 검토한 성능은 공개되지 않았습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/media.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "official-use",
        "status": "OpenAI 내부 활용 · 실행 결과 독립 재현 아님",
        "purpose": "기사 주제와 논조 검토",
        "input": "언론 보도와 주요 주제",
        "workflow": "주제 분류와 논조 점수를 검토할 보도 선별에 활용합니다.",
        "result": "OpenAI가 내부 업무 활용으로 소개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "분류 기준과 사람이 검토한 성능은 공개되지 않았습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.com/index/decisions-api/"
          }
        ]
      }
    },
    {
      "id": "decisions-box-insurance",
      "category": "work",
      "title": "Box: 보험 문서 다음 단계 분류",
      "summary": "보험 증명서 30건의 테스트에서 문서를 분류해 다음 단계로 보내고, 확신이 낮은 건은 사람이 검토합니다.",
      "author": "Box",
      "handle": "",
      "source": "https://openai.com/index/decisions-api/",
      "published": "2026-10-22",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "약 5배",
          "label": "30건 자체 평가"
        }
      ],
      "keywords": [
        "Box",
        "insurance",
        "document",
        "보험"
      ],
      "note": "30건 자체 평가로, 다른 문서나 운영 환경의 성능을 보장하지 않습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/work.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "기업 자체 보고 · 실행 결과 독립 재현 아님",
        "purpose": "Box: 보험 문서 다음 단계 분류",
        "input": "보험 증명서 등 업무 문서",
        "workflow": "Box Extract와 Decisions로 문서를 분류하고 다음 처리 경로를 선택합니다.",
        "result": "Box는 30건 평가에서 Responses API 대비 정확도는 같고 경로 선택은 약 5배 빨랐다고 보고했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "30건 자체 평가로, 다른 문서나 운영 환경의 성능을 보장하지 않습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.com/index/decisions-api/"
          }
        ]
      }
    },
    {
      "id": "decisions-datadog-shell",
      "category": "agents",
      "title": "Datadog: 자동 복구 명령 위험 평가",
      "summary": "에이전트가 생성한 rshell 명령의 위험도를 실행 전에 평가하는 사례입니다.",
      "author": "Datadog",
      "handle": "",
      "source": "https://openai.com/index/decisions-api/",
      "published": "2026-10-22",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "40배",
          "label": "자체 보고 · p95"
        }
      ],
      "keywords": [
        "shell",
        "security",
        "복구",
        "위험"
      ],
      "note": "평가 데이터와 비교 모델의 상세 조건은 공개되지 않았습니다. 점수만으로 실행 권한이나 안전을 보증할 수 없습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/agents.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "기업 자체 보고 · 실행 결과 독립 재현 아님",
        "purpose": "Datadog: 자동 복구 명령 위험 평가",
        "input": "자동 복구 에이전트가 만든 rshell 명령",
        "workflow": "복구 실행 전 명령 위험도를 점수화합니다.",
        "result": "Datadog은 기존 프런티어 모델들에 비해 p95 지연이 40배 빨랐고 정확도는 비슷했다고 보고했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "평가 데이터와 비교 모델의 상세 조건은 공개되지 않았습니다. 점수만으로 실행 권한이나 안전을 보증할 수 없습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.com/index/decisions-api/"
          }
        ]
      }
    },
    {
      "id": "decisions-ramp-cost",
      "category": "work",
      "title": "Ramp: AI 비용을 작업별로 귀속",
      "summary": "AI 비용을 실제 작업에 연결하는 분류 과정에 Decisions를 사용합니다.",
      "author": "Ramp",
      "handle": "",
      "source": "https://openai.com/index/decisions-api/",
      "published": "2026-10-22",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "4배",
          "label": "자체 보고 · 속도"
        }
      ],
      "keywords": [
        "cost",
        "finance",
        "비용"
      ],
      "note": "샘플 수와 평가 기준이 공개되지 않은 기업 자체 비교입니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/work.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "기업 자체 보고 · 실행 결과 독립 재현 아님",
        "purpose": "Ramp: AI 비용을 작업별로 귀속",
        "input": "AI 사용 비용과 작업 맥락",
        "workflow": "AI 비용을 대응하는 업무에 연결하는 판단을 수행합니다.",
        "result": "Ramp는 GPT-6 Luna 대비 4배 빠르고 30% 저렴하며 정확도 저하는 없었다고 보고했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "샘플 수와 평가 기준이 공개되지 않은 기업 자체 비교입니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.com/index/decisions-api/"
          }
        ]
      }
    },
    {
      "id": "decisions-sierra-conversation",
      "category": "voice",
      "title": "Sierra: 고객 대화의 다음 행동 선택",
      "summary": "실시간 고객 대화 중 오케스트레이션의 일부에서 다음 행동을 고르는 데 활용합니다.",
      "author": "Sierra",
      "handle": "",
      "source": "https://openai.com/index/decisions-api/",
      "published": "2026-10-22",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "280ms 미만",
          "label": "자체 보고 · p95"
        }
      ],
      "keywords": [
        "support",
        "customer",
        "orchestration"
      ],
      "note": "실제 대화 전체 처리 지연이나 독립 비교 결과가 아닙니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/voice.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "기업 자체 보고 · 실행 결과 독립 재현 아님",
        "purpose": "Sierra: 고객 대화의 다음 행동 선택",
        "input": "진행 중인 고객 대화와 가능한 다음 행동",
        "workflow": "대화 중 일부 단계의 다음 행동을 선택합니다.",
        "result": "Sierra는 p95 280ms 미만, 기존 대비 약 3배 빠르고 호출당 비용이 90% 낮았다고 보고했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "실제 대화 전체 처리 지연이나 독립 비교 결과가 아닙니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.com/index/decisions-api/"
          }
        ]
      }
    },
    {
      "id": "decisions-speak-language",
      "category": "voice",
      "title": "Speak: 실시간 언어 학습 반응",
      "summary": "GPT-Live와 연결해 학습자가 말할 때 다음 행동까지의 대기 시간을 줄인 시험입니다.",
      "author": "Speak",
      "handle": "",
      "source": "https://openai.com/index/decisions-api/",
      "published": "2026-10-22",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "1.4초 → 0.13초",
          "label": "Speak 자체 시험"
        }
      ],
      "keywords": [
        "language",
        "learning",
        "회화",
        "GPT-Live"
      ],
      "note": "특정 시험의 지연 수치이며 학습 성과나 모든 네트워크에서의 속도를 입증하지 않습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/voice.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "partner-report",
        "status": "기업 자체 보고 · 실행 결과 독립 재현 아님",
        "purpose": "Speak: 실시간 언어 학습 반응",
        "input": "언어 학습 중 실시간 대화",
        "workflow": "GPT-Live와 Decisions의 통합으로 대화 중 다음 행동을 선택합니다.",
        "result": "Speak는 자체 시험에서 다음 행동까지 1.4초에서 0.13초로 90% 이상 줄었다고 보고했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "특정 시험의 지연 수치이며 학습 성과나 모든 네트워크에서의 속도를 입증하지 않습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.com/index/decisions-api/"
          }
        ]
      }
    },
    {
      "id": "decisions-pat-voice",
      "category": "voice",
      "title": "음성으로 Mac과 브라우저 제어",
      "summary": "Whisper가 음성을 글자로 바꾸고 Decisions가 앱 열기, 탭 이동, 버튼 클릭 등 허용된 행동을 고릅니다.",
      "author": "Pat Simmons",
      "handle": "",
      "source": "https://www.aiformortals.co/blog/decisions-api",
      "published": "2026-10-07",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "17 / 17",
          "label": "합성 명령 자체 시험"
        }
      ],
      "keywords": [
        "voice",
        "browser",
        "Mac",
        "음성",
        "브라우저"
      ],
      "note": "실제 마이크·다양한 사용자 환경의 성능은 검증되지 않았습니다. OS 권한이 필요합니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/voice.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "음성으로 Mac과 브라우저 제어",
        "input": "음성 명령의 전사와 현재 앱·브라우저의 선택지",
        "workflow": "로컬 Whisper로 전사한 뒤 Decisions가 고른 명령을 Mac과 Chrome 코드가 실행합니다.",
        "result": "제작자는 합성 음성 명령 17개가 통과했고 전체 중앙값이 362ms였다고 보고했습니다.",
        "tools": "Whisper: 음성 전사. Decisions: 허용된 명령 선택. 로컬 코드: 실제 조작.",
        "limitations": "실제 마이크·다양한 사용자 환경의 성능은 검증되지 않았습니다. OS 권한이 필요합니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://www.aiformortals.co/blog/decisions-api"
          }
        ]
      },
      "code": "https://github.com/per-simmons/decisions-api-demos/tree/main/voice-control",
      "fullVideo": "https://www.youtube.com/watch?v=XYX8bTIwKkM&t=414s"
    },
    {
      "id": "decisions-pat-focus",
      "category": "vision",
      "title": "집중 타이머가 화면을 살펴보기",
      "summary": "사용자가 정한 작업과 주기적인 화면 캡처를 비교해 집중이 흐트러지면 알려줍니다.",
      "author": "Pat Simmons",
      "handle": "",
      "source": "https://www.aiformortals.co/blog/decisions-api",
      "published": "2026-10-07",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "8 / 8",
          "label": "제작자 시험 화면"
        }
      ],
      "keywords": [
        "focus",
        "pomodoro",
        "screenshot",
        "집중"
      ],
      "note": "작은 시험이며 화면에 보이는 민감한 정보가 외부로 전송될 수 있습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/vision.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "집중 타이머가 화면을 살펴보기",
        "input": "사용자가 정한 작업과 화면 캡처",
        "workflow": "스크린샷을 주기적으로 보내 작업 관련 여부를 판단하고, 타이머와 알림은 앱이 처리합니다.",
        "result": "제작자는 8개 시험 화면이 기대대로 분류됐다고 보고했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "작은 시험이며 화면에 보이는 민감한 정보가 외부로 전송될 수 있습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://www.aiformortals.co/blog/decisions-api"
          }
        ]
      },
      "code": "https://github.com/per-simmons/decisions-api-demos/tree/main/focus-orb",
      "fullVideo": "https://www.youtube.com/watch?v=XYX8bTIwKkM&t=330s"
    },
    {
      "id": "decisions-pat-feed",
      "category": "media",
      "title": "X 피드의 광고·낚시성 게시물 접기",
      "summary": "게시물 텍스트와 이미지를 판단해 광고나 자극적인 글을 접는 크롬 확장입니다.",
      "author": "Pat Simmons",
      "handle": "",
      "source": "https://www.aiformortals.co/blog/decisions-api",
      "published": "2026-10-07",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "16 / 16",
          "label": "합성 게시물 시험"
        }
      ],
      "keywords": [
        "x",
        "feed",
        "광고",
        "필터"
      ],
      "note": "합성 피드 시험이며 실제 X 페이지 구조가 바뀌면 확장 동작이 달라질 수 있습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/media.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "X 피드의 광고·낚시성 게시물 접기",
        "input": "X 피드의 게시물과 이미지",
        "workflow": "predicate와 choice로 분류하고 브라우저 확장이 해당 게시물을 접습니다.",
        "result": "제작자는 가상의 피드 게시물 16개를 세 번 모두 기대대로 분류했다고 보고했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "합성 피드 시험이며 실제 X 페이지 구조가 바뀌면 확장 동작이 달라질 수 있습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://www.aiformortals.co/blog/decisions-api"
          }
        ]
      },
      "code": "https://github.com/per-simmons/decisions-api-demos/tree/main/x-feed-cleaner",
      "fullVideo": "https://www.youtube.com/watch?v=XYX8bTIwKkM&t=647s"
    },
    {
      "id": "decisions-pat-blur",
      "category": "media",
      "title": "화면 녹화 속 개인정보 흐리기",
      "summary": "영상에서 뽑은 프레임의 민감정보와 대략적인 위치를 판별해 편집 도구가 해당 구간을 흐립니다.",
      "author": "Pat Simmons",
      "handle": "",
      "source": "https://www.aiformortals.co/blog/decisions-api",
      "published": "2026-10-07",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "144 프레임",
          "label": "72초 합성 영상 시험"
        }
      ],
      "keywords": [
        "blur",
        "privacy",
        "ffmpeg",
        "개인정보"
      ],
      "note": "분석 전에 원본 프레임이 전송됩니다. 샘플링 사이 누락이나 미검출이 가능하므로 결과를 직접 검토해야 합니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/media.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "화면 녹화 속 개인정보 흐리기",
        "input": "0.5초 간격으로 추출한 녹화 프레임",
        "workflow": "민감정보 존재와 화면 위치를 질문하고 FFmpeg가 해당 구간을 흐립니다.",
        "result": "제작자는 합성 정보가 든 72초 영상의 144프레임 중 84개를 표시했다고 보고했습니다.",
        "tools": "Decisions: 프레임과 위치 분류. FFmpeg: 실제 블러 처리.",
        "limitations": "분석 전에 원본 프레임이 전송됩니다. 샘플링 사이 누락이나 미검출이 가능하므로 결과를 직접 검토해야 합니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://www.aiformortals.co/blog/decisions-api"
          }
        ]
      },
      "code": "https://github.com/per-simmons/decisions-api-demos/tree/main/auto-blur",
      "fullVideo": "https://www.youtube.com/watch?v=XYX8bTIwKkM&t=757s"
    },
    {
      "id": "decisions-pat-wikipedia",
      "category": "compare",
      "title": "위키피디아 경주: Decisions 대 Jev",
      "summary": "같은 출발·도착 문서에서 다음 링크를 고르는 두 판단 모델을 비교합니다.",
      "author": "Pat Simmons",
      "handle": "",
      "source": "https://www.aiformortals.co/blog/decisions-api",
      "published": "2026-10-07",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "4 / 6",
          "label": "Decisions가 빠른 경로 · 자체 시험"
        }
      ],
      "keywords": [
        "wikipedia",
        "race",
        "jev",
        "비교",
        "속도"
      ],
      "note": "6개 경로와 특정 설정에 한정된 비교입니다. 다른 과제의 우열이나 최신 가격을 뜻하지 않습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/compare.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "위키피디아 경주: Decisions 대 Jev",
        "input": "현재 위키 문서의 링크와 목표 문서",
        "workflow": "후보 링크를 묶어 Decisions와 Jev에 같은 탐색 과제를 주고 앱이 링크를 따라갑니다.",
        "result": "제작자는 6개 경로 중 Decisions가 4개에서 빨랐고, Jev는 6개 모두 더 저렴했다고 보고했습니다.",
        "tools": "Decisions와 Jev: 링크 선택. 앱: 탐색과 시간·비용 집계.",
        "limitations": "6개 경로와 특정 설정에 한정된 비교입니다. 다른 과제의 우열이나 최신 가격을 뜻하지 않습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://www.aiformortals.co/blog/decisions-api"
          }
        ]
      },
      "code": "https://github.com/per-simmons/decisions-api-demos/tree/main/wikipedia-race",
      "fullVideo": "https://www.youtube.com/watch?v=XYX8bTIwKkM&t=840s"
    },
    {
      "id": "decisions-pat-calorie",
      "category": "vision",
      "title": "음식 사진으로 칼로리 기록",
      "summary": "아이폰 앱에서 음식 사진의 종류와 분량을 고르고 USDA 식품 데이터와 결합하는 시제품입니다.",
      "author": "Pat Simmons",
      "handle": "",
      "source": "https://www.aiformortals.co/blog/decisions-api",
      "published": "2026-10-07",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "아이폰",
          "label": "제작자 시제품"
        }
      ],
      "keywords": [
        "food",
        "calorie",
        "USDA",
        "음식"
      ],
      "note": "식품 식별·분량·영양 정확도는 검증되지 않았습니다. 공개 저장소에 이 앱 코드는 확인되지 않았습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/vision.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "음식 사진으로 칼로리 기록",
        "input": "음식 사진과 식품 후보 목록",
        "workflow": "음식 유형과 분량을 Decisions로 선택한 뒤 식품 데이터베이스와 코드로 칼로리를 계산합니다.",
        "result": "제작자가 아이폰 시제품과 작동 방식을 공개했습니다.",
        "tools": "Decisions: 음식과 분량 선택. USDA 식품 데이터와 코드: 칼로리 계산.",
        "limitations": "식품 식별·분량·영양 정확도는 검증되지 않았습니다. 공개 저장소에 이 앱 코드는 확인되지 않았습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://www.aiformortals.co/blog/decisions-api"
          }
        ]
      },
      "fullVideo": "https://www.youtube.com/watch?v=XYX8bTIwKkM&t=1033s"
    },
    {
      "id": "decisions-pat-takes",
      "category": "media",
      "title": "영상의 다시 말한 부분 골라내기",
      "summary": "녹음의 전사 문장을 앞뒤 문맥과 함께 비교해 실수와 재시도 구간을 찾습니다.",
      "author": "Pat Simmons",
      "handle": "",
      "source": "https://www.aiformortals.co/blog/decisions-api",
      "published": "2026-10-07",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "7개",
          "label": "제작자 보고 · 제거 테이크"
        }
      ],
      "keywords": [
        "editing",
        "video",
        "transcript",
        "편집",
        "컷"
      ],
      "note": "전사가 전체 시간의 대부분을 차지했고 남긴 문장 안의 실수는 고치지 못합니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/media.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "영상의 다시 말한 부분 골라내기",
        "input": "영상의 문장별 전사와 앞뒤 문맥",
        "workflow": "전사 후 실수·재시작을 구분하고 반복된 문장 중 남길 테이크를 선택해 편집합니다.",
        "result": "제작자는 4.75분 분량에서 나쁜 테이크 7개를 잘랐다고 보고했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "전사가 전체 시간의 대부분을 차지했고 남긴 문장 안의 실수는 고치지 못합니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://www.aiformortals.co/blog/decisions-api"
          }
        ]
      },
      "code": "https://github.com/per-simmons/decisions-api-demos/tree/main/bad-takes",
      "fullVideo": "https://www.youtube.com/watch?v=XYX8bTIwKkM&t=1175s"
    },
    {
      "id": "decisions-pat-assaultcube",
      "category": "simulation",
      "title": "AssaultCube 오프라인 게임 실험",
      "summary": "게임 상태와 화면을 바탕으로 목표·행동을 고르고, 이동과 조준은 일반 코드가 수행합니다.",
      "author": "Pat Simmons",
      "handle": "",
      "source": "https://www.aiformortals.co/blog/decisions-api",
      "published": "2026-10-07",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "32 : 5",
          "label": "제작자 보고 · 킬/데스"
        }
      ],
      "keywords": [
        "game",
        "assaultcube",
        "FPS",
        "게임"
      ],
      "note": "화면만 보고 스스로 게임을 익힌 결과가 아닙니다. 쉬운 오프라인 봇과의 단일 실험입니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/simulation.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "AssaultCube 오프라인 게임 실험",
        "input": "오프라인 게임 화면과 게임 패치가 제공한 상태",
        "workflow": "Decisions가 목표와 행동을 고르고 일반 코드가 길 찾기와 조준을 담당합니다.",
        "result": "제작자는 가장 쉬운 봇 3명과의 경기에서 32킬 5데스를 보고했습니다.",
        "tools": "Decisions: 목표·행동 선택. 게임 패치: 상태 제공. 일반 코드: 이동·조준.",
        "limitations": "화면만 보고 스스로 게임을 익힌 결과가 아닙니다. 쉬운 오프라인 봇과의 단일 실험입니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://www.aiformortals.co/blog/decisions-api"
          }
        ]
      },
      "code": "https://github.com/per-simmons/decisions-api-demos/tree/main/assaultcube",
      "fullVideo": "https://www.youtube.com/watch?v=XYX8bTIwKkM&t=0s"
    },
    {
      "id": "decisions-showdown-tickets",
      "category": "compare",
      "title": "고객지원 티켓 라우팅 비교",
      "summary": "같은 가상 고객지원 티켓을 Decisions와 Jev에 보내 담당 팀·보안 민감도·영향도를 비교합니다.",
      "author": "Vipin Mishra",
      "handle": "",
      "source": "https://github.com/ivipinmishra/decision-models-showdown",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "20개",
          "label": "라벨된 가상 티켓"
        }
      ],
      "keywords": [
        "ticket",
        "support",
        "jev",
        "라우팅"
      ],
      "note": "키가 없는 쪽은 MOCK 결과입니다. 작은 가상 데이터셋은 일반적인 성능 순위를 입증하지 못합니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/compare.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "고객지원 티켓 라우팅 비교",
        "input": "사람이 라벨을 붙인 가상 티켓 20개",
        "workflow": "두 API에 같은 질문을 보내고 일반 코드가 담당 큐나 사람 검토로 보냅니다.",
        "result": "제작자가 비교 앱과 평가 코드를 공개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "키가 없는 쪽은 MOCK 결과입니다. 작은 가상 데이터셋은 일반적인 성능 순위를 입증하지 못합니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://github.com/ivipinmishra/decision-models-showdown"
          }
        ]
      },
      "code": "https://github.com/ivipinmishra/decision-models-showdown"
    },
    {
      "id": "decisions-showdown-alerts",
      "category": "compare",
      "title": "클라우드 경보 분류 비교",
      "summary": "가상의 클라우드 경보를 같은 질문으로 평가하고 무시·관찰·호출·롤백 후보를 보여줍니다.",
      "author": "Vipin Mishra",
      "handle": "",
      "source": "https://github.com/ivipinmishra/decision-models-showdown",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "15개",
          "label": "라벨된 가상 경보"
        }
      ],
      "keywords": [
        "cloud",
        "alert",
        "jev",
        "경보"
      ],
      "note": "기본값과 샘플은 실험용이며 배포 환경에서 자동 롤백을 실행해도 안전하다는 뜻이 아닙니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/compare.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "클라우드 경보 분류 비교",
        "input": "사람이 라벨을 붙인 JSON 경보 15개",
        "workflow": "Decisions와 Jev의 심각도·권고 선택 결과를 임계값 코드에 전달합니다.",
        "result": "제작자가 티켓 라우터와 별도의 경보 분류 시나리오 및 평가 코드를 공개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "기본값과 샘플은 실험용이며 배포 환경에서 자동 롤백을 실행해도 안전하다는 뜻이 아닙니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://github.com/ivipinmishra/decision-models-showdown"
          }
        ]
      },
      "code": "https://github.com/ivipinmishra/decision-models-showdown"
    },
    {
      "id": "decisions-youtube-filters",
      "category": "media",
      "title": "유튜브 제목·썸네일 필터",
      "summary": "키워드와 선택적인 AI 분류로 낚시성 제목이나 특정 썸네일을 숨기거나 흐리는 확장 프로그램입니다.",
      "author": "Ivan Campos",
      "handle": "",
      "source": "https://github.com/IvanCampos/YouTube-Filters",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "Chrome",
          "label": "제작자 공개 코드"
        }
      ],
      "keywords": [
        "youtube",
        "thumbnail",
        "filter",
        "유튜브"
      ],
      "note": "정확도는 독립 재현하지 않았으며 AI 필터 사용 시 제목이나 이미지가 OpenAI로 전송됩니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/media.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "유튜브 제목·썸네일 필터",
        "input": "유튜브 영상 제목과 선택한 썸네일 이미지",
        "workflow": "사용자가 켠 분류 항목을 Decisions에 질문하고 확장이 표시 방식을 바꿉니다.",
        "result": "제작자가 Chrome 확장과 설정 방법을 공개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "정확도는 독립 재현하지 않았으며 AI 필터 사용 시 제목이나 이미지가 OpenAI로 전송됩니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://github.com/IvanCampos/YouTube-Filters"
          }
        ]
      },
      "code": "https://github.com/IvanCampos/YouTube-Filters"
    },
    {
      "id": "decisions-pretzel",
      "category": "vision",
      "title": "아이폰 사진 속 프레첼 분류",
      "summary": "사진에 프레첼이 있는지 확인하고 빵 종류를 선택하거나 불확실한 사진을 수동 검토로 보내는 SwiftUI 데모입니다.",
      "author": "appdess",
      "handle": "",
      "source": "https://github.com/appdess/decisions-api-demo",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "iOS",
          "label": "제작자 공개 코드"
        }
      ],
      "keywords": [
        "iphone",
        "swiftui",
        "pretzel",
        "사진"
      ],
      "note": "문서의 임계값은 예시이며 정확도가 검증된 기준이 아닙니다. 실제 사진은 OpenAI로 전송됩니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/vision.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "아이폰 사진 속 프레첼 분류",
        "input": "사용자가 찍거나 고른 음식 사진",
        "workflow": "사진을 Decisions에 보내 조건과 선택지를 평가하고 불확실한 결과는 수동 검토로 보냅니다.",
        "result": "제작자가 SwiftUI 소스와 예시 화면을 공개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "문서의 임계값은 예시이며 정확도가 검증된 기준이 아닙니다. 실제 사진은 OpenAI로 전송됩니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://github.com/appdess/decisions-api-demo"
          }
        ]
      },
      "code": "https://github.com/appdess/decisions-api-demo"
    },
    {
      "id": "decisions-demopilot",
      "category": "work",
      "title": "DemoPilot: 발표 시연 순서 정하기",
      "summary": "프로젝트 설명을 바탕으로 먼저 보여줄 기능과 증거 준비 정도를 검토하는 발표 도구입니다.",
      "author": "Yash-1706",
      "handle": "",
      "source": "https://github.com/Yash-1706/openai-dev-day-polaris",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "4개 질문",
          "label": "제작자 공개 구현"
        }
      ],
      "keywords": [
        "presentation",
        "pitch",
        "demo",
        "발표"
      ],
      "note": "작성자의 제품 설명을 검증하지 않습니다. 공개 앱의 AI 사용 가능 여부는 확인 시점에 따라 달라질 수 있습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/work.svg",
        "alt": "",
        "label": "실행 데모 열기 ↗"
      },
      "evidence": {
        "origin": "community",
        "status": "제작자 공개 실험 · 실행 결과 독립 재현 아님",
        "purpose": "DemoPilot: 발표 시연 순서 정하기",
        "input": "발표자가 입력한 문제·기능·증거·제한점",
        "workflow": "서버의 Decisions 호출이 우선 기능과 준비 정도를 평가하고, 발표 계획 문구는 앱 코드가 구성합니다.",
        "result": "제작자는 코드를 공개하고 실 API 호출 및 데모 모드 동작을 보고했습니다.",
        "tools": "Decisions: 발표 순서·준비도 판단. 앱 코드: 계획 문구 구성.",
        "limitations": "작성자의 제품 설명을 검증하지 않습니다. 공개 앱의 AI 사용 가능 여부는 확인 시점에 따라 달라질 수 있습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://github.com/Yash-1706/openai-dev-day-polaris"
          }
        ]
      },
      "code": "https://github.com/Yash-1706/openai-dev-day-polaris",
      "demo": "https://openai-dev-day-polaris.vercel.app/"
    },
    {
      "id": "decisions-tempo",
      "category": "simulation",
      "title": "Tempo: 체스 퍼즐 코치",
      "summary": "체스 퍼즐을 풀면서 힌트와 수에 대한 설명을 받는 OpenAI 공식 데모입니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://developers.openai.com/showcase/tempo",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "공식 데모",
          "label": "체스 퍼즐·코칭"
        }
      ],
      "keywords": [
        "chess",
        "tempo",
        "체스"
      ],
      "note": "AI 코칭은 틀릴 수 있습니다. 이번 확인에서는 초기 화면만 살펴봤습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/simulation.svg",
        "alt": "",
        "label": "실행 데모 열기 ↗"
      },
      "evidence": {
        "origin": "official-demo",
        "status": "OpenAI 공개 데모 · 실행 결과 독립 재현 아님",
        "purpose": "Tempo: 체스 퍼즐 코치",
        "input": "체스 판의 위치와 사용자의 질문",
        "workflow": "Decisions가 코칭 접근 방식을 고르고 Responses가 상황을 설명합니다. 합법 수와 해답은 로컬에서 확인합니다.",
        "result": "OpenAI가 체험 가능한 퍼즐과 프로젝트 다운로드를 공개했습니다.",
        "tools": "Decisions: 코칭 접근 선택. Responses: 설명. 앱: 체스 규칙 검사.",
        "limitations": "AI 코칭은 틀릴 수 있습니다. 이번 확인에서는 초기 화면만 살펴봤습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://developers.openai.com/showcase/tempo"
          }
        ]
      },
      "demo": "https://tempo-chess-api.openai.chatgpt.site/"
    },
    {
      "id": "decisions-signal",
      "category": "simulation",
      "title": "Signal: 교통 흐름 시뮬레이션",
      "summary": "차량별 주변 상태를 보고 합류·가속·양보를 선택하며 교통 흐름과 판단 기록을 보여줍니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://developers.openai.com/showcase/signal",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "공식 데모",
          "label": "차량 행동 시뮬레이션"
        }
      ],
      "keywords": [
        "traffic",
        "driving",
        "signal",
        "교통"
      ],
      "note": "양식화된 모의 교통입니다. 실제 자율주행 안전성이나 도로 운행 성능의 근거가 아닙니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/simulation.svg",
        "alt": "",
        "label": "실행 데모 열기 ↗"
      },
      "evidence": {
        "origin": "official-demo",
        "status": "OpenAI 공개 데모 · 실행 결과 독립 재현 아님",
        "purpose": "Signal: 교통 흐름 시뮬레이션",
        "input": "시뮬레이션 차량 주변의 도로와 간격",
        "workflow": "Decisions가 차량 행동을 선택하고 로컬 물리 규칙이 간격을 확인합니다.",
        "result": "OpenAI가 차량별 선택과 요청 기록을 보여주는 공식 체험을 공개했습니다.",
        "tools": "Decisions: 차량 행동 선택. 시뮬레이터: 물리·간격 검사.",
        "limitations": "양식화된 모의 교통입니다. 실제 자율주행 안전성이나 도로 운행 성능의 근거가 아닙니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://developers.openai.com/showcase/signal"
          }
        ]
      },
      "demo": "https://signal-traffic-api.openai.chatgpt.site/"
    },
    {
      "id": "decisions-ticker",
      "category": "simulation",
      "title": "Ticker: 가상 시장의 매수·보유·매도",
      "summary": "가상의 뉴스와 주가에 따라 AI가 모의 거래를 선택하는 OpenAI 공식 데모입니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://developers.openai.com/showcase/ticker",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "가상 시장",
          "label": "모의 거래 데모"
        }
      ],
      "keywords": [
        "trading",
        "stock",
        "ticker",
        "주식",
        "모의투자"
      ],
      "note": "실제 시세·실제 자산·실거래가 아닙니다. 투자 전략의 수익성이나 실제 시장 예측 능력을 입증하지 않습니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/simulation.svg",
        "alt": "",
        "label": "실행 데모 열기 ↗"
      },
      "evidence": {
        "origin": "official-demo",
        "status": "OpenAI 공개 데모 · 실행 결과 독립 재현 아님",
        "purpose": "Ticker: 가상 시장의 매수·보유·매도",
        "input": "가상 종목·가격과 생성된 가상 뉴스",
        "workflow": "Responses가 가상 기사를 만들고 Decisions가 매수·보유·매도를 선택합니다.",
        "result": "OpenAI가 6개 가상 종목과 모의 포트폴리오를 보여주는 체험을 공개했습니다.",
        "tools": "Responses: 가상 뉴스 작성. Decisions: 매수·보유·매도 선택. 앱: 가상 시장.",
        "limitations": "실제 시세·실제 자산·실거래가 아닙니다. 투자 전략의 수익성이나 실제 시장 예측 능력을 입증하지 않습니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://developers.openai.com/showcase/ticker"
          }
        ]
      },
      "demo": "https://ticker-trading-api.openai.chatgpt.site/"
    },
    {
      "id": "decisions-voice-car",
      "category": "voice",
      "title": "GPT-Live로 차량 실내 음성 제어",
      "summary": "음성 대화에서 실내 온도와 성에 제거 장치를 조절하고 추가 요청을 Responses로 넘기는 공식 예제입니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://developers.openai.com/api/docs/guides/decisions-voice",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "공식 예제",
          "label": "음성 + 실내 제어"
        }
      ],
      "keywords": [
        "GPT-Live",
        "voice",
        "car",
        "음성",
        "차량"
      ],
      "note": "공식 구성 예제이며 실제 차량에서의 성공률이나 지연을 검증한 운영 사례가 아닙니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/voice.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "recipe",
        "status": "공개 예제·설계 · 실행 결과 독립 재현 아님",
        "purpose": "GPT-Live로 차량 실내 음성 제어",
        "input": "운전자의 음성 대화 전사와 실내 제어 선택지",
        "workflow": "GPT-Live가 대화 전사를 Decisions에 전달해 온도·성에 제거·추가 응답 필요 여부를 고르고, 앱이 설정을 실행합니다.",
        "result": "OpenAI가 차량 실내 제어와 경로·식당 검색 요청을 연계하는 구성 예시를 공개했습니다.",
        "tools": "GPT-Live: 음성 대화. Decisions: 행동 선택. 앱: 실제 설정 변경. Responses: 추가 요청 처리.",
        "limitations": "공식 구성 예제이며 실제 차량에서의 성공률이나 지연을 검증한 운영 사례가 아닙니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://developers.openai.com/api/docs/guides/decisions-voice"
          }
        ]
      }
    },
    {
      "id": "decisions-avatar-live",
      "category": "voice",
      "title": "대화 중 아바타 표정 선택",
      "summary": "GPT-Live 대화 전사 업데이트를 사용해 아바타의 미소나 윙크를 선택하는 공식 예제입니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://openai.com/index/decisions-api/",
      "published": "2026-10-22",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "공식 예제",
          "label": "GPT-Live 연동"
        }
      ],
      "keywords": [
        "avatar",
        "emotion",
        "표정"
      ],
      "note": "제품 배포 결과나 사용자 연구가 아닌 공식 사용 예제입니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/voice.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "recipe",
        "status": "공개 예제·설계 · 실행 결과 독립 재현 아님",
        "purpose": "대화 중 아바타 표정 선택",
        "input": "실시간 대화의 전사 업데이트",
        "workflow": "GPT-Live의 트리거에서 Decisions가 정해진 표정을 고르고 앱이 아바타에 반영합니다.",
        "result": "OpenAI가 실시간 음성 연동의 예시 구성으로 공개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "제품 배포 결과나 사용자 연구가 아닌 공식 사용 예제입니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.com/index/decisions-api/"
          }
        ]
      }
    },
    {
      "id": "decisions-sdk-input",
      "category": "agents",
      "title": "에이전트 실행 전 요청 범위 확인",
      "summary": "질문이 지원 범위에 속하는지 판단해 에이전트 실행 전 확인하는 Agents SDK 예제입니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://openai.github.io/openai-agents-python/models/#decisions-api",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "공식 코드",
          "label": "입력 가드레일"
        }
      ],
      "keywords": [
        "guardrail",
        "input",
        "에이전트"
      ],
      "note": "임계값은 자체 라벨 데이터로 평가해야 하며 응답 거절과 오류도 별도로 처리해야 합니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/agents.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "recipe",
        "status": "공개 예제·설계 · 실행 결과 독립 재현 아님",
        "purpose": "에이전트 실행 전 요청 범위 확인",
        "input": "에이전트가 받을 초기 요청",
        "workflow": "predicate 응답을 기존 입력 가드레일과 결합합니다.",
        "result": "OpenAI가 실행 가능한 코드 예제와 통합 경계를 공개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "임계값은 자체 라벨 데이터로 평가해야 하며 응답 거절과 오류도 별도로 처리해야 합니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.github.io/openai-agents-python/models/#decisions-api"
          }
        ]
      },
      "code": "https://github.com/openai/openai-agents-python/blob/main/examples/decisions/classify.py"
    },
    {
      "id": "decisions-sdk-tool",
      "category": "agents",
      "title": "에이전트 도구 호출 검토",
      "summary": "도구에 전달할 내용을 살펴보고 차단하거나 사람의 승인을 요청하는 SDK 예제입니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://openai.github.io/openai-agents-python/models/#decisions-api",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "공식 코드",
          "label": "도구 가드레일"
        }
      ],
      "keywords": [
        "tool",
        "risk",
        "approval",
        "승인"
      ],
      "note": "분류 결과는 사용자 권한을 부여하지 않습니다. 권한은 별도 코드로 검증해야 합니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/agents.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "recipe",
        "status": "공개 예제·설계 · 실행 결과 독립 재현 아님",
        "purpose": "에이전트 도구 호출 검토",
        "input": "도구 호출에 전달할 내용",
        "workflow": "Decisions 판단을 기존 도구 가드레일이나 승인 콜백과 연결합니다.",
        "result": "공식 예제는 실제 발행 대신 발행을 모의 실행합니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "분류 결과는 사용자 권한을 부여하지 않습니다. 권한은 별도 코드로 검증해야 합니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.github.io/openai-agents-python/models/#decisions-api"
          }
        ]
      },
      "code": "https://github.com/openai/openai-agents-python/blob/main/examples/decisions/tool_risk_gate.py"
    },
    {
      "id": "decisions-sdk-router",
      "category": "agents",
      "title": "요청에 맞는 모델 고르기",
      "summary": "에이전트를 실행하기 전에 제한된 모델 후보 중 하나를 고르는 SDK 예제입니다.",
      "author": "OpenAI",
      "handle": "",
      "source": "https://openai.github.io/openai-agents-python/models/#decisions-api",
      "published": null,
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "공식 코드",
          "label": "모델 라우팅"
        }
      ],
      "keywords": [
        "model",
        "routing",
        "라우팅"
      ],
      "note": "정확도·비용 이득은 자체 데이터로 평가해야 합니다. 응답 거절이나 오류에 대한 대체 경로가 필요합니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/agents.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "recipe",
        "status": "공개 예제·설계 · 실행 결과 독립 재현 아님",
        "purpose": "요청에 맞는 모델 고르기",
        "input": "사용자 요청과 허용된 모델 후보",
        "workflow": "Decisions의 choice 결과를 애플리케이션이 허용한 모델에 연결합니다.",
        "result": "OpenAI가 모델 선택을 기존 Agents SDK와 결합하는 코드를 공개했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "정확도·비용 이득은 자체 데이터로 평가해야 합니다. 응답 거절이나 오류에 대한 대체 경로가 필요합니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://openai.github.io/openai-agents-python/models/#decisions-api"
          }
        ]
      },
      "code": "https://github.com/openai/openai-agents-python/blob/main/examples/decisions/model_router.py"
    },
    {
      "id": "decisions-vercel-handoff",
      "category": "work",
      "title": "장애 인수인계 내용의 누락 확인",
      "summary": "장애 영향·복구 조치·다음 담당자가 명시됐는지 살펴보는 Vercel의 공개 코드 예제입니다.",
      "author": "Vercel",
      "handle": "",
      "source": "https://vercel.com/i/openai-decisions-api-use-cases",
      "published": "2026-10-08",
      "reviewed": "2026-10-29",
      "metrics": [
        {
          "value": "공개 예제",
          "label": "가상 인수인계"
        }
      ],
      "keywords": [
        "incident",
        "handoff",
        "인수인계",
        "장애"
      ],
      "note": "실제 장애 해결이나 알림을 실행하지 않으며 실제 운영 사례가 아닌 설계 예제입니다.",
      "media": {
        "type": "report",
        "poster": "assets/decisions-thumbs/work.svg",
        "alt": "",
        "label": "공개 원문 읽기 ↗"
      },
      "evidence": {
        "origin": "recipe",
        "status": "공개 예제·설계 · 실행 결과 독립 재현 아님",
        "purpose": "장애 인수인계 내용의 누락 확인",
        "input": "가상의 장애 인수인계 메모",
        "workflow": "조건·선택·점수 질문으로 영향, 다음 단계와 내용 충실도를 검토합니다.",
        "result": "Vercel이 가상 메모를 평가하는 실행 예제와 다른 응용 설계를 제시했습니다.",
        "tools": "OpenAI Decisions API: 제한된 선택·판단. 실제 동작은 별도 앱이나 프로그램이 수행합니다.",
        "limitations": "실제 장애 해결이나 알림을 실행하지 않으며 실제 운영 사례가 아닌 설계 예제입니다.",
        "access": "명시한 공개 원문을 확인했습니다. 외부 실행 환경과 결과는 독립적으로 재현하지 않았습니다.",
        "sources": [
          {
            "label": "공개 원문",
            "url": "https://vercel.com/i/openai-decisions-api-use-cases"
          }
        ]
      }
    }
  ]
};
