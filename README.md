# Autolex website

KhulaNode-managed business website for **Autolex Auto Electrical Supplies**, 119 River Street, Ladanna, Polokwane. A responsive Next.js App Router application with TypeScript, Tailwind CSS and Lucide icons. It includes Home, About, Products and Contact pages; category-specific WhatsApp enquiries; phone, email and directions links; and configurable social profiles.

The product section is a static category showcase. There is no database, backend contact form, inventory, checkout, accounts, booking or payment functionality.

## Local development

Use **Node.js 24 LTS** and npm. `.nvmrc` is provided for nvm users.

```bash
nvm use
npm install
cp .env.example .env
npm run dev
```

Open **http://localhost:3000**. To use the committed dependency lockfile on subsequent installations, use `npm ci`.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

The production server also listens on port 3000. Run `npm run build` before `npm start`. Run typecheck after a build when checking generated Next.js route types.

## Business configuration

`src/lib/business.ts` centralises business information, contact links and the typed trading schedule. The supplied hours are **Monday–Friday 08:00–16:30, Saturday 08:00–11:30, Sunday closed**, all in SAST. Closed Sunday hours are also included in structured data. Public holiday hours should still be confirmed before visiting.

The demo email is **info@autolex.co.za**. Displaying it does not provision a mailbox: KhulaMail is managed independently by KhulaNode. The website only generates `mailto:` links. WhatsApp enquiries are prefilled links for the visitor to send; there is no API or automation.

| Variable                        | Default / purpose                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`                      | `http://localhost:3000`; use the actual public HTTPS origin for canonical URLs, sitemap and social metadata. |
| `BUSINESS_EMAIL`                | `info@autolex.co.za`, the requested demo address.                                                            |
| `BUSINESS_WHATSAPP`             | `27730572188`, including country code.                                                                       |
| `FACEBOOK_URL`, `INSTAGRAM_URL` | Empty until official full profile URLs are supplied.                                                         |
| `WEEKDAY_OPEN`, `WEEKDAY_CLOSE` | `08:00`, `16:30`, in 24-hour SAST. Change both together.                                                     |
| `AUTOLEX_IMAGE`                 | `autolex-website:latest`; local output tag for the image built by Compose.            |
| `HOST_PORT`                     | `3000`; local host port bound to 127.0.0.1. The container always listens on 3000.                            |

**Business settings are read by the running Node server, not embedded in a static page at build time.** Next.js server-renders the pages and generates sitemap/robots responses using the runtime configuration. Change `.env`, then recreate the Compose service to apply updates; no image rebuild is needed for business settings. Restart `npm run dev` after local environment changes. `.env.local`, if present, overrides `.env` for local Next.js commands.

Never put secrets in these public settings. Saturday hours, Sunday closure, phone numbers and the address are edited in `src/lib/business.ts` when they change.

## Run with Docker Compose

`docker-compose.yml` builds the repository's multi-stage Dockerfile and tags the
result as `autolex-website:latest` (or `AUTOLEX_IMAGE`). `pull_policy: build` makes Compose
build from source on deployment, even when an older image already exists. No
prebuilt image, registry account or Docker login is required.

```bash
cp .env.example .env
# Adjust SITE_URL and other public settings in .env.
docker compose up -d --build
docker compose ps
docker compose logs -f website
curl -fsS http://localhost:3000/api/health
```

Expected health response: `{"status":"ok","service":"autolex-website"}`.

The image uses Node.js 24 on Alpine, `npm ci` and Next.js standalone output. It
runs as an unprivileged user, listens on container port 3000 and includes a health
check. Local access binds to `127.0.0.1:${HOST_PORT:-3000}`. No database or persistent
volumes are required. Business settings are supplied at runtime; `.env` files are
excluded from the image. Redeploy after code changes; recreate the container after
changing environment values.

```bash
# Apply environment changes without rebuilding:
docker compose up -d --no-build --force-recreate
# Stop the local service:
docker compose down
```

## Deploy with Dokploy Compose

1. Connect the `KhulaNode/autolex` Git repository and the branch containing this
   change to a **Docker Compose** service. Select `docker-compose.yml` and Compose
   mode, with the repository root as the source directory.
2. Set `SITE_URL` to the actual public HTTPS origin in Dokploy's Environment
   settings. Set any approved contact, hours and social overrides there too.
   `AUTOLEX_IMAGE` may stay unset; it is an output tag for the local build.
3. Configure the domain for service **website**, container port **3000**, with HTTP
   as the internal protocol. Dokploy handles TLS and routing. If the local host
   port 3000 is occupied, set `HOST_PORT` to an unused port.
