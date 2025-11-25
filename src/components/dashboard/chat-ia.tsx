"use client";

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Volume2, VolumeX, MoreVertical, Trash2, Copy, RefreshCw, User, Settings, HelpCircle, MessageSquare, Loader2, AlertCircle, Send, Bot } from 'lucide-react';

type ChatMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
};

const systemPrompt: ChatMessage = {
    role: 'system' as const,
    content: 'Eres KallpaWarmIA, una IA amigable, sabia y alentadora que guía a las jóvenes en el mundo STEAM. Tu propósito es inspirar curiosidad, explicar conceptos complejos de manera sencilla y siempre mantener un tono positivo y empoderador. Eres una mentora digital. Usa emojis para hacer la conversación más cercana y divertida. Siempre responde en español.'
};

async function chatOnce(messages: ChatMessage[], temperature = 0.7) {
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [systemPrompt, ...messages], temperature }),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
        throw new Error(data?.error || `Error del servidor: ${response.status}`);
    }
    return data.reply;
}


export function ChatIA() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: '¡Hola! Soy KallpaWarmIA, tu mentora digital en el universo STEAM. ¿Qué te gustaría explorar o aprender hoy? ✨',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const transcriptRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Debug: Log component state
  console.log('ChatIA Debug:', { input, isLoading, messagesCount: messages.length });

  useEffect(() => {
    if (transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: input };
    const newMessages: ChatMessage[] = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await chatOnce(newMessages);
      
      const assistantMessage: ChatMessage = { role: 'assistant', content: reply };
      setMessages(prev => [...prev, assistantMessage]);
      if (!reply || typeof reply !== 'string' || !reply.trim()) {
        toast({
          title: 'Respuesta vacía',
          description: 'El asistente no devolvió contenido. Revisa la configuración del modelo o la API key.',
        });
      }

    } catch (error: any) {
      console.error("Error fetching chat response:", error);
      const errorMessage: ChatMessage = { role: 'assistant', content: `Lo siento, ocurrió un error. Detalle: ${error.message}` };
      setMessages(prev => [...prev, errorMessage]);
      toast({
        title: 'Error en el chat',
        description: error?.message || 'Fallo inesperado al procesar tu mensaje.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-ia-container card-glass">
        <header className="chat-ia-header">
            <div className="bot-avatar">
                <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
                <h2>Chat con KallpaWarmIA</h2>
                <p>Tu mentora IA para temas STEAM</p>
            </div>
        </header>

        <div className="chat-transcript" ref={transcriptRef} aria-live="polite">
            {messages.map((msg, index) => (
                <div key={index} className={`chat-bubble ${msg.role}`}>
                    <div className="avatar">
                        {msg.role === 'assistant' ? (
                             <div className="w-8 h-8 rounded-full bg-primary grid place-items-center flex-shrink-0">
                                <Bot className="w-5 h-5 text-white" />
                             </div>
                        ) : (
                             <div className="w-8 h-8 rounded-full bg-blue-500/20 grid place-items-center flex-shrink-0 user-avatar-glow">
                                <span className="text-blue-300 text-lg">👤</span>
                             </div>
                        )}
                    </div>
                    <div className="chat-bubble-content">
                        <p>{msg.content}</p>
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="chat-loading">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>
            )}
        </div>

        <div className="chat-input-area">
            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    className="chat-input"
                    value={input}
                    onChange={(e) => {
                        console.log('Input change:', e.target.value);
                        setInput(e.target.value);
                    }}
                    onFocus={() => console.log('Input focused')}
                    onBlur={() => console.log('Input blurred')}
                    placeholder="Escribe tu pregunta aquí..."
                    aria-label="Escribe tu pregunta"
                    disabled={isLoading}
                    autoComplete="off"
                />
                <button type="submit" className="chat-submit-btn" disabled={isLoading || !input.trim()}>
                    <Send className="w-5 h-5" />
                    <span className="sr-only">Enviar mensaje</span>
                </button>
            </form>
        </div>
    </div>
  );
}
