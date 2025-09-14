'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Filter, Search, Star, Calendar, Users, Award, Sparkles, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Mentor {
  id: string;
  name: string;
  profession: string;
  area: string;
  experience: string;
  specialties: string[];
  availability: 'disponible' | 'ocupada' | 'proximamente';
  rating: number;
  sessions: number;
  image: string;
  description: string;
  xpReward: number;
  badge: string;
  planetFocus: string[];
}

const MENTORS: Mentor[] = [
  {
    id: 'laleska',
    name: 'Laleska Aroryo Aquino',
    profession: 'Mentora en Tecnología',
    area: 'Tecnología y Computación',
    experience: '5+ años en desarrollo de software',
    specialties: ['Programación', 'Desarrollo Web', 'Inteligencia Artificial', 'Ciberseguridad'],
    availability: 'disponible',
    rating: 5,
    sessions: 127,
    image: '👩‍💻',
    description: 'Especialista en tecnologías emergentes y desarrollo de aplicaciones. Te ayudo a dominar la programación y crear proyectos innovadores.',
    xpReward: 150,
    badge: 'Maestra Tech',
    planetFocus: ['mercury', 'mars']
  },
  {
    id: 'alexandra',
    name: 'Alexandra Valeria Ubaldo Aguado',
    profession: 'Mentora en Finanzas y Datos',
    area: 'Matemáticas y Análisis',
    experience: '7+ años en análisis financiero',
    specialties: ['Análisis de Datos', 'Finanzas', 'Estadística', 'Business Intelligence'],
    availability: 'disponible',
    rating: 5,
    sessions: 89,
    image: '📊',
    description: 'Experta en análisis de datos y finanzas. Te enseño a interpretar números y tomar decisiones basadas en datos.',
    xpReward: 140,
    badge: 'Analista Cósmica',
    planetFocus: ['jupiter', 'mercury']
  },
  {
    id: 'cybersecurity',
    name: 'Jr Offensive Cybersecurity Consultant',
    profession: 'Mentora en Ciberseguridad',
    area: 'Seguridad Digital',
    experience: '4+ años en seguridad informática',
    specialties: ['Ethical Hacking', 'Pentesting', 'Seguridad de Redes', 'Análisis de Vulnerabilidades'],
    availability: 'disponible',
    rating: 5,
    sessions: 156,
    image: '🛡️',
    description: 'Especialista en ciberseguridad ofensiva. Te entreno para proteger sistemas y detectar vulnerabilidades.',
    xpReward: 160,
    badge: 'Guardiana Digital',
    planetFocus: ['mars', 'mercury']
  },
  {
    id: 'carla',
    name: 'Carla Acha ✅',
    profession: 'Mentora en Educación Creativa y AR',
    area: 'Arte y Tecnología',
    experience: '6+ años en educación y realidad aumentada',
    specialties: ['Realidad Aumentada', 'Educación Digital', 'Diseño UX/UI', 'Creatividad'],
    availability: 'disponible',
    rating: 5,
    sessions: 203,
    image: '👩‍💻',
    description: 'Pionera en educación creativa con tecnología AR. Te ayudo a combinar arte, tecnología y educación.',
    xpReward: 170,
    badge: 'Innovadora AR',
    planetFocus: ['venus', 'mercury']
  },
  {
    id: 'estephany',
    name: 'Estephany Guevara Ruiz',
    profession: 'Mentora en Ciencias de la Tierra',
    area: 'Ciencias Ambientales',
    experience: '5+ años en investigación ambiental',
    specialties: ['Geología', 'Cambio Climático', 'Sostenibilidad', 'Investigación Ambiental'],
    availability: 'disponible',
    rating: 5,
    sessions: 94,
    image: '🌍',
    description: 'Investigadora en ciencias de la Tierra. Te guío en el estudio del planeta y la sostenibilidad ambiental.',
    xpReward: 130,
    badge: 'Guardiana Terrestre',
    planetFocus: ['earth', 'venus']
  },
  {
    id: 'coming-soon',
    name: 'Próximamente... 🔥',
    profession: 'Mentora en formación',
    area: 'Múltiples especialidades',
    experience: 'Próximamente disponible',
    specialties: ['Por definir'],
    availability: 'proximamente',
    rating: 0,
    sessions: 0,
    image: '🚀',
    description: 'Nueva mentora cósmica en preparación. ¡Mantente atenta para conocer su especialidad!',
    xpReward: 0,
    badge: 'Próximamente',
    planetFocus: []
  }
];

