'use client';

import Link from 'next/link';
import { BotIcon, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useEffect, useState } from 'react';

export function Header() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 100) {
        // Scrolling up or near top - show header
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold - hide header
        setIsVisible(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`sticky z-50 w-full max-w-6xl mx-auto px-4 transition-all duration-300 ease-in-out ${
      isVisible ? 'top-4 translate-y-0' : '-top-20 -translate-y-full'
    }`}>
      <div className="cosmic-card cosmic-floating-header rounded-2xl shadow-2xl" style={{ 
        borderColor: 'rgba(255, 255, 255, 0.3)',
        boxShadow: '0 8px 32px rgba(124, 58, 237, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(25px)',
        background: 'rgba(255, 255, 255, 0.15)'
      }}>
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BotIcon className="w-8 h-8 cosmic-text-primary" />
          <span className="font-headline text-2xl font-bold cosmic-gradient-text">KallpaWarmIA</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-lg">
          <Link href="/#about" className="cosmic-text-soft hover:cosmic-text-accent transition-colors">Nosotros</Link>
          <Link href="/#testimonials" className="cosmic-text-soft hover:cosmic-text-accent transition-colors">Testimonios</Link>
          <Link href="/#faq" className="cosmic-text-soft hover:cosmic-text-accent transition-colors">FAQ</Link>
        </nav>
        <div className="flex items-center gap-4">
           <Button asChild className="hidden md:flex font-headline text-base rounded-full px-6 py-2 cosmic-button-primary">
              <Link href="/login">Inicia tu Aventura</Link>
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden bg-transparent cosmic-text-primary" style={{ borderColor: 'hsl(var(--cosmic-primary-purple))' }}>
                <Menu />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="cosmic-card" style={{ borderColor: 'rgba(255, 255, 255, 0.25)' }}>
              <nav className="flex flex-col gap-6 text-lg mt-10">
                <Link href="/#about" className="cosmic-text-soft hover:cosmic-text-accent transition-colors">Nosotros</Link>
                <Link href="/#testimonials" className="cosmic-text-soft hover:cosmic-text-accent transition-colors">Testimonios</Link>
                <Link href="/#faq" className="cosmic-text-soft hover:cosmic-text-accent transition-colors">FAQ</Link>
                <Link href="/login" className="cosmic-text-primary hover:cosmic-text-accent transition-colors mt-4">Inicia tu Aventura</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      </div>
    </header>
  );
}
