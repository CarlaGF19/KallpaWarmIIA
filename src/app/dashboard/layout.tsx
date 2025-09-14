'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Solo emojis, sin íconos de Lucide React
import { Button } from '@/components/ui/button';
import './dashboard.css';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const SpaceBackground = dynamic(
  () => import('@/components/space-background').then(mod => mod.SpaceBackground),
  { ssr: false }
);


const navItems = [
    { href: "/dashboard", emoji: "", label: "Inicio" },
    { href: "/comic-digitales", emoji: "", label: "Comic digital" },
    { href: "/oportunidades", emoji: "", label: "Oportunidades" },
];

const navTargetBlank = ["/retos", "/mentoria", "/ajustes"];


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleChatView = () => {
    setIsChatOpen(!isChatOpen);
    const chatView = document.getElementById('chat-view');
    const defaultView = document.getElementById('default-view');
    if (chatView && defaultView) {
      if (isChatOpen) {
        chatView.classList.add('hidden');
        defaultView.classList.remove('hidden');
      } else {
        chatView.classList.remove('hidden');
        defaultView.classList.add('hidden');
      }
    }
  };

  useEffect(() => {
    document.body.classList.add('kallpa-dashboard');
    
    const ctaButtons = document.querySelectorAll('.kallpa-dashboard .cta');
    ctaButtons.forEach(btn => {
        const pointerDownHandler = (e: PointerEvent) => {
            const button = btn as HTMLElement;
            const r = button.getBoundingClientRect();
            button.style.setProperty('--x', (e.clientX - r.left) + 'px');
            button.style.setProperty('--y', (e.clientY - r.top) + 'px');
        };
        btn.addEventListener('pointerdown', pointerDownHandler as EventListener);
        
        return () => {
            btn.removeEventListener('pointerdown', pointerDownHandler as EventListener);
        }
    });

    // Cerrar sidebar con tecla Escape
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.classList.remove('kallpa-dashboard');
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <SpaceBackground />
      <div className="flex h-screen w-full flex-col overflow-hidden">
        {/* Botón hamburguesa flotante para móvil/tablet */}
        <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden fixed top-4 left-4 z-50 h-11 w-11 rounded-full text-white hover:bg-white/10 bg-slate-800/40 backdrop-blur-sm transition-all duration-200 border border-white/10"
            onClick={() => setIsSidebarOpen(true)}
        >
            <span className="text-2xl">☰</span>
            <span className="sr-only">Abrir menú</span>
        </Button>
        {/* Overlay para móvil/tablet */}
        {isSidebarOpen && (
            <div 
                className="sidebar-overlay fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
                onClick={() => setIsSidebarOpen(false)}
            />
        )}
        
        <div className="grid flex-1 gap-0 md:grid-cols-[280px_1fr] h-full overflow-hidden">
            <aside className={`sidebar card-glass-intenso flex flex-col h-full transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? 'fixed inset-y-0 left-0 z-50 w-[280px] md:relative md:w-full transform translate-x-0' : 'hidden md:flex md:transform md:translate-x-0'
            }`}>
                {/* Hot zone de arrastre para móvil */}
                <div className="md:hidden absolute top-0 right-0 w-4 h-full z-10 cursor-grab active:cursor-grabbing" 
                     onTouchStart={(e) => {
                       const startX = e.touches[0].clientX;
                       const handleTouchMove = (e: TouchEvent) => {
                         const currentX = e.touches[0].clientX;
                         if (currentX - startX > 50) {
                           setIsSidebarOpen(false);
                           document.removeEventListener('touchmove', handleTouchMove);
                         }
                       };
                       document.addEventListener('touchmove', handleTouchMove);
                       document.addEventListener('touchend', () => {
                         document.removeEventListener('touchmove', handleTouchMove);
                       }, { once: true });
                     }}
                />
                
                <div className="p-4 flex-shrink-0">
                    <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-3xl">✨</span>
                        <span className="text-xl font-bold text-white">KallpaIA</span>
                    </div>
                    {/* Botón cerrar para móvil/tablet */}
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        className="md:hidden h-8 w-8 rounded-full text-white hover:bg-white/10 transition-colors duration-200"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <span className="text-xl">✕</span>
                        <span className="sr-only">Cerrar menú</span>
                    </Button>
                    </div>
                </div>
                
                {/* Contenido scrolleable */}
                <div className="flex-1 overflow-y-auto px-4 scrollbar-hide">
                    <nav className="space-y-1.5 pb-4">
                  {navItems.map((item) => (
                    <Link 
                        key={item.label} 
                        href={item.href} 
                        className={`liquid-nav-item ${pathname === item.href ? 'active' : ''}`}
                        target={navTargetBlank.includes(item.href) ? "_blank" : "_self"}
                        rel={navTargetBlank.includes(item.href) ? "noopener noreferrer" : ""}
                        onClick={() => setIsSidebarOpen(false)}
                    >
                      <div className="liquid-nav-content">
                        <span className="text-xl">{item.emoji}</span>
                        <span>{item.emoji} {item.label}</span>
                        <div className="liquid-shimmer"></div>
                      </div>
                    </Link>
                  ))}
                  <a 
                    href="#" 
                    className={`liquid-nav-item relative group flex items-center gap-3 px-3 ${isChatOpen ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleChatView();
                      setIsSidebarOpen(false);
                    }}
                  >
                    <div className="liquid-nav-content">
                      <span className="text-xl">💬</span>
                      <span>{isChatOpen ? 'Cerrar Chat' : 'Chat IA'}</span>
                      <span className="bot-status" aria-label="Online"></span>
                      <div className="liquid-shimmer"></div>
                    </div>
                    <div className="tooltip">{isChatOpen ? 'Cerrar chat' : 'Abrir chat'}</div>
                  </a>
                    </nav>
                </div>
                
                {/* Footer fijo */}
                <div className="flex-shrink-0 p-4 pt-2 space-y-2 border-t border-white/10">
                    <Link href="/" className="liquid-nav-item secondary flex items-center gap-3 text-muted-foreground hover:text-foreground">
                        <div className="liquid-nav-content">
                            <span className="text-xl"></span>
                            <span>Salir</span>
                            <div className="liquid-shimmer"></div>
                        </div>
                    </Link>
                    <Link href="/ajustes" className="liquid-nav-item secondary flex items-center gap-3 text-muted-foreground hover:text-foreground" target="_blank" rel="noopener noreferrer">
                        <div className="liquid-nav-content">
                            <span className="text-xl"></span>
                            <span>Ajustes</span>
                            <div className="liquid-shimmer"></div>
                        </div>
                    </Link>
                </div>
            </aside>
            <main className="flex flex-col h-full overflow-y-auto">
                <div className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
      </div>
    </>
  );
}
