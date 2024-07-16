FROM node:16.10.0-alpine3.13 as build



WORKDIR /usr/src/chatty/chatty/frontend/



COPY package*.json ./
RUN yarn install

COPY . .


RUN yarn build

# Stage 2: Serve the React app
FROM nginx:alpine

# remove nginx default config
RUN rm /etc/nginx/conf.d/default.conf
COPY ./production/nginx.conf /etc/nginx/conf.d

# Copy the built React app from the previous stage
COPY --from=build /usr/src/chatty/chatty/frontend/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]