4. Deploy. Compose builds the image from the checked-out source. An explicit custom
   Compose command, if used, should be `docker compose up -d --build`; remove any
   custom image-only pull command or `--no-build` flag.
5. Verify the healthy container and `/api/health`, then check pages, canonical URLs,
   `/sitemap.xml` and `/robots.txt` on the real domain. Redeploy after source changes.

The earlier `pull access denied for autolex` error came from an image-only Compose
file pointing at an unpublished local tag. Adding `build` and `pull_policy: build`
removes that dependency. Do not use Swarm/Stack mode for this source-build setup;
that mode requires a separately built and published image.

See the [Dokploy Compose documentation](https://docs.dokploy.com/docs/core/docker-compose)
and [Docker pull policy documentation](https://docs.docker.com/reference/compose-file/services/#pull_policy).

## Assets and content assumptions

- Supplied brand files are preserved in `public/branding/`. The original `AutoLex Lightning Logo.png` is used in the header/footer; `Bold AL Lightning Bolt Logo.png` supplies the favicon. No substitute business logo was created.
- Supplied JPG promotional artwork and the business card informed the colours and product information. They remain available as source assets. No separate website mockup was found.
- The engine image in `public/images/engine-workshop.jpg` is an illustrative automotive photo from [Unsplash](https://unsplash.com) via [the original image CDN](https://images.unsplash.com/photo-1486262715619-67b85e0b08d3), downloaded for this POC. It does not depict Autolex’s premises or stock. [Unsplash licence](https://unsplash.com/license). Replace it with approved business photography if supplied.
- All ten categories use real component photographs downloaded from Wikimedia Commons and hosted in `public/images/products/`. Author, source and reuse-licence details are preserved in `public/images/products/CREDITS.md` and the expandable photography credits on the Products page, linked from the footer. These are category examples, not photographs of confirmed Autolex stock. No availability, brand or compatibility claims are implied.
- Both supplied phone numbers are shown on the business card beside the WhatsApp mark. The first is used as the default enquiry destination; Brandon should confirm the preferred number before launch.
- Official Facebook/Instagram URLs and public-holiday hours remain unconfirmed. The weekday, Saturday and Sunday schedule was supplied by the client.
- No testimonials, history, certifications, stock counts or performance/ranking claims have been added.
- Default fonts are local system fonts, so builds and page rendering do not depend on a third-party font service.

## Structure

```text
src/app/             Routes, metadata, sitemap, robots, health endpoint
src/components/      Shared navigation, footer, cards and enquiry components
src/lib/business.ts  Business configuration, contact links and trading hours
src/lib/products.ts  Static category definitions
src/lib/product-images.ts  Component photos and provenance
src/lib/seo.ts       Shared page metadata helper
public/              Original branding and locally hosted imagery
```

Only the responsive navigation needs a client component. The content is server-rendered with runtime business settings; semantic headings, keyboard focus, a skip link, reduced-motion support, image sizing and category-specific accessible link names are included. Social cards and the favicon are generated locally at build time.

## Dependency checks

Validation completed for this POC:

- `npm run lint`, `npm run typecheck` and `npm run build` pass.
- Production Docker image builds; its container runs as `nextjs` and reports healthy. Pages, metadata routes, image optimisation and `/api/health` return HTTP 200.
- Container email/domain overrides update the pages, canonical URLs, sitemap and robots responses without rebuilding.
- `npm start` serves the standalone application and static assets locally.
- Chromium checks cover all four pages at 320, 390, 768 and 1440 pixels, with no horizontal overflow, broken images or automated axe WCAG 2/2.1 A/AA findings. Automated checks do not replace assistive-technology testing.
- Mobile menu opening/closing, Escape, navigation, ten category-specific WhatsApp destinations, structured data and the 404 response pass. No browser JavaScript errors were observed.
- Updated checks cover ten real category photographs, expanded photo credits, the KhulaNode footer hyperlink, confirmed hours and horizontally centred mobile hero buttons.
- `npm audit --omit=dev` reports zero vulnerabilities. Development-toolchain advisories are described below.

Versions are locked in `package-lock.json`. Use `npm audit --omit=dev` to check production packages and `npm audit` for the complete development toolchain. At implementation time, the latest matching Next.js ESLint config inherits the `braces` stack-exhaustion advisory through `fast-glob`/`micromatch`; npm reports five related development-only entries and no published patched `braces` release. Do not apply the suggested forced downgrade to an old Next.js lint config. Recheck for an upstream compatible fix before production maintenance updates.
