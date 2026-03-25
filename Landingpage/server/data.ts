export const LANDING_DATA = {
  navigation: {
    brandName: 'SymbyAI',
    navLinks: [
      { name: 'About', href: '#about' },
      { name: 'Process', href: '#process' },
      { name: 'FAQ', href: '#faq' },
      { name: 'News', href: '#news' },
      { name: 'Contact', href: '#contact' },
    ]
  },
  hero: {
    badge: "Accelerating Scientific Research",
    title: {
      prefix: "SymbyAI automates ",
      highlight: "peer review",
      suffix: ", replication, and analysis."
    },
    description: "Empowering researchers with AI-driven tools to ensure scientific integrity and speed up the path to discovery.",
    cta: {
      primary: "Join Waitlist",
      secondary: "Learn More"
    }
  },
  featureCards: [
    { icon: "FileSearch", label: "Peer Review", color: "text-blue-500" },
    { icon: "RefreshCw", label: "Replication", color: "text-primary-dark" },
    { icon: "Zap", label: "Rapid Analysis", color: "text-yellow-500" }
  ],
  crisis: {
    title: "The Research Crisis",
    description: "Scientific progress is being throttled by a reproducibility crisis and an overwhelmed peer review system. Thousands of papers are published daily, yet many lack the rigorous verification needed for true scientific advancement.",
    issues: [
      "Overwhelmed peer review networks",
      "Lack of standardized replication methods",
      "Data manipulation and integrity issues",
      "Slow analysis cycles delaying breakthroughs"
    ],
    statusBadge: "REJECTED"
  },
  process: {
    title: "Research Reimagined",
    description: "We've built a pipeline that brings industrial-scale automation to the heart of scientific verification.",
    steps: [
      {
        title: "Automated Peer Review",
        description: "Our AI models analyze manuscripts for logical consistency, statistical validity, and adherence to reporting standards.",
        icon: "Microscope"
      },
      {
        title: "Method Replication",
        description: "Automatically extract and simulate experimental methodologies to verify if results can be reproduced computationally.",
        icon: "RefreshCw"
      },
      {
        title: "Data Integrity Check",
        description: "Advanced detection of data manipulation, image tampering, and statistical anomalies that human reviewers might miss.",
        icon: "ShieldCheck"
      },
      {
        title: "Rapid Analysis",
        description: "Get comprehensive feedback and verification reports in under 15 minutes, accelerating the publication cycle.",
        icon: "Zap"
      }
    ]
  },
  beta: {
    title: "Closed Beta",
    description: "We are currently partnering with select research institutions and publishers to refine our models. Individual beta access launches early 2026.",
    waitlistPrompt: "Why join the waitlist?",
    benefits: [
      "Early access to the analysis engine",
      "Priority support for your institution",
      "Influence the product roadmap",
      "Exclusive research integrity reports"
    ],
    cta: "Secure Your Spot"
  },
  faq: {
    title: "Frequently Asked Questions",
    faqs: [
      {
        q: "How does SymbyAI ensure accuracy?",
        a: "Our models are trained on millions of peer-reviewed papers and verified datasets. We use a multi-agent system where different models cross-check each other's findings before generating a final report."
      },
      {
        q: "Is my data secure?",
        a: "Yes. We employ enterprise-grade encryption and do not use your proprietary research data to train our public models without explicit consent."
      },
      {
        q: "Which research fields do you support?",
        a: "Currently, we have strong performance in Life Sciences, Physics, and Computer Science. We are rapidly expanding into Social Sciences and Humanities."
      },
      {
        q: "Can SymbyAI replace human reviewers?",
        a: "SymbyAI is designed to augment human expertise, not replace it. We automate the 'grunt work' of checking data and methods, allowing human reviewers to focus on high-level conceptual novelty."
      }
    ]
  },
  news: {
    title: "Latest News",
    subtitle: "Updates from the frontier of scientific AI.",
    cta: "View all",
    articles: [
      {
        date: "March 15, 2026",
        title: "SymbyAI Partners with Global Research Council",
        category: "Partnership"
      },
      {
        date: "February 28, 2026",
        title: "New Benchmark: AI Outperforms Humans in Data Anomaly Detection",
        category: "Research"
      },
      {
        date: "January 10, 2026",
        title: "Announcing our $12M Seed Round to Scale Scientific Integrity",
        category: "Company"
      }
    ]
  },
  contact: {
    title: "Get in touch",
    description: "Have questions about institutional access or partnership opportunities? We'd love to hear from you.",
    email: "hello@symbyai.com",
    form: {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      message: "Message",
      submit: "Send Message"
    }
  },
  footer: {
    brand: "SymbyAI",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" }
    ],
    copyright: `© ${new Date().getFullYear()} SymbyAI. All rights reserved.`
  }
};
