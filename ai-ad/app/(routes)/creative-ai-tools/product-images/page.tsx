"use client";

import React, { useState } from 'react'
import FormInput from '../_components/FormInput'
import PreviewResult from '../_components/PreviewResult'
import axios from 'axios';

type FormData = {
  file?: File
  description?: string
  size?: string
  imageUrl?: string
}


function ProductImages() {
  const [formData,setFormData]=useState<FormData>({});
  const [loading,setLoading]=useState(false);
  const onHandleInputChange=(field:string,value:string)=>{
    setFormData((prev: any)=>({
      ...prev,
      [field]: value
    }));
  }

 const OnGenerate = async () => {
  if (!formData?.file) {
    alert("Please upload Product Image");
    return;
  }

  setLoading(true);

  try {
    const formData_ = new FormData();
    formData_.append('file', formData.file);
    formData_.append('description', formData.description ?? '');
    formData_.append('size', formData.size ?? '1024x1024');

    const result = await axios.post('/api/user/generate-product-image', formData_);

    // Log just the URL clearly
    console.log("Generated Image URL:", result.data.url);

    // OPTIONAL: update PreviewResult if needed
    setFormData(prev => ({
      ...prev,
      imageUrl: result.data.url
    }));
  } catch (error: any) {
    console.error("API ERROR:", error.response?.data || error.message);
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
              onHandleInputChange={(field:string,value:string)=>onHandleInputChange(field,value)} 
              onGenerate={OnGenerate}  
              loading={loading}
              />
        </div>
        <div className="md:col-span-2">
            <PreviewResult />
        </div>
      </div>

    </div>
  )
}

export default ProductImages
