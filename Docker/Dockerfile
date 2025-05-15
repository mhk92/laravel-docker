# PHP
FROM php:8.3.20-fpm-alpine3.20 AS php

RUN apk add --update --no-cache zip unzip curl libpq netcat-openbsd shadow
RUN docker-php-ext-install pdo pdo_mysql bcmath

WORKDIR /var/www/html
COPY . .
RUN if [ $(id -u www-data) -ne 1000 ]; then usermod --uid 1000 www-data; fi
RUN if [ $(id -g www-data) -ne 1000 ]; then groupmod --gid 1000 www-data; fi
#COPY ./Docker/php-entry.sh ./Docker/php-entry.sh
RUN chown -R www-data:www-data ./storage
RUN chown -R www-data:www-data ./bootstrap/cache
RUN chown www-data:www-data ./public/index.php

RUN chmod +x ./public/index.php
RUN chmod +x ./Docker/php-entry.sh
COPY --from=composer:2.8.8 /usr/bin/composer /usr/bin/composer

#COPY --chmod=0755 ./Docker/php-entry.sh /var/www/html/Docker/php-entry.sh

EXPOSE 9000
ENTRYPOINT ["/var/www/html/Docker/php-entry.sh"]

# NGINX
FROM nginx:stable-alpine-perl AS nginx
RUN apk update
RUN mkdir -p /var/www/html
WORKDIR /var/www/html
COPY ./public ./public
COPY ./Docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod 755 ./public
CMD ["nginx", "-g", "daemon off;"]

# node
FROM node:lts-slim AS node

RUN apt update -y
RUN mkdir -p /var/www/html

WORKDIR /var/www/html

COPY --chown=node:node ./package-lock.json ./
COPY --chown=node:node ./package.json ./
COPY --chown=node:node ./vite.config.js ./
COPY --chown=node:node ./public ./public
COPY --chown=node:node ./resources ./resources
COPY ./Docker/node-entry.sh ./node-entry.sh
RUN npm install
RUN chown -R node:node ./node_modules

EXPOSE 5173
CMD ["npm", "run", "dev"]
ENTRYPOINT ["/var/www/html/node-entry.sh"]












