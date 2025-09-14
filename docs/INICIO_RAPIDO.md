# ⚡ Inicio Rápido - KallpaWarmIA

## 🎯 ¿Qué es KallpaWarmIA?

KallpaWarmIA es una plataforma educativa que combina **inteligencia artificial** con **metodologías de aprendizaje innovadoras**, inspirada en la cosmovisión andina. Ofrece chatbots inteligentes, evaluaciones personalizadas y experiencias educativas inmersivas.

## 🚀 Comenzar en 5 Minutos

### **1. Prerrequisitos**
- ✅ Node.js 18.0+ instalado
- ✅ Cuenta de Google Cloud (para Gemini AI)
- ✅ Proyecto de Firebase configurado

### **2. Clonar y Configurar**
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/KallpaWarmIA.git
cd KallpaWarmIA

# Instalar dependencias
npm install

# Configurar variables de entorno
cp env.example .env.local
# Editar .env.local con tus credenciales
```

### **3. Configurar Credenciales**
Edita `.env.local` con tus claves:

```env
# Google Gemini AI (Requerido)
GOOGLE_API_KEY=tu_api_key_aqui

# Firebase (Requerido)
NEXT_PUBLIC_FIREBASE_API_KEY=tu_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id
```

### **4. Ejecutar la Aplicación**
```bash
# Desarrollo
npm run dev

# La app estará en: http://localhost:9002
```

## 🎮 Funcionalidades Principales

### **🤖 Chat con IA**
- **Ruta**: `/chat-ia`
- **Función**: Conversar con asistente inteligente
- **Características**: Respuestas contextuales, historial, exportación

### **📊 Dashboard Personal**
- **Ruta**: `/dashboard`
- **Función**: Panel de control personalizado
- **Características**: Estadísticas, progreso, accesos rápidos

### **👤 Sistema de Avatar**
- **Ruta**: `/avatar`
- **Función**: Personalización de personaje
- **Características**: Efectos neon, partículas, guardado en nube

### **❓ Quiz Interactivo**
- **Ruta**: `/quiz`
- **Función**: Evaluaciones adaptativas
- **Características**: Múltiples tipos, feedback inmediato, puntuación

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run genkit:dev      # Servidor de IA
npm run build           # Build de producción
npm run start           # Servidor de producción

# Calidad de código
npm run lint            # ESLint
npm run typecheck       # TypeScript
```

## 📱 Estructura de Páginas

```
/                    → Landing page principal
/login              → Autenticación
/register           → Registro de usuario
/dashboard          → Panel de control
/chat-ia            → Chat con IA
/avatar             → Personalización
/quiz               → Evaluaciones
/oportunidades      → Oportunidades educativas
/comic-digitales    → Contenido multimedia
```

## 🎨 Personalización Rápida

### **Cambiar Colores**
```typescript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#tu_color_aqui',      // Color principal
        secondary: '#tu_color_aqui',    // Color secundario
        accent: '#tu_color_aqui',       // Color de acento
      }
    }
  }
}
```

### **Modificar Componentes**
```typescript
// src/components/landing/hero.tsx
export function Hero() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-primary to-secondary">
      {/* Tu contenido personalizado aquí */}
    </section>
  );
}
```

## 🚨 Solución de Problemas Comunes

### **Error: "Google API Key no válida"**
```bash
# Verificar variable de entorno
echo $GOOGLE_API_KEY

# Reiniciar servidor
npm run dev
```

### **Error: "Firebase no configurado"**
```bash
# Verificar archivo .env.local
cat .env.local | grep FIREBASE

# Verificar en Firebase Console
# https://console.firebase.google.com
```

### **Error: "Puerto 9002 ocupado"**
```bash
# Cambiar puerto en package.json
"dev": "next dev --turbopack -p 9003"

# O matar proceso en puerto 9002
npx kill-port 9002
```

## 📚 Próximos Pasos

### **Para Desarrolladores**
1. **Explorar** la estructura del proyecto
2. **Revisar** componentes en `src/components/`
3. **Configurar** tu entorno de desarrollo
4. **Crear** tu primera funcionalidad

### **Para Usuarios**
1. **Probar** el chat con IA
2. **Personalizar** tu avatar
3. **Explorar** el dashboard
4. **Tomar** algunos quiz

### **Para Contribuidores**
1. **Fork** el repositorio
2. **Crear** una rama para tu feature
3. **Implementar** tu funcionalidad
4. **Enviar** un Pull Request

## 🌟 Características Destacadas

- **🎨 Diseño Inmersivo**: Fondo espacial con partículas animadas
- **🤖 IA Avanzada**: Integración con Google Gemini AI
- **📱 Responsivo**: Funciona en todos los dispositivos
- **🔐 Seguro**: Autenticación con Firebase
- **⚡ Rápido**: Next.js 15 con Turbopack
- **🎯 Accesible**: Componentes Radix UI

## 📞 ¿Necesitas Ayuda?

- **📖 Documentación**: [README.md](../README.md)
- **🔧 Instrucciones**: [INSTRUCCIONES.md](./INSTRUCCIONES.md)
- **🐛 Issues**: [GitHub Issues](https://github.com/tu-usuario/KallpaWarmIA/issues)
- **💬 Comunidad**: [Discord](https://discord.gg/tu-servidor)

---

## 🎉 ¡Listo para Empezar!

Has configurado KallpaWarmIA exitosamente. Ahora puedes:

- 🚀 **Desarrollar** nuevas funcionalidades
- 🎨 **Personalizar** la interfaz
- 🤖 **Probar** el chat con IA
- 👥 **Contribuir** al proyecto

¡Que tengas una excelente experiencia con KallpaWarmIA! ✨

---

*¿Te gustó esta guía? ¡Considera darle una ⭐ al repositorio!*
