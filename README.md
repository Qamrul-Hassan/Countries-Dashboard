# Countries Dashboard

A modern, responsive countries dashboard built with Next.js (App Router), TypeScript, and Tailwind CSS.
It uses the REST Countries API and presents country data with a bold, accessible, and mobile-first UI.

## Live Demo

- Production: `https://your-live-demo-url.vercel.app`
- Preview/Alt: `https://your-second-demo-link.com`

## Screenshots / GIF Preview

> Replace these placeholder paths with your actual assets.

### Home Page

![Home Page](./docs/screenshots/home.png)

### Country Details Page

![Country Details](./docs/screenshots/details.png)

### Search / Filter Demo (GIF)

![Search and Filter Demo](./docs/previews/search-filter.gif)

## Features

- Server-side country data fetching with Next.js App Router
- Client-side search, region filter, and sorting (population/area)
- Dedicated country details page with rich data
- Embedded map and external map links (Google Maps/OpenStreetMap)
- Light/Dark mode toggle
- Responsive card grid and detail layouts
- Semantic HTML and keyboard-friendly controls
- Type-safe API integration with TypeScript

## Country Details Page

Each `View details` page includes extended information such as:

- Official and native names
- Capital, population, area, and population density
- Region/subregion, continents, coordinates, borders
- Currency, calling code, top-level domain, FIFA code
- Languages, demonyms, timezones, start of week, driving side
- Flag, coat of arms, postal code format, and Gini index (when available)

## Architecture

### Server Components

- Fetch API data on the server
- Reduce unnecessary client-side requests
- Improve performance and SEO

### Client Components

- Handle interactive UI state (search/filter/sort/reset)
- Keep state local and predictable

This separation keeps the app scalable, performant, and maintainable.

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS (v4)
- Axios
- REST Countries API

## Accessibility

- Semantic landmarks (`header`, `main`, `section`, `footer`)
- Keyboard-accessible form controls and buttons
- Visible focus states
- Meaningful alt text for images
- Reduced-motion support for animations
- Contrast-aware light and dark themes

## Project Structure

```text
src/
├─ app/
│  ├─ countries/[code]/page.tsx
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ globals.css
├─ components/
│  ├─ Navbar.tsx
│  ├─ Footer.tsx
│  ├─ HomeClient.tsx
│  └─ CountryList.tsx
├─ lib/
│  └─ api.ts
└─ types/
   └─ country.ts
```

## Getting Started

1. Install dependencies

```bash
npm install
```

1. Start development server

```bash
npm run dev
```

1. Open in browser

- <http://localhost:3000>

## Build

```bash
npm run build
npm run start
```

## API Reference

- Base URL: <https://restcountries.com/v3.1>
- The app requests only required fields for better performance.

## License

This project is open-source and intended for learning, portfolio, and demonstration purposes.
