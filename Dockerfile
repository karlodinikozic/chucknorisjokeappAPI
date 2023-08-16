# Use an official Node.js 20 image as the base
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install project dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Expose the port that your application runs on
EXPOSE 3000

# Start your application
CMD ["yarn", "start"]
