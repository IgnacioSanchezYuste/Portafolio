# Portafolio

Portafolio personal de **Ignacio Sánchez Yuste**, desarrollado con **React** y **Vite**, y estilizado con **Tailwind CSS**.  
Este proyecto presenta una web tipo landing/portfolio con secciones de presentación, formación, experiencia, habilidades, idiomas y contacto.

## Vista general

La aplicación está pensada como un sitio personal moderno, con diseño responsive, animaciones suaves y una interfaz visual cuidada.  
También incluye elementos interactivos como:

- Animaciones con `framer-motion`
- Metadatos dinámicos con `react-helmet`
- Notificaciones con `Toaster`
- Analítica con `@vercel/analytics`

## Tecnologías utilizadas

- **React 18**
- **Vite**
- **Tailwind CSS**
- **Framer Motion**
- **React Helmet**
- **Lucide React**
- **Radix UI**
- **Vercel Analytics**

## Estructura principal

La aplicación está organizada en componentes reutilizables, cargados desde `src/App.jsx`:

- `Header`
- `About`
- `Education`
- `Experience`
- `Skills`
- `Languages`
- `SoftSkills`
- `OtherData`
- `Contact`
- `Footer`
- `Toaster`

## Características

- Diseño moderno con fondo degradado
- Maquetación responsive
- Secciones separadas por contenido
- Scroll suave
- Efectos visuales tipo glassmorphism
- Animaciones de entrada
- Preparado para despliegue como portfolio personal

## Captura / demo

> Puedes añadir aquí una captura del proyecto o el enlace a la web publicada.

**Web publicada:** [https://ignaciosanchezyuste.es](https://ignaciosanchezyuste.es)

## Instalación

```bash
git clone https://github.com/IgnacioSanchezYuste/Portafolio.git
cd Portafolio
npm install
```

## Scripts disponibles

### Ejecutar en desarrollo
```bash
npm run dev
```

### Compilar para producción
```bash
npm run build
```

### Previsualizar la build
```bash
npm run preview
```

## Configuración

Asegúrate de tener un archivo `.env` si el proyecto lo requiere para variables de entorno de analítica u otros servicios externos.

## Despliegue

Este proyecto puede desplegarse fácilmente en plataformas como:

- Vercel
- Netlify
- GitHub Pages

## Autor

**Ignacio Sánchez Yuste**

- GitHub: [IgnacioSanchezYuste](https://github.com/IgnacioSanchezYuste)
- Web: [ignaciosanchezyuste.es](https://ignaciosanchezyuste.es)

## Licencia

Este proyecto no incluye una licencia definida.
