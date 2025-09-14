'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Rocket, Brain, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VocationalQuestions from '@/components/quiz/VocationalQuestions';
import VocationalResults from '@/components/quiz/VocationalResults';

interface VocationalTestProps {
  // Props para el test vocacional
}

export default function VocationalTestPage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState<Record<string, number>>({});

  const handleStartTest = () => {
    setIsStarting(true);
    setShowQuestions(true);
  };

  const handleTestComplete = (results: Record<string, number>) => {
    setTestResults(results);
    setShowQuestions(false);
    setShowResults(true);
  };

  const handleRestart = () => {
    setShowQuestions(false);
    setShowResults(false);
    setIsStarting(false);
    setTestResults({});
  };

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#1a1f3a] to-[#2d1b69] relative">
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
        <VocationalResults results={testResults} onRestart={handleRestart} />
      </div>
    );
  }

  if (showQuestions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#1a1f3a] to-[#2d1b69] relative">
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
        <VocationalQuestions onComplete={handleTestComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0B0F19] via-[#1a1f3a] to-[#2d1b69] relative overflow-hidden">
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
      {/* Fondo cósmico con partículas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header principal */}
          <div className="mb-12">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FACC15] to-[#EC4899] flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <Sparkles className="w-8 h-8 text-[#FACC15] animate-bounce" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#FACC15] via-[#EC4899] to-[#7C3AED] bg-clip-text text-transparent">
                ✨ Exploradora,
              </span>
              <br />
              <span className="text-white">
                descubre tu planeta STEAM afiliado
              </span>
            </h1>
            
            <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Responde 30 preguntas y conecta con tu vocación científica y tecnológica. 
              Al finalizar, conocerás tu planeta STEAM, referentes femeninos, 
              universidades donde estudiar y becas disponibles.
            </p>
          </div>

          {/* Información del test */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22C55E] to-[#3B82F6] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔬</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">30 Preguntas</h3>
              <p className="text-white/70 text-sm">Distribuidas en 5 bloques STEAM</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#EC4899] to-[#7C3AED] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏱️</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">15-20 min</h3>
              <p className="text-white/70 text-sm">Duración aproximada</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FACC15] to-[#FB923C] flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Badge Exclusivo</h3>
              <p className="text-white/70 text-sm">Exploradora Vocacional</p>
            </div>
          </div>

          {/* Bloques temáticos */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Bloques Temáticos</h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { emoji: '🔬', name: 'Ciencia', color: 'from-[#22C55E] to-[#16A34A]' },
                { emoji: '💻', name: 'Tecnología', color: 'from-[#3B82F6] to-[#1D4ED8]' },
                { emoji: '⚙️', name: 'Ingeniería', color: 'from-[#F59E0B] to-[#D97706]' },
                { emoji: '🎨', name: 'Artes Creativas', color: 'from-[#EC4899] to-[#BE185D]' },
                { emoji: '📐', name: 'Matemáticas', color: 'from-[#7C3AED] to-[#5B21B6]' }
              ].map((block, index) => (
                <div key={index} className="flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 border border-white/20">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${block.color} flex items-center justify-center`}>
                    <span className="text-sm">{block.emoji}</span>
                  </div>
                  <span className="text-white font-medium text-sm">{block.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Botón principal */}
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={handleStartTest}
              disabled={isStarting}
              className="relative group bg-gradient-to-r from-[#FACC15] via-[#EC4899] to-[#7C3AED] hover:from-[#EC4899] hover:via-[#7C3AED] hover:to-[#FACC15] text-white font-bold py-4 px-8 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                boxShadow: '0 0 30px rgba(250, 204, 21, 0.4), 0 0 60px rgba(236, 72, 153, 0.3)'
              }}
            >
              <div className="flex items-center gap-3">
                {isStarting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Iniciando Test...</span>
                  </>
                ) : (
                  <>
                    <Rocket className="w-6 h-6" />
                    <span>Iniciar Test Vocacional</span>
                    <span className="text-2xl">🌌</span>
                  </>
                )}
              </div>
              
              {/* Efecto de brillo */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-300" />
            </Button>
            
            <p className="text-white/60 text-sm max-w-md">
              Al completar el test, descubrirás tu planeta STEAM y recibirás una guía personalizada 
              con universidades y becas disponibles en Perú.
            </p>
          </div>
        </div>
      </div>

      {/* Elementos decorativos */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-[#FACC15]/20 to-[#EC4899]/20 animate-pulse" />
      <div className="absolute bottom-10 right-10 w-16 h-16 rounded-full bg-gradient-to-br from-[#7C3AED]/20 to-[#3B82F6]/20 animate-bounce" />
      <div className="absolute top-1/2 left-5 w-12 h-12 rounded-full bg-gradient-to-br from-[#22C55E]/20 to-[#16A34A]/20 animate-ping" />
    </div>
  );
}