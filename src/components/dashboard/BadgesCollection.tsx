"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Filter, Lock, Star } from 'lucide-react';

interface BadgesCollectionProps {
  className?: string;
}

const BadgesCollection: React.FC<BadgesCollectionProps> = ({ className = '' }) => {
  // Colección de Badges KallpaWarmIA
  const badgeData = [
    {
      id: 'exploradora-espacial',
      name: 'Exploradora Espacial',
      description: 'Completa tu primer reto en el Planeta Activo.',
      icon: '🚀',
      category: 'Exploración',
      rarity: 'common' as const,
      stars: 1,
      unlocked: true,
      unlockedDate: '15 Nov 2024',
      isNew: false,
      xpGained: 100,
      hint: 'Completa tu primer reto en el Planeta Activo.'
    },
    {
      id: 'inventora-creativa',
      name: 'Inventora Creativa',
      description: 'Diseña una solución STEAM con tu propio estilo.',
      icon: '⚙️',
      category: 'Innovación',
      rarity: 'rare' as const,
      stars: 2,
      unlocked: false,
      unlockedDate: '',
      isNew: false,
      xpGained: 200,
      hint: 'Diseña una solución STEAM con tu propio estilo.'
    },
    {
      id: 'guardiana-galactica',
      name: 'Guardiana Galáctica',
      description: 'Completa tu primer minijuego de ciberseguridad.',
      icon: '🛡️',
      category: 'Defensa Digital',
      rarity: 'epic' as const,
      stars: 3,
      unlocked: false,
      unlockedDate: '',
      isNew: false,
      xpGained: 300,
      hint: 'Completa tu primer minijuego de ciberseguridad.'
    },
    {
      id: 'maestra-tiempo',
      name: 'Maestra del Tiempo',
      description: 'Usa el Pomodoro para completar 3 sesiones seguidas.',
      icon: '⏳',
      category: 'Productividad',
      rarity: 'rare' as const,
      stars: 2,
      unlocked: true,
      unlockedDate: '14 Nov 2024',
      isNew: true,
      xpGained: 250,
      hint: 'Usa el Pomodoro para completar 3 sesiones seguidas.'
    },
    {
      id: 'astronoma-visionaria',
      name: 'Astrónoma Visionaria',
      description: 'Lee un artículo o cómic digital sobre el espacio.',
      icon: '🔭',
      category: 'Ciencia',
      rarity: 'common' as const,
      stars: 1,
      unlocked: false,
      unlockedDate: '',
      isNew: false,
      xpGained: 120,
      hint: 'Lee un artículo o cómic digital sobre el espacio.'
    },
    {
      id: 'mentora-cosmica',
      name: 'Mentora Cósmica',
      description: 'Ayuda a otra usuaria a completar una misión.',
      icon: '👩‍🏫',
      category: 'Comunidad',
      rarity: 'epic' as const,
      stars: 3,
      unlocked: false,
      unlockedDate: '',
      isNew: false,
      xpGained: 400,
      hint: 'Ayuda a otra usuaria a completar una misión.'
    },
    {
      id: 'ingeniera-estrellas',
      name: 'Ingeniera de Estrellas',
      description: 'Construye un prototipo con lógica o bio-estructuras.',
      icon: '🛰️',
      category: 'Tecnología',
      rarity: 'rare' as const,
      stars: 2,
      unlocked: false,
      unlockedDate: '',
      isNew: false,
      xpGained: 250,
      hint: 'Construye un prototipo con lógica o bio-estructuras.'
    },
    {
      id: 'leyenda-cosmica',
      name: 'Leyenda Cósmica',
      description: 'Llega al nivel 50 en KallpaWarmIA.',
      icon: '👑',
      category: 'Progreso',
      rarity: 'legendary' as const,
      stars: 5,
      unlocked: false,
      unlockedDate: '',
      isNew: false,
      xpGained: 500,
      hint: 'Llega al nivel 50 en KallpaWarmIA.'
    }
  ];

  // Estados y lógica del componente
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [showAll, setShowAll] = useState(false);
  const [focusedBadgeIndex, setFocusedBadgeIndex] = useState<number>(-1);
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filtrar badges por rareza
  const filteredBadges = badgeData.filter(badge => {
    if (selectedRarity === 'all') return true;
    return badge.rarity === selectedRarity;
  });

  // Mostrar badges limitados o todos
  const visibleBadges = showAll ? filteredBadges : filteredBadges.slice(0, 8);
  const hasMoreBadges = filteredBadges.length > 8;

  // Función para obtener el color del gradiente según la rareza - Paleta Cósmica KallpaWarmIA
  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'from-[#3B82F6] to-[#60A5FA]'; // ⭐ Común → Azul claro + glow celeste
      case 'rare':
        return 'from-[#7C3AED] to-[#A855F7]'; // 🌟 Rara → Morado brillante + partículas lilas
      case 'epic':
        return 'from-[#22C55E] to-[#10B981]'; // 💎 Épica → Verde/agua + efecto neón
      case 'legendary':
        return 'from-[#FACC15] via-[#F59E0B] to-[#FACC15]'; // 👑 Legendaria → Dorado brillante + resplandor animado
      default:
        return 'from-[#6B7280] to-[#9CA3AF]'; // Candados (bloqueados): gris metálico con opacidad 60%
    }
  };

  // Función para obtener el color del glow según la rareza
  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return 'shadow-[0_0_20px_rgba(59,130,246,0.5)]'; // Glow celeste
      case 'rare':
        return 'shadow-[0_0_25px_rgba(124,58,237,0.6)]'; // Partículas lilas
      case 'epic':
        return 'shadow-[0_0_30px_rgba(34,197,94,0.7)]'; // Efecto neón verde
      case 'legendary':
        return 'shadow-[0_0_35px_rgba(250,204,21,0.8)] animate-pulse'; // Resplandor animado dorado
      default:
        return 'shadow-none';
    }
  };

  // Función para obtener el texto de rareza
  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common':
        return '⭐ Común';
      case 'rare':
        return '🌟 Rara';
      case 'epic':
        return '💎 Épica';
      case 'legendary':
        return '👑 Legendaria';
      default:
        return 'Desconocida';
    }
  };

  // Manejo de teclado para navegación
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    const totalBadges = visibleBadges.length;
    let newIndex = index;

    switch (event.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % totalBadges;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + totalBadges) % totalBadges;
        break;
      case 'ArrowDown':
        newIndex = Math.min(index + 4, totalBadges - 1);
        break;
      case 'ArrowUp':
        newIndex = Math.max(index - 4, 0);
        break;
      case 'Enter':
      case ' ':
        event.preventDefault();
        // Expandir para mostrar detalles del badge
        return;
      default:
        return;
    }

    event.preventDefault();
    setFocusedBadgeIndex(newIndex);
    badgeRefs.current[newIndex]?.focus();
  };

  const handleBadgeClick = (badge: any) => {
    // Mostrar detalles del badge seleccionado
    // Badge seleccionado
  };

  // Si no hay badges disponibles
  if (badgeData.length === 0) {
    return (
      <div className={`bg-white/5 backdrop-blur-sm rounded-2xl p-6 text-center ${className}`}>
        <div className="text-purple-300 mb-4">
          <Sparkles className="w-12 h-12 mx-auto mb-2" />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">¡Comienza tu aventura!</h3>
        <p className="text-purple-200">
          Completa misiones y desafíos para desbloquear tus primeros badges cósmicos.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-[#0B0F19]/90 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 ${className}`} style={{background: 'linear-gradient(135deg, rgba(11, 15, 25, 0.95), rgba(124, 58, 237, 0.1), rgba(59, 130, 246, 0.1))'}}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-3xl font-bold text-white mb-2 flex items-center gap-3" style={{textShadow: '0 0 15px rgba(250, 204, 21, 0.6)'}}>
            <Sparkles className="w-8 h-8 text-[#FACC15] animate-pulse" />
            Colección de Badges
          </h2>
          <p className="text-[#FACC15] text-base font-medium">
            {badgeData.filter(b => b.unlocked).length} de {badgeData.length} desbloqueados
          </p>
        </div>

        {/* Filtro por rareza */}
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-[#FACC15]" />
          <select
            value={selectedRarity}
            onChange={(e) => setSelectedRarity(e.target.value)}
            className="bg-[#0B0F19]/80 border-2 border-[#FACC15]/50 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:border-[#FACC15] backdrop-blur-sm"
          >
            <option value="all" className="bg-[#0B0F19] text-white">Todas las rarezas</option>
            <option value="common" className="bg-[#0B0F19] text-white">⭐ Común</option>
            <option value="rare" className="bg-[#0B0F19] text-white">🌟 Rara</option>
            <option value="epic" className="bg-[#0B0F19] text-white">💎 Épica</option>
            <option value="legendary" className="bg-[#0B0F19] text-white">👑 Legendaria</option>
          </select>
        </div>
      </div>

      {/* Botón Ver más/menos */}
      {hasMoreBadges && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAll(!showAll)}
            className="bg-gradient-to-r from-[#FACC15] to-[#F59E0B] hover:from-[#F59E0B] hover:to-[#FACC15] text-[#0B0F19] px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-3 shadow-lg shadow-[#FACC15]/30 hover:scale-105 border-2 border-[#FACC15]/50"
          >
            <span className="text-xl">👁️</span>
            {showAll ? 'Ver menos' : `Ver todos (${filteredBadges.length})`}
          </button>
        </div>
      )}

      {/* Grid de badges - 3 por fila según especificaciones */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {visibleBadges.map((badge, index) => (
          <div
            key={badge.id}
            ref={(el) => (badgeRefs.current[index] = el)}
            tabIndex={0}
            className={`group relative bg-gradient-to-br ${getRarityGradient(badge.rarity)} p-[3px] rounded-2xl transition-all duration-300 hover:scale-105 ${getRarityGlow(badge.rarity)} hover:${getRarityGlow(badge.rarity)} focus:outline-none focus:ring-2 focus:ring-[#FACC15] focus:ring-offset-2 focus:ring-offset-[#0B0F19] ${
              !badge.unlocked ? 'opacity-60 grayscale' : ''
            } border-2 border-white/20`}
            onClick={() => handleBadgeClick(badge)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{
              perspective: '1000px',
            }}
          >
            {/* Badge Card - Glassmorphism con borde grueso */}
            <div className="bg-[#0B0F19]/80 backdrop-blur-md rounded-xl p-5 h-full min-h-[220px] flex flex-col justify-between relative overflow-hidden border border-white/10">
              {/* Efecto de brillo cósmico */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FACC15]/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              {/* Partículas cósmicas animadas */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-2 right-4 w-1 h-1 bg-[#FACC15] rounded-full animate-pulse" />
                <div className="absolute top-6 left-3 w-0.5 h-0.5 bg-white rounded-full animate-ping" />
                <div className="absolute bottom-4 right-2 w-1 h-1 bg-[#FACC15] rounded-full animate-pulse delay-300" />
              </div>
              
              {/* Badge desbloqueado/bloqueado */}
              <div className="absolute top-2 right-2">
                {badge.unlocked ? (
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                ) : (
                  <Lock className="w-5 h-5 text-gray-400" />
                )}
              </div>

              {/* Badge NUEVO - Fucsia brillante + pulso suave */}
              {badge.isNew && badge.unlocked && (
                <div className="absolute top-2 left-2 bg-gradient-to-r from-[#EC4899] to-[#F97316] text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse shadow-lg shadow-[#EC4899]/50">
                  🔥 ¡NUEVO!
                </div>
              )}

              {/* Icono del badge - Grande, colorido y centrado */}
              <div className="text-center mb-4">
                <div className="text-6xl mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 filter drop-shadow-lg">
                  {badge.unlocked ? badge.icon : '🔒'}
                </div>
                <div className="flex justify-center mb-2">
                  {[...Array(badge.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-[#FACC15] fill-current drop-shadow-sm" />
                  ))}
                </div>
              </div>

              {/* Información del badge */}
              <div className="text-center flex-grow">
                <h3 className="font-bold text-white text-base mb-2 line-clamp-2 drop-shadow-md" style={{textShadow: '0 0 10px rgba(250, 204, 21, 0.5)'}}>
                  {badge.name}
                </h3>
                <p className="text-sm text-[#FACC15] mb-2 font-semibold">
                  {getRarityText(badge.rarity)}
                </p>
                <p className="text-xs text-white/80 mb-2 line-clamp-2">
                  {badge.category}
                </p>
              </div>

              {/* XP y fecha - Colores dinámicos */}
              <div className="text-center mt-auto">
                <div className="text-sm font-bold mb-2 bg-gradient-to-r from-[#22C55E] to-[#FACC15] bg-clip-text text-transparent">
                  +{badge.xpGained} XP
                </div>
                {badge.unlocked && badge.unlockedDate && (
                  <div className="text-xs text-[#FACC15] font-medium">
                    {badge.unlockedDate}
                  </div>
                )}
                {!badge.unlocked && (
                  <div className="text-xs text-[#6B7280] italic opacity-80">
                    {badge.hint}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Estadísticas */}
      <div className="mt-8 pt-6 border-t border-[#FACC15]/20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-[#0B0F19]/60 rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-white mb-1" style={{textShadow: '0 0 10px rgba(250, 204, 21, 0.5)'}}>
              {badgeData.filter(b => b.unlocked).length}
            </div>
            <div className="text-sm text-[#FACC15] font-medium">Desbloqueados</div>
          </div>
          <div className="bg-[#0B0F19]/60 rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#22C55E] to-[#FACC15] bg-clip-text text-transparent mb-1">
              {badgeData.filter(b => b.unlocked).reduce((sum, b) => sum + b.xpGained, 0)}
            </div>
            <div className="text-sm text-[#FACC15] font-medium">XP Total</div>
          </div>
          <div className="bg-[#0B0F19]/60 rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-[#7C3AED] mb-1" style={{textShadow: '0 0 10px rgba(124, 58, 237, 0.5)'}}>
              {badgeData.filter(b => b.rarity === 'rare' && b.unlocked).length}
            </div>
            <div className="text-sm text-[#FACC15] font-medium">Raros</div>
          </div>
          <div className="bg-[#0B0F19]/60 rounded-xl p-4 border border-white/10">
            <div className="text-3xl font-bold text-[#FACC15] mb-1 animate-pulse" style={{textShadow: '0 0 15px rgba(250, 204, 21, 0.8)'}}>
              {badgeData.filter(b => (b.rarity === 'epic' || b.rarity === 'legendary') && b.unlocked).length}
            </div>
            <div className="text-sm text-[#FACC15] font-medium">Épicos+</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesCollection;

// Agregar estilos CSS adicionales si es necesario
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .animate-shimmer {
      animation: shimmer 2s infinite;
    }
  `;
  document.head.appendChild(style);
}