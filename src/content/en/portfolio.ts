import type { PortfolioContent } from "@/types/portfolio";

export const portfolioEn: PortfolioContent = {
  nav: {
    about: "About",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    stack: "Stack",
    architecture: "Architecture",
    contact: "Contact",
  },
  hero: {
    name: "Ricardo Israel Vázquez Domínguez",
    role: "Backend Engineer | Java · Transactional systems · Secure APIs · SQL",
    tagline:
      "Experience building enterprise applications for the financial sector, with a focus on Java services, REST APIs, application security, and data optimization.",
    badge: "Java Backend Developer",
    imageAlt: "Workspace of Ricardo Israel Vázquez Domínguez",
    cta: {
      experience: "View experience",
      cv: "Download resume",
      contact: "Contact",
    },
  },
  about: {
    title: "Professional profile",
    intro:
      "Java Backend Developer with experience in the financial sector developing enterprise applications using Java, Spring Boot, Spring Security, JPA/Hibernate, and SQL. Experience with REST APIs, multilayer architecture, SOLID principles, MVC, SQL query optimization, Scrum, Git, and Linux. Focused on clean code, security, performance, and scalability.",
    securityLearning:
      "Currently developing cybersecurity knowledge alongside his Java backend specialization. His CV-verified security foundation includes Spring Security, OWASP Top 10, SSL/TLS, and JWT.",
    strengthsTitle: "Professional strengths",
    strengths: [
      "Critical analysis",
      "Problem solving",
      "Analytical thinking",
      "Adaptability",
      "Technical communication",
    ],
    languagesTitle: "Languages",
    languages: ["Spanish: Native", "English: Good (B2)"],
  },
  projects: {
    title: "Featured public project",
    description:
      "Published code to review implementation quality and product thinking.",
    items: [
      {
        title: "QR Generator",
        description:
          "A web utility published as a personal project. Its repository is available to review the implementation and its technical evolution.",
        technologies: ["TypeScript"],
        repositoryUrl: "https://github.com/ricardovaz967/generador-QR",
        repositoryLabel: "View repository",
      },
    ],
  },
  experience: [
    {
      period: "October 2024 – May 2026",
      title: "Backend Developer / DBA",
      company: "Banco del Bienestar",
      responsibilities: [
        "Development and maintenance of backend services with Java and Spring Boot.",
        "Validation and integration of REST APIs for banking applications.",
        "Administration and optimization of SQL Server databases.",
        "Implementation and optimization of SQL queries.",
        "Diagnosis and resolution of incidents in critical environments.",
        "Validation of services and application stability.",
        "Git repository administration.",
        "Collaboration using Scrum.",
        "Work in Linux environments.",
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "SQL Server", "Git", "Scrum", "Linux"],
    },
    {
      period: "January 2023 – May 2023",
      title: "Software Engineer",
      company: "Xelex Industrial",
      responsibilities: [
        "Development and maintenance of enterprise applications.",
        "Technical support and systems administration.",
        "Automation of internal processes.",
        "Optimization of technological processes.",
      ],
      technologies: [],
    },
  ],
  education: [
    {
      title: "Engineering in Software Development and Management",
      institution: "Universidad Tecnológica de San Juan del Río",
      period: "2019–2024",
    },
    {
      title: "Oracle Next Education – Java",
    },
    {
      title: "Java Spring Boot",
    },
    {
      title: "Docker",
      status: "In progress",
    },
    {
      title: "AWS Cloud",
      status: "In progress",
    },
  ],
  stack: [
    {
      category: "Backend",
      items: [
        "Java",
        "Spring Boot",
        "Spring Core",
        "Spring MVC",
        "Spring Security",
        "Spring Data JPA",
        "Hibernate",
        "REST APIs",
        "SOAP",
        "JWT",
      ],
    },
    {
      category: "Frontend",
      items: ["Angular", "TypeScript", "HTML/CSS"],
    },
    {
      category: "Tools and platforms",
      items: [
        "Git",
        "GitHub",
        "Maven",
        "Postman",
        "IntelliJ IDEA",
        "VS Code",
        "Docker (in progress)",
        "Linux",
        "Windows",
      ],
    },
    {
      category: "Architecture and practices",
      items: [
        "MVC",
        "SOLID",
        "Clean Architecture",
        "Dependency Injection",
        "API Design",
        "Microservices",
      ],
    },
    {
      category: "Security",
      items: ["Spring Security", "OWASP Top 10", "SSL/TLS", "JWT"],
    },
    {
      category: "Databases",
      items: ["SQL Server", "MySQL", "PostgreSQL", "SQL optimization"],
    },
  ],
  architecture: {
    title: "Backend architecture principles",
    description:
      "How I approach maintainable and secure services: separated responsibilities, clear contracts, and controlled access to data.",
    diagram: `flowchart TB
  client[Client] --> controller[Controller_MVC]
  controller --> service[Service_Layer]
  service --> repository[Repository_JPA]
  repository --> database[(SQL_Database)]
  service --> security[Spring_Security_JWT]`,
    decisionsTitle: "Layered API flow",
    decisions: [
      {
        title: "Separated responsibilities",
        description:
          "Controller, service, and repository separate HTTP logic, business rules, and persistence to support testing and maintainability.",
      },
      {
        title: "Security by design",
        description:
          "Endpoints require appropriate authentication and authorization; Spring Security, JWT, and OWASP practices guide API protection.",
      },
      {
        title: "Data and performance",
        description:
          "Queries are validated and optimized by considering indexes, execution plans, and application behavior under load.",
      },
    ],
  },
  contact: {
    title: "Contact",
    subtitle: "QRO - CDMX, México",
    email: "ricardo.vazquez.dev@gmail.com",
    phone: "(427) 145-33-63",
    location: "QRO - CDMX, México",
    linkedinHandle: "ing-ricardo-israel-vazquez-dominguez",
    githubHandle: "ricardovaz967",
    submitLabel: "Send message",
    successMessage: "Message sent. I will get back to you soon.",
    errorMessage: "Message could not be sent. Please try again.",
  },
  seo: {
    title: "Ricardo Israel Vázquez Domínguez | Java Backend Developer",
    description:
      "Java Backend Developer with an active interest in application security and ongoing cybersecurity learning, supported by knowledge of Spring Security, JWT, SSL/TLS, and OWASP Top 10.",
    keywords: [
      "Java Backend Developer",
      "Java",
      "Spring Boot",
      "REST APIs",
      "SQL",
      "Microservices",
      "Spring Security",
      "JWT",
      "OWASP Top 10",
      "SSL/TLS",
      "Hibernate",
    ],
  },
};
