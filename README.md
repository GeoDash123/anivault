# AniVault

AniVault es una aplicación web desarrollada con Angular que permite explorar, buscar, consultar y guardar animes utilizando información obtenida desde la API pública de Jikan, basada en datos de MyAnimeList.

El proyecto fue desarrollado como una práctica de la materia Desarrollo de Software Frontend II. Su propósito es aplicar conceptos como componentes reutilizables, servicios, rutas, guards, consumo de API, tipado con TypeScript, almacenamiento local, diseño responsivo y uso del framework Tailwind CSS.

## Descripción del proyecto

AniVault funciona como un catálogo de anime en el que el usuario puede:

* Consultar animes populares.
* Buscar animes por título.
* Filtrar los resultados cargados.
* Consultar información detallada de un anime.
* Iniciar sesión mediante credenciales de prueba.
* Guardar animes como favoritos.
* Modificar el estado y las notas de cada favorito.
* Eliminar animes de la lista de favoritos.
* Cambiar entre modo claro y modo oscuro.

La aplicación no cuenta con un backend propio. Los datos de anime se obtienen desde Jikan API, mientras que la sesión, los favoritos, las notas y el tema seleccionado se almacenan en el navegador mediante `localStorage`.

## Tecnologías utilizadas

* Angular
* TypeScript
* HTML
* CSS
* Tailwind CSS
* PostCSS
* Angular Router
* Angular Forms
* Angular HttpClient
* RxJS
* Jikan API
* LocalStorage
* Git
* GitHub

## Tailwind CSS

La interfaz del proyecto utiliza Tailwind CSS como framework de estilos.

Tailwind fue configurado mediante PostCSS y se importa desde el archivo global:

```css
@import "tailwindcss";
```

Las clases de Tailwind se utilizan directamente en los archivos HTML para controlar:

* Cuadrículas.
* Flexbox.
* Espaciado.
* Tipografía.
* Colores.
* Bordes.
* Sombras.
* Estados `hover` y `focus`.
* Diseño responsivo.
* Adaptación a dispositivos móviles.

También se utilizan variables CSS globales para conservar el modo claro y oscuro:

```html
<div class="bg-[var(--bg-main)] text-[var(--text-main)]">
```

## API utilizada

El proyecto consume datos desde Jikan API:

```text
https://api.jikan.moe/v4
```

Jikan es una API pública no oficial que permite consultar información relacionada con MyAnimeList.

### Endpoints utilizados

```text
GET /anime?q={busqueda}
GET /top/anime
GET /anime/{id}/full
```

Debido a que se trata de una API pública gratuita, en algunos momentos puede responder con errores temporales como:

```text
429 Too Many Requests
504 Gateway Time-out
```

La aplicación maneja estos casos mediante componentes de carga y mensajes de error.

## Funcionalidades principales

### Página de inicio

La página principal muestra una lista de animes obtenida desde la API.

Desde esta pantalla el usuario puede:

* Consultar animes.
* Realizar búsquedas.
* Aplicar filtros.
* Consultar tendencias.
* Abrir la página de detalle.
* Agregar animes a favoritos.

### Búsqueda de animes

El usuario puede buscar animes por título mediante el buscador principal.

Ejemplos:

```text
Naruto
Komi
One Piece
```

Los resultados muestran:

* Imagen.
* Título.
* Puntuación.
* Cantidad de episodios.
* Tipo de anime.
* Botón de favorito.

### Filtros locales

La aplicación incluye filtros que trabajan sobre los animes cargados actualmente en pantalla.

Filtros disponibles:

* Formato.
* Estado.
* Género.
* Ordenamiento.

Opciones de ordenamiento:

* Popularidad.
* Puntuación.
* Título.
* Cantidad de episodios.

Los filtros son locales, por lo que no realizan una nueva solicitud a la API cada vez que se modifica una opción.

### Tendencias

La página principal incluye una sección de tendencias que muestra algunos de los animes destacados obtenidos desde la API.

Cada elemento permite consultar:

* Imagen.
* Título.
* Puntuación.
* Episodios.
* Tipo.

### Detalle de anime

Cada anime puede abrirse en una pantalla de detalle.

La página muestra:

* Imagen principal.
* Título.
* Título japonés.
* Sinopsis.
* Puntuación.
* Episodios.
* Tipo.
* Estado.
* Año.
* Géneros.

### Login simulado

El proyecto incluye un sistema de inicio de sesión simulado con credenciales fijas.

No existe conexión con un servidor, una base de datos ni un sistema real de usuarios.

#### Credenciales de prueba

```text
Correo: admin@anivault.com
Contraseña: admin123
```

Cuando el usuario inicia sesión:

