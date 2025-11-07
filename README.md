# Real Estate Platform

A modern, multilingual real estate booking platform built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- 🏠 **Property Management** - Complete property listing and management system
- 📅 **Booking Platform** - Modern booking system with calendar integration
- 🌐 **Multilingual Support** - Greek and English language support
- 🎨 **Modern Design** - Black header with minimal design and bright accents
- 📱 **Responsive** - Mobile-first responsive design
- ⚡ **Fast Performance** - Optimized for speed and SEO
- 🔒 **Secure** - Built with security best practices

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM (PostgreSQL)
- **State Management**: Zustand
- **Validation**: Zod
- **Internationalization**: next-intl
- **Deployment**: Render

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Set up the database**:
   ```bash
   npm run db:generate
   npm run db:push
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
├── components/             # Reusable components
│   ├── layout/            # Header, Footer, Navigation
│   ├── sections/          # Page sections
│   ├── ui/                # UI components
│   └── forms/             # Form components
├── lib/                   # Utility functions
├── types/                 # TypeScript type definitions
└── test/                  # Test files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push database schema
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

## Deployment

This project is optimized for deployment on Render. See the deployment configuration in `render.yaml`.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.
