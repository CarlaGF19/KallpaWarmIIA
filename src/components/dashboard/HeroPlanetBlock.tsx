'use client';

import { useState } from 'react';
import { Rocket, Zap, Target, Star, Activity, Play, Compass, Sparkles } from 'lucide-react';

interface HeroPlanetBlockProps {
  playerLevel?: number;
  currentXP?: number;
  maxXP?: number;
  planetType?: 'earth' | 'mars' | 'jupiter' | 'saturn';
  activeMissions?: number;
}

export default function HeroPlanetBlock({
  playerLevel = 12,
  currentXP = 2450,
  maxXP = 3000,
  planetType = 'earth',
  activeMissions = 3
}: HeroPlanetBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const xpPercentage = (currentXP / maxXP) * 100;

  // Paleta cósmica neón gaming
  const planetColors = {
    earth: 'from-[#3B82F6] via-[#22C55E] to-[#7C3AED]',
    mars: 'from-[#EC4899] via-[#FACC15] to-[#3B82F6]',
    jupiter: 'from-[#FACC15] via-[#EC4899] to-[#7C3AED]',
    saturn: 'from-[#7C3AED] via-[#EC4899] to-[#22C55E]'
  };

  const planetEmoji = {
    earth: '🌍',
    mars: '🔴', 
    jupiter: '🟠',
    saturn: '🪐'
  };

  // Posiciones fijas para estrellas de fondo (evita hydration mismatch)
  const backgroundStars = [
    { top: 25.7, left: 47.0, delay: 0, size: 0.88 },
    { top: 4.8, left: 95.9, delay: 0.3, size: 0.74 },
    { top: 71.6, left: 98.5, delay: 0.6, size: 0.63 },
    { top: 41.3, left: 93.3, delay: 0.9, size: 0.91 },
    { top: 46.5, left: 17.0, delay: 1.2, size: 0.55 },
    { top: 35.3, left: 27.0, delay: 1.5, size: 0.82 },
    { top: 95.1, left: 67.3, delay: 1.8, size: 0.85 },
    { top: 62.0, left: 45.5, delay: 2.1, size: 0.65 },
    { top: 54.9, left: 56.3, delay: 2.4, size: 0.55 },
    { top: 31.2, left: 99.9, delay: 2.7, size: 0.96 },
    { top: 55.8, left: 88.6, delay: 3.0, size: 0.61 },
    { top: 52.3, left: 60.4, delay: 3.3, size: 0.61 },
    { top: 28.7, left: 74.8, delay: 3.6, size: 0.72 },
    { top: 65.9, left: 34.8, delay: 3.9, size: 0.54 },
    { top: 42.0, left: 71.3, delay: 4.2, size: 0.74 }
  ];

  // Posiciones fijas para partículas cósmicas (evita hydration mismatch)
  const cosmicParticles = [
    { top: 30.0, left: 99.0, delay: 0, duration: 2, size: 0.64, particle: '✨', color: 'text-[#FACC15]' },
    { top: 20.6, left: 19.3, delay: 0.2, duration: 3, size: 0.72, particle: '⭐', color: 'text-[#EC4899]' },
    { top: 62.6, left: 10.1, delay: 0.4, duration: 4, size: 0.79, particle: '💫', color: 'text-[#7C3AED]' },
    { top: 40.2, left: 62.9, delay: 0.6, duration: 5, size: 0.81, particle: '🌟', color: 'text-[#22C55E]' },
    { top: 8.4, left: 24.3, delay: 0.8, duration: 2, size: 0.97, particle: '✨', color: 'text-[#3B82F6]' },
    { top: 22.2, left: 23.9, delay: 1.0, duration: 3, size: 0.97, particle: '⭐', color: 'text-[#FACC15]' },
    { top: 58.8, left: 6.0, delay: 1.2, duration: 4, size: 0.85, particle: '💫', color: 'text-[#EC4899]' },
    { top: 75.3, left: 45.2, delay: 1.4, duration: 5, size: 0.78, particle: '🌟', color: 'text-[#7C3AED]' },
    { top: 12.8, left: 88.9, delay: 1.6, duration: 2, size: 0.69, particle: '✨', color: 'text-[#22C55E]' },
    { top: 89.4, left: 77.1, delay: 1.8, duration: 3, size: 0.91, particle: '⭐', color: 'text-[#3B82F6]' },
    { top: 45.7, left: 15.6, delay: 2.0, duration: 4, size: 0.66, particle: '💫', color: 'text-[#FACC15]' },
    { top: 67.2, left: 92.4, delay: 2.2, duration: 5, size: 0.88, particle: '🌟', color: 'text-[#EC4899]' },
    { top: 33.5, left: 38.7, delay: 2.4, duration: 2, size: 0.75, particle: '✨', color: 'text-[#7C3AED]' },
    { top: 81.9, left: 65.3, delay: 2.6, duration: 3, size: 0.82, particle: '⭐', color: 'text-[#22C55E]' },
    { top: 18.1, left: 51.8, delay: 2.8, duration: 4, size: 0.71, particle: '💫', color: 'text-[#3B82F6]' },
    { top: 52.4, left: 83.2, delay: 3.0, duration: 5, size: 0.93, particle: '🌟', color: 'text-[#FACC15]' },
    { top: 26.7, left: 29.5, delay: 3.2, duration: 2, size: 0.68, particle: '✨', color: 'text-[#EC4899]' },
    { top: 73.8, left: 41.9, delay: 3.4, duration: 3, size: 0.86, particle: '⭐', color: 'text-[#7C3AED]' },
    { top: 39.6, left: 76.4, delay: 3.6, duration: 4, size: 0.77, particle: '💫', color: 'text-[#22C55E]' },
    { top: 84.2, left: 12.7, delay: 3.8, duration: 5, size: 0.89, particle: '🌟', color: 'text-[#3B82F6]' }
  ];

  // Colores dinámicos para XP bar
  const getXPBarColor = () => {
    if (xpPercentage < 33) return 'from-[#22C55E] to-[#FACC15]';
    if (xpPercentage < 66) return 'from-[#FACC15] to-[#EC4899]';
    return 'from-[#EC4899] to-[#7C3AED]';
  };

  return (
    <div className="relative w-full max-w-full">
      {/* Contenedor principal del planeta - REDUCIDO 25% */}
      <div 
        className="relative overflow-hidden transition-all duration-500 w-full max-w-full bg-black/80 backdrop-blur-xl border-2 border-[#7C3AED]/40 rounded-2xl p-3 sm:p-4 md:p-5 hover:border-[#7C3AED]/80 hover:shadow-2xl hover:shadow-[#7C3AED]/25"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a0033 25%, #000066 50%, #330066 75%, #000000 100%)',
          boxShadow: isHovered ? '0 0 40px rgba(124, 58, 237, 0.4), inset 0 0 20px rgba(124, 58, 237, 0.1)' : '0 0 20px rgba(124, 58, 237, 0.2)'
        }}
      >
        {/* Efectos de fondo cósmico mejorados */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-[#3B82F6]/15 to-[#EC4899]/20 rounded-2xl" />
        <div className="absolute top-2 right-2 w-12 h-12 bg-gradient-to-br from-[#FACC15]/30 to-[#EC4899]/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute bottom-4 left-4 w-10 h-10 bg-gradient-to-br from-[#22C55E]/30 to-[#3B82F6]/30 rounded-full blur-lg animate-pulse" style={{animationDelay: '1s'}} />
        
        {/* Estrellas de fondo animadas */}
        <div className="absolute inset-0 pointer-events-none">
          {backgroundStars.map((star, i) => (
            <div
              key={`bg-star-${i}`}
              className="absolute text-white/40 animate-twinkle"
              style={{
                top: `${star.top}%`,
                left: `${star.left}%`,
                animationDelay: `${star.delay}s`,
                fontSize: `${star.size}rem`
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Header del bloque - Lenguaje inclusivo femenino */}
        <div className="relative z-10 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2 drop-shadow-lg">
              <Sparkles className="h-5 w-5 text-[#EC4899] animate-pulse" />
              <span className="bg-gradient-to-r from-[#EC4899] to-[#7C3AED] bg-clip-text text-transparent">
                Planeta Ciber
              </span>
            </h2>
            {/* Chip de misiones mejorado con estética gaming */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#22C55E]/30 to-[#FACC15]/30 border-2 border-[#22C55E]/50 rounded-full px-3 py-1.5 backdrop-blur-sm hover:from-[#22C55E]/50 hover:to-[#FACC15]/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#22C55E]/30">
              <Activity className="h-3.5 w-3.5 text-[#22C55E] animate-pulse" />
              <span className="text-xs font-bold text-[#22C55E] drop-shadow-sm">{activeMissions} misiones activas</span>
              <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full animate-ping" />
            </div>
          </div>
        </div>

        {/* Visual del planeta gaming cósmico - REDUCIDO 25% */}
        <div className="relative z-10 flex flex-col items-center justify-center mb-4 md:mb-5 w-full max-w-full overflow-hidden">
          {/* Aura exterior del planeta con colores neón */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 max-w-full max-h-full rounded-full bg-gradient-radial from-[#7C3AED]/30 via-[#EC4899]/20 to-transparent animate-pulse" style={{animationDuration: '2s'}} />
          </div>
          
          {/* Anillos orbitales neón */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 max-w-full max-h-full border-2 border-[#3B82F6]/40 rounded-full animate-spin" style={{animationDuration: '15s'}} />
            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 max-w-full max-h-full border border-[#EC4899]/30 rounded-full animate-spin" style={{animationDuration: '10s', animationDirection: 'reverse'}} />
            <div className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 max-w-full max-h-full border border-[#22C55E]/20 rounded-full animate-spin" style={{animationDuration: '8s'}} />
          </div>
          
          {/* Esfera principal gaming con rotación */}
          <div 
            className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 max-w-full max-h-full rounded-full transform transition-all duration-700 animate-spin ${
              isHovered ? 'scale-125 animate-pulse' : 'scale-100'
            }`}
            style={{animationDuration: isHovered ? '1s' : '6s'}}
          >
            {/* Gradiente gaming neón base */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${planetColors[planetType]} shadow-2xl`} 
                 style={{
                   boxShadow: `0 0 30px rgba(124, 58, 237, 0.6), 0 0 60px rgba(236, 72, 153, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)`
                 }} />
            
            {/* Capa glossy gaming */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/50 via-white/30 to-transparent" />
            
            {/* Reflejo principal más intenso */}
            <div className="absolute top-1 left-2 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-white/80 rounded-full blur-sm animate-pulse" />
            
            {/* Reflejo secundario */}
            <div className="absolute top-2 right-2 w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white/60 rounded-full blur-sm" />
            
            {/* Emoji del planeta con glow gaming */}
            <div className="absolute inset-0 flex items-center justify-center text-lg sm:text-xl md:text-2xl filter drop-shadow-lg">
              <span className="animate-bounce" style={{animationDuration: '2s', textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'}}>
                {planetEmoji[planetType]}
              </span>
            </div>
            
            {/* Efecto de shimmer */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/30 to-transparent rotate-45 animate-shimmer" />
            </div>
            
            {/* Borde brillante */}
            <div className="absolute inset-0 rounded-full shadow-inner" />
          </div>
          
          {/* Partículas gaming cósmicas */}
          <div className="absolute inset-0 pointer-events-none">
            {cosmicParticles.map((particle, i) => (
              <div
                key={i}
                className={`absolute ${particle.color} animate-float opacity-80`}
                style={{
                  top: `${particle.top}%`,
                  left: `${particle.left}%`,
                  animationDelay: `${particle.delay}s`,
                  animationDuration: `${particle.duration}s`,
                  fontSize: `${particle.size}rem`,
                  filter: 'drop-shadow(0 0 4px currentColor)'
                }}
              >
                {particle.particle}
              </div>
            ))}
          </div>
          
          {/* Auroras gaming */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(3)].map((_, i) => (
              <div
                key={`aurora-${i}`}
                className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#EC4899]/30 to-transparent animate-pulse blur-sm"
                style={{
                  top: `${30 + i * 20}%`,
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: '3s'
                }}
              />
            ))}
          </div>
        </div>

        {/* Barra de progreso XP gaming con partículas */}
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#FACC15] animate-pulse" style={{filter: 'drop-shadow(0 0 4px #FACC15)'}} />
              <span className="text-white font-bold text-sm bg-gradient-to-r from-[#FACC15] to-[#EC4899] bg-clip-text text-transparent">
                Nivel {playerLevel} - Exploradora
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/90 font-medium">
              <span className="text-[#22C55E]">{currentXP.toLocaleString()}</span>
              <span className="text-white/60">/</span>
              <span className="text-[#7C3AED]">{maxXP.toLocaleString()} XP</span>
            </div>
          </div>
          
          {/* Barra de progreso gaming con animaciones */}
          <div className="relative group">
            <div className="relative h-3 bg-black/60 rounded-full overflow-hidden border border-[#7C3AED]/40 hover:border-[#7C3AED]/80 transition-all duration-300">
              <div 
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getXPBarColor()} rounded-full transition-all duration-1000 ease-out`}
                style={{ 
                  width: `${xpPercentage}%`,
                  boxShadow: '0 0 15px rgba(236, 72, 153, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
              
              {/* Partículas en la barra XP */}
              {xpPercentage > 10 && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(Math.floor(xpPercentage / 20))].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                      style={{
                        left: `${(i + 1) * (100 / Math.floor(xpPercentage / 20))}%`,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        animationDelay: `${i * 0.3}s`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {/* Tooltip gaming */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-black/95 backdrop-blur-sm text-[#3B82F6] text-xs px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none border-2 border-[#7C3AED]/60" style={{boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)'}}>
              <div className="text-center">
                <div className="font-bold text-[#FACC15]">{currentXP.toLocaleString()} / {maxXP.toLocaleString()} XP</div>
                <div className="text-[#EC4899] font-medium">{(maxXP - currentXP).toLocaleString()} XP para subir nivel</div>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/95" />
            </div>
          </div>
          
          {/* Indicador de progreso gaming */}
          <div className="text-center">
            <span className="text-xs text-white/80 font-bold bg-gradient-to-r from-[#22C55E] to-[#3B82F6] bg-clip-text text-transparent">
              {Math.round(xpPercentage)}% hasta el siguiente nivel de Exploradora
            </span>
          </div>
        </div>

        {/* CTAs gaming estilo cápsula */}
        <div className="relative z-10 mt-4 md:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-full">
          <button className="relative group bg-gradient-to-r from-[#22C55E]/30 to-[#FACC15]/30 hover:from-[#22C55E]/50 hover:to-[#FACC15]/50 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border-2 border-[#22C55E]/50 hover:border-[#22C55E]/80 hover:shadow-xl hover:shadow-[#22C55E]/40 focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 w-full max-w-full overflow-hidden hover:scale-105" style={{boxShadow: 'inset 0 0 20px rgba(34, 197, 94, 0.2)'}}>
            <div className="flex items-center justify-center gap-2 text-white min-w-0">
              <Play className="h-4 w-4 text-[#22C55E] group-hover:scale-125 group-hover:text-[#FACC15] transition-all duration-300 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px currentColor)'}} />
              <span className="font-bold text-sm group-hover:text-[#FACC15] transition-colors duration-300 truncate drop-shadow-sm">Misión</span>
            </div>
            {/* Efecto de energía */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#22C55E]/20 to-[#FACC15]/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
            {/* Brillo gaming */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
          </button>
          
          <button className="relative group bg-gradient-to-r from-[#3B82F6]/30 to-[#7C3AED]/30 hover:from-[#3B82F6]/50 hover:to-[#7C3AED]/50 backdrop-blur-sm rounded-full p-3 transition-all duration-300 border-2 border-[#3B82F6]/50 hover:border-[#3B82F6]/80 hover:shadow-xl hover:shadow-[#3B82F6]/40 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/50 w-full max-w-full overflow-hidden hover:scale-105" style={{boxShadow: 'inset 0 0 20px rgba(59, 130, 246, 0.2)'}}>
            <div className="flex items-center justify-center gap-2 text-white min-w-0">
              <Compass className="h-4 w-4 text-[#3B82F6] group-hover:scale-125 group-hover:text-[#7C3AED] transition-all duration-300 flex-shrink-0" style={{filter: 'drop-shadow(0 0 4px currentColor)'}} />
              <span className="font-bold text-sm group-hover:text-[#7C3AED] transition-colors duration-300 truncate drop-shadow-sm">Explorar Cosmos</span>
            </div>
            {/* Efecto de energía */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#3B82F6]/20 to-[#7C3AED]/20 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
            {/* Brillo gaming */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 animate-shimmer" />
          </button>
        </div>
      </div>
    </div>
  );
}