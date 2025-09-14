'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Sparkles, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Question {
  id: number;
  category: 'Science' | 'Technology' | 'Engineering' | 'Arts' | 'Mathematics';
  question: string;
  options: {
    text: string;
    value: string;
    planet: 'ciencia_salud' | 'ingenieria_civil' | 'ingenieria_industrial' | 'tecnologia_computacion' | 'matematicas_finanzas' | 'creatividad_diseno' | 'agro_ambiental' | 'innovacion_emprendimiento';
  }[];
}

interface VocationalQuestionsProps {
  onComplete: (results: Record<string, number>) => void;
}

const QUESTIONS: Question[] = [
  // SCIENCE (6 preguntas)
  {
    id: 1,
    category: 'Science',
    question: '¿Qué te emociona más al pensar en el futuro de la ciencia?',
    options: [
      { text: 'Descubrir nuevas especies y ecosistemas', value: 'biology', planet: 'agro_ambiental' },
      { text: 'Explorar el espacio y otros planetas', value: 'astronomy', planet: 'innovacion_emprendimiento' },
      { text: 'Crear medicinas que salven vidas', value: 'medicine', planet: 'ciencia_salud' },
      { text: 'Entender el comportamiento humano', value: 'psychology', planet: 'ciencia_salud' }
    ]
  },
  {
    id: 2,
    category: 'Science',
    question: '¿Cuál de estas actividades científicas te resulta más fascinante?',
    options: [
      { text: 'Observar células bajo el microscopio', value: 'biology', planet: 'ciencia_salud' },
      { text: 'Analizar datos de experimentos', value: 'research', planet: 'matematicas_finanzas' },
      { text: 'Estudiar reacciones químicas', value: 'chemistry', planet: 'ingenieria_industrial' },
      { text: 'Investigar fenómenos físicos', value: 'physics', planet: 'ingenieria_industrial' }
    ]
  },
  {
    id: 3,
    category: 'Science',
    question: '¿Qué problema científico te gustaría resolver?',
    options: [
      { text: 'El cambio climático y la sostenibilidad', value: 'environment', planet: 'agro_ambiental' },
      { text: 'Enfermedades raras y genéticas', value: 'medicine', planet: 'ciencia_salud' },
      { text: 'La exploración espacial', value: 'astronomy', planet: 'innovacion_emprendimiento' },
      { text: 'La inteligencia artificial consciente', value: 'ai', planet: 'tecnologia_computacion' }
    ]
  },
  {
    id: 4,
    category: 'Science',
    question: '¿Cómo prefieres aprender sobre ciencia?',
    options: [
      { text: 'Experimentando en el laboratorio', value: 'experimental', planet: 'ciencia_salud' },
      { text: 'Observando la naturaleza directamente', value: 'field', planet: 'agro_ambiental' },
      { text: 'Usando simulaciones computacionales', value: 'computational', planet: 'tecnologia_computacion' },
      { text: 'Leyendo investigaciones y teorías', value: 'theoretical', planet: 'matematicas_finanzas' }
    ]
  },
  {
    id: 5,
    category: 'Science',
    question: '¿Qué aspecto de la investigación científica te motiva más?',
    options: [
      { text: 'Hacer descubrimientos que cambien el mundo', value: 'discovery', planet: 'innovacion_emprendimiento' },
      { text: 'Ayudar a mejorar la salud de las personas', value: 'health', planet: 'ciencia_salud' },
      { text: 'Proteger el medio ambiente', value: 'conservation', planet: 'agro_ambiental' },
      { text: 'Expandir el conocimiento humano', value: 'knowledge', planet: 'matematicas_finanzas' }
    ]
  },
  {
    id: 6,
    category: 'Science',
    question: '¿Qué herramienta científica te gustaría dominar?',
    options: [
      { text: 'Telescopios y equipos de astronomía', value: 'astronomy', planet: 'innovacion_emprendimiento' },
      { text: 'Microscopios y equipos de laboratorio', value: 'lab', planet: 'ciencia_salud' },
      { text: 'Instrumentos de medición ambiental', value: 'environment', planet: 'agro_ambiental' },
      { text: 'Supercomputadoras para análisis', value: 'computing', planet: 'tecnologia_computacion' }
    ]
  },

  // TECHNOLOGY (6 preguntas)
  {
    id: 7,
    category: 'Technology',
    question: '¿Qué tipo de tecnología te emociona más desarrollar?',
    options: [
      { text: 'Aplicaciones móviles innovadoras', value: 'mobile', planet: 'tecnologia_computacion' },
      { text: 'Inteligencia artificial y machine learning', value: 'ai', planet: 'tecnologia_computacion' },
      { text: 'Realidad virtual y aumentada', value: 'vr', planet: 'creatividad_diseno' },
      { text: 'Tecnología para la salud (healthtech)', value: 'healthtech', planet: 'ciencia_salud' }
    ]
  },
  {
    id: 8,
    category: 'Technology',
    question: '¿Cómo te imaginas usando la tecnología para impactar el mundo?',
    options: [
      { text: 'Creando soluciones para la educación', value: 'education', planet: 'innovacion_emprendimiento' },
      { text: 'Desarrollando tecnología sostenible', value: 'sustainability', planet: 'agro_ambiental' },
      { text: 'Innovando en entretenimiento digital', value: 'entertainment', planet: 'creatividad_diseno' },
      { text: 'Automatizando procesos complejos', value: 'automation', planet: 'ingenieria_industrial' }
    ]
  },
  {
    id: 9,
    category: 'Technology',
    question: '¿Qué aspecto del desarrollo tecnológico te atrae más?',
    options: [
      { text: 'Diseñar interfaces de usuario intuitivas', value: 'ux', planet: 'creatividad_diseno' },
      { text: 'Programar algoritmos complejos', value: 'algorithms', planet: 'tecnologia_computacion' },
      { text: 'Crear experiencias inmersivas', value: 'immersive', planet: 'creatividad_diseno' },
      { text: 'Optimizar sistemas y rendimiento', value: 'optimization', planet: 'ingenieria_industrial' }
    ]
  },
  {
    id: 10,
    category: 'Technology',
    question: '¿En qué área tecnológica te gustaría especializarte?',
    options: [
      { text: 'Ciberseguridad y protección de datos', value: 'security', planet: 'tecnologia_computacion' },
      { text: 'Desarrollo web y aplicaciones', value: 'web', planet: 'tecnologia_computacion' },
      { text: 'Robótica y automatización', value: 'robotics', planet: 'ingenieria_industrial' },
      { text: 'Big Data y análisis predictivo', value: 'data', planet: 'matematicas_finanzas' }
    ]
  },
  {
    id: 11,
    category: 'Technology',
    question: '¿Qué problema tecnológico actual te gustaría resolver?',
    options: [
      { text: 'La brecha digital en la educación', value: 'digital_divide', planet: 'innovacion_emprendimiento' },
      { text: 'La privacidad en internet', value: 'privacy', planet: 'tecnologia_computacion' },
      { text: 'La exploración espacial automatizada', value: 'space_tech', planet: 'ingenieria_industrial' },
      { text: 'El procesamiento de información masiva', value: 'big_data', planet: 'matematicas_finanzas' }
    ]
  },
  {
    id: 12,
    category: 'Technology',
    question: '¿Cómo prefieres trabajar en proyectos tecnológicos?',
    options: [
      { text: 'En equipos colaborativos y ágiles', value: 'collaborative', planet: 'innovacion_emprendimiento' },
      { text: 'Investigando y experimentando solo', value: 'research', planet: 'matematicas_finanzas' },
      { text: 'Creando prototipos y probando ideas', value: 'prototyping', planet: 'creatividad_diseno' },
      { text: 'Perfeccionando sistemas existentes', value: 'optimization', planet: 'ingenieria_industrial' }
    ]
  },

  // ENGINEERING (6 preguntas)
  {
    id: 13,
    category: 'Engineering',
    question: '¿Qué tipo de ingeniería te resulta más emocionante?',
    options: [
      { text: 'Ingeniería aeroespacial y cohetes', value: 'aerospace', planet: 'innovacion_emprendimiento' },
      { text: 'Ingeniería biomédica y prótesis', value: 'biomedical', planet: 'ciencia_salud' },
      { text: 'Ingeniería ambiental y sostenible', value: 'environmental', planet: 'agro_ambiental' },
      { text: 'Ingeniería de sistemas complejos', value: 'systems', planet: 'ingenieria_industrial' }
    ]
  },
  {
    id: 14,
    category: 'Engineering',
    question: '¿Qué te motiva más al diseñar soluciones de ingeniería?',
    options: [
      { text: 'Crear estructuras que perduren siglos', value: 'structures', planet: 'ingenieria_civil' },
      { text: 'Diseñar dispositivos que salven vidas', value: 'medical_devices', planet: 'ciencia_salud' },
      { text: 'Construir vehículos para explorar el espacio', value: 'space_vehicles', planet: 'innovacion_emprendimiento' },
      { text: 'Optimizar procesos industriales', value: 'industrial', planet: 'ingenieria_industrial' }
    ]
  },
  {
    id: 15,
    category: 'Engineering',
    question: '¿Cómo prefieres abordar los desafíos de ingeniería?',
    options: [
      { text: 'Con análisis detallado y cálculos precisos', value: 'analytical', planet: 'matematicas_finanzas' },
      { text: 'Construyendo y probando prototipos', value: 'hands_on', planet: 'ingenieria_industrial' },
      { text: 'Colaborando con equipos multidisciplinarios', value: 'collaborative', planet: 'innovacion_emprendimiento' },
      { text: 'Investigando materiales innovadores', value: 'materials', planet: 'ciencia_salud' }
    ]
  },
  {
    id: 16,
    category: 'Engineering',
    question: '¿Qué aspecto de la ingeniería te inspira más?',
    options: [
      { text: 'La precisión y la perfección técnica', value: 'precision', planet: 'ingenieria_industrial' },
      { text: 'La innovación y la creatividad', value: 'innovation', planet: 'innovacion_emprendimiento' },
      { text: 'La sostenibilidad y el impacto ambiental', value: 'sustainability', planet: 'agro_ambiental' },
      { text: 'La eficiencia y la optimización', value: 'efficiency', planet: 'matematicas_finanzas' }
    ]
  },
  {
    id: 17,
    category: 'Engineering',
    question: '¿En qué escala prefieres trabajar como ingeniera?',
    options: [
      { text: 'Componentes microscópicos y nanotecnología', value: 'nano', planet: 'ciencia_salud' },
      { text: 'Edificios y infraestructura urbana', value: 'civil', planet: 'ingenieria_civil' },
      { text: 'Vehículos y máquinas complejas', value: 'mechanical', planet: 'ingenieria_industrial' },
      { text: 'Sistemas globales y redes', value: 'systems', planet: 'tecnologia_computacion' }
    ]
  },
  {
    id: 18,
    category: 'Engineering',
    question: '¿Qué herramienta de ingeniería te gustaría dominar?',
    options: [
      { text: 'Software de diseño CAD avanzado', value: 'cad', planet: 'tecnologia_computacion' },
      { text: 'Impresoras 3D y fabricación digital', value: '3d_printing', planet: 'creatividad_diseno' },
      { text: 'Instrumentos de medición de precisión', value: 'measurement', planet: 'ingenieria_industrial' },
      { text: 'Equipos de construcción y obra', value: 'construction', planet: 'ingenieria_civil' }
    ]
  },

  // ARTS (6 preguntas)
  {
    id: 19,
    category: 'Arts',
    question: '¿Qué forma de expresión artística te conecta más con la tecnología?',
    options: [
      { text: 'Arte digital y diseño gráfico', value: 'digital_art', planet: 'creatividad_diseno' },
      { text: 'Animación y efectos visuales', value: 'animation', planet: 'creatividad_diseno' },
      { text: 'Música electrónica y producción', value: 'music_tech', planet: 'tecnologia_computacion' },
      { text: 'Diseño de experiencias interactivas', value: 'interactive', planet: 'creatividad_diseno' }
    ]
  },
  {
    id: 20,
    category: 'Arts',
    question: '¿Cómo te imaginas combinando arte y ciencia?',
    options: [
      { text: 'Visualizando datos científicos de forma bella', value: 'data_viz', planet: 'matematicas_finanzas' },
      { text: 'Creando arte que conciencie sobre el ambiente', value: 'eco_art', planet: 'agro_ambiental' },
      { text: 'Diseñando interfaces para tecnología médica', value: 'medical_design', planet: 'ciencia_salud' },
      { text: 'Desarrollando arte para exploración espacial', value: 'space_art', planet: 'innovacion_emprendimiento' }
    ]
  },
  {
    id: 21,
    category: 'Arts',
    question: '¿Qué aspecto del diseño te resulta más fascinante?',
    options: [
      { text: 'La psicología del color y la forma', value: 'psychology', planet: 'creatividad_diseno' },
      { text: 'La funcionalidad y la usabilidad', value: 'ux_design', planet: 'tecnologia_computacion' },
      { text: 'La innovación y la experimentación', value: 'experimental', planet: 'innovacion_emprendimiento' },
      { text: 'Los sistemas y la organización visual', value: 'systems_design', planet: 'creatividad_diseno' }
    ]
  },
  {
    id: 22,
    category: 'Arts',
    question: '¿Qué medio artístico te gustaría explorar más?',
    options: [
      { text: 'Realidad virtual y mundos inmersivos', value: 'vr_art', planet: 'creatividad_diseno' },
      { text: 'Instalaciones interactivas con sensores', value: 'interactive_art', planet: 'creatividad_diseno' },
      { text: 'Arte generativo con algoritmos', value: 'generative', planet: 'tecnologia_computacion' },
      { text: 'Diseño de aplicaciones y interfaces', value: 'ui_design', planet: 'tecnologia_computacion' }
    ]
  },
  {
    id: 23,
    category: 'Arts',
    question: '¿Cómo prefieres que tu arte impacte a las personas?',
    options: [
      { text: 'Educando y transmitiendo conocimiento', value: 'educational', planet: 'ciencia_salud' },
      { text: 'Sanando y proporcionando bienestar', value: 'therapeutic', planet: 'ciencia_salud' },
      { text: 'Inspirando aventura y exploración', value: 'inspirational', planet: 'innovacion_emprendimiento' },
      { text: 'Conectando comunidades globalmente', value: 'community', planet: 'innovacion_emprendimiento' }
    ]
  },
  {
    id: 24,
    category: 'Arts',
    question: '¿Qué tecnología artística te gustaría dominar?',
    options: [
      { text: 'Software de diseño y creatividad', value: 'design_software', planet: 'creatividad_diseno' },
      { text: 'Herramientas de modelado 3D', value: '3d_modeling', planet: 'creatividad_diseno' },
      { text: 'Inteligencia artificial creativa', value: 'ai_art', planet: 'tecnologia_computacion' },
      { text: 'Dispositivos de arte interactivo', value: 'interactive_devices', planet: 'creatividad_diseno' }
    ]
  },

  // MATHEMATICS (6 preguntas)
  {
    id: 25,
    category: 'Mathematics',
    question: '¿Qué aplicación de las matemáticas te resulta más emocionante?',
    options: [
      { text: 'Criptografía y seguridad digital', value: 'cryptography', planet: 'tecnologia_computacion' },
      { text: 'Modelado de fenómenos naturales', value: 'modeling', planet: 'agro_ambiental' },
      { text: 'Algoritmos de inteligencia artificial', value: 'ai_algorithms', planet: 'tecnologia_computacion' },
      { text: 'Cálculos para misiones espaciales', value: 'space_math', planet: 'innovacion_emprendimiento' }
    ]
  },
  {
    id: 26,
    category: 'Mathematics',
    question: '¿Cómo prefieres trabajar con problemas matemáticos?',
    options: [
      { text: 'Resolviendo paso a paso con lógica pura', value: 'logical', planet: 'matematicas_finanzas' },
      { text: 'Usando visualizaciones y gráficos', value: 'visual', planet: 'creatividad_diseno' },
      { text: 'Aplicando a problemas del mundo real', value: 'applied', planet: 'ingenieria_industrial' },
      { text: 'Programando soluciones computacionales', value: 'computational', planet: 'tecnologia_computacion' }
    ]
  },
  {
    id: 27,
    category: 'Mathematics',
    question: '¿Qué área matemática te gustaría explorar más?',
    options: [
      { text: 'Estadística y análisis de datos', value: 'statistics', planet: 'matematicas_finanzas' },
      { text: 'Geometría y formas en el espacio', value: 'geometry', planet: 'ingenieria_civil' },
      { text: 'Álgebra y ecuaciones complejas', value: 'algebra', planet: 'matematicas_finanzas' },
      { text: 'Matemática aplicada a la biología', value: 'biomathematics', planet: 'ciencia_salud' }
    ]
  },
  {
    id: 28,
    category: 'Mathematics',
    question: '¿Qué te motiva más sobre las matemáticas?',
    options: [
      { text: 'La elegancia y belleza de las demostraciones', value: 'pure_math', planet: 'matematicas_finanzas' },
      { text: 'Su poder para predecir el futuro', value: 'predictive', planet: 'matematicas_finanzas' },
      { text: 'Su capacidad para modelar la realidad', value: 'modeling', planet: 'ingenieria_industrial' },
      { text: 'Su aplicación en tecnología avanzada', value: 'tech_math', planet: 'tecnologia_computacion' }
    ]
  },
  {
    id: 29,
    category: 'Mathematics',
    question: '¿En qué contexto te gustaría aplicar las matemáticas?',
    options: [
      { text: 'Finanzas y economía digital', value: 'finance', planet: 'matematicas_finanzas' },
      { text: 'Investigación médica y epidemiología', value: 'medical', planet: 'ciencia_salud' },
      { text: 'Exploración espacial y astrofísica', value: 'astrophysics', planet: 'innovacion_emprendimiento' },
      { text: 'Inteligencia artificial y machine learning', value: 'ai', planet: 'tecnologia_computacion' }
    ]
  },
  {
    id: 30,
    category: 'Mathematics',
    question: '¿Qué herramienta matemática te gustaría dominar?',
    options: [
      { text: 'Software de cálculo simbólico', value: 'symbolic', planet: 'matematicas_finanzas' },
      { text: 'Simuladores y modelado numérico', value: 'simulation', planet: 'ingenieria_industrial' },
      { text: 'Herramientas de visualización matemática', value: 'visualization', planet: 'creatividad_diseno' },
      { text: 'Plataformas de análisis de big data', value: 'big_data', planet: 'tecnologia_computacion' }
    ]
  }
];

