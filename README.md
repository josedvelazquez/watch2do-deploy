# Watch2Do - E-commerce de Relojes

Aplicación de comercio electrónico moderna construida con Next.js 15, Tailwind CSS y MySQL.

## Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior)
- [MySQL](https://www.mysql.com/) (v8.0 o superior)
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

3.  **Configuración de la Base de Datos:**

    a.  Accede a tu servidor MySQL y crea la base de datos:
        ```sql
        CREATE DATABASE watch2do;
        ```

    b.  Ejecuta los scripts SQL ubicados en la carpeta `database/` para crear las tablas necesarias. Puedes hacerlo desde la línea de comandos o usando una herramienta como Workbench/DBeaver. El orden recomendado es:

        1.  `database/init.sql` (Crea tablas base, categorías y productos iniciales)
        2.  `database/users.sql` (Crea tabla de usuarios)
        3.  `database/cart.sql` (Crea tabla de carrito)

        *Ejemplo por línea de comandos:*
        ```bash
        mysql -u tu_usuario -p watch2do < database/init.sql
        mysql -u tu_usuario -p watch2do < database/users.sql
        mysql -u tu_usuario -p watch2do < database/cart.sql
        ```

4.  **Variables de Entorno:**

    Crea un archivo `.env.local` en la raíz del proyecto y configura tus credenciales de base de datos y clave secreta para JWT:

    ```env
    # Base de Datos
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=tu_contraseña
    DB_NAME=watch2do

    # Autenticación (JWT)
    JWT_SECRET=tu_clave_secreta_super_segura
    ```

5.  **Poblar la Base de Datos (Opcional):**

    Si deseas reiniciar o cargar más datos de prueba (relojes), puedes ejecutar el script de "semilla":

    ```bash
    npm run seed
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
-   `/lib`: Utilidades y configuración de base de datos (`db.ts`).
-   `/database`: Scripts SQL para la estructura de la BD.
-   `/scripts`: Scripts de utilidad (seeding).

## Tecnologías

-   **Framework**: Next.js 15
-   **Estilos**: Tailwind CSS
-   **Base de Datos**: MySQL (con `mysql2`)
-   **Autenticación**: JWT (JSON Web Tokens) & Bcrypt
-   **Iconos**: Lucide React
