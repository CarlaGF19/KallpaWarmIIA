'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, MapPin, Calendar, DollarSign, ExternalLink, Filter, Search, Award } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Scholarship {
  id: string;
  name: string;
  organization: string;
  type: 'nacional' | 'internacional';
  level: 'pregrado' | 'posgrado' | 'ambos';
  amount: string;
  coverage: string[];
  requirements: string[];
  deadline: string;
  website: string;
  description: string;
  countries: string[];
  fields: string[];
  planetFocus: string[];
}

const SCHOLARSHIPS: Scholarship[] = [
  // Becas Nacionales
  {
    id: 'beca18',
    name: 'Beca 18',
    organization: 'PRONABEC - Ministerio de Educación',
    type: 'nacional',
    level: 'pregrado',
    amount: '100% de la carrera',
    coverage: ['Matrícula', 'Pensiones', 'Alimentación', 'Alojamiento', 'Útiles', 'Laptop'],
    requirements: [
      'Ser peruano/a',
      'Haber concluido educación secundaria',
      'Pertenecer al tercio superior',
      'Condición de pobreza o pobreza extrema',
      'No tener título profesional'
    ],
    deadline: 'Marzo - Abril (anual)',
    website: 'https://www.pronabec.gob.pe/beca18/',
    description: 'Beca integral para estudios de pregrado en universidades e institutos de excelencia académica.',
    countries: ['Perú'],
    fields: ['Todas las carreras STEAM'],
    planetFocus: ['mercury', 'venus', 'earth', 'mars', 'jupiter']
  },
  {
    id: 'beca-doble-oportunidad',
    name: 'Beca Doble Oportunidad',
    organization: 'PRONABEC',
    type: 'nacional',
    level: 'pregrado',
    amount: '100% de la carrera',
    coverage: ['Matrícula', 'Pensiones', 'Alimentación', 'Alojamiento', 'Útiles'],
    requirements: [
      'Ser peruano/a',
      'Tener entre 16 y 22 años',
      'No haber concluido educación secundaria',
      'Condición de pobreza o pobreza extrema'
    ],
    deadline: 'Febrero - Marzo (anual)',
    website: 'https://www.pronabec.gob.pe/beca-doble-oportunidad/',
    description: 'Para jóvenes que no terminaron secundaria y desean estudiar una carrera técnica o universitaria.',
    countries: ['Perú'],
    fields: ['Carreras técnicas y universitarias STEAM'],
    planetFocus: ['mercury', 'mars', 'jupiter']
  },
  {
    id: 'beca-excelencia-academica',
    name: 'Beca de Excelencia Académica',
    organization: 'PRONABEC',
    type: 'nacional',
    level: 'pregrado',
    amount: '100% de la carrera',
    coverage: ['Matrícula', 'Pensiones', 'Alimentación', 'Alojamiento'],
    requirements: [
      'Ser peruano/a',
      'Pertenecer al quinto superior',
      'Puntaje mínimo en examen de admisión',
      'Ingresar a universidad licenciada'
    ],
    deadline: 'Durante el año académico',
    website: 'https://www.pronabec.gob.pe/beca-excelencia-academica/',
    description: 'Para estudiantes con alto rendimiento académico en universidades de calidad.',
    countries: ['Perú'],
    fields: ['Todas las carreras STEAM'],
    planetFocus: ['mercury', 'venus', 'earth', 'mars', 'jupiter']
  },
  {
    id: 'beca-vocacion-maestro',
    name: 'Beca Vocación de Maestro',
    organization: 'PRONABEC',
    type: 'nacional',
    level: 'pregrado',
    amount: '100% de la carrera',
    coverage: ['Matrícula', 'Pensiones', 'Alimentación', 'Alojamiento', 'Útiles'],
    requirements: [
      'Ser peruano/a',
      'Vocación por la enseñanza',
      'Pertenecer al tercio superior',
      'Condición socioeconómica vulnerable'
    ],
    deadline: 'Enero - Febrero (anual)',
    website: 'https://www.pronabec.gob.pe/beca-vocacion-de-maestro/',
    description: 'Para formar docentes en educación inicial, primaria y secundaria, especialmente en STEAM.',
    countries: ['Perú'],
    fields: ['Educación en Matemáticas', 'Educación en Ciencias', 'Educación en Tecnología'],
    planetFocus: ['mercury', 'jupiter']
  },

  // Becas Internacionales
  {
    id: 'fulbright',
    name: 'Beca Fulbright',
    organization: 'Comisión Fulbright Perú - Estados Unidos',
    type: 'internacional',
    level: 'posgrado',
    amount: 'Hasta $50,000 USD',
    coverage: ['Matrícula', 'Manutención', 'Seguro médico', 'Pasajes', 'Libros'],
    requirements: [
      'Título universitario',
      'Experiencia profesional mínima 2 años',
      'Dominio del inglés (TOEFL/IELTS)',
      'Liderazgo y compromiso social'
    ],
    deadline: 'Marzo - Mayo (anual)',
    website: 'https://www.fulbright.pe/',
    description: 'Programa de intercambio educativo para estudios de maestría y doctorado en Estados Unidos.',
    countries: ['Estados Unidos'],
    fields: ['Todas las áreas STEAM', 'Investigación científica'],
    planetFocus: ['venus', 'mars', 'jupiter']
  },
  {
    id: 'chevening',
    name: 'Beca Chevening',
    organization: 'Gobierno del Reino Unido',
    type: 'internacional',
    level: 'posgrado',
    amount: '100% financiamiento',
    coverage: ['Matrícula', 'Manutención', 'Pasajes', 'Visa', 'Seguro'],
    requirements: [
      'Título universitario',
      'Experiencia laboral mínima 2 años',
      'Dominio del inglés',
      'Potencial de liderazgo'
    ],
    deadline: 'Noviembre (anual)',
    website: 'https://www.chevening.org/',
    description: 'Beca completa para estudios de maestría de un año en el Reino Unido.',
    countries: ['Reino Unido'],
    fields: ['Ingeniería', 'Ciencias', 'Tecnología', 'Matemáticas'],
    planetFocus: ['mars', 'jupiter', 'venus']
  },
  {
    id: 'daad',
    name: 'Becas DAAD',
    organization: 'Servicio Alemán de Intercambio Académico',
    type: 'internacional',
    level: 'ambos',
    amount: '€850 - €1,200 mensual',
    coverage: ['Manutención', 'Seguro médico', 'Apoyo para matrícula'],
    requirements: [
      'Excelencia académica',
      'Conocimiento de alemán o inglés',
      'Motivación clara para estudiar en Alemania',
      'Compromiso con el desarrollo del país'
    ],
    deadline: 'Varía según programa',
    website: 'https://www.daad.de/',
    description: 'Diversas becas para estudios de pregrado, posgrado e investigación en Alemania.',
    countries: ['Alemania'],
    fields: ['Ingeniería', 'Ciencias Naturales', 'Matemáticas', 'Informática'],
    planetFocus: ['mars', 'jupiter', 'venus']
  },
  {
    id: 'eiffel',
    name: 'Beca Eiffel',
    organization: 'Ministerio de Asuntos Exteriores de Francia',
    type: 'internacional',
    level: 'posgrado',
    amount: '€1,181 mensual (maestría)',
    coverage: ['Manutención', 'Pasajes', 'Seguro médico', 'Actividades culturales'],
    requirements: [
      'Ser nominado por institución francesa',
      'Excelencia académica',
      'Máximo 25 años (maestría) o 30 años (doctorado)',
      'No haber recibido beca francesa previamente'
    ],
    deadline: 'Enero (anual)',
    website: 'https://www.campusfrance.org/fr/eiffel',
    description: 'Beca de excelencia para estudios de maestría y doctorado en Francia.',
    countries: ['Francia'],
    fields: ['Ingeniería', 'Ciencias', 'Tecnología', 'Matemáticas'],
    planetFocus: ['venus', 'mars', 'jupiter']
  },
  {
    id: 'australia-awards',
    name: 'Australia Awards',
    organization: 'Gobierno de Australia',
    type: 'internacional',
    level: 'posgrado',
    amount: '100% financiamiento',
    coverage: ['Matrícula', 'Manutención', 'Seguro médico', 'Pasajes'],
    requirements: [
      'Título universitario',
      'Experiencia laboral relevante',
      'Dominio del inglés (IELTS)',
      'Compromiso de retornar al país'
    ],
    deadline: 'Abril - Mayo (anual)',
    website: 'https://www.australiaawards.gov.au/',
    description: 'Becas completas para estudios de posgrado en universidades australianas.',
    countries: ['Australia'],
    fields: ['Ingeniería', 'Ciencias Ambientales', 'Tecnología', 'Salud'],
    planetFocus: ['earth', 'venus', 'mars']
  },
  {
    id: 'mext',
    name: 'Beca MEXT (Monbukagakusho)',
    organization: 'Ministerio de Educación de Japón',
    type: 'internacional',
    level: 'ambos',
    amount: '¥117,000 - ¥143,000 mensual',
    coverage: ['Matrícula', 'Manutención', 'Pasajes'],
    requirements: [
      'Excelencia académica',
      'Buena salud física y mental',
      'Interés genuino en Japón',
      'Compromiso de estudiar japonés'
    ],
    deadline: 'Mayo - Junio (anual)',
    website: 'https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm',
    description: 'Beca del gobierno japonés para estudios universitarios y de posgrado.',
    countries: ['Japón'],
    fields: ['Ingeniería', 'Ciencias', 'Tecnología', 'Matemáticas'],
    planetFocus: ['mars', 'jupiter', 'venus']
  },
  {
    id: 'conacyt-mexico',
    name: 'Becas CONACYT México',
    organization: 'Consejo Nacional de Ciencia y Tecnología',
    type: 'internacional',
    level: 'posgrado',
    amount: '$12,000 - $15,000 MXN mensual',
    coverage: ['Manutención', 'Colegiatura', 'Seguro médico'],
    requirements: [
      'Título universitario',
      'Promedio mínimo 8.0',
      'Examen de admisión al posgrado',
      'Dedicación de tiempo completo'
    ],
    deadline: 'Varía según convocatoria',
    website: 'https://www.conacyt.gob.mx/',
    description: 'Becas para estudios de posgrado en ciencia y tecnología en México.',
    countries: ['México'],
    fields: ['Ciencias Exactas', 'Ingeniería', 'Tecnología', 'Ciencias Naturales'],
    planetFocus: ['venus', 'earth', 'jupiter']
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

export default function ScholarshipsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'nacional' | 'internacional'>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | 'pregrado' | 'posgrado' | 'ambos'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPlanet, setSelectedPlanet] = useState<string>('all');

  const filteredScholarships = SCHOLARSHIPS.filter(scholarship => {
    const matchesType = filter === 'all' || scholarship.type === filter;
    const matchesLevel = levelFilter === 'all' || scholarship.level === levelFilter || scholarship.level === 'ambos';
    const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scholarship.fields.some(field => field.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesPlanet = selectedPlanet === 'all' || scholarship.planetFocus.includes(selectedPlanet);
    
    return matchesType && matchesLevel && matchesSearch && matchesPlanet;
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
            Volver
          </Button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              💰 Becas y Financiamiento
            </h1>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Descubre oportunidades de financiamiento para tu educación STEAM en Perú y el mundo
            </p>
          </div>
        </div>

        {/* Filtros */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Filtro por tipo */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Globe className="inline-block w-4 h-4 mr-1" />
                  Tipo de Beca
                </label>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as 'all' | 'nacional' | 'internacional')}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/50"
                >
                  <option value="all">Todas</option>
                  <option value="nacional">Nacionales</option>
                  <option value="internacional">Internacionales</option>
                </select>
              </div>

              {/* Filtro por nivel */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Award className="inline-block w-4 h-4 mr-1" />
                  Nivel de Estudios
                </label>
                <select
                  value={levelFilter}
                  onChange={(e) => setLevelFilter(e.target.value as 'all' | 'pregrado' | 'posgrado' | 'ambos')}
                  className="w-full bg-white/10 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-white/50"
                >
                  <option value="all">Todos los niveles</option>
                  <option value="pregrado">Pregrado</option>
                  <option value="posgrado">Posgrado</option>
                  <option value="ambos">Ambos</option>
                </select>
              </div>

              {/* Búsqueda */}
              <div>
                <label className="block text-white/80 text-sm font-medium mb-2">
                  <Search className="inline-block w-4 h-4 mr-1" />
                  Buscar Beca
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Ej: Fulbright, PRONABEC..."
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

        {/* Lista de becas */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredScholarships.map((scholarship) => (
              <div
                key={scholarship.id}
                className="bg-black/40 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:scale-105 transition-all duration-300"
                style={{
                  boxShadow: '0 0 25px rgba(250, 204, 21, 0.3)'
                }}
              >
                {/* Header de la beca */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{scholarship.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        scholarship.type === 'nacional' 
                          ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {scholarship.type === 'nacional' ? 'Nacional' : 'Internacional'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        scholarship.level === 'pregrado' 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : scholarship.level === 'posgrado'
                          ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                          : 'bg-pink-500/20 text-pink-300 border border-pink-500/30'
                      }`}>
                        {scholarship.level === 'pregrado' ? 'Pregrado' : 
                         scholarship.level === 'posgrado' ? 'Posgrado' : 'Ambos'}
                      </span>
                    </div>
                    
                    <p className="text-white/70 text-sm mb-2">
                      {scholarship.organization}
                    </p>
                    
                    <div className="flex items-center gap-4 text-white/70 text-sm mb-2">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {scholarship.countries.join(', ')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {scholarship.deadline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-white/80 mb-4 leading-relaxed">
                  {scholarship.description}
                </p>

                {/* Monto y cobertura */}
                <div className="bg-white/5 rounded-2xl p-4 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-green-400" />
                    <span className="text-white font-bold text-lg">{scholarship.amount}</span>
                  </div>
                  <div className="text-white/80 text-sm">
                    <strong>Cobertura:</strong> {scholarship.coverage.join(', ')}
                  </div>
                </div>

                {/* Planetas relacionados */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-white/70 text-sm">Planetas:</span>
                  {scholarship.planetFocus.map(planet => (
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

                {/* Campos de estudio */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Campos de Estudio:</h4>
                  <div className="flex flex-wrap gap-2">
                    {scholarship.fields.map((field) => (
                      <span
                        key={field}
                        className="px-3 py-1 bg-gradient-to-r from-[#FACC15] to-[#EC4899] text-white text-xs rounded-full"
                      >
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Requisitos principales */}
                <div className="mb-4">
                  <h4 className="text-white font-semibold mb-2">Requisitos Principales:</h4>
                  <ul className="text-white/80 text-sm space-y-1">
                    {scholarship.requirements.slice(0, 3).map((req, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">•</span>
                        {req}
                      </li>
                    ))}
                    {scholarship.requirements.length > 3 && (
                      <li className="text-white/60 text-xs">
                        +{scholarship.requirements.length - 3} requisitos más
                      </li>
                    )}
                  </ul>
                </div>

                {/* Botón de acción */}
                <Button
                  onClick={() => window.open(scholarship.website, '_blank')}
                  className="w-full bg-gradient-to-r from-[#FACC15] to-[#EC4899] hover:from-[#EAB308] hover:to-[#BE185D] text-white font-bold"
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver Más Información
                </Button>
              </div>
            ))}
          </div>

          {filteredScholarships.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                No se encontraron becas
              </h3>
              <p className="text-white/70">
                Intenta ajustar los filtros de búsqueda
              </p>
            </div>
          )}
        </div>

        {/* Consejos para aplicar */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 border border-white/20" style={{
            boxShadow: '0 0 30px rgba(250, 204, 21, 0.3)'
          }}>
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              💡 Consejos para Aplicar a Becas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📝</span>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Prepara tu documentación</h4>
                    <p className="text-white/80 text-sm">Ten listos certificados, cartas de recomendación y ensayos personales.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Define tus objetivos</h4>
                    <p className="text-white/80 text-sm">Articula claramente por qué quieres estudiar y cómo contribuirás.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">⏰</span>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Aplica con tiempo</h4>
                    <p className="text-white/80 text-sm">Comienza el proceso con meses de anticipación a la fecha límite.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🌟</span>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Destaca tu potencial</h4>
                    <p className="text-white/80 text-sm">Muestra tu liderazgo, proyectos y compromiso con tu comunidad.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🔍</span>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Investiga a fondo</h4>
                    <p className="text-white/80 text-sm">Conoce bien la institución y el programa al que aplicas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💪</span>
                  <div>
                    <h4 className="text-white font-semibold mb-1">No te rindas</h4>
                    <p className="text-white/80 text-sm">Aplica a múltiples becas y aprende de cada experiencia.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botón para volver al test */}
        <div className="text-center mt-12">
          <Button
            onClick={() => router.push('/quiz/vocacional')}
            className="bg-gradient-to-r from-[#EC4899] to-[#7C3AED] hover:from-[#BE185D] hover:to-[#5B21B6] text-white font-bold px-8 py-3 text-lg"
          >
            🚀 Realizar Test Nuevamente
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
            {['💰', '🎓', '⭐', '🌟'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
    </div>
  );
}