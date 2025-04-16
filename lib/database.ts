// In-memory database implementation
import { Project, Skill, AboutInfo, ContactMessage } from './types';

// Type definitions for database collections
interface DatabaseCollections {
  projects: Project[];
  skills: Skill[];
  about: AboutInfo | null;
  messages: ContactMessage[];
}

// Initialize in-memory storage
const inMemoryDB: DatabaseCollections = {
  projects: [
    {
      id: '1',
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform built with Next.js, TypeScript, and Material UI. Includes product listings, cart functionality, and secure checkout.',
      image: '/assets/project-placeholder.svg',
      technologies: ['Next.js', 'TypeScript', 'Material UI', 'Stripe', 'MongoDB'],
      demoUrl: 'https://example.com/ecommerce',
      githubUrl: 'https://github.com/username/ecommerce',
      category: 'Full Stack',
      createdAt: '2023-06-15T00:00:00.000Z'
    },
    {
      id: '2',
      title: 'Task Management App',
      description: 'A collaborative task management application with real-time updates, team workspaces, and progress tracking functionality.',
      image: '/assets/project-placeholder.svg',
      technologies: ['React', 'Node.js', 'Express', 'Socket.io', 'PostgreSQL'],
      demoUrl: 'https://example.com/taskmanager',
      githubUrl: 'https://github.com/username/taskmanager',
      category: 'Full Stack',
      createdAt: '2023-05-20T00:00:00.000Z'
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'A responsive portfolio website built with Next.js and TypeScript showcasing modern design principles and animations.',
      image: '/assets/project-placeholder.svg',
      technologies: ['Next.js', 'TypeScript', 'Framer Motion', 'Material UI'],
      demoUrl: 'https://example.com/portfolio',
      githubUrl: 'https://github.com/username/portfolio',
      category: 'Frontend',
      createdAt: '2023-04-10T00:00:00.000Z'
    },
    {
      id: '4',
      title: 'RESTful API Service',
      description: 'A scalable RESTful API service with complete documentation, authentication, and rate limiting.',
      image: '/assets/project-placeholder.svg',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger'],
      githubUrl: 'https://github.com/username/api-service',
      category: 'Backend',
      createdAt: '2023-03-05T00:00:00.000Z'
    },
    {
      id: '5',
      title: 'Weather Dashboard',
      description: 'An interactive weather dashboard providing real-time weather data and forecasts using external API integration.',
      image: '/assets/project-placeholder.svg',
      technologies: ['React', 'Redux', 'Chart.js', 'Weather API'],
      demoUrl: 'https://example.com/weather',
      githubUrl: 'https://github.com/username/weather-app',
      category: 'Frontend',
      createdAt: '2023-02-15T00:00:00.000Z'
    },
    {
      id: '6',
      title: 'Blog Platform',
      description: 'A full-featured blog platform with rich text editing, user authentication, and content management.',
      image: '/assets/project-placeholder.svg',
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Draft.js'],
      demoUrl: 'https://example.com/blog',
      githubUrl: 'https://github.com/username/blog-platform',
      category: 'Full Stack',
      createdAt: '2023-01-15T00:00:00.000Z'
    }
  ],

  skills: [
    { id: '1', name: 'HTML/CSS', level: 95, description: 'Semantic HTML, CSS3, Responsive Design', category: 'Frontend' },
    { id: '2', name: 'JavaScript', level: 90, description: 'ES6+, TypeScript, DOM Manipulation', category: 'Frontend' },
    { id: '3', name: 'React', level: 92, description: 'Hooks, Context API, Redux, Next.js', category: 'Frontend' },
    { id: '4', name: 'UI Frameworks', level: 85, description: 'Material UI, Tailwind CSS, Bootstrap', category: 'Frontend' },
    { id: '5', name: 'Node.js', level: 88, description: 'Express, API Development, Authentication', category: 'Backend' },
    { id: '6', name: 'Databases', level: 85, description: 'MongoDB, PostgreSQL, Prisma ORM', category: 'Backend' },
    { id: '7', name: 'GraphQL', level: 80, description: 'Apollo Server, Queries, Mutations', category: 'Backend' },
    { id: '8', name: 'API Design', level: 87, description: 'RESTful API, Authentication, Security', category: 'Backend' },
    { id: '9', name: 'Git & GitHub', level: 90, description: 'Version Control, Branching, CI/CD', category: 'DevOps & Tools' },
    { id: '10', name: 'Docker', level: 75, description: 'Containerization, Docker Compose', category: 'DevOps & Tools' },
    { id: '11', name: 'Testing', level: 80, description: 'Jest, React Testing Library, Cypress', category: 'DevOps & Tools' },
    { id: '12', name: 'Performance', level: 82, description: 'Optimization, Lazy Loading, Code Splitting', category: 'DevOps & Tools' }
  ],

  about: {
    name: 'John Doe',
    title: 'Full Stack JavaScript Developer',
    bio: "I'm a passionate Full Stack JavaScript Developer with over 5 years of experience building modern web applications. I specialize in React, Next.js, Node.js and TypeScript, focusing on creating performant and scalable solutions that solve real-world problems.",
    experience: "5+ years",
    location: "San Francisco, CA",
    education: "Bachelor's in Computer Science",
    categories: [
      {
        id: '1',
        title: "Frontend Development",
        description: "I create responsive, accessible, and performant user interfaces using modern JavaScript frameworks.",
        icon: "web"
      },
      {
        id: '2',
        title: "Backend Development",
        description: "I build robust and scalable APIs and server-side applications with Node.js and Express.",
        icon: "server"
      },
      {
        id: '3',
        title: "Full Stack Solutions",
        description: "I deliver end-to-end solutions, from concept to deployment, ensuring seamless integration across the stack.",
        icon: "code"
      }
    ]
  },

  messages: [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      subject: 'Project Inquiry',
      message: 'Hello, I was wondering if you are available for a new web development project starting next month. It would involve creating a new e-commerce platform with a custom CMS. Please let me know if you are interested and we can discuss the details further.',
      date: '2023-06-15T08:23:45.000Z',
      read: true
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      subject: 'Consultation Request',
      message: 'Hi there, I would like to schedule a consultation to discuss a potential website redesign for my company. We are looking to modernize our online presence and improve our user experience. What is your availability in the coming weeks?',
      date: '2023-06-12T14:12:30.000Z',
      read: false
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'mbrown@example.com',
      subject: 'Job Opportunity',
      message: 'Dear Developer, I came across your portfolio and was impressed by your work. Our company is looking for a skilled JavaScript developer to join our team. Would you be interested in discussing this opportunity? If so, please send me your resume and availability for an interview.',
      date: '2023-06-10T09:45:15.000Z',
      read: false
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      subject: 'Thanks for Your Work',
      message: 'I just wanted to send a quick note to thank you for the excellent work you did on our website. The design is exactly what we were looking for, and the functionality is perfect. We have already received numerous compliments from our customers. It was a pleasure working with you!',
      date: '2023-06-05T16:30:00.000Z',
      read: true
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'dwilson@example.com',
      subject: 'Bug Report',
      message: 'Hello, I noticed an issue on your portfolio website. When viewing on mobile devices, the contact form appears to be cut off at the bottom. I thought you might want to know about this. Otherwise, your site looks great!',
      date: '2023-06-01T11:20:10.000Z',
      read: true
    }
  ]
};

