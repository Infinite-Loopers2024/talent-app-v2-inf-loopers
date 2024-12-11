FROM node:23.1.0

WORKDIR /src

# Copy package.json and yarn.lock to the container
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN npm --legacy-peer-deps install

# Push drizzle-schema
RUN npx drizzle-kit push

# Copy the app's source code to the container
COPY . .

# Build the Next app
RUN npm run build

# Serve the production build
CMD ["npm", "start"]
