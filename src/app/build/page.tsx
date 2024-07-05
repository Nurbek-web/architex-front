"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multiselect";
import { ArrowLeftIcon, ImageIcon } from "../../../public/icons";

const materialsOptions = [
  { label: "Brick", value: "brick" },
  { label: "Stone", value: "stone" },
  { label: "Wood", value: "wood" },
  { label: "Vinyl Siding", value: "vinyl_siding" },
  { label: "Stucco", value: "stucco" },
  { label: "Concrete", value: "concrete" },
  { label: "Aluminum", value: "aluminum" },
  { label: "Bamboo", value: "bamboo" },
  { label: "Marble", value: "marble" },
  { label: "Granite", value: "granite" },
  { label: "Terracotta", value: "terracotta" },
  { label: "Cedar", value: "cedar" },
  { label: "Iron", value: "iron" },
  { label: "PVC", value: "pvc" },
  { label: "Composite Wood", value: "composite_wood" },
];

export default function Component() {
  const [imageFile, setImageFile] = useState(null);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [exteriorStyle, setExteriorStyle] = useState("");
  const [environment, setEnvironment] = useState("");
  const [time, setTime] = useState("");

  const handleFileChange = (e: any) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("materials", JSON.stringify(selectedMaterials));
    formData.append("exteriorStyle", exteriorStyle);
    formData.append("environment", environment);
    formData.append("time", time);

    try {
      setLoading(true);

      console.log(formData);

      const response = await fetch("http://localhost:5000/upload-exterior", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();
      console.log("Successfully sended request and got response:", data);

      setGeneratedImage(data[1]);
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
      <div className="w-full rounded-lg md:w-96 bg-gray-800 p-6">
        <div className="flex justify-between mb-4">
          <button className="text-white">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="image">Upload Image</Label>
            <Input
              className="text-black"
              id="image"
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <div>
            <Label className="block mb-2">Select an exterior style</Label>
            <Select onValueChange={setExteriorStyle}>
              <SelectTrigger className="text-black">
                <SelectValue
                  placeholder="Select an option"
                  className="text-black"
                />
              </SelectTrigger>
              <SelectContent className="text-black">
                <SelectItem value="modern" className="text-black">
                  modern
                </SelectItem>
                <SelectItem value="minimalist" className="text-black">
                  minimalist
                </SelectItem>
                <SelectItem value="farmhouse" className="text-black">
                  farmhouse
                </SelectItem>
                <SelectItem value="contemporary" className="text-black">
                  contemporary
                </SelectItem>
                <SelectItem value="scandinavian" className="text-black">
                  scandinavian
                </SelectItem>
                <SelectItem value="zen" className="text-black">
                  zen
                </SelectItem>
                <SelectItem value="industrial" className="text-black">
                  industrial
                </SelectItem>
                <SelectItem value="rustic" className="text-black">
                  rustic
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block mb-2">Select materials</Label>
            <MultiSelector
              values={selectedMaterials}
              onValuesChange={setSelectedMaterials}
              loop={false}
            >
              <MultiSelectorTrigger>
                <MultiSelectorInput placeholder="Select materials" />
              </MultiSelectorTrigger>
              <MultiSelectorContent>
                <MultiSelectorList>
                  {materialsOptions.map((material, index) => (
                    <MultiSelectorItem key={index} value={material.value}>
                      {material.label}
                    </MultiSelectorItem>
                  ))}
                </MultiSelectorList>
              </MultiSelectorContent>
            </MultiSelector>
          </div>
          <div>
            <Label className="block mb-2">Select an environment</Label>
            <Select onValueChange={setEnvironment}>
              <SelectTrigger className="text-black">
                <SelectValue
                  placeholder="Select an option"
                  className="text-black"
                />
              </SelectTrigger>
              <SelectContent className="text-black">
                <SelectItem value="residential" className="text-black">
                  residential
                </SelectItem>
                <SelectItem value="rural" className="text-black">
                  rural
                </SelectItem>
                <SelectItem value="forest" className="text-black">
                  forest
                </SelectItem>
                <SelectItem value="snowy" className="text-black">
                  snowy
                </SelectItem>
                <SelectItem value="coastal" className="text-black">
                  coastal
                </SelectItem>
                <SelectItem value="mountainous" className="text-black">
                  mountainous
                </SelectItem>
                <SelectItem value="suburban" className="text-black">
                  suburban
                </SelectItem>
                <SelectItem value="desert" className="text-black">
                  desert
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="block mb-2">Select a time</Label>
            <Select onValueChange={setTime}>
              <SelectTrigger className="text-black">
                <SelectValue
                  placeholder="Select an option"
                  className="text-black"
                />
              </SelectTrigger>
              <SelectContent className="text-black">
                <SelectItem value="day" className="text-black">
                  day
                </SelectItem>
                <SelectItem value="night" className="text-black">
                  night
                </SelectItem>
                <SelectItem value="sunset" className="text-black">
                  sunset
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Generating..." : "Generate Image"}
          </Button>
        </form>
        <div className="mt-4 flex justify-between">
          <button
            className="text-white"
            onClick={() => {
              setImageFile(null);
              setGeneratedImage(null);
              setSelectedMaterials([]);
              setError("");
              setExteriorStyle("");
              setEnvironment("");
              setTime("");
            }}
          >
            Clear All
          </button>
          <Button className="px-4 py-2 rounded">Save</Button>
        </div>
      </div>
    </div>
  );
}
