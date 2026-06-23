#!/bin/bash
set -e

echo "Waiting for PostgreSQL..."
until php -r "new PDO('pgsql:host=db;port=5432;dbname=shopping_cart', 'postgres', 'postgres');" 2>/dev/null; do
    sleep 2
done
echo "PostgreSQL is ready."

# Run DB setup (migration records + users table)
php /app/docker/setup.php

# Seed admin user if not exists
php artisan db:seed --class=AdminSeeder --force 2>/dev/null || true

echo "Starting server..."
exec php artisan serve --host=0.0.0.0 --port=8000
