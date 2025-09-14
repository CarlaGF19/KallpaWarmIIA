'use client';

import React, { useState } from 'react';
// Solo emojis, sin íconos de Lucide React

interface StatCard {
  id: string;
  emoji: string;
  value: string | number;
  label: string;
  tooltip: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  accentColor: string;
  bgGradient: string;
}

const StatsHUD: React.FC = () => {
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  const stats: StatCard[] = [
    {
      id: 'points',
      emoji: '⚡',
      value: '15.2K',
      label: 'Puntos',
      tooltip: 'XP total acumulado a través de misiones, minijuegos y actividades completadas',
      change: '+2.1K',
      changeType: 'positive',
      accentColor: 'text-yellow-300',
      bgGradient: 'from-yellow-400/20 to-amber-500/20'
    },
    {
      id: 'weekly-progress',
      emoji: '📈',
      value: '87%',
      label: 'Progreso semanal',
      tooltip: 'Porcentaje de objetivos semanales completados. Meta: 100% cada semana',
      change: '+15%',
      changeType: 'positive',
      accentColor: 'text-yellow-300',
      bgGradient: 'from-yellow-400/20 to-yellow-500/20'
    },
    {
      id: 'challenges-completed',
      emoji: '🧩',
      value: '24',
      label: 'Retos completados',
      tooltip: 'Número total de retos y desafíos completados exitosamente este mes',
      change: '+8',
      changeType: 'positive',
      accentColor: 'text-yellow-300',
      bgGradient: 'from-yellow-500/20 to-amber-600/20'
    },
    {
      id: 'streak',
      emoji: '🔥',
      value: '12',
      label: 'Racha',
      tooltip: 'Días consecutivos completando al menos una actividad. ¡Mantén el ritmo!',
      change: '+3 días',
      changeType: 'positive',
      accentColor: 'text-yellow-300',
      bgGradient: 'from-yellow-400/20 to-amber-500/20'
    }
  ];

  const getChangeColor = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return 'text-green-400';
      case 'negative':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getChangeIcon = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return '▲';
      case 'negative':
        return '▼';
      default:
        return '●';
    }
  };

  return (
    <div className="w-full">
      {/* Título de la sección */}
      <div className="mb-4">
        <h3 className="text-lg font-bold text-white">
          Estadísticas HUD
        </h3>
        <p className="text-sm text-white/70 mt-1">Tu rendimiento en tiempo real</p>
      </div>

      {/* Grid responsivo de mini-cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => {
          const isHovered = hoveredStat === stat.id;
          
          return (
            <div
              key={stat.id}
              className="relative group"
              onMouseEnter={() => setHoveredStat(stat.id)}
              onMouseLeave={() => setHoveredStat(null)}
            >
              {/* Mini-card */}
              <div className={`
                relative bg-white/5 backdrop-blur-sm rounded-xl p-4
                hover:bg-white/10 hover:shadow-lg
                transition-all duration-300 cursor-pointer
                bg-gradient-to-br ${stat.bgGradient}
              `}>
                {/* Brillo sutil en hover */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Contenido */}
                <div className="relative z-10">
                  {/* Header con icono y emoji */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`text-2xl ${stat.accentColor}`}>{stat.emoji}</span>
                    </div>
                    <div className={`text-xs font-medium ${getChangeColor(stat.changeType)} flex items-center gap-1`}>
                      <span className="text-[10px]">{getChangeIcon(stat.changeType)}</span>
                      {stat.change}
                    </div>
                  </div>

                  {/* Valor principal */}
                  <div className="mb-2">
                    <div className="text-2xl font-bold text-white group-hover:text-white/90 transition-colors">
                      {stat.value}
                    </div>
                  </div>

                  {/* Label */}
                  <div className="text-sm font-medium text-white/80 group-hover:text-white/90 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </div>

              {/* Tooltip */}
              <div className={`
                absolute -top-16 left-1/2 transform -translate-x-1/2 z-50
                bg-cosmic-void/95 backdrop-blur-sm text-gaming-cyan text-xs px-3 py-2 rounded-lg border border-gaming-purple-neon/40 glow-purple
                max-w-xs text-center
                transition-all duration-300 pointer-events-none
                ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
              `}>
                {stat.tooltip}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-cosmic-void/95" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsHUD;