'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ImageModal } from './ImageModal'

type PropertyImageGalleryProps = {
  images: string[]
  title: string
}

export function PropertyImageGallery({ images, title }: PropertyImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-400">No images available</span>
      </div>
    )
  }

  return (
    <div className="relative w-full group">
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-2xl shadow-2xl">
        <Image
          src={images[selectedImage] || images[0]}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 cursor-pointer"
          priority
          sizes="100vw"
          onClick={() => setIsModalOpen(true)}
        />
        
        {/* Gradient overlay for better text visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
      
      {images.length > 1 && (
        <>
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedImage === index 
                    ? 'w-8 bg-white shadow-lg' 
                    : 'w-2 bg-white/50 hover:bg-white/70'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
          
          {selectedImage > 0 && (
            <button
              onClick={() => setSelectedImage(selectedImage - 1)}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
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
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full shadow-xl transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </>
      )}
      
      {/* Image Modal */}
      <ImageModal
        images={images}
        currentIndex={selectedImage}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
