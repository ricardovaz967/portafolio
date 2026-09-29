# Ricardo Israel Vázquez Domínguez Portfolio

An English, CV-backed personal portfolio for a Java Backend Developer. Public-facing content is limited to information verified in the supplied résumé.

## Local development

Requires Node.js 22+ and pnpm.

```bash
corepack pnpm install
Copy-Item .env.example .env.local
corepack pnpm dev
```

Before deployment, run:

```bash
corepack pnpm typecheck
corepack pnpm build
```

## VPS deployment with Docker

1. Point your domain's DNS A record to the VPS public IP.
2. Install Docker Engine and the Docker Compose plugin on the VPS.
3. Clone this repository and create `.env` from `.env.example`. Set `NEXT_PUBLIC_SITE_URL` to your full HTTPS domain.
4. In `nginx/default.conf`, replace `server_name _;` with your domain name.
5. Start the containers:

```bash
docker compose up -d --build
```

The included Nginx container proxies to the production Next.js container and listens on port `3000`. Put a TLS-terminating reverse proxy (such as a host-level Nginx with Certbot, Caddy, or Nginx Proxy Manager) in front of `127.0.0.1:3000` to serve HTTPS on ports 80 and 443.

For an interactive local Docker test:

```bash
docker compose up --build
```
