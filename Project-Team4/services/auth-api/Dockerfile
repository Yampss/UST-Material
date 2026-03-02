# ─────────────────────────────────────────────────────────────
# AUTH-API MICROSERVICE DOCKERFILE
# Handles: /api/auth/* routes
# Network: backend-net + db-net
# ─────────────────────────────────────────────────────────────

FROM node:20-alpine

LABEL service="auth-api"
LABEL maintainer="AFF Team"

# Install wget for health checks
RUN apk add --no-cache wget

WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force

# Copy application code
COPY . .

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=15s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3001/health || exit 1

# Start the service
CMD ["node", "app.js"]
