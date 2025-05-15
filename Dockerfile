###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM docker.arvancloud.ir/node:20-alpine As development

# Create app directory
WORKDIR /usr/src/app
RUN apk add --no-cache openssl

# Copy application dependency manifests to the container image.
COPY --chown=node:node package*.json ./

# Install app dependencies using the npm ci command instead of npm install
RUN npm i

# Bundle app source
COPY --chown=node:node . .

# Use the node user from the image (instead of the root user)
USER node

###################
# BUILD FOR PRODUCTION
###################

FROM docker.arvancloud.ir/node:20-alpine As build

WORKDIR /usr/src/app
RUN apk add --no-cache openssl

RUN mkdir -p /usr/src/app/prisma/migrations 
RUN mkdir -p /usr/src/app/prisma/seeds

COPY --chown=node:node package*.json ./

# Copy Prisma files
COPY --chown=node:node prisma/schema.prisma ./prisma/
COPY --chown=node:node prisma/migrations ./prisma/migrations/
COPY --chown=node:node prisma/seeds ./prisma/seeds/

# Copy node_modules from development stage
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# Copy source code
COPY --chown=node:node . .

# Generate Prisma client and build app
RUN npx prisma generate --schema=./prisma/schema.prisma

RUN npm run build

RUN npm install --omit=dev && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM docker.arvancloud.ir/node:20-alpine As production
RUN apk add --no-cache openssl

WORKDIR /app

# Copy only necessary files from build stage
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

USER node

CMD ["/bin/sh", "-c", "npx prisma migrate deploy && node ./dist/src/main"]