export default function MentoriasPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'secundaria'>('all');
  const [areaFilter, setAreaFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMentors = MENTORS.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.area.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         mentor.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesArea = areaFilter === 'all' || mentor.area.toLowerCase().includes(areaFilter.toLowerCase());
    
    return matchesSearch && matchesArea;
  });

  const handleReserveSession = (mentorId: string) => {
    if (mentorId === 'coming-soon') return;
    // Implementar lógica de reserva de sesión
    alert(`¡Sesión reservada! Has ganado XP y un nuevo badge. 🌟`);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a0033 25%, #000066 50%, #330066 75%, #000000 100%)'
    }}>
      {/* Botón volver al dashboard */}
      <div className="absolute top-6 left-6 z-50">
        <Button
          onClick={() => router.push('/dashboard')}
          variant="outline"
          className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 hover:border-white/30 transition-all duration-300"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al Dashboard
        </Button>
      </div>

      {/* Partículas animadas de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          >
            {Math.random() > 0.7 ? (
              <Sparkles className="w-2 h-2 text-purple-400/60" />
            ) : (
              <div className="w-1 h-1 bg-white/40 rounded-full" />
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header cósmico */}
        <div className="text-center mb-12 pt-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#EC4899] to-[#7C3AED] flex items-center justify-center animate-pulse" style={{
              boxShadow: '0 0 40px rgba(236, 72, 153, 0.6)'
            }}>
              <span className="text-4xl">👩‍🏫</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#EC4899] via-[#7C3AED] to-[#3B82F6] bg-clip-text text-transparent mb-4">
            Mentorías Cósmicas ✨
          </h1>
          
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Exploradora, conecta con expertas que iluminarán tu camino hacia las estrellas STEAM
          </p>

          {/* Estadísticas gamificadas */}
          <div className="flex justify-center gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-[#FACC15]">{MENTORS.filter(m => m.availability === 'disponible').length}</div>
              <div className="text-sm text-white/70">Mentoras Activas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-[#22C55E]">{MENTORS.reduce((acc, m) => acc + m.sessions, 0)}</div>
              <div className="text-sm text-white/70">Sesiones Completadas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
              <div className="text-2xl font-bold text-[#EC4899]">5.0</div>
              <div className="text-sm text-white/70">Rating Promedio</div>
            </div>
          </div>
        </div>

        {/* Filtros simplificados */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Búsqueda */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Search className="inline-block w-4 h-4 mr-1" />
                  Buscar Mentora
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Nombre o especialidad..."
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent"
                />
              </div>

              {/* Filtro por nivel */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Filter className="inline-block w-4 h-4 mr-1" />
                  Nivel Educativo
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'secundaria')}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent"
                >
                  <option value="all" className="bg-gray-800">Todos los niveles</option>
                  <option value="secundaria" className="bg-gray-800">Secundaria</option>
                </select>
              </div>

              {/* Filtro por área STEAM */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Zap className="inline-block w-4 h-4 mr-1" />
                  Área STEAM
                </label>
                <select
                  value={areaFilter}
                  onChange={(e) => setAreaFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#EC4899] focus:border-transparent"
                >
                  <option value="all" className="bg-gray-800">Todas las áreas</option>
                  <option value="tecnología" className="bg-gray-800">Tecnología</option>
                  <option value="matemáticas" className="bg-gray-800">Matemáticas</option>
                  <option value="ciencias" className="bg-gray-800">Ciencias</option>
                  <option value="arte" className="bg-gray-800">Arte</option>
                  <option value="ingeniería" className="bg-gray-800">Ingeniería</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Grid de tarjetas de mentoras (3x2) */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredMentors.map((mentor) => (
              <div
                key={mentor.id}
                className={`
                  relative group rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 hover:-translate-y-2
                  ${mentor.availability === 'proximamente' 
                    ? 'bg-gradient-to-br from-gray-600/20 to-gray-800/20 border-gray-500/30' 
                    : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-[#EC4899]/50'
                  }
                `}
                style={{
                  backdropFilter: 'blur(20px)',
                  border: '1px solid',
                  boxShadow: mentor.availability !== 'proximamente' 
                    ? '0 0 30px rgba(236, 72, 153, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)'
                    : '0 0 20px rgba(107, 114, 128, 0.3)'
                }}
              >
                {/* Efecto glass */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Badge de estado */}
                {mentor.availability === 'disponible' && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-[#22C55E] to-[#10B981] text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30 animate-pulse" style={{
                      boxShadow: '0 0 15px rgba(34, 197, 94, 0.6)'
                    }}>
                      ✨ Disponible
                    </div>
                  </div>
                )}
                
                {mentor.availability === 'proximamente' && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white text-xs font-bold px-3 py-1 rounded-full border border-white/30" style={{
                      boxShadow: '0 0 15px rgba(245, 158, 11, 0.6)'
                    }}>
                      🔥 Próximamente
                    </div>
                  </div>
                )}

                <div className="relative z-10 p-6">
                  {/* Avatar y rating */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EC4899] to-[#7C3AED] flex items-center justify-center text-3xl" style={{
                        boxShadow: '0 0 20px rgba(236, 72, 153, 0.4)'
                      }}>
                        {mentor.image}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-bold text-white mb-1">{mentor.name}</h3>
                        <p className="text-[#EC4899] text-sm font-medium">{mentor.profession}</p>
                      </div>
                    </div>
                    
                    {mentor.rating > 0 && (
                      <div className="flex items-center gap-1 bg-black/30 rounded-full px-2 py-1">
                        <Star className="w-4 h-4 text-[#FACC15] fill-current" />
                        <span className="text-white text-sm font-bold">{mentor.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Descripción */}
                  <p className="text-white/80 text-sm mb-4 leading-relaxed">
                    {mentor.description}
                  </p>

                  {/* Especialidades */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {mentor.specialties.slice(0, 3).map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-white/10 text-white/90 text-xs px-2 py-1 rounded-full border border-white/20"
                        >
                          {specialty}
                        </span>
                      ))}
                      {mentor.specialties.length > 3 && (
                        <span className="text-white/60 text-xs px-2 py-1">
                          +{mentor.specialties.length - 3} más
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Estadísticas */}
                  {mentor.availability !== 'proximamente' && (
                    <div className="flex items-center justify-between mb-4 text-sm">
                      <div className="flex items-center gap-1 text-white/70">
                        <Users className="w-4 h-4" />
                        <span>{mentor.sessions} sesiones</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#FACC15]">
                        <Award className="w-4 h-4" />
                        <span>+{mentor.xpReward} XP</span>
                      </div>
                    </div>
                  )}

                  {/* Botón de acción */}
                  <Button
                    onClick={() => handleReserveSession(mentor.id)}
                    disabled={mentor.availability === 'proximamente'}
                    className={`
                      w-full font-bold transition-all duration-300
                      ${mentor.availability === 'proximamente'
                        ? 'bg-gray-600/50 text-gray-300 cursor-not-allowed'
                        : 'bg-gradient-to-r from-[#EC4899] to-[#7C3AED] hover:from-[#BE185D] hover:to-[#6D28D9] text-white hover:scale-105'
                      }
                    `}
                    style={{
                      boxShadow: mentor.availability !== 'proximamente' 
                        ? '0 0 20px rgba(236, 72, 153, 0.4)'
                        : 'none'
                    }}
                  >
                    {mentor.availability === 'proximamente' ? (
                      <>🔥 Próximamente</>
                    ) : (
                      <>✨ Reservar Sesión</>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sección de recomendadas */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20" style={{
            boxShadow: '0 0 30px rgba(250, 204, 21, 0.3)'
          }}>
            <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
              <Star className="w-6 h-6 text-[#FACC15]" />
              Recomendadas para Ti
            </h3>
            <p className="text-white/80 text-center mb-6">
              Basado en tu Test Vocacional, estas mentoras pueden guiarte mejor en tu camino cósmico:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-[#EC4899]/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">👩‍💻</span>
                  <div>
                    <h4 className="text-white font-bold">Carla Acha</h4>
                    <p className="text-[#EC4899] text-sm">Perfecta para Planeta Venus (Arte + Tech)</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-[#3B82F6]/30">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl">🛡️</span>
                  <div>
                    <h4 className="text-white font-bold">Cybersecurity Expert</h4>
                    <p className="text-[#3B82F6] text-sm">Ideal para Planeta Marte (Seguridad)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gamificación info */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-gradient-to-r from-[#FACC15]/20 to-[#EC4899]/20 backdrop-blur-sm rounded-3xl p-6 border border-[#FACC15]/30">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Zap className="w-5 h-5 text-[#FACC15]" />
              Sistema de Recompensas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-white font-bold">+130-170 XP</div>
                <div className="text-white/70">Por sesión completada</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🏆</div>
                <div className="text-white font-bold">Badges Únicos</div>
                <div className="text-white/70">Colecciona insignias</div>
              </div>
              <div className="text-center">
                <div className="text-2xl mb-2">🌟</div>
                <div className="text-white font-bold">Ranking</div>
                <div className="text-white/70">Sube de nivel</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}