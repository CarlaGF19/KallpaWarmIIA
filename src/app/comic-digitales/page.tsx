"use client";

import Link from "next/link";
import { BookOpen, Download, ExternalLink, Sparkles, Lock, Globe } from "lucide-react";
import { useState } from "react";

const READ_ES_URL = "https://g.co/gemini/share/8bfbcb748194";
const READ_QU_URL = "https://g.co/gemini/share/1feca566fbd3";

interface Comic {
  id: string;
  title: string;
  author: string;
  institution: string;
  status: 'available' | 'coming-soon';
  badge: string;
  badgeIcon: string;
  description: string;
  coverIcon: string;
  unlocksBadge?: string;
  futureBadge?: string;
  readUrl?: string;
  pdfUrl?: string;
  quechuaUrl?: string;
}

const comicsData: Comic[] = [
  {
    id: 'mary-jackson',
    title: 'Mary Jackson',
    author: 'NASA',
    institution: 'NASA',
    status: 'available',
    badge: '✅ Disponible',
    badgeIcon: '✅',
    description: 'La ingeniería que alcanzó las estrellas',
    coverIcon: '🚀',
    unlocksBadge: 'Exploradora Espacial',
    readUrl: READ_ES_URL,
    quechuaUrl: READ_QU_URL
  },
  {
    id: 'katherine-johnson',
    title: 'Katherine Johnson',
    author: 'NASA',
    institution: 'NASA',
    status: 'coming-soon',
    badge: '🔥 Próximamente',
    badgeIcon: '🔥',
    description: 'Los cálculos que llevaron al hombre a la Luna',
    coverIcon: '🌙',
    futureBadge: 'Matemática Visionaria'
  },
  {
    id: 'dorothy-vaughan',
    title: 'Dorothy Vaughan',
    author: 'NASA',
    institution: 'NASA',
    status: 'coming-soon',
    badge: '🔥 Próximamente',
    badgeIcon: '🔥',
    description: 'La programadora que revolucionó la computación',
    coverIcon: '💻',
    futureBadge: 'Pionera Digital'
  }
];

// Función para obtener el glow según el estado
const getStatusGlow = (status: string) => {
  switch (status) {
    case 'available':
      return 'shadow-[0_0_30px_rgba(34,197,94,0.4)] hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]';
    case 'coming-soon':
      return 'shadow-[0_0_30px_rgba(236,72,153,0.4)] hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]';
    default:
      return '';
  }
};

// Función para obtener el gradiente del borde según el estado
const getStatusBorder = (status: string) => {
  switch (status) {
    case 'available':
      return 'from-[#22C55E] to-[#16A34A]';
    case 'coming-soon':
      return 'from-[#EC4899] to-[#BE185D]';
    default:
      return 'from-white/20 to-white/10';
  }
};

