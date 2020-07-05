# https://nodejs.org/de/docs/guides/nodejs-docker-webapp/
FROM node:14.5 as build
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm install

COPY . ./
RUN npm run build

FROM nginx
COPY ./default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /data/www/