'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI-driven automation suggestions.
 *
 * It includes:
 * - `generateAutomationSuggestions`:  A function that takes user context and returns AI-driven automation suggestions.
 * - `AutomationSuggestionsInput`: The input type for the `generateAutomationSuggestions` function.
 * - `AutomationSuggestionsOutput`: The output type for the `generateAutomationSuggestions` function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AutomationSuggestionsInputSchema = z.object({
  usagePatterns: z
    .string()
    .describe("Description of the user's current usage patterns within the platform."),
  connectedApps: z
    .string()
    .describe('A list of applications currently connected to the platform.'),
  desiredOutcomes: z
    .string()
    .describe(
      'Description of the desired outcomes or goals the user wants to achieve with automation.'
    ),
});
export type AutomationSuggestionsInput = z.infer<
  typeof AutomationSuggestionsInputSchema
>;

const AutomationSuggestionsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe(
      'A list of AI-driven automation suggestions based on the input data.'
    ),
  reasoning: z
    .string()
    .describe(
      'Explanation of why the automations are suggested given the inputs.'
    ),
});
export type AutomationSuggestionsOutput = z.infer<
  typeof AutomationSuggestionsOutputSchema
>;

export async function generateAutomationSuggestions(
  input: AutomationSuggestionsInput
): Promise<AutomationSuggestionsOutput> {
  return automationSuggestionsFlow(input);
}

const automationSuggestionsPrompt = ai.definePrompt({
  name: 'automationSuggestionsPrompt',
  input: {schema: AutomationSuggestionsInputSchema},
  output: {schema: AutomationSuggestionsOutputSchema},
  prompt: `You are an AI-powered automation suggestion engine. Analyze the user's usage patterns, connected apps, and desired outcomes to suggest new automation workflows.

Usage Patterns: {{{usagePatterns}}}
Connected Apps: {{{connectedApps}}}
Desired Outcomes: {{{desiredOutcomes}}}

Based on this information, provide a list of automation suggestions that would benefit the user. Explain your reasoning.

Suggestions:
Reasoning: `,
});

const automationSuggestionsFlow = ai.defineFlow(
  {
    name: 'automationSuggestionsFlow',
    inputSchema: AutomationSuggestionsInputSchema,
    outputSchema: AutomationSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await automationSuggestionsPrompt(input);
    return output!;
  }
);
