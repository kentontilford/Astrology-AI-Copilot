FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.railway.json ./package.json

# Install dependencies
RUN npm install

# Copy application files
COPY index.js ./
COPY start.sh ./

# Make startup script executable
RUN chmod +x ./start.sh

# Expose port
EXPOSE 3001

# Start the server using the startup script
CMD ["./start.sh"]