#!/bim/sh

# composer update --no-progress --with-all-dependencies --optize-autoloader

if [ ! -file .env ]; then
    echo "Could not fine environment file..."
    echo "Creating One from .env.example"
    cp .env.example .env
fi

echo "Checking mysql service for connection..."

until nc -z mysql 3306
do
    echo "Waiting for mysql service for connection"
    sleep 5
done

echo "Connected to mysql service..."
php artisan migrate
php artisan cache:clear
php artisan route:clear
php artisan config:clear
php artisan view:clear

exec php-fpm

