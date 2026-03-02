# CX Systems

Plataforma e-commerce de hardware gaming construida con Laravel 10 (API) y React 18 (SPA).

## 1) Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Laravel 10, Sanctum, Eloquent ORM, MySQL |
| Frontend | React 18, React Router v6, Axios, Vite 5 |
| Estilo | Tailwind CSS (tema visual hacker) |
| Auth | Sanctum con Bearer Token (API stateless) |

## 2) Alcance funcional

- Registro e inicio de sesión por API
- Tokens de paso con caducidad
- Roles: vendedor y cliente
- Catálogo con filtros y búsqueda
- Carrito de compras
- Checkout con pasarela simulada (mock)
- Órdenes para cliente y panel de gestión para vendedor
- Dashboard del vendedor
- Páginas informativas (About, Contact, Terms, Privacy)

## 3) Arquitectura actual

El proyecto usa una arquitectura SPA + API:

- La SPA React vive en frontend-src
- El build se publica en public/frontend
- Laravel expone endpoints REST en /api/*
- routes/web.php solo sirve el fallback de la SPA

Estructura principal:

```
cx_systems/
├── app/Http/Controllers/Api/
├── app/Models/
├── database/migrations/
├── routes/api.php
├── routes/web.php
├── frontend-src/
├── public/frontend/
└── public/images/products/
```

## 4) Requisitos

- PHP 8.1+
- Composer 2+
- Node.js 18+
- MySQL 8+

## 5) Configuración local

1. Instalar dependencias backend

	composer install

2. Crear y configurar entorno

	cp .env.example .env

	Ajustar conexión a base de datos en .env

3. Clave de aplicación y migraciones

	php artisan key:generate
	php artisan migrate --seed

4. Instalar dependencias frontend

	npm --prefix frontend-src install

5. Ejecutar en desarrollo

	Terminal 1 (Laravel API + fallback SPA):
	php artisan serve

	Terminal 2 (frontend Vite):
	npm --prefix frontend-src run dev

Acceso local: http://127.0.0.1:8000

## 6) Build de producción

Generar assets del frontend:

npm --prefix frontend-src run build

Esto actualiza public/frontend con los archivos compilados.

## 7) Variables de entorno clave

Backend:

- APP_NAME
- APP_ENV
- APP_KEY
- APP_URL
- DB_CONNECTION
- DB_HOST
- DB_PORT
- DB_DATABASE
- DB_USERNAME
- DB_PASSWORD

No se requiere configuración de reset password ni de broadcasting para el alcance actual.

## 8) Usuarios de prueba

| Rol | Email | Password |
|-----|-------|----------|
| Vendedor | admin@cxsystems.com | password |
| Cliente | cliente@test.com | password |

## 9) Autenticación API

La API protegida usa encabezado Authorization con Bearer Token.

Ejemplo:

Authorization: Bearer TU_TOKEN
Accept: application/json

## 10) Documentación básica de API

### 10.1 Auth

POST /api/register

Body:

{
  "name": "Cliente Demo",
  "email": "cliente.demo@cxsystems.com",
  "password": "password123",
  "password_confirmation": "password123",
  "phone": "9999999999",
  "address": "Campeche, México"
}

POST /api/login

Body:

{
  "email": "cliente@test.com",
  "password": "password"
}

Respuesta exitosa:

{
  "message": "Login exitoso",
  "user": { "id": 2, "name": "Cliente Test", "role_id": 2 },
  "token": "1|..."
}

POST /api/logout (autenticado)
GET /api/me (autenticado)

### 10.2 Productos y categorías

GET /api/products

Query params opcionales:

- search (string)
- category_id (int)
- sort_by (created_at, price, name)
- sort_order (asc, desc)
- per_page (int)

GET /api/products/{id}
GET /api/categories

Rutas de vendedor:

- POST /api/products (multipart/form-data)
- POST /api/products/{id} (multipart/form-data)
- DELETE /api/products/{id}
- POST /api/categories
- PUT /api/categories/{id}
- DELETE /api/categories/{id}

### 10.3 Carrito

Todas autenticadas:

- GET /api/cart
- POST /api/cart
- PUT /api/cart/{id}
- DELETE /api/cart/{id}

### 10.4 Pagos (mock)

GET /api/payment/methods

POST /api/payment/process (autenticado)

Body:

{
  "amount": 3499.99,
  "card_number": "4532015112830366",
  "card_holder": "CLIENTE TEST",
  "expiry_date": "12/26",
  "cvv": "123"
}

Regla mock:

- Tarjeta terminación par: aprobado
- Tarjeta terminación impar: rechazado

GET /api/payment/verify/{paymentId} (autenticado)

### 10.5 Órdenes

Cliente autenticado:

- POST /api/orders
- GET /api/orders
- GET /api/orders/{id}

Vendedor autenticado:

- GET /api/orders/all/list
- PATCH /api/orders/{id}/status

Estados permitidos:

- pendiente
- procesando
- enviado
- entregado
- cancelado

## 11) Notas de operación

- El frontend fuente oficial está en frontend-src
- Los archivos en public/frontend son artefactos compilados
- Las imágenes de productos nuevas se guardan en public/images/products
