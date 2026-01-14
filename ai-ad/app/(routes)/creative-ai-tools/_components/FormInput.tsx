"use client"

import React, { useState } from 'react'
import { ImagePlus } from 'lucide-react'

function FormInput() {
  const [preview, setPreview] = useState<string | null>(null)

  const onFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return

    const file = files[0]

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB")
      return
    }

    setPreview(URL.createObjectURL(file))
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
    </div>
  )
}

export default FormInput
