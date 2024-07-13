FROM node:16.10.0-alpine3.13 as build



WORKDIR /usr/src/chatty/chatty/frontend/



COPY package*.json ./
RUN npm cache clean --force
RUN npm install -g npm-check-updates
RUN ncu -u
RUN npm install



RUN npm run build


FROM nginx:1.25

USER root
RUN apt-get update

RUN apt-get install -y --no-install-recommends certbot python3-certbot-nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

COPY --from=build /usr/src/chatty/chatty/frontend/dist /usr/share/nginx/html
