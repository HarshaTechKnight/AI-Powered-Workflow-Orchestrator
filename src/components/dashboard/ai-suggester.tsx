"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateAutomationSuggestions, AutomationSuggestionsOutput } from "@/ai/flows/ai-generated-automation-suggestions";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Lightbulb, Loader2, Sparkles } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  usagePatterns: z.string().min(10, "Please describe your usage patterns in more detail."),
  connectedApps: z.string().min(3, "Please list at least one connected app."),
  desiredOutcomes: z.string().min(10, "Please describe your desired outcomes in more detail."),
});

type FormValues = z.infer<typeof formSchema>;

export function AiSuggester() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AutomationSuggestionsOutput | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      usagePatterns: "",
      connectedApps: "",
      desiredOutcomes: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const suggestions = await generateAutomationSuggestions(values);
      setResult(suggestions);
    } catch (e) {
      setError("Failed to generate suggestions. Please try again.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Sparkles className="text-primary" />
            <CardTitle>AI Automation Suggestions</CardTitle>
        </div>
        <CardDescription>
          Let our AI find new automation opportunities for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="usagePatterns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Usage Patterns</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., I frequently download reports from Salesforce and upload them to Google Drive..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="connectedApps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Connected Apps</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Salesforce, Google Drive, Slack" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="desiredOutcomes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Desired Outcomes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., I want to automate the process of sending weekly sales summaries to my team on Slack." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Suggestions
            </Button>
          </form>
        </Form>
        
        <div className="mt-6 flex-grow">
          {error && <p className="text-destructive text-sm">{error}</p>}
          {result && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>Here are your suggestions!</AlertTitle>
              <AlertDescription className="space-y-2 mt-2">
                <p className="font-semibold italic">"{result.reasoning}"</p>
                <ul className="list-disc pl-5 space-y-1 pt-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
