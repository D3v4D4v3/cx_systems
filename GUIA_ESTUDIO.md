# Guía de Estudio y Preparación para Defensa del Proyecto: CX Systems

Esta guía está diseñada para que puedas explicar y defender cada línea de código, arquitectura y decisión técnica del proyecto e-commerce "CX Systems", demostrando dominio absoluto de la plataforma.

---

## 🏗️ 1. Arquitectura General del Proyecto y Estructura (Contexto del README)

El proyecto utiliza una arquitectura separada conocida como **SPA (Single Page Application) + API RESTful**.
- **Backend (Laravel 10):** Actúa pura y exclusivamente como una API. No renderiza vistas HTML con Blade (excepto el index.html de React). Se encarga de la lógica de negocio, reglas de validación, base de datos, y autenticación.
- **Frontend (React 18 + Vite):** Es la interfaz de usuario. Consume los datos de la API mediante peticiones HTTP asíncronas usando `axios`.
- **Integración:** Cuando compilamos el frontend (`npm run build`), Vite genera archivos estáticos (HTML, JS, CSS) en la carpeta `public/frontend` de Laravel. El archivo `routes/web.php` de Laravel atrapa cualquier ruta que no sea de la API y sirve el archivo `index.html`. A partir de ahí, React Router se encarga del enrutamiento de las URLs en el navegador sin recargar la página.

**Por qué lo hicimos así:**
Para separar responsabilidades (Separation of Concerns). El backend solo sirve JSON, lo que permitiría el día de mañana conectar una app móvil (iOS/Android) a la misma API sin cambiar ni una línea de código en Laravel.

### Estructura de Directorios Clave
- `app/Http/Controllers/Api/`: Aquí vive la lógica de la API. Todo responde en formato JSON.
- `routes/api.php`: Define todos los endpoints y agrupa bajo el middleware `auth:sanctum` los que requieren estar logueado.
- `routes/web.php`: El archivo más simple del proyecto. Solo sirve el frontend compilado.
- `frontend-src/`: Todo nuestro código fuente de React.
- `public/frontend/`: El resultado de correr `npm run build` en React. Este es el código minificado y listo para producción.

---

## 🔒 2. Seguridad y Autenticación (Sanctum Stateless)

**¿Cómo sabemos quién es el usuario si no usamos Cookies/Sesiones de PHP?**
Utilizamos **Laravel Sanctum en modo API Tokens**.
1. **Login:** El usuario manda email y contraseña. El `AuthController` verifica en la base de datos usando `Hash::check()`.
2. **Generación:** Si es correcto, borramos los tokens viejos (para evitar basura limitando sesiones activas) y creamos uno nuevo con `$user->createToken('auth_token')->plainTextToken`.
3. **Almacenamiento (Frontend):** React recibe este token y lo guarda en el `localStorage`.
4. **Peticiones Autenticadas:** Usamos un "Interceptor" de Axios (`frontend-src/src/api/axios.js`). Cada vez que React hace una petición, este interceptor adjunta el token en los headers: `Authorization: Bearer <TOKEN>`.
5. **Stateless (Sin Estado):** El backend no guarda memoria de quién está logueado en la sesión de PHP. Cada petición que llega se valida leyendo el token del header.

---

## 🗄️ 3. Base de Datos y Eloquent ORM

**Decisión técnica importante: Eloquent y el precio histórico:**
¿Por qué duplicar el `unit_price` en `order_items` si ya está en `products`?
Porque el precio de un producto puede cambiar en el futuro. Si un teclado cuesta $100 hoy y el usuario lo compra, en su recibo debe decir $100 para siempre. Si mañana el vendedor sube el precio a $150 en la tabla `products`, las órdenes pasadas no deben verse afectadas.

---

## ⚙️ 4. Guía de Despliegue e Instalación Técnica

*(Nota: Esta información es vital para defender cómo poner el proyecto online, aunque no esté pública en el README de GitHub)*

Si un profesor te pregunta **"¿Cómo instalarías esto en un servidor real de producción (ej. DigitalOcean, AWS, Hostinger)?"**, esta es la respuesta paso a paso:

