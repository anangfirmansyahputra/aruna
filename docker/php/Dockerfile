FROM php:8.4-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    zip unzip curl git libonig-dev libxml2-dev libzip-dev libpng-dev \
    libjpeg-dev libfreetype6-dev npm nodejs \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Install composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Setting workdir
WORKDIR /var/www/html

# Copy entire project
COPY . .

# Insatll PHP Dependencies
RUN composer install

RUN npm install && npm run build

CMD [ "php-fpm" ]