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
| `AUTOLEX_IMAGE`                 | `autolex:local`; image tag used by Compose. Set a registry image/tag for a pull-based deployment.            |
| `HOST_PORT`                     | `3000`; local host port bound to 127.0.0.1. The container always listens on 3000.                            |

**Business settings are read by the running Node server, not embedded in a static page at build time.** Next.js server-renders the pages and generates sitemap/robots responses using the runtime configuration. Change `.env`, then recreate the Compose service to apply updates; no image rebuild is needed for business settings. Restart `npm run dev` after local environment changes. `.env.local`, if present, overrides `.env` for local Next.js commands.

Never put secrets in these public settings. Saturday hours, Sunday closure, phone numbers and the address are edited in `src/lib/business.ts` when they change.

## Run with Docker Compose

`docker-compose.yml` is **image-only**: it has no `build:` section and does not build or invoke the Dockerfile. The updated `autolex:local` image is prepared on the development machine. On a new host, load that image or select an existing published registry image before starting Compose.

```bash
cp .env.example .env
# Adjust SITE_URL and other public settings in .env.
docker compose up -d
# Wait for the service to become healthy:
docker compose ps
docker compose logs -f website
```

Open **http://localhost:3000**, or check:

```bash
curl -fsS http://localhost:3000/api/health
```

Expected response: `{"status":"ok","service":"autolex-website"}`.

```bash
# Apply .env changes without rebuilding the image:
docker compose up -d --force-recreate
# Stop the service:
docker compose down
```

The service runs as an unprivileged user, binds `0.0.0.0:3000` internally, has a health check and restarts unless explicitly stopped. No volumes, source mounts, database or persistent storage are needed. The local host port binds to loopback; Dokploy routes to the container internally.

### Transfer the prebuilt image to another Docker host

No image registry has been configured or image published by this task. One option is to export the prepared image, copy the archive using your existing secure transfer process, and load it on the destination host:

```bash
# Development machine:
docker image save autolex:local -o autolex-image.tar
# Destination machine, after transferring the archive:
docker image load -i autolex-image.tar
docker compose up -d
```

Keep image archives outside Git. Alternatively, publish the image to your chosen registry through your deployment pipeline, set `AUTOLEX_IMAGE` to that full registry tag, and use `docker compose pull` before starting it. Publishing and server changes are handled separately.

### Maintainer image builds

The original multi-stage Dockerfile remains available for KhulaNode's image preparation or future CI pipeline. You do not need to build it to start the supplied Compose deployment. When application code or assets change, the maintainer produces an updated image once:

```bash
docker build -t autolex:local .
```

Public settings may be overridden at runtime by Compose. The image uses Node.js 24 LTS on Alpine, `npm ci`, and Next.js standalone output. `.env` files are excluded from the image. A registry-backed production pipeline should use versioned image tags.

## Deploy with Dokploy Compose

1. Create a **Docker Compose** service in the existing Dokploy project, connect the repository and select `docker-compose.yml`. Use Compose mode.
2. Make the prepared image available to that VPS: load the image there using the transfer method above, or configure `AUTOLEX_IMAGE` with an existing accessible registry image. `autolex:local` is a local tag, not an image published on Docker Hub.
3. In Dokploy's Environment settings, set `SITE_URL` to the public HTTPS origin and any approved email, contact, hours or social overrides. The Compose file explicitly passes these variables into the container. Set `HOST_PORT` to an unused local port if 3000 is already occupied.
4. Configure the domain for service **website**, container port **3000**, with HTTP as the internal protocol. Dokploy handles routing and TLS; no custom proxy files are required.
5. Deploy, verify the healthy container and `/api/health`, then check pages, links, canonical URLs, `/sitemap.xml` and `/robots.txt` on the real domain.
6. Recreate/redeploy after environment changes. For code/asset changes, use the newly prepared image. Compose does not compile application source.

See the [official Dokploy Compose documentation](https://docs.dokploy.com/docs/core/docker-compose) for its environment and service controls. No image has been pushed or remote deployment performed by this task.

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
- Image-only Compose startup passes with no build step. Container email/domain overrides update the pages, canonical URLs, sitemap and robots responses without rebuilding.
- `npm start` serves the standalone application and static assets locally.
- Chromium checks cover all four pages at 320, 390, 768 and 1440 pixels, with no horizontal overflow, broken images or automated axe WCAG 2/2.1 A/AA findings. Automated checks do not replace assistive-technology testing.
- Mobile menu opening/closing, Escape, navigation, ten category-specific WhatsApp destinations, structured data and the 404 response pass. No browser JavaScript errors were observed.
- Updated checks cover ten real category photographs, expanded photo credits, the KhulaNode footer hyperlink, confirmed hours and horizontally centred mobile hero buttons.
- `npm audit --omit=dev` reports zero vulnerabilities. Development-toolchain advisories are described below.

Versions are locked in `package-lock.json`. Use `npm audit --omit=dev` to check production packages and `npm audit` for the complete development toolchain. At implementation time, the latest matching Next.js ESLint config inherits the `braces` stack-exhaustion advisory through `fast-glob`/`micromatch`; npm reports five related development-only entries and no published patched `braces` release. Do not apply the suggested forced downgrade to an old Next.js lint config. Recheck for an upstream compatible fix before production maintenance updates.
