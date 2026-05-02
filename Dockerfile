# Use the official Node.js 18 image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy all the project files into the container
COPY . .

# Expose port 8080 (the port your server.js and Google Cloud Run use)
EXPOSE 8080

# Start the Node.js server
CMD ["npm", "start"]
