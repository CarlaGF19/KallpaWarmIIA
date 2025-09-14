'use client';

import React, { useState } from 'react';
// Solo emojis, sin íconos de Lucide React
import { Button } from '@/components/ui/button';

interface GameHeaderProps {
  playerLevel?: number;
  playerName?: string;
  currentStreak?: number;
  notifications?: number;
  activeCosmicChallenge?: {
    title: string;
    category: 'exploration' | 'science' | 'creativity' | 'innovation';
    progress: number;
    maxProgress: number;
  };
}

export default function GameHeader({
  playerLevel = 1,
  playerName = "Exploradora Wami",
  currentStreak = 1,
  notifications = 3,
  activeCosmicChallenge = {
    title: "Reto: Descubre a una pionera STEM",
    category: 'exploration' as const,
    progress: 3,
    maxProgress: 5
  }
}: GameHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Función para obtener ícono de categoría
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exploration': return '🚀';
      case 'science': return '🔬';
      case 'creativity': return '🎨';
      case 'innovation': return '💡';
      default: return '✨';
    }
  };

  // Función para obtener gradiente de categoría
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'exploration': return 'bg-gradient-to-r from-gaming-purple-base to-gaming-cyan-neon';
      case 'science': return 'bg-gradient-to-r from-gaming-cyan-base to-gaming-cyan-electric';
      case 'creativity': return 'bg-gradient-to-r from-gaming-pink-base to-gaming-purple-bright';
      case 'innovation': return 'bg-gradient-to-r from-gaming-purple-neon to-gaming-pink-neon';
      default: return 'bg-gradient-to-r from-gaming-purple-base to-gaming-cyan-neon';
    }
  };

  return (
    <header className="w-full">
      {/* Contenedor principal con cápsulas glossy */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-6">
        
        {/* Cápsula de Nivel 🚀 - Con efectos hover mejorados */}
        <div className="glossy-capsule level-capsule group cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-[#7C3AED]/50 transition-all duration-300" onClick={() => setShowProfile(!showProfile)}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-xl group-hover:animate-pulse group-hover:shadow-2xl group-hover:shadow-purple-500/60 transition-all duration-300">
                {playerName.charAt(0)}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-cosmic-void text-xs font-bold px-2 py-1 rounded-full shadow-lg group-hover:animate-bounce group-hover:shadow-yellow-400/60 transition-all duration-300">
                {playerLevel}
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white flex items-center gap-2 group-hover:text-[#FACC15] transition-colors duration-300">
                <span className="group-hover:animate-bounce">🚀</span> Nivel {playerLevel}
              </span>
              <span className="text-xs text-white/80 font-medium group-hover:text-white transition-colors duration-300">{playerName}</span>
            </div>
          </div>
        </div>

        {/* Cápsula de Racha 🔥 - Con efectos hover mejorados */}
        <div className="glossy-capsule streak-capsule group hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-lg group-hover:animate-pulse group-hover:shadow-orange-500/80 transition-all duration-300">
              <span className="group-hover:animate-bounce group-hover:scale-125 transition-all duration-300">🔥</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-white/70 font-medium group-hover:text-orange-300 transition-colors duration-300">Racha</span>
              <span className="text-sm font-bold text-white group-hover:text-[#FACC15] transition-colors duration-300">{currentStreak} días</span>
            </div>
          </div>
        </div>

        {/* Cápsula de Notificaciones 🔔 - Con efectos hover mejorados */}
        <div className="glossy-capsule notifications-capsule group cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300" onClick={() => setShowNotifications(!showNotifications)}>
          <div className="relative flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg group-hover:animate-pulse group-hover:shadow-blue-500/80 transition-all duration-300">
              <span className="group-hover:animate-bounce group-hover:scale-125 transition-all duration-300">🔔</span>
            </div>
            {notifications > 0 && (
              <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse group-hover:animate-bounce group-hover:bg-red-400 group-hover:shadow-red-500/60 transition-all duration-300">
                {notifications > 9 ? '9+' : notifications}
              </div>
            )}
            <span className="text-sm font-bold text-white hidden sm:block group-hover:text-[#22D3EE] transition-colors duration-300">{notifications}</span>
          </div>
        </div>

        {/* Cápsula de Reto Cósmico ✨ - XP Bar más corta y mejorada */}
        {activeCosmicChallenge && (
          <div className="glossy-capsule cosmic-challenge-capsule max-w-[280px] group hover:scale-105 transition-all duration-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-holographic-primary flex items-center justify-center shadow-lg animate-holographic group-hover:animate-bounce">
                {getCategoryIcon(activeCosmicChallenge.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gaming-cyan font-medium truncate group-hover:text-white transition-colors duration-300">Reto Cósmico Activo</span>
                  <span className="text-xs font-bold text-white group-hover:text-[#FACC15] transition-colors duration-300">
                    {activeCosmicChallenge.progress}/{activeCosmicChallenge.maxProgress}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-2 truncate group-hover:text-[#EC4899] transition-colors duration-300">{activeCosmicChallenge.title}</h4>
                {/* XP Bar más corta con degradado animado (verde → amarillo → naranja) */}
                <div className="relative w-full h-4 bg-black/60 rounded-full overflow-hidden border border-[#7C3AED]/40 group-hover:border-[#7C3AED]/80 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-[#22C55E] via-[#FACC15] to-[#FB923C] group-hover:shadow-lg group-hover:shadow-[#FACC15]/50"
                    style={{ 
                      width: `${(activeCosmicChallenge.progress / activeCosmicChallenge.maxProgress) * 100}%`,
                      boxShadow: '0 0 15px rgba(34, 197, 94, 0.6), inset 0 0 10px rgba(255, 255, 255, 0.2)'
                    }}
                  />
                  {/* Partículas animadas en la barra */}
                  {activeCosmicChallenge.progress > 0 && (
                    <div className="absolute inset-0 pointer-events-none">
                      {[...Array(Math.floor((activeCosmicChallenge.progress / activeCosmicChallenge.maxProgress) * 5))].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                          style={{
                            left: `${(i + 1) * (100 / Math.floor((activeCosmicChallenge.progress / activeCosmicChallenge.maxProgress) * 5))}%`,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            animationDelay: `${i * 0.4}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                  {/* Planeta orbitando mejorado */}
                  <div 
                    className="absolute top-1/2 w-5 h-5 -mt-2.5 transition-all duration-700 ease-out group-hover:scale-125"
                    style={{ left: `${Math.max(0, Math.min(92, (activeCosmicChallenge.progress / activeCosmicChallenge.maxProgress) * 100 - 2.5))}%` }}
                  >
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FACC15] to-[#EC4899] shadow-lg animate-pulse group-hover:animate-spin" style={{
                      boxShadow: '0 0 12px rgba(236, 72, 153, 0.8)'
                    }}>
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dropdowns */}
      {showNotifications && (
        <div className="absolute top-full right-4 mt-2 w-80 card-glass p-4 z-50">
          <h3 className="text-sm font-medium text-white mb-3">Notificaciones</h3>
          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white">¡Completaste tu racha de 7 días!</p>
              <p className="text-xs text-white/60 mt-1">Hace 2 horas</p>
            </div>
            <div className="p-3 rounded-lg bg-white/5">
              <p className="text-sm text-white">Nueva insignia desbloqueada</p>
              <p className="text-xs text-white/60 mt-1">Hace 1 día</p>
            </div>
          </div>
        </div>
      )}

      {showProfile && (
        <div className="absolute top-full right-4 mt-2 w-64 card-glass p-4 z-50">
          <div className="space-y-3">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white font-bold text-2xl">
                {playerName.charAt(0)}
              </div>
              <h3 className="text-sm font-medium text-white mt-2">{playerName}</h3>
              <p className="text-xs text-white/60">Nivel {playerLevel}</p>
            </div>
            <div className="pt-3">
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                Ver perfil completo
              </Button>
              <Button variant="ghost" className="w-full justify-start text-white hover:bg-white/10">
                Configuración
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}