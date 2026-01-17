
// app/api/user/generate-product-image/route.ts
import { NextRequest, NextResponse } from "next/server";
import { imagekit } from "@/lib/imagekit";

export const runtime = "nodejs"; // important for Buffer

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const base64File = `data:${file.type};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

    const description = formData.get("description")?.toString() || "";
    const size = formData.get("size")?.toString() || "1024x1024";


    const imageKitRef = await imagekit.upload({
      file: base64File,
      fileName: `${Date.now()}.png`,
      isPrivateFile: false,
    });

    console.log("ImageKit upload response:", imageKitRef); 
    return NextResponse.json({ url: imageKitRef.url, description, size });
  } catch (error: any) {
    console.error("API ERROR:", error);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
