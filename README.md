# AniVault

AniVault es una aplicación web desarrollada con Angular que permite explorar, buscar, visualizar y guardar animes favoritos usando datos obtenidos desde la API pública de Jikan, basada en información de MyAnimeList.

El proyecto fue creado como una práctica de desarrollo frontend, enfocada en el uso de componentes, servicios, rutas, consumo de API, manejo de estado local, diseño responsivo y experiencia de usuario.

## Descripción del proyecto

AniVault funciona como un catálogo de anime donde el usuario puede consultar información básica de diferentes series y películas, ver detalles individuales, filtrar resultados cargados, marcar favoritos y cambiar entre modo claro y modo oscuro.

La aplicación no utiliza backend propio. Toda la información de anime se obtiene desde una API externa y los datos de sesión/favoritos se almacenan localmente en el navegador mediante `localStorage`.

## Tecnologías utilizadas

* Angular
* TypeScript
* HTML
* CSS
* Angular Router
* Angular Forms
* Jikan API
* LocalStorage
* Git y GitHub

## API utilizada

El proyecto consume datos desde Jikan API:

```txt
https://api.jikan.moe/v4
```

Jikan es una API pública no oficial que permite consultar información relacionada con MyAnimeList.

Endpoints usados en el proyecto:

```txt
GET /anime?q={busqueda}
GET /top/anime
GET /anime/{id}/full
```

Nota: al tratarse de una API pública gratuita, en algunos momentos puede responder con errores temporales como `504 Gateway Time-out` o `429 Too Many Requests`. La aplicación maneja estos errores mostrando mensajes al usuario.

## Funcionalidades principales

### Inicio

La página principal muestra una lista de animes cargados desde la API. Desde esta sección el usuario puede explorar resultados, buscar animes y acceder al detalle de cada uno.

### Búsqueda de animes

El usuario puede buscar animes por nombre usando el buscador principal.

Ejemplos de búsqueda:

```txt
Naruto
Komi
One Piece
```

Cuando la búsqueda encuentra resultados, estos se muestran en tarjetas con imagen, título, puntuación, cantidad de episodios y tipo de anime.

### Filtros locales

La aplicación incluye filtros sencillos que trabajan sobre los animes cargados actualmente en pantalla.

Filtros disponibles:

* Formato
* Estado
* Género
* Ordenamiento

Estos filtros son locales, es decir, no hacen una nueva petición especial a la API. Filtran los resultados que ya fueron cargados previamente debido a las limitaciones de la API.

### Detalle de anime

Cada anime puede abrirse en una página de detalle donde se muestra información más completa, como:

* Imagen principal
* Título
* Título japonés
* Sinopsis
* Puntuación
* Episodios
* Tipo
* Estado
* Año
* Géneros

### Favoritos

El usuario puede guardar animes como favoritos presionando el botón de corazón en las tarjetas.

Para usar favoritos, el usuario debe iniciar sesión. Si intenta marcar un anime como favorito sin haber iniciado sesión, la aplicación muestra un modal indicando que necesita una cuenta.

Los favoritos se almacenan en `localStorage`.

### Login simulado

El proyecto incluye un inicio de sesión simulado con credenciales fijas. No existe conexión con backend ni base de datos.

Credenciales de prueba:

```txt
Correo: admin@anivault.com
Contraseña: admin123
```

Al iniciar sesión, se habilita el acceso a favoritos y cambia la barra de navegación.

### Cierre de sesión

Cuando el usuario ha iniciado sesión, la barra de navegación muestra la opción `Cerrar sesión`.

Al presionarla, aparece un modal de confirmación con dos opciones:

* Cancelar
* Cerrar sesión

Si el usuario confirma, la sesión se elimina del navegador y vuelve a la página de login.

### Barra de navegación dinámica

La barra de navegación cambia según el estado de sesión.

Sin sesión iniciada:

```txt
Inicio | Iniciar sesión
```

Con sesión iniciada:

```txt
Inicio | Favoritos | Cerrar sesión
```

La opción de favoritos se oculta si el usuario no ha iniciado sesión.

### Protección de rutas

La ruta de favoritos está protegida mediante un guard. Aunque el usuario escriba manualmente la ruta en el navegador, si no ha iniciado sesión será redirigido al login.

### Modo claro y modo oscuro

AniVault permite cambiar entre modo claro y modo oscuro usando un botón en la barra de navegación.

El tema seleccionado se guarda en `localStorage`, por lo que se mantiene aunque el usuario recargue la página.

### Página NotFound

La aplicación incluye una página personalizada para rutas inexistentes.

Cuando el usuario entra a una ruta que no existe, se muestra una pantalla de error 404 con una imagen y un botón para regresar al inicio.

### Diseño responsivo

La interfaz está adaptada para diferentes tamaños de pantalla:

