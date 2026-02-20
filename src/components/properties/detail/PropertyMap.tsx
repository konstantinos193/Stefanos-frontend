'use client'

import { useState } from 'react'
import Map from 'react-map-gl/maplibre'
import Marker from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { PinIcon } from '@/components/icons'

type PropertyMapProps = {
  latitude: number | null
  longitude: number | null
  address: string
  city: string
  lang: string
}

export function PropertyMap({ latitude, longitude, address, city, lang }: PropertyMapProps) {
  const [viewState, setViewState] = useState({
    longitude: longitude || 0,
    latitude: latitude || 0,
    zoom: 13
  })

  if (!latitude || !longitude) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">{lang === 'gr' ? 'Τοποθεσία' : 'Location'}</h2>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <p className="text-gray-500">{address}, {city}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-gray-900">{lang === 'gr' ? 'Τοποθεσία' : 'Location'}</h2>
      <div className="h-64 rounded-lg overflow-hidden border border-gray-200">
        <Map
          {...viewState}
          onMove={evt => setViewState(evt.viewState)}
          mapStyle="https://tiles.openfreemap.org/styles/liberty"
          style={{ width: '100%', height: '100%' }}
        >
          <Marker longitude={longitude} latitude={latitude}>
            <div className="bg-red-600 text-white p-2 rounded-full shadow-lg">
              <PinIcon className="w-4 h-4" />
            </div>
          </Marker>
        </Map>
      </div>
      <p className="text-gray-600 text-sm">{address}, {city}</p>
    </div>
  )
}

