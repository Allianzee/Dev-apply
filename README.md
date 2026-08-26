# PSTD Developer Applications

A clean Next.js developer application website for PSTD.

## Features

- Role selection
- UI Designer marked as "Most needed"
- Discord username
- Age
- Email
- Years of experience
- Portfolio links
- Up to 5 image work samples
- Why should we choose you?
- Extra information
- Server-side Discord webhook submission
- Responsive dark UI
- Ready for Vercel + GitHub

## Setup

1. Install Node.js 20+.
2. Run:

```bash
npm install
npm run dev
```

3. Copy `.env.example` to `.env.local`.
4. Put your Discord webhook in:

```env
DISCORD_WEBHOOK_URL=your_webhook_here
```

5. Open `http://localhost:3000`.

## Vercel

Push the project to GitHub.

Then import the repository into Vercel.

In Vercel:

Project Settings -> Environment Variables

Add:

```text
DISCORD_WEBHOOK_URL
```

with your Discord webhook URL.

Redeploy after adding the variable.

IMPORTANT: Do not put the webhook URL in client-side code. This project keeps it inside the server API route.

## Adding or removing roles

Edit the `roles` array in:

`app/applications.tsx`

You can change names, descriptions, icons and which role is marked `urgent: true`.