* Se almacena la sesión en `localStorage`.
* Se habilita la ruta de favoritos.
* Se actualiza la barra de navegación.
* Se permite agregar animes a favoritos.

### Barra de navegación dinámica

La barra de navegación cambia según el estado de la sesión.

Sin una sesión iniciada:

```text
Inicio | Iniciar sesión
```

Con una sesión iniciada:

```text
Inicio | Favoritos | Cerrar sesión
```

También incluye el interruptor para cambiar entre modo claro y modo oscuro.

### Cierre de sesión

Cuando el usuario selecciona la opción Cerrar sesión, se muestra un modal de confirmación.

El usuario puede:

* Cancelar la operación.
* Confirmar el cierre de sesión.

Al confirmar, la sesión se elimina de `localStorage`.

### Protección de rutas

La aplicación utiliza guards para controlar el acceso a determinadas páginas.

#### AuthGuard

Evita que un usuario sin sesión acceda a la página de favoritos.

Si intenta escribir manualmente la ruta:

```text
/favoritos
```

será redirigido a la página de inicio de sesión.

#### GuestGuard

Evita que un usuario que ya inició sesión vuelva a entrar a la página de login.

### Favoritos

El usuario puede agregar un anime a favoritos mediante el botón de corazón ubicado en cada tarjeta.

Si un usuario sin sesión intenta agregar un favorito, se muestra un modal indicando que debe iniciar sesión.

Los favoritos se almacenan en `localStorage`.

## CRUD de favoritos

La sección de favoritos implementa las cuatro operaciones principales de un CRUD.

### Create

El usuario puede agregar un anime a favoritos.

### Read

La aplicación consulta y muestra la lista de animes guardados.

### Update

El usuario puede modificar:

* Estado personal.
* Nota personal.

Estados disponibles:

```text
Pendiente
Viendo
Terminado
```

### Delete

El usuario puede eliminar un anime de favoritos.

Antes de eliminarlo, la aplicación muestra un modal de confirmación.

Al borrar el anime también se eliminan su estado y su nota personal.

## Modo claro y modo oscuro

AniVault permite cambiar entre modo claro y modo oscuro desde la barra de navegación.

El tema seleccionado se almacena en `localStorage`, por lo que se conserva al recargar la página.

El sistema de temas utiliza variables CSS globales como:

```css
--bg-main
--bg-surface
--bg-soft
--text-main
--text-muted
--border-color
--primary
--primary-hover
```

Tailwind utiliza estas variables mediante valores personalizados.

## Componentes reutilizables

### Navbar

Componente encargado de la navegación principal.

Funciones:

* Mostrar enlaces disponibles.
* Cambiar según el estado de sesión.
* Mostrar el botón del tema.
* Abrir el modal de cierre de sesión.

### AnimeCard

Componente reutilizable que muestra la información básica de cada anime.

Muestra:

* Imagen.
* Título.
* Puntuación.
* Episodios.
* Tipo.
* Botón de favorito.

También controla el modal que aparece cuando un usuario sin sesión intenta guardar un favorito.

### Loading

Componente reutilizable para mostrar un estado de carga.

Utiliza una animación creada con Tailwind CSS.

### ErrorMessage

Componente reutilizable para mostrar errores relacionados con el consumo de la API.

## Servicios principales

### AnimeService

Servicio encargado de realizar las solicitudes HTTP a Jikan API.

Funciones principales:

* Buscar animes.
* Obtener animes populares.
* Obtener tendencias.
* Obtener el detalle de un anime mediante su ID.

### AuthService

Servicio encargado de administrar la sesión simulada.

Funciones principales:

* Iniciar sesión.
* Cerrar sesión.
* Verificar si existe una sesión.
* Almacenar la sesión en `localStorage`.

### FavoritesService

Servicio encargado de administrar los favoritos.

Funciones principales:

* Agregar un favorito.
* Consultar favoritos.
* Actualizar un favorito.
* Eliminar un favorito.
* Verificar si un anime está guardado.

### ThemeService

Servicio encargado del modo claro y oscuro.

Funciones principales:

* Cambiar el tema.
* Aplicar el tema global.
* Guardar la preferencia en `localStorage`.

## Modelos e interfaces

Los tipos relacionados con los animes se encuentran separados de los servicios.

### Anime

El modelo `Anime` representa la estructura de un anime utilizado dentro de la aplicación.

También incluye propiedades locales como:

```ts
userStatus
userNote
```

### AnimeResponse

La interfaz `AnimeResponse` representa la respuesta de la API cuando devuelve una lista de animes.

```ts
export interface AnimeResponse {
  data: Anime[];
}
```

### AnimeDetailResponse

Representa la respuesta de la API cuando se consulta un solo anime.

