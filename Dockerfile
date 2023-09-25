# Use an official Node.js runtime as a parent image
FROM node:14 as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your project files to the container
COPY . .

# Compile TypeScript code to JavaScript
RUN npm run build

# Stage 2 - Install FFmpeg
FROM builder as installer

# Install FFmpeg
RUN apt-get update && apt-get install -y ffmpeg

# Stage 3 - Run Migrations
FROM installer as migrator

# Expose a port (if your app listens on a specific port)
EXPOSE 3000

# Command to start your application
CMD ["node", "dist/app.js"]
