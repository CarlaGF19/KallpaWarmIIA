"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search, Filter, ExternalLink, GraduationCap, Trophy, MapPin, Star, Rocket, Users, Zap, Globe, Award, BookOpen, Lightbulb } from "lucide-react";

/** ---------- DATOS AMPLIADOS - MISIONES CÓSMICAS ---------- */
type Oportunidad = {
  id: string;
  categoria: "Beca" | "Concurso" | "Reto";
  titulo: string;
  entidad: string;
  ubicacion: "Nacional" | "Lima" | "Arequipa" | "Virtual" | "Internacional";
  estado: "Abierta" | "Próximamente" | "Cerrada";
  desc: string;
  url: string;
  xp: number;
  badge?: string;
};

const OPORTUNIDADES: Oportunidad[] = [
  // 🎓 BECAS
  {
    id: "b1",
    categoria: "Beca",
    titulo: "🚀 Beca 18",
    entidad: "PRONABEC",
    ubicacion: "Nacional",
    estado: "Abierta",
    desc: "Cobertura integral para estudios superiores (modalidades: ordinaria, FF.AA., albergue).",
    url: "https://www.pronabec.gob.pe/beca-18/",
    xp: 500,
    badge: "Exploradora Becaria"
  },
  {
    id: "b2",
    categoria: "Beca",
    titulo: "⭐ Beca Perú",
    entidad: "PRONABEC",
    ubicacion: "Nacional",
    estado: "Abierta",
    desc: "Capacitación y especialización con instituciones aliadas.",
    url: "https://www.pronabec.gob.pe/beca-peru/",
    xp: 300,
  },
  {
    id: "b3",
    categoria: "Beca",
    titulo: "🇨🇳 Beca del Gobierno Chino",
    entidad: "PRONABEC - Gobierno de China",
    ubicacion: "Internacional",
    estado: "Próximamente",
    desc: "Becas para estudiar cursos, carreras de pregrado o posgrado en China. Incluye costos de estudio, hospedaje, seguro médico y estipendio para alimentación. 16 becas disponibles para el programa 2024/2025.",
    url: "https://www.pronabec.gob.pe/beca-del-gobierno-chino/",
    xp: 200,
    badge: "🇨🇳 Internacional"
  },
  {
    id: "b4",
    categoria: "Beca",
    titulo: "🇭🇺 Beca Hungría - Stipendium Hungaricum",
    entidad: "PRONABEC - Gobierno de Hungría",
    ubicacion: "Internacional",
    estado: "Abierta",
    desc: "Becas para estudiar cursos de especialización, pregrado y posgrado en Hungría. 20 becas completas disponibles para el año académico 2025-2026. Incluye matrícula gratuita, subsidio mensual, alojamiento y servicios de salud.",
    url: "https://www.pronabec.gob.pe/beca-hungria/",
    xp: 750,
    badge: "Exploradora Europea"
  },
  {
    id: "b5",
    categoria: "Beca",
    titulo: "🇰🇷 Beca Corea GKS 2025",
    entidad: "PRONABEC - Gobierno de Corea del Sur",
    ubicacion: "Internacional",
    estado: "Próximamente",
    desc: "Beca GKS 2025 para estudiar un pregrado en Corea. Incluye pasajes aéreos, matrícula, seguro médico, curso de idioma coreano por un año e incentivo monetario mensual. Para egresados de colegio con alto rendimiento académico.",
    url: "https://www.pronabec.gob.pe/beca-corea-gks-2025/",
    xp: 200,
    badge: "🇰🇷 Internacional"
  },
  // 🏆 CONCURSOS
  {
    id: "c1",
    categoria: "Concurso",
    titulo: "🔬 Concurso Escolar de Ciencia y Tecnología",
    entidad: "CONCYTEC",
    ubicacion: "Nacional",
    estado: "Abierta",
    desc: "Convocatorias de innovación y ciencia para escolares de distintos niveles educativos.",
    url: "https://www.concytec.gob.pe/",
    xp: 400,
    badge: "Científica Escolar"
  },
  {
    id: "c2",
    categoria: "Concurso",
    titulo: "🔬 Feria Escolar Nacional de Ciencia y Tecnología Eureka 2025",
    entidad: "MINEDU",
    ubicacion: "Nacional",
    estado: "En curso",
    desc: "Concurso que fomenta la investigación científica y tecnológica, incentivando la indagación y el desarrollo de proyectos que respondan a problemáticas reales. Etapa nacional: 6 al 8 de noviembre.",
    url: "https://www.gob.pe/institucion/minedu/campanas/64666-feria-escolar-nacional-de-ciencia-y-tecnologia-eureka",
    xp: 600,
    badge: "Investigadora Científica"
  },
  {
    id: "c3",
    categoria: "Concurso",
    titulo: "🤖 Programa Nacional Escuela Innovadora 2025 - Exploradores Espaciales",
    entidad: "Municipalidad de San Miguel",
    ubicacion: "Nacional",
    estado: "Abierta",
    desc: "Tercera edición del programa que democratiza el acceso a la educación STEAM. Incluye capacitaciones gratuitas en robótica y programación, culminando con competencia de robótica y exposición para estudiantes de colegios públicos.",
    url: "https://www.gob.pe/institucion/munisanmiguel/informes-publicaciones/7094831-bases-programa-nacional-escuela-innovadora-2025",
    xp: 700,
    badge: "🚀 Exploradora Espacial"
  },
  {
    id: "c4",
    categoria: "Concurso",
    titulo: "💡 Simposio TECH & BUSINESS TEMS USIL",
    entidad: "IEEE TEMS USIL",
    ubicacion: "Nacional",
    estado: "Próximamente",
    desc: "Simposio de tecnología y negocios que incluye el Desafío INNOTEMS. Evento académico que combina conferencias magistrales con competencia de innovación tecnológica para estudiantes universitarios.",
    url: "https://docs.google.com/document/d/1lBxD5KkJD4aj7_NhP85dp_oGwPoEZpfM9oOBv4I7p3E/edit?usp=sharing",
    xp: 800,
    badge: "🚀 Innovadora Tech"
  },
  // 🚀 RETOS / PROGRAMAS ESPECIALES
  {
    id: "r1",
    categoria: "Reto",
    titulo: "👩‍🔬 Mentorías STEM",
    entidad: "Red de Científicas Peruanas",
    ubicacion: "Virtual",
    estado: "Abierta",
    desc: "Conecta con científicas y tecnólogas peruanas. Mentoría personalizada en tu área de interés.",
    url: "https://cientificas.pe/",
    xp: 200,
  },
  {
    id: "r2",
    categoria: "Reto",
    titulo: "🔥 Bootcamp Girls in AI",
    entidad: "AI Community",
    ubicacion: "Virtual",
    estado: "Próximamente",
    desc: "Capacitación intensiva en IA y ciberseguridad. 12 semanas de entrenamiento cósmico.",
    url: "https://girlsinai.co/",
    xp: 500,
    badge: "IA Exploradora"
  },
  {
    id: "r3",
    categoria: "Reto",
    titulo: "🌟 Voluntariado Cósmico",
    entidad: "Ciencia para Todos",
    ubicacion: "Nacional",
    estado: "Próximamente",
    desc: "Enseña ciencia en colegios rurales. Comparte tu conocimiento y transforma comunidades.",
    url: "https://cienciaparatodos.pe/",
    xp: 300,
    badge: "Maestra Cósmica"
  },
];

