<p align="center">
  <img src="https://smholdings.gr/logoetc.png" alt="SM Holdings" width="300" />
</p>

<h1 align="center">real-estate-frontend</h1>

<p align="center">
  <strong>The frontend that promises a seamless user experience, and occasionally delivers.</strong>
</p>

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg" />
  <img alt="Node" src="https://img.shields.io/badge/node-18%2B-green.svg" />
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black.svg" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.9-blue.svg" />
  <img alt="React" src="https://img.shields.io/badge/React-19-cyan.svg" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-black.svg" />
</p>

---

## Overview

A frontend for a real estate platform. It displays properties, handles bookings, supports multiple languages, and does all the other things that make you question why the design mockup looked nothing like what shipped.

Built with Next.js because we wanted server-side rendering, client-side rendering, static generation, and the existential crisis of choosing between them on every single page.

---

## Tech Stack

Because listing frameworks is how frontend developers introduce themselves at parties.

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Framework** | Next.js | 16.1.6 | The React framework that does everything, whether you asked it to or not |
| **Language** | TypeScript | 5.9.3 | Pretending JavaScript has types (frontend edition) |
| **UI Library** | React | 19.2.4 | Re-rendering the DOM so you do not have to |
| **Styling** | Tailwind CSS | 4.1.18 | Writing CSS without writing CSS |
| **State** | Zustand | 5.0.11 | Global state management for people who survived Redux |
| **Validation** | Zod | 4.3.6 | Trust issues, but make it client-side |
| **i18n** | next-intl | 4.8.2 | Making the same bugs available in two languages |
| **Maps** | Leaflet | 1.9.4 | Showing users where their money went |
| **Payments** | Stripe.js | 8.7.0 | Taking money from people, visually |
| **ORM** | Prisma | 7.3.0 | For when the frontend also needs database opinions |
| **CSS Utilities** | clsx | 2.1.1 | Conditional classnames, because ternaries in JSX are a war crime |
| **Flags** | flag-icons | 7.5.0 | Tiny rectangles of national pride |

---

## Features

- **Property Listings** -- Browse properties with beautiful cards and filters. The photos are always better than reality. Always.
- **Booking System** -- Calendar integration, date picking, conflict handling. Everything except resolving the conflict between the designer and the developer.
- **Multilingual Support** -- Greek and English. Because bugs deserve to be experienced in your native tongue.
- **Responsive Design** -- Looks great on desktop, tablet, and mobile. Looks questionable on that one Samsung model from 2019 your QA tester uses.
- **User Authentication** -- Login, register, profile management. The full identity crisis.
- **Interactive Maps** -- Leaflet-powered maps so users can see exactly how far the property is from the nearest coffee shop.
- **Payments** -- Stripe checkout integration. The part where the UI has to look trustworthy enough for people to enter their credit card.
- **Dashboard** -- Numbers, charts, and booking management. A control panel for the illusion of control.
- **Editions & Content** -- Dynamic content pages. Because hardcoding text is a sin, and CMS integration is purgatory.

---

## Getting Started

### Prerequisites

- **Node.js 18+** -- If you are still on Node 14, this README cannot help you. Nobody can.
- **yarn** or **npm** -- Pick one. Commit. Do not switch mid-project like a psychopath.
- A backend API running somewhere and the will to live (only one is strictly required).

### Installation

```bash
# Clone the repository. You know the drill.
git clone <repository-url>
cd Stefanos-frontend

# Install dependencies. This will take a while.
# Enough time to question your career choices.
yarn install

# Copy the environment template.
cp .env.example .env.local

# Fill in the .env.local file with real values.
# If you commit your secrets to git, that is on you.
```

### Running the Dev Server

```bash
# Development (with Turbo, because waiting is for production)
yarn dev

# Production build (for the optimistic)
yarn build

# Start production server (for the brave)
yarn start
```

The app will be available at `http://localhost:3000`. If it is not, check if something else is already squatting on that port. It usually is.

---

## Scripts

All the commands you will forget exist and then rediscover six months later.

| Command | What It Does |
|---|---|
| `yarn dev` | Development server with Turbo. Your most-used command. |
| `yarn build` | Builds for production. Prays nothing breaks. |
| `yarn start` | Starts the production server like a normal person. |
| `yarn lint` | ESLint. It will find problems you did not know you had. |
| `yarn type-check` | TypeScript without emitting. Pure judgement. |
| `yarn db:generate` | Regenerates the Prisma client. Again. |
| `yarn db:push` | Pushes schema to the database. No turning back. |
| `yarn db:migrate` | Runs migrations. Hope you tested locally first. |
| `yarn db:studio` | Opens Prisma Studio. A GUI for your data. Revolutionary. |

---

## Project Structure

