# Use the official Node.js image as a base
FROM node:16

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install the required dependencies
RUN npm install

# Copy the remaining application code
COPY . .

# Expose the port for the service
EXPOSE 5005

# Command to start the application
CMD ["node", "index.js"]