/** ---------- FUNCIONES AUXILIARES ---------- */
function getIconoCategoria(categoria: Oportunidad["categoria"]) {
  const cls = "h-5 w-5";
  switch (categoria) {
    case "Beca": return <GraduationCap className={cls} />;
    case "Concurso": return <Trophy className={cls} />;
    case "Reto": return <Rocket className={cls} />;
    default: return <Star className={cls} />;
  }
}

function getColorCategoria(categoria: Oportunidad["categoria"]) {
  switch (categoria) {
    case "Beca": return "#3B82F6"; // Azul eléctrico
    case "Concurso": return "#7C3AED"; // Morado brillante
    case "Reto": return "#22C55E"; // Verde neón
    default: return "#6B7280";
  }
}

function getEstadoStyles(estado: Oportunidad["estado"]) {
  switch (estado) {
    case "Abierta":
      return {
        bg: "bg-green-500/20",
        border: "border-green-400",
        text: "text-green-400",
        glow: "shadow-green-400/50"
      };
    case "Próximamente":
      return {
        bg: "bg-pink-500/20",
        border: "border-pink-400",
        text: "text-pink-400",
        glow: "shadow-pink-400/50"
      };
    case "Cerrada":
      return {
        bg: "bg-gray-500/20",
        border: "border-gray-500",
        text: "text-gray-500",
        glow: "shadow-gray-500/30"
      };
    default:
      return {
        bg: "bg-gray-500/20",
        border: "border-gray-500",
        text: "text-gray-500",
        glow: "shadow-gray-500/30"
      };
  }
}

