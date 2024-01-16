# Fetching the minified node image on apline linux
FROM node:slim AS build

# Setting up the work directory
WORKDIR /express-docker

# Copying all the files in our project
COPY package*.json ./

# Installing dependencies
RUN npm install

COPY . .

RUN npm run build

RUN npm install --prod

FROM node:slim

# Declaring env
ENV NODE_ENV production

WORKDIR /express-docker

COPY --from=build /express-docker/node_modules /express-docker/node_modules
COPY --from=build /express-docker/dist /express-docker/dist
COPY package.json .

CMD ["node", "dist/app.js"]

# Exposing server port
EXPOSE 3000