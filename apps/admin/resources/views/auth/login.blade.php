<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Iniciar Sesión - ShopCart Admin</title>
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
            --ember-glow: rgba(232, 93, 4, 0.4);
            --slate: #6b7280;
            --border: #e5e5e5;
            --font-display: 'Space Grotesk', system-ui, sans-serif;
            --font-body: 'DM Sans', system-ui, sans-serif;
        }

        html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }

        body {
            font-family: var(--font-body);
            color: var(--ink);
            background: var(--parchment);
            min-height: 100vh;
            overflow: hidden;
        }

        .login-wrapper {
            display: grid;
            grid-template-columns: 1fr 1fr;
            min-height: 100vh;
        }

        /* Left Panel - Visual Showcase */
        .login-visual {
            position: relative;
            background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 50%, #2d2d2d 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }

        .visual-content {
            position: relative;
            z-index: 10;
            text-align: center;
            padding: 3rem;
            max-width: 480px;
        }

        .visual-brand {
            font-family: var(--font-display);
            font-size: 3.5rem;
            font-weight: 700;
            color: #fff;
            letter-spacing: -0.03em;
            margin-bottom: 1rem;
            opacity: 0;
            transform: translateY(30px);
            animation: fadeInUp 0.8s ease forwards 0.2s;
        }

        .visual-brand span { color: var(--ember); }

        .visual-tagline {
            font-size: 1.125rem;
            color: rgba(255,255,255,0.6);
            line-height: 1.6;
            margin-bottom: 2rem;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.8s ease forwards 0.4s;
        }

        .visual-features {
            display: flex;
            gap: 2rem;
            justify-content: center;
            opacity: 0;
            transform: translateY(20px);
            animation: fadeInUp 0.8s ease forwards 0.6s;
        }

        .visual-feature {
            text-align: center;
        }

        .visual-feature-icon {
            width: 48px;
            height: 48px;
            background: rgba(232, 93, 4, 0.15);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 0.75rem;
            font-size: 1.25rem;
        }

        .visual-feature-text {
            font-size: 0.8125rem;
            color: rgba(255,255,255,0.7);
            font-weight: 500;
        }

        /* Floating Shapes */
        .shapes-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
            pointer-events: none;
        }

        .shape {
            position: absolute;
            border-radius: 50%;
            opacity: 0.15;
        }

        .shape-1 {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, var(--ember) 0%, transparent 70%);
            top: -100px;
            left: -100px;
            animation: float 8s ease-in-out infinite;
        }

        .shape-2 {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, #f59e0b 0%, transparent 70%);
            bottom: -50px;
            right: -50px;
            animation: float 10s ease-in-out infinite reverse;
        }

        .shape-3 {
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, #ec4899 0%, transparent 70%);
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation: float 12s ease-in-out infinite;
        }

        .shape-ring {
            position: absolute;
            border: 2px solid rgba(232, 93, 4, 0.2);
            border-radius: 50%;
            animation: rotate 20s linear infinite;
        }

        .shape-ring-1 {
            width: 500px;
            height: 500px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }

        .shape-ring-2 {
            width: 600px;
            height: 600px;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            animation-direction: reverse;
            animation-duration: 25s;
        }

        .grid-pattern {
            position: absolute;
            inset: 0;
            background-image: 
                linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            opacity: 0.5;
        }

        /* Right Panel - Login Form */
        .login-form-panel {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            background: var(--parchment);
            position: relative;
        }

        .login-form-panel::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100px;
            height: 100%;
            background: linear-gradient(90deg, rgba(232, 93, 4, 0.03) 0%, transparent 100%);
            pointer-events: none;
        }

        .login-container {
            width: 100%;
            max-width: 400px;
            opacity: 0;
            transform: translateX(30px);
            animation: slideInRight 0.6s ease forwards 0.3s;
        }

        .login-header {
            text-align: center;
            margin-bottom: 2.5rem;
        }

        .login-logo {
            font-family: var(--font-display);
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--ink);
            letter-spacing: -0.02em;
            margin-bottom: 0.75rem;
        }

        .login-logo span { color: var(--ember); }

        .login-subtitle {
            font-size: 0.9375rem;
            color: var(--slate);
            font-weight: 400;
        }

        .login-card {
            background: var(--paper);
            border: 1px solid var(--border);
            border-radius: 16px;
            padding: 2rem;
            box-shadow: 
                0 4px 6px -1px rgba(0, 0, 0, 0.05),
                0 10px 15px -3px rgba(0, 0, 0, 0.05),
                0 20px 25px -5px rgba(0, 0, 0, 0.03);
            position: relative;
            overflow: hidden;
        }

        .login-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, var(--ember), #f59e0b, var(--ember));
            background-size: 200% 100%;
            animation: shimmer 3s ease infinite;
        }

        .form-group {
            margin-bottom: 1.5rem;
            opacity: 0;
            transform: translateY(15px);
        }

        .form-group:nth-child(1) { animation: fadeInUp 0.5s ease forwards 0.5s; }
        .form-group:nth-child(2) { animation: fadeInUp 0.5s ease forwards 0.6s; }
        .form-group:nth-child(3) { animation: fadeInUp 0.5s ease forwards 0.7s; }

        .form-label {
            display: block;
            font-size: 0.8125rem;
            font-weight: 600;
            color: var(--ink);
            margin-bottom: 0.5rem;
            letter-spacing: 0.01em;
        }

        .input-wrapper {
            position: relative;
        }

        .input-icon {
            position: absolute;
            left: 1rem;
            top: 50%;
            transform: translateY(-50%);
            color: var(--slate);
            font-size: 1rem;
            transition: color 0.2s ease;
            pointer-events: none;
        }

        .form-input {
            width: 100%;
            padding: 0.875rem 1rem 0.875rem 2.75rem;
            font-family: var(--font-body);
            font-size: 0.9375rem;
            color: var(--ink);
            background: var(--parchment);
            border: 2px solid transparent;
            border-radius: 10px;
            transition: all 0.2s ease;
            outline: none;
        }

        .form-input:focus {
            background: var(--paper);
            border-color: var(--ember);
            box-shadow: 0 0 0 4px rgba(232, 93, 4, 0.1);
        }

        .form-input:focus + .input-icon,
        .form-input:focus ~ .input-icon {
            color: var(--ember);
        }

        .form-input::placeholder { color: #9ca3af; }

        .form-check {
            display: flex;
            align-items: center;
            gap: 0.625rem;
            opacity: 0;
            animation: fadeInUp 0.5s ease forwards 0.7s;
        }

        .checkbox-custom {
            position: relative;
            width: 1.125rem;
            height: 1.125rem;
        }

        .checkbox-custom input {
            position: absolute;
            opacity: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            z-index: 1;
        }

        .checkbox-mark {
            position: absolute;
            inset: 0;
            background: var(--paper);
            border: 2px solid var(--border);
            border-radius: 4px;
            transition: all 0.2s ease;
        }

        .checkbox-custom input:checked + .checkbox-mark {
            background: var(--ember);
            border-color: var(--ember);
        }

        .checkbox-mark::after {
            content: '';
            position: absolute;
            left: 5px;
            top: 2px;
            width: 5px;
            height: 8px;
            border: solid white;
            border-width: 0 2px 2px 0;
            transform: rotate(45deg) scale(0);
            transition: transform 0.2s ease;
        }

        .checkbox-custom input:checked + .checkbox-mark::after {
            transform: rotate(45deg) scale(1);
        }

        .form-check label {
            font-size: 0.875rem;
            color: var(--slate);
            cursor: pointer;
        }

        .form-error {
            font-size: 0.8125rem;
            color: #dc2626;
            margin-top: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.375rem;
        }

        .form-error::before {
            content: '!';
            width: 1rem;
            height: 1rem;
            background: #dc2626;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.625rem;
            font-weight: 700;
            flex-shrink: 0;
        }

        .btn-primary {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            width: 100%;
            padding: 1rem;
            font-family: var(--font-display);
            font-size: 0.9375rem;
            font-weight: 600;
            color: var(--paper);
            background: linear-gradient(135deg, var(--ember) 0%, #d45303 100%);
            border: none;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            letter-spacing: 0.01em;
            position: relative;
            overflow: hidden;
            opacity: 0;
            animation: fadeInUp 0.5s ease forwards 0.8s;
        }

        .btn-primary::before {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
            transform: translateX(-100%);
            transition: transform 0.5s ease;
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgba(232, 93, 4, 0.4);
        }

        .btn-primary:hover::before {
            transform: translateX(100%);
        }

        .btn-primary:active {
            transform: translateY(0) scale(0.98);
        }

        .btn-icon {
            transition: transform 0.3s ease;
        }

        .btn-primary:hover .btn-icon {
            transform: translateX(4px);
        }

        .global-error {
            background: #fef2f2;
            border: 1px solid #fecaca;
            color: #991b1b;
            padding: 0.875rem 1rem;
            border-radius: 10px;
            font-size: 0.875rem;
            margin-bottom: 1.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            opacity: 0;
            animation: shake 0.5s ease forwards;
        }

        .global-error::before {
            content: '⚠';
            font-size: 1rem;
        }

        .login-footer {
            text-align: center;
            margin-top: 2rem;
            opacity: 0;
            animation: fadeInUp 0.5s ease forwards 0.9s;
        }

        .login-footer p {
            font-size: 0.8125rem;
            color: var(--slate);
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes float {
            0%, 100% { transform: translateY(0) scale(1); }
            50% { transform: translateY(-30px) scale(1.05); }
        }

        @keyframes rotate {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
        }

        @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
        }

        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20% { transform: translateX(-5px); }
            40% { transform: translateX(5px); }
            60% { transform: translateX(-5px); }
            80% { transform: translateX(5px); }
        }

        /* Responsive */
        @media (max-width: 1024px) {
            .login-wrapper {
                grid-template-columns: 1fr;
            }

            .login-visual {
                display: none;
            }

            .login-form-panel {
                padding: 1.5rem;
            }
        }

        @media (max-width: 480px) {
            .login-container {
                max-width: 100%;
            }

            .login-card {
                padding: 1.5rem;
            }
        }

        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    </style>
</head>
<body>
    <div class="login-wrapper">
        <!-- Left Panel - Visual Showcase -->
        <div class="login-visual">
            <div class="grid-pattern"></div>
            <div class="shapes-container">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
                <div class="shape-ring shape-ring-1"></div>
                <div class="shape-ring shape-ring-2"></div>
            </div>

            <div class="visual-content">
                <h1 class="visual-brand">Shop<span>Cart</span></h1>
                <p class="visual-tagline">
                    Gestiona tu tienda de manera inteligente. Control total de productos, pedidos y clientes en un solo lugar.
                </p>

                <div class="visual-features">
                    <div class="visual-feature">
                        <div class="visual-feature-icon">📦</div>
                        <div class="visual-feature-text">Productos</div>
                    </div>
                    <div class="visual-feature">
                        <div class="visual-feature-icon">🛒</div>
                        <div class="visual-feature-text">Pedidos</div>
                    </div>
                    <div class="visual-feature">
                        <div class="visual-feature-icon">📊</div>
                        <div class="visual-feature-text">Analytics</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right Panel - Login Form -->
        <div class="login-form-panel">
            <div class="login-container">
                <div class="login-header">
                    <div class="login-logo">Shop<span>Cart</span></div>
                    <div class="login-subtitle">Bienvenido de vuelta</div>
                </div>

                <div class="login-card">
                    @if($errors->has('email') && !old('email'))
                        <div class="global-error">
                            {{ $errors->first('email') }}
                        </div>
                    @endif

                    <form method="POST" action="{{ route('login') }}">
                        @csrf

                        <div class="form-group">
                            <label class="form-label" for="email">Correo electrónico</label>
                            <div class="input-wrapper">
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value="{{ old('email') }}"
                                    class="form-input"
                                    placeholder="admin@shopcart.local"
                                    required
                                    autofocus
                                >
                                <span class="input-icon">✉</span>
                            </div>
                            @error('email')
                                <div class="form-error">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <label class="form-label" for="password">Contraseña</label>
                            <div class="input-wrapper">
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    class="form-input"
                                    placeholder="••••••••"
                                    required
                                >
                                <span class="input-icon">🔒</span>
                            </div>
                            @error('password')
                                <div class="form-error">{{ $message }}</div>
                            @enderror
                        </div>

                        <div class="form-group">
                            <div class="form-check">
                                <div class="checkbox-custom">
                                    <input type="checkbox" id="remember" name="remember" {{ old('remember') ? 'checked' : '' }}>
                                    <div class="checkbox-mark"></div>
                                </div>
                                <label for="remember">Recordarme en este dispositivo</label>
                            </div>
                        </div>

                        <button type="submit" class="btn-primary">
                            Iniciar Sesión
                            <span class="btn-icon">→</span>
                        </button>
                    </form>
                </div>

                <div class="login-footer">
                    <p>¿Necesitas ayuda? Contacta al administrador</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>