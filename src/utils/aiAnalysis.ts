import { HfInference } from '@huggingface/inference';

const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

interface AIAnalysisResult {
  skillsConfidence: number;
  experienceQuality: number;
  suggestedImprovements: string[];
}

// Add interface for the API response
interface ClassificationResponse {
  sequence: string;
  labels: string[];
  scores: number[];
}

export async function analyzeWithAI(text: string, field: string): Promise<AIAnalysisResult> {
  try {
    // Cast the response to our interface
    const classificationResult = await hf.zeroShotClassification({
      model: 'facebook/bart-large-mnli',
      inputs: text,
      parameters: {
        candidate_labels: [
          'strong technical skills',
          'good experience',
          'needs improvement',
          'entry level',
          'senior level'
        ],
        multi_label: true
      },
    }) as unknown as ClassificationResponse;

    const analysisResult = await hf.textGeneration({
      model: 'gpt2',
      inputs: `Analyze this resume text and identify key missing elements: ${text.substring(0, 500)}`,
      parameters: {
        max_new_tokens: 100,
        num_return_sequences: 1,
        temperature: 0.7,
      },
    });

    if (!analysisResult) {
      throw new Error('AI COULDN\'T READ YOUR RESUME! IS IT THAT BAD?!!!');
    }

    const technicalSkillsScore = classificationResult.scores[0] * 100;
    const experienceScore = classificationResult.scores[1] * 100;
    const needsImprovementScore = classificationResult.scores[2] * 100;

    const improvements: string[] = [];
    
    if (technicalSkillsScore < 70) {
      improvements.push("AI SAYS YOUR TECHNICAL SKILLS ARE WEAK!!!");
    }
    
    if (experienceScore < 70) {
      improvements.push("AI THINKS YOUR EXPERIENCE IS LACKING!!!");
    }

    if (needsImprovementScore > 30) {
      improvements.push("AI SAYS YOUR RESUME NEEDS SERIOUS WORK!!!");
    }

    improvements.push(`AI ANALYZED YOUR ${field.toUpperCase()} EXPERIENCE AND IT'S NOT IMPRESSED!!!`);

    return {
      skillsConfidence: technicalSkillsScore,
      experienceQuality: experienceScore,
      suggestedImprovements: improvements,
    };
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error('AI ANALYSIS FAILED! YOUR RESUME BROKE THE AI!!!');
  }
}