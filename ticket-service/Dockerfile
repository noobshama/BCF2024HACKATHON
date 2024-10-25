# Use the official Node.js image as a base image
FROM node:16

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that the Ticket service will run on
EXPOSE 5002

# Start the application
CMD ["npm", "start"]
