const dict = {
  header: {
    subtitle: "테스트 페이지",
  },
  notice: {
    title: "테스트 페이지 주의사항",
    p1: "이 페이지는 테스트 및 시연 목적으로 의도적으로 접근성 문제가 있는 패턴을 포함하고 있습니다.",
    p2: "이 예제를 프로덕션 웹사이트에서 사용하지 마세요. 이는 접근성 가이드라인 및 모범 사례를 위반합니다.",
    p3: "이 페이지는 TheWCAG Accessibility Visualizer 브라우저 확장 프로그램과 함께 작동하도록 설계되어 개발자가 접근성 문제를 식별하고 이해하는 데 도움을 줍니다.",
  },
  intro: {
    title: "테스트 예제",
    desc: "이 페이지는 TheWCAG Accessibility Visualizer 브라우저 확장 프로그램의 테스트 장으로 제공됩니다. 접근성 문제가 있는 다양한 웹 요소 예제를 포함하여 확장 프로그램이 문제를 강조하고 접근 가능한 대안에 대한 정보를 제공하는 방법을 시연합니다.",
  },
  categories: {
    title: "카테고리",
    headings: {
      images: "이미지",
      buttons: "버튼",
      links: "링크",
      forms: "폼 컨트롤",
      headings: "제목",
      tables: "테이블",
      ariaHidden: "ARIA Hidden",
      landmarks: "레이아웃 및 랜드마크",
      liveRegions: "라이브 영역",
    },
  },
} as const;

export default dict;
