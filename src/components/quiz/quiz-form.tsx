'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Clock, Gem, Star } from 'lucide-react';

type Planet = 'Ciencia' | 'Tecnología' | 'Ingeniería' | 'Matemáticas' | 'Arte';

const quizQuestions = [
  {
    question: '¿Qué actividad disfrutas más?',
    options: [
      { text: 'Observar estrellas', planet: 'Ciencia' },
      { text: 'Resolver acertijos', planet: 'Matemáticas' },
      { text: 'Crear ilustraciones digitales', planet: 'Arte' },
      { text: 'Programar un jueguito', planet: 'Tecnología' },
      { text: 'Construir un puente con bloques', planet: 'Ingeniería' },
    ],
  },
  {
    question: 'Si tuvieras superpoder, ¿cuál sería?',
    options: [
      { text: 'Descubrir nuevos elementos', planet: 'Ciencia' },
      { text: 'Dominar cualquier lenguaje de programación', planet: 'Tecnología' },
      { text: 'Crear inventos útiles', planet: 'Ingeniería' },
      { text: 'Resolver problemas complejos', planet: 'Matemáticas' },
      { text: 'Inspirar con tus obras', planet: 'Arte' },
    ],
  },
  {
    question: '¿Qué clase en el cole disfrutas más?',
    options: [
      { text: 'Biología / Física', planet: 'Ciencia' },
      { text: 'Computación / Informática', planet: 'Tecnología' },
      { text: 'Tecnología / Robótica', planet: 'Ingeniería' },
      { text: 'Matemáticas', planet: 'Matemáticas' },
      { text: 'Arte / Música', planet: 'Arte' },
    ],
  },
  {
    question: '¿Cómo prefieres trabajar en equipo?',
    options: [
      { text: 'Analizando datos', planet: 'Matemáticas' },
      { text: 'Diseñando prototipos', planet: 'Ingeniería' },
      { text: 'Codificando ideas', planet: 'Tecnología' },
      { text: 'Contando historias visuales', planet: 'Arte' },
      { text: 'Investigando y compartiendo descubrimientos', planet: 'Ciencia' },
    ],
  },
  {
    question: '¿Qué te inspira más?',
    options: [
      { text: 'La naturaleza', planet: 'Ciencia' },
      { text: 'La innovación digital', planet: 'Tecnología' },
      { text: 'Crear cosas útiles', planet: 'Ingeniería' },
      { text: 'Resolver enigmas', planet: 'Matemáticas' },
      { text: 'Expresar emociones', planet: 'Arte' },
    ],
  },
  {
    question: 'Si fueras parte de un proyecto escolar, ¿qué rol tomarías?',
    options: [
      { text: 'Experimentar en laboratorio', planet: 'Ciencia' },
      { text: 'Diseñar el prototipo', planet: 'Ingeniería' },
      { text: 'Programar la app', planet: 'Tecnología' },
      { text: 'Calcular recursos', planet: 'Matemáticas' },
      { text: 'Hacer la presentación creativa', planet: 'Arte' },
    ],
  },
  {
    question: '¿Qué objeto te emociona más?',
    options: [
      { text: 'Microscopio', planet: 'Ciencia' },
      { text: 'Laptop', planet: 'Tecnología' },
      { text: 'Impresora 3D', planet: 'Ingeniería' },
      { text: 'Calculadora', planet: 'Matemáticas' },
      { text: 'Pinceles digitales', planet: 'Arte' },
    ],
  },
  {
    question: '¿Qué frase te representa más?',
    options: [
      { text: '"Quiero descubrir cómo funciona el mundo"', planet: 'Ciencia' },
      { text: '"Quiero crear el futuro con la tecnología"', planet: 'Tecnología' },
      { text: '"Quiero construir cosas que cambien vidas"', planet: 'Ingeniería' },
      { text: '"Quiero resolver problemas imposibles"', planet: 'Matemáticas' },
      { text: '"Quiero expresar mi creatividad y dejar huella"', planet: 'Arte' },
    ],
  },
  {
    question: '¿Qué preferirías visitar?',
    options: [
      { text: 'Un laboratorio científico', planet: 'Ciencia' },
      { text: 'Un campus tecnológico', planet: 'Tecnología' },
      { text: 'Una fábrica de inventos', planet: 'Ingeniería' },
      { text: 'Un torneo de matemáticas', planet: 'Matemáticas' },
      { text: 'Un museo de arte', planet: 'Arte' },
    ],
  },
  {
    question: '¿Qué emoji usarías más seguido?',
    options: [
      { text: 'Ciencia', planet: 'Ciencia' },
      { text: 'Tecnología', planet: 'Tecnología' },
      { text: 'Ingeniería', planet: 'Ingeniería' },
      { text: 'Matemáticas', planet: 'Matemáticas' },
      { text: 'Arte', planet: 'Arte' },
    ],
  },
];

