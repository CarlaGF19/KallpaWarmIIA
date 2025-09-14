'use client';

import { useState } from 'react';
// Solo emojis, sin íconos de Lucide React

interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  emoji: string;
  available: number;
  isNew?: boolean;
  isPopular?: boolean;
  isLocked?: boolean;
  href: string;
  badgeText?: string;
  badgeIcon?: string;
  color: string;
}

interface QuickAccessColumnProps {
  className?: string;
}

// Solo 3 accesos principales con estética gaming y lenguaje inclusivo femenino
const quickAccessItems: QuickAccessItem[] = [
  {
    id: 'minigames',
    title: 'Minijuegos',
    description: 'Desafíos para Guerreras',
    emoji: '🎮',
    available: 15,
    isNew: true,
    badgeText: '🔥 NUEVO',
    badgeIcon: '🔥',
    href: 'https://gamificacion-kallpaia-kappa.vercel.app/',
    color: 'from-[#22C55E] to-[#FACC15]'
  },
  {
    id: 'vocational-test',
    title: 'Test Vocacional',
    description: 'Descubre tu destino de Exploradora',
    emoji: '🧠',
    available: 3,
    isPopular: true,
    badgeText: '⭐ Popular',
    badgeIcon: '⭐',
    href: '/quiz/vocacional',
    color: 'from-[#3B82F6] to-[#7C3AED]'
  },
  {
    id: 'mentoring',
    title: 'Mentorías',
    description: 'Exploradora, conecta con tu guía cósmica',
    emoji: '👩‍🏫',
    available: 6,
    badgeText: '🌟 Guías',
    badgeIcon: '🌟',
    href: '/mentorias',
    color: 'from-[#EC4899] to-[#7C3AED]'
  }
];

