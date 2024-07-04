import { NextApiRequest, NextApiResponse } from "next";

const HUGGING_FACE_API_URL =
  "https://actuallyastarfish-muzammil-eds-stable-diffusion-f150d63.hf.space/call/predict";

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    try {
      // Send initial request to Hugging Face API
      const initialResponse = await fetch(HUGGING_FACE_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: [prompt] }),
      });

      const initialResult = await initialResponse.json();
      const eventId = initialResult.event_id;

      // Fetch the generated image URL
      const finalResponse = await fetch(`${HUGGING_FACE_API_URL}/${eventId}`, {
        method: "GET",
      });

      console.log("Final response", finalResponse);

      const finalResult = await finalResponse.json();

      if (!finalResult.data || !finalResult.data[0]) {
        throw new Error("Invalid result structure");
      }

      const generatedImageUrl = finalResult.data[0];

      res.status(200).json({ url: generatedImageUrl });
    } catch (error) {
      console.error("Error generating image:", error);
      res.status(500).json({ error: "Failed to generate image" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
