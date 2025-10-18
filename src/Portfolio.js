// portfolio.js
const portfolio = {
    // =======================
    // 🔹 Personal Information
    // =======================
    name: "Chandra Pavan Reddy Chada",
    title: "Full-Stack Engineer | AI & GenAI Developer",
    subTitle:
      "Passionate Software Engineer specialized in full-stack and AI-powered application development. I love building scalable systems, integrating LLMs, and creating innovative web solutions using React, Angular, and Python backends.",
    email: "chandrapavanreddy@gmail.com",
    phone: "+1 (669) 369-9147",
    location: "San Jose, California, USA",
    resumeLink: "https://github.com/chandrapavan1104", // optional direct resume or GitHub link
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
        "AWS (EC2, S3, RDS, Lambda, ELB)",
        "Docker",
        "Jenkins",
        "Kubernetes",
        "CI/CD",
      ],
      aiMl: [
        "PyTorch",
        "TensorFlow",
        "LangChain",
        "RAG",
        "Hugging Face",
        "Whisper",
        "Llama-3.3-70B",
      ],
      tools: [
        "Git",
        "JIRA",
        "Postman",
        "BrowserStack",
        "VSCode",
        "Cursor",
        "Windsurf",
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
        institution: "India",
        duration: "",
      },
    ],
  
    // =======================
    // 🔹 Experience
    // =======================
    experience: [
      {
        title: "Full-Stack Engineer",
        company: "Xnode.ai",
        duration: "July 2024 – Present",
        details: [
          "Built AI-powered agents using LangChain, Graph RAG, and OpenAI APIs for intelligent data retrieval.",
          "Integrated Angular and Redis-based architecture for real-time responsiveness.",
          "Developed GraphQL APIs to optimize payloads and improve latency by 30%.",
        ],
      },
      {
        title: "Software Engineer",
        company: "Oriana Software Solutions",
        duration: "Aug 2023 – July 2024",
        details: [
          "Developed REST APIs with FastAPI backend and React frontend using Redux and Tailwind CSS.",
          "Implemented JWT authentication and built fault-tolerant API communication.",
        ],
      },
      {
        title: "Software Developer",
        company: "VirtuTech Solutions",
        duration: "Jan 2020 – Jan 2022",
        details: [
          "Developed e-commerce and logistics apps using React, TypeScript, and Node.js.",
          "Automated CI/CD with AWS CodePipeline and Docker, reducing deployment time by 40%.",
        ],
      },
    ],
  
    // =======================
    // 🔹 Projects
    // =======================
    projects: [
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
        github: "",
        demo: "",
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
        name: "Ecficio",
        techStack: ["React.js", "Node.js", "MongoDB", "Express", "AWS"],
        description:
          "Corporate management dashboard enabling admins to manage company workflows with real-time metrics and role-based access.",
        github: "",
        demo: "",
      },
      {
        name: "Flight Finder",
        techStack: ["React.js", "Flask", "REST API", "OpenSky API"],
        description:
          "AI-enabled flight search tool integrating OpenSky APIs to fetch and visualize real-time flight data with smart filtering.",
        github: "",
        demo: "",
      },
    ],
  
    // =======================
    // 🔹 About Me
    // =======================
    about:
      "Hi! I’m Chandra Pavan Reddy Chada, a Full-Stack Engineer passionate about building scalable, AI-integrated applications. I enjoy designing systems that blend performance with intelligence — from GenAI agents and real-time dashboards to automation and conversational systems. I focus on clean architecture, modular design, and continuous learning.",
  
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