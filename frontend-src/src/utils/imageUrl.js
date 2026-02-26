/**
 * Resuelve la URL de imagen de un producto.
 * Soporta URLs absolutas (http/https), rutas /images/, /storage/ y rutas relativas del storage.
 *
 * @param {string|null} image - El valor del campo `image` del producto.
 * @returns {string|null} - La URL completa de la imagen o null si no hay imagen.
 */
export const getProductImageUrl = (image) => {
    if (!image) return null;
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    if (image.startsWith('/images/') || image.startsWith('/storage/')) return image;
    if (image.startsWith('images/')) return `/${image}`;
    return `/storage/${image}`;
};
