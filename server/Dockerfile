FROM node:18-alpine

WORKDIR /app

# Copy simplified package.json for Railway
COPY package.railway.json ./package.json

# Install dependencies
RUN npm install

# Copy simplified index.js
COPY index.js ./

# Copy .env
COPY .env ./

# Expose port
EXPOSE 3001

# Start the server
CMD ["npm", "start"]