FROM node:18-alpine as build
WORKDIR /usr/app
COPY . .
RUN npm ci
RUN npm run build

FROM node:18-alpine3.16
WORKDIR /usr/app
# COPY package*.json ./
# RUN npm i --production
RUN npm i express dotenv
COPY --from=build /usr/app/dist /usr/app
EXPOSE 3000
CMD [ "node", "server.js" ]
