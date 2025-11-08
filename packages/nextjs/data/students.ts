import { Student } from "../types/student";

// Seed data: Student beneficiaries for MVP demo
// These represent real use cases from LATAM universities based on your research docs

export const STUDENTS: Student[] = [
  {
    id: "1",
    name: "Ana Silva",
    university: "Universidade de São Paulo (USP)",
    universityLogo: "/universities/usp.png",
    field: "Artificial Intelligence & Machine Learning",
    country: "Brazil",
    bio: "Researching AI applications for healthcare diagnostics in underserved communities. My work focuses on developing low-cost ML models that can run on mobile devices for remote areas.",
    fundingGoal: "$5,000/year",
    fundingGoalUsd: 5000,
    currentFunding: 1200,
    walletAddress: "0x1111111111111111111111111111111111111111",
    impactMetrics: [
      {
        type: "publication",
        title: "AI-Powered Diagnosis for Rural Healthcare",
        description: "Published in Brazilian Journal of Medical AI",
        date: "2024-09",
        url: "https://example.com/paper1",
      },
      {
        type: "presentation",
        title: "Conference presentation at AI4Health 2024",
        date: "2024-10",
      },
      {
        type: "equipment",
        title: "GPU workstation for model training",
        description: "Enabled local training instead of cloud costs",
      },
    ],
    avatarUrl: "/avatars/maria.jpg",
    category: "phd",
    tags: ["AI", "Healthcare", "Machine Learning"],
    isVerified: true,
  },
  {
    id: "2",
    name: "Carlos Mendoza",
    university: "Tecnológico de Monterrey (ITESM)",
    universityLogo: "/universities/tec.png",
    field: "Blockchain & Decentralized Systems",
    country: "Mexico",
    bio: "Building decentralized applications for financial inclusion. As a blockchain researcher, I'm creating Web3 tools to help unbanked populations access financial services.",
    fundingGoal: "$4,000/year",
    fundingGoalUsd: 4000,
    currentFunding: 1500,
    walletAddress: "0x2222222222222222222222222222222222222222",
    impactMetrics: [
      {
        type: "research",
        title: "Pilot solar installation in Rocinha",
        description: "Providing power to 5 households",
      },
      {
        type: "course",
        title: "Completed Advanced Photovoltaics course",
        date: "2024-08",
      },
    ],
    avatarUrl: "/avatars/joao.jpg",
    category: "masters",
    tags: ["Renewable Energy", "Social Impact", "Engineering"],
    isVerified: true,
  },
  {
    id: "3",
    name: "María Fernández",
    university: "Universidad Nacional Autónoma de México (UNAM)",
    universityLogo: "/universities/unam.png",
    field: "Climate Science & Sustainability",
    country: "Mexico",
    bio: "Studying climate change impacts on Mexican ecosystems. My research documents endangered species and develops community-based conservation strategies for a sustainable future.",
    fundingGoal: "$4,200/year",
    fundingGoalUsd: 4200,
    currentFunding: 2100,
    walletAddress: "0x3333333333333333333333333333333333333333",
    impactMetrics: [
      {
        type: "research",
        title: "Cataloged 47 new plant species in Chiapas",
        date: "2024-07",
      },
      {
        type: "publication",
        title: "Community Conservation in Indigenous Territories",
        description: "Published in Latin American Ecology Journal",
        date: "2024-11",
      },
      {
        type: "other",
        title: "Trained 15 local guides in biodiversity monitoring",
      },
    ],
    avatarUrl: "/avatars/ana.jpg",
    category: "phd",
    tags: ["Ecology", "Conservation", "Indigenous Knowledge"],
    isVerified: true,
  },
  {
    id: "4",
    name: "João Santos",
    university: "Universidade Estadual de Campinas (UNICAMP)",
    universityLogo: "/universities/unicamp.png",
    field: "Renewable Energy & Smart Grids",
    country: "Brazil",
    bio: "Developing sustainable energy solutions for favelas. My thesis focuses on low-cost solar installations and smart grid technology adapted to informal housing structures.",
    fundingGoal: "$3,500/year",
    fundingGoalUsd: 3500,
    currentFunding: 800,
    walletAddress: "0x4444444444444444444444444444444444444444",
    impactMetrics: [
      {
        type: "other",
        title: "Developed scholarship matching platform",
        description: "Helped 200+ students find funding opportunities",
      },
      {
        type: "course",
        title: "Full-stack development bootcamp",
        date: "2024-06",
      },
    ],
    avatarUrl: "/avatars/carlos.jpg",
    category: "undergraduate",
    tags: ["Education Access", "Open Source", "Web Development"],
    isVerified: true,
  },
  {
    id: "5",
    name: "Valentina Rojas",
    university: "Universidad de Buenos Aires (UBA)",
    universityLogo: "/universities/uba.png",
    field: "Public Health & Social Impact",
    country: "Argentina",
    bio: "Researching public health initiatives and social impact in underserved communities. My work focuses on improving healthcare access and outcomes in marginalized populations.",
    fundingGoal: "$3,800/year",
    fundingGoalUsd: 3800,
    currentFunding: 900,
    walletAddress: "0x5555555555555555555555555555555555555555",
    impactMetrics: [
      {
        type: "research",
        title: "Field study with 50 micro-entrepreneurs",
        description: "Documenting impact of community lending circles",
      },
      {
        type: "presentation",
        title: "Presented at Brazilian Economic Forum 2024",
        date: "2024-09",
      },
    ],
    avatarUrl: "/avatars/lucia.jpg",
    category: "masters",
    tags: ["Microfinance", "Economic Development", "Social Research"],
    isVerified: true,
  },
  {
    id: "6",
    name: "Diego Ramírez",
    university: "Pontificia Universidad Católica de Chile",
    universityLogo: "/universities/puc-chile.png",
    field: "Quantum Computing & Cryptography",
    country: "Chile",
    bio: "Researching quantum computing applications for cryptography and secure communications. My goal is to make Chile a hub for quantum research in Latin America.",
    fundingGoal: "$6,000/year",
    fundingGoalUsd: 6000,
    currentFunding: 0,
    walletAddress: "0x6666666666666666666666666666666666666666",
    impactMetrics: [
      {
        type: "publication",
        title: "Quantum Key Distribution in Noisy Environments",
        description: "Accepted to Physical Review Letters",
        date: "2024-12",
      },
      {
        type: "course",
        title: "Advanced Quantum Information Theory",
        date: "2024-05",
      },
    ],
    avatarUrl: "/avatars/diego.jpg",
    category: "phd",
    tags: ["Quantum Computing", "Cryptography", "Physics"],
    isVerified: true,
  },
  {
    id: "7",
    name: "Isabella Costa",
    university: "Universidade Federal do Rio de Janeiro (UFRJ)",
    universityLogo: "/universities/ufrj.png",
    field: "Biotechnology & Gene Therapy",
    country: "Brazil",
    bio: "Researching gene therapy applications for tropical diseases. My work focuses on developing affordable genetic treatments for diseases prevalent in Latin America.",
    fundingGoal: "$5,500/year",
    fundingGoalUsd: 5500,
    currentFunding: 450,
    walletAddress: "0x7777777777777777777777777777777777777777",
    impactMetrics: [
      {
        type: "research",
        title: "Interviewed 80 displaced families",
        description: "Building comprehensive trauma assessment framework",
      },
      {
        type: "other",
        title: "Training workshops for 30 social workers",
      },
    ],
    avatarUrl: "/avatars/isabella.jpg",
    category: "masters",
    tags: ["Psychology", "Migration", "Trauma", "Social Work"],
    isVerified: true,
  },
  {
    id: "8",
    name: "Santiago Torres",
    university: "Universidad de los Andes (Colombia)",
    universityLogo: "/universities/uniandes.png",
    field: "Financial Inclusion & Web3",
    country: "Colombia",
    bio: "Building Web3 solutions for financial inclusion in Latin America. My research focuses on creating accessible DeFi tools for unbanked populations and remote communities.",
    fundingGoal: "$4,500/year",
    fundingGoalUsd: 4500,
    currentFunding: 1100,
    walletAddress: "0x8888888888888888888888888888888888888888",
    impactMetrics: [
      {
        type: "other",
        title: "Built 3 prototype robotic arms",
        description: "Total cost under $200 per unit",
      },
      {
        type: "presentation",
        title: "Won 2nd place at National Robotics Competition",
        date: "2024-10",
      },
    ],
    avatarUrl: "/avatars/miguel.jpg",
    category: "undergraduate",
    tags: ["Robotics", "Accessibility", "3D Printing", "Open Hardware"],
    isVerified: true,
  },
];

// Helper functions for frontend
export function getStudentById(id: string): Student | undefined {
  return STUDENTS.find(s => s.id === id);
}

export function getStudentsByCategory(category: string): Student[] {
  return STUDENTS.filter(s => s.category === category);
}

export function getStudentsByCountry(country: string): Student[] {
  return STUDENTS.filter(s => s.country === country);
}

export function calculateTotalFundingNeeded(): number {
  return STUDENTS.reduce((sum, s) => sum + s.fundingGoalUsd, 0);
}

export function calculateTotalCurrentFunding(): number {
  return STUDENTS.reduce((sum, s) => sum + s.currentFunding, 0);
}

export function getFundingProgress(student: Student): number {
  return Math.min((student.currentFunding / student.fundingGoalUsd) * 100, 100);
}
