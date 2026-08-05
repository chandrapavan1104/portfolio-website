// portfolio.js
const portfolio = {
    // =======================
    // 🔹 Personal Information
    // =======================
    name: "Chandra Pavan Reddy Chada",
    title: "Full-Stack Engineer | GenAI Developer",
    subTitle:
      "Half logic, half caffeine, but fully committed to making weird ideas real.",
    email: "chandrapavanreddy@gmail.com",
    phone: "+1 (669) 369-9147",
    location: "San Jose, California, USA",
    resumeLink: "https://github.com/chandrapavan1104", // optional direct resume or GitHub link
    supportLink: "https://paypal.me/chandrapavan1104", // "buy me a cup" tip jar
    socialLinks: {
      linkedin: "https://linkedin.com/in/chandra-pavan",
      github: "https://github.com/chandrapavan1104",
    },
  
    // =======================
    // 🔹 Skills
    // =======================
    skills: {
      languages: ["Python", "Java", "C/C++", "JavaScript", "TypeScript", "SQL"],
      frontend: [
        "React",
        "Next.js",
        "Angular",
        "Vue",
        "Tailwind CSS",
        "Bootstrap",
        "Redux",
        "HTML5",
        "CSS3",
        "SCSS/LESS",
      ],
      backend: ["Node.js", "Express.js", "Flask", "FastAPI", "Spring Boot"],
      databases: ["PostgreSQL", "MongoDB", "MySQL", "Amazon RDS"],
      cloudDevops: [
        "AWS (EC2, S3, RDS, Lambda, ELB, CDK, IAM)",
        "Docker",
        "Jenkins",
        "Kubernetes",
        "CI/CD",
        "Serverless",
        "Prometheus",
        "Grafana",
      ],
      aiMl: [
        "AI Agents",
        "Agentic RAG",
        "LangChain",
        "Graph RAG",
        "Local LLM Inference",
        "Ollama",
        "Qwen 2.5",
        "Llama-3.3-70B",
        "OpenAI API",
        "Prompt Engineering",
        "pgvector",
        "Hugging Face",
        "Whisper",
        "Generative Video",
        "Image-to-Video Diffusion",
        "Computer Vision",
        "PyTorch",
        "TensorFlow",
        "Scikit-learn",
      ],
      tools: [
        "Git",
        "JIRA",
        "Postman",
        "BrowserStack",
        "VSCode",
        "Cursor",
        "Windsurf",
        "Claude Code",
        "Codex CLI",
        "Gemini CLI",
      ],
      others: ["REST APIs", "GraphQL", "Kafka", "Redis", "Microservices"],
    },
  
    // =======================
    // 🔹 Education
    // =======================
    education: [
      {
        degree: "Master of Science in Software Engineering",
        institution: "San Jose State University, California, USA",
        duration: "Jan 2022 – Dec 2023",
      },
      {
        degree: "Bachelor of Technology in Computer Science",
        institution: "VNR Vignana Jyothi Institute of Engineering and Technology, Hyderabad, India",
        duration: "July 2017 – May 2021",
      },
    ],
  
    // =======================
    // 🔹 Experience
    // =======================
    experience: [
      {
        title: "Software Engineer II, Applied AI",
        company: "GEICO",
        duration: "Mar 2026 – Present",
        details: [
          "Building AI-powered systems and internal platform tooling.",
        ],
      },
      {
        title: "Full-Stack Engineer",
        company: "Xnode.ai",
        duration: "July 2024 – Mar 2026",
        details: [
          "Engineered API-driven AI agents with Python and LLMs, using LangChain and Graph RAG to enable automated decision-making and intelligent data retrieval.",
          "Integrated agentic RAG with pgvector and LangChain, tuning semantic search and vectorized retrieval through OpenAI APIs, prompt engineering, and document loaders.",
          "Architected a GenAI-powered application on Angular, TypeScript, PrimeNG, and Redis with pub/sub messaging across a 3-tier web architecture.",
          "Authored GraphQL APIs and configured Prometheus and Grafana telemetry to monitor GenAI services running on Kubernetes.",
        ],
      },
      {
        title: "Software Engineer",
        company: "Oriana Software Solutions",
        duration: "Aug 2023 – July 2024",
        details: [
          "Delivered a scalable, reusable REST API service with a React front end and Python FastAPI back end for fault-tolerant client-server communication.",
          "Built and secured a Flask back end with JWT-based authentication and hardened database connections for processing sensitive data.",
        ],
      },
      {
        title: "Software Developer",
        company: "Virtu Tech Solutions",
        duration: "Aug 2020 – Jan 2022",
        details: [
          "Led development of a responsive e-commerce platform with React, Redux, and TypeScript, lifting customer engagement by 35%.",
          "Created back-end services in Java, Node.js, and Go, building REST APIs that improved data retrieval efficiency by 50%.",
          "Automated CI/CD pipelines with Jenkins and Docker, cutting deployment times by 40% while maintaining 99.9% uptime.",
        ],
      },
    ],
  
    // =======================
    // 🔹 Projects
    // =======================
    projects: [
      {
        name: "Code-as-a-Chat",
        category: "current build",
        techStack: [
          "Python",
          "FastAPI",
          "SQLite",
          "Claude Code",
          "Codex",
          "Gemini CLI",
          "Tailscale",
          "macOS",
        ],
        description:
          "An always-on dev server running on my own Mac, driven entirely from my phone in plain English. Claude Code, Codex and Gemini run as full agentic CLIs on local hardware — not a model router — so code never leaves the machine. Includes Codaur, a single dashboard for every model's live usage and limits.",
        github: "",
        demo: "",
      },
      {
        name: "Codaur",
        techStack: ["Node.js", "JavaScript", "Claude Code", "Codex", "Gemini CLI"],
        description:
          "A local CLI that reports coding-agent usage — tokens, requests and limit percentages — across Codex, Claude Code, Gemini CLI and Antigravity in one command. Reads usage files on your own machine; nothing is scraped or sent to a remote service.",
        github: "https://github.com/chandrapavan1104/Codaur",
        demo: "",
      },
      {
        name: "Meeting Notes Helper",
        techStack: ["Python", "faster-whisper", "OpenAI GPT-4o", "BlackHole", "sounddevice"],
        description:
          "A macOS CLI that silently captures meeting audio (system + microphone), transcribes it locally with Whisper, and generates an AI summary. Works with Zoom, Teams and Meet — no platform APIs, no bots, no recording notifications.",
        github: "https://github.com/chandrapavan1104/meeting-notes-helper",
        demo: "",
      },
      {
        name: "DocxChat",
        techStack: ["React", "FastAPI", "OpenAI API", "Docker", "Vite"],
        description:
          "Upload .docx templates using a {{placeholder}} convention and fill them on an interactive canvas. OpenAI detects and names each placeholder, surfaces guidance, and feeds both an inline editor and an assistant that completes the document.",
        github: "https://github.com/chandrapavan1104/DocxChat",
        demo: "",
      },
      {
        name: "Kirana.ai",
        techStack: [
          "Next.js",
          "TailwindCSS",
          "Python",
          "FastAPI",
          "Whisper",
          "Llama-3.3-70B",
          "Phidata",
        ],
        description:
          "A Gen-AI voice-activated inventory management system for Kirana shops. Integrated Whisper for multilingual transcription and Llama-3.3-70B for NLP workflows on Groq Cloud. Enables natural voice commands to add, update, and retrieve inventory.",
        github: "https://github.com/chandrapavan1104/Kirana.ai",
        demo: "", // optional demo link if deployed
      },
      {
        name: "Profile Bot",
        techStack: [
          "LangChain",
          "ChromaDB",
          "FastAPI",
          "GCP Cloud Run",
          "GCS",
          "OpenAI API",
        ],
        description:
          "AI chatbot that answers questions about my profile and experience. Uses vector database for context retrieval and LangChain for reasoning. Deployed on GCP with dynamic document ingestion.",
        github: "https://github.com/chandrapavan1104/Profile_bot",
        demo: "",
      },
      {
        name: "Flight Finder",
        techStack: ["React.js", "Flask", "REST API", "OpenSky API"],
        description:
          "AI-enabled flight search tool integrating OpenSky APIs to fetch and visualize real-time flight data with smart filtering.",
        github: "https://github.com/chandrapavan1104/FlightFinder",
        demo: "",
      },
      {
        name: "RBAC Management System",
        techStack: ["Angular", "Node.js", "Express", "PostgreSQL", "AWS RDS"],
        description:
          "SaaS-based Role-Based Access Control platform with six-level permission granularity. Includes JWT authentication, real-time role updates, and Angular UI for visualization. Reduced access management time by 40%.",
        github: "https://github.com/chandrapavan1104/RBAC",
        demo: "",
      },
      {
        name: "ChessMaster",
        techStack: ["Next.js", "TailwindCSS", "Python", "Flask", "Stockfish"],
        description:
          "Web-based chess application with AI move prediction using Stockfish. Deployed on AWS (EC2 & S3). Features include move analysis, dark mode, and interactive gameplay.",
        github: "https://github.com/chandrapavan1104/ChessMaster",
        demo: "",
      },
      {
        name: "Paint with C",
        techStack: ["Turbo C/C++"],
        description:
          "A graphics-based drawing program built using Turbo C/C++ with a 15-color palette and shape tools like line, ellipse, and rectangle. Introduced mouse interaction for freehand drawing and viewport management.",
        github: "https://github.com/chandrapavan1104/Wonders-with-C/blob/main/Paint_Tools_Final.CPP",
        demo: "",
      },
 
      {
        name: "Ecficio",
        techStack: ["React.js", "Node.js", "MongoDB", "Express", "AWS"],
        description:
          "Corporate management dashboard enabling admins to manage company workflows with real-time metrics and role-based access.",
        github: "https://github.com/chandrapavan1104/Ecficio",
        demo: "",
      },

      {
        name: "Fitnessclub",
        techStack: [
          "Angular CLI 9.1.5",
          "Node.js",
          "JavaScript",
          "TypeScript",
          "HTML",
          "SCSS",
          "Karma",
          "Protractor"
        ],
        description: "A MEAN stack web application designed for a Fitness Store. It features a full-stack architecture with an Angular front-end for a modern user experience and a Node.js/Express.js back-end for handling user accounts, fitness course listings, and other store functionalities.",
        github: "https://github.com/chandrapavan1104/Fitnessclub",
        demo: ""
      },
      {
        name: "Recipe_Store",
        techStack: [
          "React (JavaScript/CSS/HTML)",
          "Django (Python)",
          "Python",
          "JavaScript",
          "HTML",
          "CSS"
        ],
        description: "A full-stack web application for a Recipe Store, serving as a go-to platform for users to find and try new food recipes. It utilizes a React framework for the modern, dynamic front-end user interface and Django (Python-based) for the robust back-end.",
        github: "https://github.com/chandrapavan1104/Recipe_Store",
        demo: ""
      }
    ],
  
    // =======================
    // 🔹 About Me
    // =======================
    about:
      "Hi, I’m Chandra Pavan Reddy Chada, a passionate Full-Stack Engineer specializing in building scalable and intelligent web applications. I love integrating AI and automation into everyday products using technologies like React, Angular, Python, and Node.js. My work spans from creating GenAI-powered agents and RAG systems to designing efficient SaaS platforms and real-time dashboards. I believe in writing clean, maintainable code and constantly learning new tools that make technology more impactful." ,
    // =======================
    // 🔹 Contact Info
    // =======================
    contact: {
      email: "chandrapavanreddy@gmail.com",
      linkedin: "https://linkedin.com/in/chandra-pavan",
      github: "https://github.com/chandrapavan1104",
    },
  };
  
  export default portfolio;
