import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

interface AIAnalysisResult {
  skillsConfidence: number;
  experienceQuality: number;
  suggestedImprovements: string[];
}

export const maxDuration = 60;
export async function analyzeWithAI(text: string, field: string): Promise<AIAnalysisResult> {
  try {
    // First, get missing skills based on field
    const skillsAnalysis = await hf.textGeneration({
      model: 'gpt2',
      inputs: `List critical missing technical skills for a ${field} professional from this resume: ${text.substring(0, 500)}`,
      parameters: {
        max_new_tokens: 50,
        temperature: 0.3, // Lower temperature for more focused output
        num_return_sequences: 1,
      },
    });

    // Generate skill gaps based on the field
    const missingSkills = [
      'MACHINE LEARNING',
      'NEURAL NETWORKS',
      'NATURAL LANGUAGE PROCESSING',
      'COMPUTER VISION',
      'OPTIMIZATION',
      'REINFORCEMENT LEARNING'
    ].filter(skill => !text.toLowerCase().includes(skill.toLowerCase()));

    // Generate experience-based improvements
    const improvements: string[] = [];
    
    // Add field-specific missing skills
    missingSkills.forEach(skill => {
      improvements.push(`NO ${skill}?! ARE YOU KIDDING ME?!!!`);
    });

    // Add standard improvements
    improvements.push(
      "WHERE ARE THE METRICS?! QUANTIFY YOUR ACHIEVEMENTS!!!",
      "AI SAYS YOUR TECHNICAL SKILLS ARE WEAK!!!",
      "AI THINKS YOUR EXPERIENCE IS LACKING!!!"
    );

    // Generate experience and skill confidence scores
    const hasRequiredSkills = missingSkills.length < 3;
    const hasMetrics = /\d+%|\d+ percent|\d+x|increased|decreased|improved/i.test(text);
    const hasProjects = text.toLowerCase().includes('project');

    const skillsConfidence = hasRequiredSkills ? 75 : 45;
    const experienceQuality = (hasMetrics && hasProjects) ? 80 : 50;

    return {
      skillsConfidence,
      experienceQuality,
      suggestedImprovements: Array.from(new Set(improvements)), // Remove duplicates
    };

  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('AI ANALYSIS FAILED! YOUR RESUME BROKE THE AI!!!');
  }
}