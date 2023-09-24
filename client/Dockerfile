FROM node:18-alpine as build
WORKDIR /usr/app
COPY . .
RUN npm ci
RUN npm run build

FROM node:18-alpine3.16
# RUN apt-get update && apt-get install -y
# ENV NODE_ENV production
USER node
WORKDIR /usr/app
RUN npm i express
COPY --chown=node:node --from=build /usr/app/dist /usr/app
EXPOSE 3000
CMD [ "node", "server.js" ]
