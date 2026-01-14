import React from 'react'
import FormInput from '../_components/FormInput'
import PreviewResult from '../_components/PreviewResult'

function ProductImages() {
  return (
    <div>
      <h2>AI Product Image Generator</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div>
            <FormInput />
        </div>
        <div className="md:col-span-2">
            <PreviewResult />
        </div>
      </div>

    </div>
  )
}

export default ProductImages