```
src/
  app/
    [lang]/                  # Internationalized routes. Two languages, twice the bugs.
      about/                 # The page nobody reads
      admin/                 # God mode, but with a nicer UI
      auth/                  # Login, register, existential identity verification
      bookings/              # Where money meets calendar math
      careers/               # We are hiring. Obviously.
      contact/               # A form that sends emails into the void
      dashboard/             # Numbers on a screen. Very important numbers.
      incanto/               # The hotel sub-brand. It has its own section. It earned it.
      properties/            # The reason this app exists
      results/               # Search results. Hopefully not empty.
      services/              # What we offer, in marketing speak
      settings/              # User preferences nobody changes
      profile/               # Your digital identity, curated
    globals.css              # Global styles. The CSS equivalent of common ground.
    layout.tsx               # The root layout. Parent of all pages. Tired.

  components/
    auth/                    # Authentication UI. Passwords and promises.
    booking/                 # Booking forms and calendars. Date math is hard.
    editions/                # Dynamic content components. CMS-adjacent.
    forms/                   # Form components. Validation included. Patience not.
    icons/                   # 30 SVG icons, each lovingly hand-imported
    incanto/                 # Hotel-specific components. Boutique, like the hotel.
    layout/                  # Header, Footer, Navigation. The skeleton of the app.
    properties/              # Property cards, lists, details. The core of everything.
    results/                 # Search result components. Optimism, rendered.
    sections/                # Page sections. Reusable. Allegedly.
    ui/                      # Buttons, cards, modals. The building blocks of suffering.

  lib/
    api/                     # API client. 11 files of HTTP requests and hope.
    contexts/                # React contexts. For when prop drilling gets embarrassing.
    hooks/                   # Custom hooks. useWhatever.
    i18n/                    # Internationalization config. Two languages, one headache.
    store/                   # Zustand store. Global state, minimal drama.
    utils/                   # Helper functions. The junk drawer of the codebase.
    mockData.ts              # 42KB of beautiful lies for development.

  messages/                  # Translation files. Every string, twice.
  types/                     # TypeScript type definitions. The bureaucracy your data deserves.
```

---

## Dependencies

### Production (21 packages of varying necessity)

The full list lives in `package.json`. Here are the highlights, or lowlights, depending on your perspective:

- **next** `^16.1.6` -- The framework. It does everything. Whether it should is another question.
- **react** `^19.2.4` -- The library. The one that started it all. Still re-rendering unnecessarily.
- **tailwindcss** `^4.1.18` -- Utility-first CSS. Your HTML will look like alphabet soup. Embrace it.
- **zustand** `^5.0.11` -- State management. Three lines of code to replace what Redux does in three hundred.
- **next-intl** `^4.8.2` -- Internationalization. Because hardcoded strings are a code smell in any language.
- **@stripe/stripe-js** `^8.7.0` -- Payment UI. The part where the checkout page has to inspire trust.
- **leaflet** `^1.9.4` -- Maps. Because a property listing without a map is just a paragraph.
- **zod** `^4.3.6` -- Schema validation. Trust nothing. Validate everything. Even on the frontend.
- **@prisma/client** `^7.3.0` -- ORM. Yes, on the frontend. Do not ask.

### Development (3 packages that exist solely to yell at you)

- **eslint** `^10.0.0` -- Linter. It has opinions. Stronger ones than yours.
- **prettier** `^3.8.1` -- Code formatter. Ending arguments since 2017.
- **@tailwindcss/typography** `^0.5.19` -- Prose styling. For when your content needs to look like it was written by an adult.

---

## Environment Variables

See `.env.example` for the full template. If that file does not exist, someone has made a grave mistake.

Key variables include:
- `NEXT_PUBLIC_API_URL` -- Points to the backend API. If this is wrong, everything is wrong.
- `DATABASE_URL` -- Database connection string. Treat it like a nuclear launch code.
- `NODE_ENV` -- "production" or "development". There is no in-between. There is no "it works on my machine".

---

## Deployment

Optimized for **Render**, because Heroku decided free tiers were a phase.

1. Create a Web Service on Render.
2. Connect the repository.
3. Set build command to `yarn build`.
4. Set start command to `yarn start`.
5. Add all environment variables.
6. Deploy.
7. Wait.
8. Refresh.
9. Check logs.
10. Wonder why the CSS looks different in production.
11. Fix the thing you forgot.
12. Redeploy.

---

## Contributing

1. Fork the repository.
2. Create a feature branch.
3. Write code that works.
4. Make sure it looks right on mobile. No, actually check.
5. Open a Pull Request.
6. Wait for review.
7. Address feedback.
8. Wait for re-review.
9. Merge.
10. Discover it broke something else.

---

## License

MIT. Do whatever you want with it. We are not responsible for the consequences.

---

<p align="center"><sub>Built with mass amounts of mass-produced coffee and mass-produced existential dread by the SM Holdings engineering team.</sub></p>

---

<p align="center">
  Created by <a href="https://adinfinity.gr/">adinfinity</a>
</p>