* Escritorio
* Tablet
* Celular

En celular, la barra de navegación se reorganiza para mantener una visualización limpia.

## Estructura general del proyecto

Estructura principal usada en la aplicación:

```txt
src/
└── app/
    ├── core/
    │   ├── guards/
    │   │   └── auth.guard.ts
    │   └── services/
    │       ├── anime.service.ts
    │       ├── auth.service.ts
    │       ├── favorites.service.ts
    │       └── theme.service.ts
    │
    ├── features/
    │   └── pages/
    │       ├── home/
    │       │   ├── home.ts
    │       │   ├── home.html
    │       │   └── home.css
    │       │
    │       ├── favorites/
    │       │   ├── favorites.ts
    │       │   ├── favorites.html
    │       │   └── favorites.css
    │       │
    │       ├── anime-detail/
    │       │   ├── anime-detail.ts
    │       │   ├── anime-detail.html
    │       │   └── anime-detail.css
    │       │
    │       ├── login-page/
    │       │   ├── login-page.ts
    │       │   ├── login-page.html
    │       │   └── login-page.css
    │       │
    │       └── not-found/
    │           ├── not-found.ts
    │           ├── not-found.html
    │           └── not-found.css
    │
    ├── shared/
    │   └── components/
    │       ├── navbar/
    │       ├── anime-card/
    │       ├── loading/
    │       └── error-message/
    │
    ├── app.routes.ts
    ├── app.config.ts
    ├── app.html
    └── app.css
```

## Rutas principales

| Ruta         | Descripción               |
| ------------ | ------------------------- |
| `/`          | Página principal          |
| `/login`     | Inicio de sesión          |
| `/favoritos` | Lista de animes favoritos |
| `/anime/:id` | Detalle de un anime       |
| `**`         | Página NotFound           |

## Componentes principales

### Navbar

Componente encargado de la navegación principal.

Funciones:

* Mostrar enlaces disponibles
* Cambiar según el estado de sesión
* Mostrar botón de modo claro/oscuro
* Abrir modal de confirmación al cerrar sesión

### AnimeCard

Componente reutilizable para mostrar un anime en forma de tarjeta.

Muestra:

* Imagen
* Título
* Puntuación
* Episodios
* Tipo
* Botón de favorito

También controla el modal que aparece cuando un usuario no logeado intenta guardar favoritos.

### Loading

Componente reutilizable para mostrar estados de carga.

### ErrorMessage

Componente reutilizable para mostrar errores al usuario.

## Servicios principales

### AnimeService

Servicio encargado de comunicarse con Jikan API.

Funciones principales:

* Buscar anime
* Obtener animes populares o iniciales
* Obtener detalle de anime por ID
* Obtener animes de temporada, si se utiliza en la pantalla principal

### AuthService

Servicio encargado de manejar la sesión simulada.

Funciones principales:

* Iniciar sesión
* Cerrar sesión
* Verificar si el usuario está logeado
* Guardar sesión en `localStorage`

### FavoritesService

Servicio encargado de manejar favoritos.

Funciones principales:

* Agregar favorito
* Eliminar favorito
* Consultar favoritos
* Verificar si un anime ya está marcado como favorito

### ThemeService

Servicio encargado de manejar el modo claro y oscuro.

Funciones principales:

* Cambiar tema
* Guardar tema en `localStorage`
* Aplicar clase global para modo oscuro

## Instalación del proyecto

Clonar el repositorio:

```bash
git clone https://github.com/GeoDash123/anivault.git
```

Entrar al proyecto:

```bash
cd anivault
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
ng serve
```

Abrir en el navegador:

```txt
http://localhost:4200
```

## Limitaciones del proyecto

El proyecto tiene algunas limitaciones intencionales:

* No tiene backend propio.
* No tiene registro real de usuarios.
* El login es simulado.
* Los favoritos se guardan localmente en el navegador.
* Si se borra el almacenamiento del navegador, se pierde la sesión y los favoritos.
* Los filtros trabajan sobre los animes cargados en pantalla, no sobre toda la base de datos completa.
* La API externa puede fallar temporalmente.

## Estado del proyecto

Funcionalidades completadas:

* Consumo de API externa
* Página principal
* Búsqueda de anime
* Filtros locales
* Detalle de anime
* Favoritos
* Login simulado
* Protección de ruta de favoritos
* Navbar dinámica
* Modo claro y oscuro
* Modales personalizados
* Página 404
* Diseño responsivo

## Autores

Proyecto desarrollado por:

```txt
Arroyo Sepulveda Jesus Antonio
Alatorre López José Carlos
```

## Créditos

Datos de anime obtenidos mediante Jikan API.

```txt
https://api.jikan.moe/v4
```

Información basada en datos públicos de MyAnimeList mediante Jikan.

## Licencia

Este proyecto fue desarrollado con fines académicos.