1. **Clonar e inicializar:** Se sube el código al servidor, se corre `composer install` para dependencias de PHP.
2. **Base de Datos:** Se crea una base de datos MySQL en el servidor y se actualiza el archivo `.env` configurando `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`. Además, se cambia `APP_ENV=production` y `APP_DEBUG=false` para que la app no muestre errores de código a los usuarios finales si algo falla.
3. **Migraciones:** Se corre `php artisan migrate --seed` para crear las tablas e insertar productos básicos y usuarios (admin/clientes).
4. **Compilación del Frontend:** Entramos a la carpeta `frontend-src`, corremos `npm install` y luego `npm run build`. Esto empaquetará todo React de forma optimizada en la carpeta `public/frontend`.
5. **Servidor Web:** Se configura el servidor (Apache o Nginx) para que su "Document Root" apunte a la subcarpeta `public/` de Laravel.
6. **Caché:** Finalmente, para que Laravel vuele de rápido, corremos `php artisan config:cache` y `php artisan route:cache`.

---

## ❓ 5. Guía de Preguntas de Defensa

A continuación, una batería extensa de preguntas que un sinodal o profesor estricto podría hacer para validar tu conocimiento:

### Sobre la Arquitectura y React
**1. Q: ¿Por qué usaste Vite y no Create React App (CRA)?**
**R:** Create React App está obsoleto (deprecated) y utiliza Webpack por debajo, lo que hace el arranque y la compilación muy lentos. Vite usa ES modules nativos en el navegador durante el desarrollo, lo que hace que el *Hot Module Replacement (HMR)* sea instantáneo sin importar qué tan grande sea el proyecto. Además, compila usando Rollup que es mucho más eficiente para librerías.

**2. Q: En la vista de Dashboard o Products, a veces el estado de la aplicación no se actualiza inmediatamente tras una acción. ¿Por qué pasa en React y cómo lo solucionaron?**
**R:** React funciona con "estado asíncrono". Llamar a `setProducts()` no cambia el valor en la siguiente línea de código, sino que agenda un render de React. Nosotros manejamos la fluidez usando funciones `async/await` en axios y haciendo un *re-fetch* manual (recargando la lista llamando a `fetchProducts()`) o actualizando el estado local inyectando el nuevo dato directamente en el array (optimistic UI update).

**3. Q: ¿Por qué usaste Context API (`AuthContext`, `CartContext`) en lugar de pasar las variables (props) de hijo a padre o usar Redux?**
**R:** Optamos por Context API porque el proyecto, aunque complejo, no tiene una cantidad masiva de estados que cambien cientos de veces por segundo. El carrito y la autenticación son "Estados Globales" pero estables. Redux habría añadido demasiado "boilerplate" (código repetitivo) innecesario. Y pasar props manualmente hubiese causado "Prop Drilling" (pasar variables por 5 capas de componentes hijos que ni siquiera las usan).

**4. Q: Veo que en `AuthContext.jsx` tienes unos `useCallback`. ¿Para qué sirven?**
**R:** Sirven para "memoizar" funciones. React re-crea las funciones en cada render si no las envolvemos. Al usar `useCallback` en `login`, `register`, y `logout`, aseguramos que las referencias de esas funciones en memoria sean siempre las mismas. Si le pasamos esas funciones a componentes hijos, evitamos que los hijos se re-rendericen inútilmente solo porque la función "parece" nueva.

### Sobre el Backend y Laravel
**5. Q: ¿Si entran por Postman y envían datos, cómo proteges que no inyecten código o rompan tu tabla?**
**R:** No uso `$request->all()` a ciegas. Utilizo Validaciones Tipadas de Laravel (`$validated = $request->validate([...])`). Esto actúa como un filtro estricto. Por ejemplo, en el registro de productos exijo `numeric`, `min:0`, y `image|mimes:jpeg,png` para evitar que suban un archivo malicioso `.exe` o `.php` disfrazado. Además Laravel protege contra SQL Injection automáticamente usando PHP PDO en su ORM Eloquent.

**6. Q: ¿Qué pasaría en tu sistema si dos clientes intentan comprar el último mouse (stock: 1) exactamente en el mismo milisegundo?**
**R:** Nada malo. Implementamos **Pessimistic Locking** (Bloqueo Pesimista). En `OrderController`, cuando iteramos el carrito, ejecutamos `$product = Product::lockForUpdate()->find(...)` dentro de un `DB::transaction()`. Esto le dice al motor de base de datos (InnoDB) que bloquee esa fila específica. Si la petición del Cliente 2 llega un milisegundo después, se queda en cola esperando a que termine el Cliente 1. Cuando el Cliente 1 termina, se descuenta el stock (quedando en 0), y cuando le toca al Cliente 2, la validación `hasStock()` fallará y se le regresará un mensaje amigable indicando que se agotó. La transacción hace **Rollback** de cualquier cambio a medias.

