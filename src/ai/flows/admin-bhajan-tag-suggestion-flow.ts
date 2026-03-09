'use server';
/**
 * @fileOverview An AI agent to suggest relevant tags and categories for bhajans.
 *
 * - adminBhajanTagSuggestion - A function that handles the bhajan tag and category suggestion process.
 * - AdminBhajanTagSuggestionInput - The input type for the adminBhajanTagSuggestion function.
 * - AdminBhajanTagSuggestionOutput - The return type for the adminBhajanTagSuggestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminBhajanTagSuggestionInputSchema = z.object({
  title: z.string().describe('The title of the bhajan.'),
  description: z
    .string()
    .describe(
      'A detailed description or lyrics excerpt of the bhajan, providing context for tag and category suggestions.'
    ),
});
export type AdminBhajanTagSuggestionInput = z.infer<
  typeof AdminBhajanTagSuggestionInputSchema
>;

const AdminBhajanTagSuggestionOutputSchema = z.object({
  suggestedTags: z
    .array(z.string())
    .describe(
      'A list of suggested tags for the bhajan, such as artist, devotional theme, language, and other relevant keywords.'
    ),
  suggestedCategories: z
    .array(z.string())
    .describe(
      'A list of suggested categories for the bhajan, helping to classify it within broader themes.'
    ),
});
export type AdminBhajanTagSuggestionOutput = z.infer<
  typeof AdminBhajanTagSuggestionOutputSchema
>;

export async function adminBhajanTagSuggestion(
  input: AdminBhajanTagSuggestionInput
): Promise<AdminBhajanTagSuggestionOutput> {
  return adminBhajanTagSuggestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminBhajanTagSuggestionPrompt',
  input: {schema: AdminBhajanTagSuggestionInputSchema},
  output: {schema: AdminBhajanTagSuggestionOutputSchema},
  prompt: `You are an AI assistant specialized in categorizing devotional music (bhajans).
Based on the provided title and description of a bhajan, generate relevant tags and categories.

Suggested tags should include:
- Artist names (if discernible or implied)
- Devotional themes (e.g., Bhakti, Kirtan, Meditation, Festival-specific)
- Language (e.g., Hindi, Sanskrit, Gujarati)
- Musical instruments (e.g., Tabla, Harmonium)
- Mood (e.g., Peaceful, Energetic)
- Other relevant keywords

Suggested categories should be broader classifications.

Title: {{{title}}}
Description: {{{description}}}
`,
});

const adminBhajanTagSuggestionFlow = ai.defineFlow(
  {
    name: 'adminBhajanTagSuggestionFlow',
    inputSchema: AdminBhajanTagSuggestionInputSchema,
    outputSchema: AdminBhajanTagSuggestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
