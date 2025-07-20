# 1. Build frontend
FROM node:18 AS frontend-build
WORKDIR /app/client
COPY client/package.json client/package-lock.json ./
RUN npm install
COPY client/ ./
RUN npm run build

# 2. Build backend and copy frontend build
FROM node:18 AS backend
WORKDIR /app
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm install

# Copy backend source
COPY server ./server

# Copy frontend build to backend's public directory
COPY --from=frontend-build /app/client/dist ./server/public

# Set environment variables (can be overridden by Back4App)
ENV NODE_ENV=production

# Expose the port (make sure it matches your server's PORT)
EXPOSE 3000

# Start the backend server
CMD ["node", "server/index.js"] 