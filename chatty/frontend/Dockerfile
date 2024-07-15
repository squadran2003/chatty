FROM node:16.10.0-alpine3.13



WORKDIR /usr/src/chatty/chatty/frontend/



COPY package.json ./
RUN npm cache clean --force
RUN npm install -g npm-check-updates
RUN ncu -u
RUN npm install

COPY . .


