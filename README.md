# SMH Real Estate Frontend

A modern, multilingual real estate booking platform built with Next.js 15, TypeScript, Tailwind CSS, and optimized for Render deployment.

## Features

- 🏠 **Property Management** - Complete property listing and management system
- 📅 **Booking Platform** - Modern booking system with calendar integration
- 🌐 **Multilingual Support** - Greek and English language support
- 🎨 **Modern Design** - Clean, minimal design with Tailwind CSS
- 📱 **Responsive** - Mobile-first responsive design
- ⚡ **Fast Performance** - Optimized with Next.js 15 App Router
- 🔒 **Secure** - Built with security best practices
- 🚀 **Render Ready** - Optimized for Render deployment

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS 4
- **State Management**: Zustand
- **Validation**: Zod
- **Internationalization**: next-intl
- **Deployment**: Render

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```
   
   Required environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   DATABASE_URL=your-database-url (if using Prisma directly)
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── [locale]/           # Internationalized routes
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Home page
│   │   └── ...             # Other pages
│   ├── api/                # API routes (if needed)
│   └── globals.css         # Global styles
├── components/             # Reusable components
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections
│   ├── ui/                # UI components (buttons, cards, etc.)
│   └── forms/             # Form components
├── lib/                   # Utility functions
│   ├── api.ts             # API client
│   └── utils.ts           # Helper functions
├── types/                 # TypeScript type definitions
├── store/                 # Zustand stores
└── i18n/                  # Internationalization config
```

## Available Scripts

- `npm run dev` - Start development server with Turbo
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Development Guidelines

### Code Style

- Use **functional React components** (arrow functions)
- Default to **Server Components**; only mark `"use client"` when necessary
- Use **Tailwind CSS** for all styling
- Extract common className groups with `clsx`
- Follow **Next.js App Router** conventions

### State Management

- **Local state**: React hooks (`useState`, `useReducer`, `useContext`)
- **Global state**: Zustand (lightweight, Render-friendly)
- Avoid `useEffect` for data fetching; use Server Components instead

### Data Fetching

- **Server Components**: Use async/await for data fetching
- **Mutations**: Use Next.js Server Actions
- Always validate external inputs with **Zod**
- Use `revalidateTag` or `revalidatePath` to keep data fresh

## Deployment

This project is optimized for deployment on **Render**.

### Render Deployment Steps

1. **Create a new Web Service** on Render
2. **Connect your GitHub repository**
3. **Configure build settings**:
   - Build Command: `npm run build`
   - Start Command: `npm run start`
   - Node Version: 18 or higher
4. **Set environment variables** in Render dashboard:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL
   - `NODE_ENV` - Set to "production"
   - Any other required environment variables
5. **Deploy** - Render will automatically build and deploy your application

### Environment Variables for Production

Make sure to set these in your Render dashboard:

```env
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
NODE_ENV=production
```

## Internationalization

The app supports multiple languages using `next-intl`:

- English (default)
- Greek

To add a new language:
1. Add locale files in `src/i18n/`
2. Update the locale configuration
3. Add translations for all strings

## Styling

This project uses **Tailwind CSS 4** for styling:

- Utility-first approach
- Responsive design with mobile-first breakpoints
- Custom theme configuration in `tailwind.config.js`
- Global styles in `src/app/globals.css`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the code style guidelines
4. Run linting and type checking
5. Commit your changes (`git commit -m 'Add some amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## License

This project is licensed under the MIT License.
