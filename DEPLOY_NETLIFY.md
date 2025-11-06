# 🚀 Deploy en Netlify - Guía Completa

## Problema Resuelto

El error de Rollup en Netlify ha sido resuelto con las siguientes configuraciones:

### ✅ Archivos Configurados

1. **`.npmrc`** - Configuración de npm para dependencias opcionales
2. **`netlify.toml`** - Configuración de build para Netlify
3. **`package.json`** - Versiones de Node/npm y script postinstall

## 📋 Pasos para Deployar en Netlify

### 1. Preparar el Repositorio

Asegúrate de que todos los archivos nuevos estén en el repositorio:

```bash
git add .npmrc netlify.toml package.json
git commit -m "Fix: Configuración para deploy en Netlify"
git push origin main
```

### 2. Configurar Variables de Entorno en Netlify

1. Ve a tu sitio en Netlify Dashboard
2. **Site settings** > **Environment variables**
3. Click en **"Add a variable"**
4. Agrega las siguientes variables:

   **PUBLIC_SUPABASE_URL**
   ```
   https://wfpamjzszeybitdjkcqh.supabase.co
   ```

   **PUBLIC_SUPABASE_ANON_KEY**
   ```
   eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmcGFtanpzemV5Yml0ZGprY3FoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNjkzMzAsImV4cCI6MjA3Nzk0NTMzMH0.OQskGmCVy7uzzvwWFh-kbB1yV_oWYAaxVUS3ef5VVUs
   ```

   ⚠️ **IMPORTANTE**: Asegúrate de que las variables empiecen con `PUBLIC_` para que Astro las reconozca.

### 3. Trigger Deploy Manualmente

1. En Netlify Dashboard, ve a **Deploys**
2. Click en **"Trigger deploy"** > **"Deploy site"**
3. Espera a que termine el build

## 🔍 Qué Hace Cada Archivo

### `.npmrc`
```ini
; Configuración para Netlify
auto-install-peers=true
legacy-peer-deps=false
```

- Instala automáticamente peer dependencies
- Evita problemas con dependencias opcionales

### `netlify.toml`
```toml
[build]
  command = "npm ci && npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20.11.0"
  NPM_FLAGS = "--legacy-peer-deps"
```

- **command**: Usa `npm ci` para instalación limpia basada en package-lock.json
- **publish**: Directorio de salida de Astro
- **NODE_VERSION**: Versión específica de Node que funciona correctamente
- **NPM_FLAGS**: Flags adicionales para npm durante la instalación

### `package.json` - Cambios
```json
{
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=9.0.0"
  }
}
```

- **engines**: Especifica versiones mínimas de Node y npm
- **IMPORTANTE**: NO incluyas script `postinstall` con `npm rebuild` - esto crea un bucle infinito en Netlify

## 🐛 Troubleshooting

### Error: "Cannot find module @rollup/rollup-linux-x64-gnu"

**Solución 1**: Limpiar caché de Netlify
1. Site settings > Build & deploy > Build settings
2. Scroll down to "Build image selection"
3. Click "Clear cache and retry deploy"

**Solución 2**: Verificar versión de Node
- Asegúrate de que `NODE_VERSION` en `netlify.toml` sea `20.11.0`

**Solución 3**: Verificar comando de build

- El comando debe ser `npm ci && npm run build`

### Error: Build se queda trabado en "npm rebuild"

**Causa**: Script `postinstall` con `npm rebuild` crea un bucle infinito

**Solución**:

1. Elimina el script `postinstall` de [package.json](package.json)
2. El build debe usar solo `npm ci && npm run build`
3. Limpia el cache de Netlify y redeploya

### Error: Variables de entorno no definidas

Si ves errores como "Las variables de entorno de Supabase no están configuradas":

1. Verifica que las variables en Netlify empiecen con `PUBLIC_`
2. Verifica que no haya espacios extra al copiar/pegar
3. Después de agregar variables, haz un nuevo deploy

