'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Check, Play, Star, Zap, Clock, Target, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CosmicChallenge {
  id: string;
  title: string;
  description: string;
  category: 'exploration' | 'science' | 'creativity' | 'innovation';
  progress: number;
  totalSteps: number;
  xpReward: number;
  badgeReward?: string;
  estimatedTime: number; // en minutos
  difficulty: 'easy' | 'normal' | 'hard';
  status: 'active' | 'completed' | 'locked';
  isSelected?: boolean;
  completedAt?: string;
  illustration?: string; // planeta, objeto STEAM, avatar femenino
}

interface CosmicChallengesProps {
  onChallengeSelect?: (challengeId: string) => void;
  onChallengeComplete?: (challengeId: string) => void;
  selectedChallengeId?: string;
}

export default function CosmicChallenges({ 
  onChallengeSelect, 
  onChallengeComplete, 
  selectedChallengeId
}: CosmicChallengesProps) {
  const [challenges, setChallenges] = useState<CosmicChallenge[]>([
    {
      id: '1',
      title: 'Reto: Descubre a una pionera STEM',
      description: 'Explora la vida de Marie Curie y sus descubrimientos revolucionarios',
      category: 'exploration',
      progress: 2,
      totalSteps: 5,
      xpReward: 250,
      badgeReward: '🌟 Exploradora Galáctica',
      estimatedTime: 30,
      difficulty: 'easy',
      status: 'active',
      illustration: '🚀'
    },
    {
      id: '2',
      title: 'Reto: Construye tu invento en mini-juego',
      description: 'Diseña y construye un robot que pueda resolver problemas cotidianos',
      category: 'innovation',
      progress: 1,
      totalSteps: 4,
      xpReward: 300,
      badgeReward: '💡 Inventora Cósmica',
      estimatedTime: 45,
      difficulty: 'normal',
      status: 'active',
      illustration: '🔧'
    },
    {
      id: '3',
      title: 'Reto: Lee el cómic de Mari Jackson',
      description: 'Sumérgete en la historia de una científica espacial peruana',
      category: 'creativity',
      progress: 0,
      totalSteps: 3,
      xpReward: 200,
      badgeReward: '🎨 Narradora Estelar',
      estimatedTime: 25,
      difficulty: 'easy',
      status: 'active',
      illustration: '📚'
    },
    {
      id: '4',
      title: 'Reto: Experimenta con química cuántica',
      description: 'Descubre los secretos de las partículas subatómicas',
      category: 'science',
      progress: 3,
      totalSteps: 6,
      xpReward: 400,
      badgeReward: '🔬 Científica Cuántica',
      estimatedTime: 60,
      difficulty: 'hard',
      status: 'active',
      illustration: '⚛️'
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [focusedChallengeId, setFocusedChallengeId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState('');
  const challengesListRef = useRef<HTMLDivElement>(null);
  const [showCompletionAnimation, setShowCompletionAnimation] = useState<string | null>(null);

  const activeChallenges = challenges.filter(c => c.status === 'active');
  const maxVisibleChallenges = 3;

  // Función para anunciar a lectores de pantalla
  const announceToScreenReader = (message: string) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 3000);
  };

  // Obtener ícono de categoría
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'exploration': return '🚀';
      case 'science': return '🔬';
      case 'creativity': return '🎨';
      case 'innovation': return '💡';
      default: return '✨';
    }
  };

  // Obtener gradiente de categoría
  const getCategoryGradient = (category: string) => {
    switch (category) {
      case 'exploration': return 'from-gaming-purple-base via-gaming-purple-bright to-gaming-cyan-neon';
      case 'science': return 'from-gaming-cyan-base via-gaming-cyan-bright to-gaming-cyan-electric';
      case 'creativity': return 'from-gaming-pink-base via-gaming-pink-bright to-gaming-purple-bright';
      case 'innovation': return 'from-gaming-purple-neon via-gaming-pink-neon to-gaming-purple-electric';
      default: return 'from-gaming-purple-base to-gaming-cyan-neon';
    }
  };

  // Obtener nombre de categoría en femenino
  const getCategoryName = (category: string) => {
    switch (category) {
      case 'exploration': return 'Exploración';
      case 'science': return 'Ciencia';
      case 'creativity': return 'Creatividad';
      case 'innovation': return 'Innovación';
      default: return 'Aventura';
    }
  };

  // Manejar selección de reto
  const handleChallengeSelect = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    onChallengeSelect?.(challengeId);
    if (challenge) {
      announceToScreenReader(`Reto cósmico seleccionado: ${challenge.title}. Progreso: ${challenge.progress} de ${challenge.totalSteps} pasos completados.`);
    }
  };

  // Continuar reto
  const continueChallenge = (challengeId: string) => {
    handleChallengeSelect(challengeId);
  };

  // Completar paso de reto
  const completeStep = (challengeId: string) => {
    setChallenges(prev => prev.map(c => {
      if (c.id === challengeId && c.progress < c.totalSteps) {
        const newProgress = c.progress + 1;
        const challenge = { ...c, progress: newProgress };
        announceToScreenReader(`Paso completado. Progreso: ${newProgress} de ${c.totalSteps} pasos.${newProgress === c.totalSteps ? ' ¡Reto cósmico completado!' : ''}`);
        
        if (newProgress === c.totalSteps) {
          setShowCompletionAnimation(challengeId);
          setTimeout(() => setShowCompletionAnimation(null), 3000);
        }
        
        return challenge;
      }
      return c;
    }));
  };

  // Reclamar recompensa
  const claimReward = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    setChallenges(prev => prev.map(c => 
      c.id === challengeId 
        ? { ...c, status: 'completed' as const, completedAt: new Date().toISOString().split('T')[0] }
        : c
    ));
    onChallengeComplete?.(challengeId);
    if (challenge) {
      announceToScreenReader(`¡Recompensa reclamada! Has ganado ${challenge.xpReward} XP${challenge.badgeReward ? ` y el badge ${challenge.badgeReward}` : ''}.`);
    }
  };

  // Navegación del carrusel
  const goToPrevious = () => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex(prev => Math.min(activeChallenges.length - maxVisibleChallenges, prev + 1));
  };

  const visibleChallenges = activeChallenges.slice(currentIndex, currentIndex + maxVisibleChallenges);

  return (
    <div 
      className="space-y-6"
      ref={challengesListRef}
      role="region"
      aria-label="Retos Cósmicos Activos"
    >
      {/* Región de anuncios para lectores de pantalla */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="challenges-announcements"
      >
        {announcements}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 
            className="text-2xl font-bold bg-gradient-to-r from-gaming-purple-neon to-gaming-cyan-electric bg-clip-text text-transparent mb-2"
            id="challenges-title"
          >
            <Sparkles className="inline w-6 h-6 mr-2" />Retos Cósmicos Activos
          </h3>
          <p className="text-sm text-gaming-cyan" aria-live="polite">
            {activeChallenges.length} aventuras esperándote • Máximo 3 visibles
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-gradient-to-r from-gaming-purple-base/20 to-gaming-cyan-neon/20 border border-gaming-cyan/30 rounded-full glow-cyan">
            <span className="text-gaming-cyan text-sm font-medium"><Star className="inline w-4 h-4 mr-1" />{activeChallenges.length} activas</span>
          </div>
        </div>
      </div>

      {/* Carrusel de Retos Cósmicos */}
      <div className="relative">
        {/* Controles de navegación */}
        {activeChallenges.length > maxVisibleChallenges && (
          <>
            <button
              onClick={goToPrevious}
              disabled={currentIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-gaming-purple-base/80 hover:bg-gaming-purple-bright/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center border border-gaming-purple-neon/50 glow-purple transition-all duration-300"
              aria-label="Retos anteriores"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={goToNext}
              disabled={currentIndex >= activeChallenges.length - maxVisibleChallenges}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-gaming-purple-base/80 hover:bg-gaming-purple-bright/80 disabled:opacity-50 disabled:cursor-not-allowed rounded-full flex items-center justify-center border border-gaming-purple-neon/50 glow-purple transition-all duration-300"
              aria-label="Siguientes retos"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </>
        )}

        {/* Cartas de Retos */}
        <div className="flex gap-4 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden w-full max-w-full">
          {visibleChallenges.map((challenge, index) => {
            const isSelected = selectedChallengeId === challenge.id;
            const progressPercentage = (challenge.progress / challenge.totalSteps) * 100;
            const isCompleted = challenge.progress >= challenge.totalSteps;
            const showAnimation = showCompletionAnimation === challenge.id;
            
            return (
              <div
                key={challenge.id}
                className={`group relative flex-shrink-0 w-72 sm:w-80 md:w-[300px] lg:w-[400px] max-w-full overflow-hidden rounded-2xl border transition-all duration-500 backdrop-blur-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-gaming-purple-neon/50 ${
                  isSelected
                    ? `bg-gradient-to-br ${getCategoryGradient(challenge.category)} border-gaming-cyan/60 shadow-xl glow-cyan`
                    : isCompleted
                    ? 'bg-gradient-to-br from-gaming-purple-electric/30 via-gaming-cyan-electric/20 to-gaming-pink-electric/30 border-gaming-purple-holographic/60 glow-holographic'
                    : `bg-gradient-to-br ${getCategoryGradient(challenge.category)} opacity-80 border-gaming-purple-base/40 hover:opacity-100 hover:border-gaming-purple-bright/60 hover-glow-purple`
                } ${
                  showAnimation ? 'animate-pulse scale-105' : ''
                }`}
                onClick={() => !isCompleted && handleChallengeSelect(challenge.id)}
                tabIndex={0}
                role="button"
                aria-selected={isSelected}
                aria-label={`Reto cósmico: ${challenge.title}. Categoría: ${getCategoryName(challenge.category)}. Progreso: ${challenge.progress} de ${challenge.totalSteps}. ${challenge.xpReward} XP de recompensa.`}
              >
                {/* Animación de completado */}
                {showAnimation && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-gaming-purple-base/90 backdrop-blur-sm">
                    <div className="text-center animate-bounce">
                      <Sparkles className="w-16 h-16 text-gaming-cyan-electric mx-auto mb-2 animate-spin" />
                      <p className="text-white font-bold text-lg">¡Reto Completado!</p>
                      <p className="text-gaming-cyan text-sm">+{challenge.xpReward} XP</p>
                    </div>
                  </div>
                )}

                {/* Contenido de la carta */}
                <div className="p-6 h-full flex flex-col">
                  {/* Header de la carta */}
                  <div className="flex items-start gap-4 mb-4 min-w-0">
                    {/* Ilustración lateral */}
                    <div className="w-16 h-16 flex-shrink-0 rounded-xl bg-gradient-to-br from-white/20 to-white/5 flex items-center justify-center text-2xl shadow-lg">
                      {challenge.illustration}
                    </div>
                    
                    {/* Info principal */}
                    <div className="flex-1 min-w-0 overflow-hidden">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-white/20 rounded-full text-white font-medium flex items-center gap-1">
                          {getCategoryIcon(challenge.category)} {getCategoryName(challenge.category)}
                        </span>
                        <span className="text-xs text-gaming-cyan-electric font-bold">+{challenge.xpReward} XP</span>
                      </div>
                      <h4 className="text-lg font-bold text-white mb-1 line-clamp-2 break-words">{challenge.title}</h4>
                      <p className="text-sm text-white/80 line-clamp-2 break-words">{challenge.description}</p>
                    </div>
                  </div>

                  {/* Progreso planetario */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-white/70">Progreso de la Exploradora</span>
                      <span className="text-xs font-bold text-white">{challenge.progress}/{challenge.totalSteps}</span>
                    </div>
                    
                    {/* Barra de progreso con planeta orbitando */}
                    <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-cosmic-void via-gaming-purple-base to-gaming-cyan-neon opacity-20 animate-pulse"></div>
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r ${getCategoryGradient(challenge.category)} glow-holographic`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                      {/* Planeta orbitando */}
                      <div 
                        className="absolute top-1/2 w-5 h-5 -mt-2.5 transition-all duration-700 ease-out"
                        style={{ left: `${Math.max(0, Math.min(95, progressPercentage - 2.5))}%` }}
                      >
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gaming-purple-neon to-gaming-cyan-electric shadow-lg animate-pulse">
                          <div className="w-full h-full rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="mt-auto flex gap-2 w-full min-w-0">
                    {isCompleted ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          claimReward(challenge.id);
                        }}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-gaming-purple-neon to-gaming-cyan-electric text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 glow-holographic flex items-center justify-center gap-2"
                      >
                        <Star className="w-4 h-4" />
                        Reclamar Premio
                      </button>
                    ) : (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            continueChallenge(challenge.id);
                          }}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-gaming-purple-base to-gaming-purple-bright text-white font-bold rounded-xl hover:scale-105 transition-all duration-300 glow-purple flex items-center justify-center gap-2 min-w-0 overflow-hidden"
                        >
                          <><Target className="w-4 h-4 flex-shrink-0" /> <span className="truncate">Iniciar</span></>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            completeStep(challenge.id);
                          }}
                          className="px-3 py-2 bg-gaming-cyan-base/80 hover:bg-gaming-cyan-bright/80 text-white rounded-xl transition-all duration-300 glow-cyan"
                          title="Completar paso"
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Badge reward preview */}
                  {challenge.badgeReward && (
                    <div className="mt-3 text-center">
                      <span className="text-xs text-gaming-cyan-electric font-medium">
                        <Star className="inline w-3 h-3 mr-1" />{challenge.badgeReward}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Indicadores de posición */}
        {activeChallenges.length > maxVisibleChallenges && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: Math.ceil(activeChallenges.length / maxVisibleChallenges) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * maxVisibleChallenges)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / maxVisibleChallenges) === index
                    ? 'bg-gaming-cyan-neon glow-cyan'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Ir a página ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}