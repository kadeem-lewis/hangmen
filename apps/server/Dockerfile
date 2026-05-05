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
RUN pnpm --filter=@hangmen/server build
RUN pnpm deploy --filter=@hangmen/server --prod ./prod/server

FROM base AS production

COPY --from=builder app/prod/server ./

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs && \
 useradd --system -m --uid 1001 --gid nodejs expressjs
USER expressjs

CMD ["node","dist/src/server.js"]