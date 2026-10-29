This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
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

## Content and API

All content comes from the API in `../backend` and is managed in the admin panel (`../admin`):

- `shared/api/content.ts` — server-side getters (`"use cache"`, tag `content`); texts arrive already translated
  for the requested locale, images as absolute URLs from the API.
- `app/api/revalidate` — the API calls it after every change in the admin, so the site updates right away
  (`REVALIDATE_SECRET` here = `SITE_REVALIDATE_SECRET` in the API).
- `shared/api/forms.ts` — contact form and job applications (with resume), sent from the browser to the API.
- `messages/*.json` keep only interface strings (menu, buttons, form labels); page texts are edited in the admin.

Copy `.env.example` to `.env.local`. The API must be running for `next dev` and `next build`.
