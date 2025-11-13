'use client'

import { useState } from 'react'
import Image from 'next/image'

type PropertyImageGalleryProps = {
  images: string[]
  title: string
}

export function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    )
  }

  return (
    <div className="relative w-full">
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px]">
        <Image
          src={images[selectedImage] || images[0]}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      
      {images.length > 1 && (
        <>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-2 rounded-full transition-all ${
                  selectedImage === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
          
          {selectedImage > 0 && (
            <button
              onClick={() => setSelectedImage(selectedImage - 1)}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-colors"
              aria-label="Previous image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {selectedImage < images.length - 1 && (
            <button
              onClick={() => setSelectedImage(selectedImage + 1)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg transition-colors"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </>
      )}
    </div>
  )
}

