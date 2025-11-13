# Frontend Setup Guide

## Quick Start

### 1. Install Dependencies
```bash
cd frontend
npm install
# or
yarn install
```

### 2. Set Up Environment Variables
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### 3. Run Development Server
```bash
npm run dev
# or
yarn dev
```

The app will start on `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [lang]/            # Internationalized routes
│   │   ├── auth/          # Authentication pages
│   │   ├── bookings/      # Booking pages
│   │   ├── dashboard/     # Dashboard pages
│   │   ├── properties/    # Property pages
│   │   └── ...
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── layout/           # Header, Footer, Navigation
│   ├── properties/       # Property-related components
│   ├── booking/          # Booking components
│   └── ui/               # UI components
├── lib/                  # Utilities and API clients
│   ├── api/              # API client functions
│   ├── store/            # Zustand stores
│   └── utils.ts          # Helper functions
├── types/                # TypeScript types
└── messages/             # i18n translations
```

## Features Implemented

### Authentication
- Login/Register pages
- MFA support (TOTP, Email OTP)
- Protected routes
- User session management

### Property Management
- Property search and filtering
- Property detail pages
- Property listing pages
- Dynamic room support

### Booking System
- Booking creation flow
- Payment integration (Stripe)
- Booking confirmation
- Booking management dashboard

### Reviews
- Review display with cleanliness ratings
- Multiple rating categories (cleanliness, accuracy, communication, location, value)
- Average ratings display

### Dashboards
- User dashboard (bookings overview)
- Owner dashboard (property management, revenue tracking, payouts)

### Payment Integration
- Stripe payment processing
- Multiple payment methods
- Payment confirmation

## API Integration

All API calls are handled through the API client library in `src/lib/api/`:
- `auth.ts` - Authentication endpoints
- `bookings.ts` - Booking endpoints
- `payments.ts` - Payment endpoints
- `properties.ts` - Property endpoints
- `reviews.ts` - Review endpoints
- `admin.ts` - Admin endpoints (for backend integration)

## State Management

- **Zustand** for global state (authentication, user data)
- **React hooks** for local component state
- **Server Components** for data fetching

## Styling

- **Tailwind CSS 4** for all styling
- Bright accent colors for body content
- Black header with white text
- Minimal, clean design
- Responsive design (mobile-first)

## Internationalization

- Greek and English support
- Uses `next-intl` for translations
- Language switcher in header
- All user-facing text is translatable

## Environment Variables

Required:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Stripe publishable key

## Deployment

### Render Deployment

1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set start command: `npm run start`
4. Add environment variables in Render dashboard
5. Deploy

## Development Guidelines

- Use **Server Components** by default
- Mark components with `"use client"` only when needed
- Use **TypeScript** with strict mode
- Follow **Next.js App Router** conventions
- Use **Tailwind CSS** for styling
- Extract reusable logic into utilities
- Keep components small and focused

## Troubleshooting

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check CORS settings on backend
- Ensure backend is running

### Stripe Integration
- Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Use test keys for development
- Check Stripe dashboard for webhook events

### Build Errors
- Run `npm run type-check` to check TypeScript errors
- Ensure all dependencies are installed
- Check Next.js version compatibility

