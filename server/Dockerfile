FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Make sure shared types are available
COPY shared-types.ts src/shared-types.ts

# Build the app
RUN npm run build

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]