# Stage 1: Build the application
FROM node:25 AS build-stage

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or similar for your app)
COPY package*.json ./

# Install any necessary dependencies
RUN npm ci

# Copy the rest of your application's source code
COPY . .

# Build
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine

# Copy the build output from the previous stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80