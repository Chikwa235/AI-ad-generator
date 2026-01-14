import React from 'react'
import { ImagePlus } from 'lucide-react'
function FormInput() {
  return (
    <div>
        <div>
            <h2 className="font-semibold">1. Upload Product Image</h2>
            <div>
                <label htmlFor="imageUpload" className="mt-2 border-dashed border-2 rounded-xl flex flex-col items-center justify-center min-h-[200px] cursor-pointer">
                    <div className="flex flex-col items-center gap-3">
                        <ImagePlus className="h-8 w-8 opacity-40"/>
                        <h2 className="text-xl">Click here to upload Image</h2>
                        <p className="opacity-45">Upload image upto 5MB</p>
                    </div>
                </label>
                <input type="file" id="imageUpload" className="hidden" accept="image/*"/>
            </div>
        </div>
    </div>
  )
}

export default FormInput
