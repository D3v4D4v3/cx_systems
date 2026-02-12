# Integrante B: Módulo de Experiencia del Cliente y Pedidos

**Estado:** Pendiente de implementar (el código de este módulo se retiró para que lo implemente el Integrante B).

---

## Backend (API en Laravel) – por implementar

- **Carrito:** Endpoints GET `/api/cart`, POST `/api/cart`, PUT `/api/cart/{id}`, DELETE `/api/cart/{id}`. Guardar en BD (tablas `carts`), no en LocalStorage.
- **Pedidos:** POST `/api/orders` que convierta el carrito en pedido y reste el stock (Req. 7).
- **Historial:** Endpoints para que el cliente vea sus compras (ej. GET `/api/orders`, GET `/api/orders/{id}`).
- Crear migraciones para `carts`, `orders`, `order_items` y los modelos/controladores correspondientes.
- En `routes/api.php` hay un comentario `// TODO Integrante B:` donde se pueden registrar las rutas.

---

## Frontend (Vista del Cliente) – por implementar

- **Catálogo (Home):** En la lista de productos, botón “Agregar al carrito” en cada card.
- **Buscador y filtros (Req. 2):** La barra de búsqueda y el filtro por categoría ya existen en `/products`; asegurar que sigan funcionando con la API.
- **Vista de carrito y checkout:** Página para ver el carrito, total, modificar cantidades y botón “Simular Pago” (checkout que llame a POST `/api/orders`).
- **Historial:** Página para que el cliente vea sus pedidos pasados (y detalle de cada uno).
- Rutas sugeridas: `/cart`, `/checkout`, `/orders`, `/orders/:id`.
- Navbar: enlace al carrito (y opcionalmente contador) y “Mis Pedidos” para clientes.

---

## Lo que ya está en el proyecto 

- Auth (login, register, logout, Sanctum).
- Productos y categorías (API y vistas de listado/detalle).
- Búsqueda y filtro por categoría en la página de productos.
- Dashboard del vendedor (solo productos; sin pedidos).
- Modelo `Product` con método `hasStock($quantity)` útil para validar stock al crear pedidos.
