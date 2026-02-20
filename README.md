# CX Systems

Plataforma e-commerce de hardware gaming construida con **Laravel 10 + React 18 (Vite)**.

## Stack

- Backend: Laravel 10, Sanctum, Eloquent, MySQL/MariaDB
- Frontend: React 18, React Router, Axios, Vite, Tailwind
- Assets: imágenes en `public/images/products` y favicon en `public/favicon.ico`

## Funcionalidades

- Registro, login y logout con API tokens (Sanctum)
- Roles: vendedor y cliente
- Catálogo de productos con filtros y búsqueda
- Carrito de compras
- Checkout con pasarela de pago simulada
- Órdenes por cliente y gestión de órdenes para vendedor
- Páginas informativas: About, Terms, Privacy, Contact

## Estructura relevante

- `routes/api.php`: endpoints REST del sistema
- `routes/web.php`: entrada de Laravel + fallback SPA
- `frontend-src/`: aplicación React (fuente)
- `public/frontend/`: build de React para producción
- `public/images/products/`: imágenes de productos

## Requisitos

- PHP 8.1+
- Composer
- Node.js 18+
- MySQL 8+ o MariaDB compatible

## Instalación

1. Clonar repositorio.
2. Instalar dependencias backend:

```bash
composer install
```

3. Instalar dependencias frontend:

```bash
cd frontend-src
npm install
cd ..
```

4. Configurar entorno (`.env`) y generar clave:

```bash
php artisan key:generate
```

5. Ejecutar migraciones y seeders:

```bash
php artisan migrate --seed
```

6. Compilar frontend para Laravel:

```bash
cd frontend-src
npm run build
cd ..
```

7. Levantar backend:

```bash
php artisan serve
```

Abrir en navegador: `http://127.0.0.1:8000`

## Desarrollo frontend (opcional)

Para trabajar con hot reload:

```bash
cd frontend-src
npm run dev
```

## Usuarios de prueba (seeders)

- Vendedor
  - Email: `admin@cxsystems.com`
  - Password: `password`
- Cliente
  - Email: `cliente@test.com`
  - Password: `password`

## Endpoints principales

### Auth

- `POST /api/register`
- `POST /api/login`
- `POST /api/logout`
- `GET /api/me`

### Productos y categorías

- `GET /api/products`
- `GET /api/products/{product}`
- `POST /api/products` (vendedor)
- `POST /api/products/{product}` (vendedor, multipart/form-data)
- `DELETE /api/products/{product}` (vendedor)
- `GET /api/categories`

### Carrito y órdenes

- `GET /api/cart`
- `POST /api/cart`
- `PUT /api/cart/{cart}`
- `DELETE /api/cart/{cart}`
- `POST /api/orders`
- `GET /api/orders`
- `GET /api/orders/{order}`
- `GET /api/orders/all/list` (vendedor)
- `PATCH /api/orders/{order}/status` (vendedor)

### Pago (simulado)

- `POST /api/payment/process`
- `GET /api/payment/methods`
- `GET /api/payment/verify/{paymentId}`

## Notas para equipo

- El proyecto incluye `public/frontend` para servir el build con Laravel.
- El favicon de producción se sirve desde `public/frontend/favicon.ico`.
- Las imágenes de productos viven en `public/images/products`.
- Este repositorio está configurado para permitir subir `.env` (solicitado para trabajo en equipo local). Si se publica en remoto público, rotar credenciales antes.
