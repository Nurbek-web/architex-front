"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const HUGGING_FACE_API_URL =
  "https://actuallyastarfish-muzammil-eds-stable-diffusion-f150d63.hf.space/call/predict";

export default function Component() {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt.trim()) {
      alert("Please provide a prompt.");
      return;
    }

    console.log("Your prompt:", prompt);

    try {
      setLoading(true);

      // Send initial request to Hugging Face API
      const initialResponse = await fetch(HUGGING_FACE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [prompt] }),
      });

      const initialResponseText = await initialResponse.text();
      console.log("Initial Response Text:", initialResponseText);

      if (!initialResponse.ok) {
        throw new Error(`Initial request failed: ${initialResponseText}`);
      }

      const initialResult = JSON.parse(initialResponseText);
      console.log("Initial Result:", initialResult);
      const eventId = initialResult.event_id;

      // Fetch the generated image URL
      const finalResponse = await fetch(`${HUGGING_FACE_API_URL}/${eventId}`, {
        method: "GET",
      });

      const finalResponseText = await finalResponse.text();
      console.log("Final Response Text:", finalResponseText);

      if (!finalResponse.ok) {
        throw new Error(`Final request failed: ${finalResponseText}`);
      }

      // Extract the JSON data from the SSE response
      const dataLine = finalResponseText
        .split("\n")
        .find((line) => line.startsWith("data: "));
      if (!dataLine) {
        throw new Error("No data found in the response");
      }

      const finalResult = JSON.parse(dataLine.replace("data: ", ""));
      console.log("Final Result:", finalResult);

      if (!finalResult || !finalResult[0] || !finalResult[0].url) {
        throw new Error("Invalid result structure");
      }

      const generatedImageUrl = finalResult[0].url;

      setGeneratedImage(generatedImageUrl);
      setError(""); // Reset error state on successful image generation
    } catch (error: any) {
      console.error("Error generating image:", error);
      setError("Failed to generate image: " + error.message);
      setGeneratedImage(null); // Reset generatedImage state to null on error
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="max-w-xl w-full px-4 py-8 md:px-6 md:py-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Generate AI-Powered Images
          </h1>
          <p className="text-muted-foreground">
            Provide a prompt to generate a unique AI-created image.
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e: any) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="mt-1"
              rows={3}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Generating..." : "Generate Image"}
          </Button>
        </form>
      </div>
      <div className="max-w-xl w-full px-4 py-8 md:px-6 md:py-12">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Your Generated Image
          </h2>
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-muted">
            {generatedImage !== null ? (
              <img
                src={generatedImage}
                alt="Generated Image"
                className="w-full h-full object-contain"
              />
            ) : error ? (
              <p className="text-base text-red-500">{error}</p>
            ) : (
              <p className="text-base text-muted-foreground">
                No image generated yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
