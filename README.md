# CureCart — Online Medicine Delivery Portal

CureCart is a Next.js 15 (App Router) TypeScript starter for an online medicine delivery portal that enforces prescription-based medicine purchases. It is built with a modern frontend stack and mocked APIs so you can prototype flows for customers and pharmacists without a backend.

Key goals
- Browse, search and filter medicines
- Mark and enforce prescription-required purchases
- Upload, track and manage prescriptions
- Pharmacist dashboard to review and update prescription statuses
- Mobile-first, accessible and medically themed UI

Tech stack
- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui components
- Zustand for state management
- Replit Auth (auth integration placeholders)
- Framer Motion for animations
- MSW (Mock Service Worker) or local JSON for mock API
- Vite-style dev experience via next dev

Quick start (dev)
1. Install dependencies:
   - npm
     ```powershell
     npm install
     ```
   - yarn
     ```powershell
     yarn
     ```
   - pnpm
     ```powershell
     pnpm install
     ```

2. Run development server:
   ```powershell
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
