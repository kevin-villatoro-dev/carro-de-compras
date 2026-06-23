FROM php:8.3-cli AS base

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libpq-dev \
    unzip \
    && docker-php-ext-install pdo_pgsql mbstring exif pcntl bcmath gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Create Laravel project
RUN composer create-project laravel/laravel temp-laravel --prefer-dist --no-interaction \
    && cp -a temp-laravel/. . \
    && rm -rf temp-laravel

# Remove default files we'll replace
RUN rm -rf app/Http/Controllers/* app/Models/* resources/views/*

# Copy our custom application files
COPY apps/admin/app/ app/
COPY apps/admin/config/ config/
COPY apps/admin/database/ database/
COPY apps/admin/resources/ resources/
COPY apps/admin/routes/ routes/

# Create .env with PostgreSQL config (empty APP_KEY placeholder)
RUN echo 'APP_NAME="Shopping Cart Admin"' > .env \
    && echo 'APP_ENV=local' >> .env \
    && echo 'APP_KEY=' >> .env \
    && echo 'APP_DEBUG=true' >> .env \
    && echo 'APP_URL=http://localhost:8000' >> .env \
    && echo 'DB_CONNECTION=pgsql' >> .env \
    && echo 'DB_HOST=db' >> .env \
    && echo 'DB_PORT=5432' >> .env \
    && echo 'DB_DATABASE=shopping_cart' >> .env \
    && echo 'DB_USERNAME=postgres' >> .env \
    && echo 'DB_PASSWORD=postgres' >> .env \
    && echo 'SESSION_DRIVER=file' >> .env \
    && echo 'CACHE_STORE=file' >> .env \
    && echo 'QUEUE_CONNECTION=sync' >> .env

# Generate app key
RUN php artisan key:generate --force

# Fix permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

COPY apps/admin/docker/ /app/docker/
RUN chmod +x /app/docker/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/app/docker/entrypoint.sh"]
