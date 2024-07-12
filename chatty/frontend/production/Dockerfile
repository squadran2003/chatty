FROM node:16.10.0-alpine3.13



WORKDIR /usr/src/chatty/chatty/frontend/



COPY package*.json ./
RUN npm cache clean --force
RUN npm install -g npm-check-updates
RUN ncu -u
RUN npm install

COPY . .


RUN npm run build

WORKDIR /usr/src/chatty/chatty/frontend/build/
# Use a lightweight production image
FROM nginx:1.25

# Copy the built React app from the previous stage to the Nginx public directory
COPY --from=build /usr/src/chatty/chatty/frontend/build /usr/share/nginx/html

# Copy custom nginx.conf to the container
# when using the official Nginx images
# the default location of the configuration file is /etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx/nginx.conf


# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
