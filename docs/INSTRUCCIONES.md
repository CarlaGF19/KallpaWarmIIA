# 📚 Instrucciones de Uso - KallpaWarmIA

## 🎯 Guía Rápida de Inicio

### **Para Desarrolladores**

#### **1. Configuración Inicial del Entorno**

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/KallpaWarmIA.git
cd KallpaWarmIA

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Ejecutar en desarrollo
npm run dev
```

#### **2. Estructura de Archivos Clave**

```
src/
├── app/                    # Páginas de Next.js (App Router)
│   ├── api/               # Endpoints de API
│   ├── dashboard/         # Panel de control
│   ├── chat-ia/          # Chat con IA
│   └── page.tsx          # Página principal
├── components/            # Componentes reutilizables
│   ├── landing/          # Componentes de la landing page
│   ├── dashboard/        # Componentes del dashboard
│   └── ui/               # Componentes base de UI
├── ai/                   # Configuración de IA
│   ├── genkit.ts         # Configuración de Genkit
│   └── providers/        # Proveedores de IA
└── lib/                  # Utilidades y configuraciones
```

### **Para Usuarios Finales**

#### **1. Acceso a la Plataforma**

1. **Navegar** a la URL de la aplicación
2. **Registrarse** con email y contraseña
3. **Verificar** tu cuenta (si es requerido)
4. **Iniciar sesión** en tu cuenta

#### **2. Navegación Principal**

- **🏠 Inicio**: Landing page con información general
- **📊 Dashboard**: Panel de control personal
- **💬 Chat IA**: Conversar con el asistente inteligente
- **👤 Avatar**: Personalizar tu personaje
- **❓ Quiz**: Tomar evaluaciones interactivas

## 🚀 Funcionalidades Detalladas

### **🤖 Chat con Inteligencia Artificial**

#### **Cómo Usar el Chat**

1. **Acceder** a la página `/chat-ia`
2. **Escribir** tu pregunta o consulta
3. **Enviar** el mensaje (Enter o botón)
4. **Recibir** respuesta de la IA
5. **Continuar** la conversación

#### **Tipos de Consultas Soportadas**

- **Educativas**: Conceptos, explicaciones, ejemplos
- **Técnicas**: Código, algoritmos, matemáticas
- **Creativas**: Historias, poemas, ideas
- **Analíticas**: Análisis de datos, estadísticas

#### **Comandos Especiales**

```
/help          - Mostrar comandos disponibles
/clear         - Limpiar historial de chat
/export        - Exportar conversación
/settings      - Configurar preferencias
```

### **📊 Dashboard Personal**

#### **Secciones del Dashboard**

1. **Resumen General**
   - Progreso del día
   - Actividad reciente
   - Logros desbloqueados

2. **Estadísticas**
   - Tiempo de estudio
   - Puntuaciones de quiz
   - Actividad semanal/mensual

3. **Accesos Rápidos**
   - Chat IA
   - Quiz disponibles
   - Recursos educativos

4. **Configuración**
   - Perfil personal
   - Preferencias de notificaciones
   - Configuración de privacidad

#### **Personalización del Dashboard**

- **Cambiar tema**: Claro/Oscuro
- **Reorganizar widgets**: Drag & drop
- **Añadir/remover secciones**: Configuración
- **Exportar datos**: Reportes personalizados

### **👤 Sistema de Avatar**

#### **Personalización Visual**

1. **Seleccionar** base del personaje
2. **Elegir** ropa y accesorios
3. **Aplicar** efectos neon
4. **Guardar** configuración

#### **Efectos Disponibles**

- **Partículas estelares**: Movimiento constante
- **Resplandor neon**: Efectos de luz
- **Animaciones**: Movimientos fluidos
- **Transiciones**: Cambios suaves

#### **Guardado y Sincronización**

- **Guardado automático** en la nube
- **Sincronización** entre dispositivos
- **Historial** de cambios
- **Respaldo** de configuraciones

### **❓ Sistema de Quiz**

#### **Tipos de Evaluación**

1. **Quiz de Múltiple Opción**
   - Preguntas con 4 opciones
   - Tiempo límite configurable
   - Feedback inmediato

2. **Quiz de Verdadero/Falso**
   - Preguntas simples
   - Respuesta rápida
   - Explicación de respuestas

3. **Quiz de Completar**
   - Espacios en blanco
   - Respuestas libres
   - Validación automática

#### **Proceso de Evaluación**

1. **Seleccionar** quiz disponible
2. **Leer** instrucciones
3. **Responder** preguntas
4. **Revisar** respuestas
5. **Ver** puntuación final
6. **Analizar** resultados

#### **Sistema de Puntuación**

- **Puntos base**: Por respuesta correcta
- **Bonificaciones**: Por velocidad
- **Penalizaciones**: Por respuestas incorrectas
- **Multiplicadores**: Por rachas correctas

## 🔧 Configuración Avanzada

### **Variables de Entorno**

#### **Configuración de IA**

```env
# Google Gemini AI
GOOGLE_API_KEY=tu_api_key_aqui
GOOGLE_MODEL=gemini-pro

# OpenAI (alternativo)
OPENAI_API_KEY=tu_api_key_aqui
OPENAI_MODEL=gpt-4

# Configuración de Genkit
GENKIT_ENVIRONMENT=development
GENKIT_LOG_LEVEL=info
```

#### **Configuración de Firebase**

```env
# Firebase Auth
NEXT_PUBLIC_FIREBASE_API_KEY=tu_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=tu_proyecto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=tu_proyecto_id

# Firebase Storage
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=tu_proyecto.appspot.com

