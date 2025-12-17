# Watch2Do - E-commerce de Relojes

Aplicación de comercio electrónico moderna construida con Next.js 15, Tailwind CSS y Supabase.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- Cuenta en [Supabase](https://supabase.com/)
- Cuenta en [Vercel](https://vercel.com/) (opcional, para despliegue)
- Git

## Instalación

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd watch2do
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Configuración de Supabase:**

    a.  Crea un nuevo proyecto en Supabase.
    b.  Ve al Editor SQL en tu dashboard de Supabase.
    c.  Copia y pega el contenido del archivo `database/supabase_schema.sql` y ejecútalo. Esto creará:
        -   Tablas: `users`, `categories`, `watches`, `cart_items`, `orders`, `order_items`.
        -   Función RPC: `create_order` (para transacciones de checkout seguras).
        -   Datos iniciales (semilla) para categorías y relojes.

4.  **Variables de Entorno:**

    Crea un archivo `.env.local` en la raíz del proyecto (puedes usar `env_example` como referencia) y configura tus credenciales:

    ```env
    # Supabase Configuration
    NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
    SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

    # Autenticación (JWT)
    # Genera una clave segura (ej: openssl rand -base64 32)
    JWT_SECRET=tu_clave_secreta_super_segura
    ```

## Ejecutar la Aplicación

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

-   `/app`: Rutas y páginas de Next.js (App Router).
-   `/components`: Componentes reutilizables de UI (basados en Shadcn/ui).
-   `/lib`: Utilidades y cliente de Supabase (`supabase.ts`).
-   `/database`: Script SQL para el esquema de Supabase (`supabase_schema.sql`).

## Tecnologías

-   **Framework**: Next.js 15
-   **Estilos**: Tailwind CSS
-   **Base de Datos**: Supabase (PostgreSQL)
-   **Autenticación**: Personalizada (JWT & Bcrypt) + Supabase (Storage)
-   **Iconos**: Lucide React

## Características Principales

### 🛍️ Experiencia de Compra
-   **Catálogo de Productos**: Visualización de relojes con filtrado por categorías usando consultas de Supabase.
-   **Carrito de Compras**: Gestión de estado global con `CartContext`. Persistencia en base de datos.
-   **Recomendaciones Inteligentes**: Carrusel de productos recomendados.
-   **Checkout Optimizado**: Proceso transaccional seguro utilizando RPC de PostgreSQL.

### 🎨 Sistema de Diseño (Light & Dark Mode)
-   **Temas**: Soporte completo para modo claro y oscuro.
-   **Paleta de Colores**: Premium Gold & Monochrome.

## API Endpoints

### Productos & Recomendaciones
-   `GET /api/products`: Obtiene el listado de productos.
-   `GET /api/products/[id]`: Obtiene detalles de un producto específico.
-   `GET /api/recommendations`: Obtiene productos recomendados.

### Carrito & Checkout
-   `GET /api/cart`: Obtiene los ítems del carrito actual.
-   `POST /api/cart`: Agrega un ítem al carrito.
-   `DELETE /api/cart`: Elimina un ítem o limpia el carrito.
-   `POST /api/checkout`: Procesa la orden de compra (Transaccional).

### Autenticación
-   `POST /api/auth/login`: Inicia sesión.
-   `POST /api/auth/register`: Registra usuario.
-   `GET /api/auth/me`: Obtiene perfil del usuario actual.

### Admin
-   `GET /api/admin/stats`: Estadísticas generales.
-   `GET /api/admin/users`: Gestión de usuarios.

## Despliegue en Vercel

1.  Sube tu repositorio a GitHub.
2.  Importa el proyecto en Vercel.
3.  En la configuración del proyecto en Vercel, agrega las mismas variables de entorno que definiste en `.env.local`.
4.  Despliega.


