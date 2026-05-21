// Client-side AI flow (converted from Next.js 'use server')
/**
 * @fileOverview An AI agent that analyzes website source code to provide architectural summaries and logic explanations.
 *
 * - aiSourceCodeAnalyzer - A function that handles the website source code analysis process.
 * - AiSourceCodeAnalyzerInput - The input type for the aiSourceCodeAnalyzer function.
 * - AiSourceCodeAnalyzerOutput - The return type for the aiSourceCodeAnalyzer function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiSourceCodeAnalyzerInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to analyze.'),
  htmlContent: z.string().describe('The raw HTML content of the website.'),
  cssContent: z.string().describe('The aggregated CSS content of the website.'),
  jsContent: z.string().describe('The aggregated JavaScript content of the website.'),
});
export type AiSourceCodeAnalyzerInput = z.infer<typeof AiSourceCodeAnalyzerInputSchema>;

const AiSourceCodeAnalyzerOutputSchema = z.object({
  architecturalSummary: z.string().describe('A high-level architectural summary of the website.'),
  codeLogicExplanation: z.string().describe('An explanation of the underlying code logic and functionality.'),
});
export type AiSourceCodeAnalyzerOutput = z.infer<typeof AiSourceCodeAnalyzerOutputSchema>;

export async function aiSourceCodeAnalyzer(input: AiSourceCodeAnalyzerInput): Promise<AiSourceCodeAnalyzerOutput> {
  return aiSourceCodeAnalyzerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiSourceCodeAnalyzerPrompt',
  input: {schema: AiSourceCodeAnalyzerInputSchema},
  output: {schema: AiSourceCodeAnalyzerOutputSchema},
  prompt: `You are an expert web developer and an AI assistant specializing in analyzing website architecture and code logic.
Your task is to analyze the provided raw HTML, CSS, and JavaScript content of a website and generate:
1. A concise architectural summary: Describe the overall structure, technologies used (frontend frameworks, libraries, etc., if discernible), and how different parts of the website are organized.
2. A detailed explanation of the underlying code logic: Focus on key functionalities implemented in the JavaScript, how the CSS styles the HTML, and any significant patterns or algorithms you observe. Explain how the interactive elements work and how data might be handled.

The analysis should be insightful, clear, and easy for another developer to understand, helping them quickly grasp the site's structure and functionality without manual deep diving.

Website URL for context: {{{url}}}

---
Raw HTML Content:
\`\`\`html
{{{htmlContent}}}
\`\`\`

---
Aggregated CSS Content:
\`\`\`css
{{{cssContent}}}
\`\`\`

---
Aggregated JavaScript Content:
\`\`\`javascript
{{{jsContent}}}
\`\`\`

Please provide your output in a JSON format matching the following structure:
{{jsonSchema AiSourceCodeAnalyzerOutputSchema}}`,
});

const aiSourceCodeAnalyzerFlow = ai.defineFlow(
  {
    name: 'aiSourceCodeAnalyzerFlow',
    inputSchema: AiSourceCodeAnalyzerInputSchema,
    outputSchema: AiSourceCodeAnalyzerOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI failed to generate analysis.');
    }
    return output;
  }
);
