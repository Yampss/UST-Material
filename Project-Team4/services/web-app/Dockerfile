# ─────────────────────────────────────────────────────────────
# WEB-APP SERVICE DOCKERFILE
# Serves: EJS views, static files
# Proxies to: auth-api, product-api, cart-api
# Network: frontend-net + backend-net
# ─────────────────────────────────────────────────────────────

FROM node:20-alpine

LABEL service="web-app"
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
EXPOSE 3000

# Health check
HEALTHCHECK --interval=15s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/health || exit 1

# Start the service
CMD ["node", "app.js"]