**7. Q: ¿Qué es Sanctum y por qué usar tokens físicos y no sesiones de toda la vida?**
**R:** Porque construimos una SPA que "habla" asíncronamente. Con sesiones de PHP tendríamos que lidiar con problemas de CORS complejos y enviar tokens CSRF en cada petición para que Laravel confíe en el navegador. Con Sanctum usamos API Tokens, que son cadenas de texto seguras enviadas en el "Header" (`Authorization: Bearer Token`). Esto hace al backend **totalmente Stateless** (sin estado). El servidor no guarda memoria RAM de quién está logueado, solo requiere verificar la validez matemática del token provisto en el Header.

**8. Q: ¿Por qué en tu archivo de rutas (`routes/web.php`) usas una expresión regular `^(?!api|storage).*$`?**
**R:** Es el sistema de enrutamiento "Fallback" perfecto para React. Como React Router necesita controlar las URLs en el navegador (ejemplo, ir a `/products/24` o `/dashboard`), si alguien recarga la página, el servidor (Apache) buscaría la carpeta `/products/24` que no existe y lanzaría un Error 404. Lo que hace nuestro `web.php` es decirle a Laravel: "Cualquier URL que el usuario visite en el navegador, ignórala y siempre entrégale el `index.html` de React, PERO excluye explícitamente las URLs que empiecen con `/api` (para que sigan funcionando los endpoints de datos) y `/storage` (para las imágenes públicas)".

**9. Q: Tuvieron un bug en la pantalla de pedidos donde salía `$NaN MXN`. ¿Cómo demostraron habilidad resolviéndolo?**
**R:** Fue un problema clásico de "Contrato de API". Nuestro frontend de React esperaba leer `total_amount` basado en una versión anterior (mock) de los datos, pero nuestra BD de MySQL procesaba la columna simplemente como `total`. Al solicitar el dato, llegaba como `undefined` al cliente, y al intentar pasarlo a texto o número usando funciones matemáticas (`Number().toFixed()`), JavaScript tronaba develando "Not a Number" (NaN). Lo resolvimos ajustando la propiedad dinámica en el `$fillable` del modelo `Order.php`, reestructurando los queries en el `OrderController`, y finalmente empaquetando todo de vuelta (`npm run build`).

**10. Q: Explicame cómo resolviste el almacenamiento local de las imágenes de los productos.**
**R:** Originalmente se iban a guardar basándonos en el nombre del archivo. Pero una mala práctica sería guardar `foto.png`. ¿Qué pasa si otro producto sube otra `foto.png`? La sobreescribe.
Utilizamos el Facade `Str::uuid()` de Laravel en el controlador `ProductController` para generar un hash criptográfico universalmente único como nombre de archivo. Verificamos su extensión (`ClientOriginalExtension`), lo movemos a la ruta `public/images/products` usando la función `move()`, y en la BD *únicamente* guardamos un string de texto plano con la ruta relativa del archivo. Esto aligera enormemente la base de datos comparado con guardarla en un campo tipo BLOB.

**11. Q: ¿Qué garantiza que un usuario cualquiera, sin ser administrador, no pueda borrar un producto de la tienda haciéndose pasar por otro a través de la API?**
**R:** Múltiples capas de defensa defensiva (Defense in Depth):
1. **Rutas protegidas:** La ruta `DELETE /api/products/{product}` está contenida en el bloque de middleware `auth:sanctum`. Nadie sin Token entra.
2. **Validación de Rol:** En el método `destroy()` del controlador de productos, la primera línea es un "Early Return". Validamos `$request->user()->isVendor()`. Si la base de datos dice que es cliente (role_id=2), lanzamos excepción HTTP 403 Forbidden.
3. **Validación de Propiedad (Ownership):** Además verificamos que `$product->vendor_id === $request->user()->id`. Ningún vendedor puede borrar el producto de otro vendedor.
4. **Validación en Cliente:** La interfaz gráfica (UI) oculta dinámicamente el botón de borrar y la pestaña de Dashboard entera dependiendo del Contexto global de Auth.
