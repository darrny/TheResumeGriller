import { getDocument, GlobalWorkerOptions, version } from 'pdfjs-dist';

// Set up the worker
GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${version}/pdf.worker.min.js`;

export async function extractTextFromPDF(file: File): Promise<string> {
  try {
    console.log('Starting PDF extraction...');
    const arrayBuffer = await file.arrayBuffer();
    console.log('File converted to ArrayBuffer');

    const pdf = await getDocument({ data: arrayBuffer }).promise;
    console.log('PDF loaded, number of pages:', pdf.numPages);

    let fullText = '';
    
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`Processing page ${i}...`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + ' ';
    }
    
    console.log('Text extraction complete');
    return fullText.trim();
  } catch (error) {
    console.error('Error in extractTextFromPDF:', error);
    throw new Error('FAILED TO EXTRACT TEXT FROM YOUR PATHETIC RESUME!!!');
  }
}

interface FieldRequirements {
    requiredSkills: string[];
    toolsAndTechnologies: string[];
    certifications: string[];
    keyPhrases: string[];
    metrics: string[];
  }
  
  const fieldRequirements: Record<string, FieldRequirements> = {
    "Artificial Intelligence (AI)": {
      requiredSkills: [
        "Machine Learning",
        "Deep Learning",
        "Neural Networks",
        "Natural Language Processing",
        "Computer Vision"
      ],
      toolsAndTechnologies: [
        "TensorFlow",
        "PyTorch",
        "Keras",
        "Scikit-learn",
        "CUDA"
      ],
      certifications: [
        "Google AI",
        "IBM AI Engineering",
        "Deep Learning Specialization"
      ],
      keyPhrases: [
        "model accuracy",
        "training",
        "optimization",
        "inference"
      ],
      metrics: [
        "model accuracy",
        "inference time",
        "training performance"
      ]
    },
    "Machine Learning (ML)": {
      requiredSkills: [
        "Statistical Analysis",
        "Feature Engineering",
        "Model Development",
        "Data Preprocessing",
        "Algorithm Design"
      ],
      toolsAndTechnologies: [
        "Python",
        "Scikit-learn",
        "Pandas",
        "NumPy",
        "Jupyter"
      ],
      certifications: [
        "AWS Machine Learning",
        "Google Machine Learning",
        "Stanford ML"
      ],
      keyPhrases: [
        "model deployment",
        "feature selection",
        "cross-validation"
      ],
      metrics: [
        "model performance",
        "accuracy improvements",
        "optimization results"
      ]
    },
    "Data Science": {
      requiredSkills: [
        "Data Analysis",
        "Statistical Modeling",
        "Data Visualization",
        "Machine Learning",
        "SQL"
      ],
      toolsAndTechnologies: [
        "Python",
        "R",
        "Tableau",
        "PowerBI",
        "SQL",
        "Jupyter"
      ],
      certifications: [
        "IBM Data Science",
        "Google Data Analytics",
        "DataCamp Certifications"
      ],
      keyPhrases: [
        "data analysis",
        "insights",
        "predictive modeling"
      ],
      metrics: [
        "accuracy improvements",
        "business impact",
        "cost savings"
      ]
    },
    "Cloud Computing": {
      requiredSkills: [
        "Cloud Architecture",
        "DevOps",
        "Containerization",
        "Infrastructure as Code",
        "Microservices"
      ],
      toolsAndTechnologies: [
        "AWS",
        "Azure",
        "GCP",
        "Docker",
        "Kubernetes",
        "Terraform"
      ],
      certifications: [
        "AWS Solutions Architect",
        "Azure Administrator",
        "GCP Cloud Engineer"
      ],
      keyPhrases: [
        "cloud migration",
        "scalability",
        "high availability"
      ],
      metrics: [
        "uptime",
        "cost optimization",
        "performance improvements"
      ]
    },
    "Cybersecurity": {
      requiredSkills: [
        "Network Security",
        "Penetration Testing",
        "Risk Assessment",
        "Security Protocols",
        "Incident Response"
      ],
      toolsAndTechnologies: [
        "Wireshark",
        "Metasploit",
        "Nmap",
        "Burp Suite",
        "Snort"
      ],
      certifications: [
        "CompTIA Security+",
        "CISSP",
        "CEH"
      ],
      keyPhrases: [
        "vulnerability assessment",
        "security audit",
        "threat detection"
      ],
      metrics: [
        "incident response time",
        "vulnerability patches",
        "security improvements"
      ]
    },
    "Blockchain Development": {
      requiredSkills: [
        "Smart Contracts",
        "DApp Development",
        "Cryptography",
        "Consensus Mechanisms",
        "Web3"
      ],
      toolsAndTechnologies: [
        "Solidity",
        "Web3.js",
        "Truffle",
        "Hardhat",
        "Ethereum"
      ],
      certifications: [
        "Certified Blockchain Developer",
        "Ethereum Developer Certification",
        "Hyperledger Certification"
      ],
      keyPhrases: [
        "smart contract deployment",
        "blockchain implementation",
        "defi protocols"
      ],
      metrics: [
        "transaction throughput",
        "gas optimization",
        "security audits"
      ]
    },
    "Software Development": {
      requiredSkills: [
        "Object-Oriented Programming",
        "Design Patterns",
        "API Development",
        "Testing",
        "Version Control"
      ],
      toolsAndTechnologies: [
        "Java",
        "Python",
        "C++",
        "Git",
        "Jenkins"
      ],
      certifications: [
        "AWS Developer",
        "Oracle Certified Professional",
        "Microsoft Certified"
      ],
      keyPhrases: [
        "software architecture",
        "code optimization",
        "agile development"
      ],
      metrics: [
        "code coverage",
        "performance improvements",
        "bug reduction"
      ]
    },
    "Web Development": {
      requiredSkills: [
        "Frontend Development",
        "Backend Development",
        "Responsive Design",
        "Web Security",
        "SEO"
      ],
      toolsAndTechnologies: [
        "React",
        "Node.js",
        "TypeScript",
        "Next.js",
        "MongoDB"
      ],
      certifications: [
        "AWS Developer",
        "Meta Frontend Developer",
        "Full Stack Developer"
      ],
      keyPhrases: [
        "responsive design",
        "performance optimization",
        "user experience"
      ],
      metrics: [
        "page load time",
        "conversion rate",
        "user engagement"
      ]
    }
  };
  
  export function analyzeResume(text: string, field: string) {
    const textLower = text.toLowerCase();
    const requirements = fieldRequirements[field] || {
      requiredSkills: [],
      toolsAndTechnologies: [],
      certifications: [],
      keyPhrases: [],
      metrics: []
    };
  
    // Check for missing required skills
    const missingSkills = requirements.requiredSkills.filter(
      skill => !textLower.includes(skill.toLowerCase())
    );
  
    // Check for missing tools and technologies
    const missingTools = requirements.toolsAndTechnologies.filter(
      tool => !textLower.includes(tool.toLowerCase())
    );
  
    // Check for certifications
    const hasCertifications = requirements.certifications.some(
      cert => textLower.includes(cert.toLowerCase())
    );
  
    // Check for key phrases
    const missingPhrases = requirements.keyPhrases.filter(
      phrase => !textLower.includes(phrase.toLowerCase())
    );
  
    // Check for metrics
    const hasMetrics = requirements.metrics.some(
      metric => textLower.includes(metric.toLowerCase())
    );
  
    // Generate improvements array
    const improvements = [
      !text.includes('github.com') && "WHERE'S YOUR GITHUB LINK?! ARE YOU HIDING YOUR CODE?!!!",
      text.split(' ').length < 200 && "THIS RESUME IS TOO SHORT! ARE YOU LAZY?!!!",
      !textLower.includes('project') && "NO PROJECTS SECTION?! WHAT HAVE YOU BEEN DOING?!!!",
      !hasMetrics && "WHERE ARE THE METRICS?! QUANTIFY YOUR ACHIEVEMENTS!!!",
      !hasCertifications && "NO CERTIFICATIONS?! NOT EVEN ONE?!!!",
      missingTools.length > 0 && `YOU DON'T KNOW ${missingTools[0].toUpperCase()}?! WHAT YEAR ARE YOU LIVING IN?!!!`,
      missingPhrases.length > 0 && "YOUR EXPERIENCE DESCRIPTIONS ARE WEAKER THAN INSTANT COFFEE!!!"
    ].filter(Boolean) as string[];
  
    // Calculate score
    const score = calculateScore({
      text,
      missingSkillsCount: missingSkills.length,
      missingToolsCount: missingTools.length,
      hasCertifications,
      hasMetrics,
      hasProjects: textLower.includes('project')
    });
  
    return {
      skillsGap: [...missingSkills, ...missingTools].slice(0, 3),
      improvements,
      score,
      fieldSpecificFeedback: generateFieldSpecificFeedback(field, textLower)
    };
  }
  
  interface ScoreParams {
    text: string;
    missingSkillsCount: number;
    missingToolsCount: number;
    hasCertifications: boolean;
    hasMetrics: boolean;
    hasProjects: boolean;
  }
  
  function calculateScore(params: ScoreParams): number {
    let score = 100;
  
    // Deduct for missing skills and tools
    score -= (params.missingSkillsCount + params.missingToolsCount) * 5;
    
    // Deduct for missing certifications
    if (!params.hasCertifications) score -= 10;
    
    // Deduct for missing metrics
    if (!params.hasMetrics) score -= 15;
    
    // Deduct for missing projects
    if (!params.hasProjects) score -= 15;
    
    // Deduct for short resume
    if (params.text.split(' ').length < 200) score -= 15;
    
    // Deduct for missing GitHub
    if (!params.text.includes('github.com')) score -= 10;
  
    return Math.max(0, Math.min(100, score));
  }
  
  function generateFieldSpecificFeedback(field: string, text: string): string {
    const fieldFeedback: Record<string, string> = {
      "Artificial Intelligence (AI)": "YOUR AI EXPERIENCE IS AS ARTIFICIAL AS IT GETS!!!",
      "Machine Learning (ML)": "YOUR ML MODELS WOULD STRUGGLE TO PREDICT 2+2!!!",
      // Add more field-specific feedback...
    };
  
    return fieldFeedback[field] || "YOUR EXPERIENCE IS AS GENERIC AS STORE-BRAND CEREAL!!!";
  }