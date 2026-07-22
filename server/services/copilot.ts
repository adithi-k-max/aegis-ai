import { GoogleGenAI } from '@google/genai';
import { PlantState } from '../../src/types';

let ai: GoogleGenAI | null = null;

function getAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey) {
      ai = new GoogleGenAI({ apiKey });
    } else {
      console.warn("GEMINI_API_KEY not found. AI features will be disabled or mocked.");
    }
  }
  return ai;
}

export async function askCopilot(message: string, currentState: PlantState): Promise<string> {
  const genAI = getAI();
  if (!genAI) {
    return "AI is currently offline. Please configure GEMINI_API_KEY.";
  }

  const prompt = `
You are AEGIS AI, an Enterprise Industrial Intelligence Copilot.
You have access to the real-time state of the industrial plant.

Current Plant State:
${JSON.stringify(currentState, null, 2)}

User asks: "${message}"

Respond professionally as an industrial safety expert. 
Include:
1. Executive Summary
2. Evidence (based on current sensor values and state)
3. Confidence Level
4. Recommended Actions (if applicable)

Keep it concise, actionable, and formatted in Markdown.
`;

  try {
    const response = await genAI.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error: any) {
    console.error("AI Error:", error);
    return `Error consulting AI: ${error.message}`;
  }
}
