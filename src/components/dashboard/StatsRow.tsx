'use client';

import { useState } from 'react';
// Solo emojis, sin íconos de Lucide React

interface StatCard {
  id: string;
  title: string;
  value: string | number;
  subtitle: string;
  emoji: string;
  color: string;
  bgGradient: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  isAnimated?: boolean;
}

export default function StatsRow() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const statsCards: StatCard[] = [
    {
      id: 'challenges',
      title: 'Retos',
      value: 24,
      subtitle: 'Completados este mes',
      emoji: '🏆',
      color: 'text-yellow-400',
      bgGradient: 'from-yellow-500/20 to-orange-500/20',
      trend: 'up',
      trendValue: '+12%',
      isAnimated: true
    },
    {
      id: 'points',
      title: 'Puntos',
      value: '15.2K',
      subtitle: 'XP total acumulado',
      emoji: '⚡',
      color: 'text-blue-400',
      bgGradient: 'from-blue-500/20 to-cyan-500/20',
      trend: 'up',
      trendValue: '+2.1K',
      isAnimated: true
    },
    {
      id: 'progress',
      title: 'Progreso',
      value: '87%',
      subtitle: 'Objetivos mensuales',
      emoji: '📈',
      color: 'text-green-400',
      bgGradient: 'from-green-500/20 to-emerald-500/20',
      trend: 'up',
      trendValue: '+15%'
    },
    {
      id: 'streak',
      title: 'Racha',
      value: 12,
      subtitle: 'Días consecutivos',
      emoji: '🔥',
      color: 'text-red-400',
      bgGradient: 'from-red-500/20 to-pink-500/20',
      trend: 'up',
      trendValue: '+3 días',
      isAnimated: true
    }
  ];

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up':
        return <span className="text-green-400">↗️</span>;
      case 'down':
        return <span className="text-red-400">↘️</span>;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">Estadísticas HUD</h3>
        <p className="text-white/70 text-sm">Tu rendimiento en tiempo real</p>
      </div>

      {/* Grid de estadísticas autoajustables */}
      <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
        {statsCards.map((card, index) => (
          <div
            key={card.id}
            className="group relative flex-1 min-w-[280px] max-w-[320px]"
            onMouseEnter={() => setHoveredCard(card.id)}
            onMouseLeave={() => setHoveredCard(null)}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={`
              card-glass-sutil p-4 sm:p-6 
              transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden h-full
              ${hoveredCard === card.id ? 'transform-gpu' : ''}
            `}>
              {/* Efectos de fondo */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/10 to-transparent rounded-full transform translate-x-6 -translate-y-6" />
              
              {/* Contenido */}
              <div className="relative z-10">
                {/* Header con icono y trend */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`text-2xl group-hover:scale-110 transition-transform duration-300 ${card.isAnimated ? 'animate-pulse' : ''}`}>
                    {card.emoji}
                  </div>
                  {card.trend && (
                    <div className="flex items-center gap-1 bg-white/10 rounded-full px-2 py-1">
                      {getTrendIcon(card.trend)}
                      <span className={`text-xs font-medium ${
                        card.trend === 'up' ? 'text-green-400' : 
                        card.trend === 'down' ? 'text-red-400' : 'text-white/70'
                      }`}>
                        {card.trendValue}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Valor principal */}
                <div className="mb-2">
                  <div className="text-2xl sm:text-3xl font-bold text-white group-hover:scale-105 transition-transform duration-300 truncate">
                    {card.value}
                  </div>
                </div>
                
                {/* Título y subtítulo */}
                <div>
                  <h4 className="text-base sm:text-lg font-semibold text-white mb-1 truncate">
                    {card.title}
                  </h4>
                  <p className="text-white/70 text-xs sm:text-sm group-hover:text-white/90 transition-colors line-clamp-2">
                    {card.subtitle}
                  </p>
                </div>
              </div>

              {/* Barra de progreso para algunos cards */}
              {(card.id === 'progress' || card.id === 'streak') && (
                <div className="relative z-10 mt-4">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${card.bgGradient.replace('/20', '/60')} rounded-full transition-all duration-1000 ease-out`}
                      style={{ 
                        width: card.id === 'progress' ? '87%' : '75%',
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
          </div>
        ))}
      </div>

      {/* Resumen rápido */}
      <div className="mt-6 card-glass-sutil p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">Rendimiento General</h4>
            <p className="text-white/70 text-xs">Basado en tu actividad de los últimos 7 días</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400">A+</div>
            <div className="text-xs text-white/70">Excelente</div>
          </div>
        </div>
      </div>
    </div>
  );
}