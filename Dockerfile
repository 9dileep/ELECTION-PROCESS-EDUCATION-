# ─────────────────────────────────────────────────────
#  ElectED – Production Dockerfile
#  Multi-stage principles: lean alpine base, non-root user
# ─────────────────────────────────────────────────────

# Use the official Node.js 18 LTS on Alpine for a minimal image
FROM node:18-alpine

# Set environment to production (disables devDependencies, enables optimizations)
ENV NODE_ENV=production

# Create a non-root user for security (never run containers as root)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests first (Docker layer cache optimization)
COPY package*.json ./

# Install ONLY production dependencies with clean reproducible install
RUN npm ci --omit=dev

# Copy the rest of the application source code
COPY . .

# Switch to non-root user before running the application
USER appuser

# Expose the port Cloud Run / the app expects
EXPOSE 8080

# Start the Node.js server
CMD ["node", "server.js"]
