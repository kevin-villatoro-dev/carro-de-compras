<?php

$host = 'db';
$port = '5432';
$database = 'shopping_cart';
$username = 'postgres';
$password = 'postgres';

$dsn = "pgsql:host=$host;port=$port;dbname=$database";
$pdo = new PDO($dsn, $username, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

// Check if migrations table exists, create if not
$hasMigrationsTable = $pdo->query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'migrations')")->fetchColumn();
if (!$hasMigrationsTable) {
    $pdo->exec("CREATE TABLE migrations (
        id SERIAL PRIMARY KEY,
        migration VARCHAR(255) NOT NULL,
        batch INT NOT NULL
    )");
    echo "Created migrations table.\n";
}

// Check which migrations are already recorded
$stmt = $pdo->query("SELECT migration FROM migrations");
$recorded = $stmt->fetchAll(PDO::FETCH_COLUMN);

$migrations = [
    '2024_01_01_000001_create_users_table',
    '2024_01_01_000002_create_brands_table',
    '2024_01_01_000003_create_categories_table',
    '2024_01_01_000004_create_products_table',
    '2024_01_01_000005_create_orders_table',
    '2024_01_01_000006_create_order_items_table',
];

$insert = $pdo->prepare("INSERT INTO migrations (migration, batch) VALUES (?, 1)");
foreach ($migrations as $m) {
    if (!in_array($m, $recorded)) {
        $insert->execute([$m]);
    }
}
echo "Migration records synced.\n";

// Create users table if it doesn't exist
$hasUsers = $pdo->query("SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'users')")->fetchColumn();
if (!$hasUsers) {
    $pdo->exec("CREATE TABLE users (
        id UUID PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) DEFAULT 'admin',
        remember_token VARCHAR(100),
        created_at TIMESTAMP NULL,
        updated_at TIMESTAMP NULL
    )");
    echo "Created users table.\n";
} else {
    // Ensure role column exists (may be missing from older setup)
    $hasRole = $pdo->query("SELECT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'role')")->fetchColumn();
    if (!$hasRole) {
        $pdo->exec("ALTER TABLE users ADD COLUMN role VARCHAR(255) DEFAULT 'admin'");
        echo "Added role column to users table.\n";
    } else {
        echo "Users table already exists.\n";
    }
}

echo "Setup complete.\n";
