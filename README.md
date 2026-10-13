# Employee Christmas Party RSVP

A mobile-friendly RSVP app hosted in your Cloudflare account, with source in GitHub. It has no ChatGPT sign-in or OpenAI hosting dependency.

## Features

- Find an invitation by employee number.
- Outside guests use a unique organizer-generated invitation code.
- Employees may add one plus-one; the plus-one's full name and birthday are required.
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

Open `/admin` and use the existing organizer access code once to create your own admin username/password. After setup, the old code no longer grants staff access. The admin can add/remove organizers and reset their passwords; each organizer signs in with their own account. The initial event is December 11, 2026, meet & greet at 5:30 PM Central, De Cantilon in NLR. An optional RSVP deadline uses Central time.

Upload a CSV with `Employee Name,Employee Number,Birthday` (optional `Contact`). Birthdays accept MM/DD/YYYY or YYYY-MM-DD. The dashboard displays birthday, age on the event date, and a 21+ flag only to organizers. Treat employee numbers as text to preserve leading zeros. Existing responses are preserved when you re-import a number. CSV imports add/update employees; they do not remove existing invitations.

Outside guests are added individually in the admin dashboard. Choose your own short guest code (2–40 letters/numbers; hyphens and underscores allowed). Codes are case-insensitive and must be unique. Give each guest their code and the RSVP link. They do not receive a plus-one.

The initial database is empty. Local test employees are not included in this source package or deployed database.

## Staff operations

Organizers can update RSVPs, check in invitations, record physical ID checks, and record ticket purchases paid through Venmo, Cash App, or cash. Payments are manually confirmed; the app does not charge payment accounts. Presales default to four tickets per person. Day-of sales open on the event date and allow extra purchases; optional day-of and combined caps can be configured by the admin. Ticket price may remain unset until known. Ticket limits are checked atomically across concurrent sales and per registered person, including named plus-ones.

Admins can clear an RSVP response or remove/restore an invitation. Removed invitations cannot use guest lookup or ticket sales. Recorded sales remain in the ledger. Re-importing a removed employee does not reactivate their invitation; restore it explicitly.

CSV selection shows a preview and row-specific errors before importing. Imports run in 30-row requests to stay below Cloudflare Free query limits. UTF-8 BOM headers, comma/semicolon/tab delimiters, Excel serial dates and date timestamps are supported. Missing birthdays are flagged as unknown. RSVP responses and ticket counts survive repeat imports.

Passwords are stored as salted PBKDF2 hashes. Staff sessions use HttpOnly cookies. Removing an organizer or resetting their password invalidates their sessions.

## Local integration checks

The script `tests/integration.mjs` only accepts a loopback URL and uses disposable records. Initialize an empty local database and set `.dev.vars` to `ADMIN_KEY=local-test-only`, start the local server on port 5174, then run `node tests/integration.mjs`. It tests account roles, CSV batches, age/plus-one requirements, concurrent purchase limits, manual guest codes, removal/restoration, and session revocation. Never use production records for these tests.

## Attendee email exports

Include an optional Email column in the employee CSV. Names exported as Last, First are displayed as First Last. The Attendee emails tab allows staff to add/edit email addresses and export either an attendee CSV (attending invitations with an email) or a deduplicated semicolon-separated address list. Missing addresses are flagged; plus-one invitations are communicated through the employee. No emails are sent by the app.
