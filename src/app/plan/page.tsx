"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Component() {
  const [imageFile, setImageFile] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    if (!prompt.trim()) {
      alert("Please provide a prompt.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("prompt", prompt);

    try {
      setLoading(true);
      const response = await fetch(
        "https://actuallyastarfish-muzammil-eds-stable-diffusion-f150d63.hf.space/call/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: ["Hello!!"],
          }),
        }
      );

      const responseData = await response.json();
      const eventId = responseData.data[0];

      const resultResponse = await fetch(
        `https://actuallyastarfish-muzammil-eds-stable-diffusion-f150d63.hf.space/call/predict/${eventId}`,
        {
          method: "GET",
        }
      );

      if (!resultResponse.ok) {
        throw new Error("Failed to fetch the result");
      }

      const resultData = await resultResponse.json();
      setGeneratedImage(resultData.data[1]);
      setError(""); // Reset error state on successful image generation
    } catch (error) {
      console.error("Error generating image:", error);
      setError("Failed to generate image");
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
            Upload an image and provide a prompt to generate a unique AI-created
            image.
          </p>
        </div>
        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="prompt">Prompt</Label>
            <Textarea
              id="prompt"
              name="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to generate..."
              className="mt-1"
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input id="photo" type="file" onChange={handleFileChange} />
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

function CloudUploadIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}
