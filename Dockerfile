# Use a slim Node.js 18 image for a small security footprint
FROM node:18-slim

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install only production dependencies for security/speed
RUN npm install --only=production

# Bundle app source
COPY . .

# The app binds to port 8080 by default for cloud functions
EXPOSE 8080

# Command to run the specialized backend
CMD [ "node", "functions/chat.js" ]

