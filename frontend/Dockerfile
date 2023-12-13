# Use an official Node.js image as the base image
FROM node:14-alpine as builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Use a lightweight Node.js image for the final image
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the built app from the builder stage
COPY --from=builder /app/build ./build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "./build/index.js"]