export default function ComicsDigitales() {
  const [hoveredComic, setHoveredComic] = useState<string | null>(null);
  const availableComics = comicsData.filter(comic => comic.status === 'available').length;
  const totalComics = comicsData.length;

  const handleComicClick = (comic: Comic) => {
    if (comic.status === 'coming-soon') {
      // Mostrar tooltip o mensaje
      return;
    }
  };

  return (
    <section className="kallpa-comics min-h-screen bg-[#0B0F19] text-[#F9FAFB] relative overflow-hidden">
      {/* Partículas cósmicas de fondo */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`cosmic-particle-${i}`}
            className="absolute text-[#7C3AED]/20 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              fontSize: `${0.5 + Math.random() * 0.5}rem`,
              filter: 'drop-shadow(0 0 4px currentColor)'
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 relative z-10">
        {/* Header/breadcrumb */}
        <header className="flex items-center gap-3 mb-8">
          <Link
            href="/dashboard"
            className="rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]"
            aria-label="Volver al dashboard"
            title="Inicio (dashboard)"
          >
            Inicio
          </Link>
          <span className="text-white/40">/</span>
          <h1 className="text-3xl font-bold inline-flex items-center gap-3 text-white" style={{
            textShadow: '0 0 20px rgba(250, 204, 21, 0.6)'
          }}>
            Cómics Digitales <Sparkles className="h-6 w-6 text-[#FACC15] animate-pulse" />
          </h1>
        </header>

        {/* Barra de progreso gamificada */}
        <div className="mb-8 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 backdrop-blur-md" style={{
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.2), inset 0 0 20px rgba(124, 58, 237, 0.1)'
        }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2" style={{
              textShadow: '0 0 15px rgba(250, 204, 21, 0.8)'
            }}>
              📚 Catálogo Cósmico
            </h2>
            <div className="text-lg font-semibold text-[#22C55E]" style={{
              textShadow: '0 0 10px rgba(34, 197, 94, 0.8)'
            }}>
              {availableComics} de {totalComics} cómics disponibles
            </div>
          </div>
          
          {/* Barra de progreso */}
          <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/20">
            <div 
              className="h-full bg-gradient-to-r from-[#22C55E] to-[#FACC15] transition-all duration-1000 ease-out"
              style={{ 
                width: `${(availableComics / totalComics) * 100}%`,
                boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)'
              }}
            />
          </div>
        </div>

        {/* Grid de cómics en columna */}
        <div className="space-y-6">
          {comicsData.map((comic, index) => (
            <div
              key={comic.id}
              className={`group relative p-[3px] rounded-2xl transition-all duration-500 cursor-pointer ${
                comic.status === 'coming-soon' ? 'opacity-70' : 'hover:scale-[1.02]'
              } ${getStatusGlow(comic.status)}`}
              style={{
                background: `linear-gradient(135deg, ${getStatusBorder(comic.status).replace('from-', '').replace(' to-', ', ')})`,
                perspective: '1000px'
              }}
              onMouseEnter={() => setHoveredComic(comic.id)}
              onMouseLeave={() => setHoveredComic(null)}
              onClick={() => handleComicClick(comic)}
            >
              {/* Tarjeta principal */}
              <div className="relative bg-gradient-to-br from-[#0B0F19] via-[#1a1f2e] to-[#0B0F19] rounded-2xl p-6 border-2 border-white/20 backdrop-blur-md overflow-hidden">
                {/* Efectos de partículas en hover */}
                {hoveredComic === comic.id && comic.status === 'available' && (
                  <div className="absolute inset-0 pointer-events-none">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={`particle-${i}`}
                        className="absolute text-[#22C55E]/60 animate-bounce"
                        style={{
                          top: `${20 + Math.random() * 60}%`,
                          left: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.1}s`,
                          fontSize: '0.8rem',
                          filter: 'drop-shadow(0 0 4px currentColor)'
                        }}
                      >
                        ✨
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-6">
                  {/* Portada/ícono a la izquierda */}
                  <div className={`relative flex-shrink-0 w-20 h-20 rounded-xl flex items-center justify-center text-4xl transition-all duration-300 ${
                    hoveredComic === comic.id ? 'scale-110 rotate-6' : 'scale-100'
                  }`} style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: comic.status === 'available' 
                      ? '0 0 20px rgba(34, 197, 94, 0.4)' 
                      : '0 0 20px rgba(236, 72, 153, 0.4)'
                  }}>
                    {comic.coverIcon}
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Contenido central */}
                  <div className="flex-1 space-y-2">
                    {/* Título y autora */}
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3" style={{
                      textShadow: '0 0 15px rgba(250, 204, 21, 0.6)'
                    }}>
                      📖 {comic.title}
                      {comic.status === 'available' && (
                        <span className="text-sm px-2 py-1 rounded-full bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/30 animate-pulse">
                          {comic.badge}
                        </span>
                      )}
                      {comic.status === 'coming-soon' && (
                        <span className="text-sm px-2 py-1 rounded-full bg-[#EC4899]/20 text-[#EC4899] border border-[#EC4899]/30 animate-pulse">
                          {comic.badge}
                        </span>
                      )}
                    </h3>

                    {/* Institución */}
                    <p className="text-[#7C3AED] font-semibold flex items-center gap-2" style={{
                      textShadow: '0 0 10px rgba(124, 58, 237, 0.6)'
                    }}>
                      🛰️ {comic.institution}
                    </p>

                    {/* Descripción */}
                    <p className="text-white/80 text-lg">
                      {comic.description}
                    </p>

                    {/* Badge de desbloqueo */}
                    {comic.unlocksBadge && (
                      <div className="flex items-center gap-2 text-[#FACC15]" style={{
                        textShadow: '0 0 10px rgba(250, 204, 21, 0.8)'
                      }}>
                        <span className="text-sm">🏆 Desbloquea:</span>
                        <span className="font-semibold">{comic.unlocksBadge}</span>
                      </div>
                    )}
                    {comic.futureBadge && (
                      <div className="flex items-center gap-2 text-[#EC4899]" style={{
                        textShadow: '0 0 10px rgba(236, 72, 153, 0.8)'
                      }}>
                        <span className="text-sm">🔮 Badge futuro:</span>
                        <span className="font-semibold">{comic.futureBadge}</span>
                      </div>
                    )}
                  </div>

                  {/* Botones a la derecha */}
                  <div className="flex-shrink-0 space-y-3">
                    {comic.status === 'available' ? (
                      <>
                        {/* Botón Leer */}
                        {comic.readUrl && (
                          <a
                            href={comic.readUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#22C55E]/20 text-[#22C55E] border-2 border-[#22C55E]/30 hover:bg-[#22C55E]/30 hover:border-[#22C55E]/50 transition-all duration-300 font-semibold"
                            style={{
                              boxShadow: '0 0 15px rgba(34, 197, 94, 0.3)'
                            }}
                          >
                            <BookOpen className="h-4 w-4" />
                            📖 Leer
                          </a>
                        )}

                        {/* Botón PDF (deshabilitado) */}
                        <button
                          disabled
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white/50 border-2 border-white/20 cursor-not-allowed"
                          title="Próximamente disponible"
                        >
                          <Download className="h-4 w-4" />
                          📥 PDF
                        </button>

                        {/* Botón Idiomas */}
                        {comic.quechuaUrl && (
                          <a
                            href={comic.quechuaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#7C3AED]/20 text-[#7C3AED] border-2 border-[#7C3AED]/30 hover:bg-[#7C3AED]/30 hover:border-[#7C3AED]/50 transition-all duration-300 font-semibold"
                            style={{
                              boxShadow: '0 0 15px rgba(124, 58, 237, 0.3)'
                            }}
                          >
                            <Globe className="h-4 w-4" />
                            🌍 Quechua
                          </a>
                        )}
                      </>
                    ) : (
                      /* Botones bloqueados para próximamente */
                      <div className="space-y-3">
                        <button
                          disabled
                          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#EC4899]/10 text-[#EC4899]/60 border-2 border-[#EC4899]/20 cursor-not-allowed"
                          title="Exploradora, este cómic se abrirá pronto"
                        >
                          <Lock className="h-4 w-4" />
                          🔒 Bloqueado
                        </button>
                        <div className="text-xs text-[#EC4899]/80 text-center" style={{
                          textShadow: '0 0 8px rgba(236, 72, 153, 0.6)'
                        }}>
                          Próximamente
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer motivacional */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-br from-[#7C3AED]/20 to-[#EC4899]/20 border-2 border-white/20 backdrop-blur-md text-center" style={{
          boxShadow: '0 0 30px rgba(124, 58, 237, 0.2)'
        }}>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-[#FACC15] text-2xl animate-pulse" style={{filter: 'drop-shadow(0 0 8px #FACC15)'}}>✨</span>
            <h3 className="text-xl font-bold text-white" style={{
              textShadow: '0 0 15px rgba(250, 204, 21, 0.8)'
            }}>
              ¡Tu biblioteca cósmica está creciendo, Exploradora!
            </h3>
            <span className="text-[#FACC15] text-2xl animate-pulse" style={{filter: 'drop-shadow(0 0 8px #FACC15)'}}>✨</span>
          </div>
          <p className="text-white/80 text-lg">
            Cada historia leída te acerca más a convertirte en una verdadera Guerrera STEM 🌟
          </p>
        </div>
      </div>
    </section>
  );
}