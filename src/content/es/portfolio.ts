import type { PortfolioContent } from "@/types/portfolio";

export const portfolioEs: PortfolioContent = {
  nav: {
    about: "Sobre mí",
    projects: "Proyectos",
    experience: "Experiencia",
    education: "Educación",
    stack: "Stack",
    architecture: "Arquitectura",
    contact: "Contacto",
  },
  hero: {
    name: "Ricardo Israel Vázquez Domínguez",
    role: "Backend Engineer | Java · Sistemas transaccionales · APIs seguras · SQL",
    tagline:
      "Experiencia en aplicaciones empresariales para el sector financiero, con foco en servicios Java, APIs REST, seguridad de aplicaciones y optimización de datos.",
    badge: "Java Backend Developer",
    imageAlt: "Espacio de trabajo de Ricardo Israel Vázquez Domínguez",
    cta: {
      experience: "Ver experiencia",
      cv: "Descargar CV",
      contact: "Contactar",
    },
  },
  about: {
    title: "Perfil profesional",
    intro:
      "Java Backend Developer con experiencia en el sector financiero desarrollando aplicaciones empresariales con Java, Spring Boot, Spring Security, JPA/Hibernate y SQL. Experiencia con APIs REST, arquitectura multicapa, principios SOLID, MVC, optimización de consultas SQL, Scrum, Git y Linux. Enfocado en clean code, seguridad, rendimiento y escalabilidad.",
    securityLearning:
      "Actualmente fortalece su conocimiento en ciberseguridad junto a su especialización Java backend. Su base verificable en seguridad de aplicaciones incluye Spring Security, OWASP Top 10, SSL/TLS y JWT.",
    strengthsTitle: "Fortalezas profesionales",
    strengths: [
      "Análisis crítico",
      "Resolución de problemas",
      "Pensamiento analítico",
      "Adaptabilidad",
      "Comunicación técnica",
    ],
    languagesTitle: "Idiomas",
    languages: ["Español: Nativo", "Inglés: Bueno (B2)"],
  },
  projects: {
    title: "Proyecto público destacado",
    description:
      "Código publicado para revisar la calidad de implementación y el enfoque de producto.",
    items: [
      {
        title: "Generador QR",
        description:
          "Utilidad web publicada como proyecto personal. El repositorio permite revisar su implementación y evolución técnica.",
        technologies: ["TypeScript"],
        repositoryUrl: "https://github.com/ricardovaz967/generador-QR",
        repositoryLabel: "Ver repositorio",
      },
    ],
  },
  experience: [
    {
      period: "Octubre 2024 – Mayo 2026",
      title: "Backend Developer / DBA",
      company: "Banco del Bienestar",
      responsibilities: [
        "Desarrollo y mantenimiento de servicios backend con Java y Spring Boot.",
        "Validación e integración de APIs REST para aplicaciones bancarias.",
        "Administración y optimización de bases de datos SQL Server.",
        "Implementación y optimización de consultas SQL.",
        "Diagnóstico y resolución de incidentes en entornos críticos.",
        "Validación de servicios y estabilidad de aplicaciones.",
        "Administración de repositorios Git.",
        "Colaboración con Scrum.",
        "Trabajo en entornos Linux.",
      ],
      technologies: ["Java", "Spring Boot", "REST APIs", "SQL Server", "Git", "Scrum", "Linux"],
    },
    {
      period: "Enero 2023 – Mayo 2023",
      title: "Software Engineer",
      company: "Xelex Industrial",
      responsibilities: [
        "Desarrollo y mantenimiento de aplicaciones empresariales.",
        "Soporte técnico y administración de sistemas.",
        "Automatización de procesos internos.",
        "Optimización de procesos tecnológicos.",
      ],
      technologies: [],
    },
  ],
  education: [
    {
      title: "Ingeniería en Desarrollo y Gestión de Software",
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
      status: "En curso",
    },
    {
      title: "AWS Cloud",
      status: "En curso",
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
      category: "Herramientas y plataformas",
      items: [
        "Git",
        "GitHub",
        "Maven",
        "Postman",
        "IntelliJ IDEA",
        "VS Code",
        "Docker (en curso)",
        "Linux",
        "Windows",
      ],
    },
    {
      category: "Arquitectura y prácticas",
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
      category: "Seguridad",
      items: ["Spring Security", "OWASP Top 10", "SSL/TLS", "JWT"],
    },
    {
      category: "Bases de datos",
      items: ["SQL Server", "MySQL", "PostgreSQL", "SQL optimization"],
    },
  ],
  architecture: {
    title: "Criterios de arquitectura backend",
    description:
      "Cómo abordo servicios mantenibles y seguros: responsabilidades separadas, contratos claros y acceso controlado a los datos.",
    diagram: `flowchart TB
  client[Cliente] --> controller[Controller_MVC]
  controller --> service[Service_Layer]
  service --> repository[Repository_JPA]
  repository --> database[(SQL_Database)]
  service --> security[Spring_Security_JWT]`,
    decisionsTitle: "Flujo de una API por capas",
    decisions: [
      {
        title: "Responsabilidades separadas",
        description:
          "Controller, servicio y repositorio delimitan la lógica HTTP, las reglas de negocio y la persistencia para favorecer pruebas y mantenimiento.",
      },
      {
        title: "Seguridad desde el diseño",
        description:
          "Los endpoints requieren autenticación y autorización adecuadas; Spring Security, JWT y prácticas OWASP guían la protección de las APIs.",
      },
      {
        title: "Datos y rendimiento",
        description:
          "Las consultas se validan y optimizan considerando índices, planes de ejecución y el comportamiento de la aplicación bajo carga.",
      },
    ],
  },
  contact: {
    title: "Contacto",
    subtitle: "QRO - CDMX, México",
    email: "ricardo.vazquez.dev@gmail.com",
    phone: "(427) 145-33-63",
    location: "QRO - CDMX, México",
    linkedinHandle: "ing-ricardo-israel-vazquez-dominguez",
    githubHandle: "ricardovaz967",
    submitLabel: "Enviar mensaje",
    successMessage: "Mensaje enviado. Te contactaré a la brevedad.",
    errorMessage: "No fue posible enviar el mensaje. Intenta de nuevo.",
  },
  seo: {
    title: "Ricardo Israel Vázquez Domínguez | Java Backend Developer",
    description:
      "Java Backend Developer con interés activo en seguridad de aplicaciones y aprendizaje continuo en ciberseguridad, respaldado por conocimiento de Spring Security, JWT, SSL/TLS y OWASP Top 10.",
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
