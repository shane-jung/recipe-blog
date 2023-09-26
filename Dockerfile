# Use an official Node.js runtime as the base image
FROM node:slim

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of your backend code to the container
COPY dist/ ./dist/

# Expose the port your application will run on
EXPOSE 80

# Define the command to start your application
CMD ["npm", "start"]