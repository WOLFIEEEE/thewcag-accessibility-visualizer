const dict = {
  subtitle: "Simple and Visible Web Accessibility",
  hero: {
    title: "Visualize Web Accessibility",
    description:
      "A browser extension that lets you easily view information perceived by users of assistive technologies like screen readers, directly in Chrome. Make accessibility visible and actionable for developers and designers.",
    screenshotSrc: "/a11y-visualizer/images/screenshot_en.png",
  },
  about: {
    title: "About TheWCAG Accessibility Visualizer",
    description:
      "TheWCAG Accessibility Visualizer transforms how developers approach web accessibility by making invisible accessibility information visible. Instead of digging through accessibility trees or learning screen reader commands, you can now see critical accessibility data directly overlaid on web pages.",
    valueProposition:
      "This powerful tool helps developers, designers, and QA engineers identify and fix accessibility issues during development, reducing the need for extensive testing with assistive technologies while ensuring your sites are accessible to everyone.",
  },
  useCases: {
    title: "Who Benefits from TheWCAG Accessibility Visualizer?",
    items: {
      developers: {
        title: "Web Developers",
        description:
          "Quickly identify missing alt text, heading hierarchy issues, and ARIA misconfigurations while coding. Fix accessibility issues before they reach production.",
      },
      designers: {
        title: "Designers & UX Professionals",
        description:
          "Understand how your designs translate to assistive technologies. Ensure interactive elements are properly labeled and accessible to all users.",
      },
      qa: {
        title: "QA Engineers",
        description:
          "Efficiently test accessibility compliance without requiring deep knowledge of accessibility APIs. Quickly spot issues that need attention.",
      },
      teams: {
        title: "Development Teams",
        description:
          "Standardize accessibility testing across your team. Use domain-specific presets to maintain consistent accessibility standards for each project.",
      },
    },
  },
  features: {
    title: "Features",
    items: {
      visual: {
        title: "Information Visualization",
        description:
          "Visualize information that's hard to check with browsers alone, such as image alt text, heading levels, form labels, table structures, list elements, language attributes, and WAI-ARIA information. See exactly what assistive technologies perceive.",
      },
      detection: {
        title: "Issue Detection",
        description:
          "Get instant visual feedback on problematic markup and techniques that need attention. Color-coded warnings and errors help you prioritize fixes and understand accessibility violations quickly.",
      },
      liveRegions: {
        title: "Live Regions",
        description:
          "Visually display information dynamically conveyed to assistive technologies like screen readers. Monitor changes in live regions created by role='status', role='alert', role='log', aria-live attributes, and <output> elements in real-time.",
      },
      customizable: {
        title: "Customizable & Domain-Specific",
        description:
          "Customize element types and display methods to match your target website. Save different settings for each domain and maintain appropriate display settings for each site. Switch between presets for different use cases.",
      },
    },
  },
  benefits: {
    title: "Why Choose TheWCAG Accessibility Visualizer?",
    items: {
      noLearning: {
        title: "No Learning Curve",
        description:
          "See accessibility information instantly without learning screen reader commands or navigating complex developer tools. The extension makes accessibility data immediately understandable.",
      },
      realTime: {
        title: "Real-Time Feedback",
        description:
          "Get immediate visual feedback as you develop. Catch accessibility issues during the development process, not after deployment.",
      },
      comprehensive: {
        title: "Comprehensive Coverage",
        description:
          "Visualize images, forms, headings, tables, lists, ARIA attributes, tabindex, hidden elements, and more. Get a complete picture of your page's accessibility state.",
      },
      integrated: {
        title: "Integrated Workflow",
        description:
          "Works seamlessly with your existing development workflow. Toggle visualization on and off, customize what you see, and save settings per domain for easy reuse.",
      },
    },
  },
  download: {
    title: "Get Started Today",
    description:
      "Install TheWCAG Accessibility Visualizer from the Chrome Web Store and start improving your website's accessibility in minutes.",
    chromeStore: "Install from Chrome Web Store",
  },
  services: {
    title: "Professional Accessibility Services",
    subtitle: "Powered by TheWCAG.com",
    description:
      "TheWCAG Accessibility Visualizer is just the beginning. TheWCAG.com offers comprehensive accessibility services to help organizations achieve and maintain WCAG compliance.",
    items: {
      api: {
        title: "WCAG Accessibility Scanning API",
        description:
          "Automated scanning with WCAG 2.1 and 2.2 compliance testing. Integrate powerful accessibility scanning into your CI/CD pipeline or use our Quick Scan feature directly in the browser extension with an API key.",
      },
      audits: {
        title: "Accessibility Audits",
        description:
          "Comprehensive manual and automated audits of your websites and applications. Get detailed reports with prioritized recommendations for achieving WCAG compliance.",
      },
      consulting: {
        title: "WCAG Compliance Consulting",
        description:
          "Expert guidance on achieving and maintaining WCAG compliance. Our accessibility consultants work with your team to implement best practices and address complex accessibility challenges.",
      },
      remediation: {
        title: "Remediation Services",
        description:
          "Let our experts fix accessibility issues and implement solutions. We'll help you address violations efficiently and ensure your sites meet WCAG standards.",
      },
      training: {
        title: "Custom Training Programs",
        description:
          "Train your team on accessibility best practices. We offer customized training programs to help your developers, designers, and content creators build accessible digital experiences.",
      },
      monitoring: {
        title: "Continuous Monitoring",
        description:
          "Ongoing accessibility monitoring and support to ensure your sites remain compliant as they evolve. Stay ahead of accessibility issues with proactive monitoring.",
      },
    },
    cta: {
      text: "Learn More About Our Services",
      url: "https://thewcag.com",
      extensionNote:
        "Get an API key from TheWCAG.com to unlock advanced Quick Scan features in this extension.",
    },
  },
  gettingStarted: {
    title: "Getting Started",
    steps: {
      step1: {
        title: "Install the Extension",
        description:
          "Install TheWCAG Accessibility Visualizer from the Chrome Web Store. The extension is free and works immediately after installation.",
      },
      step2: {
        title: "Enable Visualization",
        description:
          "Click the extension icon in your browser toolbar to toggle visualization on any webpage. You'll see accessibility information overlaid directly on the page.",
      },
      step3: {
        title: "Customize Your View",
        description:
          "Open the extension popup to customize which elements you want to visualize. Adjust settings in the options page to create presets for different websites or use cases.",
      },
      step4: {
        title: "Optional: Add API Key",
        description:
          "For advanced scanning features, get an API key from TheWCAG.com and add it in the extension options. This unlocks Quick WCAG Scan functionality for comprehensive accessibility testing.",
      },
    },
  },
  guide: {
    title: "User Guide",
    description:
      "Learn how to use TheWCAG Accessibility Visualizer effectively. Our comprehensive guide covers all features, customization options, and best practices.",
    link: "View User Guide",
    url: "/a11y-visualizer/docs/UsersGuide",
  },
  tests: {
    title: "Test Pages",
    description:
      "We've prepared various implementation examples for you to verify TheWCAG Accessibility Visualizer's functionality. Test different accessibility scenarios and see how the extension visualizes them.",
    link: "Go to Test Pages",
    url: "/a11y-visualizer/tests",
  },
} as const;

export default dict;
