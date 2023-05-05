FROM node:18.15.0

WORKDIR /app

# Install Git
RUN apt-get update && \
  apt-get install -y git

# Clone the repository
RUN git clone https://github.com/LoneExile/blog.git .

# Install pnpm
RUN npm i -g pnpm

# Install dependencies
RUN pnpm i

# Build the project
RUN pnpm run build

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "./dist/server/entry.mjs"]