export default function QuickAccessColumn({ className = '' }: QuickAccessColumnProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className={`w-full max-w-full overflow-hidden ${className}`} style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a0033 25%, #000066 50%, #330066 75%, #000000 100%)',
      borderRadius: '16px',
      padding: '16px',
      border: '2px solid rgba(124, 58, 237, 0.3)',
      boxShadow: '0 0 30px rgba(124, 58, 237, 0.2), inset 0 0 20px rgba(124, 58, 237, 0.1)'
    }}>
      {/* Header gaming con lenguaje inclusivo */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2 drop-shadow-lg">
          <span className="text-[#EC4899] animate-pulse text-xl" style={{filter: 'drop-shadow(0 0 4px #EC4899)'}}>✨</span>
          <span className="bg-gradient-to-r from-[#EC4899] to-[#7C3AED] bg-clip-text text-transparent flex items-center gap-2">
            Accesos
            <span className="text-[#FACC15] text-xl">⚡</span>
          </span>
        </h3>
        <p className="text-xs text-white/80 mt-1 font-medium">Tu arsenal de aventuras cósmicas</p>
      </div>
      
      {/* Estrellas de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        {[...Array(12)].map((_, i) => (
          <div
            key={`menu-star-${i}`}
            className="absolute text-white/30 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.4}s`,
              fontSize: `${0.4 + Math.random() * 0.3}rem`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Fila horizontal 1x3 - Botones arcade rectangulares */}
      <div className="relative z-10 flex gap-3 w-full mb-3">
        {quickAccessItems.map((item) => {
          const isHovered = hoveredItem === item.id;
          
          return (
            <button
              key={item.id}
              className={`
                relative group flex-1 rounded-2xl overflow-hidden transition-all duration-500
                hover:scale-105 hover:-translate-y-2 hover:rotate-1
                focus:outline-none focus:ring-4 focus:ring-[#7C3AED]/50
                ${item.isLocked ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              onClick={() => {
                if (!item.isLocked) {
                  if (item.href.startsWith('http')) {
                    window.open(item.href, '_blank', 'noopener,noreferrer');
                  } else {
                    window.location.href = item.href;
                  }
                }
              }}
              disabled={item.isLocked}
              style={{
                background: `linear-gradient(135deg, ${item.color.replace('from-', '').replace('to-', ', ')})`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: isHovered 
                  ? `0 0 40px rgba(124, 58, 237, 0.8), 0 0 80px rgba(236, 72, 153, 0.6), inset 0 0 30px rgba(255, 255, 255, 0.3), 0 20px 40px rgba(0, 0, 0, 0.3)`
                  : '0 0 20px rgba(124, 58, 237, 0.4), inset 0 0 15px rgba(255, 255, 255, 0.2), 0 10px 20px rgba(0, 0, 0, 0.2)',
                border: '4px solid rgba(255, 255, 255, 0.4)',
                minHeight: '100px',
                maxHeight: '100px'
              }}
            >
              {/* Efecto glass + glow gaming */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-white/20" />
              
              {/* Badge dinámico */}
              {(item.isNew || item.isPopular || item.badgeText) && (
                <div className="absolute -top-1 -right-1 z-20">
                  <div className="bg-gradient-to-r from-[#FACC15] to-[#EC4899] text-black text-xs font-bold px-2 py-1 rounded-full border-2 border-white/50 animate-pulse" style={{
                    boxShadow: '0 0 10px rgba(236, 72, 153, 0.8)',
                    fontSize: '0.6rem'
                  }}>
                    {item.badgeIcon}
                  </div>
                </div>
              )}
              
              {/* Contenido del botón - Optimizado para fila horizontal */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-4 text-center">
                {/* Icono más grande para desktop */}
                <div className={`
                  relative flex items-center justify-center w-14 h-14 mb-2 rounded-xl transition-all duration-300
                  ${isHovered ? 'scale-125 rotate-12' : 'scale-100'}
                `} style={{
                  background: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(15px)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  boxShadow: 'inset 0 2px 0 rgba(255, 255, 255, 0.5), 0 6px 20px rgba(0, 0, 0, 0.4)'
                }}>
                  {item.isLocked ? (
                    <span className="text-4xl text-white/70">🔒</span>
                  ) : (
                    <span className="text-4xl drop-shadow-lg" style={{filter: 'drop-shadow(0 0 6px rgba(255, 255, 255, 0.9))'}}>{item.emoji}</span>
                  )}
                  
                  {/* Efecto de pulso gaming */}
                  {!item.isLocked && (
                    <div className="absolute inset-0 rounded-xl bg-white/30 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                  )}
                </div>
                
                {/* Título más legible para desktop */}
                <h4 className="font-bold text-white text-sm leading-tight drop-shadow-lg group-hover:text-[#FACC15] transition-colors duration-300 text-center mb-1" style={{
                  textShadow: '0 0 10px rgba(0, 0, 0, 0.9)',
                  fontSize: '0.85rem'
                }}>
                  {item.title}
                </h4>
                
                {/* Contador disponibles más compacto */}
                {!item.isLocked && (
                  <div className="inline-flex items-center gap-1 bg-black/50 rounded-full px-2 py-0.5 backdrop-blur-sm border border-[#22C55E]/30" style={{
                    boxShadow: '0 0 15px rgba(34, 197, 94, 0.4)'
                  }}>
                    <div className="w-2 h-2 bg-[#22C55E] rounded-full animate-pulse" style={{
                      boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)'
                    }} />
                    <span className="text-xs text-[#22C55E] font-bold" style={{fontSize: '0.7rem', textShadow: '0 0 4px rgba(34, 197, 94, 0.8)'}}>
                      {item.available} disponibles
                    </span>
                  </div>
                )}
              </div>
              
              {/* Efectos de partículas en hover mejorado */}
              {isHovered && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute text-white/80 animate-ping"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.1}s`,
                        fontSize: '0.5rem'
                      }}
                    >
                      ✨
                    </div>
                  ))}
                </div>
              )}
              
              {/* Glow verde de disponibilidad */}
              <div className="absolute inset-0 rounded-2xl bg-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Brillo gaming */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
            </button>
          );
        })}
      </div>

      {/* Footer gaming mejorado */}
      <div className="relative z-10 mt-6 p-4 bg-black/50 backdrop-blur-sm rounded-2xl text-center border-2 border-[#7C3AED]/40" style={{
        boxShadow: '0 0 25px rgba(124, 58, 237, 0.3), inset 0 0 15px rgba(124, 58, 237, 0.1)'
      }}>
        <div className="text-white/80 text-sm">
          <div className="flex items-center justify-center gap-3 mb-2">
            <span className="text-[#EC4899] animate-pulse text-lg" style={{filter: 'drop-shadow(0 0 4px #EC4899)'}}>✨</span>
            <span className="font-bold bg-gradient-to-r from-[#EC4899] to-[#7C3AED] bg-clip-text text-transparent text-base">
              ¡Tu arsenal de Exploradora está listo!
            </span>
            <span className="text-[#EC4899] animate-pulse text-lg" style={{filter: 'drop-shadow(0 0 4px #EC4899)'}}>✨</span>
          </div>
          <p className="text-white/60 font-medium" style={{fontSize: '0.75rem'}}>Conquista el cosmos con cada aventura, Guerrera 🌟</p>
        </div>
        
        {/* Partículas de fondo mejoradas */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={`footer-particle-${i}`}
              className="absolute text-[#7C3AED]/40 animate-float"
              style={{
                top: `${20 + Math.random() * 60}%`,
                left: `${15 + Math.random() * 70}%`,
                animationDelay: `${i * 0.3}s`,
                fontSize: '0.5rem',
                filter: 'drop-shadow(0 0 3px currentColor)'
              }}
            >
              💫
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}