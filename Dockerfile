# Stage 1: Build the application
FROM node:18 as build-stage

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or similar for your app)
COPY package*.json ./

# Install any necessary dependencies
RUN npm install

# Copy the rest of your application's source code
COPY . .

# Build
RUN npm run build

# Stage 2: Serve the application
FROM nginx:alpine

# Add build argument for commit hash
ARG COMMIT_HASH
# Add label with commit hash
LABEL commit_hash=$COMMIT_HASH

# Copy the build output from the previous stage
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80