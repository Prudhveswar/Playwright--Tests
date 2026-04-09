# Use the official Microsoft Playwright image (v1.58.2 matches your local version)
FROM mcr.microsoft.com/playwright:v1.58.2-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package files first to leverage Docker's cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your project files
COPY . .

# Run Playwright tests
CMD ["npx", "playwright", "test"]