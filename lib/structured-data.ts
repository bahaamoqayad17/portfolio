export const getPersonStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Bahaa El Moqayad",
    jobTitle: "Lead Full-Stack Engineer",
    url: "https://bahaamoqayad17.com",
    image: "https://bahaamoqayad17.com/bahaa.jpg",
    sameAs: [
      "https://github.com/bahaamoqayad17",
      "https://linkedin.com/in/bahaamoqayad17",
      "https://instagram.com/bahaamoqayad17",
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gaza",
      addressCountry: "Palestine",
    },
    email: "bahaamoqayad17@gmail.com",
    telephone: "+970599999999",
    description:
      "Experienced Lead Full-Stack Engineer specializing in React, Next.js, React Native, and Node.js with 5+ years of experience building scalable web and mobile applications.",
    knowsAbout: [
      // Core Programming Languages
      "JavaScript",
      "TypeScript",
      "HTML5",
      "CSS3",
      "SQL",

      // Frontend Technologies
      "React",
      "React.js",
      "Next.js",
      "React Hooks",
      "React Context",
      "React Router",

      // UI/UX Frameworks
      "Material UI",
      "MUI",
      "Tailwind CSS",
      "Styled Components",
      "Framer Motion",
      "Responsive Design",

      // Backend Technologies
      "Node.js",
      "Fastify",
      "Express.js",
      "REST API",
      "GraphQL",
      "Microservices",

      // Mobile Development
      "React Native",
      "Expo",
      "React Native Paper",
      "NativeWind",
      "Cross-platform Development",

      // Desktop Development
      "Electron.js",
      "Tauri",
      "Desktop Applications",

      // Databases
      "MongoDB",
      "NoSQL",
      "Database Design",
      "Database Optimization",

      // Development Tools
      "Git",
      "Version Control",
      "npm",
      "Yarn",
      "Webpack",
      "Babel",

      // Computer Science Fundamentals
      "Data Structures",
      "Algorithms",
      "Software Architecture",
      "Design Patterns",
      "Object-oriented Programming",
      "Functional Programming",
      "Software Engineering Principles",

      // Development Practices
      "Clean Code",
      "Test-driven Development",
      "Agile Development",
      "Scrum",
      "Code Review",
      "Performance Optimization",
      "Security Best Practices",

      // Specialized Areas
      "Web Development",
      "Mobile Development",
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "API Development",
      "SaaS Development",
      "E-commerce Development",
      "MVP Development",

      // Soft Skills
      "Problem Solving",
      "Technical Leadership",
      "Project Management",
      "Client Communication",
      "Team Collaboration",
      "Mentoring",
      "Technical Documentation",
      "Requirement Analysis",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Computer Science University",
    },
    worksFor: {
      "@type": "Organization",
      name: "Freelance Developer",
    },
  };
};

export const getWebsiteStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bahaa El Moqayad - Full Stack Developer Portfolio",
    url: "https://bahaamoqayad17.com",
    description:
      "Portfolio of Bahaa El Moqayad, an experienced Full Stack Developer specializing in React, Next.js, React Native, and Node.js.",
    author: {
      "@type": "Person",
      name: "Bahaa El Moqayad",
    },
    publisher: {
      "@type": "Person",
      name: "Bahaa El Moqayad",
    },
    inLanguage: "en-US",
  };
};

export const getProfessionalServiceStructuredData = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Bahaa El Moqayad - Lead Full-Stack Engineering Services",
    description:
      "Professional lead full-stack engineering services specializing in React, Next.js, React Native, and Node.js for web, mobile, and desktop applications.",
    provider: {
      "@type": "Person",
      name: "Bahaa El Moqayad",
      url: "https://bahaamoqayad17.com",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    availableLanguage: ["English", "Arabic"],
    priceRange: "$$",
    serviceType: [
      // Core Development Services
      "Full Stack Development",
      "Frontend Development",
      "Backend Development",
      "Web Application Development",
      "Mobile App Development",
      "Desktop Application Development",

      // Technology-Specific Services
      "React Development",
      "React.js Development",
      "Next.js Development",
      "Node.js Development",
      "React Native Development",
      "JavaScript Development",
      "TypeScript Development",

      // Framework & Library Services
      "Material UI Development",
      "Tailwind CSS Development",
      "Fastify API Development",
      "GraphQL Development",
      "REST API Development",
      "Electron.js Development",
      "Tauri Development",

      // Specialized Services
      "Custom Software Development",
      "SaaS Development",
      "E-commerce Development",
      "MVP Development",
      "Startup Technology Solutions",
      "Legacy System Modernization",
      "Performance Optimization",
      "Database Design",
      "API Integration",

      // Consulting Services
      "Technology Consulting",
      "Software Architecture Consulting",
      "Code Review Services",
      "Technical Leadership",
      "Development Team Mentoring",
      "Project Planning",
      "Technical Documentation",

      // UI/UX Services
      "Responsive Web Design",
      "Mobile-First Design",
      "User Interface Development",
      "User Experience Optimization",
      "Cross-platform Development",

      // Maintenance & Support
      "Application Maintenance",
      "Bug Fixing",
      "Feature Enhancement",
      "Performance Monitoring",
      "Security Auditing",
    ],
  };
};