const CATEGORY_COLORS = {
  Science: 'from-[#22C55E] to-[#16A34A]',
  Technology: 'from-[#3B82F6] to-[#1D4ED8]',
  Engineering: 'from-[#F59E0B] to-[#D97706]',
  Arts: 'from-[#EC4899] to-[#BE185D]',
  Mathematics: 'from-[#7C3AED] to-[#5B21B6]'
};

const CATEGORY_EMOJIS = {
  Science: '🔬',
  Technology: '💻',
  Engineering: '⚙️',
  Arts: '🎨',
  Mathematics: '📊'
};

export default function VocationalQuestions({ onComplete }: VocationalQuestionsProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [particles, setParticles] = useState<Array<{id: number, x: number, y: number, emoji: string}>>([]);
  const [showBadge, setShowBadge] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const question = QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  // Función para reproducir sonidos
  const playSound = (frequency: number, duration: number = 200) => {
    if (typeof window !== 'undefined' && 'AudioContext' in window) {
      try {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration / 1000);
      } catch (error) {
        // Manejar errores de compatibilidad de audio
        // Audio no disponible en este navegador
      }
    }
  };

  const handleOptionSelect = (value: string) => {
    setSelectedOption(value);
    
    // Reproducir sonido al seleccionar opción
    playSound(800, 150); // Sonido suave y agradable
    
    // Crear partículas al responder
    createParticles();
  };

  const createParticles = () => {
    const newParticles = Array.from({ length: 5 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      emoji: ['✨', '⭐', '🌟', '💫', '🎯'][Math.floor(Math.random() * 5)]
    }));
    
    setParticles(prev => [...prev, ...newParticles]);
    
    // Remover partículas después de la animación
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
    }, 2000);
  };

  const handleNext = () => {
    if (selectedOption) {
      setAnswers(prev => ({ ...prev, [question.id]: selectedOption }));
      setCompletedQuestions(prev => [...prev, question.id]);
      
      // Reproducir sonido de progreso
      playSound(1000, 200);
      
      // Crear explosión de partículas al completar pregunta
      const celebrationParticles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i + 1000,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: ['🎉', '🎊', '⭐', '🌟', '💫'][Math.floor(Math.random() * 5)]
      }));
      
      setParticles(prev => [...prev, ...celebrationParticles]);
      
      setTimeout(() => {
        setParticles(prev => prev.filter(p => !celebrationParticles.find(cp => cp.id === p.id)));
      }, 2000);
      
      if (currentQuestion < QUESTIONS.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        // Reproducir sonido de finalización
        setTimeout(() => playSound(1200, 300), 200);
        setTimeout(() => playSound(1400, 300), 400);
        setTimeout(() => playSound(1600, 400), 600);
        
        // Mostrar badge final
        setShowBadge(true);
        
        // Calcular resultados
        const planetCounts: Record<string, number> = {
          ciencia_salud: 0,
          ingenieria_civil: 0,
          ingenieria_industrial: 0,
          tecnologia_computacion: 0,
          matematicas_finanzas: 0,
          creatividad_diseno: 0,
          agro_ambiental: 0,
          innovacion_emprendimiento: 0
        };

        // Contar respuestas por planeta
        Object.values({ ...answers, [question.id]: selectedOption }).forEach(answer => {
          const questionData = QUESTIONS.find(q => 
            q.options.some(opt => opt.value === answer)
          );
          const option = questionData?.options.find(opt => opt.value === answer);
          if (option) {
            planetCounts[option.planet]++;
          }
        });

        setTimeout(() => {
          onComplete(planetCounts);
        }, 1500);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(answers[QUESTIONS[currentQuestion - 1].id] || null);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #000000 0%, #1a0033 25%, #000066 50%, #330066 75%, #000000 100%)'
    }}>
      {/* Estrellas de fondo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(50)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute text-white/30 animate-twinkle"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              fontSize: `${0.5 + Math.random() * 0.5}rem`
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Partículas dinámicas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-2xl animate-bounce"
            style={{
              top: `${particle.y}%`,
              left: `${particle.x}%`,
              animation: 'float 2s ease-out forwards'
            }}
          >
            {particle.emoji}
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Barra de progreso global mejorada */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm font-medium">Progreso Total</span>
            <span className="text-white/80 text-sm font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-to-r from-[#FACC15] via-[#EC4899] to-[#7C3AED] transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </div>
          </div>
          
          {/* Badges de categorías */}
          <div className="flex justify-center gap-2 mb-6">
            {Object.keys(CATEGORY_EMOJIS).map((category, index) => {
              const categoryQuestions = QUESTIONS.filter(q => q.category === category);
              const completedInCategory = categoryQuestions.filter(q => completedQuestions.includes(q.id)).length;
              const isCurrentCategory = question.category === category;
              const isCompleted = completedInCategory === categoryQuestions.length;
              
              return (
                <div
                  key={category}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                    isCompleted
                      ? 'bg-green-500/20 text-green-300 border border-green-500/30 scale-105'
                      : isCurrentCategory
                      ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30 animate-pulse'
                      : 'bg-white/10 text-white/50 border border-white/20'
                  }`}
                >
                  {isCompleted ? (
                    <Award className="w-3 h-3" />
                  ) : isCurrentCategory ? (
                    <Zap className="w-3 h-3" />
                  ) : (
                    <Star className="w-3 h-3" />
                  )}
                  {CATEGORY_EMOJIS[category as keyof typeof CATEGORY_EMOJIS]} {category}
                </div>
              );
            })}
          </div>
        </div>

        {/* Header con progreso */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{CATEGORY_EMOJIS[question.category]}</div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Bloque {question.category}
                </h1>
                <p className="text-white/60">
                  Pregunta {currentQuestion + 1} de {QUESTIONS.length}
                </p>
              </div>
            </div>
            {showBadge && (
              <div className="animate-bounce">
                <div className="bg-gradient-to-r from-[#FACC15] to-[#EC4899] rounded-full p-3 shadow-2xl border-4 border-white/20">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className="text-white/80 text-xs mt-1 text-center font-medium">
                  ¡Completado!
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Pregunta principal */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm rounded-3xl p-8 mb-8 border border-white/20" style={{
            boxShadow: '0 0 30px rgba(124, 58, 237, 0.3)'
          }}>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 text-center leading-relaxed">
              {question.question}
            </h2>

            {/* Opciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {question.options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`
                    relative group p-6 rounded-2xl border-2 transition-all duration-300 text-left
                    hover:scale-105 hover:-translate-y-1
                    ${
                      selectedOption === option.value
                        ? `border-white bg-gradient-to-r ${CATEGORY_COLORS[question.category]} text-white shadow-lg`
                        : 'border-white/30 bg-white/10 text-white/90 hover:border-white/50 hover:bg-white/20'
                    }
                  `}
                  style={{
                    boxShadow: selectedOption === option.value 
                      ? '0 0 25px rgba(124, 58, 237, 0.5)' 
                      : '0 0 15px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`
                      w-6 h-6 rounded-full border-2 flex items-center justify-center mt-1 transition-all duration-300
                      ${
                        selectedOption === option.value
                          ? 'border-white bg-white'
                          : 'border-white/50'
                      }
                    `}>
                      {selectedOption === option.value && (
                        <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#EC4899] to-[#7C3AED]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium leading-relaxed">
                        {option.text}
                      </p>
                    </div>
                  </div>

                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
                </button>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div className="flex justify-between items-center">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="flex items-center gap-2">
              {QUESTIONS.map((_, index) => (
                <div
                  key={index}
                  className={`
                    w-3 h-3 rounded-full transition-all duration-300
                    ${
                      index === currentQuestion
                        ? 'bg-gradient-to-r from-[#FACC15] to-[#EC4899] scale-125'
                        : index < currentQuestion
                        ? 'bg-[#22C55E]'
                        : 'bg-white/30'
                    }
                  `}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={!selectedOption}
              className={`
                bg-gradient-to-r ${CATEGORY_COLORS[question.category]} 
                hover:from-[#EC4899] hover:to-[#7C3AED] 
                text-white font-bold px-6 py-2 
                disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-300
              `}
              style={{
                boxShadow: selectedOption ? '0 0 20px rgba(124, 58, 237, 0.4)' : 'none'
              }}
            >
              {currentQuestion === QUESTIONS.length - 1 ? (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Finalizar Test
                </>
              ) : (
                <>
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Partículas flotantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute text-white/20 animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              fontSize: '0.8rem'
            }}
          >
            {['✨', '⭐', '💫', '🌟'][Math.floor(Math.random() * 4)]}
          </div>
        ))}
      </div>
    </div>
  );
}