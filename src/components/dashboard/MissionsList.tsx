'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Clock, Flag, Star, Check, Filter, Play, ArrowRight, Package, BookOpen, StickyNote, Info } from 'lucide-react';

interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  totalSteps: number;
  xpReward: number;
  badgeReward?: string;
  estimatedTime: number; // en minutos
  difficulty: 'easy' | 'normal' | 'hard';
  status: 'active' | 'completed' | 'locked';
  isSelected?: boolean;
  completedAt?: string;
}

interface MissionsListProps {
  onMissionSelect?: (missionId: string) => void;
  onMissionComplete?: (missionId: string) => void;
  selectedMissionId?: string;
}

export default function MissionsList({ 
  onMissionSelect, 
  onMissionComplete, 
  selectedMissionId
}: MissionsListProps) {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      title: 'Dominar Algoritmos de Ordenamiento',
      description: 'Implementa y comprende bubble sort, merge sort y quick sort',
      category: 'Algoritmos',
      progress: 2,
      totalSteps: 5,
      xpReward: 150,
      badgeReward: '🏆 Maestro del Orden',
      estimatedTime: 45,
      difficulty: 'hard',
      status: 'active'
    },
    {
      id: '2',
      title: 'Crear API REST con Node.js',
      description: 'Desarrolla una API completa con autenticación y base de datos',
      category: 'Backend',
      progress: 4,
      totalSteps: 6,
      xpReward: 200,
      badgeReward: '⚡ Arquitecto Backend',
      estimatedTime: 60,
      difficulty: 'hard',
      status: 'active'
    },
    {
      id: '3',
      title: 'Diseño Responsivo Avanzado',
      description: 'Crea layouts que se adapten perfectamente a todos los dispositivos',
      category: 'Frontend',
      progress: 1,
      totalSteps: 4,
      xpReward: 120,
      estimatedTime: 30,
      difficulty: 'normal',
      status: 'active'
    },
    {
      id: '4',
      title: 'Optimización de Rendimiento',
      description: 'Mejora la velocidad de carga y experiencia del usuario',
      category: 'Performance',
      progress: 0,
      totalSteps: 3,
      xpReward: 100,
      estimatedTime: 25,
      difficulty: 'normal',
      status: 'active'
    },
    {
      id: '5',
      title: 'Fundamentos de React',
      description: 'Completaste todos los conceptos básicos de React',
      category: 'Frontend',
      progress: 5,
      totalSteps: 5,
      xpReward: 100,
      badgeReward: '⚛️ React Ninja',
      estimatedTime: 40,
      difficulty: 'easy',
      status: 'completed',
      completedAt: '2024-01-15'
    }
  ]);

  const [showCompleted, setShowCompleted] = useState(false);
  const [focusedMissionId, setFocusedMissionId] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState<string>('');
  const missionsListRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detectar preferencia de movimiento reducido
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Anunciar cambios importantes para lectores de pantalla
  const announceToScreenReader = useCallback((message: string) => {
    setAnnouncements(message);
    setTimeout(() => setAnnouncements(''), 2000);
  }, []);

  // Filtrar misiones
  const activeMissions = missions.filter(m => m.status === 'active');
  const completedMissions = missions.filter(m => m.status === 'completed');

  // Obtener color de categoría
  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      'Algoritmos': 'bg-purple-500/20 text-purple-300 border-purple-400/30',
      'Backend': 'bg-green-500/20 text-green-300 border-green-400/30',
      'Frontend': 'bg-blue-500/20 text-blue-300 border-blue-400/30',
      'Performance': 'bg-orange-500/20 text-orange-300 border-orange-400/30',
      'IA': 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30'
    };
    return colors[category] || 'bg-slate-500/20 text-slate-300 border-slate-400/30';
  };

  // Obtener color de dificultad
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'text-green-400';
      case 'normal':
        return 'text-yellow-400';
      case 'hard':
        return 'text-red-400';
      default:
        return 'text-slate-400';
    }
  };

  // Obtener icono de dificultad
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return '🍃';
      case 'normal':
        return '⚔️';
      case 'hard':
        return '💎';
      default:
        return '❓';
    }
  };

  // Manejar selección de misión
  const handleMissionSelect = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    onMissionSelect?.(missionId);
    if (mission) {
      announceToScreenReader(`Misión seleccionada: ${mission.title}. Progreso: ${mission.progress} de ${mission.totalSteps} pasos completados.`);
    }
  };

  // Continuar misión
  const continueMission = (missionId: string) => {
    handleMissionSelect(missionId);
  };

  // Manejar navegación por teclado en la lista
  const handleListKeyDown = useCallback((e: React.KeyboardEvent) => {
    const activeMissions = missions.filter(m => m.status === 'active');
    const currentIndex = focusedMissionId ? activeMissions.findIndex(m => m.id === focusedMissionId) : -1;
    
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        const nextIndex = currentIndex < activeMissions.length - 1 ? currentIndex + 1 : 0;
        setFocusedMissionId(activeMissions[nextIndex]?.id || null);
        break;
      case 'ArrowUp':
        e.preventDefault();
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : activeMissions.length - 1;
        setFocusedMissionId(activeMissions[prevIndex]?.id || null);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedMissionId) {
          handleMissionSelect(focusedMissionId);
        }
        break;
      case 'Home':
        e.preventDefault();
        setFocusedMissionId(activeMissions[0]?.id || null);
        break;
      case 'End':
        e.preventDefault();
        setFocusedMissionId(activeMissions[activeMissions.length - 1]?.id || null);
        break;
    }
  }, [missions, focusedMissionId, handleMissionSelect]);

  // Manejar navegación por teclado en misión individual
  const handleMissionKeyDown = useCallback((e: React.KeyboardEvent, missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    if (!mission) return;
    
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        e.stopPropagation();
        if (mission.progress >= mission.totalSteps) {
          claimReward(missionId);
        } else {
          continueMission(missionId);
        }
        break;
      case 'c':
      case 'C':
        e.preventDefault();
        e.stopPropagation();
        if (mission.progress < mission.totalSteps) {
          completeStep(missionId);
        }
        break;
    }
  }, [missions]);

  // Reclamar recompensa
  const claimReward = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    setMissions(prev => prev.map(m => 
      m.id === missionId 
        ? { ...m, status: 'completed' as const, completedAt: new Date().toISOString().split('T')[0] }
        : m
    ));
    onMissionComplete?.(missionId);
    if (mission) {
      announceToScreenReader(`¡Recompensa reclamada! Has ganado ${mission.xpReward} XP${mission.badgeReward ? ` y el badge ${mission.badgeReward}` : ''}.`);
    }
  };

  // Completar paso de misión
  const completeStep = (missionId: string) => {
    setMissions(prev => prev.map(m => {
      if (m.id === missionId && m.progress < m.totalSteps) {
        const newProgress = m.progress + 1;
        const mission = { ...m, progress: newProgress };
        announceToScreenReader(`Paso completado. Progreso: ${newProgress} de ${m.totalSteps} pasos.${newProgress === m.totalSteps ? ' ¡Misión completada!' : ''}`);
        return mission;
      }
      return m;
    }));
  };

  return (
    <div 
      className="space-y-4"
      ref={missionsListRef}
      role="region"
      aria-label="Lista de misiones"
    >
      {/* Región de anuncios para lectores de pantalla */}
      <div 
        aria-live="polite" 
        aria-atomic="true" 
        className="sr-only"
        id="missions-announcements"
      >
        {announcements}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 
            className="text-xl font-bold text-white mb-1"
            id="missions-title"
          >
            Misiones Activas
          </h3>
          <p className="text-sm text-slate-400" aria-live="polite">
            {activeMissions.length} misiones en progreso
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-full">
            <span className="text-yellow-400 text-sm font-medium"><Target className="w-4 h-4 inline mr-1" />{activeMissions.length} activas</span>
          </div>
        </div>
      </div>

      {/* Misiones activas */}
      <div 
        className="space-y-3"
        role="list"
        aria-labelledby="missions-title"
        onKeyDown={handleListKeyDown}
        tabIndex={0}
      >
        <div className="sr-only" id="missions-instructions">
          Usa las flechas arriba y abajo para navegar entre misiones, Enter o Espacio para seleccionar, 
          C para completar paso, Home para ir al inicio, End para ir al final.
        </div>
        {activeMissions.map((mission, index) => {
          const isSelected = selectedMissionId === mission.id;
          const isFocused = focusedMissionId === mission.id;
          const progressPercentage = (mission.progress / mission.totalSteps) * 100;
          const isCompleted = mission.progress >= mission.totalSteps;
          
          return (
            <div
              key={mission.id}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 backdrop-blur-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-purple-400/50 ${
                isSelected
                  ? 'bg-gradient-to-r from-blue-500/20 via-purple-500/15 to-blue-500/20 border-blue-400/50'
                  : isCompleted
                  ? 'bg-gradient-to-r from-green-500/20 via-emerald-500/15 to-teal-500/20 border-green-400/40'
                  : 'bg-gradient-to-r from-cosmic-void/40 via-cosmic-midnight/30 to-cosmic-void/40 border-gaming-purple-neon/50 hover:border-gaming-purple-bright/70 glow-purple'
              } ${
                isFocused ? 'ring-2 ring-purple-400/50' : ''
              }`}
              onClick={() => !isCompleted && handleMissionSelect(mission.id)}
              onKeyDown={(e) => handleMissionKeyDown(e, mission.id)}
              tabIndex={0}
              role="listitem"
              aria-selected={isSelected}
              aria-describedby={`mission-${mission.id}-description`}
              aria-label={`Misión: ${mission.title}. ${isCompleted ? 'Completada' : `Progreso: ${mission.progress} de ${mission.totalSteps} pasos`}. ${isSelected ? 'Seleccionada' : ''}`}
            >
              {/* Efecto shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              

              
              <div className="relative p-4">
                <div className="flex items-start gap-4">
                  {/* Estado y progreso */}
                  <div className="flex flex-col items-center gap-2">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                      isCompleted
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                        : isSelected
                        ? 'border-purple-400 bg-purple-500/20 text-purple-300'
                        : 'bg-white/10 text-white/60'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-4 h-4" />
                      ) : isSelected ? (
                        <Play className="w-4 h-4" />
                      ) : (
                        <Target className="w-4 h-4" />
                      )}
                    </div>
                    
                    {/* Mini barra de progreso vertical */}
                    <div className="w-1 h-12 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`w-full bg-gradient-to-t transition-all duration-500 ${
                          isCompleted
                            ? 'from-green-400 to-emerald-400'
                            : 'from-blue-400 to-purple-400'
                        }`}
                        style={{ height: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Contenido principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h4 className={`font-bold text-lg mb-1 ${
                          isCompleted ? 'text-white/70 line-through' : 'text-white'
                        }`}>
                          {mission.title}
                        </h4>
                        <p className={`text-sm mb-2 line-clamp-2 ${
                          isCompleted ? 'text-white/50' : 'text-white/70'
                        }`}>
                          {mission.description}
                        </p>
                      </div>
                    </div>

                    {/* Barra de progreso */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-white/60">
                          Progreso: {mission.progress}/{mission.totalSteps} pasos
                        </span>
                        <span className="text-xs text-white/60">{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ${
                            isCompleted
                              ? 'bg-gradient-to-r from-green-400 to-emerald-400'
                              : 'bg-gradient-to-r from-blue-400 to-purple-400'
                          }`}
                          style={{ width: `${progressPercentage}%` }}
                        >
                          <div className="h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </div>
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 flex-wrap">
                        {/* Categoría */}
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${getCategoryColor(mission.category)}`}>
                          {mission.category}
                        </span>
                        
                        {/* Dificultad */}
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium bg-white/10 ${getDifficultyColor(mission.difficulty)}`}>
                          {getDifficultyIcon(mission.difficulty)} {mission.difficulty}
                        </span>
                        
                        {/* Tiempo estimado */}
                        <div className="flex items-center gap-1 px-2 py-1 bg-white/10 rounded-lg text-white/60 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>{mission.estimatedTime}min</span>
                        </div>
                      </div>

                      {/* Recompensas */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 text-yellow-400 text-xs font-bold">
                          <Star className="w-3 h-3" />
                          <span>{mission.xpReward} XP</span>
                        </div>
                        
                        {mission.badgeReward && (
                          <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 text-xs font-bold">
                            <Zap className="w-3 h-3" />
                            <span className="hidden sm:inline">Badge</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="flex items-center justify-between mt-3 pt-3">
                      <div className="flex items-center gap-2">
                        {!isCompleted ? (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                continueMission(mission.id);
                              }}
                              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 border ${
                                isSelected
                                  ? 'bg-purple-500/30 text-purple-300 border-purple-400/50'
                                  : 'bg-blue-500/20 text-blue-300 border-blue-400/50 hover:bg-blue-500/30'
                              }`}
                            >
                              <Play className="w-3 h-3" />
                              {isSelected ? 'Seleccionada' : 'Continuar'}
                            </button>
                            
                            {mission.progress > 0 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  completeStep(mission.id);
                                }}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-green-500/20 text-green-300 border border-green-400/50 hover:bg-green-500/30 transition-all duration-300"
                              >
                                <Check className="w-3 h-3" />
                                +1 Paso
                              </button>
                            )}
                          </>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              claimReward(mission.id);
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-300 border border-yellow-400/50 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all duration-300"
                          >
                            <Gift className="w-3 h-3" />
                            Reclamar Recompensa
                          </button>
                        )}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          // Ver detalles
                        }}
                        className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                        title="Ver detalles"
                      >
                        <BookOpen className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Misiones completadas */}
      {completedMissions.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setShowCompleted(!showCompleted)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-200 mb-3 focus:outline-none focus:ring-2 focus:ring-slate-400/50 rounded-md p-1"
            aria-expanded={showCompleted}
            aria-controls="completed-missions-list"
            aria-label={`${showCompleted ? 'Ocultar' : 'Mostrar'} misiones completadas (${completedMissions.length})`}
          >
            {showCompleted ? <span className="text-sm" aria-hidden="true">▲</span> : <span className="text-sm" aria-hidden="true">▼</span>}
            <span className="text-sm font-medium">Misiones completadas ({completedMissions.length})</span>
          </button>
          
          {showCompleted && (
            <div 
              className="space-y-2"
              id="completed-missions-list"
              role="list"
              aria-label="Misiones completadas"
            >
              {completedMissions.map((mission) => (
                <div
                  key={mission.id}
                  className="p-3 bg-green-500/10 border border-green-400/30 rounded-lg"
                  role="listitem"
                  aria-label={`Misión completada: ${mission.title}. Completada el ${mission.completedAt}. Recompensa: ${mission.xpReward} XP${mission.badgeReward ? ` y ${mission.badgeReward}` : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <Check className="h-3 w-3 text-white" />
                      </div>
                      <div>
                        <h5 className="font-medium text-white/80 text-sm">{mission.title}</h5>
                        <p className="text-xs text-white/60">Completada el {mission.completedAt}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2" aria-label="Recompensas obtenidas">
                      <span className="text-xs text-green-400 font-medium">+{mission.xpReward} XP</span>
                      {mission.badgeReward && (
                        <span className="text-xs text-purple-400">{mission.badgeReward}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}