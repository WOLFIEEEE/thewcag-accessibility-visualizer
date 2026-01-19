const dict = {
  subtitle: "간단하고 '보이는' 웹 접근성",
  hero: {
    title: "웹 접근성을 시각화",
    description:
      "스크린 리더 등 보조 기술 사용자가 인식하는 정보를 Chrome에서 쉽게 확인할 수 있는 확장 프로그램입니다. 개발자와 디자이너를 위해 접근성을 시각화하고 실행 가능하게 만듭니다.",
    screenshotSrc: "/a11y-visualizer/images/screenshot_ko.png",
  },
  about: {
    title: "TheWCAG Accessibility Visualizer 소개",
    description:
      "TheWCAG Accessibility Visualizer는 웹 접근성에 대한 접근 방식을 변화시킵니다. 보이지 않는 접근성 정보를 시각화하여 개발자가 접근성 데이터를 쉽게 이해할 수 있도록 합니다.",
    valueProposition:
      "이 강력한 도구는 개발자, 디자이너, QA 엔지니어가 개발 중에 접근성 문제를 식별하고 수정하는 데 도움이 되며, 보조 기술을 사용한 광범위한 테스트의 필요성을 줄이면서 사이트가 모든 사람에게 접근 가능하도록 보장합니다.",
  },
  useCases: {
    title: "TheWCAG Accessibility Visualizer를 활용하는 사람들",
    items: {
      developers: {
        title: "웹 개발자",
        description:
          "코딩 중에 누락된 대체 텍스트, 제목 계층 구조 문제, ARIA 구성 오류를 빠르게 식별합니다. 프로덕션에 도달하기 전에 접근성 문제를 수정합니다.",
      },
      designers: {
        title: "디자이너 및 UX 전문가",
        description:
          "디자인이 보조 기술에서 어떻게 변환되는지 이해합니다. 대화형 요소가 적절히 레이블이 지정되고 모든 사용자에게 접근 가능하도록 보장합니다.",
      },
      qa: {
        title: "QA 엔지니어",
        description:
          "접근성 API에 대한 깊은 지식 없이 접근성 준수를 효율적으로 테스트합니다. 주의가 필요한 문제를 빠르게 발견합니다.",
      },
      teams: {
        title: "개발 팀",
        description:
          "팀 전반에 걸쳐 접근성 테스트를 표준화합니다. 도메인별 사전 설정을 사용하여 각 프로젝트에 대한 일관된 접근성 표준을 유지합니다.",
      },
    },
  },
  features: {
    title: "기능",
    items: {
      visual: {
        title: "정보 시각화",
        description:
          "이미지 대체 텍스트, 제목 수준, 폼 레이블, 테이블 구조, 목록 요소, 언어 속성, WAI-ARIA 정보 등 브라우저 단독으로는 확인하기 어려운 정보를 시각화합니다. 보조 기술이 인식하는 내용을 정확히 확인할 수 있습니다.",
      },
      detection: {
        title: "문제 감지",
        description:
          "문제가 있는 마크업이나 주의해야 할 기술에 대한 즉각적인 시각적 피드백을 받습니다. 색상으로 구분된 경고 및 오류를 통해 수정 우선순위를 정하고 접근성 위반을 빠르게 이해할 수 있습니다.",
      },
      liveRegions: {
        title: "라이브 영역",
        description:
          "스크린 리더 등 보조 기술에 동적으로 전달되는 정보를 시각적으로 표시합니다. role='status', role='alert', role='log', aria-live 속성 및 <output> 요소로 생성된 라이브 영역의 변경사항을 실시간으로 모니터링합니다.",
      },
      customizable: {
        title: "사용자 정의 가능 및 도메인별",
        description:
          "대상 웹사이트에 맞춰 요소 유형과 표시 방법을 사용자 정의합니다. 각 도메인에 대해 다른 설정을 저장하고 각 사이트에 적합한 표시 설정을 유지합니다. 사용 사례에 따라 사전 설정을 전환합니다.",
      },
    },
  },
  benefits: {
    title: "TheWCAG Accessibility Visualizer를 선택하는 이유",
    items: {
      noLearning: {
        title: "학습 곡선 없음",
        description:
          "스크린 리더 명령을 배우거나 복잡한 개발자 도구를 탐색할 필요 없이 접근성 정보를 즉시 확인할 수 있습니다. 확장 프로그램은 접근성 데이터를 즉시 이해할 수 있도록 만듭니다.",
      },
      realTime: {
        title: "실시간 피드백",
        description:
          "개발 중 즉각적인 시각적 피드백을 받습니다. 배포 후가 아닌 개발 과정에서 접근성 문제를 포착합니다.",
      },
      comprehensive: {
        title: "포괄적인 커버리지",
        description:
          "이미지, 폼, 제목, 테이블, 목록, ARIA 속성, tabindex, 숨겨진 요소 등을 시각화합니다. 페이지의 접근성 상태에 대한 완전한 전체 그림을 얻을 수 있습니다.",
      },
      integrated: {
        title: "통합된 워크플로우",
        description:
          "기존 개발 워크플로우와 원활하게 작동합니다. 시각화를 켜고 끄고, 표시 내용을 사용자 정의하고, 쉽게 재사용할 수 있도록 도메인별로 설정을 저장합니다.",
      },
    },
  },
  download: {
    title: "지금 시작하세요",
    description:
      "Chrome 웹 스토어에서 TheWCAG Accessibility Visualizer를 설치하고 몇 분 안에 웹사이트의 접근성을 개선하세요.",
    chromeStore: "Chrome 웹 스토어에서 설치",
  },
  services: {
    title: "전문 접근성 서비스",
    subtitle: "TheWCAG.com 제공",
    description:
      "TheWCAG Accessibility Visualizer는 시작에 불과합니다. TheWCAG.com은 조직이 WCAG 준수를 달성하고 유지하도록 돕는 포괄적인 접근성 서비스를 제공합니다.",
    items: {
      api: {
        title: "WCAG 접근성 스캔 API",
        description:
          "WCAG 2.1 및 2.2 준수 테스트가 포함된 자동 스캔. CI/CD 파이프라인에 강력한 접근성 스캔을 통합하거나 API 키를 사용하여 브라우저 확장 프로그램에서 Quick Scan 기능을 직접 사용할 수 있습니다.",
      },
      audits: {
        title: "접근성 감사",
        description:
          "웹사이트 및 애플리케이션에 대한 포괄적인 수동 및 자동 감사. WCAG 준수를 달성하기 위한 우선순위가 지정된 권장 사항이 포함된 상세한 보고서를 받습니다.",
      },
      consulting: {
        title: "WCAG 준수 컨설팅",
        description:
          "WCAG 준수를 달성하고 유지하기 위한 전문 가이드. 접근성 컨설턴트가 팀과 협력하여 모범 사례를 구현하고 복잡한 접근성 문제를 해결합니다.",
      },
      remediation: {
        title: "수정 서비스",
        description:
          "전문가가 접근성 문제를 수정하고 솔루션을 구현하도록 합니다. 위반 사항을 효율적으로 해결하고 사이트가 WCAG 표준을 충족하도록 도와드립니다.",
      },
      training: {
        title: "맞춤형 교육 프로그램",
        description:
          "팀에 접근성 모범 사례를 교육합니다. 개발자, 디자이너 및 콘텐츠 제작자가 접근 가능한 디지털 경험을 구축하도록 돕는 맞춤형 교육 프로그램을 제공합니다.",
      },
      monitoring: {
        title: "지속적인 모니터링",
        description:
          "사이트가 진화하면서도 준수를 유지할 수 있도록 지속적인 접근성 모니터링 및 지원을 제공합니다. 사전 예방적 모니터링으로 접근성 문제에 앞서갑니다.",
      },
    },
    cta: {
      text: "서비스에 대해 자세히 알아보기",
      url: "https://thewcag.com",
      extensionNote:
        "이 확장 프로그램에서 고급 Quick Scan 기능의 잠금을 해제하려면 TheWCAG.com에서 API 키를 받으세요.",
    },
  },
  gettingStarted: {
    title: "시작하기",
    steps: {
      step1: {
        title: "확장 프로그램 설치",
        description:
          "Chrome 웹 스토어에서 TheWCAG Accessibility Visualizer를 설치합니다. 확장 프로그램은 무료이며 설치 직후 작동합니다.",
      },
      step2: {
        title: "시각화 활성화",
        description:
          "브라우저 도구 모음의 확장 프로그램 아이콘을 클릭하여 모든 웹 페이지에서 시각화를 전환합니다. 페이지에 직접 접근성 정보가 오버레이로 표시됩니다.",
      },
      step3: {
        title: "보기 사용자 정의",
        description:
          "확장 프로그램 팝업을 열어 시각화할 요소를 사용자 정의합니다. 옵션 페이지에서 설정을 조정하여 다른 웹사이트나 사용 사례에 대한 사전 설정을 만듭니다.",
      },
      step4: {
        title: "선택 사항: API 키 추가",
        description:
          "고급 스캔 기능의 경우 TheWCAG.com에서 API 키를 받아 확장 프로그램 옵션에 추가합니다. 이를 통해 포괄적인 접근성 테스트를 위한 Quick WCAG Scan 기능이 잠금 해제됩니다.",
      },
    },
  },
  guide: {
    title: "사용자 가이드",
    description:
      "TheWCAG Accessibility Visualizer를 효과적으로 사용하는 방법을 배우세요. 모든 기능, 사용자 정의 옵션 및 모범 사례를 다루는 포괄적인 가이드입니다.",
    link: "사용자 가이드 보기",
    url: "/a11y-visualizer/docs/ko/UsersGuide",
  },
  tests: {
    title: "테스트 페이지",
    description:
      "TheWCAG Accessibility Visualizer의 동작을 확인하기 위해 다양한 구현 예제를 준비했습니다. 다른 접근성 시나리오를 테스트하고 확장 프로그램이 이를 어떻게 시각화하는지 확인합니다.",
    link: "테스트 페이지로 이동",
    url: "/a11y-visualizer/ko/tests",
  },
} as const;

export default dict;
