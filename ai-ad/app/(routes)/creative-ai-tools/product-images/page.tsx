import React, { useState } from 'react'
import FormInput from '../_components/FormInput'
import PreviewResult from '../_components/PreviewResult'

type FormData = {
  file?: File
  description?: string
  size?: string
  imageUrl?: string
}


function ProductImages() {
  const [formData,setFormData]=useState<FormData>({});
  const onHandleInputChange=(field:string,value:string)=>{
    setFormData((prev: any)=>({
      ...prev,
      [field]: value
    }));
  }

  const OnGenerate=()=>{
    if (!formData?.file && !formData?.imageUrl) {
      alert("Please upload Product Image");
      return;
    }
    if (formData?.description || formData?.size) {
      alert("Please fill all the fields");
      return;
    }
    const formData_ = new FormData();
    if (formData.file) {
    formData_.append('file', formData.file);
    }
    formData_.append('description', formData?.description ?? '');
    formData_?.append('size', formData?.size ?? '1028*1028');


  }

  return (
    <div>
      <h2 className="text-2xl font-bold p-2">AI Product Image Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
            <FormInput 
            onHandleInputChange={(field:string,value:string)=>onHandleInputChange(field,value)} 
            onGenerate={OnGenerate}  
              
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
