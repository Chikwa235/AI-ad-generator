import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { imagekit } from "@/lib/imagekit";

export const runtime = "nodejs";

const HF_MODEL =
  "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.HF_TOKEN) {
      throw new Error("HF_TOKEN missing");
    }

    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64File = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploaded = await imagekit.upload({
      file: base64File,
      fileName: `${Date.now()}.png`,
      isPrivateFile: false,
    });

    const hfResponse = await axios.post(
      HF_MODEL,
      {
        inputs:
          "A cinematic product showcase, vibrant liquid splashes, studio lighting, ultra-detailed",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_TOKEN}`,
          Accept: "image/png",
        },
        responseType: "arraybuffer",
        timeout: 120000,
      }
    );

    const contentType = hfResponse.headers["content-type"];
    if (!contentType?.startsWith("image/")) {
      throw new Error("HF did not return an image");
    }

    const generatedImage = `data:image/png;base64,${Buffer.from(
      hfResponse.data
    ).toString("base64")}`;

    return NextResponse.json({
      originalImage: uploaded.url,
      generatedImage,
    });
  } catch (err: any) {
    console.error(
      "HF ERROR:",
      err.response?.data
        ? Buffer.from(err.response.data).toString()
        : err.message
    );

    return NextResponse.json(
      { error: "Image generation failed" },
      { status: 500 }
    );
  }
}

