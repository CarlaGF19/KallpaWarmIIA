'use client';

import React, { useState, useEffect, useCallback } from 'react';

interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'star' | 'circle' | 'confetti' | 'sparkle';
}

interface GameEffectsProps {
  trigger?: string; // Trigger para activar efectos
  type?: 'achievement' | 'streak' | 'levelup' | 'mission-complete';
  intensity?: 'low' | 'medium' | 'high';
  duration?: number;
  onComplete?: () => void;
}

export default function GameEffects({ 
  trigger, 
  type = 'achievement', 
  intensity = 'medium',
  duration = 3000,
  onComplete 
}: GameEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isActive, setIsActive] = useState(false);
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

  // Configuraciones de efectos por tipo
  const getEffectConfig = (effectType: string, effectIntensity: string) => {
    const configs = {
      achievement: {
        low: { count: 15, colors: ['#fbbf24', '#f59e0b', '#d97706'], types: ['star', 'sparkle'] },
        medium: { count: 30, colors: ['#fbbf24', '#f59e0b', '#d97706', '#eab308'], types: ['star', 'sparkle', 'circle'] },
        high: { count: 50, colors: ['#fbbf24', '#f59e0b', '#d97706', '#eab308', '#facc15'], types: ['star', 'sparkle', 'circle', 'confetti'] }
      },
      streak: {
        low: { count: 20, colors: ['#ef4444', '#dc2626', '#b91c1c'], types: ['star', 'sparkle'] },
        medium: { count: 35, colors: ['#ef4444', '#dc2626', '#b91c1c', '#f87171'], types: ['star', 'sparkle', 'circle'] },
        high: { count: 60, colors: ['#ef4444', '#dc2626', '#b91c1c', '#f87171', '#fca5a5'], types: ['star', 'sparkle', 'circle', 'confetti'] }
      },
      levelup: {
        low: { count: 25, colors: ['#8b5cf6', '#7c3aed', '#6d28d9'], types: ['star', 'circle'] },
        medium: { count: 40, colors: ['#8b5cf6', '#7c3aed', '#6d28d9', '#a78bfa'], types: ['star', 'circle', 'sparkle'] },
        high: { count: 70, colors: ['#8b5cf6', '#7c3aed', '#6d28d9', '#a78bfa', '#c4b5fd'], types: ['star', 'circle', 'sparkle', 'confetti'] }
      },
      'mission-complete': {
        low: { count: 18, colors: ['#10b981', '#059669', '#047857'], types: ['star', 'sparkle'] },
        medium: { count: 32, colors: ['#10b981', '#059669', '#047857', '#34d399'], types: ['star', 'sparkle', 'circle'] },
        high: { count: 55, colors: ['#10b981', '#059669', '#047857', '#34d399', '#6ee7b7'], types: ['star', 'sparkle', 'circle', 'confetti'] }
      },

    };
    
    return configs[effectType as keyof typeof configs]?.[effectIntensity as keyof typeof configs.achievement] || configs.achievement.medium;
  };

  // Crear partícula
  const createParticle = useCallback((config: any): Particle => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    return {
      id: Math.random().toString(36).substr(2, 9),
      x: centerX + (Math.random() - 0.5) * 200,
      y: centerY + (Math.random() - 0.5) * 200,
      vx: (Math.random() - 0.5) * 8,
      vy: (Math.random() - 0.5) * 8 - 2,
      life: 0,
      maxLife: 60 + Math.random() * 60,
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      size: 2 + Math.random() * 4,
      type: config.types[Math.floor(Math.random() * config.types.length)] as Particle['type']
    };
  }, []);

  // Activar efectos
  const activateEffects = useCallback(() => {
    if (prefersReducedMotion) {
      onComplete?.();
      return;
    }

    const config = getEffectConfig(type, intensity);
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < config.count; i++) {
      newParticles.push(createParticle(config));
    }
    
    setParticles(newParticles);
    setIsActive(true);
    
    // Auto-limpiar después de la duración
    setTimeout(() => {
      setIsActive(false);
      setParticles([]);
      onComplete?.();
    }, duration);
  }, [type, intensity, duration, prefersReducedMotion, createParticle, onComplete]);

  // Activar cuando cambie el trigger
  useEffect(() => {
    if (trigger) {
      activateEffects();
    }
  }, [trigger, activateEffects]);

  // Animar partículas
  useEffect(() => {
    if (!isActive || prefersReducedMotion) return;
    
    const animationFrame = requestAnimationFrame(function animate() {
      setParticles(prevParticles => {
        return prevParticles
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.1, // Gravedad
            life: particle.life + 1
          }))
          .filter(particle => particle.life < particle.maxLife);
      });
      
      if (isActive) {
        requestAnimationFrame(animate);
      }
    });
    
    return () => cancelAnimationFrame(animationFrame);
  }, [isActive, prefersReducedMotion]);

  // Renderizar partícula según su tipo
  const renderParticle = (particle: Particle) => {
    const opacity = 1 - (particle.life / particle.maxLife);
    const scale = 1 - (particle.life / particle.maxLife) * 0.5;
    
    const baseStyle = {
      position: 'absolute' as const,
      left: particle.x,
      top: particle.y,
      width: particle.size,
      height: particle.size,
      opacity,
      transform: `scale(${scale})`,
      pointerEvents: 'none' as const,
      zIndex: 9999
    };
    
    switch (particle.type) {
      case 'star':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              color: particle.color,
              fontSize: particle.size * 2
            }}
          >
            ⭐
          </div>
        );
        
      case 'sparkle':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              color: particle.color,
              fontSize: particle.size * 1.5
            }}
          >
            ✨
          </div>
        );
        
      case 'circle':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              backgroundColor: particle.color,
              borderRadius: '50%',
              boxShadow: `0 0 ${particle.size}px ${particle.color}`
            }}
          />
        );
        
      case 'confetti':
        return (
          <div
            key={particle.id}
            style={{
              ...baseStyle,
              backgroundColor: particle.color,
              width: particle.size * 2,
              height: particle.size / 2,
              transform: `scale(${scale}) rotate(${particle.life * 10}deg)`
            }}
          />
        );
        
      default:
        return null;
    }
  };

  if (prefersReducedMotion || !isActive) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {particles.map(renderParticle)}
    </div>
  );
}

