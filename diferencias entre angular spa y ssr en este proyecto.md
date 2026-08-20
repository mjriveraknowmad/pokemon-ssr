# Diferencias entre Angular SPA y SSR en este proyecto en cuanto a código

## Patrones SSR presentes en el proyecto

### 1. Configuración dual de entry points

En un SPA solo tienes `main.ts`. Aquí hay un segundo entry point en `src/main.server.ts` que exporta un `bootstrap` especial para el servidor. Un SPA normal solo tiene un único punto de entrada del navegador.

### 2. Servidor Express dedicado (`src/server.ts`)

El archivo `server.ts` monta un servidor Express que sirve archivos estáticos y delega al motor SSR (`AngularNodeAppEngine.handle`). Un SPA normal simplemente se sirve como archivos estáticos sin necesidad de un servidor Node.

### 3. Pre-renderizado de todas las rutas (`app.routes.server.ts`)

```ts
{ path: '**', renderMode: RenderMode.Prerender }
```

Cada ruta se genera como HTML estático en tiempo de build. En un SPA, el HTML inicial es solo un `<div id="app">` vacío y Angular renderiza todo en el navegador.

### 4. Hydratación del cliente (`app.config.ts`)

```ts
provideClientHydration(withEventReplay())
```

Esto le dice a Angular que **reutilice el DOM generado por el servidor** en vez de destruirlo y re-renderizarlo. En un SPA esto no existe porque no hay DOM previo del servidor.

### 5. Tags SEO server-side (ej: `pokemon-page.component.ts`)

Los `Title` y `Meta` tags (og:title, og:image, description) se renderizan en el HTML pre-generado. En un SPA, los crawlers de Google/social media solo ven el HTML crudo sin esos meta tags, a menos que uses librerías externas.

### 6. Caching agresivo de estáticos con headers HTTP (`server.ts`)

```ts
maxAge: '1y'
```

Esto se configura en el servidor Express. En un SPA desplegada en CDN, el caching lo controla la configuración del CDN/hosting, no tu código.

### 7. API routes en el servidor (`server.ts`)

El template de rutas `/api/{*splat}` permite crear endpoints server-side. En un SPA pura, toda comunicación con backend va a APIs externas.

---

## Cosas que este proyecto no aprovecha del SSR pero un SPA normal no tendría la necesidad

| Ausencia | Impacto |
|----------|---------|
| **Sin `TransferState`** | Las llamadas HTTP a la PokeAPI se hacen **dos veces**: una en el servidor durante el pre-render y otra en el cliente al hidratar. Un SPA solo lo hace una vez. |
| **Sin `isPlatformServer`** | No hay lógica condicional para ejecutar cosas solo en el servidor (ej: analytics, cookies). |
| **Sin `resolve` en rutas** | Los datos se cargan en `ngOnInit()` en vez de antes de activar la ruta, perdiendo ventajas del SSR. |

---

## Resumen

Un SPA normal **no tendría** `server.ts`, `main.server.ts`, `app.routes.server.ts`, ni `provideClientHydration`. Todo eso es exclusivo del patrón SSR/pre-rendering. Este proyecto usa **Pre-rendering (SSG)** en vez de SSR dinámico, ya que todas las rutas se generan estáticamente en tiempo de build.
