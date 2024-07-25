FROM node:16.10.0-alpine3.13



WORKDIR /usr/src/chatty/chatty/frontend/



COPY package*.json ./
RUN yarn install

COPY . .