# Firebase Messaging
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=tu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=tu_app_id
```

### **Configuración de Tailwind CSS**

#### **Colores Personalizados**

```javascript
// tailwind.config.ts
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#FFD740',      // Amarillo vibrante
        secondary: '#9400D3',    // Púrpura
        background: '#000000',   // Negro profundo
        surface: '#1a1a1a',      // Gris oscuro
        accent: '#00D4FF',       // Azul neon
      }
    }
  }
}
```

#### **Animaciones Personalizadas**

```css
/* globals.css */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes glow {
  0%, 100% { box-shadow: 0 0 5px currentColor; }
  50% { box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; }
}

.animate-float { animation: float 3s ease-in-out infinite; }
.animate-glow { animation: glow 2s ease-in-out infinite; }
```

## 🚨 Solución de Problemas

### **Problemas Comunes**

#### **1. Error de Conexión con IA**

**Síntomas:**
- Mensaje "Error de conexión"
- Respuestas lentas o nulas
- Timeout en requests

**Soluciones:**
```bash
# Verificar API key
echo $GOOGLE_API_KEY

# Revisar logs
npm run genkit:dev

# Reiniciar servidor
npm run dev
```

#### **2. Problemas de Autenticación**

**Síntomas:**
- No se puede iniciar sesión
- Error de Firebase
- Redirección infinita

**Soluciones:**
```bash
# Verificar configuración de Firebase
cat .env.local | grep FIREBASE

# Limpiar caché del navegador
# Verificar reglas de Firebase
```

#### **3. Errores de Build**

**Síntomas:**
- Error en `npm run build`
- TypeScript errors
- Dependencias faltantes

**Soluciones:**
```bash
# Limpiar node_modules
rm -rf node_modules package-lock.json

# Reinstalar dependencias
npm install

# Verificar tipos
npm run typecheck
```

### **Logs y Debugging**

#### **Habilitar Logs Detallados**

```bash
# Desarrollo con logs
DEBUG=* npm run dev

# Genkit con logs
npm run genkit:dev -- --log-level=debug

# TypeScript con logs
npm run typecheck -- --verbose
```

#### **Herramientas de Debug**

- **React DevTools**: Inspeccionar componentes
- **Next.js DevTools**: Analizar rendimiento
- **Browser DevTools**: Debug de frontend
- **Firebase Console**: Monitorear backend

## 📱 Optimización de Rendimiento

### **Frontend**

#### **Lazy Loading**

```typescript
// Componentes pesados
const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Skeleton />,
  ssr: false
});
```

#### **Optimización de Imágenes**

```typescript
import Image from 'next/image';

<Image
  src="/path/to/image.jpg"
  alt="Descripción"
  width={500}
  height={300}
  priority={false}
  placeholder="blur"
/>
```

### **Backend**

#### **Caché de Respuestas**

```typescript
// API con caché
export async function GET() {
  const cacheKey = 'api-response';
  const cached = await redis.get(cacheKey);
  
  if (cached) {
    return Response.json(JSON.parse(cached));
  }
  
  // ... lógica de API
}
```

#### **Rate Limiting**

```typescript
// Protección contra spam
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por ventana
};
```

## 🔒 Seguridad

### **Buenas Prácticas**

1. **Variables de Entorno**
   - Nunca commitear `.env.local`
   - Usar `.env.example` para plantillas
   - Rotar API keys regularmente

2. **Validación de Input**
   - Usar Zod para esquemas
   - Sanitizar datos de usuario
   - Validar en frontend y backend

3. **Autenticación**
   - Implementar JWT tokens
   - Usar HTTPS en producción
   - Implementar rate limiting

### **Configuración de Seguridad**

```typescript
// next.config.ts
const nextConfig = {
  security: {
    headers: [
      {
        key: 'X-Frame-Options',
        value: 'DENY'
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff'
      }
    ]
  }
};
```

## 📊 Monitoreo y Analytics

### **Métricas de Rendimiento**

- **Core Web Vitals**: LCP, FID, CLS
- **Tiempo de Respuesta**: API calls
- **Uso de Recursos**: CPU, memoria
- **Errores**: Rate de errores

### **Herramientas de Monitoreo**

- **Vercel Analytics**: Métricas de Next.js
- **Firebase Performance**: Rendimiento de app
- **Sentry**: Tracking de errores
- **Google Analytics**: Comportamiento de usuarios

## 🚀 Despliegue

### **Plataformas Soportadas**

1. **Vercel** (Recomendado)
2. **Netlify**
3. **Firebase Hosting**
4. **AWS Amplify**

### **Proceso de Despliegue**

```bash
# Build de producción
npm run build

# Verificar build
npm run start

# Desplegar en Vercel
vercel --prod

# Desplegar en Firebase
firebase deploy
```

### **Configuración de Producción**

```env
# Producción
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://tuapp.com
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 📚 Recursos Adicionales

### **Documentación Oficial**

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)

### **Comunidad y Soporte**

- [GitHub Issues](https://github.com/tu-usuario/KallpaWarmIA/issues)
- [Discord Community](https://discord.gg/tu-servidor)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/kallpawarmia)

### **Tutoriales y Ejemplos**

- [Getting Started Guide](./GETTING_STARTED.md)
- [API Reference](./API_REFERENCE.md)
- [Component Library](./COMPONENTS.md)
- [Best Practices](./BEST_PRACTICES.md)

---

## 🎉 ¡Felicidades!

Has completado la guía de instrucciones de KallpaWarmIA. Ahora estás listo para:

- 🚀 **Desarrollar** nuevas funcionalidades
- 🎨 **Personalizar** la interfaz
- 🔧 **Configurar** el entorno
- 📱 **Usar** todas las funcionalidades
- 🤝 **Contribuir** al proyecto

¡Que tengas una excelente experiencia con KallpaWarmIA! ✨