export default function QuizForm() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<{[key in Planet]: number}>({
    'Ciencia': 0,
    'Tecnología': 0,
    'Ingeniería': 0,
    'Matemáticas': 0,
    'Arte': 0
  });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finalResult, setFinalResult] = useState<Planet | null>(null);
  const [motivationalEmoji, setMotivationalEmoji] = useState('🌟');
  
  // Estados de gamificación
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  const [crystalPoints, setCrystalPoints] = useState(0);
  const [level, setLevel] = useState(1);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  
  const router = useRouter();

  // Temporizador de 5 minutos
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !isTimeUp) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsTimeUp(true);
      setShowTimeoutModal(true);
    }
  }, [timeLeft, showResult, isTimeUp]);

  // Calcular nivel basado en cristales
  useEffect(() => {
    const newLevel = Math.floor(crystalPoints / 50) + 1;
    setLevel(newLevel);
  }, [crystalPoints]);

  // Establecer emoji motivacional solo en el cliente
  useEffect(() => {
    const emojis = ['🌟', '✨', '🚀', '💫', '🎯', '🏆', '💎', '🌈'];
    setMotivationalEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
  }, [currentQuestion]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // AudioContext compartido para mejor rendimiento
  const audioContextRef = useRef<AudioContext | null>(null);
  
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const playSound = (type: 'correct' | 'incorrect' | 'complete' | 'click', optionIndex?: number) => {
    try {
      const audioContext = getAudioContext();
      
      // Sonido optimizado para clicks - más claro y menos distorsión
      if (type === 'click') {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        const filter = audioContext.createBiquadFilter();
        
        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Configuración optimizada para claridad
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime); // Frecuencia más alta y clara
        oscillator.type = 'sine'; // Onda senoidal para sonido más limpio
        
        // Filtro pasa-bajos para suavizar
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, audioContext.currentTime);
        filter.Q.setValueAtTime(1, audioContext.currentTime);
        
        // Envelope suave para evitar clicks
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.005); // Volumen más bajo
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.15); // Duración más corta
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
        
      } else if (type === 'correct') {
        // Sonido de éxito simplificado
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
        oscillator.type = 'triangle';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
        
      } else if (type === 'incorrect') {
        // Sonido de error simplificado
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.type = 'triangle'; // Cambio a triangle para menos distorsión
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.25);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.25);
        
      } else if (type === 'complete') {
        // Sonido de completar simplificado
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime); // E5
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.25, audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      }
    } catch (error) {
      // Audio no soportado en este navegador
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (selectedOption !== null || isTimeUp) return;
    
    // Reproducir sonido único para cada opción
    playSound('click', optionIndex);
    
    setSelectedOption(optionIndex);
    const selectedPlanet = quizQuestions[currentQuestion].options[optionIndex].planet;
    
    // Actualizar puntuación
    setScores(prev => ({
      ...prev,
      [selectedPlanet as Planet]: prev[selectedPlanet as Planet] + 1
    }));
    
    // Ganar cristales por responder
    setCrystalPoints(prev => prev + 10);
    
    setTimeout(() => {
      // Sonidos basados en tiempo restante
      if (timeLeft > 240) {
        playSound('correct'); // Buen tiempo = sonido de éxito
      } else if (timeLeft < 60) {
        playSound('incorrect'); // Poco tiempo = sonido de advertencia
      }

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
         // Sonido especial al completar el quiz
         setTimeout(() => playSound('complete'), 500);
         const result = getResult();
         setFinalResult(result);
         setShowResult(true);
       }
    }, 180); // Delay para mostrar la animación de selección
  };

  const getResult = () => {
    const finalScores = Object.entries(scores);
    finalScores.sort((a, b) => b[1] - a[1]);
    
    // En caso de empate, devolver el primer planeta con mayor puntuación
    const maxScore = finalScores[0][1];
    const winners = finalScores.filter(([_, score]) => score === maxScore);
    
    // Si hay empate, seleccionar aleatoriamente entre los ganadores
    if (winners.length > 1) {
      const randomIndex = Math.floor(Math.random() * winners.length);
      return winners[randomIndex][0] as Planet;
    }
    
    return finalScores[0][0] as Planet;
  };

  // Funciones auxiliares
  const getAvatarEmoji = (planet: Planet): string => {
    const avatars = {
      'Ciencia': '🔬',
      'Tecnología': '💻', 
      'Ingeniería': '⚙️',
      'Matemáticas': '📐',
      'Arte': '🎨'
    };
    return avatars[planet] || '🌟';
  };

  const getRoleText = (planet: Planet): string => {
    const roles = {
      'Ciencia': 'Científica Exploradora',
      'Tecnología': 'Innovadora Tech',
      'Ingeniería': 'Constructora del Futuro', 
      'Matemáticas': 'Solucionadora de Enigmas',
      'Arte': 'Creadora Visionaria'
    };
    return roles[planet] || 'Exploradora';
  };

  const handleCloseTimeoutModal = () => {
    setShowTimeoutModal(false);
  };

  const handleContinueFromTimeout = () => {
    setShowTimeoutModal(false);
    setIsTimeUp(false);
    setTimeLeft(300); // Reiniciar tiempo
  };

  // Manejar tecla Escape para cerrar modal
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showTimeoutModal) {
        handleCloseTimeoutModal();
      }
    };

    if (showTimeoutModal) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [showTimeoutModal]);

  const getMotivationalEmoji = (): string => {
    const emojis = ['🌟', '✨', '🚀', '💫', '🎯', '🏆', '💎', '🌈'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  if (showResult && finalResult) {
    const resultPlanet = finalResult;
    const timeUsed = 300 - timeLeft;
    const finalScore = crystalPoints; // Solo gemas ganadas por preguntas (10 por pregunta)
    const questionsAnswered = currentQuestion + 1;
    
    return (
      <div className="results-container-cosmic">
        <div className="results-content-cosmic">
          {/* Nivel alcanzado - Bloque horizontal grande */}
          <div className="level-achieved-block">
            <span className="level-text-cosmic">✨ Nivel 1: Exploradora</span>
          </div>
          
          {/* Bloques de estadísticas - 3 tarjetas glassmorphism */}
          <div className="stats-grid-cosmic">
            {/* Cristales obtenidos */}
            <div className="stat-card-cosmic crystal-card">
              <div className="stat-icon-cosmic">💎</div>
              <div className="stat-value-cosmic">{finalScore.toLocaleString()}</div>
              <div className="stat-label-cosmic">Cristales obtenidos</div>
            </div>
            
            {/* Tiempo utilizado */}
            <div className="stat-card-cosmic time-card">
              <div className="stat-icon-cosmic">⏱</div>
              <div className="stat-value-cosmic">{formatTime(timeUsed)}</div>
              <div className="stat-label-cosmic">Tiempo utilizado</div>
            </div>
            
            {/* Preguntas respondidas */}
            <div className="stat-card-cosmic questions-card">
              <div className="stat-icon-cosmic">✅</div>
              <div className="stat-value-cosmic">{questionsAnswered}/{quizQuestions.length}</div>
              <div className="stat-label-cosmic">Preguntas respondidas</div>
            </div>
          </div>
          
          {/* Bloque Planeta aliado - Emoji a la izquierda + texto a la derecha */}
          <div className="affinity-message-cosmic">
            <div className="planet-info-horizontal">
              <div className="avatar-emoji-cosmic">
                {getAvatarEmoji(resultPlanet)}
              </div>
              <div className="planet-text-content">
                <div className="affinity-title">¡Tu planeta aliado es {resultPlanet}!</div>
                <div className="affinity-description">
                  Basado en tus respuestas, tienes una gran afinidad con el mundo de {resultPlanet}. Como {getRoleText(resultPlanet)}, has demostrado habilidades excepcionales.
                </div>
              </div>
            </div>
          </div>
          
          {/* Botón "Ir a Dashboard" */}
          <button 
            className="dashboard-button-cosmic"
            onClick={() => router.push('/dashboard')}
          >
            Ir a Dashboard ➡️
          </button>
        </div>
      </div>
    );
  }

  // Modal de tiempo agotado
  if (showTimeoutModal) {
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        
        {/* MODAL */}
        <div 
          role="dialog"
          aria-modal="true"
          aria-labelledby="timeout-title"
          className="relative w-[92%] max-w-md rounded-3xl p-6 sm:p-8 
                     bg-white/10 border border-white/20 backdrop-blur-xl text-white 
                     shadow-[0_0_30px_rgba(124,58,237,.45),0_0_60px_rgba(59,130,246,.35)] 
                     animate-[modalIn_.18s_ease]"
        >
          {/* Cerrar */}
          <button 
            onClick={handleCloseTimeoutModal}
            aria-label="Cerrar" 
            className="absolute right-4 top-4 w-9 h-9 rounded-full flex items-center justify-center 
                       bg-white/10 hover:bg-white/20 border border-white/20 transition"
          >
            ✕
          </button>
          
          {/* Icono */}
          <div className="mx-auto mb-4 h-12 w-12 rounded-2xl 
                          bg-gradient-to-tr from-violet-600 to-blue-500 
                          flex items-center justify-center text-2xl shadow-lg">
            ⏳
          </div>
          
          {/* Título */}
          <h3 id="timeout-title" className="text-2xl font-extrabold text-center mb-2">
            ¡Tiempo agotado!
          </h3>
          
          {/* Mensaje */}
          <p className="text-center text-white/90 mb-6">
            No pasa nada, tú puedes 💪<br />
            Toca <span className="font-semibold">Reanudar</span> para continuar desde donde te quedaste.
          </p>
          
          {/* Botones */}
          <div className="flex flex-col gap-3">
            <button 
              onClick={handleContinueFromTimeout}
              autoFocus
              className="w-full rounded-2xl py-3 font-semibold text-white shadow-lg 
                         bg-gradient-to-r from-violet-600 to-blue-500 
                         hover:from-pink-500 hover:to-violet-600 transition"
            >
              Reanudar
            </button>
            
            <button 
              onClick={() => {
                // Reiniciar quiz desde el inicio
                setCurrentQuestion(0);
                setSelectedOption(null);
                setTimeLeft(300);
                setShowTimeoutModal(false);
              }}
              className="w-full rounded-2xl py-3 font-semibold text-white/90 
                         border border-white/25 hover:bg-white/10 transition"
            >
              Reintentar desde el inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  return (
    <div className="quiz-container-glassmorphism">
      {/* Barra de progreso superior */}
      <div className="progress-bar-top">
        <div 
          className="progress-fill-galaxy" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Header superior glassmorphism */}
      <div className="header-glassmorphism">
        <div className="header-item timer-display">
          ⏱️
          <span className="timer-text">{formatTime(timeLeft)}</span>
        </div>
        <div className="header-item crystals-display">
          💎
          <span className="crystals-number">{crystalPoints}</span>
        </div>
        <div className="header-item level-display">
          ⭐
          <span className="level-text">Pregunta {currentQuestion + 1}</span>
        </div>
      </div>
      
      {/* Layout principal: Avatar + Pregunta */}
      <div className="main-content-layout">
        {/* Área del avatar dinámico */}
        <div className="avatar-area">
          <div className="avatar-container">
            <div className="avatar-emoji">
              {finalResult ? getAvatarEmoji(finalResult) : '🤔'}
            </div>
            <div className="avatar-particles">
              {motivationalEmoji === '🎉' ? '✨🎉✨' : motivationalEmoji === '😲' ? '💫😲💫' : '✨🌟✨'}
            </div>
          </div>
        </div>
        
        {/* Área de la pregunta glassmorphism */}
        <div className="question-area">
          <div className="question-container-glassmorphism">
            <h2 className="question-text">
              {currentQ.question}
            </h2>
          </div>
        </div>
      </div>
      
      {/* Opciones de respuesta responsivas (3 arriba, 2 abajo) */}
      <div className="options-container-responsive">
        {currentQ.options.map(({ text, planet }, index) => {
          const icon = getAvatarEmoji(planet as Planet);
          return (
            <button
              key={index}
              className={`option-button-galaxy ${
                selectedOption === index ? 'selected' : ''
              }`}
              onClick={() => {
                if (selectedOption === null && !isTimeUp) {
                  handleSelectOption(index);
                }
              }}
              disabled={selectedOption !== null || isTimeUp}
            >
              <span className="option-icon-galaxy">{icon}</span>
              <span className="option-text-galaxy">{text}</span>
              {selectedOption === index && (
                <CheckCircle2 className="check-icon-galaxy" size={20} />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
