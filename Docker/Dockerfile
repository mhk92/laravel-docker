# PHP
FROM php:8.3.20-fpm.alpine3.20 AS php

RUN apk add --update --no-cache zip unzip curl libpq netcat-openbsd shadow
RUN docker-php-ext-install pdo pdo_mysqlbcmath

WORKDIR /var/www/html
COPY . .

RUN chown -R www-data:www-data ./storage
RUN chown -R www-data:www-data ./bootstarp/cache
RUN chown www-data:www-data ./public/index.php

RUN chmod +x ./public/index.php
RUN chmod +x ./Docker/php-entry.sh

COPY --from=composer:2.8.8 /usr/bin/composer /usr/bin/composer

EXPOSE 9000
ENTRYPOINT ["/var/www/html/Docker/php-entry.sh"]
