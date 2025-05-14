# PHP
FROM php:8.3.20-fpm-alpine3.20 AS php

RUN apk add --update --no-cache zip unzip curl libpq netcat-openbsd shadow
RUN docker-php-ext-install pdo pdo_mysql bcmath

WORKDIR /var/www/html
COPY . .
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

















