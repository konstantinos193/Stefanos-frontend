import { ReactNode } from 'react'

export type EditionStatus = 'active' | 'coming-soon' | 'beta'

export interface Edition {
  id: string
  category: string
  title: {
    gr: string
    en: string
  }
  description: {
    gr: string
    en: string
  }
  features: string[]
  price: string
  icon: string | ReactNode
  status: EditionStatus
}

