
import { GoogleGenAI } from "@google/genai";
import { ZoneKPI } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the environment variable is set.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });
const model = 'gemini-2.5-flash';

export const generateSimulationSummary = async (projectName: string, simulationName: string, goal: string, kpis: ZoneKPI[]): Promise<string> => {
  if (!API_KEY) {
    return Promise.resolve("Error: Gemini API key is not configured.");
  }

  const kpiString = kpis.map(kpi => 
    `- ${kpi.name}: Coverage ${kpi.coverage}%, Avg. SNR ${kpi.avgSNR} dB ${kpi.hasWarning ? '(WARNING: POOR COVERAGE)' : ''}`
  ).join('\n');

  const prompt = `
    Generate an executive summary for a wireless network simulation report.
    Be concise, professional, and start with a clear "Overall Assessment".

    **Project Name:** ${projectName}
    **Simulation Name:** ${simulationName}
    **Simulation Goal:** ${goal}

    **Key Performance Indicators (KPIs) by Zone:**
    ${kpiString}

    **Instructions:**
    1.  **Overall Assessment:** Start with a one-sentence summary of whether the simulation met its goal and if there are any critical issues.
    2.  **Key Findings:** Briefly highlight the most important results, mentioning specific zones with excellent or poor performance.
    3.  **Recommendations:** Based on the results, suggest one or two potential next steps (e.g., "Consider deploying an additional access point in the Lobby" or "The current design is robust and ready for deployment.").
    4.  Keep the entire summary to under 150 words.
    `;
    
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.5,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error generating simulation summary:", error);
    return "An error occurred while generating the summary. Please check the console for details.";
  }
};
