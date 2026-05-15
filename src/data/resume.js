const DATA = {
  name: "Rajaram Magar",
  role: "Backend Engineer building high-scale financial systems & AI-driven solutions",
  bio: "Software Engineer with ~3 years of experience building high-performance, secure, and scalable Java-based backend systems in the banking and financial domain. Specialized in Spring Boot microservices, event-driven architectures, real-time financial transaction processing, and AI-integrated backend systems.",
  stats: [
    { num: "3", label: "Years Experience" },
    { num: "25+", label: "REST APIs Built" },
    { num: "9.56", label: "CGPA — B.Tech CS" },
    { num: "10+", label: "Production Microservices Shipped" },
    { num: "150+", label: "DSA Problems Solved" },
  ],
  certifications: [
    "AWS Certified Solutions Architect – Associate",
    "Google Cloud Certified Generative AI Leader",
  ],
  skills: [
    {
      icon: "☕",
      title: "Backend Engineering",
      tags: ["Java 8/11/17", "Spring Boot", "Spring Security", "JPA/Hibernate", "REST API Design", "HttpClient", "LLM Integration"],
    },
    {
      icon: "🗄️",
      title: "Databases",
      tags: ["PostgreSQL", "MySQL", "Schema Design", "Query Optimization"],
    },
    {
      icon: "☁️",
      title: "Cloud & DevOps",
      tags: ["AWS EC2/RDS/S3", "Docker", "Jenkins", "GitHub Actions", "CI/CD", "OpenShift", "ELK Stack"],
    },
    {
      icon: "🔗",
      title: "Architecture & Messaging",
      tags: ["System Design", "Concurrency", "Idempotency", "Microservices", "Event-Driven", "RabbitMQ", "Prompt Engineering", "API Gateway"],
    },
    {
      icon: "🧪",
      title: "Testing & Other",
      tags: ["JUnit", "Mockito", "SQL", "Python", "DSA"],
    },
  ],
  projects: [
    {
      title: "AI Stock Movement Prediction Agent",
      desc: "Building an AI-powered stock movement prediction system that aggregates financial news, YouTube/Twitter/Reddit sentiment, and technical indicators (RSI, SMA) to forecast price movements across T+1, T+5, T+30 day timeframes. Uses LLM-based sentiment extraction pipelines and XGBoost models on engineered features. Modular agent-based architecture using LangChain.",
      stack: ["Python", "LangChain", "XGBoost", "Pandas", "LLM APIs", "Feature Engineering", "ML Pipeline"],
      github: null,
      frontendGithub: null,
      demo: null,
      academic: false,
      personal: true,
    },
    {
      title: "BIAN Mapping AI Automation Tool",
      desc: "AI-powered platform that maps core banking APIs to BIAN (Banking Industry Architecture Network) standard using GPT-4o. Built a two-leg LLM pipeline: Leg 1 uses GPT-4o Vision to parse API spec PDFs by rendering pages as images and extracting structured field metadata; Leg 2 sends the confirmed metadata with a curated BIAN corpus to GPT-4o for semantic field-level mapping with confidence scoring.\n\nFeatures a conversational React chatbot UI with multi-source input (Swagger URL, Swagger file, PDF upload), human-in-the-loop PDF metadata review before BIAN mapping runs, and a result card showing service domain, alignment score (0–100), field mappings, and compliance gaps.",
      stack: ["Java 17", "Spring Boot 3.2", "GPT-4o", "GPT-4o Vision", "React", "PDFBox", "swagger-parser", "WebClient"],
      github: null,
      frontendGithub: null,
      demo: null,
      academic: false,
      personal: true,
    },
    {
      title: "Personal Finance Manager",
      desc: "Built a secure full-stack financial management platform with JWT authentication, real-time dashboard analytics, and category-wise budgeting system built with Java Spring Boot and ReactJS. Features secure JWT-based user authentication, editable user profiles, a visual income/expenses/savings dashboard, category-wise budget tracking with real-time updates, and transaction management with monthly filters.",
      stack: ["Java", "Spring Boot", "ReactJS", "PostgreSQL", "JWT"],
      github: "https://github.com/Rajarammagar15/personal-finance-manager-spring-boot.git",
      frontendGithub: "https://github.com/Rajarammagar15/personal-finance-manager-react.git",
      demo: null,
      academic: false,
      personal: true,
    },
    {
      title: "Face Recognition Model",
      desc: "Feed-forward neural network for high-accuracy facial recognition and authentication. Trained and tested across multiple benchmark datasets, achieving ~100% test accuracy with near-perfect precision, recall, and F1-score. A robust solution for security and biometric identification systems.",
      stack: ["Python", "Deep Learning", "Neural Networks", "PyTorch"],
      github: null,
      demo: null,
      academic: true,
      personal: false,
    },
  ],
  experience: [
    {
      period: "Aug 2023 — Present",
      company: "Tata Consultancy Services",
      role: "Software Engineer",
      location: "Pune, Maharashtra",
      sections: [
        {
          label: "Banking & Financial Services Domain",
          bullets: [
            "High-volume financial transaction systems (wallets, prepaid cards, banking integrations)",
            "Designed and developed 10+ Spring Boot microservices handling high-volume financial transactions including digital wallets, prepaid virtual cards (top-up/redemption), and core banking integrations.",
            "Built and optimized 25+ REST APIs, improving average response time by 20–30% through query tuning and structured exception handling.",
            "Implemented idempotent transaction mechanisms, reducing duplicate financial operations by 40% during retry scenarios.",
            "Integrated 5+ downstream banking systems using Feign clients with timeout, fallback, and retry strategies — improving failure recovery by 30%.",
            "Designed event-driven workflows using RabbitMQ, reducing synchronous system load by 35% and improving service scalability.",
            "Resolved wallet balance concurrency issues using transactional boundaries and validation controls, ensuring near-100% transaction consistency.",
            "Secured APIs with Spring Security and role-based access control (RBAC) for agent authentication and authorization.",
            "Reduced production issue resolution time by 40% via centralized logging and traceability through ELK Stack.",
            "Maintained 80%+ unit test coverage for core services using JUnit and Mockito.",
            "Containerized microservices with Docker and deployed via Jenkins CI/CD pipelines, reducing deployment effort by 50%.",
          ],
        },
        {
          label: "Engineering Automation Initiative",
          bullets: [
            "Built an internal API Initializer tool to auto-generate controller, service, mapper, and model layers from structured Excel inputs.",
            "Reduced new service setup time by 60–70% and standardized backend development practices across teams.",
            "Built an AI-powered BIAN Mapping Automation Tool using Java Spring Boot and GPT-4o, reducing manual API documentation time from 4–8 hours per API to under 60 seconds — adopted for architecture review and partner onboarding workflows."
          ],
        },
        {
          label: "Data Architecture & Migration",
          bullets: [
            "Contributed to migration of legacy in-memory DataGrid storage to a relational database architecture.",
            "Improved data fetch performance by 25–30% using in-memory caching and optimized batch processing strategies.",
            "Ensured data consistency and zero-loss migration during the full system transition.",
          ],
        },
      ],
    },
  ],
  education: {
    degree: "B.Tech — Computer Science Engineering",
    college: "Government College of Engineering, Chandrapur",
    period: "Aug 2019 — June 2023",
    cgpa: "9.56 / 10.0",
  },
  contact: {
    email: "rajarammagar101@gmail.com",
    portfolio: "rajarammagar.vercel.app",
    location: "Pune, Maharashtra",
    github: "github.com/Rajarammagar15",
    linkedin: "linkedin.com/in/rajaram-magar",
  },
};

export default DATA;