export default function OportunidadesPage() {
  // Estados y filtros
  const [q, setQ] = useState("");
  const [categoria, setCategoria] = useState<"Todas" | Oportunidad["categoria"]>("Todas");
  const [ubic, setUbic] = useState<"Todas" | Oportunidad["ubicacion"]>("Todas");
  const [guardadas, setGuardadas] = useState<Set<string>>(new Set());

  // Filtrado de oportunidades
  const oportunidadesFiltradas = useMemo(() => {
    const term = q.toLowerCase();
    return OPORTUNIDADES.filter(op => {
      const passQ = !term || [op.titulo, op.desc, op.entidad].join(" ").toLowerCase().includes(term);
      const passCat = categoria === "Todas" || op.categoria === categoria;
      const passUb = ubic === "Todas" || op.ubicacion === ubic;
      return passQ && passCat && passUb;
    });
  }, [q, categoria, ubic]);

  // Función para guardar oportunidad
  const toggleGuardar = (id: string) => {
    const nuevasGuardadas = new Set(guardadas);
    if (nuevasGuardadas.has(id)) {
      nuevasGuardadas.delete(id);
    } else {
      nuevasGuardadas.add(id);
    }
    setGuardadas(nuevasGuardadas);
  };

  // Estadísticas para gamificación
  const totalOportunidades = OPORTUNIDADES.length;
  const oportunidadesGuardadas = guardadas.size;
  const progreso = Math.round((oportunidadesGuardadas / totalOportunidades) * 100);

  return (
    <section className="kallpa-opps min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#1a1b3a] to-[#0B0F19] text-[#F9FAFB] relative overflow-hidden">
      {/* Partículas cósmicas de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-32 left-1/4 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse opacity-50"></div>
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-ping opacity-30"></div>
      </div>

      {/* ---------- WRAPPER ---------- */}
      <div className="mx-auto max-w-[1980px] min-h-[1200px] px-6 py-6 relative z-10">
        {/* ---------- CABECERA CÓSMICA ---------- */}
        <header className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Link
              href="/dashboard"
              className="rounded-lg px-3 py-2 border border-white/10 bg-white/5 hover:bg-white/10 transition backdrop-blur-sm"
              aria-label="Volver al dashboard"
            >
              ← Inicio
            </Link>
          </div>
          
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">
            Misiones Cósmicas de Oportunidades ✨
          </h1>
          <p className="text-lg text-white/70 mb-6">
            Exploradora, encuentra becas, concursos y retos para alcanzar las estrellas
          </p>
          
          {/* Barra de progreso gamificada */}
          <div className="max-w-md mx-auto mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/60">Progreso de Misiones</span>
              <span className="text-sm font-semibold text-purple-400">{oportunidadesGuardadas} de {totalOportunidades}</span>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progreso}%` }}
              ></div>
            </div>
            <p className="text-xs text-white/50 mt-1">
              Has desbloqueado {oportunidadesGuardadas} de {totalOportunidades} oportunidades
            </p>
          </div>
        </header>

        {/* ---------- FILTROS GAMIFICADOS ---------- */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 mb-8">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar misiones cósmicas…"
              className="h-12 w-[20rem] rounded-xl pl-10 pr-4 bg-white/5 border border-white/20 backdrop-blur-sm
                         placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent
                         transition-all duration-300"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <Filter className="h-4 w-4 text-purple-400" />
              <select 
                value={categoria} 
                onChange={e => setCategoria(e.target.value as any)}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer"
              >
                <option value="Todas" className="bg-gray-800">🌟 Todas</option>
                <option value="Beca" className="bg-gray-800">🎓 Becas</option>
                <option value="Concurso" className="bg-gray-800">🏆 Concursos</option>
                <option value="Reto" className="bg-gray-800">🚀 Retos</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 backdrop-blur-sm">
              <Globe className="h-4 w-4 text-blue-400" />
              <select 
                value={ubic} 
                onChange={e => setUbic(e.target.value as any)}
                className="bg-transparent border-none text-white focus:outline-none cursor-pointer"
              >
                <option value="Todas" className="bg-gray-800">🌍 Todas</option>
                <option value="Nacional" className="bg-gray-800">🇵🇪 Nacional</option>
                <option value="Internacional" className="bg-gray-800">🌎 Internacional</option>
                <option value="Virtual" className="bg-gray-800">💻 Virtual</option>
                <option value="Lima" className="bg-gray-800">🏙️ Lima</option>
                <option value="Arequipa" className="bg-gray-800">🏔️ Arequipa</option>
              </select>
            </div>
          </div>
        </div>

        {/* ---------- GRID DE MISIONES CÓSMICAS ---------- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {oportunidadesFiltradas.map((oportunidad) => {
            const colorCategoria = getColorCategoria(oportunidad.categoria);
            const estadoStyles = getEstadoStyles(oportunidad.estado);
            const isGuardada = guardadas.has(oportunidad.id);
            const isCerrada = oportunidad.estado === "Cerrada";
            
            return (
              <article
                key={oportunidad.id}
                className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 hover:scale-105
                           ${isCerrada ? 'opacity-60 grayscale' : ''}
                           ${oportunidad.estado === 'Abierta' ? 'hover:shadow-2xl hover:shadow-green-400/20' : ''}
                           ${oportunidad.estado === 'Próximamente' ? 'hover:shadow-2xl hover:shadow-pink-400/20' : ''}`}
                style={{
                  borderColor: colorCategoria,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02)), 
                              linear-gradient(135deg, ${colorCategoria}15, ${colorCategoria}08)`
                }}
              >
                {/* Efecto glassmorphism */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none"></div>
                
                {/* Glow border animado */}
                <div 
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
                             ${oportunidad.estado === 'Abierta' ? 'shadow-lg shadow-green-400/30' : ''}
                             ${oportunidad.estado === 'Próximamente' ? 'shadow-lg shadow-pink-400/30' : ''}`}
                ></div>

                {/* Badge especial solo para estados únicos */}
                {oportunidad.estado === 'Cerrada' && (
                  <div className="absolute top-3 right-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-gray-500/20 text-gray-400 border border-gray-400/30">
                      🔒 Cerrada
                    </span>
                  </div>
                )}

                {/* Contenido de la tarjeta */}
                <div className="relative z-10 p-6">
                  {/* Header con categoría e ícono */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border backdrop-blur-sm"
                         style={{ 
                           borderColor: `${colorCategoria}40`,
                           background: `${colorCategoria}20`
                         }}>
                      {getIconoCategoria(oportunidad.categoria)}
                      <span className="text-sm font-medium" style={{ color: colorCategoria }}>
                        {oportunidad.categoria}
                      </span>
                    </div>
                    
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${estadoStyles.bg} ${estadoStyles.border} ${estadoStyles.text} border`}>
                      <div className={`w-2 h-2 rounded-full ${oportunidad.estado === 'Abierta' ? 'bg-green-400 animate-pulse' : oportunidad.estado === 'Próximamente' ? 'bg-pink-400 animate-pulse' : 'bg-gray-500'}`}></div>
                      {oportunidad.estado}
                    </div>
                  </div>

                  {/* Título de la misión */}
                  <h3 className="text-xl font-bold mb-2 leading-tight group-hover:text-white transition-colors">
                    {oportunidad.titulo}
                  </h3>
                  
                  {/* Entidad organizadora */}
                  <p className="text-sm text-white/60 mb-2 font-medium">{oportunidad.entidad}</p>
                  
                  {/* Ubicación */}
                  <div className="flex items-center gap-2 text-xs text-white/50 mb-3">
                    <MapPin className="h-3 w-3" />
                    {oportunidad.ubicacion}
                  </div>
                  
                  {/* Descripción */}
                  <p className="text-sm text-white/70 line-clamp-3 mb-4 leading-relaxed">
                    {oportunidad.desc}
                  </p>
                  
                  {/* XP y Badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/30">
                      <Zap className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs font-semibold text-yellow-400">{oportunidad.xp} XP</span>
                    </div>
                    {oportunidad.badge && (
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-purple-500/20 border border-purple-400/30">
                        <Award className="h-3 w-3 text-purple-400" />
                        <span className="text-xs font-semibold text-purple-400">{oportunidad.badge}</span>
                      </div>
                    )}
                  </div>

                  {/* Botones de acción */}
                  <div className="flex items-center gap-3">
                    <Link
                      href={oportunidad.url}
                      target="_blank"
                      className={`flex-1 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl font-semibold text-white transition-all duration-300
                                 ${isCerrada ? 'bg-gray-600 cursor-not-allowed' : 'bg-gradient-to-r hover:scale-105 hover:shadow-lg'}`}
                      style={{
                        background: isCerrada ? '#6B7280' : `linear-gradient(135deg, ${colorCategoria}, ${colorCategoria}CC)`
                      }}
                      onClick={isCerrada ? (e) => e.preventDefault() : undefined}
                    >
                      {isCerrada ? (
                        <>🔒 Cerrada</>
                      ) : (
                        <>Ver detalle <ExternalLink className="h-4 w-4" /></>
                      )}
                    </Link>
                    
                    <button
                      type="button"
                      onClick={() => toggleGuardar(oportunidad.id)}
                      disabled={isCerrada}
                      className={`h-10 w-10 rounded-xl border-2 transition-all duration-300 flex items-center justify-center
                                 ${isGuardada 
                                   ? 'bg-yellow-500/20 border-yellow-400 text-yellow-400 hover:bg-yellow-500/30' 
                                   : 'border-white/20 text-white/60 hover:border-white/40 hover:text-white/80'
                                 }
                                 ${isCerrada ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
                      title={isGuardada ? 'Quitar de guardadas' : 'Guardar misión'}
                    >
                      <Star className={`h-4 w-4 ${isGuardada ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {/* Estado vacío */}
          {oportunidadesFiltradas.length === 0 && (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-white/80 mb-2">No se encontraron misiones</h3>
                <p className="text-white/60">Intenta ajustar tus filtros para descubrir nuevas oportunidades cósmicas.</p>
              </div>
            </div>
          )}
        </div>

        {/* ---------- FOOTER MOTIVACIONAL ---------- */}
        <footer className="text-center mt-16 py-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              ¡Sigue explorando el cosmos de oportunidades! 🚀
            </h3>
            <p className="text-white/70 leading-relaxed">
              Cada misión que completes te acerca más a tus sueños. Las estrellas esperan por ti, Exploradora.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
