# 📸 Directorio de Imágenes de Productos

Este directorio almacena las imágenes de los productos de CX Systems.

## 🎯 Instrucciones

1. **Coloca tus imágenes aquí** (formatos: .jpg, .jpeg, .png, .webp)

2. **Nombres de archivo sugeridos:**
   ```
   mouse-logitech-g502.jpg
   teclado-razer-blackwidow.jpg
   audifonos-hyperx-cloud-ii.jpg
   rtx-4090.jpg
   intel-i9-13900k.jpg
   monitor-asus-rog-swift-pg279qm.jpg
   ... (ver lista completa en update_product_images.php)
   ```

3. **Especificaciones recomendadas:**
   - Resolución: 800x800px o 1000x1000px
   - Formato: JPG (mejor compresión) o PNG (transparencias)
   - Peso: Máximo 500KB por imagen
   - Fondo: Blanco o transparente preferiblemente

4. **Después de agregar las imágenes, ejecuta:**
   ```bash
   cd /Users/cesar/cx_systems
   php update_product_images.php
   ```

## 🌐 Recursos para Descargar Imágenes

- **Unsplash**: https://unsplash.com (gratis, alta calidad)
- **Pexels**: https://pexels.com (gratis, sin registro)
- **Pixabay**: https://pixabay.com (gratis, varias licencias)
- **Freepik**: https://freepik.com (requiere atribución)

## 🔍 Ejemplo de Búsqueda

Para encontrar imágenes relevantes, busca términos como:
- "gaming mouse logitech"
- "mechanical keyboard"
- "rtx 4090 graphics card"
- "gaming monitor ultrawide"
- "intel processor i9"
- "computer ram memory"

## ✅ Verificación

Después de actualizar las imágenes, verifica en:
- http://localhost:8000/products

Las imágenes deben aparecer en las cards de cada producto.

---

**Nota:** Este directorio está configurado para ser ignorado por Git (.gitignore) para no subir archivos pesados al repositorio. Asegúrate de hacer backup de tus imágenes.
