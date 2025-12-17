# 🌳 DevTree

> Tu perfil, todos tus enlaces, un solo lugar.

DevTree es una aplicación web moderna que te permite crear un perfil personalizado con todos tus enlaces de redes sociales en un solo lugar. Piensa en ello como tu tarjeta de presentación digital, pero mucho más cool.

![DevTree Banner](https://via.placeholder.com/1200x400/0f172a/06b6d4?text=DevTree)

## ✨ ¿Qué hace DevTree?

Básicamente, te da un enlace único (como `devtree.com/tunombre`) donde puedes mostrar:

- 📸 Tu foto de perfil
- 📝 Una descripción sobre ti
- 🔗 Todos tus enlaces de redes sociales (Instagram, GitHub, LinkedIn, etc.)
- 👁️ Un contador de visitas para ver quién te está stalkeando (de forma sana)

Es perfecto para ponerlo en tu bio de Instagram, Twitter, o donde sea que quieras compartir todos tus enlaces sin saturar tu biografía.

## 🚀 Características

- **Perfiles públicos**: Cada usuario tiene su propia URL personalizada
- **Drag & Drop**: Reordena tus enlaces arrastrándolos (porque hacer clic es del 2010)
- **Contador de visitas**: Sabe cuánta gente visita tu perfil
- **Responsive**: Se ve bien en cualquier dispositivo (sí, hasta en ese iPhone 5 que guardas de recuerdo)
- **Tema oscuro**: Porque tus ojos te lo agradecerán
- **Subida de imágenes**: Integración con Cloudinary para tus fotos de perfil

## 🛠️ Stack Tecnológico

### Backend

- **Node.js** + **Express** - El clásico combo que nunca falla
- **TypeScript** - Porque los errores en runtime no son divertidos
- **MongoDB** - Base de datos NoSQL para guardar todo
- **Cloudinary** - Para las imágenes (porque guardar imágenes en MongoDB es mala idea)
- **JWT** - Autenticación segura
- **bcrypt** - Para hashear contraseñas como se debe

### Frontend

- **React 19** - La última versión, porque vivimos al límite
- **TypeScript** - Sí, también en el frontend
- **Vite** - Build tool súper rápido
- **TailwindCSS** - Estilos sin salir del HTML
- **React Query** - Manejo de estado del servidor
- **React Router** - Navegación entre páginas
- **DnD Kit** - Para el drag & drop de los enlaces
- **React Hook Form** - Formularios sin dolor de cabeza

## 📦 Instalación

### Requisitos previos

- Node.js (v18 o superior)
- MongoDB (local o Atlas)
- Cuenta de Cloudinary (para las imágenes)

### 1. Clonar el repositorio

```bash
git clone https://github.com/tuusuario/devtree.git
cd devtree
```

### 2. Configurar el Backend

```bash
cd backend
npm install
```

Crea un archivo `.env` en la carpeta `backend`:

```env
MONGO_URI=tu_mongodb_connection_string
FRONTEND_URL=http://localhost:5173
JWT_SECRET=tu_super_secreto_jwt
CLOUDINARY_NAME=tu_cloudinary_name
CLOUDINARY_API_KEY=tu_cloudinary_api_key
CLOUDINARY_API_SECRET=tu_cloudinary_api_secret
```

Inicia el servidor:

```bash
npm run dev:api
```

### 3. Configurar el Frontend

```bash
cd frontend
npm install
```

Crea un archivo `.env` en la carpeta `frontend`:

```env
VITE_API_URL=http://localhost:4000/api
```

Inicia el servidor de desarrollo:

```bash
npm run dev
```

¡Listo! Abre http://localhost:5173 y empieza a crear tu perfil.

## 🎯 Uso

1. **Regístrate**: Crea tu cuenta con un handle único (ej: `@johndoe`)
2. **Personaliza**: Sube tu foto, agrega una descripción
3. **Agrega enlaces**: Conecta tus redes sociales
4. **Ordena**: Arrastra y suelta para reordenar tus enlaces
5. **Comparte**: Tu perfil estará en `tudominio.com/tuhandle`

## 📁 Estructura del Proyecto

```
devtree/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuración (DB, Cloudinary)
│   │   ├── handlers/       # Controladores de rutas
│   │   ├── middleware/     # Autenticación, validación
│   │   ├── models/         # Modelos de MongoDB
│   │   ├── utils/          # Funciones auxiliares
│   │   ├── router.ts       # Rutas de la API
│   │   └── index.ts        # Punto de entrada
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── api/            # Llamadas a la API
    │   ├── components/     # Componentes reutilizables
    │   ├── config/         # Configuración de Axios
    │   ├── data/           # Datos estáticos
    │   ├── layouts/        # Layouts de páginas
    │   ├── types/          # Tipos de TypeScript
    │   ├── utils/          # Funciones auxiliares
    │   ├── views/          # Páginas/Vistas
    │   └── main.tsx        # Punto de entrada
    └── package.json
```

## 🌐 API Endpoints

### Autenticación

- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/check-handle` - Verificar disponibilidad de handle

### Usuario

- `GET /api/user` - Obtener usuario autenticado
- `PATCH /api/user` - Actualizar perfil
- `POST /api/user/image` - Subir imagen de perfil
- `GET /api/:handle` - Obtener perfil público

### Visitas

- `POST /api/user/:handle/visit` - Registrar visita
- `GET /api/user/:handle/stats` - Obtener estadísticas de visitas
- `GET /api/user/my-stats` - Obtener mis estadísticas

## 🎨 Capturas de Pantalla

### Página de Inicio

_Aquí iría una captura de la landing page_

### Panel de Administración

_Aquí iría una captura del dashboard_

### Perfil Público

_Aquí iría una captura de un perfil público_

## 🚀 Despliegue

### Backend (Render)

1. Crea una cuenta en [Render](https://render.com)
2. Conecta tu repositorio
3. Configura las variables de entorno
4. Deploy automático

### Frontend (Netlify)

1. Crea una cuenta en [Netlify](https://netlify.com)
2. Conecta tu repositorio
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Configura `VITE_API_URL` con la URL de tu backend

## 🤝 Contribuir

Las contribuciones son bienvenidas! Si tienes alguna idea o encuentras un bug:

1. Fork el proyecto
2. Crea una rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia ISC - mira el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Davier Lopez**

- GitHub: [@tuusuario](https://github.com/tuusuario)
- LinkedIn: [Tu LinkedIn](https://linkedin.com/in/tuusuario)

## 🙏 Agradecimientos

- A todos los que probaron la app y dieron feedback
- A la comunidad de React y Node.js
- Al café, mucho café ☕

---

⭐ Si te gustó el proyecto, dale una estrella en GitHub!
