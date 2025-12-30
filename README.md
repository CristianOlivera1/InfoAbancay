# InfoAbancay

Plataforma web de noticias y publicaciones locales para la ciudad de Abancay, Apurímac. Permite a los usuarios compartir y descubrir contenido sobre eventos culturales, deportes, turismo, negocios y más.

## 🚀 Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Tailwind CSS 4** - Framework de estilos
- **Framer Motion** - Animaciones
- **GSAP** - Animaciones de interacción
- **Leaflet** - Mapas interactivos
- **MDXEditor** - Editor de Markdown
- **React Photo View** - Galería de imágenes

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/CristianOlivera1/InfoAbancay.git

# Instalar dependencias
pnpm install
# o
npm install
```

## 🛠️ Desarrollo

```bash
# Iniciar servidor de desarrollo
pnpm dev

# Compilar para producción
pnpm build

# Vista previa de producción
pnpm preview

# Ejecutar linter
pnpm lint
```

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
├── hooks/         # Custom hooks
├── layout/        # Componentes de layout (Header, Footer)
├── pages/         # Páginas de la aplicación
├── routes/        # Configuración de rutas
├── services/      # Servicios y API calls
├── shared/        # Utilidades compartidas
└── utils/         # Funciones auxiliares
```

## ✨ Características

- 🏠 **Página de inicio** con publicaciones destacadas
- 📝 **Crear publicaciones** con editor Markdown, imágenes y ubicación
- 🗂️ **Categorías** (Cultura, Deportes, Turismo, Negocios, etc.)
- 💬 **Sistema de comentarios** anidados
- 👍 **Interacciones** (likes, dislikes, guardar, compartir)
- 🗺️ **Ubicaciones** con mapas interactivos
- 🏷️ **Etiquetas** para organizar contenido
- 📱 **Diseño responsive** para móviles y tablets
