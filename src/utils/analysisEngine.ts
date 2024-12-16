// src/utils/analysisEngine.ts

import { analyzeWithAI } from "./aiAnalysis";

// Interfaces
interface ExperienceLevel {
    level: 'Junior' | 'Mid-Level' | 'Senior' | 'Lead';
    yearsOfExperience: number;
  }
  
  interface AnalysisResult {
    skillsGap: string[];
    improvements: string[];
    score: number;
    experienceLevel: ExperienceLevel;
    sectionAnalysis: {
      education: SectionAnalysis;
      experience: SectionAnalysis;
      skills: SectionAnalysis;
      projects: SectionAnalysis;
      contact: SectionAnalysis;
    };
    fieldSpecificFeedback: string[];
  }
  
  interface SectionAnalysis {
    present: boolean;
    score: number;
    issues: string[];
  }
  
  interface FieldRequirements {
    requiredSkills: string[];
    expectedTools: string[];
    relevantCertifications: string[];
    expectedKeywords: string[];
  }
  
  const fieldRequirements: Record<string, FieldRequirements> = {
    "Web Development": {
      requiredSkills: [
        "javascript", "html", "css", "react", "node.js", "typescript", "api",
        "responsive", "frontend", "backend", "database"
      ],
      expectedTools: [
        "git", "webpack", "npm", "docker", "jest", "vs code", "chrome devtools"
      ],
      relevantCertifications: [
        "aws", "meta", "google", "certified developer", "udacity", "coursera"
      ],
      expectedKeywords: [
        "responsive design", "web application", "rest api", "performance optimization",
        "user interface", "front-end", "back-end", "full-stack", "scalable"
      ]
    },
    "Artificial Intelligence (AI)": {
      requiredSkills: [
        "machine learning", "deep learning", "neural networks", "natural language processing",
        "computer vision", "optimization", "reinforcement learning"
      ],
      expectedTools: [
        "tensorflow", "pytorch", "keras", "scikit-learn", "huggingface transformers", "cuda"
      ],
      relevantCertifications: [
        "google ai", "ibm ai engineering", "deep learning specialization", "coursera ai",
        "edx ai programs"
      ],
      expectedKeywords: [
        "model training", "inference", "optimization", "ai ethics", "ai research",
        "real-world ai applications"
      ]
    },
    "Machine Learning (ML)": {
      requiredSkills: [
        "statistical analysis", "feature engineering", "model evaluation", "algorithm design",
        "data preprocessing", "supervised learning", "unsupervised learning"
      ],
      expectedTools: [
        "python", "scikit-learn", "pandas", "numpy", "matplotlib", "jupyter notebooks"
      ],
      relevantCertifications: [
        "aws machine learning", "google machine learning", "stanford ml", "coursera ml",
        "kaggle competitions"
      ],
      expectedKeywords: [
        "model accuracy", "feature selection", "model deployment", "ml pipelines",
        "cross-validation", "hyperparameter tuning"
      ]
    },
    "Data Science": {
      requiredSkills: [
        "data analysis", "statistical modeling", "machine learning", "data visualization",
        "data wrangling", "sql", "python", "r"
      ],
      expectedTools: [
        "tableau", "powerbi", "jupyter notebooks", "pandas", "numpy", "matplotlib", "seaborn"
      ],
      relevantCertifications: [
        "ibm data science", "google data analytics", "coursera data science", "kaggle data science"
      ],
      expectedKeywords: [
        "business intelligence", "insights generation", "data cleaning", "predictive analytics",
        "exploratory data analysis", "big data handling"
      ]
    },
    "Cloud Computing": {
      requiredSkills: [
        "cloud architecture", "devops", "containerization", "microservices", "security",
        "scalability", "disaster recovery"
      ],
      expectedTools: [
        "aws", "azure", "google cloud platform", "docker", "kubernetes", "terraform"
      ],
      relevantCertifications: [
        "aws solutions architect", "azure administrator", "gcp cloud engineer",
        "devops certifications", "terraform certification"
      ],
      expectedKeywords: [
        "cloud-native applications", "cloud migration", "high availability", "serverless computing",
        "cloud security", "multi-cloud"
      ]
    },
    "Cybersecurity": {
      requiredSkills: [
        "network security", "penetration testing", "vulnerability assessment", "encryption",
        "incident response", "firewall configuration"
      ],
      expectedTools: [
        "wireshark", "metasploit", "nmap", "burp suite", "snort", "kali linux"
      ],
      relevantCertifications: [
        "comptia security+", "cissp", "certified ethical hacker (ceh)", "oscp", "cybersecurity analyst"
      ],
      expectedKeywords: [
        "threat detection", "incident response", "secure coding", "data protection",
        "vulnerability management", "risk assessment"
      ]
    },
    "Blockchain Development": {
      requiredSkills: [
        "smart contracts", "cryptography", "dapp development", "consensus algorithms", "web3"
      ],
      expectedTools: [
        "solidity", "web3.js", "truffle", "hardhat", "ethereum", "ganache"
      ],
      relevantCertifications: [
        "certified blockchain developer", "ethereum developer certification", "hyperledger certification",
        "blockchain council certifications"
      ],
      expectedKeywords: [
        "blockchain implementation", "decentralized applications", "gas optimization",
        "smart contract security", "distributed ledger technology"
      ]
    },
    "Mobile App Development": {
      requiredSkills: [
        "android development", "ios development", "cross-platform development", "ui/ux design",
        "mobile app performance"
      ],
      expectedTools: [
        "flutter", "react native", "kotlin", "swift", "xcode", "android studio"
      ],
      relevantCertifications: [
        "google associate android developer", "apple app development with swift",
        "meta mobile development"
      ],
      expectedKeywords: [
        "mobile-first design", "app store optimization", "user retention", "offline functionality",
        "push notifications"
      ]
    },
    "DevOps": {
      requiredSkills: [
        "continuous integration", "continuous deployment", "automation", "monitoring", "infrastructure as code"
      ],
      expectedTools: [
        "jenkins", "docker", "kubernetes", "terraform", "ansible", "prometheus", "grafana"
      ],
      relevantCertifications: [
        "aws devops engineer", "microsoft devops expert", "docker certified associate"
      ],
      expectedKeywords: [
        "ci/cd pipelines", "scalability", "cloud-native development", "system reliability",
        "infrastructure automation"
      ]
    },
    "Big Data": {
      requiredSkills: [
        "data analysis", "hadoop", "spark", "data pipelines", "real-time analytics", "etl processes"
      ],
      expectedTools: [
        "apache hadoop", "apache spark", "hive", "kafka", "redshift", "snowflake"
      ],
      relevantCertifications: [
        "cloudera data analyst", "big data engineer by google", "aws big data specialty"
      ],
      expectedKeywords: [
        "distributed data processing", "data lakes", "large-scale analytics", "real-time processing",
        "streaming data"
      ]
    },
    "Natural Language Processing (NLP)": {
      requiredSkills: [
        "tokenization", "text classification", "sentiment analysis", "language modeling",
        "information retrieval", "entity recognition", "semantic analysis"
      ],
      expectedTools: [
        "spacy", "nltk", "huggingface transformers", "bert", "openai apis"
      ],
      relevantCertifications: [
        "deep learning ai specialization", "nlp specialization by stanford", "ai for text analytics by ibm"
      ],
      expectedKeywords: [
        "text generation", "natural language understanding", "text preprocessing",
        "machine translation", "chatbots", "sentiment analysis"
      ]
    },
    "Computer Vision": {
      requiredSkills: [
        "image recognition", "object detection", "feature extraction", "image segmentation",
        "3d modeling", "video analysis"
      ],
      expectedTools: [
        "opencv", "pytorch", "tensorflow", "yolo", "gans", "matplotlib"
      ],
      relevantCertifications: [
        "coursera computer vision specialization", "udacity ai for computer vision", "stanford cv course"
      ],
      expectedKeywords: [
        "image processing", "visual data analysis", "object tracking", "feature detection",
        "scene reconstruction"
      ]
    },
    "Robotics": {
      requiredSkills: [
        "robot operating system (ros)", "motion planning", "control systems",
        "kinematics", "embedded systems", "path planning"
      ],
      expectedTools: [
        "ros", "matlab", "arduino", "raspberry pi", "gazebo", "solidworks"
      ],
      relevantCertifications: [
        "robotics engineering certification by mit", "ros for beginners",
        "udacity robotics software engineer"
      ],
      expectedKeywords: [
        "autonomous systems", "mechatronics", "robot navigation", "robot programming",
        "robotics process automation"
      ]
    },
    "Internet of Things (IoT)": {
      requiredSkills: [
        "sensor integration", "wireless communication", "iot protocols",
        "data analysis", "embedded systems", "edge computing"
      ],
      expectedTools: [
        "arduino", "raspberry pi", "mqtt", "aws iot", "thingsboard"
      ],
      relevantCertifications: [
        "cisco iot fundamentals", "aws iot core certification", "coursera iot specialization"
      ],
      expectedKeywords: [
        "connected devices", "smart homes", "real-time monitoring", "iot security",
        "device management"
      ]
    },
    "Database Administration": {
      requiredSkills: [
        "database management", "sql", "backup and recovery", "performance tuning",
        "database security", "query optimization"
      ],
      expectedTools: [
        "mysql", "postgresql", "mongodb", "oracle db", "microsoft sql server"
      ],
      relevantCertifications: [
        "oracle certified database administrator", "microsoft azure data fundamentals",
        "mongodb university certifications"
      ],
      expectedKeywords: [
        "data consistency", "data integrity", "indexing", "query execution", "database replication"
      ]
    },
    "Game Development": {
      requiredSkills: [
        "game design", "3d modeling", "physics simulation", "graphics programming",
        "ai for games", "level design"
      ],
      expectedTools: [
        "unity", "unreal engine", "blender", "c#", "c++"
      ],
      relevantCertifications: [
        "unity certified developer", "unreal engine training", "game design by coursera"
      ],
      expectedKeywords: [
        "game mechanics", "player experience", "rendering optimization", "gameplay programming",
        "fps optimization"
      ]
    },
    "UI/UX Design": {
      requiredSkills: [
        "wireframing", "prototyping", "user research", "interaction design", "visual design",
        "accessibility design"
      ],
      expectedTools: [
        "figma", "adobe xd", "sketch", "invision", "balsamiq"
      ],
      relevantCertifications: [
        "google ux design certificate", "nielsen norman group certifications", "adobe ux/ui certifications"
      ],
      expectedKeywords: [
        "user-centered design", "usability testing", "task analysis", "responsive design",
        "interaction patterns"
      ]
    },
    "Bioinformatics": {
      requiredSkills: [
        "computational biology", "genomic data analysis", "machine learning", "data mining",
        "protein modeling", "statistical methods"
      ],
      expectedTools: [
        "bioconductor", "r", "python", "blast", "matlab"
      ],
      relevantCertifications: [
        "coursera bioinformatics specialization", "embl bioinformatics", "nih bioinformatics certification"
      ],
      expectedKeywords: [
        "gene sequencing", "biological data visualization", "protein structure prediction",
        "dna analysis", "data processing pipelines"
      ]
    },
    "Augmented Reality (AR) and Virtual Reality (VR)": {
      requiredSkills: [
        "3d modeling", "spatial computing", "interaction design", "game engines", "xr development"
      ],
      expectedTools: [
        "unity", "unreal engine", "vuforia", "arkit", "oculus sdk"
      ],
      relevantCertifications: [
        "ar/vr developer certification by coursera", "unity ar/vr specialization", "meta vr certifications"
      ],
      expectedKeywords: [
        "immersive experiences", "real-time rendering", "xr applications", "interaction design",
        "virtual environments"
      ]
    },
    "Data Engineering": {
      requiredSkills: [
        "etl development", "data pipelines", "data warehousing", "cloud integration",
        "big data processing"
      ],
      expectedTools: [
        "apache kafka", "spark", "aws redshift", "airflow", "snowflake"
      ],
      relevantCertifications: [
        "google cloud data engineer", "aws big data specialty", "microsoft data engineering"
      ],
      expectedKeywords: [
        "real-time data processing", "pipeline optimization", "cloud data solutions",
        "scalable data storage"
      ]
    },
    "Distributed Systems": {
      requiredSkills: [
        "fault tolerance", "scalability", "load balancing", "distributed databases", "microservices"
      ],
      expectedTools: [
        "kafka", "zookeeper", "cassandra", "kubernetes", "docker"
      ],
      relevantCertifications: [
        "aws distributed systems certification", "google cloud distributed systems",
        "coursera distributed systems specialization"
      ],
      expectedKeywords: [
        "system consistency", "availability", "partition tolerance", "distributed computing",
        "high performance"
      ]
    },
    "Digital Marketing and Analytics": {
      requiredSkills: [
        "seo", "content marketing", "social media analytics", "campaign optimization", "data analysis"
      ],
      expectedTools: [
        "google analytics", "semrush", "hubspot", "hootsuite", "tableau"
      ],
      relevantCertifications: [
        "google digital marketing", "hubspot marketing certification",
        "meta digital marketing associate"
      ],
      expectedKeywords: [
        "traffic growth", "engagement metrics", "conversion optimization",
        "performance tracking", "target audience"
      ]
    },
    "Ethical Hacking": {
      requiredSkills: [
        "penetration testing", "vulnerability assessment", "network security", "reverse engineering",
        "secure coding"
      ],
      expectedTools: [
        "metasploit", "nmap", "burp suite", "kali linux", "nessus"
      ],
      relevantCertifications: [
        "certified ethical hacker (ceh)", "offensive security certified professional (oscp)",
        "comptia pentest+"
      ],
      expectedKeywords: [
        "exploit prevention", "vulnerability scanning", "secure networks",
        "incident response", "risk mitigation"
      ]
    },
    "Product Management": {
      requiredSkills: [
        "product lifecycle management", "market research", "stakeholder communication",
        "agile methodology", "data-driven decisions"
      ],
      expectedTools: [
        "jira", "trello", "asana", "miro", "tableau"
      ],
      relevantCertifications: [
        "google product management certificate", "pragmatic institute product management",
        "product school certifications"
      ],
      expectedKeywords: [
        "time-to-market", "feature prioritization", "user adoption", "roi tracking",
        "customer feedback loops"
      ]
    }
  };
  
  // Main Analysis Function
  export async function analyzeResumeContent(text: string, field: string): Promise<AnalysisResult> {
    const textLower = text.toLowerCase();
    const requirements = fieldRequirements[field] || fieldRequirements["Web Development"];
    
    console.log('Starting analysis with text:', textLower);
  
    // Basic analysis first
    const experienceLevel = detectExperienceLevel(textLower);
    const sections = {
      education: analyzeSectionEducation(textLower),
      experience: analyzeSectionExperience(textLower, experienceLevel),
      skills: analyzeSectionSkills(textLower, requirements),
      projects: analyzeSectionProjects(textLower, requirements),
      contact: analyzeSectionContact(textLower)
    };
  
    const missingSkills = findMissingSkills(textLower, requirements);
    const improvements = generateImprovements(textLower, sections, requirements);
    const score = calculateOverallScore({
      sections,
      missingSkillsCount: missingSkills.length,
      experienceLevel,
      textLength: text.length,
      hasMetrics: containsMetrics(textLower),
      hasActionVerbs: containsActionVerbs(textLower)
    });
  
    // Create basic result
    const basicResult: AnalysisResult = {
      skillsGap: missingSkills,
      improvements,
      score,
      experienceLevel,
      sectionAnalysis: sections,
      fieldSpecificFeedback: generateFieldSpecificFeedback(field, textLower, requirements)
    };
  
    try {
      // Try AI analysis
      console.log('Attempting AI analysis...');
      const aiAnalysis = await analyzeWithAI(text, field);
      console.log('AI analysis completed:', aiAnalysis);
  
      return {
        ...basicResult,
        skillsGap: [
          ...basicResult.skillsGap,
          ...(aiAnalysis.skillsConfidence < 70 ? ["AI DETECTED MISSING SKILLS!!!"] : [])
        ],
        improvements: [
          ...basicResult.improvements,
          ...aiAnalysis.suggestedImprovements
        ],
        score: Math.round((basicResult.score + aiAnalysis.experienceQuality) / 2)
      };
    } catch (error) {
      console.warn('AI analysis failed, using basic analysis:', error);
      return basicResult;
    }
  }

