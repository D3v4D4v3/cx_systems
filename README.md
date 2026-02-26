# CX Systems

Plataforma e-commerce de hardware gaming construida con **Laravel 10 + React 18**.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | Laravel 10, Sanctum, Eloquent ORM, MySQL |
| Frontend | React 18, React Router v6, Axios, Vite 5 |
| Estilo | Tailwind CSS (tema personalizado "hacker") |
| Auth | Laravel Sanctum (tokens de API) |

## Funcionalidades

- Registro y login con roles (vendedor / cliente)
- Catálogo de productos con búsqueda, filtros y ordenamiento
- Carrito de compras persistente
- Checkout con pasarela de pago simulada
- Gestión de órdenes para clientes y vendedores
- Dashboard de vendedor con estadísticas
- Páginas informativas: About, Contact, Terms, Privacy

## Estructura del proyecto

```
cx_systems/
├── app/Http/Controllers/Api/   # Controladores REST
├── routes/api.php              # Endpoints de la API
├── routes/web.php              # Fallback SPA
├── frontend-src/               # Código fuente React
├── public/frontend/            # Build de producción React
└── public/images/products/     # Imágenes de productos
```

Acceder en: [http://127.0.0.1:8000](http://127.0.0.1:8000)

## Usuarios de prueba

| Rol | Email | Contraseña |
|-----|-------|-----------|
| Vendedor | admin@cxsystems.com | password |
| Cliente | cliente@test.com | password |

## API Reference

### Auth
```
POST /api/register
POST /api/login
POST /api/logout         (autenticado)
GET  /api/me             (autenticado)
```

### Productos y categorías
```
GET    /api/products
GET    /api/products/{id}
POST   /api/products           (vendedor)
POST   /api/products/{id}      (vendedor, multipart/form-data)
DELETE /api/products/{id}      (vendedor)
GET    /api/categories
```

### Carrito y órdenes
```
GET    /api/cart               (autenticado)
POST   /api/cart               (autenticado)
PUT    /api/cart/{id}          (autenticado)
DELETE /api/cart/{id}          (autenticado)
POST   /api/orders             (autenticado)
GET    /api/orders             (autenticado)
GET    /api/orders/{id}        (autenticado)
GET    /api/orders/all/list    (vendedor)
PATCH  /api/orders/{id}/status (vendedor)
```

### Pagos
```
GET  /api/payment/methods
POST /api/payment/process      (autenticado)
GET  /api/payment/verify/{id}  (autenticado)
```

