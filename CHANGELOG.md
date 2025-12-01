# Changelog

Todas las mejoras y cambios notables en el proyecto Watch2Do serán documentados en este archivo.

## [Sin Publicar] - 2025-11-29

### Añadido
-   **Modo Claro (Light Mode)**: Implementación completa de cambio de tema (Claro/Oscuro) usando `next-themes`.
    -   Switch de tema en Navbar.
    -   Adaptación de colores en todos los componentes principales (Navbar, Footer, Cards, Inputs).
    -   Logos dinámicos que cambian según el tema.

### Cambiado
-   **UI Refactoring**:
    -   **Checkout**: Estilización de mensajes de éxito y formularios de tarjeta de crédito para soportar ambos temas.
    -   **Footer**: Implementación de logo dinámico y mejoras en hover de enlaces.
    -   **Página de Inicio**: Actualización de estilos de tipografía en el Hero section.
    -   **Página de Contacto**: Adaptación de formularios y tarjetas al modo claro.
-   **Estilos Globales**: Actualización de `globals.css` para manejar variables CSS de temas.

## [Sin Publicar] - 2025-11-20

### Añadido
-   **Carrusel de Productos Recomendados**: Implementado en la página del carrito. Muestra sugerencias basadas en las categorías de los productos actuales en el carrito.
-   **API de Recomendaciones**: Nueva ruta `/api/recommendations` que consulta la base de datos con lógica de fallback a datos mock.
-   **Nuevo Flujo de Checkout**:
    -   Indicador de progreso visual animado entre pasos.
    -   Formulario de envío con validación.
    -   Selección de método de pago con iconos actualizados.
-   **Sistema de Diseño**: Estandarización de colores (Dorado `#D4AF37` y Negro) y tipografías (**Playfair Display** para títulos y **Inter** para cuerpo) en toda la aplicación.

### Cambiado
-   **Página del Carrito**: Reemplazada la sección de Newsletter por el carrusel de recomendaciones.
-   **Componente Newsletter**: Actualizados estilos para coincidir con el tema oscuro y dorado.
-   **Botones**: Estandarizados los botones de acción principal con el color dorado.
-   **Iconos de Pago**: Organizados y optimizados los assets de imágenes para métodos de pago.

### Corregido
-   Error de sintaxis en `app/cart/page.tsx` (etiqueta duplicada).
-   Problema de actualización del carrito al agregar productos desde recomendaciones.
-   Rutas de imágenes rotas en el selector de métodos de pago.
