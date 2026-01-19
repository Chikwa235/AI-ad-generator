import axios from "axios";

const HF_TOKEN = process.env.HF_TOKEN;

const HF_IMAGE_MODEL =
  "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";

export async function generateImage(prompt: string) {
  const response = await axios.post(
    HF_IMAGE_MODEL,
    { inputs: prompt },
    {
      headers: {
        Authorization: `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      responseType: "arraybuffer",
    }
  );

  return `data:image/png;base64,${Buffer.from(response.data).toString("base64")}`;
}

// ------------------- TEST BLOCK -------------------
// Only run when executing this file directly
if (import.meta.url === `file://${process.argv[1]}`) {
  (async () => {
    try {
      const img = await generateImage(
        "A red sports car in a forest, ultra realistic"
      );
      console.log("Image generated successfully:", img.slice(0, 100), "…"); // only first 100 chars
    } catch (e: any) {
      console.error("HF test error:", e.response?.data || e.message);
    }
  })();
}

