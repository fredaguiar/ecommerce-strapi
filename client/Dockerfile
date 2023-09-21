# Creating multi-stage build for production
FROM node:18-alpine as build
WORKDIR /usr/app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.24.0-alpine
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
