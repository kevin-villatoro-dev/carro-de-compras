#!/bin/bash
# Setup script for Laravel admin - runs inside Docker

set -e

echo "Setting up Laravel Admin..."

# Create Laravel project in a temp container
docker run --rm -v "$(pwd)/apps/admin:/app" -w /app composer:latest sh -c "
    composer create-project --prefer-dist laravel/laravel . --no-interaction || true
"

echo "Laravel admin setup complete!"
