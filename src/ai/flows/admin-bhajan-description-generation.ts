'use server';
/**
 * @fileOverview An AI agent for generating descriptions for bhajans.
 *
 * - generateBhajanDescription - A function that handles the bhajan description generation process.
 * - GenerateBhajanDescriptionInput - The input type for the generateBhajanDescription function.
 * - GenerateBhajanDescriptionOutput - The return type for the generateBhajanDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBhajanDescriptionInputSchema = z.object({
  title: z.string().describe('The title of the bhajan.'),
  keywords: z
    .array(z.string())
    .describe('A list of keywords associated with the bhajan, e.g., artist, deity, theme.'),
});
export type GenerateBhajanDescriptionInput = z.infer<
  typeof GenerateBhajanDescriptionInputSchema
>;

const GenerateBhajanDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A concise and thematic description for the bhajan.'),
});
export type GenerateBhajanDescriptionOutput = z.infer<
  typeof GenerateBhajanDescriptionOutputSchema
>;

export async function generateBhajanDescription(
  input: GenerateBhajanDescriptionInput
): Promise<GenerateBhajanDescriptionOutput> {
  return adminBhajanDescriptionGenerationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminBhajanDescriptionPrompt',
  input: {schema: GenerateBhajanDescriptionInputSchema},
  output: {schema: GenerateBhajanDescriptionOutputSchema},
  prompt: `You are an AI assistant specialized in writing concise and thematic descriptions for devotional music (bhajans).
Your goal is to create engaging descriptions that capture the essence of the bhajan for an admin panel.

Generate a description based on the following information:

Bhajan Title: {{{title}}}
Associated Keywords: {{#each keywords}}{{{this}}}{{#unless @last}}, {{/unless}}{{/each}}

Guidelines for the description:
- Be concise (2-3 sentences).
- Highlight the devotional theme or spiritual message.
- Mention any prominent aspects suggested by the keywords (e.g., artist, deity).
- Maintain a tone consistent with spiritual and traditional Indian aesthetics.
`,
});

const adminBhajanDescriptionGenerationFlow = ai.defineFlow(
  {
    name: 'adminBhajanDescriptionGenerationFlow',
    inputSchema: GenerateBhajanDescriptionInputSchema,
    outputSchema: GenerateBhajanDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
