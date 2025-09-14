'use client';

import React, { useState } from 'react';
import { CheckCircle2, Circle, Plus, Trash2, Clock, Flag, Star, Check, Filter, Play, ArrowRight, Package, BookOpen, StickyNote, Info } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  category: string;
  estimatedTime?: number; // en minutos
  createdAt: string;
  emoji?: string;
  xpReward?: number;
  difficulty?: 'easy' | 'normal' | 'hard';
  progress?: number; // 0-100
  status?: 'not_started' | 'in_progress' | 'ready_to_submit';
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Completar quiz de matemáticas',
      description: 'Resolver el quiz del módulo 3 y desbloquear nuevos niveles',
      completed: false,
      priority: 'high',
      category: 'Educación',
      estimatedTime: 25,
      createdAt: '2024-01-15',
      emoji: '🧮',
      xpReward: 150,
      difficulty: 'hard',
      progress: 0,
      status: 'not_started'
    },
    {
      id: '2',
      title: 'Revisar mentorías disponibles',
      description: 'Explorar opciones de mentorías en tecnología',
      completed: false,
      priority: 'medium',
      category: 'Carrera',
      estimatedTime: 15,
      createdAt: '2024-01-15',
      emoji: '👩‍🏫',
      xpReward: 75,
      difficulty: 'normal',
      progress: 60,
      status: 'in_progress'
    },
    {
      id: '3',
      title: 'Jugar minijuego de lógica',
      description: 'Completar nivel 5 del juego de lógica',
      completed: true,
      priority: 'low',
      category: 'Entretenimiento',
      estimatedTime: 10,
      createdAt: '2024-01-14',
      emoji: '🎮',
      xpReward: 50,
      difficulty: 'easy',
      progress: 100,
      status: 'not_started'
    },
    {
      id: '4',
      title: 'Actualizar perfil profesional',
      description: 'Añadir nuevas habilidades y logros',
      completed: false,
      priority: 'medium',
      category: 'Perfil',
      estimatedTime: 20,
      createdAt: '2024-01-15',
      emoji: '📝',
      xpReward: 100,
      difficulty: 'normal',
      progress: 90,
      status: 'ready_to_submit'
    }
  ]);

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [filterTime, setFilterTime] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Filtrar tareas
  const filteredTasks = tasks.filter(task => {
    if (filterCategory !== 'all' && task.category !== filterCategory) return false;
    if (filterDifficulty !== 'all' && task.difficulty !== filterDifficulty) return false;
    if (filterTime !== 'all') {
      if (filterTime === 'quick' && (task.estimatedTime || 0) > 15) return false;
      if (filterTime === 'medium' && ((task.estimatedTime || 0) <= 15 || (task.estimatedTime || 0) > 30)) return false;
      if (filterTime === 'long' && (task.estimatedTime || 0) <= 30) return false;
    }
    return true;
  });

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleTaskAction = (taskId: string, action: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    if (action === 'start') {
      setTasks(tasks.map(t => 
        t.id === taskId ? { ...t, status: 'in_progress', progress: 10 } : t
      ));
    } else if (action === 'continue') {
      // Actualizar progreso de la tarea
      const newProgress = Math.min((task.progress || 0) + 20, 90);
      setTasks(tasks.map(t => 
        t.id === taskId ? { 
          ...t, 
          progress: newProgress,
          status: newProgress >= 90 ? 'ready_to_submit' : 'in_progress'
        } : t
      ));
    } else if (action === 'submit') {
      setTasks(tasks.map(t => 
        t.id === taskId ? { ...t, completed: true, progress: 100 } : t
      ));
    }
  };

  const getTaskCTA = (task: Task) => {
    if (task.completed) return null;
    
    if (task.status === 'not_started' || !task.status) {
      return {
        text: 'Iniciar',
        icon: Play,
        action: 'start',
        color: 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border-blue-400/30'
      };
    } else if (task.status === 'in_progress') {
      return {
        text: 'Continuar',
        icon: ArrowRight,
        action: 'continue',
        color: 'bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border-purple-400/30'
      };
    } else if (task.status === 'ready_to_submit') {
      return {
        text: 'Entregar',
        icon: Package,
        action: 'submit',
        color: 'bg-green-500/20 hover:bg-green-500/30 text-green-300 border-green-400/30'
      };
    }
    return null;
  };

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        completed: false,
        priority: 'medium',
        category: 'General',
        createdAt: new Date().toISOString().split('T')[0],
        emoji: '🎯',
        xpReward: 50,
        difficulty: 'normal',
        progress: 0,
        status: 'not_started'
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setShowAddTask(false);
    }
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-gradient-to-r from-red-500/30 to-pink-500/30 border-red-400/50';
      case 'medium':
        return 'text-yellow-400 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 border-yellow-400/50';
      case 'low':
        return 'text-green-400 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border-green-400/50';
    }
  };

  const getDifficultyColor = (difficulty: 'easy' | 'normal' | 'hard') => {
    switch (difficulty) {
      case 'hard':
        return 'text-purple-400 bg-gradient-to-r from-purple-500/30 to-violet-500/30';
      case 'normal':
        return 'text-blue-400 bg-gradient-to-r from-blue-500/30 to-cyan-500/30';
      case 'easy':
        return 'text-green-400 bg-gradient-to-r from-green-500/30 to-teal-500/30';
    }
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  
  const categories = ['all', ...Array.from(new Set(tasks.map(t => t.category)))];
  const difficulties = ['all', 'easy', 'normal', 'hard'];
  const timeRanges = [
    { value: 'all', label: 'Cualquier duración' },
    { value: 'quick', label: '≤15 min' },
    { value: 'medium', label: '15-30 min' },
    { value: 'long', label: '>30 min' }
  ];

  return (
    <div className="relative bg-gradient-to-br from-cosmic-void/40 via-gaming-purple-base/20 to-cosmic-midnight/40 backdrop-blur-xl border border-gaming-purple-neon/30 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-2xl overflow-hidden glow-purple">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-cyan-500/5 opacity-50" />
      <div className="absolute top-0 right-0 w-16 md:w-32 h-16 md:h-32 bg-gradient-to-br from-purple-400/10 to-transparent rounded-full blur-2xl" />
      
      {/* Encabezado con progreso del día */}
      <div className="relative z-10 mb-4 md:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 md:mb-4 gap-3">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="text-xl md:text-2xl">🎯</div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                Progreso del día
              </h3>
              <p className="text-xs md:text-sm text-slate-300">
                {completedTasks} de {totalTasks} misiones • {Math.round(completionPercentage)}% completado
              </p>
            </div>
          </div>
          
          {/* Botón de filtros */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl text-sm md:text-base font-medium transition-all duration-300 ${
              showFilters
                ? 'bg-blue-500/30 text-blue-300 border border-blue-400/50'
                : 'bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 border border-slate-600/50 hover:border-slate-500/50'
            }`}
          >
            <Filter className="h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden sm:inline">Filtros</span>
          </button>
        </div>

        {/* Barra de progreso del día */}
        <div className="mb-4">
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        {/* Panel de filtros */}
        {showFilters && (
          <div className="mb-4 md:mb-6 p-3 md:p-4 bg-white/5 backdrop-blur-sm rounded-lg md:rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {/* Filtro por categoría */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-white/70 mb-1 md:mb-2">Categoría</label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full bg-white/10 rounded-md md:rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="bg-cosmic-void">
                      {cat === 'all' ? 'Todas las categorías' : cat}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Filtro por dificultad */}
              <div>
                <label className="block text-xs md:text-sm font-medium text-white/70 mb-1 md:mb-2">Dificultad</label>
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value)}
                  className="w-full bg-white/10 rounded-md md:rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                >
                  {difficulties.map(diff => (
                    <option key={diff} value={diff} className="bg-cosmic-void">
                      {diff === 'all' ? 'Todas las dificultades' : 
                       diff === 'easy' ? 'Fácil' : 
                       diff === 'normal' ? 'Normal' : 'Difícil'}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Filtro por tiempo */}
              <div className="sm:col-span-2 lg:col-span-1">
                <label className="block text-xs md:text-sm font-medium text-white/70 mb-1 md:mb-2">Duración</label>
                <select
                  value={filterTime}
                  onChange={(e) => setFilterTime(e.target.value)}
                  className="w-full bg-white/10 rounded-md md:rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-white text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-400/50"
                >
                  {timeRanges.map(range => (
                    <option key={range.value} value={range.value} className="bg-cosmic-void">
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lista de misiones */}
      <div className="relative z-10 space-y-2 md:space-y-3 max-h-80 md:max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {filteredTasks.map((task, index) => {
          const cta = getTaskCTA(task);
          
          return (
            <div
              key={task.id}
              className={`group relative overflow-hidden rounded-lg md:rounded-xl border transition-all duration-300 backdrop-blur-md ${
                task.completed 
                  ? 'bg-gradient-to-r from-green-500/20 via-emerald-500/15 to-teal-500/20 border-green-400/40' 
                  : 'bg-gradient-to-r from-white/10 via-white/5 to-white/10 hover:bg-white/15'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              <div className="relative p-3 md:p-4">
                <div className="flex items-start gap-2 md:gap-4">
                  {/* Emoji y estado */}
                  <div className="flex flex-col items-center gap-1 md:gap-2">
                    <div className="text-lg md:text-2xl">{task.emoji || '🎯'}</div>
                    <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center ${
                      task.completed 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                        : 'bg-white/10'
                    }`}>
                      {task.completed && <Check className="h-2 w-2 md:h-3 md:w-3" />}
                    </div>
                  </div>
                  
                  {/* Contenido principal */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-2 md:mb-3 gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className={`font-bold text-sm md:text-lg mb-1 ${
                          task.completed ? 'text-white/70 line-through' : 'text-white'
                        }`}>
                          {task.title}
                        </h4>
                        {task.description && (
                          <p className={`text-xs md:text-sm mb-1 md:mb-2 line-clamp-2 ${
                            task.completed ? 'text-white/50' : 'text-white/70'
                          }`}>
                            {task.description}
                          </p>
                        )}
                        
                        {/* Barra de progreso individual */}
                        {!task.completed && task.progress !== undefined && task.progress > 0 && (
                          <div className="mb-1 md:mb-2">
                            <div className="flex items-center justify-between mb-0.5 md:mb-1">
                              <span className="text-xs text-white/60">Progreso</span>
                              <span className="text-xs text-white/60">{task.progress}%</span>
                            </div>
                            <div className="h-1 md:h-1.5 bg-white/10 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-500"
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* XP Reward */}
                      {task.xpReward && (
                        <div className="flex items-center gap-1 px-2 md:px-3 py-0.5 md:py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 text-yellow-400 text-xs md:text-sm font-bold shrink-0">
                          <Star className="h-2 w-2 md:h-3 md:w-3" />
                          <span>{task.xpReward}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Metadata y acciones */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                      <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                        {/* Priority badge */}
                        <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-md md:rounded-lg text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                          <span className="sm:hidden">{task.priority === 'high' ? '🔥' : task.priority === 'medium' ? '⚡' : '🌱'}</span>
                          <span className="hidden sm:inline">{task.priority === 'high' ? '🔥 Alta' : task.priority === 'medium' ? '⚡ Media' : '🌱 Baja'}</span>
                        </span>
                        
                        {/* Difficulty badge */}
                        {task.difficulty && (
                          <span className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-md md:rounded-lg text-xs font-medium ${getDifficultyColor(task.difficulty)}`}>
                            <span className="sm:hidden">{task.difficulty === 'hard' ? '💎' : task.difficulty === 'normal' ? '⚔️' : '🍃'}</span>
                            <span className="hidden sm:inline">{task.difficulty === 'hard' ? '💎 Difícil' : task.difficulty === 'normal' ? '⚔️ Normal' : '🍃 Fácil'}</span>
                          </span>
                        )}
                        
                        {/* Estimated time */}
                        {task.estimatedTime && (
                          <div className="flex items-center gap-1 px-1.5 md:px-2 py-0.5 md:py-1 bg-white/10 rounded-md md:rounded-lg text-white/60 text-xs">
                            <Clock className="h-2 w-2 md:h-3 md:w-3" />
                            <span className="hidden sm:inline">{task.estimatedTime}min</span>
                            <span className="sm:hidden">{task.estimatedTime}m</span>
                          </div>
                        )}
                      </div>
                      
                      {/* CTAs contextuales */}
                      <div className="flex items-center gap-1 md:gap-2">
                        {cta && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTaskAction(task.id, cta.action);
                            }}
                            className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg text-xs md:text-sm font-medium transition-all duration-300 border ${cta.color}`}
                          >
                            <cta.icon className="h-3 w-3" />
                            <span className="hidden sm:inline">{cta.text}</span>
                          </button>
                        )}
                        
                        {/* Miniacciones */}
                        <div className="flex items-center gap-0.5 md:gap-1 opacity-60 md:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              // Acción de info/detalles
                            }}
                            className="p-1 md:p-1.5 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 rounded-md md:rounded-lg transition-all duration-200"
                            title="Ver detalles"
                          >
                            <Info className="h-3 w-3" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTask(task.id);
                            }}
                            className="p-1 md:p-1.5 text-red-400 hover:text-red-300 hover:bg-red-500/20 rounded-md md:rounded-lg transition-all duration-200"
                            title="Eliminar"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        
        {filteredTasks.length === 0 && (
          <div className="text-center py-6 md:py-8">
            <div className="text-2xl md:text-4xl mb-2">🔍</div>
            <p className="text-white/70 text-sm md:text-base px-4">No se encontraron misiones con los filtros aplicados</p>
          </div>
        )}
      </div>
    </div>
  );
}