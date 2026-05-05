ARG NODE_VERSION=24

FROM node:${NODE_VERSION}-slim AS base

# Setup PNPM
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

FROM base AS builder

COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm --filter=@hangmen/shared build
RUN pnpm --filter=@hangmen/client generate

FROM nginxinc/nginx-unprivileged:alpine-slim AS production

COPY --from=builder /app/apps/client/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/apps/client/.output/public /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]