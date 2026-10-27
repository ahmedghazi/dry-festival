# URLS

- Studio: https://backoffice--dry-festival.sanity.studio/
- Site: https://dryfestival.com/
- Preprod: https://v1--dryfestrival.netlify.app/
- Prepreprod: https://v1--preprod-dry-festival.netlify.app/

# To do

- move webhook from aeai's netlify account to dry festival's netlify account
- unblock deploys from netlify

# Dry Festival

Website for Dry Festival: a Next.js front end fed by a Sanity CMS.
Repo: `github.com/ahmedghazi/dry-festival` · Design: see [doc/doc.md](doc/doc.md) (Figma link)

## Stack

| Part      | Tools                                                                                                                  |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| `web/`    | Next.js 16 (App Router), React 19, TypeScript, Tailwind 4 + SCSS, GSAP, next-sanity, next-view-transitions, nodemailer |
| `studio/` | Sanity Studio v6, presentation tool (live preview), sanity-plugin-media, color-input                                   |
| Hosting   | Netlify (`web/`, see [netlify.toml](netlify.toml)) · Sanity hosted studio (`backoffice--dry-festival.sanity.studio`)   |
| Runtime   | Node 24 (`.nvmrc`), pnpm                                                                                               |

Sanity project `6m8quf4y`, dataset `production`.

## Structure

```
www/
├─ package.json        # shortcut scripts (s, w, d, dm…)
├─ netlify.toml        # Netlify build of web/
├─ doc/                # notes: design, schema, feedback (retours), to-do
├─ studio/             # Sanity Studio
│  ├─ schemaTypes/     # documents (pageModulaire, project, tag), singletons (home, infos, settings), objects/modules (page building blocks)
│  ├─ src/             # desk structure, preview link resolver, custom actions
│  └─ sanity.cli.ts    # project id, studio host, typegen config
└─ web/                # Next.js site
   └─ app/
      ├─ (pages)/[slug]/  # every page except home (pageModulaire)
      ├─ api/             # contact (SMTP mail), preview / exit-preview (draft mode), revalidate (Sanity webhook)
      ├─ components/      # Header, Footer, ContentModulaire (renders modules)…
      ├─ sanity-api/      # client, GROQ queries, fragments, generated types
      ├─ config/          # i18n (fr default, en), website settings
      └─ context/ hooks/ styles/
```

## Scripts

```bash
nvm use && corepack enable      # Node 24 + pnpm
cd web && pnpm i && pnpm dev    # site → http://localhost:3000
cd studio && pnpm i && pnpm dev # studio → http://localhost:3333
```

| Where  | Command                  | Does                                                                                                              |
| ------ | ------------------------ | ----------------------------------------------------------------------------------------------------------------- |
| web    | `pnpm dev` / `dev:local` | Dev server (`dev:local` exposes on LAN; add your IP to `allowedDevOrigins` in `next.config.ts`)                   |
| web    | `pnpm build` / `start`   | Production build / serve                                                                                          |
| studio | `pnpm dev`               | Local studio                                                                                                      |
| studio | `pnpm typegen`           | Regenerates `web/app/sanity-api/types/sanity.types.ts` from schemas + queries — run after any schema/query change |
| studio | `pnpm deploy`            | Deploys the hosted studio                                                                                         |
| root   | `yarn s` / `yarn w`      | Shortcut for studio / web dev                                                                                     |
| root   | `yarn dm "msg"`          | add + commit + push current branch (`dm:p` → `preprod`)                                                           |

## Environment variables (`web/.env.local` + Netlify)

| Var                                                           | Purpose                                |
| ------------------------------------------------------------- | -------------------------------------- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`                               | `6m8quf4y`                             |
| `NEXT_PUBLIC_SANITY_DATASET`                                  | `production`                           |
| `NEXT_PUBLIC_SANITY_API_VERSION`                              | optional, default `2022-11-15`         |
| `NEXT_PUBLIC_SANITY_STUDIO_URL`                               | studio URL (visual editing overlays)   |
| `SANITY_API_READ_TOKEN`                                       | Sanity viewer token (drafts / preview) |
| `SANITY_REVALIDATE_SECRET`                                    | shared secret with the Sanity webhook  |
| `SMTP_HOST` `SMTP_PORT` `SMTP_SECURE` `SMTP_USER` `SMTP_PASS` | contact form mail transport            |
| `CONTACT_FROM_EMAIL` `CONTACT_TO_EMAIL`                       | contact form sender / recipient        |

Studio (optional): `SANITY_STUDIO_STUDIO_HOST` overrides the studio hostname.

## How content flows

1. Editors publish in the studio.
2. A Sanity webhook POSTs to `/api/revalidate` (signed with `SANITY_REVALIDATE_SECRET`) → `revalidateTag(_type)`; `pageModulaire` also busts `home`. Add fan-outs in `FANOUT_TAGS` if new aggregate pages appear.
3. Live preview: studio _Presentation_ tool → `/api/preview` (draft mode). Preview origin is hard-coded in `studio/sanity.config.ts` (`remoteURL`, currently `v1--dryfestrival.netlify.app`) — switch to `https://dryfestival.com` at launch.

Pages are built from **modules** (`studio/schemaTypes/objects/modules`) rendered by `web/app/components/ContentModulaire.tsx`. New module = schema + add to `modulesList.ts` + component + GROQ fragment + `pnpm typegen`.

## Deploy

- **Site**: push to GitHub → Netlify builds `web/` (`pnpm install && pnpm run build`, `@netlify/plugin-nextjs`). Branches: `main` (prod), `v1` (current work, branch deploy).
- **Studio**: `cd studio && pnpm deploy`.

## Gotchas

- `web/AGENTS.md`: Next 16 has breaking changes — check `node_modules/next/dist/docs/` before relying on older patterns.
- i18n: `fr` default, `en` secondary (`web/app/config/i18n.ts`).
