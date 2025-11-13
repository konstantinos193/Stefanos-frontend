'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'

type PropertyMapProps = {
  latitude: number | null
  longitude: number | null
  address: string
  city: string
}

export function PropertyMap({ latitude, longitude, address, city }: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mapRef.current || !latitude || !longitude) return

    const loadMap = async () => {
      try {
        const L = await import('leaflet')
        const leaflet = L.default

        if (!leaflet) return

        // Fix for Next.js - set default marker icon paths
        delete (leaflet.Icon.Default.prototype as any)._getIconUrl
        leaflet.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        })

        if (mapRef.current) {
          const map = leaflet.map(mapRef.current).setView([latitude, longitude], 13)

          leaflet
            .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors',
            })
            .addTo(map)

          leaflet
            .marker([latitude, longitude])
            .addTo(map)
            .bindPopup(`${address}, ${city}`)
            .openPopup()
        }
      } catch (error) {
        console.error('Failed to load map:', error)
      }
    }

    loadMap()
  }, [latitude, longitude, address, city])

  if (!latitude || !longitude) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">{address}, {city}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">Location</h2>
      <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
        <div ref={mapRef} className="w-full h-full" />
      </div>
      <p className="text-gray-600 text-sm">{address}, {city}</p>
    </div>
  )
}

