# 🌍 Countries Dashboard

A modern, responsive Countries Dashboard built with Next.js (App Router), TypeScript, and Tailwind CSS.
The application consumes real-world data from the REST Countries API and presents it in a clean, accessible, and user-friendly interface.

This project was built as an interview-ready showcase of modern front-end development practices.

✨ Features

🌐 Server-side data fetching using Next.js App Router

🔍 Client-side search by country name

🌍 Filter countries by region

⭐ Sort by population and land area

🌗 Light / Dark mode support

♿ Accessible UI (semantic HTML, keyboard-friendly controls)

📱 Fully responsive layout

🧹 Clean and maintainable component structure

🔒 Type-safe API handling with TypeScript

🧠 Architecture & Design Decisions
Server vs Client Components

Server Components

Fetch country data once on the server

Improve performance and SEO

Avoid unnecessary client-side API calls

Client Components

Handle interactive features (search, filter, sort, reset)

Keep UI state local and predictable

This separation keeps the application scalable, performant, and easy to reason about.

Why no separate “Details Page”?

Instead of navigating to a separate details page, key country information (capital, region, population, area) is displayed directly in the card layout.

Benefits:

Fewer clicks

Faster data exploration

Better dashboard-style UX

Reduced routing complexity

This mirrors real-world data dashboards.

🛠 Tech Stack

Next.js (App Router)

React

TypeScript

Tailwind CSS

Axios

REST Countries API

♿ Accessibility

Semantic HTML structure (header, main, section, footer)

Keyboard-accessible inputs and controls

Visible focus states

Proper image alternative text

Sufficient color contrast in light and dark modes

Accessibility was considered as part of the core UI design, not an afterthought.

🌗 Dark Mode

Dark mode is implemented using Tailwind’s class strategy and toggled at the document level.
All major UI elements explicitly define dark mode styles to ensure readability and contrast.

📁 Project Structure
src/
├─ app/
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

🚀 Getting Started
1️⃣ Install dependencies
npm install

2️⃣ Run the development server
npm run dev

3️⃣ Open in browser
<http://localhost:3000>

📌 API Reference

Data is fetched from:

<https://restcountries.com/v3.1>

Only required fields are requested to minimize payload size and improve performance.

🎯 What This Project Demonstrates

Practical use of Next.js App Router

Real-world API integration

Thoughtful UX decisions

State management without overengineering

Clean separation of concerns

Accessibility and dark mode awareness

📄 License

This project is open-source and available for learning and demonstration purposes.
