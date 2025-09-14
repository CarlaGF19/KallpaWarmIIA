"use client";

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    quote: "KallpaIA cambió por completo mi forma de ver la programación. Las historias hicieron que los temas complejos fueran mucho más fáciles de entender. ¡Como mujer en tecnología, me sentí vista e inspirada!",
    name: 'Jasmine K.',
    title: 'Estudiante de Secundaria',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'student portrait',
  },
  {
    quote: "Como educadora, siempre busco recursos que empoderen a mis estudiantes. KallpaIA es una mina de oro para inspirar a las jóvenes a seguir carreras en STEAM. ¡Mis alumnas están más motivadas que nunca!",
    name: 'David L.',
    title: 'Profesora de Física',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'teacher portrait',
  },
  {
    quote: "Soy una desarrolladora autodidacta y ojalá hubiera tenido esto cuando empecé. La plataforma no solo enseña, sino que construye una comunidad donde las mujeres en STEAM podemos prosperar juntas.",
    name: 'Maria S.',
    title: 'Ingeniera de Software',
    avatar: 'https://placehold.co/100x100.png',
    aiHint: 'developer portrait',
  },
];

export function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="testimonials" className="py-20 sm:py-32 relative overflow-hidden" ref={sectionRef}>
      {/* Cosmic background particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" style={{animationDelay: '0s'}}></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/6 w-px h-8 bg-gradient-to-b from-fuchsia-400/20 to-transparent animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 border border-emerald-400/20 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#3B82F6] bg-clip-text text-transparent drop-shadow-lg">
            Voces que Inspiran ✨
          </h2>
          <p className="mt-2 text-white/80 text-lg">Conoce lo que estudiantes y familias dicen sobre KallpaWarmIA.</p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className={`group relative overflow-hidden transition-all duration-700 hover:scale-105 hover:rotate-1 animate-gentleFloat ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
                animationDelay: `${index * 0.5}s`,
                background: `linear-gradient(135deg, ${[
                  'rgba(147, 51, 234, 0.1), rgba(236, 72, 153, 0.1)', // purple to fuchsia
                  'rgba(59, 130, 246, 0.1), rgba(34, 211, 238, 0.1)', // blue to cyan
                  'rgba(34, 197, 94, 0.1), rgba(250, 204, 21, 0.1)', // green to yellow
                ][index % 3]})`,
                borderRadius: '24px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.5),
                  0 0 0 1px rgba(255, 255, 255, 0.05),
                  inset 0 1px 0 rgba(255, 255, 255, 0.1),
                  0 0 20px ${[
                    'rgba(147, 51, 234, 0.3)',
                    'rgba(59, 130, 246, 0.3)', 
                    'rgba(34, 197, 94, 0.3)'
                  ][index % 3]}
                `,
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)'
              }}
            >
              {/* Animated border glow */}
              <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                background: `linear-gradient(45deg, ${[
                  'rgba(147, 51, 234, 0.4), rgba(236, 72, 153, 0.4), rgba(147, 51, 234, 0.4)',
                  'rgba(59, 130, 246, 0.4), rgba(34, 211, 238, 0.4), rgba(59, 130, 246, 0.4)',
                  'rgba(34, 197, 94, 0.4), rgba(250, 204, 21, 0.4), rgba(34, 197, 94, 0.4)'
                ][index % 3]})`,
                backgroundSize: '300% 300%',
                animation: 'shimmer 3s ease-in-out infinite'
              }}></div>
              {/* Holographic shine effects */}
              <div className="absolute top-3 left-6 w-12 h-12 bg-gradient-to-br from-white/30 to-transparent rounded-full blur-md opacity-60 group-hover:opacity-90 transition-all duration-500 animate-pulse"></div>
              <div className="absolute top-6 left-8 w-6 h-6 bg-gradient-to-br from-cyan-300/40 to-transparent rounded-full blur-sm opacity-40 group-hover:opacity-70 transition-all duration-700"></div>
              
              {/* Cosmic emoji badge */}
              <div className="absolute top-4 right-4 z-20">
                <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-2xl transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-all duration-500" style={{
                  background: `linear-gradient(135deg, ${[
                    'rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9)',
                    'rgba(59, 130, 246, 0.9), rgba(34, 211, 238, 0.9)',
                    'rgba(34, 197, 94, 0.9), rgba(250, 204, 21, 0.9)'
                  ][index % 3]})`,
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <span className="animate-pulse">{index === 0 ? '🚀' : index === 1 ? '🎯' : '💎'}</span>
                </div>
              </div>
              
              {/* Enhanced floating particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-8 right-12 w-3 h-3 border-2 border-purple-400/40 rotate-45 animate-spin" style={{animationDelay: '0.3s', animationDuration: '4s'}}></div>
                <div className="absolute bottom-12 left-6 w-2 h-2 bg-cyan-400/50 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                <div className="absolute top-1/2 right-4 w-1 h-8 bg-gradient-to-b from-fuchsia-400/40 to-transparent animate-pulse" style={{animationDelay: '0.7s'}}></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-emerald-400/40 rounded-full animate-ping" style={{animationDelay: '1.5s'}}></div>
                <div className="absolute top-12 left-12 w-1 h-1 bg-yellow-400/60 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
              </div>
              
              <CardContent className="p-6 pt-18 relative z-10">
                {/* Enhanced quote bubble */}
                 <div className="relative mb-6 rounded-2xl p-5 shadow-2xl transform -rotate-1 group-hover:rotate-0 group-hover:scale-[1.02] transition-all duration-500" style={{
                   background: 'rgba(255, 255, 255, 0.05)',
                   border: '1px solid rgba(255, 255, 255, 0.1)',
                   backdropFilter: 'blur(25px) saturate(180%)',
                   WebkitBackdropFilter: 'blur(25px) saturate(180%)',
                   boxShadow: `
                     0 8px 32px rgba(0, 0, 0, 0.3),
                     inset 0 1px 0 rgba(255, 255, 255, 0.1),
                     0 0 15px ${[
                       'rgba(147, 51, 234, 0.2)',
                       'rgba(59, 130, 246, 0.2)',
                       'rgba(34, 197, 94, 0.2)'
                     ][index % 3]}
                   `
                 }}>
                   <div className="absolute -top-2 -left-2 text-2xl animate-bounce" style={{animationDelay: `${index * 0.2}s`}}>💬</div>
                   <p className="text-sm leading-relaxed font-medium text-white/90 pl-4 relative z-10">{testimonial.quote}</p>
                   <div className="absolute -bottom-2 left-8 w-6 h-6 transform rotate-45" style={{
                     background: 'rgba(255, 255, 255, 0.05)',
                     border: '1px solid rgba(255, 255, 255, 0.1)',
                     backdropFilter: 'blur(25px)'
                   }}></div>
                 </div>
                
                {/* Enhanced character area */}
                 <div className="rounded-xl p-4 group-hover:scale-[1.02] transition-all duration-500" style={{
                   background: 'rgba(255, 255, 255, 0.03)',
                   border: '1px solid rgba(255, 255, 255, 0.08)',
                   backdropFilter: 'blur(20px) saturate(180%)',
                   WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                   boxShadow: `
                     0 4px 20px rgba(0, 0, 0, 0.2),
                     inset 0 1px 0 rgba(255, 255, 255, 0.05)
                   `
                 }}>
                   <div className="flex items-center gap-4">
                     <div className="relative">
                       <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 relative overflow-hidden" style={{
                         background: `linear-gradient(135deg, ${[
                           'rgba(250, 204, 21, 0.8), rgba(236, 72, 153, 0.8)',
                           'rgba(59, 130, 246, 0.8), rgba(34, 211, 238, 0.8)',
                           'rgba(34, 197, 94, 0.8), rgba(147, 51, 234, 0.8)'
                         ][index % 3]})`,
                         border: '2px solid rgba(255, 255, 255, 0.2)',
                         backdropFilter: 'blur(10px)'
                       }}>
                         <span className="relative z-10">{index === 0 ? '👩‍💻' : index === 1 ? '👩‍🏫' : '👩‍🔬'}</span>
                         {/* Holographic overlay */}
                         <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                       </div>
                       {/* Enhanced bouncing indicator */}
                       <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-bounce border-2 border-white/30" style={{
                         background: `${['rgb(34, 197, 94)', 'rgb(59, 130, 246)', 'rgb(147, 51, 234)'][index % 3]}`,
                         animationDelay: `${index * 0.3}s`,
                         boxShadow: `0 0 10px ${['rgba(34, 197, 94, 0.5)', 'rgba(59, 130, 246, 0.5)', 'rgba(147, 51, 234, 0.5)'][index % 3]}`
                       }}></div>
                     </div>
                     <div className="flex-1">
                       <div className="rounded-lg p-3 mb-3 group-hover:scale-[1.01] transition-all duration-300" style={{
                         background: 'rgba(255, 255, 255, 0.05)',
                         border: '1px solid rgba(255, 255, 255, 0.1)',
                         backdropFilter: 'blur(15px)',
                         boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                       }}>
                         <p className="font-sans font-bold text-sm text-white/95 mb-1">{testimonial.name}</p>
                         <p className="font-sans font-medium text-xs text-cyan-300/90">{testimonial.title}</p>
                       </div>
                       <div className="flex gap-1">
                         {[...Array(5)].map((_, starIndex) => (
                           <span 
                             key={starIndex}
                             className="text-lg animate-pulse transition-all duration-300 hover:scale-125" 
                             style={{
                               color: 'rgb(250, 204, 21)',
                               textShadow: '0 0 10px rgba(250, 204, 21, 0.5)',
                               animationDelay: `${starIndex * 0.1}s`
                             }}
                           >
                             ⭐
                           </span>
                         ))}
                       </div>
                     </div>
                   </div>
                 </div>

              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