// Hook para usar efectos de juego
export function useGameEffects() {
  const [effectTrigger, setEffectTrigger] = useState<string>('');
  const [effectType, setEffectType] = useState<GameEffectsProps['type']>('achievement');
  const [effectIntensity, setEffectIntensity] = useState<GameEffectsProps['intensity']>('medium');

  const triggerEffect = useCallback((type: GameEffectsProps['type'], intensity: GameEffectsProps['intensity'] = 'medium') => {
    setEffectType(type);
    setEffectIntensity(intensity);
    setEffectTrigger(Date.now().toString());
  }, []);

  const triggerAchievement = useCallback((intensity: GameEffectsProps['intensity'] = 'medium') => {
    triggerEffect('achievement', intensity);
  }, [triggerEffect]);

  const triggerStreak = useCallback((intensity: GameEffectsProps['intensity'] = 'high') => {
    triggerEffect('streak', intensity);
  }, [triggerEffect]);

  const triggerLevelUp = useCallback((intensity: GameEffectsProps['intensity'] = 'high') => {
    triggerEffect('levelup', intensity);
  }, [triggerEffect]);

  const triggerMissionComplete = useCallback((intensity: GameEffectsProps['intensity'] = 'medium') => {
    triggerEffect('mission-complete', intensity);
  }, [triggerEffect]);



  return {
    effectTrigger,
    effectType,
    effectIntensity,
    triggerEffect,
    triggerAchievement,
    triggerStreak,
    triggerLevelUp,
    triggerMissionComplete,

  };
}

// Componente de efectos de texto animado
export function AnimatedText({ 
  children, 
  animation = 'fade-in-up',
  delay = 0,
  className = '' 
}: { 
  children: React.ReactNode;
  animation?: string;
  delay?: number;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div 
      className={`${className} ${isVisible ? `animate-${animation}` : 'opacity-0'}`}
    >
      {children}
    </div>
  );
}

// Componente de contador animado
export function AnimatedCounter({ 
  value, 
  duration = 1000,
  className = '',
  prefix = '',
  suffix = '' 
}: {
  value: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const startValue = displayValue;
    const endValue = value;
    const startTime = Date.now();
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(startValue + (endValue - startValue) * easeOut);
      
      setDisplayValue(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [value, duration, prefersReducedMotion]);

  return (
    <span className={`${className} ${!prefersReducedMotion ? 'animate-number-count' : ''}`}>
      {prefix}{displayValue.toLocaleString()}{suffix}
    </span>
  );
}