export default function customImageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If the image is from licanto.vercel.app, handle it specially
  if (src.includes('licanto.vercel.app')) {
    // Encode the URL properly to handle spaces and special characters
    const encodedSrc = encodeURIComponent(src)
    return `https://licanto.vercel.app/_next/image?url=${encodedSrc}&w=${width}&q=${quality || 75}`
  }
  
  // For other images, use default Next.js loader behavior
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 75}`
}
