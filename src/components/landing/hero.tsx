import { StellarParticles } from '@/components/landing/stellar-particles';
import WaveSeparator from '@/components/landing/wave-separator';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <>
    <section className="relative h-screen min-h-[600px] flex items-center justify-center text-center text-white overflow-hidden -mt-20">
      <div className="absolute inset-0 z-10">
        <StellarParticles />
      </div>
      <div className="absolute -inset-20 z-0 opacity-40">
        <Image
          src="https://i.ibb.co/d0PvKQQ6/fondo-final.png"
          alt="Pixel art de Machu Picchu"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
          data-ai-hint="pixel art machu picchu"
          priority
        />
      </div>
      <div className="relative z-20 container mx-auto px-4 flex flex-col items-center">
        <h1 className="font-headline text-5xl md:text-6xl font-bold leading-tight cosmic-text-soft" style={{ textShadow: '2px 2px 8px rgba(124, 58, 237, 0.4)' }}>
          Desbloquea tu Potencial con <br /> <span className="cosmic-gradient-text">KallpaWarmIA</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl cosmic-text-soft" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
          Explora las fronteras de la ciencia y la tecnología a través de una aventura épica. Tu viaje hacia STEAM comienza ahora.
        </p>
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-5">
        <WaveSeparator color="hsl(var(--cosmic-bg-primary))" />
      </div>
    </section>
    </>
  );
}
