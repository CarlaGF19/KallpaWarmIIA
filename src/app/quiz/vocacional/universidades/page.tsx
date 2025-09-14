'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, DollarSign, Star, ExternalLink, Filter, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface University {
  id: string;
  name: string;
  type: 'publica' | 'privada';
  location: string;
  rating: number;
  monthlyFee: number;
  admissionFee: number;
  programs: string[];
  strengths: string[];
  website: string;
  description: string;
  scholarships: boolean;
  planetFocus: string[];
}

const UNIVERSITIES: University[] = [
  // Universidades Públicas
  {
    id: 'uni',
    name: 'Universidad Nacional de Ingeniería (UNI)',
    type: 'publica',
    location: 'Lima',
    rating: 4.8,
    monthlyFee: 0,
    admissionFee: 150,
    programs: [
      'Ingeniería de Sistemas',
      'Ingeniería Industrial',
      'Ingeniería Civil',
      'Ingeniería Mecánica',
      'Ingeniería Electrónica',
      'Arquitectura'
    ],
    strengths: ['Excelencia técnica', 'Investigación aplicada', 'Prestigio nacional'],
    website: 'https://www.uni.edu.pe',
    description: 'La universidad técnica más prestigiosa del Perú, líder en formación de ingenieros.',
    scholarships: true,
    planetFocus: ['mars', 'jupiter', 'venus']
  },
  {
    id: 'unmsm',
    name: 'Universidad Nacional Mayor de San Marcos (UNMSM)',
    type: 'publica',
    location: 'Lima',
    rating: 4.6,
    monthlyFee: 0,
    admissionFee: 120,
    programs: [
      'Matemática',
      'Física',
      'Química',
      'Biología',
      'Medicina',
      'Psicología'
    ],
    strengths: ['Tradición académica', 'Investigación científica', 'Diversidad de carreras'],
    website: 'https://www.unmsm.edu.pe',
    description: 'La universidad más antigua de América, con excelencia en ciencias y humanidades.',
    scholarships: true,
    planetFocus: ['earth', 'venus', 'jupiter']
  },
  {
    id: 'unalm',
    name: 'Universidad Nacional Agraria La Molina (UNALM)',
    type: 'publica',
    location: 'Lima',
    rating: 4.5,
    monthlyFee: 0,
    admissionFee: 100,
    programs: [
      'Ingeniería Ambiental',
      'Biología',
      'Ingeniería Agrícola',
      'Ciencias Forestales',
      'Meteorología'
    ],
    strengths: ['Sostenibilidad', 'Investigación ambiental', 'Innovación agrícola'],
    website: 'https://www.lamolina.edu.pe',
    description: 'Líder en ciencias ambientales y sostenibilidad en el Perú.',
    scholarships: true,
    planetFocus: ['earth']
  },
  {
    id: 'upch',
    name: 'Universidad Peruana Cayetano Heredia (UPCH)',
    type: 'privada',
    location: 'Lima',
    rating: 4.7,
    monthlyFee: 2800,
    admissionFee: 500,
    programs: [
      'Medicina',
      'Ingeniería Biomédica',
      'Biotecnología',
      'Psicología',
      'Enfermería'
    ],
    strengths: ['Excelencia médica', 'Investigación biomédica', 'Tecnología de salud'],
    website: 'https://www.upch.edu.pe',
    description: 'Universidad líder en ciencias de la salud y biomedicina.',
    scholarships: true,
    planetFocus: ['venus']
  },
  
  // Universidades Privadas
  {
    id: 'pucp',
    name: 'Pontificia Universidad Católica del Perú (PUCP)',
    type: 'privada',
    location: 'Lima',
    rating: 4.8,
    monthlyFee: 3200,
    admissionFee: 600,
    programs: [
      'Ingeniería Informática',
      'Ciencias de la Computación',
      'Matemáticas',
      'Física',
      'Arte y Diseño',
      'Arquitectura'
    ],
    strengths: ['Investigación de calidad', 'Innovación tecnológica', 'Formación integral'],
    website: 'https://www.pucp.edu.pe',
    description: 'Universidad de excelencia académica con fuerte enfoque en investigación.',
    scholarships: true,
    planetFocus: ['jupiter', 'mercury', 'mars']
  },
  {
    id: 'upc',
    name: 'Universidad Peruana de Ciencias Aplicadas (UPC)',
    type: 'privada',
    location: 'Lima',
    rating: 4.4,
    monthlyFee: 2500,
    admissionFee: 400,
    programs: [
      'Ingeniería de Software',
      'Diseño Gráfico',
      'Ingeniería Industrial',
      'Arquitectura',
      'Comunicación Digital'
    ],
    strengths: ['Enfoque práctico', 'Tecnología moderna', 'Conexión empresarial'],
    website: 'https://www.upc.edu.pe',
    description: 'Universidad moderna con enfoque en la aplicación práctica del conocimiento.',
    scholarships: true,
    planetFocus: ['mercury', 'mars']
  },
  {
    id: 'utec',
    name: 'Universidad de Ingeniería y Tecnología (UTEC)',
    type: 'privada',
    location: 'Lima',
    rating: 4.6,
    monthlyFee: 3000,
    admissionFee: 500,
    programs: [
      'Ingeniería de Sistemas',
      'Ingeniería Mecánica',
      'Ingeniería Civil',
      'Ingeniería Ambiental',
      'Ciencia de Datos'
    ],
    strengths: ['Innovación tecnológica', 'Laboratorios modernos', 'Investigación aplicada'],
    website: 'https://www.utec.edu.pe',
    description: 'Universidad especializada en ingeniería y tecnología de vanguardia.',
    scholarships: true,
    planetFocus: ['mars', 'jupiter', 'earth']
  },
  {
    id: 'ulima',
    name: 'Universidad de Lima',
    type: 'privada',
    location: 'Lima',
    rating: 4.3,
    monthlyFee: 2200,
    admissionFee: 350,
    programs: [
      'Ingeniería de Sistemas',
      'Ingeniería Industrial',
      'Comunicación',
      'Arquitectura',
      'Matemática'
    ],
    strengths: ['Tradición académica', 'Formación integral', 'Red de egresados'],
    website: 'https://www.ulima.edu.pe',
    description: 'Universidad con sólida formación académica y amplia red profesional.',
    scholarships: true,
    planetFocus: ['mercury', 'jupiter']
  },
  {
    id: 'ucsur',
    name: 'Universidad Científica del Sur (UCSUR)',
    type: 'privada',
    location: 'Lima',
    rating: 4.2,
    monthlyFee: 1800,
    admissionFee: 300,
    programs: [
      'Medicina Veterinaria',
      'Biología Marina',
      'Ingeniería Ambiental',
      'Biotecnología',
      'Nutrición'
    ],
    strengths: ['Ciencias de la vida', 'Sostenibilidad', 'Investigación aplicada'],
    website: 'https://www.cientifica.edu.pe',
    description: 'Universidad enfocada en ciencias de la vida y sostenibilidad.',
    scholarships: true,
    planetFocus: ['earth', 'venus']
  }
];

