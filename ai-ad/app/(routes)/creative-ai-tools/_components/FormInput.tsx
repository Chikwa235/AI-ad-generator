"use client"

import React, { useState } from 'react'
import { ImagePlus, Smartphone, Square , Monitor} from 'lucide-react'
import Image from "next/image"
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Sparkle } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const sampleProduct=[
  '/headphone.png',
  '/juice-can.png',
  '/perfume.png',
  '/burger.png',
  '/ice-creame.png'
]

type Props = {
  onHandleInputChange: (key: string, value: any) => void
  onGenerate: () => void
}

function FormInput({ onHandleInputChange, onGenerate }: Props) {

  const [preview, setPreview] = useState<string | null>(null)

  const onFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB")
      return
    }
    onHandleInputChange('file',file);
    setPreview(URL.createObjectURL(file));

  }

  return (
    <div>
      <h2 className="font-semibold">1. Upload Product Image</h2>

      <div>
        <label
          htmlFor="imageUpload"
          className="mt-2 border-dashed border-2 rounded-xl flex flex-col items-center justify-center min-h-[200px] cursor-pointer"
        >
          {!preview ? (
            <div className="flex flex-col items-center gap-3">
              <ImagePlus className="h-8 w-8 opacity-40" />
              <h2 className="text-xl">Click here to upload Image</h2>
              <p className="opacity-45">Upload image upto 5MB</p>
            </div>
          ) : (
            <img
              src={preview}
              alt="preview"
              className="w-full h-full max-h-[200px] object-contain rounded-lg"
            />
          )}
        </label>

        <input
          type="file"
          id="imageUpload"
          className="hidden"
          accept="image/*"
          onChange={(e) => onFileSelect(e.target.files)}
        />
      </div>
      {/*Sample Products */}
      <div>
          <h2 className="opacity-40 text-center mt-3">Select Sample product to try</h2>
      <div className="flex gap-5 items-center">
          {sampleProduct.map((product,index)=>(
              <Image src={product} alt={product} width={100} height={100} key={index} 
              className="w-[60px] h-[60px] rounded-lg cursor-pointer hover:scale-105 transition-all"
              onClick={()=>{setPreview(product);
              onHandleInputChange('imageUrl', product);
              }}
              />
          ))} 
      </div>
      </div>
      
      <div className='mt-8'>
        <h2 className="font-semibold">2. Enter product description</h2>
          <Textarea placeholder="Tell me more about product and how you want to display it."  
            className="min-h-[150px] mt-2"
            onChange={(event) => onHandleInputChange('description', event.target.value)}
          />

      </div>
      <div>
         <div className='mt-8'>
        <h2 className="font-semibold">3. Select Image Size</h2>
        <Select onValueChange={(value)=>onHandleInputChange('size',value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Resolution" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1024*1024">
              <div className="flex items-center gap-2">
                <Square className='h-4 w-4' />
                <span>1:1</span>
              </div>
            </SelectItem>
            <SelectItem value="1536*1024">              
              <div className="flex items-center gap-2">
                <Monitor className='h-4 w-4' />
                <span>16:9</span>
              </div>
            </SelectItem>
            <SelectItem value="1024*1536">             
              <div className="flex items-center gap-2">
                <Smartphone className='h-4 w-4' />
                <span>9:16</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>

      </div>
      </div>
      
      <Button className="mt-5 w-full" onClick={onGenerate}> <Sparkle /> Generate </Button>
      <h2 className="mt-1 text-sm opacity-35 text-center">5 Credits to Generate</h2>
    </div>
  )
}

export default FormInput
