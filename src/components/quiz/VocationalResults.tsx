'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, Star, Rocket, ExternalLink, BookOpen, Users, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface VocationalResultsProps {
  results: Record<string, number>;
  onRestart: () => void;
}

interface Planet {
  id: string;
  name: string;
  title: string;
  description: string;
  careers: string[];
  color: string;
  gradient: string;
  icon: string;
  referent: {
    name: string;
    profession: string;
    achievement: string;
    quote: string;
    image: string;
  };
  universities: string[];
  skills: string[];
  scholarships: string[];
  badge: string;
}

const PLANETS: Record<string, Planet> = {
  ciencia_salud: {
    id: 'ciencia_salud',
    name: 'Ciencia y Salud',
    title: '🔬 Planeta Ciencia y Salud',
    description: 'Eres una sanadora y científica nata. Te apasiona descubrir, investigar y aplicar el conocimiento científico para mejorar la salud y el bienestar de las personas.',
    careers: [
      'Medicina',
      'Biología',
      'Farmacia',
      'Enfermería',
      'Nutrición',
      'Biotecnología'
    ],
    color: '#EC4899',
    gradient: 'from-[#EC4899] to-[#BE185D]',
    icon: '🔬',
    referent: {
      name: 'Dra. Patricia García',
      profession: 'Médica Epidemióloga Peruana',
      achievement: 'Ex Ministra de Salud del Perú, líder en salud pública y investigación epidemiológica en América Latina.',
      quote: '"La ciencia debe estar al servicio de la salud de todos los peruanos, especialmente los más vulnerables."',
      image: '👩‍🔬'
    },
    universities: [
      'UNMSM (Medicina, Biología)',
      'UNSA Arequipa (Enfermería, Farmacia)',
      'UNALM (Biología)',
      'UPC (Medicina ~ S/ 6,500)',
      'UTP (Enfermería ~ S/ 3,500)',
      'USMP (Nutrición ~ S/ 4,800)'
    ],
    skills: [
       'Investigación científica',
       'Análisis clínico',
       'Empatía y cuidado',
       'Precisión técnica',
       'Trabajo en equipo médico'
     ],
     scholarships: [
       'Beca 18',
       'Beca Perú',
       'Beca Hijos de Docentes',
       'Beca Corea/China/Hungría'
     ],
     badge: 'Exploradora Científica'
   },
  ingenieria_civil: {
    id: 'ingenieria_civil',
    name: 'Ingeniería Civil y Construcción',
    title: '🏗️ Planeta Ingeniería Civil y Construcción',
    description: 'Eres una constructora de sueños y realidades. Te fascina diseñar, planificar y construir infraestructuras que transformen comunidades y mejoren la calidad de vida.',
    careers: [
      'Ingeniería Civil',
      'Arquitectura',
      'Topografía',
      'Ingeniería Ambiental',
      'Construcción',
      'Urbanismo'
    ],
    color: '#F59E0B',
    gradient: 'from-[#F59E0B] to-[#D97706]',
    icon: '🏗️',
    referent: {
      name: 'Arq. Sandra Barclay',
      profession: 'Arquitecta Peruana',
      achievement: 'Ganadora del Premio Pritzker 2021, reconocida mundialmente por su arquitectura sostenible y socialmente responsable.',
      quote: '"La arquitectura debe responder a las necesidades reales de las personas y su entorno."',
      image: '👩‍💼'
    },
    universities: [
      'UNI (Civil, Ambiental)',
      'UNMSM (Arquitectura, Civil)',
      'UNPRG Lambayeque (Civil)',
      'UPC (Civil ~ S/ 6,000)',
      'UTP (Ambiental ~ S/ 4,200)',
      'PUCP (Arquitectura ~ S/ 7,500)'
    ],
    skills: [
       'Diseño estructural',
       'Planificación urbana',
       'Gestión de proyectos',
       'Sostenibilidad',
       'Liderazgo en obra'
     ],
     scholarships: [
       'Beca 18',
       'Beca Perú',
       'Beca del Gobierno Chino',
       'Beca Hungría'
     ],
     badge: 'Constructora Civil'
   },
  ingenieria_industrial: {
    id: 'ingenieria_industrial',
    name: 'Ingeniería Industrial y Mecánica',
    title: '⚙️ Planeta Ingeniería Industrial y Mecánica',
    description: 'Eres una optimizadora de procesos y sistemas. Te apasiona mejorar la eficiencia, innovar en manufactura y crear soluciones industriales sostenibles.',
    careers: [
      'Ingeniería Industrial',
      'Ingeniería Mecánica',
      'Ingeniería Química',
      'Energías Renovables',
      'Automatización',
      'Gestión de Operaciones'
    ],
    color: '#6B7280',
    gradient: 'from-[#6B7280] to-[#374151]',
    icon: '⚙️',
    referent: {
      name: 'Ing. Magali Silva',
      profession: 'Ingeniera Industrial Peruana',
      achievement: 'Ex Ministra de Producción, líder en desarrollo industrial y promoción de la manufactura en el Perú.',
      quote: '"La ingeniería industrial es clave para el desarrollo económico y la competitividad del país."',
      image: '👩‍🔧'
    },
    universities: [
      'UNI (Industrial, Mecánica)',
      'UNSA (Industrial)',
      'UNTRUJ (Química, Industrial)',
      'PUCP (Industrial ~ S/ 7,000)',
      'UPC (Mecánica ~ S/ 6,200)',
      'UTP (Industrial ~ S/ 4,500)'
    ],
    skills: [
       'Optimización de procesos',
       'Gestión de calidad',
       'Innovación tecnológica',
       'Análisis de sistemas',
       'Liderazgo industrial'
     ],
     scholarships: [
       'Beca 18',
       'Beca Perú',
       'Beca Corea (GKS)',
       'Programas de Energía Verde'
     ],
     badge: 'Ingeniera Industrial'
   },
  tecnologia_computacion: {
    id: 'tecnologia_computacion',
    name: 'Tecnología y Computación',
    title: '💻 Planeta Tecnología y Computación',
    description: 'Eres una arquitecta del futuro digital. Te fascina programar, crear aplicaciones innovadoras y usar la tecnología para resolver problemas complejos del mundo moderno.',
    careers: [
      'Ingeniería de Software',
      'Ingeniería de Sistemas',
      'Ciberseguridad',
      'Ciencia de Datos',
      'Desarrollo Web',
      'Inteligencia Artificial'
    ],
    color: '#3B82F6',
    gradient: 'from-[#3B82F6] to-[#1D4ED8]',
    icon: '💻',
    referent: {
      name: 'Paloma Noceda',
      profession: 'Ingeniera de Software Peruana',
      achievement: 'Líder en tecnología en empresas globales, promotora de la inclusión femenina en STEM y mentora de jóvenes programadoras.',
      quote: '"La tecnología debe ser inclusiva y accesible para transformar positivamente la sociedad."',
      image: '👩‍💻'
    },
    universities: [
      'UNI (Sistemas)',
      'UNMSM (Software, Informática)',
      'UNALM (Datos + Informática)',
      'UPC (Software ~ S/ 6,000)',
      'UTP (Sistemas ~ S/ 4,000)',
      'USIL (Ciberseguridad ~ S/ 5,500)'
    ],
    skills: [
       'Programación avanzada',
       'Pensamiento lógico',
       'Resolución de problemas',
       'Innovación digital',
       'Trabajo en equipo ágil'
     ],
     scholarships: [
       'Beca 18',
       'Beca Perú',
       'Bootcamps internacionales (Girls in AI)',
       'Huawei Seeds for the Future'
     ],
     badge: 'Guerrera Digital'
   },
  matematicas_finanzas: {
    id: 'matematicas_finanzas',
    name: 'Matemáticas y Finanzas',
    title: '📐 Planeta Matemáticas y Finanzas',
    description: 'Eres una analista de patrones y números. Te apasiona descifrar datos, crear modelos predictivos y usar las matemáticas para tomar decisiones estratégicas.',
    careers: [
      'Economía',
      'Estadística',
      'Matemáticas Puras',
      'Finanzas',
      'Actuaría',
      'Análisis Cuantitativo'
    ],
    color: '#10B981',
    gradient: 'from-[#10B981] to-[#047857]',
    icon: '📐',
    referent: {
      name: 'Dra. Roxana Barrantes',
      profession: 'Economista Peruana',
      achievement: 'Investigadora principal del IEP, experta en economía digital y políticas públicas, referente en análisis económico del Perú.',
      quote: '"Los números cuentan historias que pueden transformar políticas y mejorar vidas."',
      image: '👩‍💼'
    },
    universities: [
      'UNMSM (Estadística, Economía)',
      'UNI (Matemática pura)',
      'UNSA (Economía)',
      'PUCP (Economía ~ S/ 7,200)',
      'UTP (Finanzas ~ S/ 4,000)',
      'UPC (Economía y Finanzas ~ S/ 6,200)'
    ],
    skills: [
      'Análisis cuantitativo',
      'Modelado matemático',
      'Pensamiento estratégico',
      'Interpretación de datos',
      'Toma de decisiones'
    ],
    scholarships: [
      'Beca 18',
      'Beca Perú',
      'Becas de cooperación internacional (Corea, Hungría)'
    ],
    badge: 'Analista Financiera'
  },
  creatividad_diseno: {
    id: 'creatividad_diseno',
    name: 'Creatividad y Diseño',
    title: '🎨 Planeta Creatividad y Diseño',
    description: 'Eres una creadora de experiencias visuales y narrativas. Te apasiona comunicar ideas a través del arte, el diseño y los medios creativos.',
    careers: [
      'Diseño Gráfico',
      'Arquitectura',
      'Comunicación',
      'Publicidad',
      'Artes Visuales',
      'Diseño UX/UI'
    ],
    color: '#8B5CF6',
    gradient: 'from-[#8B5CF6] to-[#7C3AED]',
    icon: '🎨',
    referent: {
      name: 'Elena Izcue',
      profession: 'Diseñadora Peruana',
      achievement: 'Pionera del diseño gráfico peruano, creadora de la identidad visual de marcas icónicas y promotora del arte peruano contemporáneo.',
      quote: '"El diseño es el puente entre la funcionalidad y la belleza, entre la idea y la realidad."',
      image: '👩‍🎨'
    },
    universities: [
      'UNMSM (Arte, Comunicación)',
      'ENSABAP (Artes)',
      'UNJBG Tacna (Arquitectura)',
      'PUCP (Arte y Diseño ~ S/ 7,500)',
      'Toulouse Lautrec (Diseño ~ S/ 4,800)',
      'UPC (Comunicación ~ S/ 5,500)'
    ],
    skills: [
      'Creatividad visual',
      'Comunicación efectiva',
      'Pensamiento estético',
      'Storytelling',
      'Innovación creativa'
    ],
    scholarships: [
      'Beca Perú',
      'Beca Talento Escolar',
      'Convenios culturales'
    ],
    badge: 'Guerrera Creativa'
  },
  agro_ambiental: {
    id: 'agro_ambiental',
    name: 'Agro e Impacto Ambiental',
    title: '🌱 Planeta Agro e Impacto Ambiental',
    description: 'Eres una guardiana de la naturaleza y la sostenibilidad. Te apasiona proteger el medio ambiente, desarrollar agricultura sostenible y crear un futuro verde.',
    careers: [
      'Agronomía',
      'Veterinaria',
      'Ingeniería Forestal',
      'Gestión Ambiental',
      'Biología Marina',
      'Desarrollo Sostenible'
    ],
    color: '#22C55E',
    gradient: 'from-[#22C55E] to-[#16A34A]',
    icon: '🌱',
    referent: {
      name: 'Dra. Antonietta Gutiérrez',
      profession: 'Bióloga Marina Peruana',
      achievement: 'Investigadora del mar peruano, experta en conservación marina y líder en la protección de ecosistemas costeros del Perú.',
      quote: '"Proteger nuestros océanos y bosques es proteger el futuro de la humanidad."',
      image: '👩‍🌾'
    },
    universities: [
      'UNALM (Agronomía, Forestal)',
      'UNSAAC Cusco (Veterinaria)',
      'UNMSM (Ambiental)',
      'UTP (Ambiental ~ S/ 4,200)',
      'UPC (Veterinaria ~ S/ 5,800)',
      'Científica del Sur (Ambiental ~ S/ 6,000)'
    ],
    skills: [
      'Conciencia ambiental',
      'Investigación de campo',
      'Sostenibilidad',
      'Conservación',
      'Gestión de recursos'
    ],
    scholarships: [
      'Beca 18',
      'Beca Perú',
      'Beca Ambiental Internacional (China, Corea)'
    ],
    badge: 'Guardiana Ambiental'
  },
  innovacion_emprendimiento: {
    id: 'innovacion_emprendimiento',
    name: 'Innovación y Emprendimiento',
    title: '🚀 Planeta Innovación y Emprendimiento',
    description: 'Eres una visionaria y líder empresarial. Te apasiona crear nuevos negocios, liderar equipos y generar impacto positivo a través de la innovación.',
    careers: [
      'Administración',
      'Emprendimiento',
      'Gestión de la Innovación',
      'Negocios Internacionales',
      'Marketing Digital',
      'Consultoría Empresarial'
    ],
    color: '#EF4444',
    gradient: 'from-[#EF4444] to-[#DC2626]',
    icon: '🚀',
    referent: {
      name: 'Karina Gómez',
      profession: 'Emprendedora Peruana',
      achievement: 'Fundadora de múltiples startups exitosas, mentora de emprendedores y líder en el ecosistema de innovación del Perú.',
      quote: '"Emprender es transformar ideas en realidades que generen valor para la sociedad."',
      image: '👩‍💼'
    },
    universities: [
      'UNMSM (Administración, Negocios)',
      'UNSA (Gestión)',
      'UNALM (Gestión de la Innovación Agraria)',
      'ESAN (Administración ~ S/ 6,800)',
      'UPC (Negocios Internacionales ~ S/ 6,200)',
      'USIL (Emprendimiento ~ S/ 5,500)'
    ],
    skills: [
      'Liderazgo empresarial',
      'Visión estratégica',
      'Innovación',
      'Gestión de equipos',
      'Networking'
    ],
    scholarships: [
      'Beca 18',
      'Beca Perú',
      'Becas BID de innovación social',
      'Programas de incubación (Innóvate Perú)'
    ],
    badge: 'Emprendedora Innovadora'
  }
};