// Database API
export const db = {
  // Projects
  projects: {
    getAll: () => inMemoryDB.projects,
    getById: (id: string) => inMemoryDB.projects.find(project => project.id === id),
    create: (project: Project) => {
      inMemoryDB.projects.push(project);
      return project;
    },
    update: (project: Project) => {
      const index = inMemoryDB.projects.findIndex(p => p.id === project.id);
      if (index !== -1) {
        inMemoryDB.projects[index] = project;
        return project;
      }
      return null;
    },
    delete: (id: string) => {
      const index = inMemoryDB.projects.findIndex(p => p.id === id);
      if (index !== -1) {
        inMemoryDB.projects.splice(index, 1);
        return true;
      }
      return false;
    }
  },

  // Skills
  skills: {
    getAll: () => inMemoryDB.skills,
    getById: (id: string) => inMemoryDB.skills.find(skill => skill.id === id),
    create: (skill: Skill) => {
      inMemoryDB.skills.push(skill);
      return skill;
    },
    update: (skill: Skill) => {
      const index = inMemoryDB.skills.findIndex(s => s.id === skill.id);
      if (index !== -1) {
        inMemoryDB.skills[index] = skill;
        return skill;
      }
      return null;
    },
    delete: (id: string) => {
      const index = inMemoryDB.skills.findIndex(s => s.id === id);
      if (index !== -1) {
        inMemoryDB.skills.splice(index, 1);
        return true;
      }
      return false;
    }
  },

  // About
  about: {
    get: () => inMemoryDB.about,
    set: (about: AboutInfo) => {
      inMemoryDB.about = about;
      return about;
    }
  },

  // Messages
  messages: {
    getAll: () => inMemoryDB.messages,
    getById: (id: string) => inMemoryDB.messages.find(message => message.id === id),
    create: (message: ContactMessage) => {
      inMemoryDB.messages.push(message);
      return message;
    },
    update: (message: ContactMessage) => {
      const index = inMemoryDB.messages.findIndex(m => m.id === message.id);
      if (index !== -1) {
        inMemoryDB.messages[index] = message;
        return message;
      }
      return null;
    },
    delete: (id: string) => {
      const index = inMemoryDB.messages.findIndex(m => m.id === id);
      if (index !== -1) {
        inMemoryDB.messages.splice(index, 1);
        return true;
      }
      return false;
    }
  }
};
