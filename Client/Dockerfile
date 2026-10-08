# syntax=docker/dockerfile:1

# Build stage: compile the Vite app into static assets
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage: serve static files with Nginx
FROM nginx:alpine AS production

# Built static assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx config: proxy API calls to the backend service
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]