### Build exitoso pero sitio en blanco

1. Verifica la consola del navegador (F12)
2. Busca errores de JavaScript
3. Verifica que las rutas de assets sean correctas
4. Asegúrate de que `publish` en netlify.toml sea `dist`

### Error 404 en rutas

Si `/admin` da 404:

1. Astro genera páginas estáticas
2. Verifica que `src/pages/admin.astro` exista
3. El archivo debe estar en el build (revisa los logs de Netlify)

## 📊 Verificar que Todo Funcione

### 1. Check de Build

En los logs de Netlify deberías ver:

```
9:XX:XX PM: $ rm -rf node_modules package-lock.json && npm install && npm run build
9:XX:XX PM: added XXX packages in XXs
9:XX:XX PM:
9:XX:XX PM: > foxlabweb@0.0.1 build
9:XX:XX PM: > astro build
9:XX:XX PM:
9:XX:XX PM: [build] output: "static"
9:XX:XX PM: [build] directory: /opt/build/repo/dist/
9:XX:XX PM: [build] Collecting build info...
9:XX:XX PM: [build] ✓ Completed in XXms.
9:XX:XX PM: [build] Building static entrypoints...
9:XX:XX PM: [build] ✓ Completed in XXs.
9:XX:XX PM: [build] Complete!
```

### 2. Check del Sitio

Una vez deployado:

1. **Homepage** (`https://tu-sitio.netlify.app`)
   - Debe cargar correctamente
   - Sección "FOXLAB_OPERATIVES" debe mostrar los 5 miembros del equipo
   - Footer debe tener el botón `[SYS_ACCESS]`

2. **Login**
   - Click en `[SYS_ACCESS]`
   - Debe abrir el modal de login
   - Intenta hacer login con tus credenciales

3. **Admin Panel** (`https://tu-sitio.netlify.app/admin`)
   - Si no estás logueado, debe redirigir a home y abrir modal
   - Si estás logueado, debe mostrar el panel con sidebar
   - Verifica que PROJECTS y TEAM funcionen correctamente

### 3. Check de Variables de Entorno

Abre la consola del navegador (F12) y busca:
```
[SUPABASE] Configuración: {url: '✓ Configurada', key: '✓ Configurada'}
[SUPABASE] Cliente creado con persistSession: true
```

Si ves esto, las variables están configuradas correctamente.

## 🔐 Seguridad

### Variables de Entorno

- ✅ `PUBLIC_SUPABASE_URL` - OK para público
- ✅ `PUBLIC_SUPABASE_ANON_KEY` - OK para público (es la anon key)
- ❌ **NUNCA** expongas la `SERVICE_ROLE_KEY`

### .gitignore

Asegúrate de que `.env` esté en `.gitignore`:
```
.env
.env.local
.env.production
```

## 📝 Checklist Final

Antes de hacer deploy:

- [ ] Archivos agregados al repositorio (.npmrc, netlify.toml)
- [ ] package.json actualizado con engines y postinstall
- [ ] Variables de entorno configuradas en Netlify
- [ ] Cache de Netlify limpiado (si aplica)
- [ ] Build local funciona correctamente (`npm run build`)
- [ ] Git push realizado

## 🎉 Deploy Exitoso

Si todo funciona:

1. ✅ Build completo sin errores
2. ✅ Sitio accesible en la URL de Netlify
3. ✅ Team section carga datos desde Supabase
4. ✅ Login funciona correctamente
5. ✅ Admin panel accesible con autenticación

## 🆘 Necesitas Ayuda?

Si después de seguir todos estos pasos aún tienes problemas:

1. Copia los **logs completos** del build de Netlify
2. Copia el **error exacto** que aparece
3. Verifica que seguiste **todos** los pasos en orden
4. Comparte los logs para diagnóstico

---

**Última actualización**: $(date)
**Versión de Node recomendada**: 20.11.0
**Versión de npm recomendada**: 10.2.4
