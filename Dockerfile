# Use Node.js 18
FROM node:18

# Accept build-time args for OpsAI
ARG MW_VCS_REPOSITORY_URL
ARG MW_VCS_COMMIT_SHA

# Set them as env variables inside the container
ENV MW_VCS_REPOSITORY_URL=$MW_VCS_REPOSITORY_URL
ENV MW_VCS_COMMIT_SHA=$MW_VCS_COMMIT_SHA

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose port
EXPOSE 3000

# Set environment variable for Middleware agent
ENV MW_AGENT_SERVICE=172.17.0.1

# Run the app with instrumentation
CMD ["node", "--require", "./instrumentation.js", "index.js"]