```ts
export interface AnimeDetailResponse {
  data: Anime;
}
```

Esta separación permite evitar el uso innecesario de `any` y mejora el tipado del proyecto.

## Diseño responsivo

La interfaz se adapta a diferentes tamaños de pantalla mediante Tailwind CSS.

Se utilizaron puntos de ruptura como:

```text
sm
md
lg
xl
2xl
```

La aplicación está adaptada para:

* Computadora.
* Tablet.
* Teléfono celular.

En pantallas pequeñas:

* Las cuadrículas cambian a una columna.
* Los botones se reorganizan.
* La barra de navegación se ajusta.
* Los paneles laterales se colocan uno debajo del otro.
* Los modales ocupan el ancho disponible.

## Página NotFound

La aplicación incluye una página personalizada para rutas inexistentes.

Cuando el usuario intenta entrar a una ruta no registrada, se muestra:

* Imagen de error 404.
* Mensaje informativo.
* Botón para volver al inicio.

La ruta comodín se define mediante:

```ts
{
  path: '**',
  component: NotFound
}
```

## Estructura general del proyecto

```text
anivault/
├── .postcssrc.json
├── angular.json
├── package.json
├── src/
│   ├── styles.css
│   └── app/
│       ├── core/
│       │   ├── guards/
│       │   │   ├── auth.guard.ts
│       │   │   └── guest.guard.ts
│       │   │
│       │   ├── interfaces/
│       │   │   └── anime-response.interface.ts
│       │   │
│       │   ├── models/
│       │   │   └── anime.model.ts
│       │   │
│       │   └── services/
│       │       ├── anime.service.ts
│       │       ├── auth.service.ts
│       │       ├── favorites.service.ts
│       │       └── theme.service.ts
│       │
│       ├── features/
│       │   └── pages/
│       │       ├── home/
│       │       ├── favorites/
│       │       ├── anime-detail/
│       │       ├── login-page/
│       │       └── not-found/
│       │
│       ├── shared/
│       │   └── components/
│       │       ├── navbar/
│       │       ├── anime-card/
│       │       ├── loading/
│       │       └── error-message/
│       │
│       ├── app.routes.ts
│       ├── app.config.ts
│       ├── app.html
│       └── app.css
│
└── README.md
```

## Rutas principales

| Ruta         | Descripción         | Protección |
| ------------ | ------------------- | ---------- |
| `/`          | Página principal    | Pública    |
| `/login`     | Inicio de sesión    | GuestGuard |
| `/favoritos` | Lista de favoritos  | AuthGuard  |
| `/anime/:id` | Detalle de un anime | Pública    |
| `**`         | Página NotFound     | Pública    |

## Instalación

Clonar el repositorio:

```bash
git clone https://github.com/GeoDash123/anivault.git
```

Entrar a la carpeta del proyecto:

```bash
cd anivault
```

Instalar las dependencias:

```bash
npm install
```

Ejecutar el proyecto:

```bash
ng serve
```

Abrir en el navegador:

```text
http://localhost:4200
```

## Compilación

Para verificar que el proyecto compile correctamente:

```bash
ng build
```

Los archivos generados se almacenarán dentro de la carpeta:

```text
dist/
```

## Limitaciones del proyecto

El proyecto presenta las siguientes limitaciones:

* No cuenta con backend propio.
* No utiliza una base de datos.
* No tiene registro real de usuarios.
* El inicio de sesión es simulado.
* Los favoritos se almacenan solamente en el navegador.
* La información puede perderse si se elimina el almacenamiento local.
* La sesión no se comparte entre dispositivos.
* Los filtros trabajan sobre los resultados cargados.
* La API externa puede presentar errores temporales.
* No se almacenan contraseñas de forma segura debido a que se trata de una demostración académica.

## Estado del proyecto

Funcionalidades completadas:

* Consumo de API externa.
* Página principal.
* Búsqueda de anime.
* Filtros locales.
* Tendencias.
* Detalle de anime.
* Login simulado.
* Cierre de sesión.
* AuthGuard.
* GuestGuard.
* Navbar dinámica.
* CRUD de favoritos.
* Estados y notas personales.
* Modo claro y oscuro.
* Modales personalizados.
* Componentes de carga y error.
* Página 404.
* Diseño responsivo.
* Integración de Tailwind CSS.

## Autores

Proyecto desarrollado por:

* Alatorre López José Carlos.
* Arroyo Sepúlveda Jesús Antonio.

## Créditos

Los datos de anime son obtenidos mediante Jikan API:

```text
https://api.jikan.moe/v4
```

La información está basada en datos públicos de MyAnimeList consultados mediante Jikan.

## Licencia

Este proyecto fue desarrollado con fines académicos para la materia Desarrollo de Software Frontend II.