const PLANET_COLORS = {
  mercury: '#F59E0B',
  venus: '#EC4899',
  earth: '#22C55E',
  mars: '#EF4444',
  jupiter: '#7C3AED'
};

const PLANET_NAMES = {
  mercury: 'Mercurio',
  venus: 'Venus',
  earth: 'Tierra',
  mars: 'Marte',
  jupiter: 'Júpiter'
};

export default function UniversitiesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'publica' | 'privada'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('all');

  const filteredUniversities = UNIVERSITIES.filter(uni => {
    const matchesType = filter === 'all' || uni.type === filter;
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.programs.some(program => program.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPlanet = selectedPlanet === 'all' || uni.planetFocus.includes(selectedPlanet);
    
    return matchesType && matchesSearch && matchesPlanet;
  });

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a0033 25%, #000066 50%, #330066 75%, #000000 100%)'
    }}>
      {/* Estrellas de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(80)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-white/20 animate-twinkle"
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
        {/* Header */}
        <div className="mb-8">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="text-white/70 hover:text-white hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Resultados
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🏛️ Universidades Recomendadas
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Descubre las mejores instituciones educativas del Perú para desarrollar tu carrera STEAM
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtro por tipo */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Filter className="inline-block w-4 h-4 mr-1" />
                  Tipo de Universidad
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'publica' | 'privada')}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/50"
                >
                  <option value="all">Todas</option>
                  <option value="publica">Públicas</option>
                  <option value="privada">Privadas</option>
                </select>
              </div>

              {/* Búsqueda */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Search className="inline-block w-4 h-4 mr-1" />
                  Buscar Universidad o Carrera
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ej: Ingeniería, UNI, Medicina..."
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-white/50"
                />
              </div>

              {/* Filtro por planeta */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  🪐 Filtrar por Planeta
                </label>
                <select
                  value={selectedPlanet}
                  onChange={(e) => setSelectedPlanet(e.target.value)}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/50"
                >
                  <option value="all">Todos los Planetas</option>
                  {Object.entries(PLANET_NAMES).map(([key, name]) => (
                    <option key={key} value={key}>{name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Lista de universidades */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredUniversities.map((university) => (
              <div
                key={university.id}
                className="bg-black/40 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: '0 0 25px rgba(124, 58, 237, 0.3)'
                }}
              >
                {/* Header de la universidad */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{university.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        university.type === 'publica' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {university.type === 'publica' ? 'Pública' : 'Privada'}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-white/70 text-sm mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {university.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {university.rating}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-white/80 mb-4 leading-relaxed">
                  {university.description}
                </p>

                {/* Planetas relacionados */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/70 text-sm">Planetas:</span>
                  {university.planetFocus.map(planet => (
                    <div
                      key={planet}
                      className="px-2 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: `${PLANET_COLORS[planet as keyof typeof PLANET_COLORS]}20`,
                        color: PLANET_COLORS[planet as keyof typeof PLANET_COLORS],
                        border: `1px solid ${PLANET_COLORS[planet as keyof typeof PLANET_COLORS]}30`
                      }}
                    >
                      {PLANET_NAMES[planet as keyof typeof PLANET_NAMES]}
                    </div>
                  ))}
                </div>

                {/* Costos */}
                <div className="bg-white/5 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <div>
                        <div className="text-white font-medium">
                          {university.monthlyFee === 0 ? 'Gratuita' : `S/ ${university.monthlyFee.toLocaleString()}/mes`}
                        </div>
                        <div className="text-white/60 text-xs">
                          Mensualidad
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <div className="text-white font-medium">
                          S/ {university.admissionFee.toLocaleString()}
                        </div>
                        <div className="text-white/60 text-xs">
                          Admisión
                        </div>
                      </div>
                    </div>
                    {university.scholarships && (
                      <div className="ml-auto">
                        <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 rounded-full text-xs font-medium">
                          💰 Becas disponibles
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Programas */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Programas Destacados:</h4>
                  <div className="flex flex-wrap gap-2">
                    {university.programs.slice(0, 4).map((program) => (
                      <span
                        key={program}
                        className="px-3 py-1 bg-gradient-to-r from-[#EC4899] to-[#7C3AED] text-white text-xs rounded-full"
                      >
                        {program}
                      </span>
                    ))}
                    {university.programs.length > 4 && (
                      <span className="px-3 py-1 bg-white/10 text-white/70 text-xs rounded-full">
                        +{university.programs.length - 4} más
                      </span>
                    )}
                  </div>
                </div>

                {/* Fortalezas */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Fortalezas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {university.strengths.map((strength) => (
                      <span
                        key={strength}
                        className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-lg border border-white/20"
                      >
                        ✨ {strength}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Botón de acción */}
                <Button
                  onClick={() => window.open(university.website, '_blank')}
                  className="w-full bg-gradient-to-r from-[#EC4899] to-[#7C3AED] hover:from-[#BE185D] hover:to-[#5B21B6] text-white font-bold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Visitar Sitio Web
                </Button>
              </div>
            ))}
          </div>

          {filteredUniversities.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No se encontraron universidades
              </h3>
              <p className="text-white/70">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          )}
        </div>

        {/* Botón para ver becas */}
        <div className="text-center mt-12">
          <Button
            onClick={() => router.push('/quiz/vocacional/becas')}
            className="bg-gradient-to-r from-[#FACC15] to-[#EC4899] hover:from-[#EAB308] hover:to-[#BE185D] text-white font-bold px-8 py-3 text-lg"
            style={{
              boxShadow: '0 0 25px rgba(250, 204, 21, 0.4)'
            }}
          >
            💰 Explorar Becas Disponibles
          </Button>
        </div>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute text-white/10 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
              fontSize: '1rem'
            }}
          >
            {['🏛️', '📚', '🎓', '⭐'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
    </div>
  );
}