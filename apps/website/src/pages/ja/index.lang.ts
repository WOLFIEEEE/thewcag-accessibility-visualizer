const dict = {
  subtitle: "かんたん、「見える」Webアクセシビリティ",
  hero: {
    title: "Webアクセシビリティを、見る",
    description:
      "スクリーンリーダーなどの支援技術のユーザーが知覚している情報を、Chromeで簡単に確認できる拡張機能です。開発者やデザイナーにとって、アクセシビリティを可視化し、実用的なものにします。",
    screenshotSrc: "/thewcag-accessibility-visualizer/images/screenshot_ja.jpg",
  },
  about: {
    title: "TheWCAG Accessibility Visualizerについて",
    description:
      "TheWCAG Accessibility Visualizerは、Webアクセシビリティへの取り組み方を変革します。見えないアクセシビリティ情報を可視化することで、開発者が簡単にアクセシビリティデータを理解できるようになります。",
    valueProposition:
      "この強力なツールは、開発者、デザイナー、QAエンジニアが開発中にアクセシビリティの問題を特定して修正するのに役立ち、支援技術による広範囲なテストの必要性を減らしながら、サイトがすべての人にアクセシブルであることを確保します。",
  },
  useCases: {
    title: "TheWCAG Accessibility Visualizerの活用シーン",
    items: {
      developers: {
        title: "Web開発者",
        description:
          "コーディング中に、欠落している代替テキスト、見出し階層の問題、ARIAの設定ミスを素早く特定。本番環境に到達する前にアクセシビリティの問題を修正します。",
      },
      designers: {
        title: "デザイナー・UX専門家",
        description:
          "デザインが支援技術でどのように変換されるかを理解します。インタラクティブ要素が適切にラベル付けされ、すべてのユーザーにアクセシブルであることを確保します。",
      },
      qa: {
        title: "QAエンジニア",
        description:
          "アクセシビリティAPIの深い知識なしに、アクセシビリティコンプライアンスを効率的にテストします。注意が必要な問題を素早く発見します。",
      },
      teams: {
        title: "開発チーム",
        description:
          "チーム全体でアクセシビリティテストを標準化します。ドメイン固有のプリセットを使用して、各プロジェクトの一貫したアクセシビリティ基準を維持します。",
      },
    },
  },
  features: {
    title: "機能",
    items: {
      visual: {
        title: "情報の可視化",
        description:
          "画像の代替テキスト、見出しレベル、フォームラベル、テーブル構造、リスト要素、言語属性、WAI-ARIA情報など、ブラウザ単体では確認しづらい情報を可視化。支援技術が認識する内容を正確に確認できます。",
      },
      detection: {
        title: "問題の検出",
        description:
          "問題のあるマークアップや注意すべきテクニックに関する即座の視覚的フィードバックを取得。色分けされた警告とエラーにより、修正の優先順位を決め、アクセシビリティ違反を素早く理解できます。",
      },
      liveRegions: {
        title: "ライブリージョン",
        description:
          "スクリーンリーダーなどの支援技術に動的に伝わる情報を視覚的に表示。role='status'、role='alert'、role='log'、aria-live属性、<output>要素によって作成されたライブリージョンの変更をリアルタイムで監視します。",
      },
      customizable: {
        title: "カスタマイズ可能・ドメイン固有",
        description:
          "対象のWebサイトにあわせて、要素の種類や表示方法をカスタマイズ。各ドメインごとに異なる設定を保存し、各サイトに適した表示設定を維持します。用途に応じてプリセットを切り替えます。",
      },
    },
  },
  benefits: {
    title: "TheWCAG Accessibility Visualizerを選ぶ理由",
    items: {
      noLearning: {
        title: "学習曲線なし",
        description:
          "スクリーンリーダーのコマンドを学んだり、複雑な開発者ツールを操作したりすることなく、アクセシビリティ情報を即座に確認できます。拡張機能により、アクセシビリティデータがすぐに理解できるようになります。",
      },
      realTime: {
        title: "リアルタイムフィードバック",
        description:
          "開発中に即座の視覚的フィードバックを取得。デプロイ後ではなく、開発プロセス中にアクセシビリティの問題をキャッチします。",
      },
      comprehensive: {
        title: "包括的なカバレッジ",
        description:
          "画像、フォーム、見出し、テーブル、リスト、ARIA属性、tabindex、非表示要素などを可視化。ページのアクセシビリティ状態の完全な全体像を把握できます。",
      },
      integrated: {
        title: "統合されたワークフロー",
        description:
          "既存の開発ワークフローとシームレスに動作。可視化をオン/オフで切り替え、表示内容をカスタマイズし、簡単に再利用できるようドメインごとに設定を保存します。",
      },
    },
  },
  download: {
    title: "今すぐ始めましょう",
    description:
      "Chrome ウェブストアからTheWCAG Accessibility Visualizerをインストールして、数分でウェブサイトのアクセシビリティを向上させましょう。",
    chromeStore: "Chrome ウェブストアからインストール",
  },
  services: {
    title: "プロフェッショナルなアクセシビリティサービス",
    subtitle: "TheWCAG.com提供",
    description:
      "TheWCAG Accessibility Visualizerは始まりに過ぎません。TheWCAG.comは、組織がWCAGコンプライアンスを達成し維持するのを支援する包括的なアクセシビリティサービスを提供します。",
    items: {
      api: {
        title: "WCAGアクセシビリティスキャンAPI",
        description:
          "WCAG 2.1および2.2コンプライアンステストを備えた自動スキャン。CI/CDパイプラインに強力なアクセシビリティスキャンを統合するか、APIキーを使用してブラウザ拡張機能でQuick Scan機能を直接使用できます。",
      },
      audits: {
        title: "アクセシビリティ監査",
        description:
          "ウェブサイトとアプリケーションの包括的な手動および自動監査。WCAGコンプライアンス達成のための優先順位付けされた推奨事項を含む詳細なレポートを取得します。",
      },
      consulting: {
        title: "WCAGコンプライアンスコンサルティング",
        description:
          "WCAGコンプライアンスの達成と維持に関する専門的なガイダンス。アクセシビリティコンサルタントがチームと協力してベストプラクティスを実装し、複雑なアクセシビリティの課題に対処します。",
      },
      remediation: {
        title: "修復サービス",
        description:
          "専門家がアクセシビリティの問題を修正し、ソリューションを実装します。違反を効率的に対処し、サイトがWCAG基準を満たすことを確保します。",
      },
      training: {
        title: "カスタムトレーニングプログラム",
        description:
          "チームにアクセシビリティのベストプラクティスをトレーニング。開発者、デザイナー、コンテンツ作成者がアクセシブルなデジタル体験を構築するのを支援するカスタマイズされたトレーニングプログラムを提供します。",
      },
      monitoring: {
        title: "継続的な監視",
        description:
          "サイトが進化してもコンプライアンスを維持できるよう、継続的なアクセシビリティ監視とサポートを提供。プロアクティブな監視により、アクセシビリティの問題に先手を打ちます。",
      },
    },
    cta: {
      text: "サービスについて詳しく見る",
      url: "https://thewcag.com",
      extensionNote:
        "この拡張機能で高度なQuick Scan機能のロックを解除するには、TheWCAG.comからAPIキーを取得してください。",
    },
  },
  gettingStarted: {
    title: "はじめに",
    steps: {
      step1: {
        title: "拡張機能をインストール",
        description:
          "Chrome ウェブストアからTheWCAG Accessibility Visualizerをインストールします。拡張機能は無料で、インストール後すぐに動作します。",
      },
      step2: {
        title: "可視化を有効化",
        description:
          "ブラウザのツールバーにある拡張機能アイコンをクリックして、任意のウェブページで可視化を切り替えます。ページ上に直接アクセシビリティ情報がオーバーレイ表示されます。",
      },
      step3: {
        title: "表示をカスタマイズ",
        description:
          "拡張機能のポップアップを開いて、可視化する要素をカスタマイズします。オプションページで設定を調整して、異なるウェブサイトや用途のプリセットを作成します。",
      },
      step4: {
        title: "オプション：APIキーを追加",
        description:
          "高度なスキャン機能の場合、TheWCAG.comからAPIキーを取得し、拡張機能のオプションに追加します。これにより、包括的なアクセシビリティテストのためのQuick WCAG Scan機能が解除されます。",
      },
    },
  },
  guide: {
    title: "ユーザーガイド",
    description:
      "TheWCAG Accessibility Visualizerを効果的に使用する方法を学びます。すべての機能、カスタマイズオプション、ベストプラクティスをカバーする包括的なガイドです。",
    link: "ユーザーガイドを見る",
    url: "/thewcag-accessibility-visualizer/docs/ja/UsersGuide",
  },
  tests: {
    title: "テスト用ページ",
    description:
      "TheWCAG Accessibility Visualizerの動作を確認するために、様々な実装例を用意しています。異なるアクセシビリティシナリオをテストし、拡張機能がそれらをどのように可視化するかを確認します。",
    link: "テスト用ページへ",
    url: "/thewcag-accessibility-visualizer/ja/tests",
  },
} as const;

export default dict;
