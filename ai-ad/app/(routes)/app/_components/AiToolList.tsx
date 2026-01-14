import React from 'react'
import Image from "next/image"
import { Button } from '@/components/ui/button'
import Link from "next/link" 


const AiTools=[
  {
    name:'AI Products Image',
    desc:'Generate high-quality, professional product images with ease using our AI-powered tool.',
    bannerImage:'/product-image.png',
    path: '/creative-ai-tools/product-images'
  },
  {
    name:'AI Products Video',
    desc:'Create engaging produts showcase videos using AI.',
    bannerImage:'/product-video.png',
    path: '/'
  },
  {
    name:'AI Products with Avatar',
    desc:'Bring your products to life with AI-generated avatars.',
    bannerImage:'/product-avatar.png',
    path: '/'
  }
]
const AiToolList = () => {
  return (
    <div>
      <h2 className="font-bold text-2xl mb-2">Creative AI Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {AiTools.map((tool,index) =>(
          <div
            key={index}
            className="flex items-center gap-5 p-5 bg-zinc-800 rounded-xl"
          >
            <div className="flex-1">
              <h2 className="font-semibold text-xl">{tool.name}</h2>
              <p className="text-sm opacity-70 mt-1 line-clamp-3">
                {tool.desc}
              </p>
              <Link href={tool.path}>
                <Button size="sm" className="mt-3">
                  Create Now
                </Button>
              </Link>
            </div>

            <Image
              src={tool.bannerImage}
              alt={tool.name}
              width={150}
              height={150}
              className="w-[150px]"
            />
          </div>

   

        ))}
      </div>
    </div>
  )
}

export default AiToolList
