"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { ArrowLeftIcon, ImageIcon } from "../../../public/icons";
import { Input } from "@/components/ui/input";

export default function Component() {
  const [generatedImage, setGeneratedImage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const fullPrompt = `Generate Floor plan. Number of bedrooms: ${bedrooms}. Number of bathrooms: ${bathrooms}.`;

    console.log(fullPrompt);

    try {
      // First request to get the event ID
      const response = await fetch(
        "https://actuallyastarfish-muzammil-eds-stable-diffusion-f150d63.hf.space/call/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: [fullPrompt],
          }),
        }
      );

      const result = await response.json();
      console.log("result: ", result.event_id);
      const eventId = result.event_id;

      console.log("got eventID", eventId);

      // Second request to get the generated image using the event ID

      const imageResponse = await fetch(
        `https://actuallyastarfish-muzammil-eds-stable-diffusion-f150d63.hf.space/call/predict/${eventId}`
      );

      const data = await imageResponse.text();

      // Extract the JSON part from the data string
      const jsonDataString = data.split("\n")[1].replace("data: ", "");
      const jsonData = JSON.parse(jsonDataString);

      // Access the path
      const path = jsonData[0].path;
      console.log(path); // Output: /tmp/gradio/a335fd118f84ffd4b80f93ac092edf26c2a3618b/image.webp

      const url =
        "https://actuallyastarfish-muzammil-eds-stable-diffusion-f150d63.hf.space/file=" +
        path;

      setGeneratedImage(url);
    } catch (err) {
      console.log("ERROR OCCURRED", err);
      setError("Failed to generate image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setPrompt("");
    setBedrooms("");
    setBathrooms("");
    setGeneratedImage("");
    setError("");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen text-white">
      <div className="flex-1 flex flex-col items-center justify-center">
        {generatedImage ? (
          <img
            src={generatedImage}
            alt="Your dream house"
            className="w-full p-2 h-[100dvh] rounded object-contain"
            style={{ borderRadius: "20px" }}
          />
        ) : (
          <ImageIcon className="w-48 h-48 text-gray-400" />
        )}
      </div>
      <div className="w-full md:w-96 rounded-lg bg-gray-800 p-6">
        <div className="flex justify-between mb-4">
          <button className="text-white">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block mb-2">Overall space (m2)</Label>
            <Input
              className="text-black"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
          <div>
            <Label className="block mb-2">Select bedroom number</Label>
            <Select value={bedrooms} onValueChange={setBedrooms}>
              <SelectTrigger className="text-black">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block mb-2">Select bathroom number</Label>
            <Select value={bathrooms} onValueChange={setBathrooms}>
              <SelectTrigger className="text-black">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Generating..." : "Generate plan"}
          </Button>
        </form>
        {error && <div className="mt-4 text-red-500">{error}</div>}
        <div className="mt-4 flex justify-between">
          <button className="text-white" onClick={clearFields}>
            Clear All
          </button>
          <button className="bg-yellow-500 text-black px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
