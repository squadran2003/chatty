FROM nginx:1.25

USER root
RUN apt-get update

RUN apt-get install -y --no-install-recommends certbot python3-certbot-nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Use the same volume as the React app
VOLUME /usr/share/nginx/html

COPY --from=build /usr/src/chatty/chatty/frontend/build /usr/share/nginx/html
