# Influencer Management Platform

A complete influencer management web application that allows brands to discover, filter, review, and manage influencer profiles. This project is built with Next.js App Router, Prisma, and PostgreSQL and can be used as a production-ready demo or as a foundation for a real SaaS product.

---

## Features

* Authentication using NextAuth with Credentials Provider
* Influencer search with advanced filtering options
* Favorites management (add and remove influencers)
* Detailed influencer profiles with full metrics
* Modern and clean user interface using Tailwind CSS
* PostgreSQL database with Prisma ORM
* Server Components with Next.js App Router

---

## Tech Stack

Frontend

* Next.js (App Router)
* React Server Components
* Tailwind CSS
* Lucide React Icons

Backend

* Next.js API Routes
* NextAuth Authentication

Database

* PostgreSQL
* Prisma ORM

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Farzadsarfaraz/influencer-pro-main.git
cd influencer-pro-main
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Environment variables

Create a .env file in the root directory and add the following values

```env
DATABASE_URL=""

FACEBOOK_CLIENT_ID=""
FACEBOOK_CLIENT_SECRET=""

AUTH_SECRET=""
```

---

### 4. Setup database

Push the Prisma schema to the database

```bash
npx prisma db push
```

Optional demo data

```bash
npx prisma db seed
```

---

### 5. Run the development server

```bash
npm run dev
```

Open the application in your browser

[http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
influencer-pro-main/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── influencers/
│   │   │   └── route.ts
│   │   └── favorites/
│   │       └── route.ts
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── influencers/
│   │   ├── page.tsx
│   │   └── [id]/
│   │       └── page.tsx
│   ├── favorites/
│   │   └── page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
├── lib/
├── middleware.ts
├── .env
├── package.json
├── tsconfig.json
└── ...
```
---

## Authentication

Authentication is implemented with NextAuth using a Credentials Provider. Protected routes are enforced on the server side.

---

## Database

The database layer uses Prisma ORM with PostgreSQL. The schema includes users, influencers, and favorite relations.

---

## Styling

Tailwind CSS is used to build a responsive and clean interface with minimal custom styles.

---

## Author

Farzad Sarfaraz
GitHub:- https://github.com/Farzadsarfaraz/influencer-pro-main

https://github.com/user-attachments/assets/a1199c06-6f52-4926-b405-c7db62135f09

