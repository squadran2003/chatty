FROM node:16.10.0-alpine3.13 as build



WORKDIR /usr/src/chatty/chatty/frontend/



COPY package*.json ./
RUN yarn install

COPY . .

ENV REACT_APP_BACKEND_URL=https://chattymusic.com:8080
ENV REACT_APP_WS_URL=ws://chattymusic.com:8080

RUN yarn build

# Stage 2: Serve the React app
FROM nginx:alpine


# Install necessary dependencies
RUN apk add --no-cache certbot python3 py3-pip py3-virtualenv

# Create and activate a virtual environment
RUN python3 -m venv /opt/certbot/
ENV PATH="/opt/certbot/bin:$PATH"

# Install Certbot and the Nginx plugin in the virtual environment
RUN pip install certbot-nginx

# remove nginx default config
RUN rm /etc/nginx/conf.d/default.conf
COPY ./production/nginx.conf /etc/nginx/conf.d

# Copy the built React app from the previous stage
COPY --from=build /usr/src/chatty/chatty/frontend/build /usr/share/nginx/html

# Expose the port the app runs on
EXPOSE 80
EXPOSE 443

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]