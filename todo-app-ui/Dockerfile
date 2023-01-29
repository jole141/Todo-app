# Use an official Node.js image as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package*.json yarn.lock ./

# Install the dependencies
RUN yarn

# Copy the remaining files to the container
COPY . .

# Build the application in production mode
RUN yarn build

ENV HOST=0.0.0.0 PORT=3001

EXPOSE ${PORT}
# Serve the application with a lightweight web server
CMD ["yarn", "start"]