// Helper Functions
function generateImprovements(
    text: string, 
    sections: Record<string, SectionAnalysis>, 
    requirements: FieldRequirements
  ): string[] {
    const improvements: string[] = [];
  
    if (text.length < 1500) {
      improvements.push("YOUR RESUME IS TOO SHORT! ADD MORE DETAILS!!!");
    }
  
    if (!containsMetrics(text)) {
      improvements.push("WHERE ARE THE METRICS?! QUANTIFY YOUR ACHIEVEMENTS!!!");
    }
  
    if (!containsActionVerbs(text)) {
      improvements.push("USE STRONGER ACTION WORDS! 'HELPED' AND 'ASSISTED' ARE FOR WIMPS!!!");
    }
  
    if (!text.includes('github.com')) {
      improvements.push("WHERE'S YOUR GITHUB LINK?! ARE YOU HIDING YOUR CODE?!!!");
    }
  
    return improvements;
  }
  
  function detectExperienceLevel(text: string): ExperienceLevel {
    const years = extractYearsOfExperience(text);
    const seniorIndicators = ['senior', 'lead', 'principal', 'architect', 'head of'];
    const isSeniorRole = seniorIndicators.some(indicator => text.includes(indicator));
  
    if (years >= 8 || isSeniorRole) {
      return { level: 'Senior', yearsOfExperience: years };
    } else if (years >= 4) {
      return { level: 'Mid-Level', yearsOfExperience: years };
    }
    return { level: 'Junior', yearsOfExperience: years };
  }
  
  function extractYearsOfExperience(text: string): number {
    const yearsRegex = /(\d+)[\+]?\s*years?/i;
    const match = text.match(yearsRegex);
    return match ? parseInt(match[1]) : 0;
  }
  
  function analyzeSectionEducation(text: string): SectionAnalysis {
    const hasEducation = /education|university|college|degree|bachelor|master|phd/i.test(text);
    const hasDegreeDetails = /bs|ba|bsc|msc|phd|bachelor|master/i.test(text);
    const hasYear = /20\d{2}|19\d{2}/i.test(text);
  
    const issues: string[] = [];
    if (!hasEducation) issues.push("WHERE'S YOUR EDUCATION?! DID YOU LEARN FROM YOUTUBE?!!!");
    if (hasEducation && !hasDegreeDetails) issues.push("SPECIFY YOUR DEGREE, YOU AMATEUR!!!");
    if (hasEducation && !hasYear) issues.push("WHEN DID YOU GRADUATE?! TIME IS IMPORTANT!!!");
  
    return {
      present: hasEducation,
      score: calculateSectionScore(hasEducation, hasDegreeDetails, hasYear),
      issues
    };
  }
  
  function analyzeSectionExperience(text: string, experienceLevel: ExperienceLevel): SectionAnalysis {
    const hasExperience = /experience|work|employment/i.test(text);
    const hasActionVerbs = containsActionVerbs(text);
    const hasMetrics = containsMetrics(text);
  
    const issues: string[] = [];
    if (!hasExperience) issues.push("NO EXPERIENCE SECTION?! WHAT HAVE YOU BEEN DOING WITH YOUR LIFE?!!!");
    if (!hasActionVerbs) issues.push("USE POWER WORDS! 'ASSISTED' AND 'HELPED' ARE FOR WIMPS!!!");
    if (!hasMetrics) issues.push("WHERE ARE THE NUMBERS?! QUANTIFY YOUR IMPACT OR GET OUT!!!");
  
    return {
      present: hasExperience,
      score: calculateSectionScore(hasExperience, hasActionVerbs, hasMetrics),
      issues
    };
  }
  
  function analyzeSectionSkills(text: string, requirements: FieldRequirements): SectionAnalysis {
    const hasSkills = /skills|technologies|proficiencies/i.test(text);
    const hasCategories = /(languages|frameworks|tools|platforms):/i.test(text);
    const skillsCount = countSkills(text, requirements.requiredSkills);
  
    const issues: string[] = [];
    if (!hasSkills) issues.push("NO SKILLS SECTION?! ARE YOU SKILLED AT ANYTHING?!!!");
    if (!hasCategories) issues.push("ORGANIZE YOUR SKILLS, THIS IS CHAOS!!!");
    if (skillsCount < 5) issues.push("IS THIS ALL YOU KNOW?! MY GRANDMOTHER HAS MORE SKILLS!!!");
  
    return {
      present: hasSkills,
      score: calculateSectionScore(hasSkills, hasCategories, skillsCount >= 5),
      issues
    };
  }
  
  function analyzeSectionProjects(text: string, requirements: FieldRequirements): SectionAnalysis {
    const hasProjects = /projects|portfolio/i.test(text);
    const hasGithub = /github\.com/i.test(text);
    const hasProjectDetails = /developed|created|built|implemented/i.test(text);
  
    const issues: string[] = [];
    if (!hasProjects) issues.push("WHERE ARE YOUR PROJECTS?! DO YOU EVEN CODE?!!!");
    if (!hasGithub) issues.push("NO GITHUB LINKS?! WHAT ARE YOU HIDING?!!!");
    if (!hasProjectDetails) issues.push("ADD MORE PROJECT DETAILS! THIS IS TOO VAGUE!!!");
  
    return {
      present: hasProjects,
      score: calculateSectionScore(hasProjects, hasGithub, hasProjectDetails),
      issues
    };
  }
  
  function analyzeSectionContact(text: string): SectionAnalysis {
    const hasEmail = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/i.test(text);
    const hasPhone = /\d{3}[-.]?\d{3}[-.]?\d{4}/i.test(text);
    const hasLinkedIn = /linkedin\.com/i.test(text);
  
    const issues: string[] = [];
    if (!hasEmail || !hasPhone) issues.push("HOW ARE PEOPLE SUPPOSED TO CONTACT YOU?!!!");
    if (!hasLinkedIn) issues.push("NO LINKEDIN?! ARE YOU LIVING UNDER A ROCK?!!!");
  
    return {
      present: hasEmail || hasPhone || hasLinkedIn,
      score: calculateSectionScore(hasEmail, hasPhone, hasLinkedIn),
      issues
    };
  }
  
  function calculateSectionScore(...criteria: boolean[]): number {
    return Math.round((criteria.filter(Boolean).length / criteria.length) * 100);
  }
  
  function findMissingSkills(text: string, requirements: FieldRequirements): string[] {
    return requirements.requiredSkills
      .filter(skill => !text.toLowerCase().includes(skill.toLowerCase()))
      .map(skill => skill.toUpperCase());
  }
  
  function containsMetrics(text: string): boolean {
    const metricPatterns = [
      /\d+%/,
      /increased/i,
      /decreased/i,
      /improved/i,
      /reduced/i,
      /[\d,]+\s*(users|customers|clients)/i,
      /\$[\d,]+/,
      /\d+x/i
    ];
    return metricPatterns.some(pattern => pattern.test(text));
  }
  
  function containsActionVerbs(text: string): boolean {
    const actionVerbs = [
      "developed", "implemented", "created", "designed", "managed", "led",
      "architected", "built", "optimized", "improved", "launched", "scaled"
    ];
    return actionVerbs.some(verb => text.includes(verb.toLowerCase()));
  }
  
  function countSkills(text: string, requiredSkills: string[]): number {
    return requiredSkills.filter(skill => text.toLowerCase().includes(skill.toLowerCase())).length;
  }
  
  interface ScoreParams {
    sections: Record<string, SectionAnalysis>;
    missingSkillsCount: number;
    experienceLevel: ExperienceLevel;
    textLength: number;
    hasMetrics: boolean;
    hasActionVerbs: boolean;
  }
  
  function calculateOverallScore(params: ScoreParams): number {
    let score = 100;
  
    // Deduct for missing or incomplete sections
    Object.values(params.sections).forEach((section) => {
      if (!section.present) score -= 15;
      score -= (100 - section.score) * 0.2;
    });
  
    // Deduct for missing skills
    score -= params.missingSkillsCount * 5;
  
    // Deduct for short resume
    if (params.textLength < 1500) score -= 15;
  
    // Deduct for missing metrics
    if (!params.hasMetrics) score -= 10;
  
    // Deduct for weak verbs
    if (!params.hasActionVerbs) score -= 10;
  
    // Experience level expectations
    if (params.experienceLevel.level === 'Senior' && score < 70) {
      score -= 10; // Higher standards for senior roles
    }
  
    return Math.max(0, Math.min(100, Math.round(score)));
  }
  
  function generateFieldSpecificFeedback(
    field: string, 
    text: string, 
    requirements: FieldRequirements
  ): string[] {
    const feedback: string[] = [];
  
    const missingTools = requirements.expectedTools
      .filter(tool => !text.includes(tool.toLowerCase()));
    if (missingTools.length > 0) {
      feedback.push(`YOU DON'T KNOW ${missingTools[0].toUpperCase()}?! WHAT YEAR ARE YOU LIVING IN?!!!`);
    }
  
    const hasCertifications = requirements.relevantCertifications
      .some(cert => text.includes(cert.toLowerCase()));
    if (!hasCertifications) {
      feedback.push("NO RELEVANT CERTIFICATIONS?! NOT EVEN ONE?!!!");
    }
  
    const missingKeywords = requirements.expectedKeywords
      .filter(keyword => !text.includes(keyword.toLowerCase()));
    if (missingKeywords.length > 0) {
      feedback.push(`WHERE'S THE "${missingKeywords[0].toUpperCase()}" EXPERIENCE?!!!`);
    }
  
    return feedback;
  }
  
  export type { AnalysisResult, SectionAnalysis, ExperienceLevel };