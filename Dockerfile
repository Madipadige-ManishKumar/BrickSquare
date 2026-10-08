# syntax=docker/dockerfile:1

# Backend API service (Node.js + Express + MongoDB)
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies first (better layer caching)
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy application source
COPY api ./api

# Create a non-root user to run the container
RUN addgroup -g 1001 -S nodejs \
    && adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 5000

ENV NODE_ENV=production

# MongoDB connection string is read from MONGO_DB_URL env var
CMD ["node", "api/index.js"]