export default function VocationalResults({ results, onRestart }: VocationalResultsProps) {
  const router = useRouter();
  const [currentPlanet, setCurrentPlanet] = useState<Planet | null>(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Encontrar el planeta con más puntos
    const maxScore = Math.max(...Object.values(results));
    const winningPlanetKey = Object.keys(results).find(key => results[key] === maxScore);
    
    if (winningPlanetKey && PLANETS[winningPlanetKey]) {
      setCurrentPlanet(PLANETS[winningPlanetKey]);
      setTimeout(() => setShowAnimation(true), 500);
    }
  }, [results]);

  if (!currentPlanet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0B0F19] via-[#1a1f3a] to-[#2d1b69]">
        <div className="text-white text-xl">Calculando resultados...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a0033 25%, #000066 50%, #330066 75%, #000000 100%)'
    }}>
      {/* Estrellas de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(100)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-white/30 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.05}s`,
              fontSize: `${0.3 + Math.random() * 0.4}rem`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header de celebración */}
        <div className={`text-center mb-12 transition-all duration-1000 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-6xl mb-4 animate-bounce">{currentPlanet.icon}</div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¡Felicidades! 🎉
          </h1>
          <h2 className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${currentPlanet.gradient} bg-clip-text text-transparent mb-2`}>
            Tu planeta es {currentPlanet.name}
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {currentPlanet.title}
          </p>
        </div>

        {/* Descripción principal */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-300 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20" style={{
            boxShadow: `0 0 30px ${currentPlanet.color}40`
          }}>
            <p className="text-lg text-white/90 leading-relaxed text-center">
              {currentPlanet.description}
            </p>
          </div>
        </div>

        {/* Referente femenino */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-500 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20" style={{
            boxShadow: `0 0 30px ${currentPlanet.color}40`
          }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">{currentPlanet.referent.image}</div>
              <div>
                <h3 className="text-2xl font-bold text-white">
                  Inspiración: {currentPlanet.referent.name}
                </h3>
                <p className={`text-lg bg-gradient-to-r ${currentPlanet.gradient} bg-clip-text text-transparent font-semibold`}>
                  {currentPlanet.referent.profession}
                </p>
              </div>
            </div>
            <p className="text-white/90 mb-4 leading-relaxed">
              {currentPlanet.referent.achievement}
            </p>
            <blockquote className={`text-lg italic bg-gradient-to-r ${currentPlanet.gradient} bg-clip-text text-transparent border-l-4 pl-4`} style={{
              borderColor: currentPlanet.color
            }}>
              {currentPlanet.referent.quote}
            </blockquote>
          </div>
        </div>

        {/* Carreras recomendadas */}
        <div className={`max-w-6xl mx-auto mb-12 transition-all duration-1000 delay-700 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <BookOpen className="inline-block w-6 h-6 mr-2" />
            Carreras Recomendadas
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentPlanet.careers.map((career, index) => (
              <div
                key={career}
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: `0 0 20px ${currentPlanet.color}30`,
                  animationDelay: `${index * 0.1}s`
                }}
              >
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${currentPlanet.gradient} mb-3`} />
                <h4 className="text-white font-semibold text-lg">{career}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Badge único */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-800 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-black font-bold text-xl shadow-lg hover:scale-105 transition-all duration-300">
              🏆 {currentPlanet.badge}
            </div>
          </div>
        </div>

        {/* Habilidades clave */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-900 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <Star className="inline-block w-6 h-6 mr-2" />
            Tus Habilidades Clave
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {currentPlanet.skills.map((skill, index) => (
              <div
                key={skill}
                className={`px-4 py-2 rounded-full bg-gradient-to-r ${currentPlanet.gradient} text-white font-medium hover:scale-105 transition-all duration-300`}
                style={{
                  animationDelay: `${index * 0.1}s`
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Universidades recomendadas */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-1100 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            <Award className="inline-block w-6 h-6 mr-2" />
            Universidades Recomendadas en Perú
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlanet.universities.map((university, index) => (
              <div
                key={university}
                className="bg-black/40 backdrop-blur-sm rounded-2xl p-4 border border-white/20 hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: `0 0 15px ${currentPlanet.color}20`
                }}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentPlanet.gradient}`} />
                  <span className="text-white font-medium">{university}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Becas disponibles */}
        <div className={`max-w-4xl mx-auto mb-12 transition-all duration-1000 delay-1200 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h3 className="text-2xl font-bold text-white mb-6 text-center">
            💰 Becas Disponibles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentPlanet.scholarships.map((scholarship, index) => (
              <div
                key={scholarship}
                className="bg-green-500/20 backdrop-blur-sm rounded-2xl p-4 border border-green-400/30 hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: '0 0 15px rgba(34, 197, 94, 0.2)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-white font-medium">{scholarship}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de acción */}
        <div className={`text-center space-y-4 transition-all duration-1000 delay-1300 ${showAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => router.push('/quiz/vocacional/universidades')}
              className={`bg-gradient-to-r ${currentPlanet.gradient} hover:from-[#EC4899] hover:to-[#7C3AED] text-white font-bold px-8 py-3 text-lg`}
              style={{
                boxShadow: `0 0 25px ${currentPlanet.color}40`
              }}
            >
              <Users className="w-5 h-5 mr-2" />
              Explorar Universidades
            </Button>
            
            <Button
              onClick={() => router.push('/quiz/vocacional/becas')}
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 font-bold px-8 py-3 text-lg"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Ver Becas Disponibles
            </Button>
          </div>
          
          <Button
            onClick={onRestart}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <Rocket className="w-4 h-4 mr-2" />
            Realizar Test Nuevamente
          </Button>
        </div>
      </div>

      {/* Partículas de celebración */}
      <div className="absolute inset-0 pointer-events-none">
        {showAnimation && [...Array(30)].map((_, i) => (
          <div
            key={`celebration-${i}`}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
              fontSize: '1.2rem',
              color: currentPlanet.color
            }}
          >
            {['🎉', '✨', '🌟', '💫', '⭐'][Math.floor(Math.random() * 5)]}
          </div>
        ))}
      </div>
    </div>
  );
}