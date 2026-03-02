# ============================================================
# Dockerfile for Flower App (Node.js / Express)
# Docker Training Project — EC2 Deployment
# ============================================================

# -----------------------------------------------------------
# STAGE 1 — Base Image
# We use the official Node.js 20 image based on Alpine Linux.
# Alpine is a minimal Linux distro (~5 MB), keeping our final
# image small and secure — important for EC2 disk usage.
# -----------------------------------------------------------
FROM node:20-alpine

# -----------------------------------------------------------
# LABEL — Metadata about this image
# Good practice: allows `docker inspect` to show ownership info
# -----------------------------------------------------------
LABEL maintainer="Flower App Team"
LABEL description="Flower App — Node.js/Express + MongoDB project"
LABEL version="1.0"

# -----------------------------------------------------------
# WORKDIR — Set the working directory inside the container
# All subsequent commands (COPY, RUN, CMD) run from here.
# The directory is created automatically if it does not exist.
# -----------------------------------------------------------
WORKDIR /usr/src/app

# -----------------------------------------------------------
# COPY package files FIRST (before copying all source code)
# Why? Docker caches each layer. If source code changes but
# package.json has NOT changed, Docker reuses the cached
# npm install layer — making rebuilds much faster.
# -----------------------------------------------------------
COPY package*.json ./

# -----------------------------------------------------------
# RUN — Install production dependencies only
# --omit=dev skips devDependencies (smaller image, fewer
# vulnerabilities). We also clean the npm cache to reduce
# the final image size.
# -----------------------------------------------------------
RUN npm install --omit=dev && npm cache clean --force

# -----------------------------------------------------------
# COPY — Now copy the rest of the application source code
# into the container's working directory.
# (Files listed in .dockerignore are excluded automatically)
# -----------------------------------------------------------
COPY . .

# -----------------------------------------------------------
# EXPOSE — Document which port the app listens on.
# This does NOT publish the port to the host — that is done
# via `docker run -p` or the docker-compose `ports:` section.
# Port 3015 matches the PORT variable in .env / app.js
# -----------------------------------------------------------
EXPOSE 3015

# -----------------------------------------------------------
# CMD — The command that runs when the container starts.
# Using the JSON (exec) form is preferred over shell form
# because it avoids spawning a shell process, and signals
# like SIGTERM are passed directly to node (clean shutdown).
# -----------------------------------------------------------
CMD ["node", "app.js"]
