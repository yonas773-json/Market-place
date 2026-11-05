# JsonCONNECT

Local home-services marketplace for Addis Ababa. Browse shops, book cleaning, food, fashion, and home services, message sellers, and check out with Telebirr or CBE (recorded for the shop to confirm).

English and Amharic. Shop owners can open a studio, list services, and manage orders.

## Stack

- React 19 + TanStack Start
- Tailwind CSS
- Postgres (Neon) with SQL migrations in `migrations/`
- Better Auth for sign-in

## Run locally

```bash
npm install
npm run dev
```

The app serves on port 8080.

## Deploy

Production is a Vercel app. Set `DATABASE_URL` and the auth secrets in the host environment. Do not commit `.env` files.

Live app: https://moss-topaz-wood-giant.vercel.app
