import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FlaskConical, Cpu, Wrench, Palette, Sigma } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cloneElement, ReactElement } from 'react';
import React, { useState, useEffect } from 'react';

function AboutCards() {
  const [clickedCard, setClickedCard] = useState<number | null>(null);
  
  // Inyectar estilos dinámicos con animaciones mejoradas
  useEffect(() => {
    const styleId = 'steam-cards-animations';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      @keyframes shimmer {
        0% { transform: translateX(-100%) rotate(25deg); }
        100% { transform: translateX(100%) rotate(25deg); }
      }
      @keyframes pulse {
        0%, 100% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.1); opacity: 0.85; }
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-5px); }
      }
      @keyframes particle-float {
        0%, 100% { transform: translateY(0px) translateX(0px); }
        25% { transform: translateY(-3px) translateX(2px); }
        50% { transform: translateY(-6px) translateX(-2px); }
        75% { transform: translateY(-3px) translateX(1px); }
      }
      @keyframes number-glow {
        0%, 100% { text-shadow: 0 0 5px rgba(124, 58, 237, 0.5); }
        50% { text-shadow: 0 0 15px rgba(124, 58, 237, 0.8), 0 0 25px rgba(236, 72, 153, 0.6); }
      }
      @keyframes title-glow {
        0%, 100% { text-shadow: 0 0 8px rgba(255, 255, 255, 0.3); }
        50% { text-shadow: 0 0 16px rgba(255, 255, 255, 0.6), 0 0 24px rgba(124, 58, 237, 0.4); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingStyle = document.getElementById(styleId);
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);
  
  const holographicGradients = [
    'linear-gradient(135deg, #7C3AED, #3B82F6)', // Science - Morado → Azul cósmico
    'linear-gradient(135deg, #3B82F6, #22C55E)', // Technology - Azul → Verde neón
    'linear-gradient(135deg, #EC4899, #7C3AED)', // Engineering - Rosa → Morado intenso
    'linear-gradient(135deg, #22C55E, #EC4899)', // Art - Verde neón → Rosa cósmico
    'linear-gradient(135deg, #FACC15, #EC4899)'  // Math - Amarillo vibrante → Fucsia
  ];
  
  const borderGradients = [
    'linear-gradient(135deg, #581C87, #4338CA, #9333EA)', // Science - Deep Purple Spectrum
    'linear-gradient(135deg, #075985, #0E7490, #06B6D4)', // Technology - Deep Blue Spectrum
    'linear-gradient(135deg, #991B1B, #B91C1C, #DC2626)', // Engineering - Deep Red Spectrum
    'linear-gradient(135deg, #14532D, #166534, #22C55E)', // Art - Deep Green Spectrum
    'linear-gradient(135deg, #92400E, #B45309, #F59E0B)' // Mathematics - Deep Orange Spectrum
  ];
  
  const glowColors = [
    'rgba(147, 51, 234, 0.4)', // Science - Violet Glow
    'rgba(6, 182, 212, 0.4)', // Technology - Cyan Glow
    'rgba(220, 38, 38, 0.4)', // Engineering - Red Glow
    'rgba(34, 197, 94, 0.4)', // Art - Green Glow
    'rgba(245, 158, 11, 0.4)' // Mathematics - Amber Glow
  ];
  
  const cardEmojis = ['🔬', '🤖', '🔧', '🎨', '➗'];
  const cardNumbers = ['#001', '#002', '#003', '#004', '#005'];
  
  return (
    <div className="mt-8 sm:mt-12 lg:mt-16 w-full flex flex-col sm:flex-row gap-3 sm:gap-2 px-4 mt-12">
      {steamTopics.map((topic, index) => (
        <div 
          key={topic.title} 
          className={`flex-1 group relative overflow-hidden transition-all duration-300 ease-out hover:scale-102 hover:-translate-y-2 cursor-pointer animate-pulse sm:max-w-none max-w-full sm:aspect-[2/3] aspect-[3/2] sm:min-h-[250px] min-h-[180px] ${
            clickedCard === index ? 'scale-110 -translate-y-6 rotate-2 z-50 shadow-2xl' : ''
          }`}
          onClick={() => setClickedCard(clickedCard === index ? null : index)}
          style={{
            background: `linear-gradient(270deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)), ${holographicGradients[index]}`,
            backgroundSize: '400% 400%',
            borderRadius: '20px',
            border: '1px solid transparent',
            backgroundImage: `linear-gradient(135deg, rgba(255, 255, 255, 0.03), rgba(255, 255, 255, 0.01)), ${holographicGradients[index]}, ${borderGradients[index]}`,
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            boxShadow: clickedCard === index 
              ? `0 35px 70px rgba(0, 0, 0, 0.5), 0 0 60px ${glowColors[index]}, 0 0 100px ${glowColors[index]}40, inset 0 1px 20px rgba(255, 255, 255, 0.12), inset 0 -1px 10px rgba(0, 0, 0, 0.1)`
              : `0 25px 50px rgba(0, 0, 0, 0.4), 0 0 30px ${glowColors[index]}, 0 0 60px ${glowColors[index]}20, inset 0 1px 20px rgba(255, 255, 255, 0.08), inset 0 -1px 10px rgba(0, 0, 0, 0.1)`,
            transform: 'perspective(800px) rotateX(2deg)',
            backdropFilter: 'blur(25px) saturate(150%) brightness(1.1)',
            animation: 'gradientShift 8s ease infinite, float 6s ease-in-out infinite'
          }}
        >
          {/* Premium Glassmorphism Effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-white/2 rounded-2xl"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-t-2xl opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/1 to-transparent rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-bl from-white/0.5 via-transparent to-white/2 rounded-2xl animate-pulse" style={{animationDuration: '4s'}}></div>
          <div className="absolute inset-2 rounded-2xl border border-white/5 animate-pulse" style={{animationDuration: '3s', animationDelay: '1s'}}></div>
          
          {/* Efecto shimmer holográfico */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              background: 'linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)',
              transform: 'rotate(25deg)',
              animation: 'shimmer 5s infinite'
            }}
          />
          
          {/* Hover glow effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              boxShadow: `0 0 25px rgba(124, 58, 237, 0.6), 0 0 50px rgba(236, 72, 153, 0.4)`
            }}
          />
          
          {/* Efecto de ondas */}
          <div 
            className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${glowColors[index]}30 0%, transparent 70%)`,
              animation: `ripple-${index} 4s ease-in-out infinite`
            }}
          />
          
          {/* Partículas flotantes */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full opacity-60"
                style={{
                  background: glowColors[index],
                  left: `${20 + i * 30}%`,
                  top: `${30 + i * 20}%`,
                  animation: `particle-float-${i} ${3 + i}s ease-in-out infinite`,
                  boxShadow: `0 0 6px ${glowColors[index]}`
                }}
              />
            ))}
          </div>
          
          {/* Premium Card Number */}
          <div className="absolute top-4 left-4 z-30">
            <div className="bg-gradient-to-r from-black/25 to-black/10 backdrop-blur-xl rounded-lg px-3 py-1 border border-white/15" style={{
              boxShadow: 'inset 0 1px 8px rgba(255, 255, 255, 0.08), 0 6px 20px rgba(0, 0, 0, 0.3)'
            }}>
              <span className="text-white/95 font-mono text-xs font-bold tracking-wide" style={{
                textShadow: '0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)'
              }}>{cardNumbers[index]}</span>
            </div>
          </div>
          
          <div className="relative z-10 p-4 sm:p-6 lg:p-8 h-full flex flex-col justify-between items-center text-center">
             {/* Efecto de brillo superior */}
             <div 
               className="absolute top-0 left-0 right-0 h-px opacity-60"
               style={{
                 background: `linear-gradient(90deg, transparent, ${glowColors[index]}, transparent)`,
                 animation: `shimmer-${index} 3s ease-in-out infinite`
               }}
             />
             {/* Premium Central Emoji */}
             <div className="flex-shrink-0 mb-3 sm:mb-4 lg:mb-6">
               <div 
                 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 sm:mb-2 lg:mb-3 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 leading-none" 
                 style={{
                   filter: `drop-shadow(0 0 30px ${glowColors[index]}) drop-shadow(0 0 60px rgba(255, 255, 255, 0.3)) drop-shadow(0 0 90px rgba(255, 215, 0, 0.2))`,
                   animation: 'pulse 2.5s ease-in-out infinite'
                 }}>
                 {cardEmojis[index]}
               </div>
             </div>
             
             {/* Elegant Premium Title */}
             <div className="flex-grow flex flex-col justify-center mb-2 sm:mb-3 lg:mb-4">
                 <h3 
                   className="font-sans font-black text-white text-sm sm:text-base md:text-lg lg:text-xl tracking-wide group-hover:text-white transition-colors duration-300 mb-2" 
                 style={{
                   textShadow: `0 0 20px rgba(255, 255, 255, 0.8), 0 0 40px ${glowColors[index]}, 0 0 60px rgba(255, 215, 0, 0.3)`,
                   animation: `title-glow-${index} 3s ease-in-out infinite alternate`
                 }}>{topic.title.toUpperCase()}</h3>
             </div>
             
             {/* Clean Description */}
             <div className="flex-shrink-0">
                 <p 
                   className="font-sans font-medium text-white/90 text-xs sm:text-sm leading-relaxed max-w-xs mx-auto px-1 sm:px-2 group-hover:text-white/95 transition-colors duration-300" 
                 style={{
                   textShadow: '0 1px 10px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 255, 255, 0.15)'
                 }}>{topic.description}</p>
             </div>
           </div>
        </div>
      ))}
    </div>
  );
}

const steamTopics = [
  {
    icon: <FlaskConical className="w-16 h-16 mx-auto mb-4" />,
    title: 'Ciencia',
    description: 'Explora el universo, desde las partículas más pequeñas hasta las galaxias más grandes. Desvela los misterios de la vida y la materia.',
    theme: 'science',
    holographicGradient: 'linear-gradient(135deg, #7C3AED 0%, #3B82F6 50%, #22C55E 100%)',
    borderGradient: 'linear-gradient(45deg, #7C3AED, #3B82F6, #22C55E)',
    glowColor: '#7C3AED'
  },
  {
    icon: <Cpu className="w-16 h-16 mx-auto mb-4" />,
    title: 'Tecnología',
    description: 'Moldea el futuro con código. Construye aplicaciones innovadoras, diseña sistemas inteligentes e impulsa la revolución digital.',
    theme: 'tech',
    holographicGradient: 'linear-gradient(135deg, #3B82F6 0%, #38BDF8 50%, #7C3AED 100%)',
    borderGradient: 'linear-gradient(45deg, #3B82F6, #38BDF8, #7C3AED)',
    glowColor: '#3B82F6'
  },
  {
    icon: <Wrench className="w-16 h-16 mx-auto mb-4" />,
    title: 'Ingeniería',
    description: 'Diseña y crea soluciones a problemas del mundo real. Desde energía sostenible hasta robótica, construye un mundo mejor.',
    theme: 'eng',
    holographicGradient: 'linear-gradient(135deg, #FACC15 0%, #EC4899 50%, #7C3AED 100%)',
    borderGradient: 'linear-gradient(45deg, #FACC15, #EC4899, #7C3AED)',
    glowColor: '#FACC15'
  },
  {
    icon: <Palette className="w-16 h-16 mx-auto mb-4" />,
    title: 'Arte',
    description: 'Fusiona la creatividad y la tecnología. Expresa tus ideas a través del diseño digital, el arte generativo y las experiencias interactivas.',
    theme: 'art',
    holographicGradient: 'linear-gradient(135deg, #EC4899 0%, #7C3AED 50%, #3B82F6 100%)',
    borderGradient: 'linear-gradient(45deg, #EC4899, #7C3AED, #3B82F6)',
    glowColor: '#EC4899'
  },
  {
    icon: <Sigma className="w-16 h-16 mx-auto mb-4" />,
    title: 'Matemáticas',
    description: 'Descubre el lenguaje del universo. Desbloquea patrones, resuelve problemas complejos y sienta las bases para toda innovación.',
    theme: 'math',
    holographicGradient: 'linear-gradient(135deg, #22C55E 0%, #FACC15 50%, #EC4899 100%)',
    borderGradient: 'linear-gradient(45deg, #22C55E, #FACC15, #EC4899)',
    glowColor: '#22C55E'
  },
];

const themeClasses: { [key: string]: string } = {
  math: 'cosmic-success-accent',
  science: 'cosmic-text-primary',
  eng: 'cosmic-star-accent',
  art: 'cosmic-text-accent',
  tech: 'cosmic-text-primary',
};




export function About() {
  return (
    <section id="about" className="py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-headline text-4xl font-bold cosmic-gradient-text sm:text-5xl">
            Nuestra Misión: Encender la chispa de la innovación
          </h2>
          <p className="mt-6 text-lg leading-8 cosmic-text-soft">
            KallpaWarmIA se dedica a hacer que la educación STEAM sea accesible, atractiva e inspiradora. Creemos que al proporcionar las herramientas adecuadas y fomentar una comunidad de curiosidad, podemos empoderar a la próxima generación de científicas, ingenieras y creadoras para resolver los mayores desafíos del mundo.
          </p>
        </div>
        <AboutCards />
           
      </div>
    </section>
  );
}
