<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Admin') - ShopCart Admin</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
            --ink: #111111;
            --parchment: #fafaf8;
            --paper: #ffffff;
            --ember: #e85d04;
            --ember-hover: #d45303;
            --slate: #6b7280;
            --sage: #059669;
            --crimson: #dc2626;
            --border: #e5e5e5;
            --sidebar-w: 240px;
            --font-display: 'Space Grotesk', system-ui, sans-serif;
            --font-body: 'DM Sans', system-ui, sans-serif;
        }

        html { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }

        body {
            font-family: var(--font-body);
            color: var(--ink);
            background: var(--parchment);
            min-height: 100vh;
        }

        /* Layout */
        .layout { display: flex; min-height: 100vh; }

        /* Sidebar */
        .sidebar {
            width: var(--sidebar-w);
            background: var(--ink);
            color: var(--paper);
            display: flex;
            flex-direction: column;
            position: fixed;
            top: 0;
            left: 0;
            bottom: 0;
            z-index: 40;
        }

        .sidebar-brand {
            padding: 1.25rem 1.25rem 1rem;
            border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .sidebar-brand a {
            font-family: var(--font-display);
            font-size: 1.125rem;
            font-weight: 700;
            color: var(--paper);
            text-decoration: none;
            letter-spacing: -0.02em;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .sidebar-brand a span { color: var(--ember); }

        .sidebar-nav {
            flex: 1;
            padding: 0.75rem 0;
            overflow-y: auto;
        }

        .sidebar-link {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.625rem 1.25rem;
            font-size: 0.875rem;
            font-weight: 500;
            color: rgba(255,255,255,0.6);
            text-decoration: none;
            transition: color 0.15s ease, background 0.15s ease;
            border-left: 3px solid transparent;
        }

        .sidebar-link:hover {
            color: var(--paper);
            background: rgba(255,255,255,0.05);
        }

        .sidebar-link.active {
            color: var(--paper);
            background: rgba(232, 93, 4, 0.12);
            border-left-color: var(--ember);
        }

        .sidebar-link i {
            width: 1.25rem;
            text-align: center;
            font-size: 0.9375rem;
            opacity: 0.8;
        }

        .sidebar-link.active i { opacity: 1; }

        .sidebar-section {
            padding: 1rem 1.25rem 0.375rem;
            font-size: 0.6875rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: rgba(255,255,255,0.3);
        }

        .sidebar-footer {
            padding: 1rem 1.25rem;
            border-top: 1px solid rgba(255,255,255,0.08);
        }

        .sidebar-user {
            display: flex;
            align-items: center;
            gap: 0.625rem;
        }

        .sidebar-avatar {
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            background: rgba(232, 93, 4, 0.2);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: var(--font-display);
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--ember);
        }

        .sidebar-user-info {
            flex: 1;
            min-width: 0;
        }

        .sidebar-user-name {
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--paper);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .sidebar-user-role {
            font-size: 0.6875rem;
            color: rgba(255,255,255,0.4);
        }

        .sidebar-logout {
            background: none;
            border: none;
            color: rgba(255,255,255,0.4);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: 4px;
            transition: color 0.15s ease;
        }

        .sidebar-logout:hover { color: var(--crimson); }

        /* Main */
        .main {
            flex: 1;
            margin-left: var(--sidebar-w);
            min-height: 100vh;
        }

        .main-header {
            background: var(--paper);
            border-bottom: 1px solid var(--border);
            padding: 1rem 2rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            position: sticky;
            top: 0;
            z-index: 30;
        }

        .main-title {
            font-family: var(--font-display);
            font-size: 1.25rem;
            font-weight: 600;
            color: var(--ink);
            letter-spacing: -0.01em;
        }

        .main-content {
            padding: 2rem;
        }

        /* Flash Messages */
        .flash-success {
            background: #f0fdf4;
            border: 1px solid #bbf7d0;
            color: #166534;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .flash-success::before {
            content: '✓';
            font-weight: 700;
        }

        .flash-errors {
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #991b1b;
            padding: 0.75rem 1rem;
            border-radius: 8px;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
        }

        .flash-errors ul {
            list-style: none;
            padding: 0;
        }

        .flash-errors li::before {
            content: '• ';
            font-weight: 700;
        }

        /* Cards */
        .card {
            background: var(--paper);
            border: 1px solid var(--border);
            border-radius: 12px;
            overflow: hidden;
        }

        .card-header {
            padding: 1rem 1.25rem;
            border-bottom: 1px solid var(--border);
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        .card-title {
            font-family: var(--font-display);
            font-size: 0.9375rem;
            font-weight: 600;
            color: var(--ink);
        }

        .card-body { padding: 1.25rem; }

        /* Tables */
        .table-wrap { overflow-x: auto; }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        thead th {
            text-align: left;
            padding: 0.75rem 1.25rem;
            font-size: 0.75rem;
            font-weight: 600;
            color: var(--slate);
            text-transform: uppercase;
            letter-spacing: 0.05em;
            border-bottom: 1px solid var(--border);
            background: var(--parchment);
        }

        tbody td {
            padding: 0.875rem 1.25rem;
            font-size: 0.875rem;
            border-bottom: 1px solid var(--border);
            color: var(--ink);
        }

        tbody tr:last-child td { border-bottom: none; }

        tbody tr:hover { background: rgba(250, 250, 248, 0.5); }

        /* Badges */
        .badge {
            display: inline-flex;
            align-items: center;
            padding: 0.25rem 0.625rem;
            font-size: 0.75rem;
            font-weight: 600;
            border-radius: 100px;
            letter-spacing: 0.01em;
        }

        .badge-success { background: #f0fdf4; color: #166534; }
        .badge-warning { background: #fffbeb; color: #92400e; }
        .badge-danger { background: #fef2f2; color: #991b1b; }
        .badge-info { background: #eff6ff; color: #1e40af; }
        .badge-primary { background: #fef3c7; color: #92400e; }
        .badge-secondary { background: #f3f4f6; color: #374151; }

        .badge-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            margin-right: 0.375rem;
        }

        .badge-success .badge-dot { background: var(--sage); }
        .badge-warning .badge-dot { background: #f59e0b; }
        .badge-danger .badge-dot { background: var(--crimson); }
        .badge-info .badge-dot { background: #3b82f6; }
        .badge-primary .badge-dot { background: var(--ember); }

        /* Buttons */
        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem 1rem;
            font-family: var(--font-body);
            font-size: 0.875rem;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            text-decoration: none;
            transition: background 0.15s ease, transform 0.1s ease;
            white-space: nowrap;
        }

        .btn:active { transform: scale(0.97); }

        .btn-ember {
            background: var(--ember);
            color: var(--paper);
        }

        .btn-ember:hover { background: var(--ember-hover); }

        .btn-outline {
            background: var(--paper);
            color: var(--ink);
            border: 1px solid var(--border);
        }

        .btn-outline:hover { background: var(--parchment); }

        .btn-ghost {
            background: transparent;
            color: var(--slate);
            padding: 0.375rem;
        }

        .btn-ghost:hover { color: var(--ink); background: rgba(0,0,0,0.04); }

        .btn-danger-ghost {
            background: transparent;
            color: var(--crimson);
            padding: 0.375rem;
        }

        .btn-danger-ghost:hover { background: #fef2f2; }

        .btn-sm {
            padding: 0.375rem 0.75rem;
            font-size: 0.8125rem;
        }

        /* Forms */
        .form-group { margin-bottom: 1.25rem; }

        .form-label {
            display: block;
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--ink);
            margin-bottom: 0.375rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
            width: 100%;
            padding: 0.5rem 0.75rem;
            font-family: var(--font-body);
            font-size: 0.875rem;
            color: var(--ink);
            background: var(--paper);
            border: 1px solid var(--border);
            border-radius: 8px;
            transition: border-color 0.15s ease;
            outline: none;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
            border-color: var(--ember);
            box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.08);
        }

        .form-textarea { resize: vertical; min-height: 80px; }

        .form-error {
            font-size: 0.8125rem;
            color: var(--crimson);
            margin-top: 0.25rem;
        }

        .form-check {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .form-check input[type="checkbox"] {
            width: 1rem;
            height: 1rem;
            accent-color: var(--ember);
        }

        /* Pagination */
        .pagination {
            display: flex;
            gap: 0.25rem;
            margin-top: 1.5rem;
        }

        .pagination a,
        .pagination span {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            min-width: 2rem;
            height: 2rem;
            padding: 0 0.5rem;
            font-size: 0.8125rem;
            font-weight: 500;
            border-radius: 6px;
            text-decoration: none;
            transition: background 0.15s ease;
        }

        .pagination a {
            color: var(--ink);
            border: 1px solid var(--border);
            background: var(--paper);
        }

        .pagination a:hover { background: var(--parchment); }

        .pagination .active {
            background: var(--ink);
            color: var(--paper);
            border: 1px solid var(--ink);
        }

        .pagination .disabled {
            color: rgba(0,0,0,0.2);
            border: 1px solid var(--border);
        }

        /* Stats grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }

        .stat-card {
            background: var(--paper);
            border: 1px solid var(--border);
            border-radius: 12px;
            padding: 1.25rem;
            display: flex;
            align-items: center;
            gap: 0.875rem;
        }

        .stat-icon {
            width: 2.5rem;
            height: 2.5rem;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            flex-shrink: 0;
        }

        .stat-icon.ember { background: rgba(232, 93, 4, 0.1); color: var(--ember); }
        .stat-icon.sage { background: rgba(5, 150, 105, 0.1); color: var(--sage); }
        .stat-icon.amber { background: rgba(245, 158, 11, 0.1); color: #d97706; }
        .stat-icon.crimson { background: rgba(220, 38, 38, 0.1); color: var(--crimson); }
        .stat-icon.blue { background: rgba(59, 130, 246, 0.1); color: #2563eb; }
        .stat-icon.purple { background: rgba(139, 92, 246, 0.1); color: #7c3aed; }

        .stat-value {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--ink);
            letter-spacing: -0.02em;
            line-height: 1;
        }

        .stat-label {
            font-size: 0.8125rem;
            color: var(--slate);
            margin-top: 0.125rem;
        }

        /* Action bar */
        .action-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
        }

        .action-bar-form {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }

        /* Filter inputs */
        .filter-input {
            padding: 0.5rem 0.75rem;
            font-family: var(--font-body);
            font-size: 0.875rem;
            border: 1px solid var(--border);
            border-radius: 8px;
            background: var(--paper);
            color: var(--ink);
            outline: none;
            transition: border-color 0.15s ease;
        }

        .filter-input:focus {
            border-color: var(--ember);
            box-shadow: 0 0 0 3px rgba(232, 93, 4, 0.08);
        }

        /* Inline actions */
        .inline-actions {
            display: flex;
            align-items: center;
            gap: 0.25rem;
        }

        /* Empty state */
        .empty-state {
            text-align: center;
            padding: 3rem 1rem;
            color: var(--slate);
        }

        .empty-state i {
            font-size: 2rem;
            margin-bottom: 0.75rem;
            opacity: 0.3;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .sidebar { display: none; }
            .main { margin-left: 0; }
            .main-content { padding: 1rem; }
            .action-bar { flex-direction: column; align-items: stretch; }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after { transition: none !important; }
        }
    </style>
</head>
<body>
    <div class="layout">
        <!-- Sidebar -->
        <aside class="sidebar">
            <div class="sidebar-brand">
                <a href="{{ route('dashboard') }}">Shop<span>Cart</span></a>
            </div>

            <nav class="sidebar-nav">
                <div class="sidebar-section">Principal</div>
                <a href="{{ route('dashboard') }}" class="sidebar-link {{ request()->routeIs('dashboard') ? 'active' : '' }}">
                    <i class="fas fa-chart-pie"></i> Dashboard
                </a>

                <div class="sidebar-section">Catálogo</div>
                <a href="{{ route('products.index') }}" class="sidebar-link {{ request()->routeIs('products.*') ? 'active' : '' }}">
                    <i class="fas fa-box"></i> Productos
                </a>
                <a href="{{ route('categories.index') }}" class="sidebar-link {{ request()->routeIs('categories.*') ? 'active' : '' }}">
                    <i class="fas fa-tags"></i> Categorías
                </a>
                <a href="{{ route('brands.index') }}" class="sidebar-link {{ request()->routeIs('brands.*') ? 'active' : '' }}">
                    <i class="fas fa-building"></i> Marcas
                </a>

                <div class="sidebar-section">Ventas</div>
                <a href="{{ route('orders.index') }}" class="sidebar-link {{ request()->routeIs('orders.*') ? 'active' : '' }}">
                    <i class="fas fa-shopping-bag"></i> Órdenes
                </a>
            </nav>

            <div class="sidebar-footer">
                <div class="sidebar-user">
                    <div class="sidebar-avatar">{{ substr(Auth::user()->name ?? 'A', 0, 1) }}</div>
                    <div class="sidebar-user-info">
                        <div class="sidebar-user-name">{{ Auth::user()->name ?? 'Admin' }}</div>
                        <div class="sidebar-user-role">Administrador</div>
                    </div>
                    <form action="{{ route('logout') }}" method="POST">
                        @csrf
                        <button type="submit" class="sidebar-logout" title="Cerrar sesión">
                            <i class="fas fa-sign-out-alt"></i>
                        </button>
                    </form>
                </div>
            </div>
        </aside>

        <!-- Main Content -->
        <main class="main">
            <header class="main-header">
                <h1 class="main-title">@yield('header', 'Dashboard')</h1>
                @yield('header-actions')
            </header>

            <div class="main-content">
                @if(session('success'))
                    <div class="flash-success">{{ session('success') }}</div>
                @endif

                @if($errors->any())
                    <div class="flash-errors">
                        <ul>
                            @foreach($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif

                @yield('content')
            </div>
        </main>
    </div>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
</body>
</html>
