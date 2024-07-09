FROM node:16.3.0-alpine3.13



WORKDIR /usr/src/chatty/chatty/frontend/
COPY . .
RUN npm cache clean --force
RUN npm install





EXPOSE 3000
CMD ["npm", "start"]
