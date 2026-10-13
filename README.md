# Employee Christmas Party RSVP

A mobile-friendly RSVP app hosted in your Cloudflare account, with source in GitHub. It has no ChatGPT sign-in or OpenAI hosting dependency.

## Features

- Find an invitation by employee number.
- Outside guests use a unique organizer-generated invitation code.
- Employees may add one plus-one; the plus-one's full name is required.
- Yes/no responses can be updated using the same lookup.
- Organizer dashboard: employee CSV import, outside guest codes, editable event details, closing/deadline controls, headcounts and CSV export.
- Guest contact information and the full roster are available only with the organizer access code.

Employee-number lookup is not identity verification. Anyone who knows a valid number can view that employee's name and update their RSVP. Use this for party logistics, not ID checks. Guest codes should be shared only with their intended guest.

## Local setup

Requires Node.js 22.13 or newer and pnpm 11.25.

```sh
corepack enable
pnpm install --frozen-lockfile
cp .dev.vars.example .dev.vars
pnpm db:migrate:local
pnpm dev
```

Set a private organizer code in `.dev.vars`. Open `/admin` and use that code. Do not commit `.dev.vars`, real rosters, or response exports.

## First Cloudflare deployment

```sh
pnpm exec wrangler login
pnpm exec wrangler d1 create employee-party-rsvp
```

Copy the returned database ID into `wrangler.jsonc` in place of the all-zero local placeholder. Keep the binding name `DB`.

Set the private organizer access code as a Worker secret:

```sh
pnpm exec wrangler secret put ADMIN_KEY
```

Enter a long random code when prompted, and keep it in your password manager.

```sh
pnpm check
pnpm build
pnpm deploy
```

The deploy command applies schema migrations and publishes the Worker. It uses the deployment configuration emitted by the Cloudflare Vite plugin. The Worker URL is printed after deployment.

## GitHub → Cloudflare automatic deployment

1. Push this project to your GitHub repository. A private repository is recommended.
2. In Cloudflare, open Workers & Pages and create/import a Worker from that GitHub repository.
3. Use `employee-party-rsvp` as the Worker name, matching `wrangler.jsonc`.
4. Build command: `pnpm build`.
5. Deploy command: `pnpm deploy`.
6. Configure Node.js 22 or later. Ensure the selected build identity can apply D1 migrations and deploy the Worker.
7. Set `ADMIN_KEY` as a runtime secret for the Worker before sharing the RSVP link.

Documentation: https://developers.cloudflare.com/workers/ci-cd/builds/git-integration/

## Set up your event

Open `/admin`, enter the organizer access code, and edit the placeholder party name and dinner time. The initial event is December 11, 2026, meet & greet at 5:30 PM Central, De Cantilon in NLR. An optional RSVP deadline uses Central time.

Upload a CSV with `Employee Name,Employee Number,Birthday` (optional `Contact`). Birthdays accept MM/DD/YYYY or YYYY-MM-DD. The dashboard displays birthday, age on the event date, and a 21+ flag only to organizers. Treat employee numbers as text to preserve leading zeros. Existing responses are preserved when you re-import a number. CSV imports add/update employees; they do not remove existing invitations.

Outside guests are added individually in the dashboard. Give each guest their special code and the RSVP link. They do not receive a plus-one.

The initial database is empty. Local test employees are not included in this source package or deployed database.
