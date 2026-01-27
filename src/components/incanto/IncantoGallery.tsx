'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './IncantoGallery.module.css'

type IncantoGalleryProps = {
  lang: string
}

// Placeholder images - replace with actual hotel images
const galleryImages = [
  { src: '/incanto-logo.png', alt: 'L\'Incanto Hotel Exterior' },
  { src: '/incanto-logo.png', alt: 'Luxury Room' },
  { src: '/incanto-logo.png', alt: 'Swimming Pool' },
  { src: '/incanto-logo.png', alt: 'Restaurant' },
  { src: '/incanto-logo.png', alt: 'Spa Area' },
  { src: '/incanto-logo.png', alt: 'Lobby' },
]

export function IncantoGallery({ lang }: IncantoGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.decorativeLine}>
            <div className={styles.line} />
          </div>
          <h2 className={styles.title}>
            {lang === 'el' ? 'Εικόνες' : 'Gallery'}
          </h2>
          <p className={styles.description}>
            {lang === 'el'
              ? 'Ανακαλύψτε την ομορφιά και την πολυτέλεια του L\'Incanto'
              : 'Discover the beauty and luxury of L\'Incanto'}
          </p>
        </div>

        {/* Main Image */}
        <div className={styles.mainImageContainer}>
          <Image
            src={galleryImages[selectedImage]?.src || galleryImages[0].src}
            alt={galleryImages[selectedImage]?.alt || galleryImages[0].alt}
            fill
            className={styles.mainImage}
            priority={selectedImage === 0}
            sizes="100vw"
          />
          {/* Navigation Arrows */}
          {galleryImages.length > 1 && (
            <>
              {selectedImage > 0 && (
                <button
                  onClick={() => setSelectedImage(selectedImage - 1)}
                  className={`${styles.navButton} ${styles.navButtonLeft}`}
                  aria-label="Previous image"
                >
                  <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              )}
              {selectedImage < galleryImages.length - 1 && (
                <button
                  onClick={() => setSelectedImage(selectedImage + 1)}
                  className={`${styles.navButton} ${styles.navButtonRight}`}
                  aria-label="Next image"
                >
                  <svg className={styles.navIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </>
          )}
        </div>

        {/* Thumbnail Grid */}
        {galleryImages.length > 1 && (
          <div className={styles.thumbnailGrid}>
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`${styles.thumbnailButton} ${
                  selectedImage === index
                    ? styles.thumbnailButtonActive
                    : styles.thumbnailButtonInactive
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={styles.thumbnailImage}
                  sizes="(max-width: 768px) 33vw, 16vw"
                />
              </button>
            ))}
          </div>
        )}

        {/* Image Counter */}
        {galleryImages.length > 1 && (
          <div className={styles.counterContainer}>
            <div className={styles.counterDots}>
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`${styles.counterDot} ${
                    selectedImage === index
                      ? styles.counterDotActive
                      : styles.counterDotInactive
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
