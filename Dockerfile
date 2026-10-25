# ==============================================================================
# Claxic Platform - Multi-Stage Production Dockerfile
# Base Image: Node.js 22 Alpine (Native node:sqlite support & minimal attack surface)
# ==============================================================================

# STAGE 1: Build Dependencies & Frontend Assets
FROM node:22-alpine AS builder

WORKDIR /app

# Install build dependencies
COPY package*.json ./
COPY frontend/package*.json ./frontend/
COPY backend/package*.json ./backend/

# Clean install all workspaces dependencies
RUN npm ci

# Copy application source code
COPY . .

# Build Vite React SPA into frontend/dist
RUN npm run build

# STAGE 2: Production Runtime Image
FROM node:22-alpine AS runner

WORKDIR /app

# Runtime environment settings
ENV NODE_ENV=production
ENV SERVE_FRONTEND=true
ENV PORT=5000

# Copy workspace dependencies and package manifests
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/uploads ./uploads
COPY --from=builder /app/ecosystem.config.cjs ./

# Ensure uploads and database directories exist and have write permissions
RUN mkdir -p /app/backend/db /app/uploads/videos && chmod -R 777 /app/backend/db /app/uploads

# Expose server port (default 5000)
EXPOSE 5000

# Container healthcheck testing backend API availability
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://localhost:' + (process.env.PORT || 5000) + '/api/health').then(r => r.ok ? process.exit(0) : process.exit(1)).catch(() => process.exit(1))"

# Start Claxic Unified Backend + Frontend Server
CMD ["node", "backend/server.js"]
