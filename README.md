# 🏁 TrackSwap - Track Day Marketplace

Aplicación móvil React para reservar sesiones en circuitos, kartings, aeródromos y espacios únicos para track days.

## 📋 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** (v16 o superior) - [Descargar aquí](https://nodejs.org/)
- **npm** (viene incluido con Node.js)
- Un navegador web moderno (Chrome, Firefox, Safari, Edge)

Para verificar si tienes Node.js instalado:
```bash
node --version
npm --version
```

## 🚀 Instalación y Ejecución

### 1. Navega a la carpeta del proyecto

```bash
cd trackswap-app
```

### 2. Instala las dependencias

```bash
npm install
```

Este comando instalará todas las dependencias necesarias:
- React
- React DOM
- Vite (bundler y dev server)
- Plugin de Vite para React

### 3. Inicia el servidor de desarrollo

```bash
npm run dev
```

### 4. Abre en el navegador

El servidor se iniciará automáticamente. Abre tu navegador en:

**👉 http://localhost:5173/**

¡Listo! La aplicación TrackSwap estará ejecutándose.

## 🛑 Detener el Servidor

Presiona `Ctrl + C` en la terminal donde está corriendo el servidor.

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Compila la aplicación para producción |
| `npm run preview` | Previsualiza la build de producción |

## 🎯 Características de la Demo

- ✅ **Splash Screen** animado con branding
- ✅ **Home** con búsqueda y filtros de venues
- ✅ **Detalles** de cada circuito con información completa
- ✅ **Sesiones** disponibles con selección de horario
- ✅ **Booking Flow** completo con seguro opcional
- ✅ **Confirmación** de reserva con resumen
- ✅ **Favoritos** (guardar venues preferidos)
- ✅ **Historial** de reservas
- ✅ **Perfil** de usuario

## 🎨 Diseño

- Diseño mobile-first optimizado para dispositivos móviles
- Interfaz oscura con acentos en naranja (#FF4500)
- Gráficos SVG generativos para cada tipo de venue
- Animaciones suaves y transiciones fluidas
- Tipografía: Georgia (serif) + Monospace

## 🏗️ Estructura del Proyecto

```
trackswap-app/
├── index.html          # HTML principal
├── package.json        # Dependencias y scripts
├── vite.config.js      # Configuración de Vite
├── README.md           # Este archivo
└── src/
    ├── main.jsx        # Entry point de React
    └── App.jsx         # Componente principal
```

## 🔧 Tecnologías Utilizadas

- **React 18** - Biblioteca UI
- **Vite** - Build tool y dev server
- **JavaScript (ES6+)** - Sintaxis moderna
- **SVG** - Gráficos vectoriales
- **CSS-in-JS** - Estilos inline con objetos JS

## 💡 Troubleshooting

### El puerto 5173 está ocupado

Si el puerto está en uso, Vite intentará usar el siguiente disponible (5174, 5175, etc.). Revisa la terminal para ver en qué puerto se ejecuta.

### Error al instalar dependencias

Intenta limpiar la caché de npm:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### La página no carga en el navegador

1. Verifica que el servidor esté corriendo en la terminal
2. Asegúrate de que no haya errores en la consola
3. Intenta abrir en modo incógnito
4. Limpia la caché del navegador (Ctrl/Cmd + Shift + R)

## 📱 Vista Previa

La aplicación simula un iPhone con:
- Resolución: 390x844px
- Notch superior
- Barra de home inferior
- UI móvil completa funcional

## 📄 Licencia

Este es un proyecto de demostración pitch para TrackSwap.

## 👨‍💻 Desarrollo

Creado con React + Vite para máxima velocidad de desarrollo y HMR (Hot Module Replacement).

---

**¿Preguntas?** Abre un issue o contacta al equipo de desarrollo.
