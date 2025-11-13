export type UserRole = 'GUEST' | 'OWNER' | 'ADMIN'

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  avatar?: string
  role: UserRole
  mfaEnabled?: boolean
  emailVerified?: boolean
  phoneVerified?: boolean
  preferredCurrency?: string
  preferredLanguage?: string
  createdAt: string
  updatedAt: string
}

