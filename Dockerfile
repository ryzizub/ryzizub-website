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

# Copy the build output from the previous stage
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80