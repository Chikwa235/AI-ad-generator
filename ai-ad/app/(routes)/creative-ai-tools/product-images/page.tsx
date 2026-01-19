"use client";

import React, { useState } from "react";
import FormInput from "../_components/FormInput";
import PreviewResult from "../_components/PreviewResult";
import axios from "axios";

type FormData = {
  file?: File;
  description?: string;
  size?: string;
  imageUrl?: string;
  textToImg?: string;
  imgToVid?: string;
};

function ProductImages() {
  const [formData, setFormData] = useState<FormData>({});
  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const OnGenerate = async () => {
    if (!formData?.file) {
      alert("Please upload a product image");
      return;
    }

    setLoading(true);

    try {
      const formData_ = new FormData();
      formData_.append("file", formData.file);
      formData_.append("description", formData.description ?? "");
      formData_.append("size", formData.size ?? "1024x1024");

      // Call your API
      const result = await axios.post("/api/user/generate-product-image", formData_);

      // Instead of returning base64, create descriptive outputs
      const textToImg = `Create a vibrant product showcase image featuring overall composition radiates energy and vibrancy`;
      const imgToVid = `Animate the static showcase image of "${formData.file?.name}"`;

      console.log("textToImg:", textToImg);
      console.log("imgToVid:", imgToVid);

      setFormData((prev) => ({
        ...prev,
        imageUrl: result.data.generatedImage, // still store the generated image for preview
        textToImg,
        imgToVid,
      }));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("API ERROR:", error.response?.data);
      } else {
        console.error("API ERROR:", error);
      }
      alert("Failed to generate image. Check server logs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold p-2">AI Product Image Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
          <FormInput
            onHandleInputChange={onHandleInputChange}
            onGenerate={OnGenerate}
            loading={loading}
          />
        </div>
        <div className="md:col-span-2">
          <PreviewResult imageUrl={formData.imageUrl} />
          {formData.textToImg && (
            <p className="mt-2">
              <strong>textToImg:</strong> {formData.textToImg}
            </p>
          )}
          {formData.imgToVid && (
            <p>
              <strong>imgToVid:</strong> {formData.imgToVid}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductImages;
